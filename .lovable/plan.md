# Plano de Implementação: Norte Concurso (Fase 1)

O objetivo é criar a fundação de uma plataforma SaaS para concursos públicos, com identidade visual própria, autenticação segura e estrutura inicial para alunos e administradores.

## Arquitetura Proposta
- **Frontend**: React + TypeScript + TanStack Router (Start) + Tailwind CSS + shadcn/ui.
- **Backend**: TanStack Start (Server Functions) para lógica de negócio.
- **Banco de Dados**: PostgreSQL (configurado via Supabase conforme solicitado).
- **Segurança**: Row Level Security (RLS) no banco de dados e validações via Zod no backend.

## Estrutura das Páginas (Fase 1)
- `/`: Landing Page completa (Hero, Como funciona, Ferramentas, Planos, Rodapé).
- `/auth`: Login e Cadastro (com validação de CPF e PIN).
- `/dashboard`: Área do Aluno (Resumo de desempenho, Metas).
- `/admin`: Painel Administrativo (Gestão de usuários e planos).

## Modelo do Banco de Dados (Principal)
- `profiles`: Dados básicos dos usuários (nome, CPF mascarado, interesse).
- `user_roles`: Controle de acesso (admin, student, editor).
- `plans`: Configurações de preços e limites.
- `subscriptions`: Vínculo entre usuário e plano.

## Recursos Incluídos na Primeira Entrega
1. **Identidade Visual**: Paleta Azul-marinho, Verde-esmeralda e Dourado.
2. **Landing Page**: Estrutura pública completa.
3. **Autenticação**: Fluxo de cadastro seguro com PIN de 6 dígitos.
4. **Dashboard Aluno**: Layout inicial com métricas simuladas.
5. **Painel Admin**: Visualização de usuários e edição de planos.

## Variáveis Secretas Necessárias
Você precisará configurar estas variáveis no ambiente de produção:
- `INITIAL_ADMIN_TEMP_PASSWORD`: Senha temporária do admin `francdenisbr@gmail.com`.
- `INITIAL_PLUS_TEMP_PIN`: PIN temporário do aluno Plus (CPF: 69598193268).

---

## Detalhes Técnicos
- **Validação de CPF**: Implementada via biblioteca `cpf-cnpj-validator` ou algoritmo manual no Zod.
- **PIN Seguro**: Tratado como senha no provedor de autenticação.
- **Design System**: Definição de tokens OKLCH no `src/styles.css` para consistência.
