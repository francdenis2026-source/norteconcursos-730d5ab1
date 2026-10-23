# Continuação das explicações didáticas IDECAN

## Contagem: o que está comprovado

A última contagem administrativa salva está em `../revisao-cuidadosa/contagem-final.json`, conferida em **23/10/2026 às 01:47 no horário de Brasília** (04:47 UTC). Ela registra 131 itens ativos no catálogo de provas e 10 no catálogo curado: **141 ativos**. Dos 131, **91 não tinham explicação**; logo, 40 tinham. Somando as 10 publicações de Português com explicação e exemplo confirmadas em `portugues-publicado.json`, são **50 ativos com explicação**.

Esse resultado não é uma consulta administrativa atual, nem uma certificação automática de todos os 50 comentários. O relatório de contagem não registra separadamente o resultado de `hasReviewedExplanation` em todas as questões. A plataforma exige exemplo e validação da fonte jurídica para apresentar uma questão como revisada; estar ativa ou ter texto preenchido não basta. Existem também explicações/pareceres em itens retidos, fora desses 50.

A consulta REST pública desta sessão retornou zero linhas por restrição de leitura; isso **não significa acervo vazio**. Não havia sessão administrativa disponível. Não foram usados dados de alunos nem gravadas alterações remotas.

`diagnostico-somente-leitura.sql` permite obter números atuais pelo SQL Editor como administrador, separando ativas, explicadas e com exemplo textual. A própria saída distingue indicadores textuais de uma certificação de vigência, pertinência a edital ou elegibilidade. Os acervos privados não devem ser somados às suas representações públicas para contar questões distintas.

## Cinco explicações efetivamente preparadas

`explicacoes.md` e `explicacoes.json` contêm as questões **64 a 68 de Escrivão PC-SC, Tipo A**, cada uma com:

- resolução conceitual individual;
- análise de todas as alternativas;
- erro comum e exemplo prático;
- enunciado, alternativas e gabarito histórico preservados no JSON;
- impedimentos de publicação explícitos.

Temas: eficiência/eficácia/efetividade, descentralização decisória, qualidade e projetos, controle e planejamento estratégico. São explicações de Administração Geral, sem normas jurídicas. A distinção organizacional de descentralização não foi apresentada como classificação de Direito Administrativo.

As explicações foram escritas nesta etapa; **não foram aplicadas ao Supabase nem tornaram nenhuma questão nova disponível**. Não se sabe, sem nova leitura administrativa, se esses registros receberam explicações posteriores à auditoria. O SQL posterior, autorizado pelo usuário, acrescenta somente explicações vazias e não promove estados nem sobrescreve explicações existentes.

## Evidência e pendências

O cotejo literal anterior dos cinco itens está em `../revisao-integral/cotejo-pdf-legado.json`. O SHA-256 então registrado do caderno é `7d75eb4e9e447dae31b5a7f66cddd4a6bfde140dfbe54e1201f564017c5b8fa8`. Isso documenta a origem do texto, mas não certifica uma nova leitura do PDF. A tentativa atual de baixar novamente caderno/gabarito foi bloqueada pelo proxy (403); não foi registrada como conferência bem-sucedida.

Antes de publicar: ler o estado atual, preservar explicações existentes, reconferir caderno e gabarito definitivo, validar o tópico real do edital aplicável e aplicar somente o comentário aprovado com comparação do estado anterior, auditoria e leitura de confirmação. Preservar gabaritos, anuladas e bloqueios. Não converter a pertinência temática à PF em previsão de um futuro edital PC-AC.

Para os próximos lotes jurídicos, seguir `CONTENT_GOVERNANCE.md`: consultar o dispositivo vigente no Planalto (norma federal) ou legislador oficial competente (norma estadual), e STF/STJ/tribunal competente quando houver jurisprudência. Registrar URL, dispositivo, data da conferência e alcance temporal. Fonte inacessível ou dúvida de vigência mantém a questão retida. Não usar apenas conhecimento de memória, links antigos ou retorno HTTP 200 como prova de validade.

## SQL solicitado para execução manual

`aplicar-cinco-explicacoes.sql` contém integralmente os cinco comentários. Executar inteiro no SQL Editor como `postgres`. Compara SHA-256 do enunciado, alternativas, gabarito e disciplina, além da identidade exata do concurso/caderno/item; bloqueia cada registro; aceita somente `active` e `under_review` sem exigência visual/jurídica adicional; recusa explicação preexistente diferente. Atualiza somente `explanation`, sem alterar status, tópico, enunciado, gabarito ou data de verificação. Não libera questões retidas nem atesta novo cotejo das fontes.

Grava antes/depois em auditoria privada com RLS e sem acesso pelos papéis de navegador. Tudo ocorre em uma transação: uma divergência cancela as cinco mudanças. Reexecutar o mesmo texto não duplica auditoria. Se houver erro, preserve os dados existentes e use o diagnóstico para investigar, sem remover as proteções. A consulta final mostra os cinco estados e tópicos reais; `under_review` continua indisponível para alunos.

Gerador local: `node scripts/idecan/build-admin-explanation-sql.mjs CAMINHO_PGLITE`. Testes: `node scripts/idecan/test-admin-explanation-sql.mjs CAMINHO_PGLITE`. Foram verificados aplicação, preservação de todos os outros campos, idempotência e reversão integral por explicação concorrente, enunciado/gabarito modificado, estado bloqueado e necessidade de revisão jurídica. **SQL não executado no Supabase por este assistente.**

## Correção após diagnóstico real dos cinco registros

O usuário confirmou via SQL administrativo que os cinco IDs estão `active`, com `needs_visual=false`, `legal_review_required=false`, explicações nulas e `legal_basis` contendo somente `[{"title":"Questão de teoria da Administração; sem legislação diretamente aplicável"}]`. O bloqueio anterior era causado por essa anotação descritiva no campo reservado a fundamentos jurídicos, não por uma referência normativa real. A validação original recusava qualquer array não vazio.

`corrigir-anotacao-nao-juridica.sql` normaliza exclusivamente essa anotação exata para `[]`, para os cinco IDs e identidades/gabaritos fornecidos. Não remove normas reais, URLs ou objetos com campos extras. Exige estados e flags confirmados; preserva explicações concorrentes; audita integralmente antes/depois em tabela privada; reverte o lote se qualquer item divergir. Não altera status, tópico, nota de revisão ou data de conferência.

Ordem para o usuário: executar a correção completa e, depois, executar novamente `aplicar-cinco-explicacoes.sql` completo. O segundo bloco continua verificando hashes dos enunciados, alternativas, gabaritos e disciplinas antes de gravar as explicações. A correção dos metadados sozinha não acrescenta explicações e não confere tópico de edital ausente. Nenhum dos dois foi executado remotamente por este assistente.

Teste `scripts/idecan/test-admin-metadata-sql.mjs`: reproduz o erro com o marcador real, aplica normalização + SQL original, verifica idempotência/auditoria e preservação de outros campos, e exige reversão integral diante de referência jurídica real, campo extra, estado alterado ou explicação concorrente.
