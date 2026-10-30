# Fluxo integrado do treinador de questões

## Intenção

Tornar a resposta de questões mais fluida e didática. Acertos avançam automaticamente com confirmação discreta; erros permanecem na questão com explicação prática e caminhos de estudo. Consultas pausam o tempo e preservam a sessão.

## Escopo

- Alterar o fluxo de confirmação em `question-trainer.tsx`.
- Reaproveitar a explicação, fontes e materiais já associados à questão.
- Persistir/restaurar índice, filtros, respostas e estado de pausa usando o mecanismo de sessão existente.
- Manter saída definitiva com confirmação explícita.

## Comportamento

1. **Acerto:** salvar a resposta, mostrar aviso breve “Resposta correta” e avançar automaticamente após um intervalo curto; permitir cancelamento por teclado ou ação equivalente quando aplicável.
2. **Erro:** salvar a resposta, manter a questão aberta e mostrar painel com resposta correta, comentário, exemplo, erro comum e botões “Abrir material”, “Pesquisar” e “Ver fonte”.
3. **Consulta:** pausar o cronômetro e registrar `pausedAt`/motivo; ao retornar, restaurar a questão e continuar somente após o aluno fechar a consulta.
4. **Sessão:** salvar filtros e posição; reabrir o treinador no mesmo ponto sem duplicar resposta nem contar tempo de consulta.
5. **Saída:** “Sair do treino” encerra a sessão apenas após confirmação; voltar ao treinador mantém a sessão pendente.

## Segurança e precisão

- Não alterar gabarito nem explicação durante o fluxo.
- Não registrar uma mesma resposta duas vezes.
- Não contar tempo em que o aluno está consultando material ou pesquisa.
- Usar links internos seguros e fontes oficiais já validadas.

## Verificação

- Typecheck e testes existentes do treinador.
- Casos manuais: acerto, erro, consulta, retorno, recarregamento e saída definitiva.
