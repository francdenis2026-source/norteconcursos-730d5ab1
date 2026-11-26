#!/usr/bin/env python3
"""Mede, nas provas IDECAN do repositório, quais assuntos de Estatística e de Raciocínio Lógico caem,
e calcula a chance de cada assunto da área de estudo PC-AC. Saída: src/estudo/incidence.json e
supabase/imports/idecan/incidencia-estatistica.md. Reproduzível: python3 scripts/idecan-incidence.py

Método (simples e auditável):
1. Entram só os itens de Raciocínio Lógico/Matemática (onde a IDECAN cobra estatística básica, probabilidade e
   combinatória) de 4 provas do repositório: PC-SC Agente 2026, PC-SC Escrivão 2026, PMSC 2026 e CBMMG 2026.
2. Cada item recebe um assunto por regras de palavras-chave (revisadas à mão, ver TEMA).
3. Para os assuntos de Estatística do edital, o peso é (itens observados + 1) ÷ (total observado + nº de assuntos):
   suavização de Laplace, para nenhum assunto do edital ficar com chance zero só por falta de amostra.
4. Chance de ao menos 1 questão na prova = 1 − (1 − peso)^N, com N = nº esperado de itens de Estatística na prova
   (ASSUNÇÃO: 10, isto é, 60 questões específicas ÷ 6 disciplinas; o edital não divide por matéria).
"""
import json, pathlib, re, collections

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

# assuntos de Estatística do edital (ids da área) e o assunto observado que os alimenta
ESTAT = ["conceitos", "frequencias", "tendencia", "dispersao", "posicao", "probabilidade", "correlacao", "series"]
OBS_PARA = {"tendencia": "tendencia", "dispersao": "dispersao", "probabilidade": "probabilidade"}

def prova(nome):
    if nome.startswith("PC SC - Agente"): return AG
    if nome.startswith("PC SC - Escriv"): return ES
    if nome.startswith("PMSC"): return PM
    if nome.startswith("CBMMG"): return CB
    return None

def main():
    data = json.loads(SRC.read_text(encoding="utf-8"))
    itens = []
    for q in data:
        if re.search(r"Racioc|Matem", q["subject"]) and prova(q["contest_name"]):
            itens.append((prova(q["contest_name"]), q["item_number"]))
    sem_tema = [i for i in itens if i not in TEMA]
    assert not sem_tema, f"itens de RLM sem tema: {sem_tema}"
    provas = sorted({p for p, _ in itens})
    cont = collections.Counter(TEMA[i] for i in itens)
    presenca = {t: len({p for (p, n) in itens if TEMA[(p, n)] == t}) for t in cont}

    # Peso dentro de Estatística (Laplace)
    obs = {t: cont.get(OBS_PARA.get(t, ""), 0) for t in ESTAT}
    tot = sum(obs.values())
    peso = {t: (obs[t] + 1) / (tot + len(ESTAT)) for t in ESTAT}
    chance = {t: round(100 * (1 - (1 - peso[t]) ** N_ESTAT)) for t in ESTAT}
    # Assuntos de Raciocínio Lógico: probabilidade de aparecer em uma prova = (provas com o tema + 1) ÷ (provas + 2)
    chance_rl = {t: round(100 * (presenca.get(t, 0) + 1) / (len(provas) + 2)) for t in ["comb", "progressoes", "conjuntos", "logica", "geometria", "porcentagem", "regra_de_tres"]}
    out = {
        "provas": provas, "itens_rlm": len(itens), "contagem": dict(cont), "provas_com_tema": presenca,
        "n_estatistica_assumido": N_ESTAT,
        "estatistica": {t: {"itens_observados": obs[t], "peso": round(peso[t], 4), "chance": chance[t]} for t in ESTAT},
        "raciocinio": {t: {"itens": cont.get(t, 0), "provas_com_tema": presenca.get(t, 0), "chance": chance_rl[t]} for t in chance_rl},
    }
    (ROOT / "src/estudo/incidence.json").write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")

    md = ["# Incidência de assuntos nas provas IDECAN do repositório", "",
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
    md += ["", "Limites: amostra pequena (4 provas, outras carreiras), estatística aparece dentro de Raciocínio Lógico e não como",
           "disciplina própria, e a prova da PC-AC pode cobrar a matéria de forma diferente. Os números são estimativas.", ""]
    (ROOT / "supabase/imports/idecan/incidencia-estatistica.md").write_text("\n".join(md), encoding="utf-8")
    print("\n".join(md))

if __name__ == "__main__":
    main()
