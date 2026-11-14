# Relatório de revisão — PC-AC 2026 — Processo Penal Lote 2

Data da revisão: 14/11/2026  
Arquivo revisado: `pcac-2026-processo-penal-lote2-draft.md`  
Cargo: Oficial Investigador de Polícia  
Fonte programática: Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III, p. 48.

## Resultado da primeira rodada

| Questão | Tema | Resultado | Ajuste / observação |
|---|---|---|---|
| 1 | Polícia judiciária | Aprovada com ressalva | Art. 4º, parágrafo único, reproduz ressalva para atribuições legais de autoridades administrativas. |
| 2 | Representação | Aprovada | Art. 5º, § 4º; enunciado circunscrito a ação pública condicionada. |
| 3 | Prazo do inquérito | Aprovada com ressalva | Regra geral de 10 dias preso e 30 dias solto; enunciado ressalva leis especiais. |
| 4 | Diligências | Aprovada | Art. 14; discricionariedade da autoridade policial nos limites legais. |
| 5 | Arquivamento | Aprovada com ressalva | Art. 17 veda à autoridade policial mandar arquivar. O procedimento do art. 28 exige leitura conforme STF. |
| 6 | Novas provas | Corrigida | Retirada a expressão imprecisa “arquivamento judicial”; questão agora não pressupõe autoridade judicial como autora do arquivamento. |
| 7 | Elementos informativos | Aprovada com ressalva | Art. 155; preservadas exceções de provas cautelares, não repetíveis e antecipadas. |
| 8 | Corpo de delito | Aprovada | Art. 158; confissão não supre exame quando há vestígios. |
| 9 | Cadeia de custódia | Aprovada | Art. 158-A; início ligado à preservação do local ou detecção do vestígio em procedimento. |
| 10 | Nomeação de perito | Corrigida | Explicação agora distingue nomeação do perito e indicação de assistente técnico, conforme art. 159. |
| 11 | Encargo pericial | Aprovada com ressalva | Não fixa valor de multa sujeito a atualização; trata apenas da regra de aceitação e escusa atendível. |
| 12 | Intérpretes | Aprovada | Art. 281; equiparação legal aos peritos. |

## Conclusão

- 10 questões aprovadas na primeira rodada sem alteração substantiva.
- 2 questões corrigidas (6 e 10).
- Nenhuma questão foi inserida no banco de dados ou publicada.
- O lote continua condicionado à segunda revisão jurídica e à validação de integração.

## Itens técnicos obrigatórios antes de ativação

1. Associar todas as questões ao tópico PC-AC 2026 correto: `e5ccace6-4479-4921-adf0-4ed63aa607a8`.
2. Associar fonte normativa oficial e data de conferência.
3. Verificar unicidade dos gabaritos e ausência de duplicidade por enunciado/conceito.
4. Usar a tabela `content_sources` para preencher `source_id` (UUID), pois a chave estrangeira do catálogo aponta para `content_sources.id`. `question_corpus_sources` é um acervo distinto e não deve ser usado como origem direta do catálogo.
5. Não ativar enquanto a incompatibilidade de origem não estiver resolvida e testada.

## Regra de publicação

Somente registros com revisão jurídica e didática concluída, tópico correto, fonte vinculada, gabarito único, explicação, proveniência e teste de duplicidade podem receber estado ativo. Rascunhos permanecem fora do banco de questões visível ao aluno.
