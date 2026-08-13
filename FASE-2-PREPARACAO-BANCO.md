# FASE 2 - PREPARAÇÃO PARA O BANCO DE DADOS

Este documento descreve as entidades e relações necessárias para a futura integração do banco de dados na plataforma Norte Concurso, baseada na implementação da Fase 2 (Demonstrativa).

## 1. Entidades Necessárias (Tabelas)

### `profiles`
- `id` (uuid, PK)
- `full_name` (text)
- `cpf` (text, unique)
- `focused_contest_id` (uuid, FK)
- `subscription_tier` (enum: 'free', 'essential', 'plus', 'premium')

### `contests`
- `id` (uuid, PK)
- `name` (text)
- `agency` (text)
- `career` (enum)
- `role` (text)
- `exam_board` (text)
- `education_level` (enum)
- `location` (text)
- `status` (enum)
- `vacancies` (int)
- `salary` (decimal)
- `exam_date` (timestamp)

### `disciplines` & `subjects`
- `disciplines`: `id`, `name`
- `subjects`: `id`, `name`, `discipline_id`, `parent_id` (auto-relacionamento)

### `questions`
- `id` (uuid, PK)
- `text` (text)
- `type` (enum: 'multiple_choice', 'true_false')
- `explanation` (text)
- `discipline_id` (uuid, FK)
- `subject_id` (uuid, FK)
- `difficulty` (enum)

### `options` (Para questões de múltipla escolha)
- `id` (uuid, PK)
- `question_id` (uuid, FK)
- `text` (text)
- `is_correct` (boolean)

### `user_responses`
- `id` (uuid, PK)
- `user_id` (uuid, FK)
- `question_id` (uuid, FK)
- `selected_option_id` (uuid, FK, nullable)
- `boolean_answer` (boolean, nullable)
- `is_correct` (boolean)
- `time_spent` (int) - segundos
- `created_at` (timestamp)

### `notebooks`
- `id` (uuid, PK)
- `user_id` (uuid, FK)
- `name` (text)
- `description` (text)

### `notebook_questions`
- `notebook_id` (uuid, FK)
- `question_id` (uuid, FK)

## 2. Relações Principais
- Perfil 1:1 com Usuário Auth
- Perfil N:1 com Concursos (Foco)
- Questões N:1 com Disciplinas e Assuntos
- Respostas N:1 com Usuário e Questão
- Cadernos N:1 com Usuário e N:N com Questões

## 3. Segurança e RLS
- Usuários só podem ler e escrever seus próprios `profiles`, `user_responses`, `notebooks` e `study_plans`.
- `contests`, `questions`, `disciplines` e `subjects` são leitura pública para autenticados.
- Admins (via `user_roles`) têm permissão total em tabelas de conteúdo.

## 4. Próximos Passos para Integração
1. Criar tabelas e ENUMs no Supabase.
2. Migrar os dados de `src/data/mock` para as tabelas iniciais.
3. Substituir os métodos do `MockService` por chamadas à API do Supabase (Client-side).
4. Implementar lógica de limites baseada no plano do usuário no Servidor.
