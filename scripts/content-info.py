#!/usr/bin/env python3
"""Noções de Informática: teoria didática e 45 questões novas. python3 scripts/content-info.py"""
import sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from qlib import Q, teoria, salvar

teoria("info_win",
 """<p><b>Em uma frase:</b> o sistema operacional (Windows) gerencia arquivos, programas e dispositivos; saber seus atalhos e conceitos básicos resolve boa parte da prova.</p>
<div class="exemplo"><b>Analogia:</b> o Windows é o gerente do escritório: organiza as pastas (gavetas), abre os programas (ferramentas) e controla quem usa o quê.</div>
<h3>Arquivos e pastas</h3>
<ul><li><b>Arquivo</b> guarda informação; <b>pasta</b> organiza arquivos. A <b>extensão</b> (.docx, .xlsx, .pdf, .jpg) indica o tipo.</li><li>A <b>Lixeira</b> guarda arquivos excluídos do disco rígido e permite restaurar. <b>Shift + Delete</b> exclui sem passar pela Lixeira.</li><li>Arquivos excluídos de <b>pen drive</b> e de unidades de rede, em geral, não vão para a Lixeira.</li><li><b>Compactar</b> (.zip) reduz o tamanho e agrupa arquivos.</li></ul>
<h3>Atalhos que mais caem</h3>
<ul><li><b>Ctrl + C</b> copiar, <b>Ctrl + X</b> recortar, <b>Ctrl + V</b> colar.</li><li><b>Ctrl + Z</b> desfazer, <b>Ctrl + Y</b> refazer.</li><li><b>Ctrl + A</b> selecionar tudo. <b>Ctrl + P</b> imprimir.</li><li><b>Alt + Tab</b> alternar entre janelas. <b>Alt + F4</b> fechar a janela ativa.</li><li><b>Win + D</b> mostrar a área de trabalho. <b>Win + E</b> abrir o Explorador de Arquivos. <b>Win + L</b> bloquear o computador.</li><li><b>F2</b> renomear. <b>F5</b> atualizar. <b>Ctrl + Shift + Esc</b> Gerenciador de Tarefas.</li></ul>
<h3>Armadilhas</h3>
<ul><li>Copiar duplica; <b>recortar</b> move.</li><li>Fechar a janela não é o mesmo que encerrar o programa em segundo plano.</li></ul>
<h3>Teste rápido</h3><p>Qual atalho alterna entre janelas abertas? <b>Resposta:</b> Alt + Tab.</p>""",
 "Você quer mover o arquivo laudo.docx da pasta Downloads para a pasta Casos. Passo 1: clique no arquivo e use <b>Ctrl + X</b> (recortar). Passo 2: abra a pasta Casos. Passo 3: use <b>Ctrl + V</b> (colar). O arquivo foi <b>movido</b>; se usasse Ctrl + C, ele seria copiado e continuaria nas duas pastas.",
 "(1) Mover = recortar + colar. (2) Copiar = copiar + colar. (3) Desfazer = Ctrl + Z. (4) Para trocar de janela, Alt + Tab. (5) Para ver o desktop, Win + D.",
 "Ctrl+C copia, Ctrl+X move, Ctrl+V cola, Ctrl+Z desfaz.")
teoria("info_word",
 """<p><b>Em uma frase:</b> o editor de textos (Word ou Writer) serve para criar documentos: digitar, formatar, inserir imagens e tabelas e preparar a impressão.</p>
<div class="exemplo"><b>Analogia:</b> é uma máquina de escrever com borracha: você corrige, formata e reorganiza sem refazer o papel.</div>
<h3>Formatação</h3>
<ul><li><b>Fonte:</b> tipo, tamanho, negrito, itálico, sublinhado, cor.</li><li><b>Parágrafo:</b> alinhamento (esquerda, centralizado, direita, justificado), espaçamento entre linhas, recuo.</li><li><b>Estilos:</b> modelos de formatação (Título 1, Título 2) que permitem montar <b>sumário automático</b>.</li></ul>
<h3>Recursos que caem</h3>
<ul><li><b>Localizar e substituir.</b></li><li><b>Cabeçalho e rodapé:</b> repetem informação no topo e na base de cada página. <b>Numeração de páginas</b> costuma ficar no rodapé.</li><li><b>Quebra de página:</b> força o texto seguinte a começar numa nova página.</li><li><b>Revisão:</b> ortografia e gramática, controle de alterações e comentários.</li><li><b>Tabelas</b> para organizar dados em linhas e colunas.</li></ul>
<h3>Atalhos comuns</h3>
<ul><li><b>Ctrl + N</b> negrito, <b>Ctrl + I</b> itálico (Word em português). <b>Ctrl + Z</b> desfazer. <b>Ctrl + C / X / V</b> copiar, recortar, colar. <b>Ctrl + P</b> imprimir.</li></ul>
<h3>Armadilhas</h3>
<ul><li>Salvar × Salvar como: 'Salvar como' cria uma cópia com outro nome, formato ou local.</li><li>Formatos: .docx (Word), .odt (Writer/BrOffice), .pdf (leitura fixa).</li></ul>
<h3>Teste rápido</h3><p>Onde fica o número da página, em geral? <b>Resposta:</b> no cabeçalho ou no rodapé.</p>""",
 "Você precisa que cada página do relatório mostre 'Delegacia Regional – Rio Branco' no alto e o número da página embaixo. Passo 1: abra o recurso <b>Cabeçalho</b> e digite o nome da delegacia. Passo 2: abra o <b>Rodapé</b> e insira <b>Número de Página</b>. Passo 3: o texto se repete automaticamente em todas as páginas.",
 "(1) Formatação de caractere: fonte, tamanho, negrito. (2) Formatação de parágrafo: alinhamento e espaçamento. (3) Repetir algo em toda página: cabeçalho ou rodapé. (4) Sumário automático: use estilos de título.",
 "Sumário automático exige estilos de título. Cabeçalho e rodapé repetem em todas as páginas.")
teoria("info_excel",
 """<p><b>Em uma frase:</b> a planilha organiza dados em linhas e colunas e calcula com <b>fórmulas</b>, que sempre começam com <b>=</b>.</p>
<div class="exemplo"><b>Analogia:</b> uma planilha é um caderno quadriculado inteligente: você escreve os números e ele faz as contas sozinho.</div>
<h3>Conceitos</h3>
<ul><li><b>Célula:</b> encontro de coluna e linha (A1). <b>Intervalo:</b> A1:A10.</li><li>Fórmulas começam com <b>=</b>. Operadores: + − * / ^ (potência).</li></ul>
<h3>Funções que mais caem (português)</h3>
<ul><li><b>=SOMA(A1:A5)</b>, <b>=MÉDIA(A1:A5)</b>, <b>=MÁXIMO()</b>, <b>=MÍNIMO()</b></li><li><b>=CONT.VALORES()</b> conta células preenchidas; <b>=CONT.NÚM()</b> conta números.</li><li><b>=SE(teste; valor_se_verdadeiro; valor_se_falso)</b></li><li><b>=CONT.SE(intervalo; critério)</b> e <b>=SOMASE(intervalo; critério; intervalo_soma)</b>.</li></ul>
<h3>Referências</h3>
<ul><li><b>Relativa (A1):</b> muda ao copiar. <b>Absoluta ($A$1):</b> não muda. <b>Mista (A$1 ou $A1):</b> fixa só a linha ou a coluna. <b>F4</b> alterna.</li></ul>
<h3>Armadilhas</h3>
<ul><li>Ordem das operações: multiplicação e divisão antes de soma e subtração. Parênteses mandam.</li><li>Erros: <b>#DIV/0!</b> (divisão por zero), <b>#NOME?</b> (nome de função errado), <b>#REF!</b> (referência inválida), <b>#VALOR!</b> (tipo de dado errado).</li></ul>
<h3>Teste rápido</h3><p>Se A1 = 4 e A2 = 6, qual o resultado de =MÉDIA(A1:A2)? <b>Resposta:</b> 5.</p>""",
 "Na coluna A estão as notas 6, 8 e 10 (A1:A3). Calcule a média e diga se está aprovado, com nota mínima 7. Passo 1: <b>=MÉDIA(A1:A3)</b> = (6 + 8 + 10) ÷ 3 = <b>8</b>. Passo 2: <b>=SE(B1>=7;&quot;Aprovado&quot;;&quot;Reprovado&quot;)</b>, com B1 = 8, retorna <b>Aprovado</b>.",
 "(1) Toda fórmula começa com =. (2) Intervalo: primeira:última (A1:A5). (3) Para fixar uma célula ao copiar a fórmula, use $ (F4). (4) SE: teste; se verdadeiro; se falso. (5) Contar com condição: CONT.SE.",
 "=SOMA soma, =MÉDIA tira a média, =SE decide. $ fixa a referência.")
teoria("info_net",
 """<p><b>Em uma frase:</b> a internet é a rede mundial de computadores; o navegador acessa páginas pela URL, e o e-mail troca mensagens por protocolos específicos.</p>
<div class="exemplo"><b>Analogia:</b> a URL é o endereço da casa; o navegador é o carro; o servidor é a casa visitada.</div>
<h3>Navegação</h3>
<ul><li><b>URL:</b> protocolo (https://), domínio (www.exemplo.gov.br), caminho.</li><li><b>HTTP</b> transmite páginas; <b>HTTPS</b> é a versão <b>criptografada</b> (cadeado no navegador).</li><li><b>Cookies:</b> pequenos arquivos que guardam preferências e sessões. <b>Cache:</b> cópia local para carregar mais rápido.</li><li><b>Navegação anônima/privada:</b> não guarda histórico local, mas <b>não torna o usuário invisível</b> para o provedor, o site ou a empresa.</li><li><b>DNS</b> traduz nome de site em endereço IP.</li></ul>
<h3>E-mail</h3>
<ul><li><b>Cc</b> (cópia): todos veem. <b>Cco</b> (cópia oculta): os outros não veem esses destinatários.</li><li><b>SMTP</b> envia. <b>POP3</b> baixa as mensagens para o computador. <b>IMAP</b> mantém as mensagens no servidor e sincroniza.</li><li>Anexos grandes podem ser enviados por links em nuvem.</li></ul>
<h3>Outros conceitos</h3>
<ul><li><b>Download</b> = baixar; <b>upload</b> = enviar.</li><li><b>Computação em nuvem:</b> armazenar e usar recursos pela internet (Google Drive, OneDrive).</li><li><b>Buscadores:</b> operadores como aspas ("frase exata") e menos (-termo) refinam a busca.</li></ul>
<h3>Teste rápido</h3><p>Qual protocolo envia e-mail? <b>Resposta:</b> SMTP.</p>""",
 "Você precisa enviar um comunicado a vários servidores sem que eles vejam os endereços uns dos outros. Passo 1: coloque os destinatários no campo <b>Cco</b> (cópia oculta). Passo 2: deixe o campo 'Para' com o seu endereço. Passo 3: envie. Cada destinatário vê só o seu próprio endereço, e o envio é feito pelo protocolo <b>SMTP</b>.",
 "(1) HTTPS = segurança na transmissão. (2) Cco esconde destinatários. (3) SMTP envia, POP3/IMAP recebem. (4) Navegação anônima apaga o histórico local, não a identidade na rede.",
 "SMTP envia; POP3 baixa; IMAP sincroniza. Cco esconde.")
teoria("info_seg",
 """<p><b>Em uma frase:</b> segurança básica é proteger dados e equipamentos contra perda, vazamento e invasão, com hábitos e ferramentas simples.</p>
<div class="exemplo"><b>Analogia:</b> é como cuidar da casa: trancar a porta (senha), ter alarme (antivírus e firewall) e guardar cópia da chave (backup).</div>
<h3>Ameaças (malwares)</h3>
<ul><li><b>Vírus:</b> precisa de um arquivo hospedeiro e se espalha ao ser executado.</li><li><b>Worm:</b> se replica sozinho pela rede.</li><li><b>Cavalo de troia (trojan):</b> parece útil, mas esconde código malicioso.</li><li><b>Spyware</b> espiona; <b>keylogger</b> registra o que se digita.</li><li><b>Ransomware:</b> sequestra os dados (criptografa) e exige resgate.</li><li><b>Phishing:</b> mensagem falsa para roubar dados. <b>Engenharia social:</b> enganar pessoas, não máquinas.</li></ul>
<h3>Defesas</h3>
<ul><li><b>Antivírus:</b> detecta e remove ameaças conhecidas. <b>Firewall:</b> filtra o tráfego de rede.</li><li><b>Backup:</b> cópia dos dados. Boa prática: regra <b>3-2-1</b> (3 cópias, 2 mídias, 1 fora do local).</li><li><b>Senhas fortes</b> e <b>autenticação em dois fatores (2FA)</b>.</li><li><b>Atualizar</b> sistema e programas corrige falhas.</li><li><b>Criptografia</b> embaralha dados para que só quem tem a chave leia.</li></ul>
<h3>Armadilhas</h3>
<ul><li>Antivírus <b>não</b> protege contra engenharia social.</li><li>Link de e-mail desconhecido: não clique; confira o remetente.</li></ul>
<h3>Teste rápido</h3><p>Qual malware sequestra os dados e pede resgate? <b>Resposta:</b> ransomware.</p>""",
 "Você recebe um e-mail do 'banco' pedindo para clicar num link e confirmar sua senha. Passo 1: reconheça sinais de <b>phishing</b>: urgência, link estranho, pedido de dados. Passo 2: <b>não clique</b> e não informe a senha. Passo 3: acesse o site do banco digitando o endereço, ou ligue para a central. Passo 4: denuncie a mensagem como phishing.",
 "(1) Identifique o tipo de ameaça pelo comportamento. (2) Defesa técnica: antivírus, firewall, atualização. (3) Defesa humana: desconfiar de links e anexos. (4) Dados importantes: faça backup.",
 "Ransomware sequestra; phishing engana; firewall filtra; backup salva.")

W, D, E, N, S = "info_win", "info_word", "info_excel", "info_net", "info_seg"
# ---------------- Windows ----------------
Q(W, "No Windows, o atalho de teclado Ctrl + X tem a função de:", "recortar o item selecionado, que pode ser colado em outro local.",
  [("copiar o item selecionado, mantendo-o no local original.", "copiar é Ctrl + C."), ("desfazer a última ação.", "desfazer é Ctrl + Z."), ("selecionar todos os itens.", "selecionar tudo é Ctrl + A."), ("excluir o item permanentemente.", "Ctrl + X não exclui: move para a área de transferência.")],
  ["Ctrl + X é o atalho de <b>recortar</b>.", "O item sai do local e vai para a área de transferência.", "Com Ctrl + V ele é colado em outro lugar: o arquivo foi movido."], "Ctrl+X move; Ctrl+C copia.", "Função do atalho Ctrl + X.")
Q(W, "O atalho que permite alternar entre as janelas abertas no Windows é:", "Alt + Tab",
  [("Ctrl + Tab", "alterna entre abas dentro de um mesmo programa."), ("Win + D", "mostra a área de trabalho."), ("Alt + F4", "fecha a janela ativa."), ("Ctrl + Alt + Del", "abre as opções de segurança do sistema.")],
  ["Procure o atalho de alternar janelas.", "Alt + Tab troca de janela; Ctrl + Tab troca de aba dentro de um programa.", "Resposta: Alt + Tab."], "Alt + Tab: janelas.", "Alternar entre janelas.")
Q(W, "No Windows, o atalho Win + D serve para:", "minimizar todas as janelas e mostrar a área de trabalho.",
  [("abrir o Explorador de Arquivos.", "isso é Win + E."), ("bloquear o computador.", "isso é Win + L."), ("abrir a caixa Executar.", "isso é Win + R."), ("abrir o Gerenciador de Tarefas.", "isso é Ctrl + Shift + Esc.")],
  ["D vem de Desktop (área de trabalho).", "O atalho minimiza tudo e mostra a área de trabalho.", "Win + E abre o Explorador; Win + L bloqueia."], "Win+D = desktop.", "Atalho Win + D.")
Q(W, "Ao excluir um arquivo do disco rígido de um computador pelo Explorador de Arquivos com a tecla Delete, o arquivo:", "é enviado à Lixeira, de onde pode ser restaurado.",
  [("é apagado definitivamente, sem recuperação.", "isso ocorre com Shift + Delete."), ("é copiado para a nuvem.", "a exclusão normal não envia à nuvem."), ("é movido para a pasta Documentos.", "o destino é a Lixeira."), ("permanece no local com o nome alterado.", "o arquivo sai do local original.")],
  ["Delete no disco rígido envia o arquivo à Lixeira.", "Da Lixeira, ele pode ser restaurado.", "Shift + Delete apagaria sem passar por ela."], "Lixeira = segunda chance.", "Comportamento da Lixeira.")
Q(W, "Um usuário quer renomear um arquivo selecionado no Explorador de Arquivos pelo teclado. A tecla indicada é:", "F2",
  [("F5", "atualiza a janela."), ("F1", "abre a ajuda."), ("F4", "abre a lista de endereços em algumas janelas."), ("F12", "não é o atalho de renomear.")],
  ["Renomear é uma ação de edição do nome do arquivo.", "No Windows, F2 ativa a edição do nome.", "F5 atualiza e F1 abre a ajuda."], "F2 = renomear.", "Tecla de renomear.")
Q(W, "Qual extensão de arquivo está associada, normalmente, a um arquivo compactado?", ".zip",
  [(".docx", "documento de texto."), (".xlsx", "planilha."), (".jpg", "imagem."), (".mp3", "áudio.")],
  ["Arquivo compactado agrupa e reduz outros arquivos.", ".zip é um formato de compactação muito comum.", ".docx, .xlsx, .jpg e .mp3 são documento, planilha, imagem e áudio."], ".zip, .rar: compactados.", "Extensão de arquivo compactado.")
Q(W, "O atalho Ctrl + Shift + Esc, no Windows, abre diretamente:", "o Gerenciador de Tarefas.",
  [("o Explorador de Arquivos.", "é Win + E."), ("a Lixeira.", "não há atalho padrão assim."), ("as configurações de rede.", "não é esse atalho."), ("o Prompt de Comando.", "não é esse atalho.")],
  ["Ctrl + Shift + Esc é um atalho direto.", "Ele abre o Gerenciador de Tarefas.", "Serve para ver e encerrar processos."], "Ctrl+Shift+Esc: Gerenciador de Tarefas.", "Atalho do Gerenciador de Tarefas.")
Q(W, "Para desfazer a última ação realizada em um programa do Windows, o atalho é:", "Ctrl + Z",
  [("Ctrl + Y", "refaz uma ação desfeita."), ("Ctrl + V", "cola."), ("Ctrl + S", "geralmente salva."), ("Ctrl + A", "seleciona tudo.")],
  ["Desfazer é o oposto de fazer: Ctrl + Z.", "Ctrl + Y refaz o que foi desfeito.", "Ctrl + V cola; Ctrl + A seleciona tudo."], "Z = desfazer; Y = refazer.", "Atalho para desfazer.")
Q(W, "Em relação ao Windows, é correto afirmar que a tecla Print Screen (PrtSc):", "captura a imagem da tela e a copia para a área de transferência.",
  [("imprime todos os documentos abertos.", "a tecla captura a tela, não imprime documentos."), ("desliga a tela do computador.", "não tem essa função."), ("minimiza todas as janelas.", "isso é Win + D."), ("bloqueia o computador.", "isso é Win + L.")],
  ["Print Screen faz a captura da tela.", "A imagem vai para a área de transferência, e pode ser colada em um editor.", "Não imprime documentos."], "PrtSc = fotografa a tela.", "Função da tecla Print Screen.")
# ---------------- Editor de textos ----------------
Q(D, "Em um editor de textos, o recurso utilizado para repetir automaticamente o nome da instituição no alto de todas as páginas é:", "o cabeçalho.",
  [("o rodapé.", "repete no final da página."), ("a nota de rodapé.", "explicação ligada a um trecho, no fim da página."), ("o sumário.", "lista de títulos com páginas."), ("a quebra de página.", "força início de nova página.")],
  ["O recurso repete algo no topo de cada página.", "Isso é o cabeçalho; no final seria o rodapé.", "Nota de rodapé e sumário têm outras funções."], "Topo = cabeçalho; base = rodapé.", "Recurso de repetição no topo da página.")
Q(D, "Para gerar automaticamente um sumário em um documento longo, o usuário deve aplicar aos títulos:", "estilos de título (como Título 1 e Título 2).",
  [("negrito e sublinhado.", "formatação visual não cria sumário."), ("fonte maior que a do texto.", "o tamanho da fonte não define a estrutura."), ("cor diferente do texto.", "cor não cria sumário."), ("quebras de página.", "quebras separam páginas, não montam o sumário.")],
  ["O sumário automático lê a estrutura do documento.", "A estrutura é definida pelos estilos de título.", "Aplique Título 1, Título 2 etc. e insira o sumário."], "Sumário automático = estilos de título.", "Como gerar sumário automático.")
Q(D, "Em um editor de textos, o recurso ‘Localizar e Substituir’ permite:", "trocar todas as ocorrências de uma palavra por outra no documento.",
  [("verificar apenas a ortografia.", "isso é a revisão ortográfica."), ("alterar a cor de fundo da página.", "não é função desse recurso."), ("proteger o documento com senha.", "proteção é outro recurso."), ("converter o documento em planilha.", "não é função desse recurso.")],
  ["'Localizar' encontra um termo.", "'Substituir' troca o termo por outro.", "Pode ser feito em todas as ocorrências de uma vez."], "Localizar e substituir troca termos.", "Função de localizar e substituir.")
Q(D, "A tabela de dados inserida em um documento de texto serve para:", "organizar informações em linhas e colunas.",
  [("apagar texto automaticamente.", "não é a função da tabela."), ("converter imagens em texto.", "isso é OCR, outro recurso."), ("aplicar autenticação por senha.", "não é função de tabela."), ("traduzir o documento.", "não é função de tabela.")],
  ["Tabela é uma grade de linhas e colunas.", "Cada encontro é uma célula.", "Ela organiza e alinha dados."], "Tabela: linhas × colunas.", "Função da tabela no editor.")
Q(D, "Em editores de texto, a opção ‘Salvar como’, quando comparada a ‘Salvar’, é usada para:", "gravar o documento com outro nome, formato ou local.",
  [("apagar a versão anterior do documento.", "não apaga: cria uma cópia."), ("imprimir o documento.", "impressão é outro comando."), ("fechar o programa.", "não fecha o programa."), ("compartilhar o documento por e-mail.", "compartilhar é outro recurso.")],
  ["'Salvar' grava no arquivo atual.", "'Salvar como' cria outra versão com novo nome, formato ou local.", "Útil para gerar um PDF, por exemplo."], "Salvar como = novo nome ou formato.", "Diferença entre Salvar e Salvar como.")
Q(D, "A extensão padrão de um documento do Microsoft Word (versões recentes) é:", ".docx",
  [(".xlsx", "planilha do Excel."), (".pptx", "apresentação do PowerPoint."), (".pdf", "formato de documento portátil."), (".odt", "documento do LibreOffice Writer.")],
  ["O Word grava documentos em .docx nas versões recentes.", ".xlsx é Excel; .pptx é PowerPoint.", ".odt é do Writer."], "Word = .docx.", "Extensão do Word.")
Q(D, "Para justificar o texto de um parágrafo em um editor de textos, é necessário aplicar à seleção:", "alinhamento justificado, que alinha o texto às duas margens.",
  [("alinhamento à esquerda.", "alinha só à margem esquerda."), ("alinhamento centralizado.", "centraliza as linhas."), ("alinhamento à direita.", "alinha só à direita."), ("recuo de primeira linha.", "recuo não alinha às duas margens.")],
  ["Justificar significa alinhar às duas margens.", "As linhas ficam com o mesmo comprimento, ajustando os espaços.", "Opção correta: alinhamento justificado."], "Justificado = duas margens.", "Alinhamento de parágrafo.")
Q(D, "No Word, o recurso ‘Controle de Alterações’ serve para:", "registrar as modificações feitas no texto, permitindo aceitá-las ou rejeitá-las.",
  [("proteger o texto contra cópia.", "proteção é outro recurso."), ("converter o texto para outro idioma.", "isso é tradução."), ("contar o número de palavras.", "isso é a contagem de palavras."), ("inserir hiperlinks no documento.", "hiperlink é outro recurso.")],
  ["Em revisões, é importante saber o que mudou.", "O controle de alterações marca inclusões, exclusões e formatações.", "Depois o revisor aceita ou rejeita cada alteração."], "Controle de alterações = histórico visível de mudanças.", "Função do controle de alterações.")
Q(D, "Uma quebra de página, em um editor de textos, serve para:", "forçar o texto seguinte a começar em uma nova página.",
  [("apagar a página atual.", "não apaga conteúdo."), ("dividir o documento em duas colunas.", "isso é quebra de coluna ou seção."), ("reduzir o tamanho da fonte.", "não altera a fonte."), ("inserir número de página.", "numeração é outro recurso.")],
  ["Às vezes é preciso que um capítulo comece em página nova.", "A quebra de página força o início de nova página.", "O texto antes continua na página anterior."], "Quebra de página = nova página.", "Função da quebra de página.")
# ---------------- Planilhas ----------------
Q(E, "Na planilha, a célula A1 contém 4 e a célula A2 contém 6. O resultado da fórmula =MÉDIA(A1:A2) é:", "5",
  [("10", "é a soma (=SOMA)."), ("24", "é o produto."), ("2", "é a diferença."), ("6", "é o maior valor (=MÁXIMO).")],
  ["MÉDIA soma os valores e divide pela quantidade.", "(4 + 6) ÷ 2.", "Resultado: 5."], "MÉDIA = soma ÷ quantidade.", "Calcular a média no intervalo.")
Q(E, "Na planilha, A1 = 10, A2 = 20 e A3 = 30. O resultado de =SOMA(A1:A3) é:", "60",
  [("20", "é a média."), ("30", "é o máximo."), ("10", "é o mínimo."), ("3", "é a quantidade de células.")],
  ["O intervalo A1:A3 tem as três células.", "SOMA adiciona: 10 + 20 + 30.", "Resultado: 60."], "SOMA(A1:A3) soma as três células.", "Calcular a soma de um intervalo.")
Q(E, "Se a célula A1 contém 8, o resultado de =SE(A1>=7;\"Aprovado\";\"Reprovado\") é:", "Aprovado",
  [("Reprovado", "o teste A1>=7 é verdadeiro (8 ≥ 7)."), ("VERDADEIRO", "a função devolve o texto do argumento, não VERDADEIRO."), ("#NOME?", "a função está escrita corretamente."), ("8", "o SE devolve o texto indicado.")],
  ["Teste: 8 >= 7 é verdadeiro.", "O SE devolve o segundo argumento quando o teste é verdadeiro.", "Resultado: Aprovado."], "SE: teste; se verdadeiro; se falso.", "Resultado da função SE.")
Q(E, "Na planilha, a referência $A$1 é chamada de:", "referência absoluta: não muda quando a fórmula é copiada.",
  [("referência relativa: muda ao copiar a fórmula.", "relativa é A1, sem $."), ("referência mista: fixa só a linha.", "mista tem $ em apenas uma parte."), ("referência externa: aponta para outro arquivo.", "referência externa cita outra pasta de trabalho."), ("intervalo nomeado.", "nome definido pelo usuário, sem $.")],
  ["O cifrão fixa a coluna e a linha.", "$A$1 não muda ao copiar a fórmula.", "É a referência absoluta."], "$ fixa; F4 alterna.", "Tipo de referência.")
Q(E, "Qual função da planilha conta quantas células de um intervalo contêm números?", "=CONT.NÚM()",
  [("=SOMA()", "soma os valores."), ("=MÉDIA()", "calcula a média."), ("=MÁXIMO()", "devolve o maior valor."), ("=SE()", "faz teste lógico.")],
  ["A função precisa contar, e não somar.", "CONT.NÚM conta as células com números.", "CONT.VALORES conta as preenchidas."], "CONT.NÚM = conta números.", "Função de contagem.")
Q(E, "Ao digitar uma fórmula em uma célula de planilha, ela deve começar com o sinal:", "= (igual)",
  [("@ (arroba)", "não inicia fórmula."), ("# (jogo da velha)", "inicia mensagens de erro, não fórmulas."), ("$ (cifrão)", "fixa referências."), ("& (e comercial)", "concatena textos dentro de fórmulas.")],
  ["Toda fórmula precisa avisar que é um cálculo.", "O sinal usado é o de igual.", "Sem ele, a célula trata o conteúdo como texto."], "Fórmula começa com =.", "Início de fórmula.")
Q(E, "Na planilha, o erro #DIV/0! aparece quando:", "ocorre uma divisão por zero.",
  [("o nome da função está incorreto.", "isso gera #NOME?."), ("a referência a uma célula é inválida.", "isso gera #REF!."), ("há texto onde deveria ter número.", "isso gera #VALOR!."), ("o valor não está disponível.", "isso gera #N/D.")],
  ["O erro traz a pista no nome: DIV, divisão.", "Ocorre quando o divisor é zero ou célula vazia.", "Resposta: divisão por zero."], "#DIV/0! = divisão por zero.", "Significado de #DIV/0!.")
Q(E, "Em uma planilha, a função =MÁXIMO(A1:A4) com valores 3, 9, 5 e 7 retorna:", "9",
  [("3", "é o mínimo."), ("24", "é a soma."), ("6", "é a média."), ("4", "é a quantidade de valores.")],
  ["MÁXIMO devolve o maior valor.", "Valores: 3, 9, 5, 7.", "O maior é 9."], "MÁXIMO = maior valor.", "Função de máximo.")
Q(E, "Em uma planilha, a fórmula =2+3*4 retorna:", "14",
  [("20", "somou antes de multiplicar: (2 + 3) × 4."), ("24", "multiplicou todos os números."), ("9", "somou todos os números."), ("10", "calculou outra operação.")],
  ["Multiplicação vem antes da soma.", "3 × 4 = 12.", "2 + 12 = 14."], "Primeiro × e ÷; depois + e −.", "Ordem das operações.")
# ---------------- Internet, e-mail e navegação ----------------
Q(N, "A principal diferença entre os protocolos HTTP e HTTPS é que o HTTPS:", "criptografa a comunicação entre o navegador e o servidor.",
  [("é mais rápido por não usar servidores.", "HTTPS usa servidor e não é, por definição, mais rápido."), ("só funciona em redes locais.", "funciona na internet."), ("impede qualquer tipo de vírus.", "protege o transporte, não o conteúdo."), ("elimina a necessidade de senha.", "a senha continua necessária.")],
  ["O 'S' vem de Secure (seguro).", "O HTTPS usa criptografia na comunicação.", "Isso protege dados em trânsito, mas não garante que o site seja confiável."], "HTTPS = HTTP com criptografia.", "Diferença entre HTTP e HTTPS.")
Q(N, "Ao enviar um e-mail, o campo ‘Cco’ (cópia oculta) serve para:", "enviar a mensagem a destinatários sem que os demais vejam seus endereços.",
  [("enviar a mensagem apenas ao remetente.", "não é a função do Cco."), ("criptografar a mensagem.", "Cco não criptografa."), ("anexar arquivos.", "anexo é outro recurso."), ("responder a todos.", "é outra ação.")],
  ["Cco significa cópia carbono oculta.", "Os endereços do Cco não aparecem aos outros destinatários.", "Serve para preservar a privacidade."], "Cco: ninguém vê.", "Função do campo Cco.")
Q(N, "O protocolo usado para o ENVIO de mensagens de correio eletrônico é o:", "SMTP",
  [("POP3", "baixa mensagens do servidor para o computador."), ("IMAP", "acessa e sincroniza mensagens no servidor."), ("FTP", "transfere arquivos."), ("DNS", "traduz nomes em endereços IP.")],
  ["Envio e recebimento usam protocolos diferentes.", "O de envio é o SMTP.", "POP3 e IMAP são de recebimento."], "SMTP envia.", "Protocolo de envio de e-mail.")
Q(N, "O serviço DNS, na internet, tem a função de:", "traduzir nomes de domínio em endereços IP.",
  [("criptografar a conexão.", "isso é feito por protocolos como TLS."), ("enviar e-mails.", "isso é SMTP."), ("bloquear sites perigosos.", "isso é função de filtros e firewalls."), ("armazenar senhas.", "não é função do DNS.")],
  ["Pessoas lembram nomes; computadores usam números.", "O DNS faz a tradução do nome para o IP.", "É como uma lista telefônica da internet."], "DNS: nome → IP.", "Função do DNS.")
Q(N, "A navegação anônima (ou privada) de um navegador:", "não guarda o histórico e os cookies no computador após o fechamento, mas não oculta a atividade do provedor ou do site.",
  [("torna o usuário totalmente invisível na internet.", "o provedor e o site ainda podem identificar a conexão."), ("bloqueia qualquer vírus.", "não oferece proteção contra malware."), ("impede o rastreamento pelo provedor.", "o provedor ainda vê a conexão."), ("criptografa todos os dados da rede.", "não criptografa o tráfego.")],
  ["O modo anônimo evita registros locais (histórico, cookies).", "Ele não esconde o usuário do provedor, do site ou do empregador.", "Também não protege contra malware."], "Anônima não é invisível.", "Limites da navegação anônima.")
Q(N, "O termo ‘cookie’, no contexto da navegação, refere-se a:", "pequeno arquivo gravado pelo site no navegador, usado para lembrar preferências ou sessões.",
  [("um vírus que espiona o teclado.", "isso é keylogger."), ("um programa antivírus.", "cookie não é antivírus."), ("a cópia local de uma página para carregamento rápido.", "isso é o cache."), ("o endereço de um site.", "isso é a URL.")],
  ["Sites guardam pequenas informações no navegador.", "Isso mantém login e preferências.", "Não é vírus, embora possa ser usado para rastreamento."], "Cookie: lembrança do site.", "Conceito de cookie.")
Q(N, "Na URL https://www.exemplo.gov.br/servicos, o trecho ‘https’ indica:", "o protocolo de comunicação, com criptografia.",
  [("o nome do servidor de e-mail.", "não há servidor de e-mail na URL."), ("o domínio principal do site.", "o domínio é exemplo.gov.br."), ("o caminho da página.", "o caminho é /servicos."), ("o tipo de arquivo da página.", "https é protocolo, não tipo de arquivo.")],
  ["A URL começa pelo protocolo.", "https é o protocolo seguro.", "O domínio vem depois e o caminho no fim."], "A URL começa pelo protocolo.", "Partes da URL.")
Q(N, "O armazenamento de arquivos em serviços como Google Drive e OneDrive é um exemplo de:", "computação em nuvem.",
  [("armazenamento em disco local.", "os arquivos ficam em servidores remotos."), ("rede de área local (LAN).", "LAN é uma rede restrita a um local."), ("backup apenas em CD.", "é armazenamento online."), ("sistema operacional.", "é um serviço, não um sistema operacional.")],
  ["Os arquivos ficam em servidores na internet.", "Podem ser acessados de vários dispositivos.", "Isso é computação em nuvem."], "Nuvem = servidores na internet.", "Conceito de computação em nuvem.")
Q(N, "Na busca do Google, colocar uma frase entre aspas (“assim”) faz com que o buscador:", "procure exatamente essa expressão, na mesma ordem.",
  [("ignore a frase.", "as aspas servem para o contrário."), ("traduza a frase.", "não é a função das aspas."), ("exclua o termo dos resultados.", "isso é feito com o sinal de menos."), ("mostre apenas imagens.", "não filtra por tipo de mídia.")],
  ["Aspas indicam busca literal.", "O buscador procura as palavras juntas e na mesma ordem.", "O sinal de menos exclui termos."], "Aspas = frase exata.", "Operador de busca.")
# ---------------- Segurança ----------------
Q(S, "O malware que criptografa os arquivos da vítima e exige pagamento para liberar o acesso é o:", "ransomware.",
  [("keylogger.", "registra o que o usuário digita."), ("spyware.", "espiona sem criptografar."), ("adware.", "exibe publicidade indesejada."), ("worm.", "replica-se pela rede, sem exigir resgate.")],
  ["O nome vem de 'ransom' (resgate).", "Ele sequestra os dados criptografando-os.", "O backup é a melhor defesa."], "Ransomware = sequestro de dados.", "Reconhecer o ransomware.")
Q(S, "O ataque em que o criminoso envia uma mensagem falsa, imitando uma instituição, para obter dados do usuário é chamado de:", "phishing.",
  [("ransomware.", "sequestra dados."), ("sniffing.", "captura tráfego de rede."), ("DDoS.", "sobrecarrega serviços."), ("firewall.", "é defesa, não ataque.")],
  ["A mensagem finge ser de uma fonte confiável.", "O objetivo é 'pescar' dados.", "Resposta: phishing."], "Phishing = isca.", "Reconhecer o phishing.")
Q(S, "A principal função de um firewall é:", "filtrar o tráfego de rede, permitindo ou bloqueando conexões conforme regras.",
  [("remover vírus de arquivos.", "isso é função do antivírus."), ("criptografar o disco.", "isso é criptografia de disco."), ("fazer backups.", "isso é rotina de backup."), ("recuperar senhas.", "não é função de firewall.")],
  ["Firewall = parede de proteção da rede.", "Ele filtra o tráfego conforme regras.", "Antivírus trata arquivos; firewall trata conexões."], "Firewall filtra conexões.", "Função do firewall.")
Q(S, "Qual alternativa descreve melhor um vírus de computador?", "programa malicioso que se anexa a um arquivo e se espalha quando este é executado.",
  [("programa que se replica sozinho pela rede, sem hospedeiro.", "isso descreve o worm."), ("software que sequestra dados.", "isso descreve o ransomware."), ("programa legítimo que registra o que se digita.", "isso descreve o keylogger."), ("e-mail falso que pede dados.", "isso descreve o phishing.")],
  ["O vírus precisa de um hospedeiro.", "Ele só se espalha quando o arquivo infectado é executado.", "O worm, ao contrário, se replica sozinho."], "Vírus precisa de hospedeiro.", "Definição de vírus.")
Q(S, "A autenticação em dois fatores (2FA) aumenta a segurança porque exige:", "duas formas diferentes de comprovar a identidade, como senha e código enviado ao celular.",
  [("duas senhas iguais.", "duas senhas continuam sendo o mesmo fator."), ("a troca diária da senha.", "não é o que o 2FA exige."), ("um antivírus atualizado.", "antivírus é outra proteção."), ("conexão por cabo.", "2FA não depende de cabo.")],
  ["O 2FA combina fatores de natureza diferente (algo que você sabe e algo que você tem).", "Exemplo: senha e código no celular.", "Se a senha vazar, o invasor ainda precisa do segundo fator."], "2FA = dois fatores diferentes.", "Conceito de 2FA.")
Q(S, "A prática de backup consiste em:", "criar cópias dos dados para recuperá-los em caso de perda ou ataque.",
  [("excluir arquivos antigos.", "excluir não protege os dados."), ("compactar arquivos para economizar espaço.", "compactar não é backup."), ("instalar um antivírus.", "antivírus não substitui cópia de segurança."), ("criptografar a conexão.", "isso é segurança de rede.")],
  ["Backup é cópia de segurança.", "Serve para recuperar após falhas, exclusões ou ransomware.", "O ideal é guardar uma cópia fora do local."], "Backup: cópia fora do equipamento.", "Conceito de backup.")
Q(S, "Entre as boas práticas de segurança, é correto afirmar que uma senha forte:", "é longa e mistura letras maiúsculas e minúsculas, números e símbolos.",
  [("deve ser a data de nascimento, para ser lembrada.", "dados pessoais são fáceis de adivinhar."), ("deve ser repetida em todos os serviços.", "repetir senhas amplia o dano em caso de vazamento."), ("deve conter apenas letras minúsculas.", "reduz a variedade e a força."), ("deve ser compartilhada com a equipe.", "senha é pessoal.")],
  ["Senha forte é longa e variada.", "Não deve usar dados pessoais nem ser repetida.", "Um gerenciador de senhas ajuda."], "Longa, variada e única.", "Características de senha forte.")
Q(S, "O ‘cavalo de troia’ (trojan) é um malware que:", "se disfarça de programa útil, mas executa ações maliciosas escondidas.",
  [("se replica sozinho pela rede.", "isso é worm."), ("criptografa arquivos para exigir resgate.", "isso é ransomware."), ("exibe propagandas indesejadas.", "isso é adware."), ("apenas registra o que o usuário digita.", "isso é keylogger.")],
  ["O nome vem do cavalo da Guerra de Troia.", "Ele parece útil, mas esconde código malicioso.", "Resposta: programa disfarçado."], "Trojan = disfarce.", "Definição de trojan.")
Q(S, "Ao receber um e-mail com um anexo inesperado de um remetente desconhecido, a conduta mais adequada é:", "não abrir o anexo e, se necessário, confirmar a origem por outro canal.",
  [("abrir o anexo para verificar o conteúdo.", "anexos podem conter malware."), ("encaminhar o e-mail aos colegas para opinarem.", "espalha o risco."), ("responder pedindo mais dados.", "confirma que o endereço é válido para golpistas."), ("clicar em todos os links para testar.", "links podem levar a golpes.")],
  ["Anexos de desconhecidos são fonte comum de malware.", "A conduta segura é não abrir.", "Confirme a origem por outro canal ou apague."], "Desconfie de anexo inesperado.", "Conduta diante de anexo suspeito.")

salvar()
