# Correções da auditoria — 04/10/2026

A revisão corrigiu exposição de e-mail por CPF, desafio diário com itens inelegíveis, painel de demonstração sem autenticação, catálogo fictício, dados locais compartilhados entre contas e canais de recuperação e suporte incompletos.

## Comportamento corrigido

- A função de consulta de e-mail por CPF não pode mais ser executada por visitantes nem usuários comuns. Contas novas entram pelo e-mail; contas antigas usam o identificador interno de CPF, sem consultar ou revelar e-mail.
- “Esqueci minha senha” usa a recuperação nativa do Supabase. O retorno do link abre o formulário de nova senha, inclusive quando a URL de retorno cai na página inicial. Contas antigas sem e-mail real recebem orientação para solicitar regularização ao suporte.
- Visitantes não recebem perfil, plano ou resultados fictícios. O treinador encaminha visitantes ao desafio diário.
- O desafio retorna dez questões elegíveis, mantém o sorteio diário pelo horário do Acre e limita a solicitação a dez no servidor.
- A página inicial distingue questões cadastradas de questões disponíveis. O banco informou 5.771 cadastradas e 2.897 disponíveis na verificação.
- O catálogo usa concursos reais do banco, com busca, filtros por carreira e banca, detalhes e seleção de foco persistida no perfil. Ausência de concursos cadastrados aparece como estado vazio; dados de edital não foram inventados.
- Histórico local, cadernos, metas, simulados, biblioteca e checklist ENEM usam chaves por usuário. A troca de conta limpa o cache de consultas e remonta o painel. Dados antigos sem proprietário não são atribuídos automaticamente a outra conta.
- O suporte recebe pedidos com protocolo e oferece uma fila administrativa protegida por RLS. Visitantes não leem pedidos; três pedidos por contato por hora são permitidos, com controle de concorrência no banco.
- A normalização de banca CESPE/CEBRASPE foi corrigida. Sessões do cronômetro não criam respostas fictícias de questões.
- IA e pagamentos permanecem desativados. Entradas inválidas ou ausência de configuração da IA não consomem cota. Checkout, portal e webhook não concedem planos por implementações simuladas ou mensagens sem assinatura.
- A comunicação sobre IA e proteção de dados foi ajustada ao funcionamento implementado. Tipos, dependências de efeitos e exportações de componentes foram corrigidos; a formatação foi normalizada pelo ESLint.

## Banco e preservação de conteúdo

A migração `20261004140000_platform_audit_fixes.sql` foi aplicada e registrada em `supabase_migrations.schema_migrations` no projeto Norte Concursos. Ela altera funções e permissões, adiciona o foco de concurso ao perfil e cria a fila de suporte.

As 754 questões FGV recentemente importadas permanecem com o estado `under_review`. Nenhuma questão foi apagada, promovida a ativa ou teve seu gabarito alterado por esta correção. A revisão pedagógica e jurídica dessas questões é uma etapa distinta da correção técnica.

## Validação

- ESLint: zero erros e zero avisos.
- TypeScript: checagem sem erros.
- Testes automatizados: 17 aprovados, incluindo normalização de bancas, isolamento de dados locais, elegibilidade e importação.
- Build de produção: concluído. Avisos de empacotamento de diretivas de dependências não impediram a geração.
- Supabase público: consulta por CPF bloqueada; dez questões elegíveis e determinísticas; limite máximo de dez; suporte inválido rejeitado; leitura anônima da fila bloqueada; contagem real retornada.
- Teste transacional de suporte: inserção de três pedidos permitida, quarto pedido bloqueado. Todos os pedidos de teste foram revertidos na mesma transação.
- Conferência local: contagem da página inicial, recuperação de senha, formulário de suporte, painel sem sessão e encaminhamento ao desafio.

O envio real de e-mail, a troca de senha de uma conta e a navegação autenticada completa não foram exercitados com credenciais pessoais. Os testes de suporte não enviaram mensagens a terceiros.

## Publicação

O envio à `main` sincroniza o código com o Lovable. Segundo o fluxo documentado em `HANDOFF.md`, atualizar `norteconcursos.xyz` exige **Publish → Update** no Lovable. A migração do banco já está aplicada independentemente dessa publicação.

Na configuração de Auth do Supabase, a URL de retorno da recuperação deve permitir o domínio público e `/auth?recovery=true`. O código também trata o retorno de recuperação na raiz. Consulte a [documentação oficial de recuperação de senha](https://supabase.com/docs/reference/javascript/auth-resetpasswordforemail).

Evidências operacionais ficam nos outputs locais. Tokens, senhas, PDFs privados e acervo extraído não fazem parte deste commit.
