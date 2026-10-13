# CTB — revisão em andamento

Supabase conferido em 13/10/2026: **317/365 unidades atuais com aprovação editorial válida; 48 pendentes**. O primeiro lote desta retomada publicou 50 itens, dos arts. 1º–47, incluindo dispositivos com letras. Os 17 anteriormente aprovados foram preservados. A lista exata e o próximo item estão em `ctb-review-progress-2026-10-13.json`.

Cada item do lote tem caso resolvido, variação contrastante, dois exercícios com resposta explicada e termo definido. Foram corrigidas omissões e generalizações, entre elas estacionamentos privados coletivos, composição do SNT/Contran, mandato dos Conselhos, registros nacionais, competências reorganizadas em 2023, delegação de privativas, alcance da polícia legislativa, prioridade de veículos especiais e distinção entre buzina, faróis e DRL. Os alertas antigos sobre apreensão/remoção foram preservados.

Planalto: compilado obtido em 13/10 por cliente com cabeçalho de navegador, após falhas 503 da primeira rota. Reparação HTML5 encontrou os 365 dispositivos atuais, sem diferenças em seus hashes; os hashes reais dos corpos armazenados também foram confirmados. Leis 14.071/2020, 14.599/2023 e 14.861/2024, portal Senatran e registro oficial do Tema 965/STJ foram consultados. Texto legal e estrutura da biblioteca permaneceram intactos.

Foi encontrado vínculo incorreto da edição PCDF Delegado 2026 a um caderno de prova. A publicação foi interrompida após oito aprovações; essas aprovações foram retiradas e refeitas. Somente `syllabus_editions.source_id` foi corrigido, com comparação integral da linha anterior, para o edital retificado já registrado e conferido em 11/10. A nova coleta do PDF retornou 403; a data anterior foi preservada e não se certifica nova auditoria integral do programa. O importador agora exige fonte oficial vigente do tipo edital e rejeita caderno/gabarito, inclusive com rotulagem incorreta.

Readback: **50/50**, todos os campos autorais e hashes, 3.463 explicações fora do lote preservadas, incluindo 315 do CTB. A alteração da fonte da edição foi conferida como exceção específica, sem ignorar outras alterações nas tabelas protegidas. Não houve alterações concorrentes observadas nesse intervalo. Nenhuma questão foi importada ao treinador.

Validação: 421 testes, TypeScript e build aprovados, além das verificações de integração. Pacotes retêm as 50 versões anteriores. Fontes brutas, snapshots e logs ficam apenas nos outputs ignorados; credenciais não são versionadas.

Retomar no **art. 296**. Não declarar conclusão do CTB; a comparação textual não substitui revisão pedagógica/jurídica. Inventário legal geral: **2.760/3.511 revisadas, 751 pendentes**. A leitura integral complementar pode exceder o programa do cargo; conferir seu edital.

## Segundo lote

Mais 50 itens (arts. 48–91, lista explícita no pacote) revisados, publicados e conferidos. Corrigidos descanso diário atingido pela ADI 5322, referência residual ao SPVAT após LC 211/2024, proteção ocular de passageiro, retenção de criança, velocidade de motocicleta, distinção entre vaga reservada e estacionamento regulamentado e alcance da sinalização defeituosa. Consultados Planalto, notícia oficial STF e PDFs/índice Senatran. Não certificada toda modulação da ADI: página detalhada retornou 403; alertas impedem aplicação histórica automática.

Readback 50/50; 3.463 explicações externas ao lote (315 do CTB) e todas as seis tabelas protegidas preservadas. 424 testes, TypeScript e build passaram. Primeiro lote enviado à main no commit `55a3b61`; segundo lote tem relatório próprio. Os dois lotes acrescentaram 100 revisões nesta retomada, sem importar questões ao treinador.

## Terceiro lote

Mais 50 itens (arts. 93–139-B, com recorte explícito) publicados e conferidos. Corrigidos classificação de veículos, inspeção geral suspensa, lacre eletrônico da PIV, transferência digital, recall condicionado, baixa mesmo com débitos e responsabilidade delimitada na comunicação da venda. Motofrete: MP 1360 perdeu vigência em 15/9/2026; não manter sua dispensa temporária como regra atual, ressalvadas relações constituídas durante sua vigência e disciplina constitucional de transição.

50/50 no readback; 3.463 explicações externas ao lote, incluindo 315 do CTB, e as seis tabelas protegidas preservadas. 427 testes, TypeScript e build passaram. Lote anterior enviado no commit `a73180c`. A retomada soma 150 novos itens aprovados. Fontes e limites detalhados no relatório do terceiro lote.

## Quarto lote

Mais 50 itens (arts. 140–192, recorte explícito) publicados e conferidos. Corrigidas categorias, exceção de elétrica/híbrida da Lei 15.503/2026, toxicológico na primeira A/B, exceções e diferenças entre exames, formação pela Resolução 1020 e procedimentos de álcool pela Resolução 1031. Fichas alteradas do Manual 985 ainda em vacância até 17/10/2026; não tratadas como vigentes em 13/10. Corrigidos também remoção não universal e ausência de menor gravidade universal da parada em relação ao estacionamento.

50/50 no readback; 3.463 explicações externas ao lote, incluindo 315 do CTB, e as seis tabelas protegidas preservadas. 431 testes, TypeScript e build passaram. Lote anterior enviado no commit `32b51ac`. Esta retomada soma 200 novos itens aprovados, preservando os 17 anteriores. Limites de implantação do toxicológico A/B e distinções entre texto legal/procedimento regulamentar estão explícitos.

## Quinto lote

Mais 50 itens (arts. 193–247, recorte explícito) publicados e conferidos. Corrigidos transição de free flow aprovada pela Resolução 1028/2026, marco do prazo de pagamento, exemplos de percentuais com velocidade considerada e contraste entre ultrapassagem, trânsito pelo acostamento, preferência e motocicletas. Pena residual de apreensão no art. 231 não tratada como atual.

50/50 no readback; 3.463 explicações externas ao lote, incluindo 315 do CTB, preservadas. Todos os registros anteriores das seis tabelas protegidas permaneceram idênticos. Foram adicionados pela outra conta 23 tópicos de edição diferente e 13 fontes: evidência explícita por ID/hash, sem ocultar o crescimento das tabelas ou aceitar alteração de registros anteriores. Seis testes negativos/positivos do readback passaram; 434 testes de aplicação, TypeScript e build passaram. Lote anterior na main: `3e3834e`. A retomada soma 250 novos itens aprovados.

A main recebeu migração concorrente `88d90c3` de rascunhos dos arts. 193–201. Seu conteúdo é preservado no Git; inserção ajustada para não sobrescrever registros já existentes, em especial as aprovações correntes. As demais mudanças remotas tratam principalmente do treinador e não contam como novas revisões editoriais da biblioteca.


## Sexto lote

Mais 50 unidades (arts. 248–295, recorte explícito) revisadas, publicadas e confirmadas. Corrigidos descontos de 20%/40% e condições de renúncia, dever de advertência do 267, RNPC sem dispensa dos exames físico/mental, diferenças entre expedição/recebimento de notificação e entre prazos de quinze/trinta/sessenta dias. Resolução 1025/2026 e vigência futura do SNE exclusivo em 2027 explicitadas. Cautelares e expressão de ofício integradas ao CPP atual, sem declarar resolvidas todas as controvérsias.

50/50 no readback; 3.463 explicações fora do lote, incluindo 315 do CTB, preservadas. Todos os registros anteriores das seis tabelas protegidas permaneceram iguais; adições concorrentes de 21 tópicos, duas edições e quatro fontes registradas por ID/hash. Coleta com duplicados foi rejeitada e repetida. Antes da publicação, conferência independente registrou outras adições e duas fontes de disciplinas alheias atualizadas pela outra conta, sem alteração em explicações ou unidades do CTB.

437 testes, TypeScript e build passaram; sete testes de proteção do readback passaram. Esta retomada soma 300 novos itens aprovados; 17 anteriores preservados. Lote anterior enviado com proteção de migração no commit `e9c8f7b`. Próximo lote: 48 unidades do art. 296 ao Anexo I. Não confundir aprovação da unidade com certificação de toda jurisprudência/regulamentação externa.
