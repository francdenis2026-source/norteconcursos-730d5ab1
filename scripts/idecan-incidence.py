#!/usr/bin/env python3
"""Mede, nas provas de bancas policiais/militares do repositório (IDECAN, FGV, Vunesp), quais assuntos de Estatística e de Raciocínio Lógico caem,
e calcula a chance de cada assunto da área de estudo PC-AC. Saída: src/estudo/incidence.json e
supabase/imports/idecan/incidencia-estatistica.md. Reproduzível: python3 scripts/idecan-incidence.py

Método (simples e auditável):
1. Entram só os itens de Raciocínio Lógico/Matemática (onde as bancas cobram estatística básica, probabilidade e
   combinatória) de 7 provas oficiais do repositório: PC-SC Agente e Escrivão 2026, PMSC 2026, CBMMG 2026 e GMPV 2026
   (IDECAN), CBMERJ 2022 (FGV) e PM-SP 2022 (Vunesp). Itens 'curados' sem ano de prova (ex.: PF, PC-CE, PC-ES do
   acervo próprio) NÃO contam: não são provas reais.
2. Cada item recebe um assunto por regras de palavras-chave (revisadas à mão, ver TEMA).
3. Para os assuntos de Estatística do edital, o peso é (itens observados + 1) ÷ (total observado + nº de assuntos):
   suavização de Laplace, para nenhum assunto do edital ficar com chance zero só por falta de amostra.
4. Chance de ao menos 1 questão na prova = 1 − (1 − peso)^N, com N = nº esperado de itens de Estatística na prova
   (ASSUNÇÃO: 10, isto é, 60 questões específicas ÷ 6 disciplinas; o edital não divide por matéria).
"""
import json, pathlib, re, collections, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import sqlrows

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "supabase/imports/idecan/idecan_questions.json"
N_ESTAT = 10

# Tema de cada item de RLM, conferido item a item (prova, nº do item) -> tema
TEMA = {}
def marca(prova, tema, itens):
    for i in itens:
        TEMA[(prova, i)] = tema
AG, ES, PM, CB = "PC SC - Agente", "PC SC - Escrivão", "PMSC", "CBMMG"
marca(AG, "probabilidade", [86, 96]); marca(ES, "probabilidade", [89]); marca(CB, "probabilidade", [15])
marca(AG, "tendencia", [88]); marca(ES, "dispersao", [91])
marca(AG, "comb", [87, 94]); marca(ES, "comb", [90]); marca(CB, "comb", [6, 14])
marca(AG, "progressoes", [89, 92]); marca(ES, "progressoes", [92, 99]); marca(CB, "progressoes", [7])
marca(AG, "conjuntos", [99]); marca(ES, "conjuntos", [97]); marca(PM, "conjuntos", [11])
marca(AG, "logica", [91, 95, 100]); marca(ES, "logica", [93, 100]); marca(PM, "logica", [9, 12]); marca(CB, "logica", [])
marca(AG, "geometria", [93]); marca(ES, "geometria", [94, 95]); marca(CB, "geometria", [8, 9])
marca(AG, "porcentagem", [98]); marca(PM, "porcentagem", [10]); marca(CB, "porcentagem", [12])
marca(AG, "regra_de_tres", [97]); marca(ES, "regra_de_tres", [98])
marca(AG, "decimais", [90]); marca(CB, "mmc", [13])
GM, CE, SP = "GMPV", "CBMERJ", "PM-SP"
marca(GM, "logica", [11, 13, 16, 17]); marca(GM, "conjuntos", [12]); marca(GM, "mmc", [14]); marca(GM, "regra_de_tres", [15])
marca(GM, "porcentagem", [18]); marca(GM, "progressoes", [19])
marca(CE, "porcentagem", [16, 24]); marca(CE, "regra_de_tres", [17]); marca(CE, "progressoes", [18, 26]); marca(CE, "tendencia", [19])
marca(CE, "geometria", [20, 29]); marca(CE, "mmc", [21, 23]); marca(CE, "algebra", [22, 25, 27]); marca(CE, "comb", [28]); marca(CE, "probabilidade", [30])
marca(SP, "logica", [21, 22, 26, 28, 29]); marca(SP, "geometria", [23]); marca(SP, "conjuntos", [24]); marca(SP, "probabilidade", [25]); marca(SP, "progressoes", [27, 30])

# assuntos de Estatística do edital (ids da área) e o assunto observado que os alimenta
ESTAT = ["conceitos", "frequencias", "tendencia", "dispersao", "posicao", "probabilidade", "correlacao", "series"]
OBS_PARA = {"tendencia": "tendencia", "dispersao": "dispersao", "probabilidade": "probabilidade"}

def prova(nome):
    if nome.startswith("PC SC - Agente"): return AG
    if nome.startswith("PC SC - Escriv"): return ES
    if nome.startswith("PMSC"): return PM
    if nome.startswith("CBMMG"): return CB
    if nome.startswith("Guarda Municipal de Porto Velho"): return GM
    if nome.startswith("Corpo de Bombeiros Militar do Estado do Rio"): return CE
    if nome.startswith("Polícia Militar do Estado de São Paulo"): return SP
    return None

def main():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    itens = []
    for q in data:
        if re.search(r"Racioc|Matem", q["subject"]) and prova(q["contest_name"]):
            itens.append((prova(q["contest_name"]), q["item_number"]))
    # provas que estão em SQL (CBMERJ, PM-SP, GMPV): leitura pelo parser de INSERT
    vistos = set(itens)
    for caminho in (ROOT / "supabase").rglob("*.sql"):
        for tab, d in sqlrows.scan(str(caminho)):
            p = prova(d.get("contest_name", ""))
            if p in (GM, CE, SP) and d.get("exam_year") and re.search(r"^(Racioc|Matem)", d.get("subject") or "") and (d.get("item_number") or "").isdigit():
                chave = (p, int(d["item_number"]))
                if chave not in vistos and chave in TEMA:
                    vistos.add(chave); itens.append(chave)
    sem_tema = [i for i in itens if i not in TEMA]
    assert not sem_tema, f"itens de RLM sem tema: {sem_tema}"
    provas = sorted({p for p, _ in itens})
    cont = collections.Counter(TEMA[i] for i in itens)
    presenca = {t: len({p for (p, n) in itens if TEMA[(p, n)] == t}) for t in cont}

    # Peso dentro de Estatística (Laplace)
    obs = {t: cont.get(OBS_PARA.get(t, ""), 0) for t in ESTAT}
    tot = sum(obs.values())
    peso = {t: (obs[t] + 1) / (tot + len(ESTAT)) for t in ESTAT}
    chance = {t: min(99, round(100 * (1 - (1 - peso[t]) ** N_ESTAT))) for t in ESTAT}
    # Assuntos de Raciocínio Lógico: probabilidade de aparecer em uma prova = (provas com o tema + 1) ÷ (provas + 2)
    chance_rl = {t: min(99, round(100 * (presenca.get(t, 0) + 1) / (len(provas) + 2))) for t in ["comb", "progressoes", "conjuntos", "logica", "geometria", "porcentagem", "regra_de_tres", "mmc", "algebra"]}
    out = {
        "provas": provas, "itens_rlm": len(itens), "contagem": dict(cont), "provas_com_tema": presenca,
        "n_estatistica_assumido": N_ESTAT,
        "estatistica": {t: {"itens_observados": obs[t], "peso": round(peso[t], 4), "chance": chance[t]} for t in ESTAT},
        "raciocinio": {t: {"itens": cont.get(t, 0), "provas_com_tema": presenca.get(t, 0), "chance": chance_rl[t]} for t in chance_rl},
    }
    (ROOT / "src/estudo/incidence.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")

    md = ["# Incidência de assuntos nas provas policiais e militares do repositório (IDECAN, FGV, Vunesp)", "",
          f"Provas lidas ({len(provas)}): " + ", ".join(provas) + f". Itens de Raciocínio Lógico/Matemática: {len(itens)}.", "",
          "| Tema do item | Itens | Provas em que aparece |", "|---|---:|---:|"]
    for t, n in cont.most_common():
        md.append(f"| {t} | {n} | {presenca[t]} de {len(provas)} |")
    md += ["", "## Chance por assunto de Estatística (PC-AC)", "",
           f"Peso = (itens observados + 1) ÷ (total + {len(ESTAT)}). Chance de ao menos 1 questão = 1 − (1 − peso)^{N_ESTAT}.",
           f"Assunção: {N_ESTAT} itens de Estatística na prova (60 específicas ÷ 6 disciplinas); o edital não divide por matéria.", "",
           "| Assunto | Itens observados | Peso | Chance |", "|---|---:|---:|---:|"]
    for t in ESTAT:
        md.append(f"| {t} | {obs[t]} | {peso[t]:.1%} | {chance[t]}% |")
    md += ["", f"Limites: amostra pequena ({len(provas)} provas, outras carreiras), estatística aparece dentro de Raciocínio Lógico e não como",
           "disciplina própria, e a prova da PC-AC pode cobrar a matéria de forma diferente. Os números são estimativas.", ""]
    (ROOT / "supabase/imports/idecan/incidencia-estatistica.md").write_text("\n".join(md), encoding="utf-8")
    # injeta o resumo na área de estudo (linha "const INC = ...")
    html = (ROOT / "src/estudo/estudo-pc-acre.html").read_text(encoding="utf-8")
    compact = {"n": N_ESTAT, "provas": len(provas), "itens": len(itens),
               "est": {t: {"obs": obs[t], "chance": chance[t]} for t in ESTAT},
               "rl": {t: {"itens": cont.get(t, 0), "provas": presenca.get(t, 0), "chance": chance_rl[t]} for t in chance_rl}}
    novo = "const INC = " + json.dumps(compact, ensure_ascii=False) + "; /* gerado por scripts/idecan-incidence.py */"
    html, n = re.subn(r"const INC = \{.*?\}; /\* gerado por scripts/idecan-incidence\.py \*/", lambda m: novo, html, count=1, flags=re.S)
    assert n == 1, "linha INC não encontrada"
    (ROOT / "src/estudo/estudo-pc-acre.html").write_text(html, encoding="utf-8")
    print("\n".join(md))

if __name__ == "__main__":
    main()
