# Continuidade — Claude Code (13/11/2026)

Resumo para a próxima sessão. Nada aqui depende do histórico local do Claude Code, que não estava acessível; tudo vem do Git, dos arquivos do projeto e da conversa desta sessão.

## 1. Ambiente e regras do proprietário
- Repositório oficial: `francdenis2026-source/norteconcursos-730d5ab1`, branch `main`. **Não** usar o fork `fjconcursoac11-ux/...`. Conectado ao Lovable: não reescrever histórico publicado (sem `force push`, rebase ou amend de commits já enviados).
- Backend: Supabase `gkwphadbveiyjcwiiizw` (projeto "north"). Em sessões em nuvem não há acesso ao banco; o proprietário roda consultas no SQL Editor e cola o resultado.
- Regra do Desafio diário: 10 questões, virada à meia-noite do Acre (`America/Rio_Branco`, nunca UTC).
- Conteúdo jurídico: seguir `CONTENT_GOVERNANCE.md` (fonte oficial, vigência verificada, vínculo com o edital ativo).
- Diretriz de áreas do aluno: uma área por vez, compacta, sem rolagem horizontal; informar a conclusão e aguardar a próxima.
- Autorizações anteriores de publicar na `main` (PR + merge a cada pedido) **estão suspensas nesta etapa**: o proprietário pediu auditoria sem publicar na `main`.
- Atribuição nos commits: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` e `Claude-Session: <url da sessão>`.

## 2. O que esta sessão realizou (PRs mesclados na `main`)
| PR | Assunto |
| --- | --- |
| 575 | Botões do resumo PC-AC (grade própria; "Inteligência IDECAN" deixou de ficar por baixo) |
| 576 | Dados da Resex Alto Juruá (506.186 ha do Decreto 98.863/1990; município Marechal Thaumaturgo) |
| 577 | Player de vídeo: tela cheia, barra de andamento, botões responsivos |
| 578 | Mapas jurídicos interativos (`src/data/legalMaps.ts`, `LegalMapExplorer`, `scripts/legal-maps.test.mjs`) |
| 581 | Devolve as imagens dos atalhos da Área do aluno (revertendo só a parte de imagens do PR 579) |
| 599 | Largura da janela, rolagem visível em tela cheia, Biblioteca sem coluna vazia |
| 600 | Demais áreas do aluno usam até 1760 px (`src/styles/workspace-width.css`) |
| 601 | Barra de endereços mostra só a seção (`src/lib/cleanAddressBar.ts`, `src/router.tsx`) |

Antes desta fase (mesma sessão, em resumo): auditoria de contraste claro/escuro (`src/styles/contrast-guard.css`), biblioteca de vídeos e player (`vp2-*`, `vl-*`), mapas e dados do Acre (Resex, terras indígenas, IBGE, linha do tempo, fatos estratégicos, vídeos por município).

## 3. Outras sessões Claude no histórico (por mensagens de commit, 11–13/11)
Persistência de respostas de exercícios da Biblioteca (`material_practice_responses`, `record_material_practice_answer`), revisão editorial de exercícios normativos, correção de cores inválidas `hsl(var(--token))` (#592), ícones e fundo de Material didático (#594), feedback de exercícios (#595), falso "sem conexão" (#596), caderno quebrado e duplicidade em Materiais (#597), unificação da trilha guiada (#598), cronograma PC-AC em largura total (#590), atalho "Material de estudo" (#593), troca de imagens dos atalhos (#579, parcialmente revertida em #581).

## 4. Alterações não publicadas
- **Nenhuma alteração de código pendente.** Branches desta sessão que não estão na `main`: `claude/auditoria-completa` (estes três relatórios) e `claude/mapas-juridicos-2` (só dados, superada pelo PR 578).
- Existem 414 branches remotas; a maioria `claude/*` já mesclada. Limpeza pode ser feita depois, com cuidado por causa do Lovable.
- A pasta local `E:\norteconcursos-730d5ab1-main` não foi examinada (sessão em nuvem). Se houver alterações não commitadas lá, **não foram vistas**.

## 5. Estado verificado nesta auditoria (resumo)
- `tsc` 0 erros; 932 testes aprovados; build passa; eslint 0 erros e 33 avisos; sem `package-lock.json`; sem E2E.
- Banco (dados informados pelo proprietário): 10.390 questões registradas, 6.785 disponíveis; 35 disciplinas com material (Processual Penal 1, Penal 6; Legislação Penal Especial 1 publicado de 26; Legislação Específica da PF 0 de 10).
- Edital PC-AC: 139 vagas conferidas; itens do Anexo III quase todos localizados no PDF (8 a conferir).
- Detalhes e evidências: `AUDITORIA_COMPLETA_NORTE_CONCURSOS.md`. Lista de tarefas: `PENDENCIAS_NORTE_CONCURSOS.md`.

## 6. Como trabalhar na próxima sessão
1. Ler `AGENTS.md`, `CONTENT_GOVERNANCE.md` e estes três relatórios.
2. Aguardar a autorização do proprietário para a fase seguinte (a auditoria terminou sem implementar nada).
3. Para ver a área logada sem credenciais: subir `npx vite dev --port 5199 --host 127.0.0.1` e usar sessão simulada via Playwright com `localStorage['sb-gkwphadbveiyjcwiiizw-auth-token']` e roteamento de `*supabase.co` retornando respostas vazias (mede layout, não dados). Para dados reais, pedir ao proprietário consultas no SQL Editor.
4. Testes: `npm test` (932) e `npx tsc --noEmit`. Build: `npx vite build`.
5. Ao concluir um pedido com autorização de publicação: branch nova a partir de `origin/main`, commit, push, PR e merge (merge com `expectedHeadSha` do `git rev-parse HEAD`).
6. Segurança: nunca gravar senhas em arquivos. Uma senha foi colada no chat nesta sessão; recomendar a troca.

## 7. Tabela de situação por módulo
| Módulo | Situação | Problema | Prioridade | Próxima ação |
| --- | --- | --- | --- | --- |
| Homepage | Concluída | 2 `<h1>`, sem canonical | P3 | Ajustar SEO |
| Dashboard | Parcial | Dados reais não vistos | P2 | Validar com conta real |
| Biblioteca / Material | Parcial | Processual Penal 1 material; materiais não ativos | P1 | Produzir material; revisar estados |
| Edital PC-AC | Concluída (lista de tópicos) | 8 itens a conferir | P2 | Conferência manual |
| Cronograma | Parcial | Sem validação na interface | P2 | Testar com perfil real |
| Banco de questões | Parcial | 34,7% indisponíveis; taxonomia fragmentada | P1/P2 | Auditar bloqueios; normalizar |
| Simulados | Não verificada | Fluxo não executado | P2 | Teste acompanhado |
| Study Coach | Parcial | Personalização não verificada | P2 | Validar |
| Flashcards | Parcial | Integração com desempenho não verificada | P2 | Validar |
| Redação | Parcial | Mobile e avaliação não verificados | P2 | Testar |
| Área do aluno | Parcial | Perfil real não validado | P2 | Validar |
| Ferramentas educacionais | Ausente (nesses nomes) | Study Guide/Simplify/Compare/Quiz Me não existem | P3 | Confirmar desejo |
| Administração | Parcial | Não exercitada | P2 | Auditar com conta admin |
| Supabase | Parcial | Banco ao vivo não verificado | P1 | Advisor + auditoria SQL |
| Responsividade | Parcial | 4 rotas com elementos além da largura | P2 | Inspecionar em aparelho |
| Qualidade técnica | Concluída | Sem lockfile/E2E | P2 | Lockfile + E2E |
