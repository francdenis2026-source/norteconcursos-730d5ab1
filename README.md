# Norte Concurso

Plataforma web de preparação para concursos públicos: questões, simulados, legislação, editais, painel do aluno e administração.

## Tecnologias

React 19, TypeScript, TanStack Start, Vite, Tailwind CSS e Supabase (Auth, PostgreSQL e Storage).

## Desenvolvimento

Requisitos: Node.js e npm. Clone o repositório e execute:

```bash
npm install
npm run dev
```

## Validação antes de publicar

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

A execução dos comandos acima deve acontecer em ambiente configurado. A presença dos scripts não significa que os testes já passaram.

## Configuração

Consulte `.env.example` para as variáveis necessárias. Nunca inclua `SUPABASE_SERVICE_ROLE_KEY`, senhas do banco ou outras credenciais administrativas em variáveis `VITE_` ou no Git.

A chave publicável Supabase é apropriada para uso no navegador, desde que as políticas RLS e as autorizações no servidor estejam corretas.

## Banco de dados

Migrações em `supabase/migrations/`. Para diagnóstico somente leitura, consulte `scripts/audit-public-table-security.sql`.

Antes de aplicar migrações, confirme o ID do projeto de destino, faça backup e use um ambiente de homologação. O projeto correto indicado em `supabase/config.toml` é `gkwphadbveiyjcwiiizw`.

## Segurança

Autenticação por Supabase. Dados pessoais devem ser protegidos por RLS, verificação de identidade e checagem de titularidade nos endpoints privilegiados. Confira as Edge Functions em `supabase/functions/` antes de publicá-las.

## Disponibilidade de funcionalidades

IA e pagamentos possuem flags de lançamento em `src/lib/launch.config.ts`. Não ative pagamentos antes de implementar e testar completamente checkout, webhooks e cancelamentos.

## Documentação

- `PRODUCT.md` — escopo e princípios do produto.
- `HANDOFF.md` — contexto histórico (confirme informações de publicação antes de agir).
- `roadmap.md` — registro de trabalho.
