# Refino visual Norte Concursos

## Intenção
Elevar o acabamento profissional da homepage, autenticação e navegação mobile sem alterar autenticação, dados, Supabase ou regras de estudo.

## Abordagens consideradas
- Redesign completo: descartado nesta etapa por maior risco de regressão.
- Migração ampla imediata para Astryx: adiada; exige inventário e migração de componentes.
- Refino incremental: escolhido por preservar a identidade Porcelain & Gold e permitir validação por área.

## Escopo da etapa
- Consolidar tokens visuais compartilhados para superfície, borda, texto, brass e foco.
- Refinar header, CTAs, estados de navegação e menu mobile da homepage.
- Refinar hierarquia visual, campos, tabs, mensagens e responsividade do login.
- Remover ajustes redundantes apenas quando forem locais e comprovadamente seguros.
- Preservar rotas, autenticação, acessibilidade existente e comportamento funcional.

## Fora do escopo
Dashboard completo, migração total para componentes Astryx, mudanças de banco, conteúdo educacional e alteração de regras de estudo.

## Validação
Executar typecheck, lint e build; revisar diffs e testar visualmente as rotas `/`, `/auth` e `/dashboard` em desktop e mobile quando o runtime estiver disponível.
