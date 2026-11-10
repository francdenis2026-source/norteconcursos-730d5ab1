# Motor geral de planejamento de estudos

## Intenção
Criar uma configuração central e editável que gere o cronograma completo a partir da data de início, prova-alvo, disponibilidade semanal e preferências de rotina.

## Modelo escolhido
Plano automático editável. O sistema gera uma proposta inicial e permite ajustar blocos depois, mantendo o recálculo quando a data inicial ou a data da prova mudar.

## Arquitetura
- Um `StudyPlanConfig` central guarda início, prova, dias, horas, horário, pausas, refeições, descanso e preferências de atividade.
- Um motor puro gera semanas, dias e eventos tipados: teoria, questões, revisão, redação, simulado, pausa, refeição e descanso.
- Dashboard, cronograma, edital PC-AC, estudo por lei e agenda consomem o mesmo resultado.
- Alterações manuais são overrides por evento; o recálculo preserva overrides válidos e repropõe eventos não editados.

## Interface visual Astryx
- Timeline semanal com tokens semânticos e cards por tipo de atividade.
- Azul: teoria; teal: questões; amber: revisão; violeta: redação; rose: simulado; slate: pausa/descanso.
- Editor de configuração em painel com resumo de carga, horário e dias.
- Responsividade com visão semanal no desktop e agenda diária no mobile.
- Estados claros para gerado, editado, concluído, atrasado e reagendado.

## Alinhamento com conteúdo e edital
- O motor recebe uma matriz de disciplinas e assuntos do edital ativo.
- Cada disciplina deve aparecer no plano; peso, incidência, dificuldade e progresso definem a ordem.
- Disciplinas de maior peso entram primeiro e recebem mais blocos, sem excluir as demais.
- Cada bloco de teoria, questão e revisão referencia disciplina e assunto concretos.
- Assuntos concluídos avançam para revisão; assuntos críticos recebem reforço.
- O motor calcula cobertura por disciplina, assunto e fase, sinalizando lacunas.
- Simulados usam a distribuição do edital e redações seguem a fase e o objetivo do concurso.

## Dados e compatibilidade
- Preservar configurações existentes de cronograma e PC-AC, migrando-as para o novo formato com defaults seguros.
- Datas devem ser formatadas no fuso do Acre sem `toISOString()` para exibição de calendário.
- Regras de estudo, conteúdo educacional e dados reais permanecem intactos.

## Etapas
1. Criar tipos, normalização e motor puro de geração.
2. Adaptar cronograma PC-AC e dashboard para consumir o motor.
3. Criar editor visual central e agenda semanal/diária.
4. Migrar áreas relacionadas e adicionar overrides.
5. Validar datas, fuso, carga, pausas e responsividade.
