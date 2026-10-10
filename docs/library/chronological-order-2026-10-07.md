# Ordem cronológica da biblioteca

As 39 entradas por diploma aparecem do ato legislativo mais recente identificado para o mais antigo, em uma lista global. O filtro de área mantém a mesma ordem dentro da área escolhida. Cada cartão mostra a área, a data usada e o link do ato oficial que fundamenta essa data.

O critério é a data do ato que altera o diploma, extraída do cabeçalho oficial do Planalto. Não se usa o ano de criação da lei quando existe alteração posterior identificada. Sem alteração identificada, usa-se a data do diploma original. Trata-se da data do ato, que não é necessariamente a data de publicação no DOU ou de início da vigência.

Referências de jurisprudência e atos com vigência encerrada não promovem uma lei na ordenação legislativa. Quando o ato mais recente tem vigência futura registrada na revisão, o cartão mantém esse aviso. As datas de conferência dos materiais continuam separadas das datas legislativas.

Os demais materiais continuam separados por disciplina, ordenados pela data de atualização do próprio material, com as revisões mais recentes primeiro. Seus cartões mostram essa data. Os aprofundamentos seguem o mesmo critério de revisão. Materiais sem data ficam no fim; empates usam o título para preservar uma ordem estável.

Metadados: `src/lib/legalChronology.ts`. As datas e URLs dos 39 diplomas foram conferidas nas fontes oficiais já obtidas na revisão, complementadas pelas normas alteradoras necessárias. Evidências operacionais permanecem nos outputs locais. Novas revisões legislativas devem atualizar também esses metadados; a ordenação não implica monitoramento automático do Planalto.

Esta mudança é de apresentação e consulta. Não altera textos jurídicos, questões, flashcards nem registros de progresso no banco.

Validação: 45 testes aprovados, incluindo ordem global, data de ato versus data de conferência, normalização dos filtros e renderização do catálogo. TypeScript e build de produção aprovados. Não foi feita inspeção visual em navegador autenticado.
