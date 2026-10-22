# Questões da IDECAN (importadas de PDFs oficiais)

Aplicar no SQL Editor do Supabase (a tabela `board_exam_questions` já existe), um arquivo por prova; podem ser rodados mais de uma vez:

- `pcsc_agente_2026.sql`: PC SC, Agente de Polícia Civil, caderno B (92 questões, gabarito definitivo)
- `pmsc_aluno_soldado_2026.sql`: PMSC, Aluno-Soldado Temporário, caderno A (39 questões, gabarito **preliminar**)
- `cbmmg_cadete_2026.sql`: CBMMG, CFO BM 2027 Cadete, caderno A (46 questões, gabarito definitivo)

`idecan_questions.json` traz as mesmas questões para a tela "Questões de bancas".

Todas entram como `under_review`. Fora desta carga, de propósito: legislação local (leis e decretos estaduais de SC e MG), questões anuladas, sem gabarito (CBMES), com figura ausente ou com extração incompleta.

Conferência legislativa de 22/10/2026: as questões de lei trazem a norma conferida em `legal_basis` e a data em `law_version_checked_at`. "Sem alteração localizada" significa que não achei mudança, sem reler todo o texto. Isso não substitui a decisão individual exigida em `CONTENT_GOVERNANCE.md`. Antes de ativar, confirme o gabarito definitivo (PMSC) e o vínculo ao edital.
