# PC-AM 2022 (FGV): Delegado, Escrivão e Investigador. Uso: python -X utf8 pc_am_2022.py [--dry]
# Entrada: %TEMP%/provas/am/am_items.json (extração dos cadernos oficiais Tipo 1 + gabarito definitivo, ver pc_am_extract.py).
import json, os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
import pc_import_lib as L
from pc_rj_2022 import LAW as RJLAW

PL = "https://www.planalto.gov.br/ccivil_03/"
LAW = dict(RJLAW, CTB=("Código de Trânsito Brasileiro", PL + "leis/l9503compilado.htm"), T8137=("Lei 8.137/1990 – Crimes contra a ordem tributária", PL + "leis/l8137.htm"),
           LAV=("Lei 9.613/1998 – Lavagem de dinheiro", PL + "leis/l9613.htm"), A9605=("Lei 9.605/1998 – Crimes ambientais", PL + "leis/l9605.htm"),
           SNUC=("Lei 9.985/2000 – SNUC", PL + "leis/l9985.htm"), CTN=("Código Tributário Nacional", PL + "leis/l5172compilado.htm"),
           LRF=("Lei Complementar 101/2000 – Responsabilidade Fiscal", PL + "leis/lcp/lcp101.htm"), I9296=("Lei 9.296/1996 – Interceptação telefônica", PL + "leis/l9296.htm"),
           LEP=("Lei de Execução Penal", PL + "leis/l7210.htm"), HED=("Lei 8.072/1990 – Crimes hediondos", PL + "leis/l8072.htm"))
T = os.environ["TEMP"] + "/provas/am/"
FG = "https://conhecimento.fgv.br/sites/default/files/concursos/"
OK = "Resposta conferida com a lei vigente em 13/10/2026 e com o gabarito definitivo da banca."
BASE = dict(year=2022, board="FGV", state="AM", contest="Polícia Civil do Estado do Amazonas")
EX = {
    "del": dict(BASE, key="am_del22", role="Delegado de Polícia", role_type="Delegado", applied="27/03/2022",
                prova_url=FG + "ns001_-_delegado_de_policia_-_4a_classe_prova_objetivans001_tipo_1.pdf", gab_url=FG + "pcam2021e01_gabarito_definitivo.pdf"),
    "esc": dict(BASE, key="am_esc22", role="Escrivão de Polícia", role_type="Escrivão", applied="03/04/2022",
                prova_url=FG + "escrivao_de_policia_-_4a_classens200_tipo_1.pdf", gab_url=FG + "pcam2021e02_gabarito_definitivo.pdf"),
    "inv": dict(BASE, key="am_inv22", role="Investigador de Polícia", role_type="Investigador", applied="03/04/2022",
                prova_url=FG + "investigador_de_policia_-_4a_classens100_tipo_1.pdf", gab_url=FG + "pcam2021e02_gabarito_definitivo.pdf"),
}
for e in EX.values():
    e["notes"] = f"Caderno oficial (Tipo 1, branca) do concurso da Polícia Civil do Amazonas, aplicado em {e['applied']}; publicado pela FGV."
BLOCK = {
    "del": {25: "Retida: a chave (E, acórdão sempre interrompe a prescrição) diverge do entendimento do STJ e do STF sobre o acórdão apenas confirmatório; conferir a jurisprudência atual.",
            44: "Retida: a chave (A, regressão obrigatória) é contestada: a jurisprudência exige análise do juiz da execução; conferir antes de ativar.",
            65: "Retida: depende do Estatuto dos Policiais Civis do Amazonas (Lei Estadual 2.271/1994), cujo texto vigente não foi conferido em fonte oficial."},
    "esc": {},
    "inv": {40: "Retida: não consegui reproduzir a chave (A, R$ 19.000) pela revisão prospectiva da estimativa (CPC 23/27); o cálculo que encontrei dá cerca de R$ 14.429 no total. Conferir com a banca antes de ativar.",
            80: "Retida: depende do Estatuto dos Policiais Civis do Amazonas (Lei Estadual 2.271/1994), cujo texto vigente não foi conferido em fonte oficial."},
}
SPECIAL = {
    ("del", 56): "Resposta conferida: com certificado de registro vencido a manutenção da arma em casa é infração administrativa (o STJ trata a posse com registro vencido como atípica) e circular no jardim da própria residência é posse. Chave E confere.",
    ("del", 61): "Conferida com a Lei 14.230/2021: o ato do art. 11 não prevê perda da função; chave A confere.",
    ("del", 64): "Conferida com a Lei 14.133/2021: a locação de imóvel sem características específicas exige licitação (art. 74, V, só vale para imóvel específico) e avaliação prévia (art. 51).",
    ("inv", 44): "Conferido por cálculo: ativo circulante = 50.000 + 25.000 (empréstimo a diretor) + 36.000 (estoque líquido) + 57.000 (clientes líquidos) + 24.000 (aluguel de 12 meses) = 192.000, mas o empréstimo a diretor é realizável a longo prazo pela Lei 6.404 (art. 179), logo 167.000. Chave B confere.",
    ("inv", 41): "Conferido por cálculo: custo 56.000; depreciação por horas 38.500; valor contábil 17.500; venda 30.000; lucro de 12.500. Chave C confere.",
    ("inv", 15): "Quadro não extraído do PDF: a chave (11) confere se a primeira anotação for gol do time X (restam 4 gols e X precisa de pelo menos 2: 6 + 4 + 1 = 11).",
    ("esc", 12): "Conferido por cálculo: 3/5 sobraram; Gilson recebeu 1/3 de 3/5 = 1/5 do total; Glória recebeu 2/5 = 48, logo o total é 120 e Gilson recebeu 24. Chave D confere.",
    ("esc", 14): "Conferido por cálculo: 1/(2 − x/4) = 2/5 − 1/3 = 1/15, logo x = −52. Chave E confere.",
    ("esc", 15): "Conferido por cálculo: soma 16 só sai com (6,6,4) e (6,5,5), 6 resultados em 216 = 1/36. Chave C confere.",
    ("esc", 24): "Conferido por cálculo: cada célula soma as duas à esquerda em cadeia; J10 = 2^9 = 512. Chave E confere.",
    ("esc", 23): "Conferido: a interseção das três regiões é AA5:AB5. Chave D confere.",
}
INFO_VERSION = " Cita Word/Excel 2010 ou Windows 10 (produtos sem suporte); o conceito segue válido e a resposta não muda."
FIX = {  # correções de extração (símbolos que o PDF perde), conferidas no caderno oficial
    ("esc", 12): dict(stem="Geraldo resolveu se desfazer de sua coleção de miniaturas. Assim, ele deu 2/5 das suas miniaturas para seu irmão Gerson; das que sobraram, ele deu 1/3 para seu irmão Gilson e as 48 restantes ele deu para sua irmã Glória.\nO número de miniaturas que Gilson recebeu foi"),
    ("esc", 14): dict(stem="O valor de x que satisfaz a equação 1/3 + 1/(2 − x/4) = 2/5 é tal que"),
    ("esc", 15): dict(options={"A": "1/16.", "B": "1/18.", "C": "1/36.", "D": "1/54.", "E": "1/108."}),
    ("esc", 17): dict(context="Gráfico (descrição): população total do município de Manaus entre 1872 e 2018, em milhões. Fica abaixo de 0,1 milhão até 1960, cresce de forma acelerada a partir de 1970, marco da criação da Zona Franca de Manaus, e chega a cerca de 2,2 milhões em 2018. Fonte: IBGE (IPEADATA)."),
    ("esc", 19): dict(context="Gráfico (descrição): participação da borracha e do café na exportação total do Brasil, em %, de 1895 a 1915. O café começa perto de 68%, cai para cerca de 47% em 1905, sobe perto de 60% a partir de 1911. A borracha começa perto de 16%, sobe até cerca de 40% em 1910 e depois cai para cerca de 13% em 1915."),
}
LEGAL_BASIS = {  # (cargo, nº) -> chave de LAW
    **{("del", n): "CF" for n in range(1, 16)}, **{("del", n): "CP" for n in range(16, 31)}, **{("del", n): "CPP" for n in range(31, 46)},
    ("del", 46): "CP", ("del", 47): "LAV", ("del", 48): "LAV", ("del", 49): "ORG", ("del", 50): "ORG", ("del", 51): "T8137", ("del", 52): "ECA", ("del", 53): "ARMAS",
    ("del", 54): "DROG", ("del", 55): "T8137", ("del", 56): "ARMAS", ("del", 57): "ORG", ("del", 58): "MP", ("del", 59): "ORG", ("del", 60): "I9296",
    ("del", 61): "IMPR", ("del", 62): "CF", ("del", 63): "CF", ("del", 64): "L14133", ("del", 66): "CF", ("del", 67): "A9605", ("del", 68): "A9605", ("del", 69): "SNUC",
    ("del", 70): "CF", ("del", 71): "CF", ("del", 72): "A9605", ("del", 73): "CTN", ("del", 74): "LRF", ("del", 75): "CTN", ("del", 76): "CF", ("del", 77): "CTN",
    ("del", 84): "CPP", ("del", 85): "CPP", ("del", 86): "CPP", ("del", 87): "CPP",
    **{("del", n): "CF" for n in range(95, 101)},
    **{("esc", n): "CF" for n in range(46, 56)}, **{("esc", n): "CP" for n in range(56, 65)}, ("esc", 59): "HED", ("esc", 66): "CP", ("esc", 67): "DROG", ("esc", 68): "I9296", ("esc", 69): "CPP", ("esc", 70): "CPP",
    **{("esc", n): "CF" for n in range(71, 77)}, ("esc", 77): "IMPR", ("esc", 78): "CF", ("esc", 79): "L14133", ("esc", 60): "CP",
    **{("inv", n): "CF" for n in range(46, 56)}, ("inv", 56): "CP", ("inv", 57): "CP", ("inv", 58): "CP", ("inv", 59): "LEP", ("inv", 60): "CP", ("inv", 61): "CTB", ("inv", 62): "CP",
    ("inv", 63): "CP", ("inv", 64): "CP", ("inv", 65): "CP", ("inv", 66): "CPP", ("inv", 67): "CPP", ("inv", 68): "ORG", ("inv", 69): "CPP", ("inv", 70): "CPP",
    **{("inv", n): "CF" for n in (71, 72, 73, 74, 75)}, ("inv", 76): "IMPR", ("inv", 77): "L14133", ("inv", 78): "CF", ("inv", 79): "CF",
}
SUBJ_CLEAN = [(r"^Língua Portuguesa.*", "Língua Portuguesa"), (r"^Noções de Direito Penal.*", "Noções de Direito Penal, Processual Penal e Legislação Extravagante"),
              (r"^Geografia do Amazonas.*", "Geografia do Amazonas e História do Amazonas")]


def subject_of(s):
    for pat, rep in SUBJ_CLEAN:
        if re.match(pat, s):
            return rep
    return s


if __name__ == "__main__":
    data = json.load(open(T + "am_items.json", encoding="utf-8"))
    only = [a for a in sys.argv[1:] if not a.startswith("--")]
    for k, e in EX.items():
        if only and k not in only:
            continue
        items, gab, dec = data[k], {}, {}
        for it in items:
            n = it["n"]
            fx = FIX.get((k, n), {})
            it["stem"] = fx.get("stem", it["stem"])
            it["options"] = fx.get("options", it["options"])
            it["context"] = fx.get("context", "") if "context" in fx else ""
            if (k, n) == ("inv", 27):          # alternativa E perdida na extração; conferida no caderno
                it["options"] = dict(it["options"], E="conceituais.")
            it["subject"] = subject_of(it["subject"])
            gab[n] = "X" if it["ans"] == "*" else it["ans"]
            if n in BLOCK[k]:
                dec[n] = dict(action="block", note=BLOCK[k][n], subject=it["subject"])
                continue
            note = SPECIAL.get((k, n), OK)
            if it["subject"].startswith("Noções de Informática") and k != "del":
                note += INFO_VERSION
            d = dict(action="activate", note=note, subject=it["subject"])
            if (k, n) in LEGAL_BASIS:
                d["basis"] = [LAW[LEGAL_BASIS[(k, n)]]]
            elif it["subject"] in L.GATED:
                d["basis"] = [LAW["CF"]]
            dec[n] = d
        L.run(e, items, gab, dec, dry="--dry" in sys.argv)
