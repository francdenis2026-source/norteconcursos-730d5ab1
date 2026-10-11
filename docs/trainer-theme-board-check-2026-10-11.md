# Treinador: tema, celular e seleção de banca

O cartão da questão forçava a classe `dark` e cores fixas. Agora acompanha os tokens de tema da plataforma, incluindo cabeçalho, alternativas, cronômetro e estados de correção. No cabeçalho móvel, o seletor tem alvo de toque de 44 px e espaço reservado; contadores secundários saem da barra em telas estreitas.

Os nomes das bancas são normalizados na leitura do catálogo e na seleção. Mudanças nos parâmetros da URL reiniciam a seleção, evitando manter uma bateria anterior. Uma combinação sem questões continua vazia. Falhas de rede ou permissão ao carregar a tabela de bancas deixam de ser silenciosamente tratadas como ausência de questões; apenas tabela inexistente mantém a compatibilidade opcional.

A consulta exata da tabela de bancas foi conferida no Supabase. Aplicando os critérios de elegibilidade do próprio treinador aos metadados ativos em 11/10/2026, foram encontradas 715 questões FGV, 60 IBFC, 120 IBADE, 389 SELECON, 62 FUNDAPE, 82 UECE-CEV e 2.850 Cebraspe, além de um item editorial sem banca. Esses números são uma fotografia das fontes compartilhadas e não incluem cadernos pessoais. A revisão de conteúdo e os bloqueios jurídicos não foram enfraquecidos.

Validação: após integrar as alterações recentes da main, 102 testes passaram, incluindo seleção de banca, aliases, combinações vazias, troca de seleção e tratamento de erros. Checagem TypeScript e compilação de produção concluídas. Uma prévia local isolada com os estilos reais foi inspecionada nos dois temas e em viewport móvel solicitado de 320 px, confirmando mudança das cores e seletor dentro da largura disponível. Essa prévia não substitui teste autenticado de ponta a ponta em produção; não havia sessão de navegador autenticada disponível.

