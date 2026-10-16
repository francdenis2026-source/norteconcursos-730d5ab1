# Auditoria das provas da Polícia Civil — campanha iniciada em 16/10/2026

O inventário inicial consultou 2.968 registros em duas tabelas: 2.668 em `official_exam_questions` e 300 em `board_exam_questions`. Há 35 grupos pelas identificações originais, dos quais 33 contêm itens ativos; dois grupos inteiramente arquivados são referências antigas da PC-AC e da PC-DF. Grupos por cargo não equivalem a cadernos físicos únicos. O mesmo caderno pode servir a dois cargos, como em Mato Grosso.

Situação inicial: 2.481 ativos, 234 em revisão, 210 arquivados, seis obsoletos e 37 anulados. Aplicada a mesma adaptação de dados e função de elegibilidade do treinador, 1.919 registros passam pelo filtro. Isso não comprova a revisão editorial integral. O inventário estrutural sinaliza vínculos de edital, contextos, bases e marcadores pedagógicos para inspeção; não transforma sinais em erros jurídicos confirmados.

A análise encontrou edições apontando para cadernos de prova em vez de editais e tópicos ainda pendentes. As quatro edições de Rondônia têm esse problema. A consulta à página do Cebraspe foi possível, mas a API de arquivos não respondeu neste ambiente, e os nomes de edital tentados retornaram 404. Não se inventaram fontes nem se liberaram itens de Rondônia com base nesses retornos. O mesmo cuidado se aplica às demais edições com sinalizações.

## Primeiro lote publicado — PCDF/2026

O caderno oficial P1, o gabarito definitivo e o edital atualizado pela retificação do Edital 3/2026 foram recuperados diretamente do CDN do Cebraspe. Os **111 enunciados isolados** do conjunto canônico correspondem ao PDF após normalização de pontuação, espaços e caixa; todas as 111 letras correspondem ao definitivo. Isso não certifica contextos compartilhados nem a interpretação jurídica de cada questão. O definitivo tem 120 itens, com nove anulados: 2, 23, 29, 31, 67, 69, 72, 91 e 109.

Foram revisados e publicados **50 comentários individuais**, com explicação simples, exemplo contrastante, teste de fixação respondido e referências jurídicas oficiais consultadas no Planalto. Conteúdos: licitações, atos e servidores, Constituição, LINDB, Código Civil e empresarial, falência, liberdade econômica, CP, CTN, sigilo fiscal, abuso de autoridade, tortura, Henry Borel, Maria da Penha, drogas, organizações criminosas, lavagem, prisão temporária e legislação ambiental.

A análise não copiou automaticamente as justificativas da banca. Por exemplo, no item 64 a exigência do pedido do ofendido para reparação foi distinguida dos efeitos específicos dos incisos II e III do art. 4º da Lei de Abuso de Autoridade. No item 95 foram preservados os dois prazos de 24 horas próprios da Henry Borel. No item 99, autonomia da lavagem foi distinguida de ausência de indícios do antecedente.

Os itens já estavam marcados como ativos, mas sem referências jurídicas válidas. A operação corrigiu comentários e bases, e confirmou expressamente o mesmo tópico de edital que cada registro já possuía. As 50 questões agora passam pela função de elegibilidade. Textos, gabaritos, extrações brutas, disciplinas, status e fontes originais foram preservados. A leitura posterior comparou todos os registros de Polícia Civil e confirmou os **outros 2.918 integralmente preservados**, sem alterações concorrentes ou desaparecimentos.

O importador precisou permitir a correção de base jurídica em melhoria de comentário e confirmar o campo explícito de tópico atual, exigido pela restrição do banco. Essa confirmação só aceita o mesmo tópico existente e exige tópico atual, edição ativa e fonte oficial de edital. Não permite mudar aprovação jurídica, questão, resposta, status ou identidade do tópico. As comparações de todos os campos anteriores e a leitura posterior continuam obrigatórias. Uma tentativa intermediária gravou apenas o primeiro item antes da restrição de vínculo recusar o seguinte; o snapshot dessa etapa foi preservado e a retomada não contornou a restrição.

Validação: **65 testes aprovados**, sem falhas ou ignorados, nas suítes de revisão e formato/texto/acervo. Não houve mudança da aplicação e o build não foi executado neste lote. Snapshots, PDFs, capturas legais e pacotes completos estão em `outputs/pc-all-audit-2026-10-16/`, ignorado pelo Git. Os inventários versionados guardam escopo, hashes e comentários publicados sem credenciais.

Após esse lote: permanecem 234 registros `under_review`; outros 61 itens atuais da PCDF ainda não receberam revisão editorial nesta campanha. Os 2.481 status ativos não mudaram: houve melhoria e liberação efetiva de 50 itens antes barrados pelo filtro, não ativação em massa. A auditoria de todas as provas **continua aberta**.

Fontes: [caderno P1](https://cdn.cebraspe.org.br/concursos/pc_df_26_delegado/arquivos/710BA7293977732DDD213CAE2E329E52507C348D3E446135F8978861CDA880F1.pdf), [gabarito definitivo](https://cdn.cebraspe.org.br/concursos/pc_df_26_delegado/arquivos/793E15AB2B5B357F2DD614A0ACAEE093B9DFE97618931164855D005CDFF89841.pdf), [edital atualizado](https://cdn.cebraspe.org.br/concursos/pc_df_26_delegado/arquivos/409522C3AA9E7D9736EC8A33888E0732BEE4FB07EABC75866BB311B2062C5FF9.pdf) e URLs individuais do Planalto registradas no pacote de revisão.

## Complemento — 14 itens publicados, acumulado de 64

Itens 3, 7, 41, 45, 48, 81, 85, 87, 88, 105, 112, 113, 114 e 115 receberam revisão individual e comentários pedagógicos. Foram conferidos a Lei 15.047/2024 (regime disciplinar da PCDF), os Decretos 6.514/2008 e 7.469/2011 compilados e as Súmulas 403 e 525 no PDF oficial do STJ, além das fontes legais já capturadas. A questão 85 é exemplo de divergência entre justificativa preliminar (“Certo”) e letra definitiva E: esta foi preservada e explicada pelo tipo próprio de infanticídio do art. 123 do CP.

As 64 revisões acumuladas passaram pela elegibilidade efetiva. A leitura após o complemento confirmou a preservação integral dos outros **2.904 registros da Polícia Civil**, sem concorrência ou desaparecimentos. Permanecem 47 itens atuais da PCDF sem revisão editorial nesta campanha e os 234 `under_review` de outros conjuntos. Não se declarou toda a PCDF auditada.

Foi concluída uma verificação técnica de acesso a 81 referências de prova/gabarito: 48 PDFs recuperados, cinco falhas de acesso e 28 referências sem PDF HTTPS direto. Esses números não equivalem a 48 provas ou gabaritos conferidos. O rascunho de rede preservou os 34 domínios personalizados existentes e acrescentou oito destinos necessários. Sua aplicação exige revisar/salvar as configurações e publicar o ambiente na nuvem; salvar o rascunho não libera a rede em execução. Nenhum token foi salvo na configuração ou no Git.

## Terceiro complemento — acumulado de 76

Itens 6, 9, 10, 14, 16, 20, 22, 28, 32, 65, 71 e 90 publicados após análise individual. Foram confrontados os fundamentos de nepotismo, motivos determinantes, controle interno e preventivo, natureza da OAB, quarto de hotel, poderes de CPI, Conselho Superior da Polícia Civil, comunicabilidade do arrependimento posterior, não incidência de IBS na radiodifusão livre e gratuita e reconhecimento de pessoas.

O Tema 1.258/STJ foi consultado diretamente na página oficial, com tese firmada em 11/06/2025 e trânsito registrado em 03/09/2025. O comentário distingue reconhecimento viciado, prova independente e identificação de pessoa previamente conhecida. A notícia histórica sobre nepotismo não foi usada para universalizar exclusão de cargos políticos; o comentário da OAB também ressalva que vinculação de autarquia não significa subordinação hierárquica.

A conferência posterior confirmou **76 itens elegíveis e os outros 2.892 registros de Polícia Civil integralmente preservados**. Nenhum status ou gabarito foi alterado. Passam pelo filtro atual 1.995 dos 2.481 marcados como ativos, sem que esse número equivalha a revisão editorial integral. Restam 35 itens atuais da PCDF nesta campanha e 234 `under_review` no acervo PC. Há 2.405 ativos ainda não cobertos editorialmente por esta campanha; essa contagem não nega revisões anteriores. Contextos compartilhados, conteúdos técnicos, precedentes adicionais e normas estaduais continuam no escopo.

O commit remoto de outra sessão que documenta a revalidação das 42 fontes legais (`a64efee`) foi integrado por avanço simples, preservando suas alterações. A campanha não está concluída, e não há execução automática prometida após o encerramento desta sessão.

## Quarto complemento — 17 itens, acumulado de 93

Itens 19, 24, 55, 56, 57, 58, 59, 60, 61, 62, 74, 75, 89, 104, 108, 119 e 120 receberam explicação individual, exemplo contrastante e fixação respondida. Oito deles (55 a 60, 119 e 120) estavam sem o caso compartilhado: os contextos foram recuperados das páginas 6 e 15 do PDF oficial e conferidos visualmente. Os enunciados isolados, gabaritos definitivos, extrações brutas, fontes, disciplinas e status foram preservados; o texto exibido desses oito itens passou a incluir o comando original antes do item.

Correções relevantes:

- Tratados de direitos humanos: o quórum constitucional é **três quintos**, em dois turnos em cada Casa. A justificativa preliminar e uma notícia histórica do STF mencionam incorretamente dois terços; prevaleceu o art. 5º, § 3º, da Constituição.
- Arma com numeração suprimida: incidência do art. 16, § 1º, IV, não autoriza equiparação técnica automática a arma de uso proibido do § 2º. A localização dentro de casa não reduz o enquadramento ao art. 12.
- Violência psicológica e moral: foram distinguidos os requisitos sem ensinar que as categorias sejam incompatíveis entre si.
- Mar territorial: o AREsp 2.313.729/SP, Informativo 853/STJ, não estabelece competência federal automática. Fiscalização ambiental e licença também foram distinguidas, com os limites de autuações concorrentes e atuação supletiva.
- Primeiros socorros: recuperado o cenário de vítima irresponsiva e sem respiração. Foram explicados o acionamento imediato do socorro e a inadequação de apenas lateralizá-la. O protocolo oficial do SAMU contém diretrizes de 2015: a consulta foi limitada a essas condutas iniciais, sem certificação de atualização integral. A referência técnica fica no comentário, com base jurídica vazia para essa disciplina não jurídica. Uma gravação intermediária colocou o manual em `legal_basis`; a verificação detectou a recusa pelo treinador e o campo foi corrigido antes da conclusão do lote. As evidências intermediárias foram preservadas.

O novo restaurador de contexto exige PDF com hash conferido, decisão visual, páginas do comando/item, fontes oficiais registradas do mesmo concurso e preservação literal do item original. Valida todos os tópicos e bases antes da escrita, compara todos os campos anteriores e confere a resposta do banco. Não permite mudar gabarito, fonte, status ou sinal de aprovação. Questões pendentes ou marcadas como contexto incompleto mantêm seu fluxo separado.

Validação final: **93 revisões elegíveis**, oito contextos recuperados e **2.875 outros registros de Polícia Civil preservados**, sem desaparecimentos ou mudanças concorrentes no conjunto comparado. Foram aprovados **45 testes**, sem falhas ou ignorados, incluindo fontes técnicas, concorrência, contexto, publicação e formato. Este lote não alterou a aplicação; o build não foi executado para as mudanças de scripts e conteúdo. O trabalho remoto `12b2822`, que inclui as correções da outra sessão em Maria da Penha e LEP, foi integrado por avanço simples.

Restam **18 itens da PCDF** nesta campanha: 4, 5, 17, 18, 21, 30, 51, 73, 79, 80, 82, 83, 84, 86, 107, 116, 117 e 118. Há ainda **234 `under_review`** no acervo PC e **2.388 registros ativos não cobertos editorialmente por esta campanha**, sem negar revisões anteriores. Os 2.481 status ativos não foram alterados; 2.012 passam pelo filtro efetivo após as correções. A auditoria de todas as provas permanece aberta.
