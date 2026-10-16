# PC-AC 2017 S01-V — pesquisa oficial e quarto lote

Foram concluídas **sete decisões editoriais**: seis questões publicadas como ativas e uma arquivada como histórica. Três textos antes indisponíveis foram recuperados. Não foram criadas questões redundantes nem alterados os gabaritos.

| Questão | Decisão e melhoria |
| --- | --- |
| 4 — A | Ativa. Argumento de autoridade, com pequeno fragmento de apoio da página 2, atribuição à autora e exemplo. Não foi copiada a crônica integral. |
| 5 — E | Ativa. Oração substantiva objetiva direta introduzida por “se”, distinguindo-a de oração condicional. Exemplo autoral e variação contrastante. |
| 9 — A | Ativa. Valor de modo no contexto dos advérbios, sem ensinar que toda terminação “-mente” indica modo. A leitura gramatical não endossa as classificações raciais históricas do texto. |
| 73 — E | Ativa. Documento médico-legal detalhado, com estrutura do laudo. Distingue a terminologia histórica da prova de relatório assistencial ou prontuário. |
| 76 — A | Ativa. Putrefação como transformação cadavérica e sinal de certeza de morte, sem inferência automática do horário do óbito. |
| 80 — D | Ativa. Manifestações compatíveis com embriaguez, examinadas em conjunto; sinais não são exclusivos nem permitem calcular alcoolemia ou concluir automaticamente um crime. |
| 39 — C histórico | Arquivada. A decisão editorial evita ensinar, a partir da alternativa B, que a PM não poderia lavrar TCO. Não se declara anulação oficial nem incorreção do núcleo constitucional da alternativa C. |

## Pesquisa e alcance das fontes

O caderno oficial foi novamente obtido na internet, com SHA-256 igual ao já registrado: `6fc3d1720f125c353d99e08541c67e3baddaaf8de9ac3051a0ca271c1d4cfb69`. As questões 4, 5 e 9 foram conferidas visualmente; os fragmentos necessários estão disponíveis no próprio item ou foram acrescentados com atribuição. O gabarito definitivo S01-V foi preservado.

Fontes efetivamente consultadas:

- [Ministério da Justiça / SENASP — Procedimento Operacional Padrão: Perícia Criminal](https://www.gov.br/mj/pt-br/assuntos/sua-seguranca/seguranca-publica/analise-e-pesquisa/download/pop/procedimento_operacional_padrao-pericia_criminal.pdf): edição **2013**, consultada em **16/10/2026**. Estrutura do laudo nas páginas impressas 133–134; fenômenos transformativos nas páginas impressas 218–219. A data de consulta não foi apresentada como atualização da edição. Não se certificam as regras legais antigas de todo o manual.
- [CONTRAN — Resolução 1.031/2026](https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10312026.pdf): nova captura em 16/10. O Anexo II lista, entre outros sinais, odor alcoólico, olhos vermelhos e dificuldade de equilíbrio. A fonte não enumera todos os achados clínicos da questão, nem os transforma em requisito cumulativo. O art. 15 revoga a Resolução 432/2013; o art. 16 diferencia a vigência dos artigos da produção de efeitos da alteração do Anexo da Resolução 985. A explicação não usa a norma revogada como referência atual.
- [STF — ADI 5637, notícia de 15/03/2022](https://noticias.stf.jus.br/postsnoticias/supremo-mantem-possibilidade-de-pm-mg-lavrar-termo-circunstanciado/): conteúdo integral obtido pela API oficial `postsnoticias/55232`. PM pode receber atribuição de lavrar TCO; isso não equivale a conduzir investigação por inquérito.
- [STF — ADIs 6245 e 6264, notícia de 24/02/2023](https://noticias.stf.jus.br/postsnoticias/prf-pode-lavrar-termo-circunstanciado-de-ocorrencia-decide-stf/): conteúdo integral obtido pela API oficial `postsnoticias/57511`, reafirmando a distinção e a ADI 5637.

O confronto de edital usa a matriz oficial PF Agente 2025 para Português e PCDF Delegado 2026 para Medicina Legal. Os tópicos médicos de toxicologia e tanatologia foram acrescentados apenas após conferir os itens correspondentes, na página 83 do PDF. Nenhum tópico existente foi substituído; a identidade histórica PC-AC permanece preservada.

O Planalto respondeu **503** nesta retomada. A captura constitucional de 15/10 e sua data foram preservadas na análise histórica da questão 39. Não se atribuiu data fictícia de nova obtenção da lei. Tentativas em OMS, NIST, BVS e ONU-Mulheres foram bloqueadas pela política de rede. Foi salvo um rascunho de inclusão dos seis domínios necessários, preservando a lista existente; salvar o rascunho não aplicou o acesso. Permanecem necessários revisão, salvamento e publicação nas configurações do ambiente.

## Publicação e preservação

O fluxo executou simulação com preflight real no Supabase, recuperação de contexto em etapa separada, registro de tópicos/exclusão sem sobrescrever registros anteriores, publicação com comparação dos campos originais e leitura após gravação.

A comparação final abrangeu **158 registros PC-AC**, com **151 fora dos alvos preservados**, incluindo aliases arquivados. Gabaritos e extração bruta foram preservados. As seis questões ativas passaram pela regra real de elegibilidade e apresentaram exemplos. Foram preservados todos os 367 cadastros anteriores de fonte, as 53 edições e os 669 tópicos; acrescentaram-se somente dois tópicos. Nenhuma unidade de lei ou código da aplicação foi alterado. **195 testes passaram; zero falhas e zero ignorados.** Build não executado, pois não houve mudança de aplicação.

## Estado após o lote

No conjunto canônico de 79 registros: **55 ativos após revisão, dois arquivados históricos, dois obsoletos e 20 pendentes**. A questão 26, anulada no gabarito oficial, completa as 80 questões da prova e não integra esse conjunto canônico. As 72 recuperações de texto se sobrepõem às 59 decisões editoriais acumuladas; as quantidades não devem ser somadas.

Pendentes:

- Português: **1, 2, 3, 6, 7, 8 e 10** — contexto e validação específicos ainda necessários.
- Informática: **13** — generalizações sobre Internet, custo e nuvem exigem fonte técnica atual; NIST bloqueado.
- Jurídicas: **25, 42, 44, 45 e 70** — doutrina, ambiguidade de alternativas, aplicação normativa ou texto compilado indisponível ainda impedem decisão segura. O gabarito antigo não substitui a revisão.
- Medicina Legal: **71, 72, 74, 75, 77, 78 e 79** — fontes técnicas específicas ainda necessárias. A questão 78 não pode ensinar que ruptura do hímen prova necessariamente conjunção carnal; na 79, não se equiparam irrestritamente barotrauma e doença descompressiva.

Leitura geral de **16/10/2026 03:23 UTC**: **7.768 registros físicos, 6.265 ativos e 1.173 em revisão**. Não é contagem de questões únicas. O delta desde o checkpoint anterior corresponde às seis ativações e ao arquivamento deste lote.

Inventário e hashes: `docs/question-review-pcac-v-batch4-2026-10-16.json`. PDFs, capturas e snapshots integrais estão em outputs ignorados, fora do Git.
