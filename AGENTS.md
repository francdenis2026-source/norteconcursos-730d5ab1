<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Conteúdo educacional

Ao criar ou alterar questões, siga integralmente `CONTENT_GOVERNANCE.md`. Nunca publique conteúdo jurídico sem vínculo com o edital ativo, fonte oficial e verificação de vigência. Para leis federais, use o texto compilado oficial do Planalto; para súmulas e jurisprudência, use o tribunal competente.

## Arquitetura da experiência

As áreas autenticadas usam uma única navegação por jornadas (Minha preparação, Objetivo, Edital e conteúdo, Questões, Provas, Desempenho e Conta), enquanto funções administrativas ficam em um grupo visual separado para reduzir ambiguidade.

## Normalização de dados pessoais

Campos nominais são convertidos para maiúsculas durante a digitação e novamente antes da persistência, garantindo consistência mesmo fora da interface.

## Configuração do banco no navegador

A configuração pública do Supabase e a criação de clientes isolados ficam centralizadas na integração compartilhada, evitando destinos divergentes.

## Regra do Desafio diário (não pular, em nenhum dispositivo)

Todo dia, à meia-noite do horário do Acre (`America/Rio_Branco`, UTC−5), as **10 questões grátis** do Desafio diário são renovadas para quem não quer se cadastrar. Não remover, enfraquecer nem contornar essa regra.

- A data do dia vem do relógio do servidor (`get_current_acre_date()`); a reserva sem rede é `acreDateKey()` em `src/lib/acreTime.ts`. **Nunca** usar `toISOString()`/UTC para "o dia de hoje": viraria o dia às 19h do Acre.
- A data é reconferida a cada 60 s (`src/lib/guestQuota.ts`); a página `/desafio-diario` recarrega sozinha na virada do dia (sem interromper quem está respondendo).
- As 10 questões do dia são as mesmas para todos (`get_daily_guest_questions`). A contagem de respondidas fica no `localStorage` de cada aparelho, com a chave da data do Acre.
- O selo da hero (`DailyChallengeBadge`) mostra quantas restam hoje e a contagem até a renovação; ao concluir, convida a criar conta.

## Theme architecture
- Contest identity artwork uses scoped contain-fit rules and in-flow labels rather than cropped backgrounds, so logo visibility does not alter other contest imagery.
- Homepage color aliases must inherit shared semantic theme tokens; image-backed sections use dedicated on-image tokens to maintain contrast without a second competing palette.
- Install missing-module recovery before hydration as well as in the React boundary, sharing a session throttle to avoid reload loops after version changes.

## Diretriz de remodelação da área do cliente

Orientação do usuário: trabalhar uma área por vez, com apresentação profissional, compacta, organizada e acesso fácil. Manter a faixa de boas-vindas na Área do aluno. Nas demais áreas, usar faixas de identificação baixas e evitar cartões e avisos excessivamente altos. Remover comandos, contagens e explicações redundantes; preservar funções, regras de estudo e dados reais. Aplicar destaques coloridos com contraste nos modos claro e escuro. Adaptar à largura disponível em celular, tablet e desktop, sem rolagem horizontal nem controles cortados. Ao concluir a área solicitada, informar a conclusão e aguardar o usuário indicar a próxima.

## Contagens globais de questões

Homepage, área do aluno e totais administrativos usam `usePlatformQuestionSummary` (RPC `get_public_question_summary` e cache `public-question-summary`) para **Total cadastrado** e **Disponíveis para treinar**. Não substituir esses totais por `catalog.length` ou por uma seleção de Concursos/ENEM. Contagens por área, busca, origem, disciplina ou banca devem ser identificadas como **seleção de estudo**. Questões pessoais ficam fora do total global. **Revisadas com exemplo** é um indicador distinto: usar `reviewedQuestionBank`, com a mesma exigência de revisão didática e elegibilidade em todas as telas.
