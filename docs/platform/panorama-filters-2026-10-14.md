# Correção dos filtros do Panorama

Filtros de **Panorama e tendências** passam a seguir esfera → órgão → cargo. Cada lista contém somente opções disponíveis dentro dos pais selecionados; uma seleção incompatível é resolvida antes de calcular os resultados. Trocar esfera reinicia órgão/cargo; trocar órgão reinicia cargo.

A lista extensa de botões de cargos foi substituída por um seletor compacto, com rótulo e orientação. Nomes equivalentes são agrupados pelo contexto do órgão:

- Polícia Civil: Agente de Polícia, Agente de Polícia Civil e Agente de Polícia Judiciária → Agente de Polícia Civil; Escrivão de Polícia/Escrivão de Polícia Civil → Escrivão de Polícia Civil; Investigador de Polícia/Investigador de Polícia I → Investigador de Polícia.
- Delegado civil e Delegado federal continuam separados. Oficial Investigador, Agente/Investigador, Datiloscopista e especialidades de Perito não foram fundidos.
- DEPEN/2021, registrado incorretamente como cargo, aparece como Agente Federal de Execução Penal, conforme a edição consultada no Supabase. A correção não presume o cargo de outras edições.
- PRF, PF e DEPEN recebem esfera federal pelo contexto do órgão. Órgãos e cargos estaduais não aparecem no filtro federal.

A normalização é específica do panorama. Nomes originais são conservados para cruzar questões e tópicos do edital; os filtros de assuntos usam a mesma seleção aplicada às contagens. Nenhuma questão, fonte ou edição foi apagada ou modificada no banco, e aliases não eliminam suas contagens.

Validação: **468 testes**, TypeScript e build em cópia isolada aprovados. Chromium com dados simulados confirmou opções únicas, hierarquia, reinício de filhos, separação PF/PC, preservação de especialidades, vínculo com tópicos e seletor no celular sem rolagem horizontal da página. Consulta de leitura ao Supabase confirmou a identidade do cargo DEPEN/2021.
