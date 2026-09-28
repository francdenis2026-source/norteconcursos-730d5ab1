# Onda 2 (parte 1): PF 2014 (Agente). Gera supabase/migrations/20260927380000_pf_2014_review_wave.sql
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
import wave_lib as W

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PDF = r"C:\Users\familia\Desktop\PROVAS FEITAS POR MIM\POLICIA FEDERAL\2014\prova-de-apf-pdf.PDF.pdf"
CFG = dict(year=2014, career="Agente de Polícia Federal", pdf=PDF)

LEI6404 = ("Lei nº 6.404/1976 – texto compilado", "https://www.planalto.gov.br/ccivil_03/leis/l6404compilada.htm")
MANUAL = ("Manual de Redação da Presidência da República (3ª ed.)",
          "https://www4.planalto.gov.br/centrodeestudos/assuntos/manual-de-redacao-da-presidencia-da-republica/manual-de-redacao.pdf")

D = {}
PT_NOTE = "Texto-base e item recuperados do caderno oficial (CEBRASPE, PF 2014); gabarito definitivo conferido. Matéria compatível com o edital PF 2025 (Língua Portuguesa)."
for n in list(range(1, 21)) + [22, 23, 24]:
    D[n] = dict(action="activate", note=PT_NOTE, topic=("Língua Portuguesa", 1))
D[27] = dict(action="activate", topic=("Língua Portuguesa", 3), basis=[MANUAL],
             note="Conferido no Manual de Redação da Presidência (3ª ed., Planalto, cap. 5): o padrão ofício abrange ofício, aviso e memorando; a mensagem tem estrutura própria. Gabarito E confere.")
D[28] = dict(action="activate", topic=("Língua Portuguesa", 3), basis=[MANUAL],
             note="Conferido no Manual de Redação da Presidência (3ª ed., item 5.1.8): exceto os expedientes assinados pelo Presidente da República, todos informam o signatário com nome e cargo. Gabarito C confere.")
for n in (25, 26, 29, 30):
    D[n] = dict(action="block", note="Bloqueado (27/09/2026): item depende do Manual de Redação da Presidência; a conferência da regra contra a edição vigente (3ª ed., 2018) não foi concluída. A chave oficial continua valendo para a pontuação.")

# Informática
D[31] = dict(action="activate", topic=("Informática", 1), note="Item conceitual: nenhum sistema, Linux inclusive, garante a ausência de perda de dados em queda de energia. Gabarito E confere.")
D[36] = dict(action="activate", topic=("Informática", 1), note="PuTTY permite acesso remoto (SSH) a Linux a partir do Windows e execução remota de comandos. Gabarito C confere.")
D[38] = dict(action="activate", topic=("Informática", 2), note="Protocolos de rede não são específicos de sistema operacional. Gabarito E confere.")
D[39] = dict(action="activate", topic=("Informática", 2), note="Redes MAN podem usar tecnologias sem fio (ex.: WiMAX). Gabarito E confere.")
D[41] = dict(action="activate", topic=("Informática", 5), note="Em nuvem também é possível executar aplicações instaladas localmente; a afirmativa de desvantagem é falsa. Gabarito E confere.")
D[42] = dict(action="activate", topic=("Informática", 5), note="Computação em nuvem interliga computadores heterogêneos, inclusive com sistemas operacionais diferentes. Gabarito C confere.")
D[47] = dict(action="activate", topic=("Informática", 3), note="Firewall controla o tráfego que o atravessa; não protege contra ataques originados dentro da rede que não passam por ele. Gabarito C confere.")
D[48] = dict(action="activate", topic=("Informática", 3), note="Botnets permitem controle remoto e ataques sem ciência do usuário. Gabarito C confere.")
OBS = "Arquivado como obsoleto (27/09/2026): item preso a produto ou versão descontinuada ({x}); o edital PF 2025 cobra o tema de forma genérica. A chave oficial continua usada na pontuação."
for n, x in {32: "Word 2013", 33: "Word 2013", 34: "Word 2013", 44: "Word 2013", 37: "comportamento específico do navegador",
             35: "LILO, gerenciador de boot abandonado", 40: "Mozilla Thunderbird", 43: "Mozilla Thunderbird", 45: "Windows 8"}.items():
    D[n] = dict(action="obsolete", note=OBS.format(x=x))

# Raciocínio lógico
CTX57 = ("Em um restaurante, João, Pedro e Rodrigo pediram pratos de carne, frango e peixe, não necessariamente nessa ordem, mas cada um pediu um único prato. "
         "As cores de suas camisas eram azul, branco e verde; Pedro usava camisa azul; a pessoa de camisa verde pediu carne e Rodrigo não pediu frango. "
         "Essas informações podem ser visualizadas em uma tabela (linhas: azul, branca, verde, João, Pedro, Rodrigo; colunas: carne, frango, peixe, João, Pedro, Rodrigo), "
         "em que V corresponde a fato verdadeiro e F, a fato falso, e que já traz preenchidas as células azul×Pedro = V, verde×carne = V e Rodrigo×frango = F.\n"
         "Considerando a situação apresentada e, no que couber, o preenchimento da tabela acima, julgue os itens seguintes.")
CTX62 = ("As seguintes premissas referem-se a uma argumentação hipotética:\n"
         "• Se Paulo é inocente, então João ou Jair é culpado.\n"
         "• Se João é culpado, então Jair é inocente.\n"
         "• Se Jair é culpado, então, no depoimento de José e no de Maria, todas as afirmações de José eram verdadeiras e todas as afirmações de Maria eram falsas.\n"
         "Com referência a essas premissas, julgue os próximos itens.")
CTX66 = ("Um batalhão é composto por 20 policiais: 12 do sexo masculino e 8 do sexo feminino. A região atendida pelo batalhão é composta por 10 quadras e, "
         "em cada dia da semana, uma dupla de policiais policia cada uma das quadras.\nCom referência a essa situação, julgue os itens subsequentes.")
RL = ("Raciocínio Lógico", 1)
D[58] = dict(action="activate", ctx=CTX57, topic=RL, note="Se João pediu peixe, ele não é o de camisa verde (que pediu carne); logo Rodrigo é o de camisa verde. Conferido por dedução; gabarito C confere.")
D[59] = dict(action="activate", ctx=CTX57, topic=RL, note="Pedro pode ter pedido frango ou peixe: não é possível inferir. Conferido por dedução; gabarito E confere.")
D[60] = dict(action="activate", ctx=CTX57, topic=RL, note="Com João de peixe, Rodrigo (verde) pediu carne, João usa branca e Pedro pediu frango: tudo fica determinado, logo o item é errado. Gabarito E confere.")
D[62] = dict(action="activate", ctx=CTX62, topic=RL, note="Se a afirmação de Maria é verdadeira, não são todas falsas; pela terceira premissa, Jair não é culpado. Gabarito E confere.")
D[63] = dict(action="activate", ctx=CTX62, topic=RL,
             body="Considerando as proposições P: Paulo é inocente; Q: João é culpado; R: Jair é culpado; S: José falou a verdade no depoimento; e T: Maria falou a verdade no depoimento, é correto concluir que P → Q∨S∨T.",
             note="P → (Q∨R) e R → S; logo P → (Q∨S), que implica P → (Q∨S∨T). Fórmula conferida na imagem do caderno; gabarito C confere.")
D[64] = dict(action="activate", ctx=CTX62, topic=RL, note="Contrapositiva da segunda premissa: se Jair é culpado, João é inocente. Gabarito C confere.")
D[65] = dict(action="activate", topic=RL, ctx="Considerando que P, Q e R sejam proposições simples, julgue o item abaixo.",
             body="A partir do preenchimento da tabela-verdade abaixo, é correto concluir que a proposição P∧Q∧R→P∨Q é uma tautologia. Tabela: colunas P, Q, R, P∧Q∧R, P∨Q e P∧Q∧R→P∨Q; linhas (P, Q, R): VVV, VVF, VFV, VFF, FVV, FVF, FFV, FFF.",
             note="Se P∧Q∧R é verdadeira, P∨Q também é: a condicional nunca é falsa. Fórmula conferida na imagem do caderno; gabarito C confere.")
RL2 = ("Raciocínio Lógico", 2)
D[66] = dict(action="activate", ctx=CTX66, topic=RL2, note="P(mesmo sexo) = [C(12,2)+C(8,2)]/C(20,2) = 94/190 ≈ 0,495, inferior a 0,5. Gabarito E confere.")
D[67] = dict(action="activate", ctx=CTX66, topic=RL2, note="Se 15 têm pelo menos 10 anos de serviço, apenas 5 têm menos de 10: não são mais de 6. Gabarito E confere.")
D[68] = dict(action="activate", ctx=CTX66, topic=RL2, note="(12+3x)/(20+4x) = 0,7 → x = 10 mulheres admitidas → 18 mulheres, mais de 15. Gabarito C confere.")
D[69] = dict(action="activate", ctx=CTX66, topic=RL, note="Contrapositiva: quem não pratica futebol não pratica voleibol nem basquetebol. Gabarito C confere.")
D[70] = dict(action="activate", ctx=CTX66, topic=RL2, note="Há C(20,2)=190 duplas possíveis; para repetir uma dupla na mesma quadra, passam-se ao menos 190 dias, mais de seis meses. Gabarito C confere.")

# Contabilidade geral
CG = "Contabilidade Geral"
D[81] = dict(action="activate", topic=(CG, 1), note="A apropriação mensal do seguro debita despesa de seguros e credita seguros a vencer (ativo), não bancos/caixa. Gabarito E confere.")
D[82] = dict(action="activate", topic=(CG, 1), note="O direito de exploração de jazida de terceiro é bem incorpóreo (direito). Gabarito C confere.")
D[83] = dict(action="activate", topic=(CG, 1), note="O pagamento de duplicata a pagar reduz ativo e passivo sem alterar o patrimônio líquido: fato permutativo. Gabarito C confere.")
D[85] = dict(action="activate", topic=(CG, 1), note="O plano de contas reúne os elementos necessários ao registro das operações, que variam de empresa para empresa. Gabarito C confere.")
D[86] = dict(action="activate", topic=(CG, 1), note="Superveniência ativa e insubsistência passiva aumentam o patrimônio líquido (mesmo efeito), logo o item é errado. Terminologia clássica da contabilidade patrimonial. Gabarito E confere.")
D[87] = dict(action="block", note="Bloqueado (27/09/2026): o gabarito oficial C exige perda 'permanente' para a provisão; o art. 183 da Lei 6.404/76 (Planalto, compilado) manda ajustar mercadorias e produtos ao valor de mercado quando inferior (inciso II) e só fala em perda permanente para investimentos societários (inciso III). Divergência com o texto vigente; a chave oficial continua valendo para a pontuação.")
D[88] = dict(action="activate", topic=(CG, 2), basis=[LEI6404], note="Lei 6.404/76, art. 187, III (Planalto compilado, conferido em 27/09/2026): despesas com vendas são separadas das gerais e administrativas; comissões de vendedores são despesas com vendas. Gabarito E confere.")
D[89] = dict(action="activate", topic=(CG, 3), basis=[LEI6404], note="Lei 6.404/76, art. 182, §1º, b (Planalto compilado, conferido em 27/09/2026): o produto da alienação de partes beneficiárias e bônus de subscrição é reserva de capital. Gabarito C confere.")
D[90] = dict(action="activate", topic=(CG, 2), note="O balancete de verificação extrai os saldos do livro razão, não do diário. Gabarito E confere.")

# Fora da matriz PF 2025 (Agente)
OUT = "Arquivado (27/09/2026): disciplina fora da matriz do edital PF 2025 – Agente (Cargo 16). A chave oficial continua usada na pontuação do aluno."
for n in list(range(71, 77)) + [78, 79, 80] + list(range(91, 101)):
    D[n] = dict(action="archive", note=OUT)

# Jurídicos ainda bloqueados
D[105] = dict(action="block", text="Enunciado: Logo que tiver conhecimento da prática de infração penal, a autoridade policial deverá:\n\nItem: determinar, se for caso, a realização das perícias que se mostrarem necessárias e proceder a acareações.",
              note="Enunciado-base recuperado do caderno (2014). Bloqueado: falta confrontar o art. 6º do CPP com o texto compilado no Planalto (a consulta ao site não retornou o dispositivo em 27/09/2026).")
D[110] = dict(action="block", note="Bloqueado (27/09/2026): item conceitual/doutrinário sem texto legal específico que o fundamente; a governança exige fonte oficial vigente.")
D[112] = dict(action="block", note="Bloqueado (27/09/2026): item conceitual/doutrinário (poder disciplinar x poder de polícia) sem texto legal específico; a governança exige fonte oficial vigente.")
D[115] = dict(action="block", text="Enunciado: Um agente da Polícia Federal foi escalado para atuar em operação para cumprimento de mandado judicial de prisão e de busca e apreensão, durante o dia, de documentos no escritório profissional do investigado. A respeito da atuação do agente na situação descrita acima, julgue os itens a seguir.\n\nItem: Mesmo sem o consentimento do proprietário, é permitido ao agente entrar no escritório profissional onde se encontrem os objetos de busca e apreensão.",
              note="Enunciado-base recuperado do caderno (2014). Bloqueado: falta confrontar o art. 5º, XI, da CF e as regras de busca e apreensão em escritório (Estatuto da Advocacia, alterado em 2022) com o texto compilado no Planalto.")

if __name__ == "__main__":
    out = os.path.join(ROOT, "supabase", "migrations", "20260927380000_pf_2014_review_wave.sql")
    c = W.build_sql(CFG, D, out, "Onda 2 (parte 1): PF 2014 (Agente). Gerado por scripts/review/wave_pf2014.py.\nTextos recuperados do caderno oficial (CEBRASPE 2014); regras e leis conferidas em 27/09/2026.")
    print(c, sum(c.values()), "de 90")
