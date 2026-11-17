update public.study_materials
set body_md = body_md || $qual$

## Características qualitativas da informação contábil — explicação simples

### Neutralidade

A informação deve ser apresentada sem intenção de favorecer ou prejudicar alguém. O contador não pode escolher ou destacar dados para fazer a empresa parecer melhor ou pior.

**Exemplo:** não esconder uma dívida para transmitir uma imagem mais positiva da entidade.

### Tempestividade

A informação deve chegar no momento em que ainda pode ser usada para tomar decisões. Uma informação correta, mas divulgada tarde demais, pode perder sua utilidade.

**Exemplo:** reconhecer em dezembro uma despesa já conhecida, sem esperar o pagamento em janeiro.

### Continuidade

É a ideia de que a entidade continuará funcionando no futuro previsível. Essa premissa influencia a forma de avaliar e apresentar os ativos e passivos.

**Exemplo:** uma máquina usada normalmente é registrada considerando seu uso ao longo da vida útil. Se a empresa estiver encerrando suas atividades, a avaliação pode exigir outro tratamento.

### Materialidade

A materialidade indica se uma informação é importante o suficiente para influenciar a decisão dos usuários. Um erro pequeno pode ser irrelevante em uma empresa grande, mas importante em uma empresa pequena.

**Exemplo:** um erro de R$ 10 pode ser irrelevante em uma grande companhia, mas pode ser relevante para uma pequena entidade.

Materialidade não significa que o valor precisa ser grande em termos absolutos. A importância depende do tamanho da entidade, da natureza do fato e do contexto.

### Compreensibilidade

A informação deve ser apresentada de maneira clara, organizada e compreensível para usuários que tenham conhecimento razoável de contabilidade e negócios.

Isso não significa esconder informações difíceis. Significa explicar, classificar e apresentar os dados de forma organizada.

**Exemplo:** uma demonstração com títulos, grupos e notas explicativas é mais compreensível do que uma lista desorganizada de números.

### Como diferenciar na prova

- Informação tendenciosa: problema de **neutralidade**.
- Informação divulgada tarde: problema de **tempestividade**.
- Empresa considerada em funcionamento: premissa de **continuidade**.
- Informação capaz de mudar uma decisão: questão de **materialidade**.
- Informação confusa ou mal apresentada: problema de **compreensibilidade**.

$qual$,
updated_at = now()
where slug = 'contabilidade-estrutura-conceitual-informacao-util';
