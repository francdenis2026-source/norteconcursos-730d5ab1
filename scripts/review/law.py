"""Consulta local de artigos nos textos compilados baixados do Planalto.
uso: python law.py <lei> <artigo> [<artigo> ...]   (ex.: python law.py cf 5 | python law.py cp 5 7)
     python law.py <lei> grep <regex>           (busca linhas)
Trechos riscados no original (revogados/alterados) saem como [[REVOGADO: ...]].
"""
import sys, re, os, html
from html.parser import HTMLParser

DIR = os.environ.get("LAWS_DIR", r"C:\Users\familia\AppData\Local\Temp\claude\C--Users-familia-Desktop-PROVAS-FEITAS-POR-MIM\eea12891-4053-4f7f-9f29-6eb433a8dbb7\scratchpad\laws")


class T(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.strike = [], 0
    def handle_starttag(self, tag, attrs):
        if tag in ("strike", "s", "del"):
            self.strike += 1; self.out.append("[[REVOGADO: ")
        if tag in ("p", "br", "div", "tr", "li", "h1", "h2", "h3", "table"):
            self.out.append("\n")
    def handle_endtag(self, tag):
        if tag in ("strike", "s", "del") and self.strike:
            self.strike -= 1; self.out.append("]]")
        if tag in ("p", "div", "tr", "li"):
            self.out.append("\n")
    def handle_data(self, d):
        self.out.append(d)


def load(name):
    raw = open(os.path.join(DIR, name + ".htm"), "rb").read()
    try:
        txt = raw.decode("utf-8")
    except UnicodeDecodeError:
        txt = raw.decode("cp1252", errors="replace")
    t = T(); t.feed(txt)
    s = "".join(t.out).replace("\xa0", " ")
    s = re.sub(r"[ \t]+", " ", s)
    s = re.sub(r"\]\]\s*\[\[REVOGADO: ", " ", s)
    lines = [l.strip() for l in s.splitlines()]
    return [l for l in lines if l]


def art(lines, n, maxl=70):
    pat = re.compile(r"^(\[\[REVOGADO: )?\s*Art\.?\s*" + re.escape(str(n)) + r"\s*(?:[º°o.\-–—]|\s|-A\b|$)", re.I)
    for i, l in enumerate(lines):
        if pat.match(l):
            out = [l]
            for m in lines[i + 1:i + maxl]:
                if re.match(r"^(\[\[REVOGADO: )?\s*Art\.?\s*\d+", m, re.I) and not re.match(r"^(\[\[REVOGADO: )?\s*Art\.?\s*" + re.escape(str(n)) + r"-", m, re.I):
                    break
                out.append(m)
            return "\n".join(out)
    return f"(art. {n} não encontrado)"


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    lines = load(sys.argv[1])
    if len(sys.argv) > 2 and sys.argv[2] == "grep":
        rx = re.compile(sys.argv[3], re.I)
        for i, l in enumerate(lines):
            if rx.search(l):
                print(f"{i}: {l[:300]}")
    else:
        for n in sys.argv[2:]:
            print(art(lines, n), "\n" + "-" * 60)
