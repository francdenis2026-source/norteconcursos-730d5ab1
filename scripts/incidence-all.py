#!/usr/bin/env python3
"""Incidência por assunto de TODAS as disciplinas da área PC-AC (Investigador), com as provas oficiais do repositório.
Estatística e Raciocínio Lógico vêm de scripts/idecan-incidence.py; aqui entram Português, TI, Informática,
Contabilidade, Administração e Arquivologia (classificação por palavras-chave no enunciado).
Saída: src/estudo/incidence.json (chave "t") e a linha INC da área. Execute depois de idecan-incidence.py:
    python3 scripts/idecan-incidence.py && python3 scripts/incidence-all.py
Limites: amostra pequena, assuntos sem prova no repositório (Realidade do Acre, Análise de Dados) ficam sem dado."""
import json, pathlib, re, collections, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import sqlrows

ROOT = pathlib.Path(__file__).resolve().parent.parent
INC = ROOT / "src/estudo/incidence.json"
HTML = ROOT / "src/estudo/estudo-pc-acre.html"

# nº esperado de itens por disciplina na prova da PC-AC (ASSUNÇÃO: específicas = 60 ÷ 6; básicas = 24 repartidas)
N_DISC = {"port": 10, "rl": 6, "info": 4, "acre": 4, "contabilidade": 10, "estatistica": 10, "arquivologia": 10, "ti": 10, "analise": 10, "adm": 10}

SUBJ = {  # disciplina da área -> nomes de disciplina nas provas
    "port": [r"^Língua Portuguesa$"],
    "ti": [r"^Tecnologia da Informação"],
    "info": [r"^Informática$"],
    "contabilidade": [r"^Contabilidade( Geral)?$"],
    "adm": [r"^Administração( Geral)?$"],
    "arquivologia": [r"^Arquivologia$"],
}
RULES = {
    "port": [("port_red", r"reda[çc][ãa]o oficial|of[íi]cio|memorando|vocativo|manual de reda"), ("port_conc", r"concord[âa]ncia|concorda"),
             ("port_reg", r"reg[êe]ncia|crase|preposi[çc][ãa]o"), ("port_pont", r"v[íi]rgula|pontua[çc][ãa]o|ponto e v[íi]rgula|dois[- ]pontos|travess[ãa]o|aspas"),
             ("port_sint", r"sujeito|predicado|complemento|ora[çc][ãa]o|adjunto|aposto|per[íi]odo|subordinad|coordenad|fun[çc][ãa]o sint|termo"),
             ("port_sem", r"sin[ôo]nim|significado|sentido|acentu|ortograf|grafia|figura de linguagem|met[áa]fora|ironia|voc[áa]bulo|palavra|express[ãa]o"),
             ("port_interp", r"texto|infer|depreend|tema|t[íi]tulo|ideia central|interpreta|autor|argument|tese")],
    "ti": [("ti_ia", r"intelig[êe]ncia artificial|\bIA\b|aprendizado de m[áa]quina|machine learning|generativ|llm"), ("ti_leis", r"marco civil|lei n|lgpd|prote[çc][ãa]o de dados|crime|invas[ãa]o de dispositivo|cibern[ée]tic"),
           ("ti_meta", r"metadado"), ("ti_cripto", r"criptograf|\bhash\b|blockchain|assinatura digital|certificad|per[íi]cia digital|forense|esteganograf"),
           ("ti_seg", r"seguran[çc]a|malware|phishing|v[íi]rus|ransomware|firewall|ataque|vulnerab|antiv[íi]rus|engenharia social|autentica|ddos|backup|spoof"),
           ("ti_bd", r"banco de dados|\bsql\b|relacional|nosql|sgbd|chave prim"), ("ti_redes", r"\brede|protocolo|tcp|\bip\b|dns|roteador|wi-?fi|\bvpn\b|http|servidor|ethernet|lan\b|wan\b"),
           ("ti_plan", r"planilha|excel|f[óo]rmula|c[ée]lula"), ("ti_so", r"sistema operacional|linux|windows|kernel|mobile|android"),
           ("ti_org", r"organiza|arquivo|pasta|indexa|dados"), ("ti_conc", r"hardware|software|nuvem|big data|computa[çc]")],
    "info": [("info_seg", r"seguran[çc]a|malware|phishing|v[íi]rus|ransomware|firewall|antiv[íi]rus|backup|senha"), ("info_excel", r"planilha|excel|f[óo]rmula|c[ée]lula|calc"),
             ("info_word", r"word|editor de texto|writer|documento|formata[çc]"), ("info_win", r"windows|atalho|ctrl|explorador|sistema operacional|linux"),
             ("info_net", r"internet|e-?mail|navegador|browser|site|rede|nuvem|google|wi-?fi")],
    "contabilidade": [("cont_dem", r"balan[çc]o|dre\b|demonstra[çc]|fluxo de caixa|resultado do exerc"), ("cont_mf", r"juros|taxa|desconto|amortiza|montante|capital|\bsac\b|price"),
                      ("cont_escrit", r"escritura|lan[çc]amento|livro di[áa]rio|raz[ãa]o|partida dobrada|d[ée]bito|cr[ée]dito"), ("cont_contas", r"plano de contas|receita|despesa|conta "),
                      ("cont_conc", r"patrim[ôo]nio|ativo|passivo|conceito|princ[íi]pio|regime de compet")],
    "adm": [("adm_qual", r"qualidade|pdca|iso|por resultado|excel[êe]ncia"), ("adm_plan", r"planejamento|estrat[ée]g|swot|miss[ãa]o|vis[ãa]o|objetivo"),
            ("adm_org", r"organograma|departamentaliza|estrutura organizacional|organiza[çc][ãa]o formal"), ("adm_dir", r"lideran[çc]a|motiva[çc]|comunica[çc]|dire[çc][ãa]o"),
            ("adm_ctrl", r"controle|balanced scorecard|indicador|\bbsc\b"), ("adm_funcoes", r"fun[çc][õo]es administrativ|fayol|taylor|teoria|administra[çc][ãa]o")],
    "arquivologia": [("arq_ciclo", r"idade|corrente|intermedi[áa]ria|permanente|ciclo vital|temporalidade"), ("arq_dig", r"digital|eletr[ôo]nic|sigad|e-?arq"),
                     ("arq_pres", r"conserva[çc]|preserva[çc]|restaura"), ("arq_info", r"acesso|sigilo|informa[çc][ãa]o classificada|\blai\b"),
                     ("arq_desc", r"descri[çc][ãa]o|classifica[çc][ãa]o|avalia[çc][ãa]o|nobrade|c[óo]digo de classifica"), ("arq_gest", r"gest[ãa]o|protocolo|arquivo|documento")],
}
TOPICS = {  # todos os assuntos da área por disciplina (ordem do cadastro)
    "port": ["port_conc", "port_reg", "port_pont", "port_interp", "port_sem", "port_red", "port_sint"],
    "ti": ["ti_cripto", "ti_leis", "ti_ia", "ti_seg", "ti_redes", "ti_meta", "ti_bd", "ti_plan", "ti_org", "ti_conc", "ti_so"],
    "info": ["info_win", "info_word", "info_excel", "info_net", "info_seg"],
    "contabilidade": ["cont_pericia", "cont_mf", "cont_dem", "cont_conc", "cont_escrit", "cont_contas", "cont_mov", "cont_banco"],
    "adm": ["adm_funcoes", "adm_plan", "adm_org", "adm_dir", "adm_ctrl", "adm_qual"],
    "arquivologia": ["arq_desc", "arq_ciclo", "arq_info", "arq_conc", "arq_gest", "arq_dig", "arq_pres"],
}

def coleta():
    itens = {}  # (prova, 100 primeiros caracteres) -> (prova, disciplina, enunciado)
    def add(prova, ano, disc, stem):
        if not (ano and disc and stem) or "autoral" in prova:
            return
        itens.setdefault((prova, re.sub(r"\s+", " ", stem)[:100]), (prova, disc, stem))
    for q in json.loads((ROOT / "supabase/imports/idecan/idecan_questions.json").read_text(encoding="utf-8")):
        add(q["contest_name"], q.get("exam_year"), q.get("subject"), q.get("stem"))
    for caminho in (ROOT / "supabase").rglob("*.sql"):
        for tab, d in sqlrows.scan(str(caminho)):
            add(d.get("contest_name", ""), d.get("exam_year"), d.get("subject"), d.get("stem") or d.get("question_text"))
    return list(itens.values())

def classifica(disc, stem):
    t = re.sub(r"\s+", " ", stem)
    for tid, pat in RULES[disc]:
        if re.search(pat, t, re.I):
            return tid
    return None

def main():
    itens = coleta()
    por_disc = collections.defaultdict(list)
    for prova, subj, stem in itens:
        for disc, pads in SUBJ.items():
            if any(re.search(p, subj or "") for p in pads):
                por_disc[disc].append((prova, stem))
    out, rel = {}, ["# Incidência por assunto: demais disciplinas (provas oficiais do repositório)", ""]
    for disc, tops in TOPICS.items():
        its = por_disc.get(disc, [])
        cont = collections.Counter(); provas = collections.defaultdict(set); sem = 0
        for prova, stem in its:
            tid = classifica(disc, stem)
            if tid in tops:
                cont[tid] += 1; provas[tid].add(prova)
            else:
                sem += 1
        n_prov = len({p for p, _ in its})
        tot = sum(cont.values()); k = len(tops); N = N_DISC[disc]
        rel += [f"## {disc}: {len(its)} itens em {n_prov} prova(s); {sem} sem assunto reconhecido", "", "| Assunto | Itens | Provas | Peso | Chance |", "|---|---:|---:|---:|---:|"]
        for tid in tops:
            w = (cont[tid] + 1) / (tot + k)
            ch = min(99, round(100 * (1 - (1 - w) ** N)))
            out[tid] = {"obs": cont[tid], "provas": len(provas[tid]), "chance": ch, "n_itens_disc": len(its), "n_provas_disc": n_prov}
            rel.append(f"| {tid} | {cont[tid]} | {len(provas[tid])} | {w:.1%} | {ch}% |")
        rel.append("")
    inc = json.loads(INC.read_text(encoding="utf-8"))
    inc["t"] = out
    inc["n_disciplina"] = N_DISC
    INC.write_text(json.dumps(inc, ensure_ascii=False, indent=1), encoding="utf-8")
    compact = {"n": inc["n_estatistica_assumido"], "provas": len(inc["provas"]), "itens": inc["itens_rlm"], "nd": N_DISC,
               "est": {k: {"obs": v["itens_observados"], "chance": v["chance"]} for k, v in inc["estatistica"].items()},
               "rl": {k: {"itens": v["itens"], "provas": v["provas_com_tema"], "chance": v["chance"]} for k, v in inc["raciocinio"].items()},
               "t": {k: {"obs": v["obs"], "provas": v["provas"], "np": v["n_provas_disc"], "ni": v["n_itens_disc"], "chance": v["chance"]} for k, v in out.items()}}
    html = HTML.read_text(encoding="utf-8")
    novo = "const INC = " + json.dumps(compact, ensure_ascii=False) + "; /* gerado por scripts/idecan-incidence.py */"
    html, n = re.subn(r"const INC = \{.*?\}; /\* gerado por scripts/idecan-incidence\.py \*/", lambda m: novo, html, count=1, flags=re.S)
    assert n == 1, "linha INC não encontrada"
    HTML.write_text(html, encoding="utf-8")
    (ROOT / "supabase/imports/idecan/incidencia-demais-disciplinas.md").write_text("\n".join(rel), encoding="utf-8")
    print("\n".join(rel))

if __name__ == "__main__":
    main()
