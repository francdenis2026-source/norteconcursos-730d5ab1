# Auditoria jurídica refeita com os textos compilados do Planalto baixados em 27/09/2026 (scripts/review/law.py).
# Gera supabase/migrations/20260927400000_pf_2021_2014_legal_audit.sql
import os, sys, re, json
sys.path.insert(0, os.path.dirname(__file__))
import wave_lib as W
import parse_exam as P

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PDF21 = r"C:\Users\familia\Desktop\PROVAS FEITAS POR MIM\POLICIA FEDERAL\2021\prova_CARGO_2_AGENTE_DE_POLCIA_FEDERAL.PDF"
ANCH = os.environ.get("PF2021_JSON")
anchors = None
if ANCH and os.path.exists(ANCH):
    s = re.sub(r",\s*([}\]])", r"\1", open(ANCH, encoding="utf-8").read())
    anchors = {r["n"]: r["t"] for r in json.loads(s)["rows"] if r["n"] >= 8}
RES21 = P.parse(PDF21, anchors=anchors, body_x=(44.5, 50), single_kind=True)

B = "https://www.planalto.gov.br/ccivil_03/"
CF = ("Constituição Federal de 1988 – texto compilado", B + "constituicao/constituicaocompilado.htm")
CPP = ("Código de Processo Penal – texto compilado", B + "decreto-lei/del3689compilado.htm")
L8112 = ("Lei nº 8.112/1990 – texto compilado", B + "leis/l8112compilado.htm")
L9784 = ("Lei nº 9.784/1999", B + "leis/l9784.htm")
L9605 = ("Lei nº 9.605/1998 – Crimes Ambientais", B + "leis/l9605.htm")
L13445 = ("Lei nº 13.445/2017 – Lei de Migração", B + "_ato2015-2018/2017/lei/l13445.htm")
L11343 = ("Lei nº 11.343/2006 – Lei de Drogas", B + "_ato2004-2006/2006/lei/l11343.htm")
STF145 = ("STF – Súmula 145", "https://portal.stf.jus.br/jurisprudencia/sumariosumulas.asp?base=30&sumula=2119")
STJ607 = ("STJ – Súmula 607", "https://scon.stj.jus.br/SCON/pesquisar.jsp?b=SUMU&sumula=607")

CFG21 = dict(year=2021, career="Agente de Polícia Federal", res=RES21)
CTX25 = ("Determinado agente da Polícia Federal revelou um segredo sobre uma operação policial que seria realizada para deter uma quadrilha de traficantes. "
         "Ele havia se apropriado desse segredo em razão do seu cargo. Tendo a operação fracassado, a administração da Polícia recebeu uma denúncia sobre o ocorrido "
         "e abriu processo administrativo disciplinar contra o referido servidor.\nConsiderando essa situação hipotética, julgue os itens subsequentes.")
CTX29 = ("A polícia foi acionada para atender a um chamado de suspeita de ocorrência de tráfico ilícito de entorpecentes no interior de determinada sociedade de economia mista federal. "
         "Ao chegar ao local, os policiais verificaram que um dos traficantes era um brasileiro naturalizado.\nConsiderando essa situação hipotética, julgue os itens subsecutivos.")
D21 = {
    25: dict(action="activate", audit=True, ctx=CTX25, topic=("Noções de Direito Administrativo", 2), basis=[L8112],
             note="Conferido no texto compilado da Lei 8.112/1990 (Planalto, 27/09/2026): art. 132, IX, comina demissão para a revelação de segredo do qual o servidor se apropriou em razão do cargo. Gabarito C confere."),
    26: dict(action="block", note="Bloqueado (27/09/2026): o item depende do conceito doutrinário de poder disciplinar x poder de polícia, sem texto legal que o defina; a governança exige fonte oficial vigente. A chave oficial (E) continua valendo para a pontuação."),
    27: dict(action="activate", audit=True, ctx=CTX25, topic=("Noções de Direito Administrativo", 3), basis=[CF, L9784],
             note="Conferido (Planalto, 27/09/2026): a CF, arts. 70 e 74, distingue controle externo (Congresso/TCU) de controle interno de cada Poder; a instauração de processo disciplinar pela própria Administração é controle interno, ligado ao dever de apuração (Lei 8.112, art. 143) e à autotutela (Lei 9.784, art. 53). Gabarito E confere."),
    29: dict(action="activate", audit=True, ctx=CTX29, topic=("Noções de Direito Constitucional", 1), basis=[CF],
             note="Conferido no texto compilado da CF (Planalto, 27/09/2026): art. 5º, XLIII, torna inafiançável o tráfico ilícito de entorpecentes e drogas afins. Gabarito C confere."),
    30: dict(action="activate", audit=True, ctx=CTX29, topic=("Noções de Direito Constitucional", 1), basis=[CF],
             note="Conferido no texto compilado da CF (Planalto, 27/09/2026): art. 5º, LI, permite extraditar o naturalizado por crime comum anterior à naturalização OU por comprovado envolvimento em tráfico de drogas; portanto o item, que só invoca a data do crime, é errado. Gabarito E confere."),
    31: dict(action="activate", audit=True, topic=("Direito Penal e Processual Penal", 4), basis=[CPP],
             note="Conferido no texto compilado do CPP (Planalto, 27/09/2026): art. 158-B, V, define acondicionamento como o ato de embalar individualmente o vestígio; armazenamento (art. 158-B, IX) é a guarda em condições adequadas. Gabarito E confere."),
    32: dict(action="block", note="Bloqueado (27/09/2026): a afirmativa depende de entendimento jurisprudencial (consumação do descaminho, art. 334 do CP, independente do esgotamento da via administrativa) que não foi confirmado em fonte oficial do STJ/STF nesta revisão (o repositório de súmulas do STJ não traz enunciado sobre o ponto). A chave oficial (C) continua valendo para a pontuação."),
    33: dict(action="activate", audit=True, topic=("Direito Penal e Processual Penal", 4), basis=[STF145, CPP],
             note="Conferido no portal do STF (27/09/2026): Súmula 145 — não há crime quando a preparação do flagrante pela polícia torna impossível a consumação; flagrante preparado é o provocado/induzido pela polícia. Gabarito C confere."),
    34: dict(action="activate", audit=True, topic=("Legislação Especial", 2), basis=[L11343, STJ607],
             note="Conferido (27/09/2026): Lei 11.343/2006, art. 40, I (transnacionalidade), e Súmula 607 do STJ, no repositório do tribunal: a majorante se configura com a prova da destinação internacional das drogas, ainda que não consumada a transposição da fronteira. Gabarito E confere."),
    35: dict(action="activate", audit=True, topic=("Legislação Especial", 1), basis=[L13445],
             note="Conferido no texto compilado da Lei 13.445/2017 (Planalto, 27/09/2026): art. 54, caput e §4º, prevê impedimento de reingresso por prazo determinado, proporcional à pena e nunca superior ao dobro dela. Gabarito E confere."),
    36: dict(action="activate", audit=True, topic=("Legislação Especial", 2), basis=[L9605],
             note="Conferido no texto compilado da Lei 9.605/1998 (Planalto, 27/09/2026): art. 29, §4º, III e V, aumenta a pena da metade se o crime é praticado durante a noite ou em unidade de conservação. Gabarito C confere."),
}

CFG14 = dict(year=2014, career="Agente de Polícia Federal", res={})
D14 = {
    105: dict(action="activate", audit=True, topic=("Direito Penal e Processual Penal", 3), basis=[CPP],
              text="Comando: Logo que tiver conhecimento da prática de infração penal, a autoridade policial deverá:\n\nItem: determinar, se for caso, a realização das perícias que se mostrarem necessárias e proceder a acareações.",
              note="Conferido no texto compilado do CPP (Planalto, 27/09/2026): art. 6º, VII (determinar exame de corpo de delito e outras perícias) e VI (proceder a acareações). Gabarito C confere."),
    115: dict(action="activate", audit=True, topic=("Direito Penal e Processual Penal", 4), basis=[CF, CPP], subject="Direito Penal e Processual Penal",
              text="Comando: Um agente da Polícia Federal foi escalado para atuar em operação para cumprimento de mandado judicial de prisão e de busca e apreensão, durante o dia, de documentos no escritório profissional do investigado. A respeito da atuação do agente na situação descrita acima, julgue os itens a seguir.\n\nItem: Mesmo sem o consentimento do proprietário, é permitido ao agente entrar no escritório profissional onde se encontrem os objetos de busca e apreensão.",
              note="Conferido (Planalto, 27/09/2026): CF, art. 5º, XI (entrada sem consentimento, durante o dia, por determinação judicial) e CPP, arts. 245 e 246 (regras da busca domiciliar aplicam-se ao compartimento não aberto ao público onde alguém exerce profissão). Gabarito C confere."),
}

if __name__ == "__main__":
    o1 = os.path.join(ROOT, "supabase", "migrations", "20260927400100_pf_2021_legal_audit.sql")
    o2 = os.path.join(ROOT, "supabase", "migrations", "20260927400500_pf_2014_legal_audit.sql")
    print(W.build_sql(CFG21, D21, o1, "Auditoria jurídica refeita: PF 2021 (Agente). Textos oficiais compilados do Planalto e súmulas conferidos em 27/09/2026."))
    print(W.build_sql(CFG14, D14, o2, "Auditoria jurídica: PF 2014 (Agente), itens 105 e 115. Textos oficiais do Planalto conferidos em 27/09/2026."))
