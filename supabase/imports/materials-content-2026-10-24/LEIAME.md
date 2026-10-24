# Complementação de Materiais — 24/10/2026

## Publicado no banco

480 exercícios autorais novos, com gabarito, explicação e exemplo, acrescentados aos 8 exercícios existentes de cada um de 40 materiais ativos. Os 40 materiais agora contêm 20 itens cada: 800 exercícios de fixação no conjunto. A leitura posterior confirmou todas as 40 gravações e seus hashes em `publication-result.json`.

Áreas: 15 materiais de Informática, 4 de Língua Portuguesa, 3 de Raciocínio Lógico e 18 de ENEM (Matemática, Física, Química, Biologia, História, Geografia, Filosofia, Sociologia, Redação, Inglês, Espanhol, Literatura e Artes/Educação Física). O JSON registra o tópico real de edital/matriz, a edição e a fonte oficial de referência de cada material.

A operação alterou apenas `study_materials.quiz`, preservando os oito exercícios anteriores e os demais campos. Não publicou novas linhas nas tabelas do acervo de provas, não aumentou a contagem global de questões, não alterou estados ou datas de revisão jurídica e não atribuiu autoria à banca. São exercícios de fixação, separados do acervo e do histórico de tentativas do treinador.

## Disponível na interface

A aba principal de prática combina os exercícios do material aberto com o acervo elegível, identifica as duas origens e oferece bateria de até 20 itens. Os exercícios do material funcionam mesmo quando a consulta ao acervo falha. O link para explorar o acervo continua separado e preserva o recorte.

Quatro trilhas introdutórias novas — Matemática, Física, Química e Inglês — têm oito aulas no total, com explicações, exemplos, pontos de atenção e 20 exercícios por aula. Reutilizam os mesmos conjuntos dos materiais correspondentes, sem contabilizá-los como questões novas adicionais.

## Conferência

- 480 enunciados novos distintos, todos com resposta booleana, comentário e exemplo.
- 100 verificações registradas de cálculos e linhas de tabela-verdade. As demais questões conceituais têm gabaritos e justificativas autorais, não uma certificação matemática automática.
- 4 testes Python: integridade, cálculos/lógica, proteção contra alteração concorrente e repetição idempotente sem regravação.
- 22 testes direcionados da aplicação aprovados; build de produção aprovado.
- Navegador: celular, tablet e desktop; bateria autoral completa de 20 com nota conferida; quatro novas trilhas com 20 itens; exercícios disponíveis durante indisponibilidade simulada do acervo; sem rolagem horizontal.
- A suíte geral teve 867 aprovações e 2 falhas anteriores: dependência local `@electric-sql/pglite` ausente e teste IDECAN ainda esperando 177 registros, enquanto o arquivo existente contém 273. Typecheck mantém os erros anteriores em PanelTextScale/PerformanceCharts; nenhum erro novo nos arquivos desta entrega.

## O que permanece pendente

A consulta inicial encontrou 3.511 dispositivos jurídicos atuais com explicação publicada vinculada ao mesmo hash do texto. Isso não equivale à revisão atual de vigência nem a 20 exercícios por artigo. Conteúdo normativo novo, incluindo os complementos jurídicos e de Contabilidade que dependem de norma, não foi publicado nesta operação.

O ambiente retornou `403 Forbidden` ao consultar o Planalto. Foram acrescentados os domínios oficiais à configuração de rede salva, preservando os domínios anteriores; a ferramenta informou `requires_publish: true`, e o acesso no ambiente atual continuou bloqueado. É preciso aplicar essa liberação antes da conferência e publicação jurídica. A regra de `CONTENT_GOVERNANCE.md` exige “texto vigente conferido em fonte oficial”. Não foram inventados datas de conferência, aprovações editoriais ou fontes para contornar a pendência.

Este lote resolve os 20 exercícios dos 40 materiais não normativos selecionados e cria quatro trilhas introdutórias; não declara cobertura completa de toda a legislação ou de todas as aulas antigas.

## Arquivos e aplicação

`supplements.json` contém os exercícios originais, adicionais e finais, além dos vínculos de edital e hashes. `authored-exercises.txt` conserva a autoria textual; o gerador de cálculos está em `scripts/content/build-calculation-exercises.py`. `calculation-checks.json` permite conferir as contas e a lógica.

O publicador `scripts/content/publish-material-supplements.py` recebe a credencial apenas pela entrada padrão, confere o estado e o tópico antes de gravar, usa o timestamp para impedir sobrescrita concorrente e verifica cada resultado. Reaplicação de conteúdo idêntico não acrescenta nem repete exercícios. A publicação foi feita diretamente pela API REST; não houve SQL ou migração.
