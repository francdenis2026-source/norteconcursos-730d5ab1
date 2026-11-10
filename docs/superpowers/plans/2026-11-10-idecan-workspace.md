# Inteligência IDECAN compacta com Astryx
Continuação autorizada da remodelação das áreas do aluno, na main.
- Separar carregamento/autenticação da visualização testável; preservar consulta e cálculos do acervo.
- Cabeçalho baixo, indicadores compactos e TabList Astryx: Edital PC-AC, Disciplinas, Provas, Gabaritos, Plano de ação. Um painel rolável por vez.
- Usar tokens Astryx e o tema do app, corrigir largura dos gráficos e chips no celular e altura no modo de foco/fullscreen.
- Corrigir avisos que tratam o edital publicado como futuro e o atalho de questões sem filtro IDECAN; adicionar nova tentativa ao estado de erro.
- Verificar dados vazios/carregamento/erro, teclado, links, temas e tamanhos; executar TypeScript, testes, build e doctor antes do push.

## Resultado e verificação
- Visualização extraída em IdecanIntelligenceWorkspace; autenticação e consulta original permanecem na rota. Cálculos estatísticos preservados.
- Cinco abas Astryx, painel com rolagem interna, matriz em detalhes expansíveis, gráficos responsivos e tema sincronizado ao app.
- Corrigidos avisos sobre edital ainda não publicado e filtros IDECAN dos atalhos de treino/simulados. Botão Astryx ligado ao roteador por adaptador com ref.
- Verificações Chromium no componente de produção com dados de teste locais: 16 combinações de largura (320/390/768/1366), tema (claro/escuro) e foco/normal; cinco abas por combinação. Sem overflow horizontal e abas permanecem visíveis ao rolar o painel.
- Passaram expansão de disciplina, link ao edital, navegação de treino, filtros por disciplina, teclado, estados vazio/erro/carregando, nova tentativa, troca de tema, recálculo de altura ao entrar no foco e fullscreen nativo.
- TypeScript e ESLint dos arquivos da área passaram; 13 testes de banca-profile passaram. Build de produção e doctor Astryx passaram sem falhas.
- Suíte completa: 869 aprovados e as mesmas 3 falhas preexistentes de importação JSON (discipline-hub, library-navigation, material-practice).
- Correção adicional mínima exigida pelo TypeScript: não passar initialCourseId explicitamente undefined à biblioteca; nenhuma mudança de comportamento.
- Revisão própria: preservados escopo de Polícia Civil, dados oficiais ativos, avisos de confiança e links; nenhum dado remoto alterado.
- Limite: navegador validado em entrada local isolada com componente real; não foi validada sessão autenticada na produção.
