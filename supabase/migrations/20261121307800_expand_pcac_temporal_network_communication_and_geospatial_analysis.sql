-- Expansão didática de Análise de Dados — PC-AC 2026.
update public.study_materials as m
set title = v.title, summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-analise-dados-vinculos-redes-linhas-tempo-geografia','Análise temporal, vínculos, comunicações e geográfica','Integra linha do tempo, redes de vínculos, registros de comunicação e análise espacial, destacando fonte, validação, hipóteses alternativas e limites de inferência.','# Análise de dados: vínculos, linhas do tempo, comunicações e geografia

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Três registros mostram: pessoa A transferiu valor para B; B telefonou para C; C aparece em endereço associado a A. O que o analista pode afirmar?
>
> A) A, B e C cometeram necessariamente um crime. B) há conexões registradas que devem ser verificadas, mas não prova automática de atuação conjunta. C) A e C mantiveram contato direto. D) o endereço comprova presença simultânea. E) a sequência demonstra causalidade.
>
> **Resolução:** os registros permitem representar relações e formular hipóteses, mas não provam intenção, contato direto ou crime. Gabarito: **B**.

## 1. Quatro dimensões que se complementam
- Temporal: quando os eventos ocorreram e em que sequência.
- Relacional: quais entidades aparecem conectadas e por qual tipo de vínculo.
- Comunicacional: quais eventos de comunicação foram registrados.
- Geográfica: onde os registros foram localizados e com que precisão.

Integrar dimensões pode ajudar a organizar informações, mas aumenta a necessidade de verificar qualidade, origem e compatibilidade dos dados.

## 2. Linha do tempo
Organize eventos por data e hora, padronizando fuso, formato, origem e precisão. Diferencie horário do fato, de transmissão, de recebimento e de registro.

Exemplo: acesso às 08h12; chamada às 08h20; deslocamento estimado às 08h47. Há intervalos de 8 e 27 minutos. A proximidade temporal não prova que um evento causou o outro.

## 3. Análise de vínculos
Represente entidades como nós (pessoas, telefones, contas, organizações, endereços) e relações como arestas (ligação, transferência, endereço compartilhado, vínculo cadastral).

- vínculo direto: relação registrada entre A e B;
- vínculo indireto: A conecta-se a C por meio de B;
- grau: quantidade de conexões de um nó;
- recorrência: repetição da mesma relação no tempo.

Um caminho indireto não comprova contato direto. Um endereço compartilhado pode ter explicações legítimas.

## 4. Registros de comunicação
Organize origem, destino, data/hora, duração, tipo e fonte. Analise frequência, concentração por horário, sequência e reciprocidade.

Metadados não revelam necessariamente conteúdo. Um identificador de linha ou aparelho não comprova quem o utilizou. Duração e frequência não demonstram finalidade.

## 5. Análise geográfica
Coordenadas usam latitude e longitude. Confirme sistema de referência, precisão e se o dado representa endereço, antena, GPS ou estimativa.

Distância em linha reta não equivale a trajeto real. Localização aproximada de antena não é posição exata de uma pessoa.

## 6. Hipóteses, correlação e causalidade
Correlação é associação entre variáveis; causalidade exige evidência de que uma mudança produz outra, com análise de fatores alternativos.

Construa hipóteses concorrentes, procure dados que as confirmem ou enfraqueçam e registre lacunas. Não transforme coincidência temporal ou espacial em conclusão causal.

## 7. Fluxo de trabalho
1. Preserve a fonte original e registre extração.
2. Padronize nomes, datas, horários e identificadores.
3. Verifique duplicidades e qualidade.
4. Relacione registros com critérios explícitos.
5. Construa linha do tempo, tabela de vínculos e mapa.
6. Teste hipóteses alternativas.
7. Apresente achados, incertezas e limitações em linguagem neutra.

## 8. Pegadinhas
- Relação temporal não prova causalidade.
- Vínculo indireto não é vínculo direto.
- Mesmo endereço não prova convivência.
- Metadados de chamada não equivalem ao conteúdo.
- Coordenada de antena não é GPS.
- Distância linear não é distância rodoviária.
- Indício não é conclusão definitiva.

**Macete:** organize os dados, verifique os vínculos e as fontes, teste explicações alternativas e conclua somente o que a evidência permite.'),
('pcac-2026-guia-analise-dados-05-analise-temporal-padroes','Análise temporal: linhas do tempo, sequência e padrões','Aprofunda datas e horários, fuso, precisão, intervalos, eventos simultâneos, frequência, sazonalidade, atrasos de registro e limites de inferência temporal.','# Análise temporal: linhas do tempo, sequência e padrões

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Um registro informa horário de transmissão às 15h10, enquanto outro registra horário de ocorrência às 14h55. Para montar uma linha do tempo confiável, o analista deve:
>
> A) tratar ambos como horários do evento. B) escolher o horário mais recente. C) identificar o significado de cada campo, fuso e possível atraso de registro. D) somar os horários. E) excluir o registro com horário diferente.
>
> **Resolução:** os campos representam eventos temporais diferentes. É preciso identificar significado, fuso e atraso antes de ordenar. Gabarito: **C**.

## 1. O que é análise temporal?
É a organização e interpretação de eventos ao longo do tempo. Ajuda a identificar sequência, intervalos, recorrência, concentração e mudanças de padrão.

A análise temporal não prova, por si só, causa ou intenção. Ela mostra quando os registros ocorreram e permite formular perguntas que precisam ser verificadas.

## 2. Datas e horários: primeiro entenda o campo
Um registro pode conter:
- horário em que o fato ocorreu;
- horário em que foi informado;
- horário em que o sistema recebeu;
- horário em que foi processado;
- horário em que foi extraído.

Esses momentos não são necessariamente iguais. Atraso de transmissão, sincronização ou processamento pode criar diferença.

## 3. Fuso horário e padronização
Antes de comparar eventos, padronize:
- formato de data;
- formato de hora;
- fuso horário;
- indicação de horário de verão, quando historicamente aplicável;
- precisão (segundos, minutos ou apenas data);
- origem e confiabilidade do relógio.

Não transforme horário local em UTC sem registrar a conversão. Se o fuso não for conhecido, sinalize a incerteza em vez de inventar uma equivalência.

## 4. Linha do tempo
É uma representação ordenada de eventos. Pode incluir data/hora, descrição, fonte, identificador, precisão e observações.

Exemplo:
- 08h12: registro de acesso;
- 08h20: chamada registrada;
- 08h47: deslocamento estimado.

Os intervalos são 8 minutos entre os dois primeiros registros e 27 minutos entre o segundo e o terceiro. A proximidade temporal não demonstra que um evento causou o outro.

## 5. Intervalos e recorrência
Intervalo é o tempo entre eventos. Frequência é a quantidade de eventos em determinado período. Recorrência indica repetição de padrão.

Compare períodos de duração equivalente. Contar 20 eventos em uma semana e 20 em seis meses sem ajustar o período pode produzir conclusão enganosa.

## 6. Sazonalidade e concentração
Sazonalidade é padrão que se repete em ciclos, como dias da semana ou meses. Concentração temporal ocorre quando eventos se agrupam em determinada faixa. A análise precisa considerar calendário, funcionamento do serviço, feriados, mudanças operacionais e volume de exposição.

## 7. Eventos simultâneos e precisão
Dois registros no mesmo minuto podem ter ocorrido em momentos diferentes, pois a precisão é limitada. Se uma fonte registra apenas hora e minuto, não é correto afirmar uma ordem exata entre eventos dentro do mesmo minuto.

Use intervalos de incerteza quando a fonte não fornece precisão suficiente.

## 8. Método de trabalho
1. Preserve os dados originais.
2. Identifique o significado de cada campo temporal.
3. Registre fonte, fuso e precisão.
4. Padronize sem apagar o valor original.
5. Ordene eventos e calcule intervalos.
6. Compare períodos equivalentes.
7. Formule hipóteses alternativas.
8. Apresente limites e lacunas.

## 9. Pegadinhas
- Horário de registro não é necessariamente horário do fato.
- Proximidade temporal não prova causalidade.
- Fuso diferente pode alterar a ordem aparente.
- Precisão limitada impede afirmar sequência exata.
- Frequência deve considerar duração do período.
- Dados ausentes não significam que o evento não ocorreu.

**Macete:** primeiro descubra o que a data/hora representa; depois padronize, ordene, compare e interprete.'),
('pcac-2026-guia-analise-dados-06-vinculos-comunicacoes-redes','Análise de registros de comunicação','Aprofunda origem/destino, tipo de evento, frequência, duração, sequência, metadados, padrões de contato, limitações das fontes e interpretação cautelosa.','# Análise de registros de comunicação

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Em registros de comunicação, o fato de dois identificadores aparecerem repetidamente em contatos demonstra, sozinho, o conteúdo ou a finalidade das conversas?
>
> A) Sim, sempre. B) Não; metadados podem mostrar eventos e padrões, mas não necessariamente o conteúdo ou a finalidade. C) Sim, se houver duração longa. D) Sim, se os contatos forem diários. E) Não, porque registros não podem ser analisados.
>
> **Resolução:** metadados descrevem eventos, não necessariamente o conteúdo da comunicação ou a intenção dos participantes. Gabarito: **B**.

## 1. Natureza dos registros
Registros podem conter identificadores de origem e destino, data, horário, duração, tipo de evento, status e identificador técnico. O conteúdo disponível depende da fonte e do procedimento de obtenção.

**Metadados** descrevem atributos da comunicação; não são necessariamente o conteúdo da mensagem ou conversa.

Um identificador de linha, conta ou dispositivo não comprova automaticamente quem utilizou o equipamento em determinado momento.

## 2. Organize os dados
Cada linha deve representar um evento conforme regra definida. Colunas devem conter atributos consistentes: origem, destino, data/hora, tipo, duração e fonte.

Preserve identificadores, período e fuso. Não misture eventos de natureza diferente sem campo que os distinga. Registre duplicidades, lacunas e critérios de exclusão.

## 3. Frequência e duração
**Frequência** é quantidade de eventos em um intervalo. Pode ser agrupada por contato, dia, semana ou faixa horária.

**Duração** mede o tempo do evento, quando esse campo existe e sua definição é conhecida. Duração zero pode significar chamada não completada ou regra de registro específica; não interprete sem conhecer a fonte.

Contagem elevada não significa necessariamente relação pessoal intensa. Considere chamadas não completadas, mensagens automáticas, notificações, duplicidades e características do sistema.

## 4. Sequência e comparação
Compare frequência por período, intervalos, horários de início e término, duração, tipo de evento e mudanças de padrão.

Compare períodos de igual duração ou apresente denominadores adequados. Separe observação de interpretação: “foram registrados 12 eventos” é observação; “houve intenção de combinar uma ação” é hipótese que exige outras evidências.

## 5. Padrões e anomalias
Podem ser observadas:
- recorrência em dias ou horários;
- concentração em determinado período;
- alteração súbita de frequência;
- contatos compartilhados;
- mudanças na sequência;
- diferenças entre períodos.

Um padrão incomum pode decorrer de rotina de trabalho, serviço automático, evento legítimo ou falha de coleta. Investigue explicações alternativas.

## 6. Limites da inferência
Registro de contato não revela necessariamente conteúdo. Duração não demonstra assunto. Frequência não prova intimidade. Identificador não comprova identidade do usuário. Correlação temporal não prova causalidade.

A análise deve apresentar fonte, período, critérios, limitações e nível de certeza, sem transformar indício em conclusão definitiva.

## 7. Exemplo
Uma tabela registra 30 eventos entre dois identificadores em sete dias. Antes de concluir que houve aumento de contato, verifique se a semana anterior tinha a mesma duração, se há duplicidades e se os registros incluem eventos automáticos. O resultado descreve eventos registrados, não o conteúdo das conversas.

## 8. Pegadinhas
- Metadados não são necessariamente conteúdo.
- Frequência = quantidade; duração = tempo.
- Um identificador não prova quem usou o aparelho.
- Padrão observado não explica sozinho a causa.
- Comparações exigem períodos e critérios compatíveis.
- Ausência de registro não prova ausência de comunicação.

**Macete:** identifique a fonte, entenda cada campo, calcule padrões e limite a conclusão ao que os dados realmente mostram.'),
('pcac-2026-guia-analise-dados-07-analise-geografica-espacial','Análise geográfica básica','Aprofunda geocodificação, latitude/longitude, sistemas de referência, precisão, distância, trajetos, mapas temáticos, taxas e vieses espaciais.','# Análise geográfica básica

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Em coordenadas geográficas, a latitude indica:
>
> A) posição a leste ou oeste de Greenwich. B) distância em quilômetros entre dois pontos. C) posição ao norte ou ao sul do Equador. D) altitude do local. E) fuso horário oficial.
>
> **Resolução:** latitude expressa posição ao norte ou ao sul do Equador. Gabarito: **C**.

## 1. Localização e distribuição
A localização pode ser representada por endereço, referência territorial ou coordenadas. Distribuição espacial descreve onde eventos aparecem e como se agrupam.

A qualidade depende da precisão e da cobertura da fonte. Um ponto pode representar endereço exato, centro de quadra, centroide municipal ou posição estimada. Informe qual é a representação utilizada.

## 2. Geocodificação
Geocodificação converte endereço ou descrição em coordenadas. Endereços incompletos, rurais, duplicados ou ambíguos podem gerar posições aproximadas.

Valide município, logradouro, número, complemento e referência. Não trate automaticamente o primeiro resultado do sistema como localização exata.

## 3. Coordenadas geográficas
- **Latitude:** posição angular ao norte ou ao sul do Equador.
- **Longitude:** posição angular a leste ou oeste de Greenwich.

Podem ser expressas em graus, minutos e segundos ou graus decimais. Confira ordem dos valores, sinal, datum e sistema de referência. Latitude e longitude invertidas podem deslocar o ponto para local incorreto.

## 4. Sistemas de referência
O sistema de referência define como a posição é representada na Terra. Sistemas geográficos usam latitude e longitude; sistemas projetados podem representar coordenadas planas em metros para medir distâncias e áreas em determinada região.

Não misture coordenadas de sistemas diferentes sem transformação apropriada. A precisão depende da fonte e do método de coleta.

## 5. Distâncias e trajetos
Distância em linha reta não é igual à distância percorrida por uma via. O trajeto depende da rede de circulação, barreiras, restrições, sentidos e modo de deslocamento.

Proximidade geográfica não comprova encontro ou participação de uma pessoa em evento. Precisão temporal e espacial devem ser consideradas em conjunto.

## 6. Mapas e representações
- **Pontos:** localização de eventos.
- **Linhas:** trajetos ou conexões.
- **Áreas:** distribuição territorial agregada.
- **Mapa de calor:** concentração estimada.
- **Coroplético:** comparação de indicadores por região.

Inclua título, legenda, escala, período, fonte e unidade. Cores devem ter significado claro. Mapas de calor dependem de parâmetros e podem exagerar ou suavizar concentrações.

## 7. Contagens e taxas
Contagens absolutas podem ser enganosas quando regiões diferem em população, área ou fluxo de pessoas. Quando adequado, use taxas com denominadores comparáveis, como eventos por população ou por unidade de exposição.

Um bairro com mais registros pode ter maior população, maior circulação ou melhor cobertura de dados, não necessariamente maior risco individual.

## 8. Exemplo aplicado
Eventos aparecem próximos a uma avenida. Isso pode refletir maior fluxo de pessoas, presença de unidades de atendimento, cobertura de câmeras ou concentração real. Antes de concluir, compare população, exposição, fonte, período e qualidade da geocodificação.

## 9. Pegadinhas
- Latitude = norte/sul; longitude = leste/oeste.
- Geocodificação pode ser aproximada.
- Linha reta não equivale a trajeto.
- Um mapa precisa de legenda, escala, período e fonte.
- Contagem absoluta não é taxa.
- Agrupamento espacial não explica sozinho a causa.

**Macete:** valide endereço e coordenadas; confira sistema de referência; escolha a métrica; só depois interprete o mapa.')
) as v(slug, title, summary, body_md)
where m.slug = v.slug;