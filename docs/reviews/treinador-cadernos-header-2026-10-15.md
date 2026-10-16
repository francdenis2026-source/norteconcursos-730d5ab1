# Treinador: hero, alternativas, estudar depois e cabeçalho — 15/10/2026

## Experiência

A entrada do treinador usa a imagem profissional existente `trainer-study.webp`, com contraste sobre a fotografia e adaptação móvel. O bloco de instruções “Riscar opções” foi removido. A eliminação permanece como ícone reversível junto às alternativas de múltipla escolha, com rótulo acessível. Questões de certo/errado não oferecem esse controle. Riscar não confirma resposta nem pontua.

O botão **Estudar depois** salva a questão em **Meus cadernos → Estudar depois**. O aluno encontra o texto, a disciplina, o assunto principal, anotações, busca, estado de revisão e exportação de backup. Cada alternativa tem assunto próprio e campos editáveis de disciplina/assunto. A classificação automática é aproximada; ausência de identificação permanece explícita. Materiais sugeridos são consultados na biblioteca existente e respeitam o contexto ENEM/concursos. Links de pesquisa são identificados como pesquisa; não se prometem filtros de questões previamente verificados.

O cabeçalho recebeu azul e dourado suaves no modo claro, transparência e desfoque do conteúdo durante a rolagem. O modo escuro usa tons próprios; a altura, a navegação e as áreas administrativas existentes foram mantidas.

## Persistência e limites

O caderno é local, separado pelo ID da conta; **não há sincronização com o Supabase nem entre dispositivos**. Essa informação aparece junto ao recurso, com exportação JSON de backup. A questão salva é uma cópia datada, que pode diferir de atualizações posteriores; a interface orienta consultar as fontes e materiais atuais. Não houve mudança editorial ou publicação de questões no banco.

A identidade da questão inclui origem e ID. Repetir o salvamento não duplica o item nem apaga anotações/revisão. Falhas de armazenamento e dados ilegíveis impedem a gravação sem sobrescrever o conteúdo anterior. Cadernos legados sem identificação de conta continuam armazenados na antiga chave `norte_notebooks`; não são atribuídos automaticamente a outra conta. A criação de novos cadernos deixa de inserir o exemplo fictício compartilhado e utiliza chave por conta.

## Verificação

- 557 testes passaram, incluindo cinco testes novos de eliminação apenas em múltipla escolha, separação por conta/origem, preservação de notas, classificação por alternativa e falhas de armazenamento.
- Checagem de tipos e build passaram.
- Chromium com sessão e catálogo simulados: hero com imagem disponível, riscar/desfazer em múltipla escolha, ausência dos controles em certo/errado, salvar e reabrir caderno, persistir notas após recarregar, pesquisar sem acentos, marcar revisão, cabeçalho claro/escuro com desfoque e largura de 390 px.
- Uma primeira execução do navegador precisou de ajuste no roteiro de teste para iniciar explicitamente a sessão de certo/errado; a execução final completa passou.
- Sessão real autenticada em produção não foi testada.
