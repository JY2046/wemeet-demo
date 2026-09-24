"""Vercel Function: proxy short user-initiated audio to a domestic-first ASR provider."""
from __future__ import annotations
import cgi, json, os, urllib.error, urllib.request
from http.server import BaseHTTPRequestHandler

MAX_BYTES = 8 * 1024 * 1024
ALLOWED_TYPES = {"audio/webm", "audio/mp4", "audio/mpeg", "audio/wav", "audio/x-wav", "audio/ogg"}
MENU_PROMPT = "Ether Coffee 咖啡点单。菜单常见词：焦糖坚果拼配、SOE、花魁、美式、拿铁、燕麦拿铁、Dirty、厚椰拿铁、沃柑、接骨木、话梅气泡冰美式、香芋、干姜、海盐玫瑰、玉米软糖、黑芝麻拿铁、苹果奶油派、姜黄肉桂拿铁、苹果肉桂拿铁、椰子糖、葡萄冰萃、罗勒和青柠、海盐芝士拿铁、桂花酒酿拿铁、咸摩卡、青椰美式、双份浓缩、换燕麦奶、打包带走。"

class handler(BaseHTTPRequestHandler):
    def _json(self, status:int, payload:dict)->None:
        body=json.dumps(payload,ensure_ascii=False).encode("utf-8"); self.send_response(status)
        self.send_header("Content-Type","application/json; charset=utf-8"); self.send_header("Content-Length",str(len(body)))
        self.send_header("Cache-Control","no-store"); self.send_header("X-Content-Type-Options","nosniff"); self.end_headers(); self.wfile.write(body)

    def do_GET(self)->None:
        dashscope=bool(os.environ.get("DASHSCOPE_API_KEY")); openai=bool(os.environ.get("OPENAI_API_KEY"))
        self._json(200,{"ok":True,"service":"wemeet-transcription","configured":dashscope or openai,"preferredProvider":"dashscope-qwen-asr" if dashscope else "openai-fallback","maxBytes":MAX_BYTES})

    def do_POST(self)->None:
        dashscope_key=os.environ.get("DASHSCOPE_API_KEY",""); openai_key=os.environ.get("OPENAI_API_KEY","")
        if not dashscope_key and not openai_key: self._json(503,{"ok":False,"error":"service_not_configured"}); return
        length=int(self.headers.get("Content-Length","0") or 0)
        if length<=0 or length>MAX_BYTES: self._json(413,{"ok":False,"error":"audio_too_large"}); return
        ctype=self.headers.get("Content-Type","")
        if "multipart/form-data" not in ctype: self._json(415,{"ok":False,"error":"multipart_required"}); return
        try:
            form=cgi.FieldStorage(fp=self.rfile,headers=self.headers,environ={"REQUEST_METHOD":"POST","CONTENT_TYPE":ctype},keep_blank_values=True)
            field=form["audio"] if "audio" in form else None
            if field is None or not getattr(field,"file",None): self._json(400,{"ok":False,"error":"audio_missing"}); return
            audio=field.file.read(MAX_BYTES+1)
            if not audio or len(audio)>MAX_BYTES: self._json(413,{"ok":False,"error":"audio_too_large"}); return
            mime=(getattr(field,"type","") or "audio/webm").split(";",1)[0]
            if mime not in ALLOWED_TYPES: self._json(415,{"ok":False,"error":"unsupported_audio"}); return
            filename=getattr(field,"filename","recording.webm") or "recording.webm"
            if dashscope_key:
                provider="dashscope-qwen-asr"; key=dashscope_key
                model=os.environ.get("DASHSCOPE_ASR_MODEL","qwen3-asr-flash")
                base=(os.environ.get("DASHSCOPE_BASE_URL") or "https://dashscope.aliyuncs.com/compatible-mode/v1").rstrip("/")
                endpoint=base+"/audio/transcriptions"
            else:
                provider="openai-transcription"; key=openai_key
                model=os.environ.get("OPENAI_ASR_MODEL","gpt-4o-mini-transcribe")
                endpoint="https://api.openai.com/v1/audio/transcriptions"
            boundary="----WeMeetAudioBoundary7MA4YWxk"; chunks=[]
            def add_field(name,value): chunks.extend([f"--{boundary}\r\n".encode(),f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode(),value.encode(),b"\r\n"])
            add_field("model",model); add_field("language","zh"); add_field("prompt",MENU_PROMPT)
            chunks.extend([f"--{boundary}\r\n".encode(),f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'.encode(),f"Content-Type: {mime}\r\n\r\n".encode(),audio,b"\r\n",f"--{boundary}--\r\n".encode()])
            request=urllib.request.Request(endpoint,data=b"".join(chunks),method="POST",headers={"Authorization":f"Bearer {key}","Content-Type":f"multipart/form-data; boundary={boundary}"})
            with urllib.request.urlopen(request,timeout=60) as response: result=json.loads(response.read().decode())
            text=str(result.get("text","")).strip()
            if not text: self._json(502,{"ok":False,"error":"empty_transcription","engine":provider,"model":model}); return
            self._json(200,{"ok":True,"text":text,"engine":provider,"model":model})
        except urllib.error.HTTPError as exc:
            code="unknown"; param=None
            try:
                detail=json.loads(exc.read().decode()).get("error",{}); code=str(detail.get("code") or detail.get("type") or "unknown")[:80]; param=str(detail.get("param"))[:80] if detail.get("param") else None
            except Exception: pass
            self._json(502,{"ok":False,"error":"provider_error","status":exc.code,"providerCode":code,"providerParam":param})
        except Exception: self._json(500,{"ok":False,"error":"transcription_failed"})
