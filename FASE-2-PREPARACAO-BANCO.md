# Fase 2 — implantação do banco da Norte Concurso

## Estado desta entrega

A fundação do Supabase foi implementada em `supabase/migrations/20260813000000_norte_concurso_schema.sql`.
Ela contém autenticação integrada, perfis, planos, catálogo, questões, respostas, cadernos,
simulados, planejamento, sessões, revisões, auditoria e políticas de Row Level Security.

O frontend mantém os mocks como fallback apenas quando as variáveis públicas do Supabase não
estão configuradas. Com as variáveis presentes, cadastro, login, concurso-foco e indicadores
passam a utilizar dados remotos.

## Segurança aplicada

- A senha do banco e a chave `service_role` não pertencem ao frontend nem ao repositório.
- CPF é validado no navegador e novamente pelo PostgreSQL.
- Alunos só acessam os próprios dados privados.
- O gabarito fica em `question_answer_keys`, sem leitura para aluno.
- Correção de questão e pontuação de simulado acontecem em funções do banco.
- Respostas e notas não podem ser gravadas diretamente pelo navegador.
- Limites diário e mensal são conferidos no servidor pela função `answer_question`.
- Uma única sessão de cronômetro pode permanecer ativa por usuário.
- Ações administrativas são separadas por papéis.

## Configuração necessária

No ambiente do Lovable, configure somente:

```text
VITE_SUPABASE_URL=https://rarwpddnjjgmxspaoplf.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<chave publishable do projeto>
```

Não use prefixo `VITE_` para senha de banco, token pessoal do Supabase ou `service_role`.

Para aplicar a migration pelo CLI, autentique-se localmente e use uma senha atual configurada
fora do repositório:

```bash
supabase login
supabase link --project-ref rarwpddnjjgmxspaoplf
supabase db push
```

## Proprietário inicial

Primeiro, crie e confirme normalmente a conta `francdenisbr@gmail.com`. Depois, no SQL Editor,
promova somente essa conta verificada:

```sql
insert into public.user_roles (user_id, role)
select id, 'owner' from auth.users where lower(email) = 'francdenisbr@gmail.com'
on conflict (user_id, role) do nothing;
```

Nenhuma senha inicial é mantida em migration ou arquivo público.

## Módulos ainda não concluídos no frontend

O banco está preparado, porém estas páginas do projeto recebido ainda eram placeholders e
precisam de implementação visual e conexão em uma próxima entrega:

- Meu Concurso e edital verticalizado.
- Cadernos.
- Simulados.
- Caderno de erros.
- Planejador.
- Cronômetro.
- Revisões e desempenho detalhado.
- Painel administrativo.

Essas páginas não devem ser apresentadas como prontas até que seus fluxos sejam implementados e
testados contra as tabelas e funções desta migration.

