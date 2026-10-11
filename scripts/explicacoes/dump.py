# Uso: python scripts/explicacoes/dump.py <units.json> <inicio> <fim>  — imprime dispositivos vigentes para redigir as explicações.
import json, sys
us = [u for u in json.load(open(sys.argv[1], encoding="utf8")) if u["content_status"] == "current"]
a, b = int(sys.argv[2]), int(sys.argv[3])
print(len(us), "vigentes")
for u in us[a:b]:
    print("###", u["unit_key"], "|", u["label"], "|", (u["chapter"] or "")[:50])
    print(u["body_text"].strip()[:1300], "\n")
