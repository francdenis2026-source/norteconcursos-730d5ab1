# Primeiro lote do Drive — 30/09/2026

26 questões da coletânea 157 questões constitucional.pdf foram gravadas no Supabase em public.curated_question_catalog. Uma consulta independente confirmou os 26 registros e a igualdade de enunciados, gabaritos, explicações, fundamentos legais e origem com o lote preparado. A comparação prévia não encontrou duplicatas exatas no catálogo, nas provas oficiais ou no banco individual.

A migração supabase/migrations/20261001010000_drive_constitucional_lote01_under_review.sql reproduz o envio com status under_review e is_original=false. A reaplicação não duplica registros nem sobrescreve revisões existentes. Nenhuma questão deste lote foi publicada para os alunos.

Os itens estão vinculados ao tópico vigente de direitos fundamentais de Agente PF 2025. O nome do repertório e o ano histórico preservam a distinção entre a origem da questão e a carreira de destino. A migração exige exatamente um tópico compatível em edital ativo.

Fonte da coletânea: https://drive.google.com/file/d/1PKj-SV8e-8bWKTNhIj5LVBIZJaMRHqSn/view

Fonte jurídica: https://www.planalto.gov.br/ccivil_03/constituicao/constituicaocompilado.htm

Itens: 20, 21, 22, 23, 25, 32, 33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 45, 47, 49, 50, 64, 66, 67, 69, 70 e 105. Os itens 107 e 108 ficaram fora por desatualização.

## Validação e pendências

O teste em PostgreSQL descartável verificou inserção de 26 registros, reaplicação sem duplicatas, preservação de revisão humana, bloqueio de coincidência com prova oficial e rejeição de edital inativo. O envio real e a leitura independente confirmaram os 26 registros como under_review, com origem de terceiros e vínculo ao edital ativo.

A publicação depende de conferência visual e de contexto, além da consolidação de duplicatas que diferem em pontuação ou comandos. A revisão dos outros PDFs permanece pendente; este lote não certifica as 37.597 extrações automáticas. Credenciais não fazem parte desta migração ou do repositório.
