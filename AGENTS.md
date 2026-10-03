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

As áreas autenticadas usam uma única navegação por jornadas (Hoje, Objetivo, Edital e conteúdo, Questões, Provas, Desempenho e Conta), enquanto funções administrativas ficam em um grupo visual separado para reduzir ambiguidade.

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
