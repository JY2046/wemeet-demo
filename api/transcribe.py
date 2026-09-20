"""Vercel Function: proxy short user-initiated audio to OpenAI transcription."""
from __future__ import annotations
import cgi, json, os, urllib.error, urllib.request
from http.server import BaseHTTPRequestHandler

MAX_BYTES = 8 * 1024 * 1024
ALLOWED_TYPES = {"audio/webm", "audio/mp4", "audio/mpeg", "audio/wav", "audio/x-wav", "audio/ogg"}

class handler(BaseHTTPRequestHandler):
    def _json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers(); self.wfile.write(body)

    def do_GET(self) -> None:
        self._json(200, {"ok": True, "service": "wemeet-transcription", "configured": bool(os.environ.get("OPENAI_API_KEY")), "maxBytes": MAX_BYTES})

    def do_POST(self) -> None:
        key = os.environ.get("OPENAI_API_KEY", "")
        if not key: self._json(503, {"ok": False, "error": "service_not_configured"}); return
        length = int(self.headers.get("Content-Length", "0") or 0)
        if length <= 0 or length > MAX_BYTES: self._json(413, {"ok": False, "error": "audio_too_large"}); return
        ctype = self.headers.get("Content-Type", "")
        if "multipart/form-data" not in ctype: self._json(415, {"ok": False, "error": "multipart_required"}); return
        try:
            form = cgi.FieldStorage(fp=self.rfile, headers=self.headers, environ={"REQUEST_METHOD":"POST", "CONTENT_TYPE":ctype}, keep_blank_values=True)
            field = form["audio"] if "audio" in form else None
            if field is None or not getattr(field, "file", None): self._json(400, {"ok": False, "error": "audio_missing"}); return
            audio = field.file.read(MAX_BYTES + 1)
            if not audio or len(audio) > MAX_BYTES: self._json(413, {"ok": False, "error": "audio_too_large"}); return
            mime = (getattr(field, "type", "") or "audio/webm").split(";", 1)[0]
            if mime not in ALLOWED_TYPES: self._json(415, {"ok": False, "error": "unsupported_audio"}); return
            filename = getattr(field, "filename", "recording.webm") or "recording.webm"
            boundary = "----WeMeetAudioBoundary7MA4YWxk"; chunks = []
            def add_field(name, value): chunks.extend([f"--{boundary}\r\n".encode(), f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode(), value.encode(), b"\r\n"])
            add_field("model", "gpt-4o-mini-transcribe"); add_field("language", "zh")
            add_field("prompt", "Ether Coffee 咖啡点单。常见词：拿铁、美式、少冰、去冰、少糖、燕麦奶、厚椰乳、加一份浓缩、打包带走。")
            chunks.extend([f"--{boundary}\r\n".encode(), f'Content-Disposition: form-data; name="file"; filename="{filename}"\r\n'.encode(), f"Content-Type: {mime}\r\n\r\n".encode(), audio, b"\r\n", f"--{boundary}--\r\n".encode()])
            request = urllib.request.Request("https://api.openai.com/v1/audio/transcriptions", data=b"".join(chunks), method="POST", headers={"Authorization":f"Bearer {key}", "Content-Type":f"multipart/form-data; boundary={boundary}"})
            with urllib.request.urlopen(request, timeout=45) as response: result = json.loads(response.read().decode())
            self._json(200, {"ok": True, "text": str(result.get("text", "")).strip(), "engine":"openai-transcription"})
        except urllib.error.HTTPError as exc: self._json(502, {"ok": False, "error":"provider_error", "status":exc.code})
        except Exception: self._json(500, {"ok": False, "error":"transcription_failed"})
