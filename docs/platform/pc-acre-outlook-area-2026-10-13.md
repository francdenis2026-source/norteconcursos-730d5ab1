# Área de prioridades de estudo da PC do Acre

A análise está em **Objetivo → Panorama e tendências**, no início de `/dashboard/exam-panorama`, com o título **PC do Acre: o que priorizar**. O painel do aluno tem o atalho **PC do Acre: o que estudar primeiro**. A página existente foi reutilizada, preservando os filtros do panorama geral.

- Cargo padrão: Investigador. Escrivão e Delegado têm prioridades, provas de referência e amostras próprias.
- `pcCargo=investigador|escrivao|delegado` na URL permite acesso compartilhável; a âncora `#pc-acre` posiciona o aluno na seção.
- Comparação de 100 questões de treino, recorrência histórica por disciplina e fontes oficiais externas. Navegação interna permanece na mesma aba.
- Data pública do recorte: **13/10/2026**, conforme o contexto de data do usuário. Dados vêm do relatório histórico já publicado, sem texto de questões, dados pessoais ou fontes privadas.
- Explicações distinguem o recorte datado de contagem em tempo real, treino de previsão de prova e referência de 2017 de um edital novo confirmado. Escrivão destaca a amostra menor/mais antiga.
- A seção não depende do carregamento do panorama geral nem publica exercícios pendentes/anulados. Nenhuma regra de pontuação, autenticação ou quota diária foi alterada.

Validação: 463 testes, TypeScript e build em cópia isolada; Chromium com respostas do banco simuladas conferiu o atalho, os três cargos, permanência do cargo ao recarregar a URL, links de fontes, mesma aba na navegação interna, falha do panorama geral, celular e tema escuro. A área conserva a mensagem existente de acesso autenticado para visitantes.

Não houve alteração do Supabase. O novo painel é entregue pela publicação da aplicação após o envio à main.
