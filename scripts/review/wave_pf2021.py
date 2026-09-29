# Onda 2 (parte 2): PF 2021 (Agente). Gera supabase/migrations/20260927390000_pf_2021_review_wave.sql
import os, sys, re, json
sys.path.insert(0, os.path.dirname(__file__))
import wave_lib as W
import parse_exam as P

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PDF = r"C:\Users\familia\Desktop\PROVAS FEITAS POR MIM\POLICIA FEDERAL\2021\prova_CARGO_2_AGENTE_DE_POLCIA_FEDERAL.PDF"
ANCH = os.environ.get("PF2021_JSON")  # export dos textos atuais do banco (âncoras de fim de item)
anchors = None
if ANCH and os.path.exists(ANCH):
    s = re.sub(r",\s*([}\]])", r"\1", open(ANCH, encoding="utf-8").read())
    anchors = {r["n"]: r["t"] for r in json.loads(s)["rows"] if r["n"] >= 8}
RES = P.parse(PDF, anchors=anchors, body_x=(44.5, 50), single_kind=True)
CFG = dict(year=2021, career="Agente de Polícia Federal", pdf=PDF, res=RES)

LEI6404 = ("Lei nº 6.404/1976 – texto compilado", "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm")
CPC26 = ("CPC 26 (R1) – Apresentação das Demonstrações Contábeis (CVM)",
         "https://conteudo.cvm.gov.br/export/sites/cvm/menu/regulados/normascontabeis/cpc/CPC_26_R1_rev_12.pdf")
D = {}

# ---- Língua Portuguesa
PT = "Texto-base e item recuperados do caderno oficial (CEBRASPE, PF 2021); gabarito definitivo conferido. Matéria compatível com o edital PF 2025 (Língua Portuguesa)."
for n in range(1, 18):
    D[n] = dict(action="activate", note=PT, topic=("Língua Portuguesa", 1))
D[18] = dict(action="activate", note=PT, topic=("Língua Portuguesa", 1), ctx=RES[17]["context"],
             body="As palavras “intensamente”, em “Em quase toda parte, a rede de prisões está se ampliando intensamente”, e “ampliada”, em “e sugere uma ‘significação muito ampliada da solução institucional como componente da política criminal’” desempenham a mesma função sintática nos períodos em que ocorrem.")
RO = "Considerando o Manual de Redação da Presidência da República, julgue os itens que se seguem."
for n in range(19, 25):
    D[n] = dict(action="activate", topic=("Língua Portuguesa", 3), ctx=RO,
                note="Item recuperado do caderno oficial (CEBRASPE, PF 2021), que cobra a 3ª edição do Manual de Redação da Presidência (vigente desde 2018). Gabarito definitivo conferido; a regra específica não foi recotejada com o texto do Manual nesta revisão.")

# ---- Jurídicos: auditoria de 26/09 perdida na reimportação; refazer com texto oficial
for n in (25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36):
    D[n] = dict(action="block", note="Bloqueado (27/09/2026): a auditoria jurídica feita em 26/09 foi perdida quando as linhas foram reimportadas (correção da colisão PF/PRF 2021). Precisa ser refeita com o texto oficial vigente (Planalto/STF/STJ) antes de reativar. A chave oficial continua valendo para a pontuação.")

# ---- Estatística: fórmulas dependem de símbolos que o PDF não extrai
for n in range(37, 49):
    D[n] = dict(action="block", note="Bloqueado (27/09/2026): o enunciado depende de fórmulas e símbolos (densidades, estimadores, regressão) que a extração do PDF corrompe; falta a transcrição visual conferida. A chave oficial continua valendo para a pontuação.")

# ---- Raciocínio lógico
RL1, RL2 = ("Raciocínio Lógico", 1), ("Raciocínio Lógico", 2)
D[49] = dict(action="activate", topic=RL2, note="Cada equipe: 1 delegado, 1 escrivão, 2 agentes. Com 2 delegados, 2 escrivães e 4 agentes há 2×2×C(4,2)=24 maneiras de montar a 1ª equipe e a 2ª fica determinada; o mesmo que montar uma única equipe (24). Gabarito C confere.")
D[50] = dict(action="activate", topic=RL2, note="Total 24 = 4!. Gabarito C confere.")
D[51] = dict(action="activate", topic=RL2, note="3×4×C(6,2) × 2×3×C(4,2) = 180×36 = 6.480, que não é superior a 6.500. Gabarito E confere.")
D[52] = dict(action="activate", topic=RL1, note="P2: C→¬J. A afirmativa (¬C→J) é a inversa, não equivalente. Gabarito E confere.")
D[53] = dict(action="activate", topic=RL1, note="A negação de D→¬C é D∧C, não uma condicional. Gabarito E confere.")
D[54] = dict(action="activate", topic=RL1, note="O argumento tem 3 proposições simples: 2³ = 8 linhas (< 10). Gabarito C confere.")
D[55] = dict(action="activate", topic=RL1, note="D→¬C ≡ ¬(D∧C). Gabarito C confere.")
D[56] = dict(action="activate", topic=RL1, note="Validade não garante a verdade das premissas; a conclusão pode ser falsa. Gabarito E confere.")
D[57] = dict(action="activate", topic=RL1, note="Com D e ¬C verdadeiras e J falsa, as premissas são verdadeiras e a conclusão falsa: argumento inválido. Gabarito C confere.")
CTX58 = ("Considere os seguintes conjuntos: P = {todos os policiais federais em efetivo exercício no país}; P1 = {policiais federais em efetivo exercício no país e que têm até 1 ano de experiência no exercício do cargo}; "
         "P2 = {... até 2 anos de experiência}; P3 = {... até 3 anos de experiência} e, assim, sucessivamente.\nCom base nessas informações, julgue os itens que se seguem.")
D[58] = dict(action="activate", ctx=CTX58, topic=RL2, note="Todo policial tem experiência finita, logo pertence a algum Pk: P é a união dos Pk. Gabarito C confere.")
D[59] = dict(action="activate", ctx=CTX58, topic=RL2, note="P1 ⊂ P2, e não o contrário. Gabarito E confere.")
D[60] = dict(action="activate", ctx=CTX58, topic=RL2, note="P2 ⊂ P3: o conjunto entre 2 e 3 anos é P3−P2 (e a probabilidade é dividida por n(P), não n(P3)). Gabarito E confere.")

# ---- Informática
INF = {
    61: (1, "Em pesquisa do Google, a correspondência exata usa aspas e o operador site: (site:pf.gov.br); a sintaxe apresentada está errada. Gabarito E confere."),
    64: (1, "No Linux, pwd mostra o diretório atual; a troca de senha é feita com passwd. Gabarito E confere."),
    66: (2, "O IP define o formato dos pacotes entre roteadores e sistemas finais. Gabarito C confere."),
    67: (2, "As pilhas TCP/IP de cinco camadas e OSI compartilham as camadas física, de enlace, de rede, de transporte e de aplicação. Gabarito C confere."),
    68: (2, "Transferência confiável de dados é papel do TCP; SMTP é protocolo de correio. Gabarito E confere."),
    69: (3, "Item de segurança conceitual. Gabarito E confere."),
    70: (3, "A situação descrita (dados criptografados e resgate) é ransomware, não backdoor. Gabarito E confere."),
    71: (5, "PaaS não oferece o nível de controle descrito (que é o de IaaS). Gabarito E confere."),
    72: (5, "A elasticidade é característica da nuvem; a afirmativa de inflexibilidade é falsa. Gabarito E confere."),
    73: (4, "Entropia e homeostase decorrem de mudanças e ajustamentos sistêmicos. Gabarito C confere."),
    74: (4, "Sistemas abertos trocam continuamente com o ambiente. Gabarito C confere."),
    75: (4, "O modelo espiral de Boehm é dirigido a riscos; a afirmativa é falsa. Gabarito E confere."),
    76: (4, "Análise e definição de requisitos é etapa do método clássico. Gabarito C confere."),
    79: (2, "Roteadores operam na camada de rede do modelo OSI. Gabarito C confere."),
    80: (2, "UDP e TCP são protocolos da camada de transporte. Gabarito C confere."),
    81: (2, "Quadros (frames) são da camada de enlace, não de transporte. Gabarito E confere."),
    82: (2, "Uma LAN não fornece por si só conectividade com a Internet. Gabarito E confere."),
    83: (5, "Metadado descreve o arquivo (autor, data, formato), não seu destino final. Gabarito E confere."),
    86: (4, "Clustering agrupa objetos por similaridade. Gabarito C confere."),
    87: (4, "Entropia da informação mede incerteza, não a confiança de um intervalo. Gabarito E confere."),
    88: (4, "Big data envolve volume, variedade e velocidade, não só tabelas relacionais. Gabarito E confere."),
    89: (4, "Atributos são colunas; registros são linhas. Gabarito E confere."),
    90: (4, "No modelo E-R, entidade representa objeto do mundo real. Gabarito C confere."),
    91: (4, "Restrições de integridade garantem a confiabilidade dos dados. Gabarito C confere."),
    93: (4, "'Hiperchave' não é a definição de chave. Gabarito E confere."),
    94: (4, "Dados estruturados têm formato rígido e cabem em tabelas relacionais. Gabarito C confere."),
    95: (4, "DTL/TCL: comandos de controle de transações. Gabarito C confere."),
    96: (5, "API é uma interface de programação, não um padrão XML. Gabarito E confere."),
}
for n, (t, note) in INF.items():
    D[n] = dict(action="activate", topic=("Informática", t), note=note)
CTX77 = ("Considere que a Polícia Federal tenha registrado, em determinado período, a prisão de 1.789 traficantes de drogas pertencentes a facções criminosas, conforme faixas etárias mostradas no gráfico (gráfico de setores “Idade dos traficantes”, com as faixas de 15 a 19, 20 a 29, 30 a 39, 40 a 49, 50 a 59 e 60 anos ou mais).\n"
         "Com referência às informações e ao gráfico precedentes, julgue os itens subsecutivos.")
D[77] = dict(action="activate", ctx=CTX77, topic=("Informática", 4), note="Dados isolados não são inteligência. Gabarito E confere.")
D[78] = dict(action="activate", ctx=CTX77, topic=("Informática", 4), note="Um número solto, sem contexto, é dado e não informação. Gabarito E confere.")
OBS = "Arquivado como obsoleto (27/09/2026): item preso a comportamento ou versão de produto ({x}); o edital PF 2025 cobra o tema de forma genérica. A chave oficial continua usada na pontuação."
D[62] = dict(action="obsolete", note=OBS.format(x="recurso do Google Chrome"))
D[63] = dict(action="obsolete", note=OBS.format(x="ícone de cadeado do Chrome, alterado em versões recentes"))
D[65] = dict(action="obsolete", note=OBS.format(x="recurso do Excel dependente de figura da planilha"))
D[84] = dict(action="block",
             text='Item: O código Python a seguir apresenta como resultado "True".\nx = bool(-3)\ny = bool("True"*x)\nz = bool("False")\nprint (x and y and z)',
             note="Bloqueado (27/09/2026): o gabarito oficial é E, mas a execução do código imprime True (x, y e z são verdadeiros), o que tornaria o item certo. Divergência entre a chave e o comportamento do código; a chave continua valendo para a pontuação.")
D[85] = dict(action="block",
             text='Item: O resultado do código R seguinte será "12".\nf<- function(x) {\n  g <- function(y) {\n    y + z\n  }\n  z <- 4\n  x + g(x)\n}\nz <- 10\nf (4)',
             note="Bloqueado (27/09/2026): o gabarito oficial é E, mas pelo escopo léxico do R, g(4) usa z = 4 (definido em f) e f(4) = 4 + 8 = 12, o que tornaria o item certo. Divergência entre a chave e o comportamento do código; a chave continua valendo para a pontuação.")

# ---- Contabilidade geral
CG = "Contabilidade Geral"
D[97] = dict(action="activate", topic=(CG, 2), note="Ativo 340.000 (20+50+40+200−10+10+30) = passivo 110.000 + PL 230.000 (capital 220.000 + reservas 10.000). Gabarito C confere.")
D[98] = dict(action="activate", topic=(CG, 3), basis=[LEI6404], note="Lei 6.404/76, art. 183, V (Planalto compilado, 27/09/2026): imobilizado pelo custo de aquisição, deduzido da depreciação acumulada. Gabarito C confere.")
D[99] = dict(action="activate", topic=(CG, 1), note="Caixa e estoques são contas de ativo, de saldo devedor. Gabarito E confere.")
D[100] = dict(action="activate", topic=(CG, 2), note="Disponibilidades: caixa 20.000 + bancos 10.000 + aplicações de liquidez imediata 30.000 = 60.000. Gabarito E confere.")
D[101] = dict(action="activate", topic=(CG, 2), note="Ativo total 340.000 (não 350.000) e capital de terceiros 110.000 (não 120.000). Gabarito E confere.")
D[102] = dict(action="activate", topic=(CG, 1), note="Quitar dívida com desconto altera a composição e o valor do patrimônio: fato misto. Gabarito C confere.")
D[103] = dict(action="activate", topic=(CG, 1), note="O desconto obtido é receita financeira reconhecida pelo regime de competência na quitação. Gabarito C confere.")
D[104] = dict(action="activate", topic=(CG, 1), note="Na equação ampliada, despesas e perdas ficam ao lado do ativo; receitas e ganhos, ao lado do passivo e PL. Gabarito E confere.")
D[105] = dict(action="activate", topic=(CG, 1), note="O Razão apresenta os saldos das contas patrimoniais. Gabarito C confere.")
D[107] = dict(action="activate", topic=(CG, 1), note="Fornecedores e impostos a recolher são contas de passivo, de saldo credor. Gabarito E confere.")
D[109] = dict(action="activate", topic=(CG, 1), note="A fórmula complexa admite uma devedora e várias credoras ou várias devedoras e uma credora. Gabarito E confere.")
D[113] = dict(action="activate", topic=(CG, 3), basis=[LEI6404], note="Lei 6.404/76, art. 183, I, b (Planalto compilado, 27/09/2026): direitos e títulos de crédito ajustados ao valor provável de realização quando inferior. Gabarito C confere.")
D[114] = dict(action="activate", topic=(CG, 3), basis=[LEI6404], note="A perda estimada é reconhecida como despesa em contrapartida de conta redutora do ativo (provisão), não da própria conta de recebíveis (art. 183, I, b). Gabarito E confere.")
D[115] = dict(action="activate", topic=(CG, 2), note="Adiantamentos a empregados são ativo (direito), não despesa. Gabarito E confere.")
D[116] = dict(action="activate", topic=(CG, 2), basis=[LEI6404], note="Lei 6.404/76, art. 187, I (Planalto compilado): deduções, abatimentos e impostos sobre vendas; não são 'todas as despesas' sobre a receita. Gabarito E confere.")
D[117] = dict(action="activate", topic=(CG, 2), note="No setor industrial, o custo das vendas é o CPV. Gabarito C confere.")
D[118] = dict(action="activate", topic=(CG, 3), basis=[CPC26], note="CPC 26 (R1), item 69(b) (CVM): passivo mantido essencialmente para negociação é circulante. Gabarito C confere.")
D[120] = dict(action="activate", topic=(CG, 3), note="CPC 04 (R1), item 97: a amortização do intangível de vida útil definida começa quando o ativo está disponível para uso (conferido em fonte secundária; o pronunciamento não foi consultado diretamente). Gabarito C confere.")
for n in (110, 111, 112):
    D[n] = dict(action="block", note="Bloqueado (27/09/2026): a NBC TSP Estrutura Conceitual foi revisada (R1, 13/11/2025, após a prova); é preciso conferir o texto vigente antes de publicar. A chave oficial continua valendo para a pontuação.")

if __name__ == "__main__":
    out = os.path.join(ROOT, "supabase", "migrations", "20260927390000_pf_2021_review_wave.sql")
    c = W.build_sql(CFG, D, out, "Onda 2 (parte 2): PF 2021 (Agente). Gerado por scripts/review/wave_pf2021.py.\nTextos recuperados do caderno oficial (CEBRASPE 2021); leis e pronunciamentos conferidos em 27/09/2026.")
    print(c, sum(c.values()), "de 115")
    print("sem decisão (devem ser só ativos/anulados):", [n for n in range(1, 121) if n not in D])
