"""Vercel Function: constrained LLM parser for Ether Coffee natural-language orders."""
from __future__ import annotations
import json, os, urllib.error, urllib.request
from http.server import BaseHTTPRequestHandler

MAX_BODY = 16 * 1024
MENU = {
    "blend-americano": ("美式", 16), "blend-americano-xl": ("1000ml 超大杯美式", 23),
    "blend-latte": ("拿铁", 23), "blend-latte-xl": ("1000ml 超大杯拿铁", 34),
    "blend-oat-latte": ("燕麦拿铁", 28), "blend-dirty": ("Dirty", 26),
    "blend-coconut-latte": ("厚椰拿铁", 26), "soe-americano": ("SOE 美式", 23),
    "soe-americano-xl": ("1000ml 超大杯 SOE 美式", 34), "soe-latte": ("SOE 拿铁", 30),
    "soe-latte-xl": ("1000ml 超大杯 SOE 拿铁", 42), "soe-oat-latte": ("SOE 燕麦拿铁", 34),
    "soe-dirty": ("SOE Dirty", 32), "citrus-sparkling-americano": ("沃柑 / 接骨木 / 话梅气泡冰美式", 28),
    "flavored-dirty": ("香芋 / 干姜 / 海盐玫瑰 Dirty", 28), "corn-candy": ("玉米软糖", 32),
    "sesame-latte": ("黑芝麻拿铁", 32), "apple-cream-pie": ("苹果奶油派", 32),
    "turmeric-cinnamon-latte": ("姜黄肉桂拿铁", 32), "apple-cinnamon-latte": ("苹果肉桂拿铁", 32),
    "coconut-candy": ("椰子糖", 32), "grape-coldbrew": ("葡萄冰萃", 32),
    "basil-lime": ("罗勒和青柠", 32), "sea-salt-cheese-latte": ("海盐芝士拿铁", 28),
    "osmanthus-fermented-latte": ("桂花酒酿拿铁", 28), "salty-mocha": ("咸摩卡", 28),
    "green-coconut-americano": ("青椰美式", 26),
}
FLAVORS = {
    "citrus-sparkling-americano": {"沃柑", "接骨木", "话梅"},
    "flavored-dirty": {"香芋", "干姜", "海盐玫瑰"},
}
EXTRAS = {"双份浓缩": 5, "SOE 双份浓缩": 8, "换燕麦奶": 5}
SCHEMA = {
    "name": "ether_order_candidate", "strict": True,
    "schema": {"type":"object","additionalProperties":False,"required":["items","fulfillment","overall_note","needs_clarification","clarification_question"],"properties":{
        "items":{"type":"array","maxItems":12,"items":{"type":"object","additionalProperties":False,"required":["product_id","quantity","temperature","flavor","extras","note"],"properties":{
            "product_id":{"type":"string","enum":list(MENU)}, "quantity":{"type":"integer","minimum":1,"maximum":20},
            "temperature":{"type":["string","null"],"enum":["冷","热",None]}, "flavor":{"type":["string","null"]},
            "extras":{"type":"array","items":{"type":"string","enum":list(EXTRAS)},"uniqueItems":True}, "note":{"type":"string","maxLength":200}
        }}},
        "fulfillment":{"type":["string","null"],"enum":["堂食","打包带走",None]}, "overall_note":{"type":"string","maxLength":300},
        "needs_clarification":{"type":"boolean"}, "clarification_question":{"type":["string","null"],"maxLength":300}
    }}
}
SYSTEM = """你是 Ether Coffee 的受约束订单理解器。只把顾客原话整理成候选订单，不推荐、不补全、不猜测。
规则：
1. 只能使用提供的 product_id；不得发明商品、价格、规格。
2. 正确处理多杯、每杯不同规格、其中一杯/另一杯、追加、取消、改成等指代。
3. 若商品、数量、风味或指代存在会改变订单的歧义，needs_clarification=true，并给出一个简短中文问题；不要替顾客选择。
4. 气泡冰美式必须从沃柑/接骨木/话梅选风味；风味 Dirty 必须从香芋/干姜/海盐玫瑰选风味。没说就澄清。
5. 普通拼配双份浓缩用“双份浓缩”+5；SOE 商品用“SOE 双份浓缩”+8；换燕麦奶+5。
6. 明确说删除/不要某杯时不要保留该杯。无法对应菜单时澄清。
7. 输出只是双方确认前的候选订单。"""
MENU_TEXT = "\n".join(f"{pid}: {name} ¥{price}" for pid,(name,price) in MENU.items())

class handler(BaseHTTPRequestHandler):
    def _json(self, status:int, payload:dict)->None:
        body=json.dumps(payload,ensure_ascii=False).encode(); self.send_response(status)
        self.send_header("Content-Type","application/json; charset=utf-8"); self.send_header("Content-Length",str(len(body)))
        self.send_header("Cache-Control","no-store"); self.send_header("X-Content-Type-Options","nosniff"); self.end_headers(); self.wfile.write(body)
    def do_GET(self)->None:
        self._json(200,{"ok":True,"service":"wemeet-order-parser","configured":bool(os.environ.get("OPENAI_API_KEY")),"menuItems":len(MENU)})
    def do_POST(self)->None:
        key=os.environ.get("OPENAI_API_KEY","")
        if not key: self._json(503,{"ok":False,"error":"service_not_configured"}); return
        try:
            length=int(self.headers.get("Content-Length","0") or 0)
            if length<=0 or length>MAX_BODY: self._json(413,{"ok":False,"error":"request_too_large"}); return
            if "application/json" not in self.headers.get("Content-Type",""): self._json(415,{"ok":False,"error":"json_required"}); return
            payload=json.loads(self.rfile.read(length)); text=str(payload.get("text","")).strip()
            if not text or len(text)>2000: self._json(400,{"ok":False,"error":"invalid_text"}); return
            request_body={"model":"gpt-4o-mini","temperature":0,"messages":[
                {"role":"system","content":SYSTEM+"\n\n当前菜单：\n"+MENU_TEXT},
                {"role":"user","content":"顾客原话："+text}
            ],"response_format":{"type":"json_schema","json_schema":SCHEMA}}
            req=urllib.request.Request("https://api.openai.com/v1/chat/completions",data=json.dumps(request_body,ensure_ascii=False).encode(),method="POST",headers={"Authorization":f"Bearer {key}","Content-Type":"application/json"})
            with urllib.request.urlopen(req,timeout=45) as response: raw=json.loads(response.read().decode())
            parsed=json.loads(raw["choices"][0]["message"]["content"])
            result=self._validate(parsed)
            self._json(200,{"ok":True,"engine":"openai-structured-order","candidate":result})
        except urllib.error.HTTPError as exc:
            provider_code = "unknown"
            provider_param = None
            try:
                detail = json.loads(exc.read().decode()).get("error", {})
                provider_code = str(detail.get("code") or detail.get("type") or "unknown")[:80]
                provider_param = str(detail.get("param"))[:80] if detail.get("param") else None
            except Exception:
                pass
            self._json(502,{"ok":False,"error":"provider_error","status":exc.code,"providerCode":provider_code,"providerParam":provider_param})
        except (KeyError,ValueError,TypeError,json.JSONDecodeError): self._json(502,{"ok":False,"error":"invalid_provider_response"})
        except Exception: self._json(500,{"ok":False,"error":"parse_failed"})
    def _validate(self,data:dict)->dict:
        clean=[]; invalid=False
        for item in data.get("items",[]):
            pid=item.get("product_id")
            if pid not in MENU: invalid=True; continue
            flavor=item.get("flavor")
            if pid in FLAVORS and flavor not in FLAVORS[pid]: invalid=True
            if pid not in FLAVORS: flavor=None
            extras=[x for x in item.get("extras",[]) if x in EXTRAS]
            # Prevent wrong-priced espresso modifier family.
            extras=[x for x in extras if not (x=="双份浓缩" and pid.startswith("soe-")) and not (x=="SOE 双份浓缩" and not pid.startswith("soe-"))]
            name,base=MENU[pid]; extra_total=sum(EXTRAS[x] for x in extras); qty=max(1,min(20,int(item.get("quantity",1))))
            clean.append({"productId":pid,"name":name,"quantity":qty,"temperature":item.get("temperature"),"flavor":flavor,"extras":extras,"note":str(item.get("note",""))[:200],"unitPrice":base+extra_total,"lineTotal":(base+extra_total)*qty})
        needs=bool(data.get("needs_clarification")) or invalid or not clean
        question=data.get("clarification_question")
        if needs and not question: question="有些内容还不明确，请确认具体商品、数量或风味。"
        return {"items":clean,"fulfillment":data.get("fulfillment"),"overallNote":str(data.get("overall_note", ""))[:300],"needsClarification":needs,"clarificationQuestion":question,"total":sum(x["lineTotal"] for x in clean)}
