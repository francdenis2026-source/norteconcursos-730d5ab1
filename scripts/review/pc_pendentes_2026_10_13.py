# Resolve os itens retidos do PC-RJ 2022 e do PC-SE 2021 após a conferência de 13/10/2026. Uso: python -X utf8 pc_pendentes_2026_10_13.py
import json, os, sys
from urllib.parse import quote
sys.path.insert(0, os.path.dirname(__file__))
import pc_import_lib as L
from pc_rj_2022 import LAW

NOW = __import__("datetime").datetime.utcnow().isoformat() + "Z"
D = os.environ["TEMP"] + "/provas/se/"
RJ = "Polícia Civil do Estado do Rio de Janeiro - Delegado de Polícia"
SE = {"605_PCSE_001_01": "Polícia Civil do Estado de Sergipe - Agente de Polícia Judiciária", "605_PCSE_002_01": "Polícia Civil do Estado de Sergipe - Escrivão de Polícia"}


def patch(contest, year, n, **f):
    r = L.rest("PATCH", f"official_exam_questions?contest_name=eq.{quote(contest)}&exam_year=eq.{year}&item_number=eq.{n}", f, "return=representation")
    assert len(r) == 1, (contest, n, len(r))


def activate(contest, year, n, law, note, text=None):
    f = dict(content_status="active", legal_review_required=False, legal_audit_completed=True, law_version_checked_at=NOW,
             legal_basis=[dict(title=LAW[law][0], url=LAW[law][1])], review_note=note)
    if text:
        f["question_text"] = text
        f["raw_extraction"] = text
    patch(contest, year, n, **f)


def archive(contest, year, n, note):
    patch(contest, year, n, content_status="archived", review_note=note)


# ---- PC-RJ 2022
activate(RJ, 2022, 10, "DROG", "Revisada em 13/10/2026: chave C confere com o STJ (EREsp 1.624.564, Terceira Seção, 2020: importar poucas sementes de Cannabis é atípico) e com os precedentes da 2ª Turma do STF; a posse dos utensílios e a aquisição por decisão judicial também não são infrações da Lei 11.343/2006.")
activate(RJ, 2022, 19, "MP", "Revisada em 13/10/2026: chave E confere com o STJ (HC 521.622/SC; AgRg no AREsp 2.330.912/DF): o consentimento livre da vítima afasta o art. 24-A. Aqui a vítima convidou o ex-companheiro, sem intimidação (a exceção do AgRg no HC 860.073/SC, 2024, não se aplica).")
activate(RJ, 2022, 40, "CPP", "Revisada em 13/10/2026: chave B confere. No cálculo da pena máxima para a fiança do delegado (art. 322 do CPP) aplica-se a maior redução da tentativa (2/3): 8 anos reduzidos em 2/3 dão 2 anos e 8 meses, abaixo de 4 anos.")
archive(RJ, 2022, 39, "Arquivada em 13/10/2026: a chave oficial (A, 'pode conceder fiança por ser detenção') usa a regra anterior à Lei 12.403/2011. Pelo art. 322 do CPP o delegado só afiança infração com pena máxima de até 4 anos; aqui a pena máxima é de 5 anos. A chave não reflete a lei vigente.")
archive(RJ, 2022, 79, "Arquivada em 13/10/2026: a chave (B) é anterior à Lei 14.365/2022, que ampliou o acesso do advogado aos elementos já documentados (art. 7º, XIV e §§ do Estatuto da Advocacia); a resposta está superada.")

# ---- PC-SE 2021: estatística (transcrita do caderno oficial e conferida), arquivos e demais
A = "Considere duas variáveis aleatórias contínuas, X e Y, tais que P(X > 0) = 1, P(X ≤ 1) = 1/10, P(X ≤ 1 | Y > 1) = 3/10, Var(X) = Var(Y) = 1, e Cov(X, Y) = 0. Com base nessas informações, julgue os itens a seguir."
B = ("Com base em uma amostra aleatória simples de tamanho n = 16 retirada de uma população normal com média desconhecida μ e variância σ² = 9, deseja-se testar a hipótese nula "
     "H0: μ = 0 contra a hipótese alternativa H1: μ ≠ 0 por meio da estatística √n·X̄/σ, na qual X̄ denota a média amostral. Com respeito a esse teste de hipóteses, julgue os itens a seguir, "
     "sabendo que o valor da média amostral observado na amostra foi igual a 1 e que, relativo a esse teste, o P-valor foi igual a 0,18.")
ST = {  # nº no cargo 1: (comando, item, justificativa)
    71: (A, "X e Y são independentes.", "P(X ≤ 1) = 1/10 difere de P(X ≤ 1 | Y > 1) = 3/10; se fossem independentes seriam iguais. Covariância nula não implica independência. Gabarito E confere."),
    72: (A, "Var(X − Y) = 2.", "Var(X − Y) = Var(X) + Var(Y) − 2Cov(X, Y) = 1 + 1 − 0 = 2. Gabarito C confere."),
    73: (A, "P(X ≥ 1) = P(X > 1) = 0,9.", "Em variável contínua P(X = 1) = 0, logo P(X ≥ 1) = P(X > 1) = 1 − P(X ≤ 1) = 0,9. Gabarito C confere."),
    74: (A, "O valor esperado da variável aleatória X é igual a zero.", "Como P(X > 0) = 1, X é estritamente positiva e E(X) > 0. Gabarito E confere."),
    75: (B, "Sob a hipótese nula, a estatística √n·X̄/σ segue uma distribuição t de Student com 15 graus de liberdade.", "A variância σ² = 9 é conhecida, então a estatística segue normal padrão, não t de Student. Gabarito E confere."),
    76: (B, "Se o nível de significância escolhido para o teste foi igual a 10%, então, nesse caso, a hipótese nula H0: μ = 0 não seria rejeitada, embora a média amostral tenha sido diferente de zero.", "P-valor 0,18 é maior que 0,10: não se rejeita H0. Gabarito C confere."),
    77: (B, "O P-valor é uma medida que representa a potência do teste em tela.", "O P-valor é a probabilidade, sob H0, de resultado tão extremo quanto o observado; não é a potência. Gabarito E confere."),
    78: (B, "O desvio padrão da média amostral X̄ é igual a 0,75.", "DP(X̄) = σ/√n = 3/4 = 0,75. Gabarito C confere."),
}
items = json.load(open(D + "se_items.json", encoding="utf-8"))
c1 = {x["stem"]: x["n"] for x in items["605_PCSE_001_01"] if x["stem"]}
for f, contest in SE.items():
    n1_of = {}
    for x in items[f]:
        n1 = c1.get(x["stem"])
        if f.endswith("002_01") and x["n"] == 67:
            n1 = 74
        if f.endswith("001_01") and x["n"] == 74:
            n1 = 74
        n1_of[x["n"]] = n1
    for n, n1 in n1_of.items():
        if n1 is None:
            continue
        key = {x["n"]: x["ans"] for x in items[f]}[n]
        if key == "X":
            continue
        if n1 in ST:
            cmd, stem, why = ST[n1]
            txt = f"Comando:\n{cmd}\n\nItem: {stem}"
            patch(contest, 2021, n, content_status="active", legal_review_required=False, question_text=txt, raw_extraction=txt,
                  review_note=f"Transcrita do caderno oficial (conferida visualmente) e resolvida em 13/10/2026. {why}")
        elif n1 == 59:
            archive(contest, 2021, n, "Arquivada em 13/10/2026: a chave (E) diverge do art. 13-B do CPP, que permite ao delegado requisitar diretamente às empresas de telecomunicações os sinais e informações que permitam localizar a vítima ou os suspeitos de tráfico de pessoas em curso, sem ordem judicial nos primeiros 30 dias.")
        elif n1 in (63, 64):
            activate(contest, 2021, n, "DROG", "Revisada em 13/10/2026: a chave confere com o art. 28 da Lei 11.343/2006 para a cocaína. A decisão do STF de 2024 (RE 635.659) vale só para a maconha; para as demais drogas o art. 28 segue como está.")
        elif n1 == 83:
            patch(contest, 2021, n, content_status="active", legal_review_required=False,
                  review_note="Revisada em 13/10/2026: a chave E confere. O custo de bem importado usa a taxa de câmbio da data da transação (CPC 02), não a da entrada em operação (CPC 27).")
print("ok")
