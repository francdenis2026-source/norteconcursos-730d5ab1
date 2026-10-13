# CTB — revisão em andamento

Supabase conferido em 13/10/2026: **117/365 unidades atuais com aprovação editorial válida; 248 pendentes**. O primeiro lote desta retomada publicou 50 itens, dos arts. 1º–47, incluindo dispositivos com letras. Os 17 anteriormente aprovados foram preservados. A lista exata e o próximo item estão em `ctb-review-progress-2026-10-13.json`.

Cada item do lote tem caso resolvido, variação contrastante, dois exercícios com resposta explicada e termo definido. Foram corrigidas omissões e generalizações, entre elas estacionamentos privados coletivos, composição do SNT/Contran, mandato dos Conselhos, registros nacionais, competências reorganizadas em 2023, delegação de privativas, alcance da polícia legislativa, prioridade de veículos especiais e distinção entre buzina, faróis e DRL. Os alertas antigos sobre apreensão/remoção foram preservados.

Planalto: compilado obtido em 13/10 por cliente com cabeçalho de navegador, após falhas 503 da primeira rota. Reparação HTML5 encontrou os 365 dispositivos atuais, sem diferenças em seus hashes; os hashes reais dos corpos armazenados também foram confirmados. Leis 14.071/2020, 14.599/2023 e 14.861/2024, portal Senatran e registro oficial do Tema 965/STJ foram consultados. Texto legal e estrutura da biblioteca permaneceram intactos.

Foi encontrado vínculo incorreto da edição PCDF Delegado 2026 a um caderno de prova. A publicação foi interrompida após oito aprovações; essas aprovações foram retiradas e refeitas. Somente `syllabus_editions.source_id` foi corrigido, com comparação integral da linha anterior, para o edital retificado já registrado e conferido em 11/10. A nova coleta do PDF retornou 403; a data anterior foi preservada e não se certifica nova auditoria integral do programa. O importador agora exige fonte oficial vigente do tipo edital e rejeita caderno/gabarito, inclusive com rotulagem incorreta.

Readback: **50/50**, todos os campos autorais e hashes, 3.463 explicações fora do lote preservadas, incluindo 315 do CTB. A alteração da fonte da edição foi conferida como exceção específica, sem ignorar outras alterações nas tabelas protegidas. Não houve alterações concorrentes observadas nesse intervalo. Nenhuma questão foi importada ao treinador.

Validação: 421 testes, TypeScript e build aprovados, além das verificações de integração. Pacotes retêm as 50 versões anteriores. Fontes brutas, snapshots e logs ficam apenas nos outputs ignorados; credenciais não são versionadas.

Retomar no **art. 93**. Não declarar conclusão do CTB; a comparação textual não substitui revisão pedagógica/jurídica. Inventário legal geral: **2.560/3.511 revisadas, 951 pendentes**. A leitura integral complementar pode exceder o programa do cargo; conferir seu edital.

## Segundo lote

Mais 50 itens (arts. 48–91, lista explícita no pacote) revisados, publicados e conferidos. Corrigidos descanso diário atingido pela ADI 5322, referência residual ao SPVAT após LC 211/2024, proteção ocular de passageiro, retenção de criança, velocidade de motocicleta, distinção entre vaga reservada e estacionamento regulamentado e alcance da sinalização defeituosa. Consultados Planalto, notícia oficial STF e PDFs/índice Senatran. Não certificada toda modulação da ADI: página detalhada retornou 403; alertas impedem aplicação histórica automática.

Readback 50/50; 3.463 explicações externas ao lote (315 do CTB) e todas as seis tabelas protegidas preservadas. 424 testes, TypeScript e build passaram. Primeiro lote enviado à main no commit `55a3b61`; segundo lote tem relatório próprio. Os dois lotes acrescentaram 100 revisões nesta retomada, sem importar questões ao treinador.
