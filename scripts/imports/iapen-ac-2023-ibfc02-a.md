# IAPEN/AC 2023 — IBFC_02 versão A

Importação corretiva realizada em 18/10/2026: 60 registros em `board_exam_questions`, 59 `under_review`, questão 3 `archived` com gabarito `X`, nenhum ativo. Leitura após a gravação confirmou os campos enviados. Os 118 registros anteriores de `official_exam_questions` permaneceram integralmente iguais ao retrato anterior.

O gabarito pós-recurso hospedado pela IBFC marca a questão 3 com `*` (anulada). O manifesto registra URLs e SHA256 do caderno e do gabarito em fontes distintas. O caderno é um espelho PCI, explicitamente não oficial na classificação da fonte. Não foi criada referência fictícia a arquivo no Storage.

A tabela de múltipla escolha já distingue versões por `exam_type`; este lote não altera restrições globais, versões legadas, gabaritos da versão B ou notas de alunos. O SQL fornecido pelo usuário foi substituído por uma importação para esse catálogo. Não é uma migração automática: execute o arquivo `.sql` inteiro apenas quando necessário. Ele mantém conflitos existentes sem sobrescrever revisões e aborta se a conferência final detectar divergências nos campos essenciais.

As páginas são físicas do PDF (3–14), registradas no manifesto e na nota de revisão, não números de questão. As alternativas foram separadas e o texto de apoio das questões 1–10 foi incluído. Rodapés, títulos de disciplinas e a redação posterior à questão 60 foram excluídos.

Os quatro tópicos usados pertencem à edição histórica de 2023 cadastrada para esta carreira. A fonte documental dessa edição cadastral ainda exige conferência: este vínculo não representa validação de edital atual. Todas as questões permanecem retidas para conferência individual; itens 31–60 exigem auditoria jurídica oficial antes de qualquer ativação. Não foram inventados comentários ou justificativas de vigência.

Validação local: `python scripts/imports/verify-iapen-ac-2023-a.py`. Para reproduzir a extração: instalar PyMuPDF, baixar os dois PDFs das URLs do manifesto para um diretório externo como `paper.pdf` e `key.pdf`, criar `sources.json` com os metadados das fontes e executar `python scripts/imports/extract-iapen-ac-2023-a.py DIRETORIO`. A extração escreve `pack.json` nesse diretório. Os PDFs originais e retratos integrais do banco não foram adicionados ao Git.

A gravação foi testada pela API e confirmada por releitura; o arquivo SQL equivalente não foi executado no SQL Editor nesta sessão.
