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
