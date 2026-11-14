---
name: norte-design-pack
description: Pacote único de design do Norte Concursos. Combina impeccable, taste, ui-ux-pro-max, redesign-existing-projects, minimalist-ui, high-end-visual-design, emil-design-eng, break-ui, mobile-native e review-animations, já adaptado às regras do projeto. Use para qualquer tela, menu ou submenu: homepage (web e celular), dashboard do aluno, dashboard do administrador e demais áreas.
user-invocable: true
---

# Pacote de design Norte Concursos

Um roteiro só, em vez de rodar dez skills. Resume o que importa de cada uma e fixa o que o dono do projeto já decidiu.
Fontes completas, se precisar de detalhe: `.claude/skills/impeccable`, `.agents/skills/{design-taste-frontend, ui-ux-pro-max, redesign-existing-projects, minimalist-ui, high-end-visual-design, emil-design-eng, break-ui, mobile-native, review-animations}`.

## 0. Regras do projeto (vencem qualquer skill)
- Ler `AGENTS.md` e `CONTENT_GOVERNANCE.md`. Conteúdo jurídico: só com fonte oficial e vigência.
- Lovable: nunca reescrever o histórico publicado; commits pequenos em `main`, branch sempre funcional.
- Diretriz do dono: uma área por vez, **compacta, organizada e profissional**; faixa de boas-vindas só na Área do aluno; faixas baixas nas demais; sem cartões e avisos altos; remover comandos, contagens e explicações redundantes; preservar funções, regras de estudo e dados reais.
- Contraste AA (4,5:1 em texto pequeno) nos modos claro e escuro; sem rolagem horizontal; sem controles cortados em celular, tablet e desktop.
- Dicas ao apontar o mouse: só texto, sem caixa, descrição curta (`AreaHint`); somem ao clicar.
- Dados globais de questões: sempre `usePlatformQuestionSummary` (ver AGENTS.md).
- Nunca trocar o nome real de uma banca; nunca usar credenciais coladas no chat.
- Sem recriar jogos ou sites de terceiros; imagens do próprio acervo em `public/media`.

## 1. Diagnóstico (impeccable + redesign-existing-projects)
Antes de editar, abrir a tela renderizada (Playwright, mock em `scratchpad`) em 1366, 820 e 390 px, claro e escuro. Listar:
1. Redundâncias: o mesmo atalho, número ou texto em dois lugares.
2. Cartões grandes ou fotos onde bastaria uma linha.
3. Hierarquia: um título dominante por tela; secundários discretos.
4. Padrões genéricos de IA: três cartões iguais, gradiente roxo, tudo centralizado, sombras pretas pesadas, emojis como ícones.
5. Estados faltando: carregando, vazio, erro, offline.

## 2. Tipografia e cor (taste + minimalist + high-end)
- Uma família de fonte por papel (título, texto, número). Números tabulares em dados.
- Escala curta: 12 / 14 / 16 / 20 / 28. Peso 500–600 para hierarquia; negrito só em títulos.
- Parágrafos até ~65 caracteres, `text-wrap: pretty`; títulos `text-wrap: balance`. Alinhado à esquerda; justificar só texto corrido longo e sem hifenizar palavras curtas.
- Um acento (dourado do projeto) + neutros de uma só família. Sem preto puro; sombras tingidas; no máximo uma cor de destaque por bloco.
- Tokens sempre (`var(--...)`), nunca hex solto; escuro e claro definidos juntos.

## 3. Layout e componentes (ui-ux-pro-max)
- Grade: contêiner largo, espaçamento múltiplo de 4/8, `min-height: 100dvh`, nunca `100vh`.
- Densidade de aplicação (dashboard): linhas e tabelas para dados; cartão só para o que é ação ou resumo. Selo/Badge só para contagem.
- Alvos de toque ≥ 44 px (exceto ícones compactos dentro de grupos). Foco visível sempre.
- Botões primários 1 por bloco; ações secundárias em texto ou contorno.
- Formulários: rótulo visível, ajuda curta, erro junto do campo, `font-size ≥ 16px` no celular.
- Imagens: `object-fit`, proporção fixa, `loading="lazy"`, `alt=""` quando decorativas, sempre com degradê para o texto por cima.

## 4. Movimento (emil-design-eng + review-animations)
- Só o que informa: entrada de menu, troca de estado, feedback de clique. 120–220 ms, `ease-out`; só `transform` e `opacity`.
- Respeitar `prefers-reduced-motion`. Nada que pisque, nada em loop.

## 5. Celular (mobile-native)
- Barra inferior com 5 destinos no máximo; safe areas (`env(safe-area-inset-*)`); sem hover como único caminho; menus viram gaveta.
- Texto mínimo 14 px; tabelas viram listas ou rolam dentro de si, nunca a página.

## 6. Quebrar a tela (break-ui)
Testar com: nome com 60 caracteres, e-mail sem espaços, zero itens, 500 itens, número enorme, falha de rede, texto 200 %, tema claro/escuro. Corrigir `overflow-wrap`, `min-width: 0`, truncamento com título completo no hover.

## 7. Verificação (obrigatória)
1. `npx tsc --noEmit -p .`, `npm run lint`, `npm test` (0 falhas novas), `npm run build`.
2. Capturas nos três tamanhos e dois temas; sem rolagem horizontal; contraste conferido.
3. Reverter `public/version.json`, `src/build-info.ts`, `src/routeTree.gen.ts` após o build.
4. Commit curto em português com o rodapé de atribuição; `git push origin HEAD:main`. Se algum teste falhar, **não enviar**.

## 8. Roteiro de aplicação (uma área por vez, concluir e aguardar o OK)
**Fase A — Homepage pública (web e celular)**
1. Cabeçalho e menu principal (dropdowns e submenus, com descrições ao apontar).
2. Hero, prova social, planos, perguntas frequentes, rodapé.
3. Páginas públicas ligadas: cadastro, entrada, recuperar senha, Desafio diário.

**Fase B — Dashboard do aluno** (menus: Meu plano, Agenda, Estudos, Treinos, Desempenho, ENEM, Conta; cada submenu)
Estudos: Materiais e disciplinas, Leis e súmulas, Leis especiais, CTB, Calculadora penal, Videoaulas, Dicionário, Sala de estudo, Redação.
Treinos: Treinador, Caderno de erros, Flashcards, Cadernos, Acervo, Resolver com IA, Simulados, Provas realizadas.
Desempenho: Painel, Histórico, Ranking, Medalhas. Conta: Perfil, Plano e assinatura.

**Fase C — Dashboard do administrador** (Controle, Alunos, Cadastros, Suporte, Financeiro, Conteúdo, Concursos, Questões, Denúncias, Mídia)

**Fase D — Demais telas**: leitor de edital e programa, biblioteca (leitura de lei), simulador em andamento, páginas de erro/404, e-mails e PDFs exportados.

Para cada tela: diagnóstico (seção 1) → ajuste → verificação (seção 7) → relatar em poucas linhas e aguardar a próxima.
