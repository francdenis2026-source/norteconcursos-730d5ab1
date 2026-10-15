# Triagem da fila de questões — 15/10/2026

Foram consultados diretamente no Supabase 951 registros com `content_status=under_review`: 651 em `official_exam_questions` e 300 em `board_exam_questions`. A leitura incluiu fontes cadastradas, edições de editais e tópicos. Esta etapa é uma auditoria estrutural, não uma aprovação individual de gabaritos, autenticidade ou vigência jurídica.

Nenhum registro foi ativado, arquivado, excluído ou teve seu gabarito alterado.

| Pendência ou indício | Registros |
| --- | ---: |
| Contexto ou recurso visual marcado como pendente | 480 |
| Vínculo a tópico atual e edital ativo pendente | 546 |
| Evidência jurídica oficial/data de conferência insuficiente | 665 |
| Transcrição explicitamente não confirmada | 79 |
| Múltipla escolha sem alternativas confirmadas pelo formato esperado | 135 |
| Enunciado incorporado indevidamente à alternativa A | 14 |
| Fonte genérica de concursos, sem identificar a prova | 252 |
| Referência de prova apontando para gabarito | 59 |
| Documento hospedado no Drive, procedência oficial por conferir | 156 |
| Disciplina atribuída pela posição no caderno, por conferir individualmente | 300 |

As categorias se sobrepõem e não devem ser somadas. Os indícios de formato exigem confronto com o PDF; não provam isoladamente erro no conteúdo.

## Conferências jurídicas prioritárias

- PM-SP, 2022, item 33, ID `2d736b57-da89-4e5c-a35d-5c4ac1b2ee2d`: o gabarito histórico trata feminicídio como modalidade de homicídio qualificado. Exige revisão do recorte temporal frente à Lei 14.994/2024 antes de entrar em treino de direito vigente. Não reescrever o gabarito da banca para converter a questão em atual.
- PC-RO, 2022, item 71, ID `3e7e168b-cc80-4f34-8083-e7e0e58d7fb4`: feminicídio e causa de aumento; conferir redação aplicável e situação hipotética individualmente.
- CGM-RJ, 2023, item 25, ID `fd51b530-c059-4506-9d38-5aae761d4bdc`: menciona expressamente contrato celebrado em 2020 sob a Lei 8.666/1993. A revogação da lei não basta para descartar o item; conferir regime intertemporal e jurisprudência.

Esses são candidatos a revisão jurídica, não declarações de obsolescência confirmada nesta execução.

## Bloqueio externo

Foram tentadas 52 URLs de documentos e páginas, incluindo Planalto, Cebraspe, FGV, IBADE, IBFC e UFMT. Todas as requisições falharam no túnel do proxy com HTTP 403; nenhum documento externo foi obtido nesta execução. A permissão de rede da execução e uma tentativa fora do sandbox não resolveram o bloqueio. Não se deve descrever essas URLs como fontes consultadas com sucesso.

Foi salvo um rascunho de configuração de rede acrescentando os domínios oficiais necessários e preservando os dois domínios personalizados existentes. O serviço confirmou `status=saved` e `requires_publish=true`. Revisar, salvar e publicar a configuração do ambiente é necessário; salvar o rascunho não altera a rede em execução.

## Arquivos de continuidade

Diretório local `outputs/review-20261015/`:

- Exportações das duas filas, fontes, tópicos e editais.
- `triage.json`: decisão provisória e pendências individualizadas dos 951 registros.
- `pendencias-por-questao.csv`: planilha com IDs, prova, disciplina, número e URLs.
- `source-manifest.json`: resultado de cada tentativa de obter evidências externas.

Para reproduzir a triagem sobre os snapshots: `python scripts/review/triage-pending-questions.py outputs/review-20261015`.

Após restabelecer a rede, confrontar cada item com caderno e gabarito definitivo, reparar textos/figuras antes de ativar, conferir fontes jurídicas e edital atual, produzir decisão individual e publicar com comparação do registro original e leitura de confirmação. Arquivar conteúdo comprovadamente superado preservando o histórico. Manter em revisão o que continuar sem comprovação.
