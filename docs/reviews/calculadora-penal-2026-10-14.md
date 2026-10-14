# Revisão da calculadora penal — 14/10/2026

A calculadora passa a apresentar simulações didáticas e vínculos de consulta, sem afirmar concessão de benefícios ou extinção da punibilidade.

## Correções

- A pena total continua sendo a base dos benefícios, sem corte pelo limite de cumprimento do CP, art. 75. A distinção é indicada com referência à Súmula 715/STF; o limite aplicável também depende da lei no tempo.
- Detenção não recebe fechado como indicação de regime inicial. Reincidente com reclusão de até quatro anos e circunstâncias favoráveis tem indicação de possibilidade de semiaberto, com Súmula 269/STJ. Circunstâncias desfavoráveis não produzem agravamento automático.
- Dosimetria valida inteiros, limites das oito circunstâncias, frações e penas. Despreza frações de dia. Identifica a compensação aritmética como simplificação, sem resolver preponderância, bis in idem ou cumulação jurídica de causas.
- Progressão exige confirmação da regra aplicável ao exercício. Há fração manual para não impor a redação cadastrada a fatos anteriores. Livramento pode ser marcado como vedado; perfil hediondo não apresenta a projeção comum de 1/3 ou 1/2.
- Datas vazias e inexistentes são rejeitadas. Datas civis são calculadas por calendário; inclui-se o primeiro dia. A data-base inicial sugerida vem do dia do Acre.
- Remição usa blocos de 12 horas previamente conferidos, cada bloco distribuído em pelo menos três dias, em vez de inferir a distribuição a partir de totais agregados. O resultado é transferido para Execução, sem reconhecimento judicial automático.

## Navegação e interface

As abas mantêm o estado. A interface usa controles de abas com navegação por teclado e layout responsivo. A referência do crime escolhido abre o diploma/artigo correspondente quando o percurso está disponível. A aba Execução inclui CP 42/75/83 e CPP 387. O catálogo permite pesquisar todos os percursos ativos vinculados a editais, inclusive legislação especial, e abrir sua fonte oficial. Referências de súmulas remetem aos portais competentes; notas jurídicas reutilizam as já revisadas na biblioteca.

## Evidência e limites jurídicos

A consulta direta a Planalto, STJ e STF não foi reconferida nesta sessão: as tentativas de acesso ao Planalto/STJ retornaram bloqueio de rede 403. Não se registra nova data de conferência jurídica nem se altera texto de lei, enunciado, banco de questões ou banco de dados. As penas/frações do catálogo já existente mantêm sua data registrada de 12/10/2026, apresentada ao usuário. Evidências históricas no repositório incluem `docs/library/cp-final-lote-2-sources-2026-10-12.json` e `docs/library/lep-lote-2-sources-2026-10-13.json`.

Links de acervo não significam que todas as leis e decisões foram incorporadas ao motor de cálculo. Não há enquadramento automático do fato, unificação, concurso de crimes, multa, interrupções da execução, análise completa de requisitos subjetivos ou declaração de prescrição. A prescrição exibida é hipótese simples, não cálculo retroativo/intercorrente; termo inicial e Tema 788/STF exigem consulta específica.

## Validação

505 testes passaram, incluindo regressões para base integral dos benefícios, regime de detenção, Súmula 269, frações de dia, referências do crime e datas inválidas/fim de mês. Typecheck e build de produção passaram. A interface foi exercitada em Chromium com autenticação e catálogo simulados, sem acesso a contas reais: troca de abas com preservação de estado, transferência de 42 dias de remição, confirmação de execução, validação de data vazia, referência da Lei de Drogas e ausência de overflow em 320/390 px. A verificação encontrou e corrigiu overflow no link do crime selecionado. Não foi validado o site publicado com uma conta real.
