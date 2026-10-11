"""Exporta as unidades de uma lei do banco (precisa de .env.local) para $TEMP/units_<slug>.json. Uso: python export-units.py <slug>"""
import json, os, sys, urllib.request
slug = sys.argv[1]
T = os.environ["TEMP"]
env = dict(l.strip().split("=", 1) for l in open(".env.local", encoding="utf-8") if "=" in l and not l.startswith("#"))
U, K = env["VITE_SUPABASE_URL"].strip('"'), env["SUPABASE_SERVICE_ROLE_KEY"].strip('"')
H = {"apikey": K, "Authorization": "Bearer " + K}
def get(path):
    return json.load(urllib.request.urlopen(urllib.request.Request(U + "/rest/v1/" + path, headers=H)))
cid = get(f"legal_courses?select=id&slug=eq.{slug}")[0]["id"]
rows = get(f"legal_course_units?select=unit_key,label,chapter,position,body_text,content_status,content_sha256&course_id=eq.{cid}&order=position&limit=5000")
json.dump(rows, open(f"{T}/units_{slug}.json", "w", encoding="utf-8"), ensure_ascii=False)
print(slug, len(rows), "unidades;", sum(r["content_status"] == "current" for r in rows), "vigentes")
