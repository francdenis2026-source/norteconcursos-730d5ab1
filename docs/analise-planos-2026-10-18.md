# Análise dos planos (18/10/2026)

Base: `subscriptions.config.ts`, `launch.config.ts`, `planPresentation.ts`, `PlanGate`, migrações de limites no servidor, menu do painel e a landing. Nada aqui altera preços: os números da seção 4 são **proposta a validar**.

## 1. O que cada plano entrega hoje

| Recurso | Gratuito | Essencial R$ 19,90 | Plus R$ 29,90 | Premium R$ 49,90 |
|---|---|---|---|---|
| Questões por dia | 20 | 100 | ilimitadas | ilimitadas |
| Simulados | não | "2" (sem unidade) | ilimitados | ilimitados |
| Resolução com IA | não | 15/dia | 50/dia | ilimitada |
| Plano de estudos | não | sim | "adaptativo" | "personalizado" |
| Biblioteca e leis | 3/dia | ilimitada | ilimitada | ilimitada |
| Radar, Panorama, Perfil das bancas | não | sim | sim | sim |
| Cadernos, Flashcards, Redação | não | sim | sim | sim |
| Análise das suas provas | não | não | não | sim |
| Suporte prioritário | não | não | não | sim |

Sem trava de plano (abertos a todos): Cronograma por edital, Trilhas, Videoaulas e podcasts, Dicionário, Painel do CTB, Calculadora penal, ENEM, Ranking e Medalhas, filtro "Atual" e Caderno de erros.

## 2. Período de 30 dias do cadastro gratuito

Funciona. Quem cria conta ou já tem conta gratuita usa o plano Essencial por 30 dias (contados do cadastro, ou de 03/10/2026 para contas antigas) e depois volta ao Gratuito. A regra é a mesma no aplicativo (`effectiveTier`) e no servidor (`effective_plan_tier`). Aparece na landing (selo "Fase de testes"), no card dos planos, no painel (contador), em "Plano e uso" e no FAQ.

**Faltava** o destaque no próprio formulário de cadastro, onde a pessoa decide. Corrigido: faixa "30 dias com tudo do plano Essencial, sem cartão" acima do formulário.

## 3. Problemas encontrados

1. **Promessas sem regra no código.** "2 simulados" do Essencial não é aplicado em lugar nenhum e não diz se é por dia ou por mês. "Suporte prioritário" do Premium não tem fluxo nem prazo. "Adaptativo" (Plus) e "personalizado" (Premium) usam o mesmo recurso do Essencial.
2. **IA ilimitada no Premium.** É custo variável sem teto, e a IA ainda está desligada (`AI_ENABLED = false`). Plano pago nunca deveria prometer "ilimitado" de algo que custa por uso.
3. **Essencial e Plus quase iguais.** A diferença real é só "ilimitado" em questões e simulados. Pouca razão para subir de plano.
4. **Valor entregue de graça.** Cronograma por edital, Perfil das bancas (que está atrás do Radar), filtro "Atual", Trilhas e CTB são os recursos mais diferenciais e não entram na vitrine de nenhum plano.
5. **Sem plano anual** nem desconto por antecipação (principal alavanca de caixa e de retenção).
6. **Referência de mercado fraca.** Só achei, em site comparativo (não oficial), a Assinatura Ilimitada do Gran Cursos a partir de R$ 59,90/mês. Não achei preços de Qconcursos nem TEC Concursos. O acervo do Norte (cerca de 6 mil questões disponíveis, foco em segurança pública) é bem menor que o dos concorrentes (milhões), o que justifica preço abaixo deles, mas não dá para cravar o valor sem teste.

## 4. Proposta (a validar com o seu custo real)

Princípio: cobrar por **volume** (questões, simulados), **custo variável** (IA), **personalização** (cronograma por edital, Perfil das bancas, análise das provas do aluno) e **conveniência** (anual). Nunca esconder correção legal ou vigência atrás de plano.

| | Gratuito | Essencial | Plus | Premium |
|---|---|---|---|---|
| Preço mensal (hipótese) | R$ 0 | R$ 24,90 | R$ 39,90 | R$ 59,90 |
| Anual (2 meses grátis) | | R$ 249 | R$ 399 | R$ 599 |
| Questões/dia | 20 | 100 | ilimitadas | ilimitadas |
| Simulados | 1 curto/mês | 2 por mês (aplicado) | ilimitados | ilimitados |
| IA por dia (ao ligar) | não | 10 | 30 | 100 (cota, não "ilimitado") |
| Cronograma por edital | só leitura | sim | sim | sim |
| Perfil das bancas e filtro "Atual" completo | não | Radar e Panorama | sim | sim |
| Análise das suas provas | não | não | não | sim |
| Suporte | comum | comum | comum | resposta em até 1 dia útil |

Fórmula para fechar o preço de cada plano:
`margem por assinante = preço x (1 - taxa do gateway) - custo variável (IA por uso) - custo fixo mensal / número de assinantes`.

## 5. Decisões que dependem de você

1. Custo mensal fixo (Supabase, hospedagem, domínio) e custo por resolução de IA, para calcular o ponto de equilíbrio.
2. Gateway de pagamento e taxa (Pix e cartão).
3. Aprovar (ou ajustar) a tabela da seção 4. Só então mexo em `subscriptions.config.ts`, na trava de simulados e no fluxo de suporte.

## 6. O que esta mudança já faz

- Imagem de cena do próprio produto no topo de cada card de plano (uma por plano, enquadrada para desktop e celular).
- Faixa dos 30 dias no formulário de cadastro.
