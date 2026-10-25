# Primeira revisão PC-CE/IDECAN — 23/10/2026

**Escopo realizado:** leitura e cotejo visual dos 20 itens de Português, recuperação dos dois textos de apoio com suas 31 e 26 linhas originais, identificação de termos destacados e conferência do documento oficial de gabarito. Além disso, foram confirmadas três anulações de Escrivão. A sessão confirmou novamente os hashes SHA-256 dos dois cadernos e do gabarito contra os pacotes importados.

Não houve leitura jurídica individual dos 160 itens de Direito/Legislação. Nenhum deles recebeu declaração de vigência por inferência ou por ausência de alteração localizada. A fila de 200 itens distingue pareceres individuais de mera triagem automática de pendências.

## Resultado proposto para o banco

| Caderno Tipo B | Parecer registrado, publicação retida (`reviewed`) | Anulada (`rejected`) | Revisão individual pendente (`under_review`) |
| --- | ---: | ---: | ---: |
| Inspetor | 10 | 0 | 90 |
| Escrivão | 10 | 3 | 87 |
| Total | 20 | 3 | 177 |

`reviewed` aqui significa parecer registrado no acervo privado, **não questão aprovada para treinamento**. Os 20 pareceres têm `publication_approved=false`; não foi gerado nenhum payload de publicação.

- **Escrivão, 1 a 10:** letras conferidas na seção definitiva do respectivo cargo e caderno. Pareceres pedagógicos registrados. Falta conferir o vínculo a tópico de edital ativo antes de publicar.
- **Inspetor, 1 a 10:** leitura e contexto conferidos; permanece a divergência entre o título do link definitivo e o cabeçalho preliminar da página 3. Nenhuma resposta foi certificada como definitiva. Os itens 7 (analogia simbólica) e 9 (equivalência sintática) também precisam de segunda conferência da justificativa; isso está explícito nos pareceres.
- **Escrivão 18, 43 e 79:** asterisco na seção definitiva Tipo B da página 1, com legenda de anulação. Proposta `rejected`, motivo `annulled`, preservando a extração histórica. A exclusão por anulação não certifica nem substitui revisão jurídica do conteúdo.
- **Demais 177 itens:** continuam `under_review`. A fila lista as pendências de contexto, gabarito, fonte jurídica, vigência e edital, sem alegar que essas etapas foram concluídas.

## Material de revisão

- [Parecer de cada questão de Português](pareceres-portugues.json): assunto observado, forma de cobrança, referência textual, explicação e dúvidas remanescentes.
- [Textos de apoio recuperados](textos-apoio.json): numeração das linhas preservada para resolver as remissões dos enunciados.
- [Fila completa de 200 itens](fila-revisao.json): `triage_only=true` identifica os itens ainda sem parecer individual.
- [Inspetor — pacote com pareceres](pcce_inspetor_2021_revisado.json).
- [Escrivão — pacote com pareceres](pcce_escrivao_2021_revisado.json).
- [SQL para registrar esta revisão](aplicar-primeira-revisao.sql).

O conteúdo original, suas respostas transcritas e os dados de origem não foram alterados. A recuperação do contexto é suplementar, em `individual_review.restored_context`. Segmentos de referência e sublinhados efetivamente vistos no original ficam em campos distintos. Reportagens de 2021 são material de compreensão textual histórica; suas informações científicas e sociais não foram promovidas a afirmações atuais da plataforma.

## Aplicação com rastreabilidade

O SQL deve ser executado por administrador no SQL Editor. Ele requer a tabela de auditoria da migração já existente `20261010110000_audited_corpus_reviews.sql`. Caso ausente, interrompe com a indicação dessa dependência. A carga inicial dos 200 candidatos precisa estar aplicada.

Cada decisão compara o payload e o estado esperados, bloqueia a linha, registra antes/depois em `question_corpus_review_audit` e só então atualiza o candidato. Repetir uma aplicação idêntica não duplica histórico. Se houver revisão concorrente, a transação inteira é desfeita e a decisão existente é preservada. Não há criação de permissões, alteração das funções de revisão ou escrita nas questões ativas e nos estudos dos usuários. `reviewer_id` vem de `auth.uid()`; no SQL Editor sem identidade JWT, fica nulo, e o timestamp efetivo da aplicação vem do banco.

**Esta sessão preparou e testou os arquivos; não aplicou esta segunda SQL no Supabase remoto.** A captura anterior confirma a carga inicial, não esta revisão. Para integração autenticada, os mesmos pacotes passam pelo fluxo existente `scripts/review-question-corpus.mjs`, com modo `--dry-run` para validação sem rede.

## Validação

- Os dois pacotes passaram pelo validador de revisão existente: 10 mudanças em Inspetor e 13 em Escrivão.
- Testes garantem preservação de todos os campos originais, manutenção das dúvidas e zero autorizações de publicação.
- SQL executado em PostgreSQL local/PGlite: 23 registros de auditoria, estados 20/3/177, reexecução sem duplicar histórico, rollback integral quando há conflito e recusa a usuário sem privilégio.

```sh
node scripts/idecan/build-first-review.mjs
node --test scripts/idecan/first-review.test.mjs scripts/corpus-review.test.mjs scripts/question-corpus.test.mjs
node scripts/idecan/test-first-review-sql.mjs /CAMINHO/DO/PGLITE/dist/index.js
```

## Critérios para o próximo lote

Priorizar Penal e Processo Penal, com conferência de cada dispositivo no texto compilado do Planalto e de jurisprudência no tribunal competente. Registrar correções ou desatualizações sem alterar a extração original. Confirmar a matriz de edital e os IDs reais de seus tópicos; nenhum ID foi inventado nesta revisão. Informática requer conferência da versão do software ou serviço citado. Legislação específica cearense exige pertinência separada, sem transferência automática para a PC-AC.

A leitura destas 20 questões mostra gramática contextualizada, comparação de funções, reescrita e julgamento de afirmativas. Esse recorte de Português de dois cargos de um único concurso não estabelece frequência de toda a IDECAN nem prevê o edital da PC-AC.
