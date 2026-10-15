# Desafio diário para visitantes

São até dez questões oficiais originais de Certo ou Errado, de bancas Cebraspe/Cespe e carreiras de segurança pública. Questões de múltipla escolha não são convertidas. Cada item precisa ter explicação didática, tópico atual em edital ativo e cumprir os controles de revisão e vigência.

O conjunto é compartilhado por dia; a ordem é embaralhada em cada abertura. Respostas e consumo permanecem no navegador mesmo após recarregar. A explicação e o fundamento aparecem somente depois de confirmar a resposta, na própria tela. O estudante avança quando terminar de ler. A renovação ocorre à meia-noite do Acre, pela data do servidor.

## Banco e publicação

A migração `20261015020000_security_ce_daily_guest_questions.sql` restringe o conjunto de candidatos usado pelo seletor existente. Não altera questões, gabaritos, revisões nem cotas. Depende da migração anterior `20261015010000_balanced_daily_guest_questions.sql`.

`node scripts/guest/publish-daily-questions.mjs --dry-run` gera `outputs/instalar-desafio-diario-completo.sql`, com ambas as migrações e seus pré-requisitos. Com `SUPABASE_ACCESS_TOKEN` disponível em configuração segura, o mesmo comando sem `--dry-run` aplica o SQL. A chave de dados não permite alterar funções SQL.

Em 15/10/2026 foram publicados pela API de dados 14 conjuntos diários, dez itens por dia, sem repetição entre eles. O primeiro contém provas de 2025–2026 da PF e PCDF, dez disciplinas e cinco gabaritos de cada tipo. A regra permanente SQL ainda exige aplicação administrativa; a interface já recusa itens incompatíveis. A disponibilidade de outras carreiras depende de itens originais revisados com comentários adequados no acervo.

O utilitário `scripts/guest/refresh-security-selection.mjs` prepara conjuntos a partir de registros aprovados existentes, preserva as cotas e salva o plano em `outputs/`. Exige `SUPABASE_SECRET_KEY` em ambiente seguro e usa `--apply` para publicar. Nunca inserir segredos em arquivos versionados.

## Verificação

`npm test` inclui filtros de escopo e formato, explicações, deduplicação, retomada e limite diário. `scripts/guest/verify-daily-sql.mjs`, com `GUEST_SQL_TEST_MODULE` apontando para PGlite instalado fora do repositório, verifica instalação completa, privacidade, renovação e exclusão de itens sem comentários. O teste não se conecta à produção.
