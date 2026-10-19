# Extração de provas recentes Cebraspe — 19/10/2026

Foram baixados do CDN oficial 18 cadernos e 14 gabaritos definitivos, em sete seleções. A extração estruturada contém 1.020 ocorrências, com numeração original, enunciado, alternativas quando aplicável, apoio textual, resposta definitiva, origem e SHA256. Os PDFs de versões diferentes podem repetir questões; as ocorrências não foram apagadas nem tratadas como questões inéditas.

| Seleção | Cadernos | Ocorrências | Aplicação segundo o gabarito definitivo |
|---|---:|---:|---|
| PM-MA 2026 | 4 | 240 | Sem gabarito definitivo nesta consulta |
| PCDF Delegado 2026 | 1 | 120 | 05/07/2026 |
| Câmara — Policial Legislativo 2026 | 2 | 180 | 26/04/2026 |
| PMDF CFO | 2 | 80 | 14/06/2026 |
| PC-MG TPAG — Auxiliar de Perícia | 3 | 60 | 29/03/2026 |
| PC-CE Delegado 2025 | 1 | 100 | 25/05/2025 |
| PF 2025 — blocos básicos, Agente e Perito Contábil-Financeiro | 5 | 240 | 27/07/2025 |

## Resultado e limites

- 780 ocorrências têm correspondência com o gabarito definitivo; 62 delas estão anuladas (X).
- As outras 240, da PM-MA, não recebem resposta inventada ou preliminar como definitiva.
- As 958 não anuladas permanecem no estágio local `under_review`. Nenhuma gravação ou ativação ocorreu no banco.
- Foram preservadas, em campo próprio, 200 justificativas **preliminares da banca**. Elas não são comentários autorais, explicações finais ou prova de vigência. O enunciado e as alternativas não incorporam essas justificativas.
- Há 961 assinaturas textuais, com 59 grupos candidatos a repetição dentro dos cadernos baixados. O cálculo preserva acentos, símbolos, pontuação e caixa, normalizando apenas espaços de diagramação. Uma assinatura textual não comprova identidade de figuras. Foi feita uma comparação preliminar com 8.279 registros da plataforma; correspondências textuais são candidatas e exigem conferência do texto-base e das imagens.
- Foram mantidos os textos de apoio e a tabela contábil que antecede os itens 107–110 da PF/Agente; ela não ficou anexada ao item 106. As regiões de página/coluna e o segmento bruto permanecem disponíveis para auditoria.
- Foram geradas 24 imagens das páginas originais para apoiar conferência de figuras, tabelas e glifos. Os PDFs continuam sendo a fonte de verdade.
- A disciplina e o tópico de edital não foram adivinhados: a classificação e o vínculo curricular estão pendentes. Os sinalizadores de legislação, contabilidade, imagens e fórmulas são conservadores e não substituem auditoria individual.

## Arquivos gerados

Em `outputs/cebraspe-2026-10-19/extracted/`:

- `questions.json` e `questions.csv`: as 1.020 ocorrências estruturadas;
- `batches/batch-001.json` a `batch-011.json`: dez lotes de 100 e um de 20;
- `documents.json`: reconciliação por caderno com o gabarito;
- `duplicate-groups.json`: candidatos a repetição entre os arquivos;
- `source-pages/`: prévias das páginas originais selecionadas;
- `summary.json` e `README.md`: resumo;
- `extracao-cebraspe.zip`: pacote com os dados, lotes e prévias, aproximadamente 7 MB.

O pacote anterior `outputs/cebraspe-2026-10-19/provas-cebraspe-recentes.zip` contém os 32 PDFs e o catálogo oficial. Artefatos de trabalho ficam em `outputs/`; o extrator, testes, manifesto público de fontes e relatório resumido são versionados. Caminhos de arquivos nos registros são relativos à raiz do repositório.

## Reproduzir e verificar

Requer Python 3, `pdftotext` (Poppler) e a dependência de `scripts/extraction/requirements.txt`, já disponíveis no ambiente desta execução. Executar na raiz do repositório:

```sh
python scripts/extraction/extract-cebraspe-recent.py --download
python -m unittest discover -s scripts/extraction -p 'test_*.py' -v
```

`--download` só baixa PDFs ausentes e exige o SHA256 do manifesto antes de salvar. Sem essa opção, o extrator opera sem rede. PDFs divergentes, gabaritos desalinhados/conflitantes, pareamento não exclusivo de caderno/gabarito e divergência na numeração interrompem a operação. A opção de saída permite manter artefatos em outro diretório.

Passaram 16 testes, incluindo duas colunas reais em PDF sintético, artigo “A” no início do enunciado, sequência de alternativas, tabela compartilhada, justificativas preliminares, anulações e preservação de acentos/símbolos na comparação. A execução sobre os PDFs reais confirmou os 18 cadernos, os 14 pareamentos de gabarito, as 1.020 identidades de origem, opções completas, enunciados não vazios, 200 justificativas separadas, 62 anulações, 240 ausências de gabarito, os 11 lotes e a integridade do ZIP. Conferência visual da página contábil da PF confirmou a vinculação da tabela ao grupo seguinte. Isso valida a extração estrutural, não a atualidade ou qualidade pedagógica de todas as questões.


### Continuidade salva em 19/10/2026

Corrigida a separação de texto compartilhado após um enunciado dividido entre blocos do PDF, com teste de regressão. Sete itens de Português da PF/Perito (1–7) tiveram análise individual e pacote de preparação salvo em `pf-perito-portugues-review-preparation-2026-10-19.json`, com gabarito definitivo, texto-base, comentários e vínculo proposto ao edital oficial. **Este pacote não foi aplicado ao banco: nenhuma questão foi ativada nesta etapa.** A importação exige nova conferência de duplicidade, cadastro dos vínculos, validação sem gravação e leitura de confirmação após publicar. Os demais itens seguem pendentes de revisão individual.
