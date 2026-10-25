# Revisão individual das 378 questões — complemento

## Resultado confirmado no banco

A leitura independente das 378 linhas confirmou 101 decisões individuais cumulativas: 84 questões ativas, 16 juridicamente verificadas mas retidas por contexto ou edital, e uma arquivada por superação legislativa. Restam 277 análises individuais. As 293 linhas ainda em revisão incluem essas 277 e as 16 retidas. Nenhum texto, gabarito definitivo ou vínculo histórico foi alterado inesperadamente.

O complemento arquiva somente PCRO Escrivão 2022, item 70, ID `760c2113-2af1-4622-b286-71fae4ee1750`. O gabarito histórico B relacionava ameaça e estelionato como crimes sujeitos, em regra, à manifestação da vítima. A Lei 15.397/2026, art. 3, revogou o §5 do art. 171 do Código Penal. O art. 4 determinou vigência na publicação, ocorrida em 04/05/2026. A formulação histórica não representa o regime atual do estelionato. Questões intertemporais relativas a fatos anteriores exigem análise própria.

Fontes consultadas:

- [Código Penal compilado — Planalto](https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm).
- [Lei 15.397/2026 — Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/l15397.htm).
- [Publicação original e data do DOU — Câmara dos Deputados](https://www2.camara.leg.br/legin/fed/lei/2026/lei-15397-30-abril-2026-799020-publicacaooriginal-179083-pl.html). A leitura desta publicação corroborou a revogação e a vigência; o acesso direto ao novo diploma no Planalto apresentou timeout durante a pesquisa.

## Pesquisa iniciada, sem aprovação automática

Foram lidos enunciados de Rondônia e parte do Ceará, e consultados dispositivos oficiais sobre prisão temporária, execução penal, depoimento especial, SINASE, Estatuto da Pessoa Idosa e Código Penal. Essas consultas não equivalem a concluir todos os itens. Cada alternativa, contexto completo, gabarito e compatibilidade com edital vigente ainda precisam ser confrontados individualmente.

Pontos já identificados para a continuidade:

- Feminicídio: conferir o tipo autônomo do art. 121-A do CP, introduzido pela Lei 14.994/2024, e distinguir o regime histórico das questões de 2022.
- Pessoa Idosa: conferir as penas atuais do art. 99 da Lei 10.741/2003, alteradas pela Lei 15.163/2025; a qualificação jurídica e os valores históricos não devem ser confundidos.
- RDD: separar o isolamento disciplinar do regime diferenciado e conferir a alteração da LEP pela Lei 15.407/2026.
- Questões estaduais: consultar as normas estaduais oficiais e conferir o edital atual antes de publicar.
- Questões com comando inserido em alternativa ou contexto incompleto: recuperar o caderno oficial antes de liberar.
- Questões de jurisprudência: ler a tese ou decisão pertinente, sem aprovar somente por localizar notícia ou URL.

## Execução e validação

`apply_378_review.py --manifest ... --apply` aplicou uma decisão com comparação prévia e leitura posterior. `verify_378_review.py --extra-manifest ... --batch batch02` verificou todo o escopo contra a fotografia original e os dois manifestos. O resultado agregado está no relatório JSON deste complemento. Os seis testes de proteção passaram.

A migração versionada `20261011140000_official_source_review_378_batch02.sql` registra a mesma decisão de forma transacional e idempotente. A alteração remota foi feita pela API REST; não se afirma que a migração foi registrada no histórico remoto do Supabase. Fotografias e materiais privados permanecem nos outputs locais ignorados pelo Git. Credenciais permanecem exclusivamente no ambiente da sessão.
