# Biblioteca: revisão do texto oficial e aplicação por artigo

## Evidência e escopo

As fontes oficiais dos 42 percursos foram obtidas em 11/10/2026. O parser de legislação remove redações riscadas e preserva os dispositivos vigentes. A comparação encontrou correspondência exata de texto/hash nos 3.509 dispositivos cadastrados como vigentes, sem divergência nesta coleta. O inventário reproduzível está em `article-source-audit-2026-10-11.json`; os HTMLs e snapshots integrais ficam em outputs locais ignorados pelo Git.

Essa comparação confere a redação cadastrada; não certifica a aplicabilidade isolada de cada norma nem uma auditoria integral de toda jurisprudência. Particularmente em diplomas antigos, a compatibilidade com normas posteriores e decisões judiciais deve ser examinada na explicação do dispositivo.

## Publicação confirmada

Durante o trabalho, outro lote entrou na main e no banco, passando de 1.775 para 2.163 explicações publicadas. O primeiro preflight recusou qualquer sobrescrita e não gravou registros. A atualização remota foi integrada por fast-forward, preservando a história do projeto.

Foram então aprimoradas e publicadas 94 explicações existentes: todos os dispositivos vigentes de ICN (13), CIN, incluindo os três anexos (30), Serviço de Identificação do Cidadão (29) e regulamento da pensão por feminicídio (22). Cada explicação contém caso próprio, variação dos fatos e pergunta com resposta comentada. As versões anteriores completas estão no campo `expected` do lote versionado, permitindo cotejo e recuperação. O importador exige correspondência da versão anterior, texto oficial, fonte cadastrada e tópico/edição ativos antes de gravar.

No exemplo de perda da nacionalidade, também foi conferido o art. 12, §4º, da [Constituição Federal](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm), com redação da EC 131/2023. Os metadados da evidência adicional constam do pacote da CIN. As demais fontes oficiais e seus hashes constam de `laws` no pacote.

Os novos casos destacam diferenças de competência, quóruns, acesso à biometria, validade da CIN e do modelo antigo, vigência e adaptação. Na pensão, diferenciam o valor total do rateio, documentos alternativos à condenação definitiva, BPC no cálculo de renda, bloqueio, suspensão e cessação. O art. 15 do decreto da pensão conserva a remissão literal do §2º ao §1º, sem substituir silenciosamente o prazo.

## Experiência de estudo

O caso aparece em bloco verde, a variação em violeta e a fixação em rosa, com variantes para tema escuro. Perguntas explicitamente redigidas com resposta comentada apresentam campo de tentativa e resposta em detalhe fechado. As notas anteriores sem pergunta continuam disponíveis; o sistema não inventa gabaritos para elas. Os exercícios são autorais e não são apresentados como questões oficiais de banca.

## Conferência independente e pendências

O read-back confirmou as 94 revisões, o revisor e as datas; 2.069 explicações não alvo e os registros de materiais, enriquecimentos, cursos, dispositivos, fontes e editais permaneceram inalterados. O relatório `article-explanations-applied-2026-10-11.json` identifica todos os artigos ainda sem explicação.

Neste marco, 35 dos 42 percursos têm explicação publicada para todos os dispositivos cadastrados como vigentes. Faltam 1.346 explicações em sete percursos: Segurança Privada (72), LEP (216), Estatuto da Pessoa Idosa (117), ECA (326), Migração (123), Pessoa com Deficiência (127) e CTB (365). O trabalho completo não está encerrado. A enumeração integral impede confundir exercícios literais gerais com exemplos individuais já concluídos.

Validação deste lote: 77 testes passaram, incluindo conflitos concorrentes, texto alterado, edital inativo, cobertura integral do lote, preservação de revisões e renderização da resposta fechada. A compilação de produção da interface foi concluída. Nenhuma questão do treinador foi criada ou alterada neste lote.

## Reexecução

`node scripts/import-article-explanations.mjs LOTE_JSON RELATORIO_JSON --dry-run` valida o arquivo sem acessar o banco. Para aplicação, use apenas variáveis de ambiente da sessão: `TASK_SUPABASE_PROJECT`, `TASK_SUPABASE_KEY` e `TASK_LIBRARY_REVIEWER`. Não gravar credenciais em código ou arquivos versionados. Reexecução de conteúdo já aplicado preserva os registros; conflito com uma revisão posterior interrompe o lote antes das escritas.
