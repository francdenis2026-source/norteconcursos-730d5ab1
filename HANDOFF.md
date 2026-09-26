# Handoff — Projeto Norte Concurso / Franc Denis

Documento de continuidade. Cole isto (ou o link do arquivo) na primeira mensagem de uma nova sessão/conta pra retomar exatamente de onde parou.

## 1. Onde tudo está

**Repositório local:** `C:\Users\familia\Desktop\norteconcursos-730d5ab1-main`

**GitHub:**
- `origin` → `francdenis2026-source/norteconcursos-730d5ab1` — **sem acesso de escrita** (nenhuma conta testada consegue dar push aqui)
- `platforma` → `projectsFranc/PlataformaNorteconcurso` — **este é o remoto ativo**, conectado ao Lovable. Todo push vai pra cá.

**Lovable:**
- Projeto: https://lovable.dev/projects/8ab8740c-ad92-45df-9d6c-937fc71c534d
- App publicado: https://friendly-flock-nook.lovable.app
- Confirmado que o site publicado reflete o código enviado (mostra "Conectado ao Supabase Externo")

**Supabase (banco de dados novo, em uso):**
- URL: `https://gkwphadbveiyjcwiiizw.supabase.co`
- Publishable key: `sb_publishable_hF4jXHTs4tapaOMX2KdqvA_N_A5Tyqf`
- (Service role key e senha do banco estão só no histórico do chat anterior — se precisar, gere uma nova em Project Settings → API, é mais seguro que reusar a antiga)
- Projeto Supabase **antigo** (`rarwpddnjjgmxspaoplf`) está pausado/fora do ar — não usar.

**Contas criadas no Supabase Auth:**
- Admin: `francdenisbr@gmail.com` / senha `125758` (role: admin)
- Franc Denis (aluno): `69598193268@norteconcurso.local` / senha `125758` (CPF 69598193268, role: user)

## 2. O que já foi feito

### Banco de dados (schema completo aplicado)
Tabelas: `profiles`, `user_roles`, `contests`, `disciplines`, `subjects`, `questions`, `user_responses`, `mock_exam_results`, `achievements`, `user_achievements`, `user_streaks`, `subscription_plans`, `subscription_audit_logs`, `admin_audit_logs`, `comment_audit_logs`, `access_audit_logs`, `official_exam_documents`, `student_exam_documents`, `essay_submissions`, `question_bank`.

Migrations em `supabase/migrations/` (todas já commitadas e no GitHub).

### Provas analisadas (Franc Denis, cargo Agente de Polícia Federal)
4 provas reais, fotos enviadas por ele, cada item classificado (certo/errado/anulado/sem marcação):
- **2014** — 57 certas, 16 erradas confirmadas, 44 itens sem marcação (tratados como "não sabia" a pedido dele)
- **2018** — 63 certas, 49 erradas, 8 anuladas (bate exatamente com o "63" que ele escreveu na prova)
- **2021** — 58 certas, 17 erradas, 1 anulada, 44 sem marcação
- **2025** — **nota oficial confirmada pelo BDI da CEBRASPE: 56,00 pts (82 acertos, 26 erros), 13.104ª colocação na ampla concorrência**

Nota de corte de classificação real (conferida item a item nos PDFs oficiais da CEBRASPE):
| Ano | Classificados | Corte |
|---|---|---|
| 2014 | 1.416 | 64,00 |
| 2018 | 551 | 68,00 |
| 2021 | 2.118 | 75,00 |
| 2025 | 1.460 | 82,00 |

Em nenhum ano ele apareceu na lista de classificados — sempre abaixo do corte, mas a distância diminuiu ano a ano.

### Artefatos publicados (claude.ai)
1. **Boletim comparativo** — nota de corte × nota líquida, raio-X por disciplina, os 4 anos
2. **Espaço de Redação** — as 3 discursivas capturadas (2014 incompleta, 2018 parcial, 2021 completa)
3. **Dashboard de Estudos** — gráficos, pontos fortes/fracos, plano de estudos, previsão
4. **CTI (Central de Treinamento Intensivo)** — cards de matéria clicáveis, legislação verificada, Pomodoro, flashcards, checklist, cronograma, quiz

(Os links exatos dos artefatos estão no histórico do chat — se a nova sessão não tiver acesso a eles, é só pedir pra eu republicar ou usar `Artifact action:list`.)

### Banco de questões pedagógico (`question_bank`)
34 questões já cadastradas com gabarito oficial + explicação pedagógica completa:
- **2014 — Raciocínio Lógico-Matemático completo** (itens 57-70, 14 questões)
- **2018 — Estatística + RLM completo** (itens 41-60, 20 questões, gabarito oficial em PDF conferido)

## 3. O que falta (próximos passos, nessa ordem)

1. **2018 — Contabilidade** (itens 97-120, 24 questões) — gabarito oficial já em PDF, só falta transcrever e explicar
2. **2014 — Contabilidade** (itens 81-90, 10 questões) — gabarito oficial já confirmado antes
3. **2021 e 2025** — RLM/Estatística/Contabilidade/Big Data (ainda sem gabarito oficial 100% conferido pra todo item — precisa ler os PDFs de gabarito que já estão nas pastas locais das provas)
4. **Verificação de legislação no Planalto** (em andamento quando a sessão foi interrompida): já confirmados vigentes — Lei 11.343/2006, 13.869/2019, 12.850/2013, 13.445/2017, 8.069/1990 (ECA — **tem alterações recentes em 2024/2025/2026, vale revisar**), 8.112/1990, 9.784/1999. **Faltam:** Código Penal (DL 2.848/1940), Código de Processo Penal (DL 3.689/1941), Constituição Federal (arts. 5º e 144).
5. Continuar populando `question_bank` pras demais matérias (Direito, Português, Informática) nos 4 anos.

## 4. Regras importantes que o usuário pediu pra manter

- **Nunca** incluir lei/artigo/inciso revogado ou desatualizado no banco — sempre abrir e conferir no `planalto.gov.br` antes de cadastrar.
- Basear questões novas nas **tendências reais da banca** (CEBRASPE), olhando concursos recentes de áreas afins.
- Questões em branco/sem marcação = tratar como "não sabia" (ponto fraco), não como dado neutro — isso já foi aplicado no diagnóstico mas não muda a pontuação real (branco sempre vale 0).
- Nota líquida = certas − erradas + anuladas (cada anulada vale +1).

## 5. Credenciais sensíveis

Senha do banco, service role key etc. **não estão neste arquivo por segurança**. Se a nova sessão precisar, gere novas credenciais no painel do Supabase (Project Settings → API / Database) e me passe as novas — é mais seguro do que reusar as antigas que já foram digitadas em chat.
