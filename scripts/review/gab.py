"""Lê a tabela 'Item / Gabarito' dos PDFs de gabarito definitivo (CEBRASPE) e devolve {item: letra}.
uso: python gab.py <pdf> [<pdf> ...]
Cada bloco tem uma linha 'Item' com números e, logo abaixo, 'Gabarito' com as letras, alinhados por x."""
import pymupdf, re, sys


def parse_gab(path):
    out = {}
    d = pymupdf.open(path)
    for page in d:
        words = page.get_text("words")  # x0,y0,x1,y1,text,...
        rows = {}
        for w in words:
            rows.setdefault(round(w[1] / 3), []).append(w)
        keys = sorted(rows)
        for i, k in enumerate(keys):
            r = sorted(rows[k], key=lambda w: w[0])
            if r and r[0][4] == "Item":
                nums = [(w[0], int(w[4])) for w in r[1:] if re.fullmatch(r"\d{1,3}", w[4])]
                # linha seguinte com 'Gabarito'
                for kk in keys[i + 1:i + 4]:
                    g = sorted(rows[kk], key=lambda w: w[0])
                    if g and g[0][4] == "Gabarito":
                        letters = [(w[0], w[4]) for w in g[1:] if w[4] in ("C", "E", "X", "A", "B", "D")]
                        for x, n in nums:
                            best = min(letters, key=lambda l: abs(l[0] - x), default=None)
                            if best and abs(best[0] - x) < 25:
                                out[n] = best[1]
                        break
    return out


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    for p in sys.argv[1:]:
        g = parse_gab(p)
        print(p.split("\\")[-1], len(g), "itens; faltando:", [n for n in range(1, max(g) + 1) if n not in g] if g else "-")
