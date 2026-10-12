import type { ContranGuide } from "@/lib/contranStudy";

export const CONTRAN_INDEX_URL = "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/resolucoes-contran";
export const CONTRAN_CHECKED_AT = "2026-10-12";
export const CONTRAN_GUIDES: ContranGuide[] = [
  {
    "number": 1031,
    "year": 2026,
    "title": "Álcool: fiscalização e consequências distintas",
    "subject": "Dispõe sobre os procedimentos a serem adotados pelas autoridades de trânsito e seus agentes na fiscalização do consumo de álcool ou de outra substância psicoativa que determine dependência.",
    "issueDate": "2026-08-17",
    "publicationDate": "2026-08-18",
    "lastRelatedActDate": "2026-08-18",
    "checkedAt": "2026-10-12",
    "officialSituation": "Esta Resolução entra em vigor: em 60 dias após a data de sua publicação para a alteração do Anexo da Resolução Contran nº 985, de 15 de dezembro de 2022, nos termos do art. 14 desta Resolução; e na data de sua publicação, quanto aos demais artigos. Revoga a Resolução 432/13 Altera o Anexo da Resolução 985/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10312026.pdf",
    "relatedSources": [],
    "sourceSha256": "9f6d8d8c6e7b7996fce21326a229c9b262d45178907fff7bd9dd159ca5ba9b5a",
    "historical": false,
    "points": [
      "Fiscalização pode ocorrer mesmo sem sinais prévios de alteração psicomotora.",
      "Infração administrativa, recusa e crime têm hipóteses próprias.",
      "As alterações do Anexo do MBFT têm vigência 60 dias após 18/08/2026; os demais artigos, na publicação."
    ],
    "warning": "Em 12/10/2026, não antecipar a parte do MBFT com vigência diferida. A resolução substituiu a 432/2013, mas não torna toda recusa prova automática de crime.",
    "example": {
      "scenario": "Um motorista fiscalizado recusa o teste, sem que os demais elementos de crime tenham sido demonstrados.",
      "question": "A recusa prova automaticamente o crime do art. 306 do CTB?",
      "answer": "Não. Examine o enquadramento administrativo da recusa e, separadamente, os elementos e meios de prova da infração penal.",
      "variation": "O agente quer usar em 12/10/2026 uma alteração de ficha do MBFT submetida aos 60 dias.",
      "variationAnswer": "Deve respeitar a vigência diferida, não aplicar a alteração apenas porque o restante da resolução já vigora."
    },
    "textPath": "/contran/1031-2026.json"
  },
  {
    "number": 1030,
    "year": 2026,
    "title": "Telas: imagem ao passageiro não é imagem ao condutor",
    "subject": "Altera a Resolução Contran nº 242, de 22 de junho de 2007, que dispõe sobre a instalação e utilização de equipamentos geradores de imagens nos veículos automotores.",
    "issueDate": "2026-08-17",
    "publicationDate": "2026-08-18",
    "lastRelatedActDate": "2026-08-18",
    "checkedAt": "2026-10-12",
    "officialSituation": "Altera a Resolução 242/07",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10302026.pdf",
    "relatedSources": [],
    "sourceSha256": "859f258a9fb32876ae829523a7fa6695928cffbfb7797a947c3a22faebe342f9",
    "historical": false,
    "points": [
      "Altera o art. 3º da Resolução 242/2007.",
      "Tela dianteira: mecanismo automático de inativação/comutação quando o veículo se move, ou tecnologia que impeça a visão das imagens pelo condutor.",
      "A vedação de visão deve funcionar em qualquer posição de ajuste do banco."
    ],
    "warning": "A promessa do motorista de não olhar não substitui o requisito técnico.",
    "example": {
      "scenario": "Uma tela permite entretenimento ao passageiro, mas sua imagem também fica visível ao motorista ao ajustar o banco.",
      "question": "Basta o motorista dizer que não assistirá?",
      "answer": "Não. A alternativa técnica exige impedir a visualização pela perspectiva do condutor em qualquer ajuste.",
      "variation": "O equipamento comuta automaticamente para informação de auxílio à orientação ao entrar em movimento.",
      "variationAnswer": "É uma das alternativas descritas; verificar os requisitos do equipamento e da instalação."
    },
    "textPath": "/contran/1030-2026.json"
  },
  {
    "number": 1029,
    "year": 2026,
    "title": "CNH: prorrogação excepcional com prazo encerrado",
    "subject": "Aprova a Deliberação Contran nº 278, de 2026, que prorroga excepcionalmente a validade da Autorização para Conduzir Ciclomotor e da Carteira Nacional de Habilitação - CNH com vencimento no período que especifica.",
    "issueDate": "2026-08-17",
    "publicationDate": "2026-08-18",
    "lastRelatedActDate": "2026-08-18",
    "checkedAt": "2026-10-12",
    "officialSituation": "Aprova a Deliberação 278/2026",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10292026.pdf",
    "relatedSources": [],
    "sourceSha256": "bd55657e2beeb92e7a1e47e27213df7fb06fa5d0471bb5d479da47f2ba662b11",
    "historical": true,
    "points": [
      "Abrangeu documentos com vencimento de 05/06 a 08/09/2026.",
      "Validade prorrogada até 09/09/2026, seguida de 30 dias para renovar.",
      "Não abrangia direito de dirigir suspenso ou cassado."
    ],
    "warning": "O período dessa prorrogação não deve ser ensinado como autorização atual em 12/10/2026.",
    "example": {
      "scenario": "Em outubro, alguém cita a resolução como autorização indefinida para dirigir com documento vencido.",
      "question": "A prorrogação era indefinida?",
      "answer": "Não. A norma delimitou documentos e datas; o prazo específico já terminou.",
      "variation": "Na janela original, o condutor estava com o direito de dirigir suspenso.",
      "variationAnswer": "Mesmo naquele período, a exceção expressa impedia usar a prorrogação para afastar a suspensão."
    }
  },
  {
    "number": 1028,
    "year": 2026,
    "title": "Free flow: tarifa, multa e transição",
    "subject": "Aprova a Deliberação nº 277, de 2026, que estabelece regime de transição para a consolidação dos sistemas de livre passagem (free flow) nos termos da Resolução Contran nº 1.013, de 14 de outubro de 2024.",
    "issueDate": "2026-08-17",
    "publicationDate": "2026-08-25",
    "lastRelatedActDate": "2026-08-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10282026.pdf",
    "relatedSources": [
      {
        "label": "Deliberação 277/2026",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/deliberacoes/Deliberacao2772026.pdf"
      }
    ],
    "sourceSha256": "cd3ca7475c7a2bfbbe7307e3838fadddf3068df48335a7dc93c16d72b252f10f",
    "historical": false,
    "points": [
      "Ratifica a transição da Deliberação 277/2026: 200 dias desde sua publicação em 29/04/2026.",
      "Durante a janela, o regime protege contra a tipificação de não pagar a tarifa, nos limites descritos; não extingue a tarifa.",
      "Art. 7º da 1013: 30 dias desde a confirmação do processamento do registro de passagem, com comparação do prazo mais favorável."
    ],
    "warning": "A aprovação em agosto não reinicia os 200 dias. A data de publicação, a passagem e a confirmação do processamento são marcos diferentes.",
    "example": {
      "scenario": "O usuário passa pelo pórtico e confunde suspensão transitória de consequências com pedágio gratuito.",
      "question": "A transição extinguiu a tarifa?",
      "answer": "Não. Há prazo de regularização e consequências próprias; a obrigação de pagar não foi eliminada.",
      "variation": "O pagamento é comprovado na janela e já existe penalidade relacionada à tarifa.",
      "variationAnswer": "Examine o cancelamento/revisão previsto, inclusive a hipótese de multa paga, sem prometer restituição fora das condições legais."
    },
    "textPath": "/contran/1028-2026.json"
  },
  {
    "number": 1027,
    "year": 2026,
    "title": "Registro, licenciamento e transferência",
    "subject": "Normatiza os procedimentos de registro, licenciamento e transferência de propriedade de veículos.",
    "issueDate": "2026-08-17",
    "publicationDate": "2026-08-18",
    "lastRelatedActDate": "2026-08-18",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 809/20; 817/21 e 999/23",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10272026.pdf",
    "relatedSources": [],
    "sourceSha256": "ff396591cb2c185ba6e918241799cf84e2b78269094a7a5228222282b27efc75",
    "historical": false,
    "points": [
      "Padroniza procedimentos e documentos de regularidade do veículo.",
      "Há disciplina de assinaturas eletrônicas avançadas/qualificadas e prevenção de fraudes.",
      "Substitui as Resoluções 809/2020, 817/2021 e 999/2023."
    ],
    "warning": "Não estudar só o procedimento da 809/2020 como regime atual. Implantação sistêmica e validade jurídica de cada etapa não são a mesma coisa.",
    "example": {
      "scenario": "O comprador recebe o veículo e acha que a entrega das chaves já altera o registro.",
      "question": "A entrega material conclui automaticamente todos os atos de transferência?",
      "answer": "Não. A operação precisa observar os procedimentos registrais e documentais da resolução.",
      "variation": "A operação usa assinatura eletrônica e envolve integração com Renave.",
      "variationAnswer": "Conferir modalidade, validação e etapa de implantação; não dispensar controles de titularidade e fraude por ser digital."
    },
    "textPath": "/contran/1027-2026.json"
  },
  {
    "number": 1026,
    "year": 2026,
    "title": "Renave: estoque não é transferência de propriedade",
    "subject": "Institui o Registro Nacional de Veículos em Estoque - Renave e altera a Resolução Contran nº 807, de 2020.",
    "issueDate": "2026-06-26",
    "publicationDate": "2026-06-30",
    "lastRelatedActDate": "2026-09-30",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Revoga as Resoluções 797/20 e 818/21 Altera a Resolução 807/2020",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10262026n.pdf",
    "relatedSources": [
      {
        "label": "Retificação da 1026",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10262026R.pdf"
      },
      {
        "label": "Circular 2/2026: implementação",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/circular022026.pdf"
      }
    ],
    "sourceSha256": "ecf1e0b3a0ac10fda53170ff8db2acfc25aca4e613d2fbfe9af2089865f274ea",
    "historical": false,
    "points": [
      "Registra entrada/saída de veículos novos/usados nos estabelecimentos abrangidos.",
      "Escrituração eletrônica de estoque não substitui, sozinha, a transferência de propriedade.",
      "Circular 2, de 30/09/2026, estabelece etapas assistidas e integrações entre outubro e novembro."
    ],
    "warning": "Em 12/10/2026, não presumir concluídas as integrações previstas para novembro. O índice registra 30/06 e o PDF aponta 01/07; as duas referências e a retificação foram mantidas na evidência.",
    "example": {
      "scenario": "Uma loja escritura a entrada de um automóvel e afirma que isso basta para a transferência definitiva.",
      "question": "A escrituração de estoque tem esse efeito isolado?",
      "answer": "Não. O próprio art. 1º separa o escopo do Renave dos procedimentos de transferência e outras operações.",
      "variation": "O exemplo acontece em 12/10 e usa a integração de transferência prevista para 16 a 20/11.",
      "variationAnswer": "Não antecipar a etapa futura do cronograma nem tratar vigência normativa como comprovação de disponibilidade técnica."
    },
    "textPath": "/contran/1026-2026.json"
  },
  {
    "number": 1025,
    "year": 2026,
    "title": "Remoção: custódia, liberação e leilão",
    "subject": "Dispõe sobre a remoção, a guarda, a liberação e oleilão de veículos recolhidos.",
    "issueDate": "2026-06-26",
    "publicationDate": "2026-06-30",
    "lastRelatedActDate": "2026-06-30",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em Vigor Revoga a Resolução 623/16",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10252026c.pdf",
    "relatedSources": [],
    "sourceSha256": "fa6ffc0346400e0ac5760bc663e0d6efc5e466dfc5819701f772db1754c09f9c",
    "historical": false,
    "points": [
      "Organiza etapas: recolhimento, registro, comunicação, possível liberação, leilão e destinação.",
      "Institui o Sivec e controles sobre informações da custódia.",
      "Substitui a Resolução 623/2016."
    ],
    "warning": "Recolhimento não transfere automaticamente a propriedade nem autoriza pular comunicação e condições de liberação.",
    "example": {
      "scenario": "O veículo chega ao pátio e o responsável propõe leiloá-lo imediatamente.",
      "question": "A remoção basta para o leilão imediato?",
      "answer": "Não. Há etapas, prazos e condições oficiais antes do leilão.",
      "variation": "O proprietário ou representante legal busca a liberação e cumpre as exigências.",
      "variationAnswer": "Analisar a etapa de liberação segundo a norma; não confundir custódia com perda definitiva."
    },
    "textPath": "/contran/1025-2026.json"
  },
  {
    "number": 1024,
    "year": 2026,
    "title": "Lanternas especiais e utilidade pública",
    "subject": "Altera a Resolução Contran nº 970, de 2022, quedispõe sobre as características e especificaçõestécnicas dos sistemas de sinalização, de iluminação eseus dispositivos, bem como sobre o uso delanternas especiais em veículos, para considerar osveículos utilizados na operação e manutenção daRede Hidrometeorológica Nacional como veículosprestadores de serviços de utilidade pública.",
    "issueDate": "2026-06-26",
    "publicationDate": "2026-07-01",
    "lastRelatedActDate": "2026-07-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Altera a Resolução 970/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10242026c.pdf",
    "relatedSources": [],
    "sourceSha256": "b79ac6eb4b82407b4cf7b881c3736e81b0e2480ef975eca7fbb4b9b7010337b7",
    "historical": false,
    "points": [
      "Inclui operação/manutenção da Rede Hidrometeorológica Nacional no art. 6º da 970/2022.",
      "Classificação de utilidade pública não equivale, por si, a veículo de emergência.",
      "Continuam necessários os requisitos da norma-base e do CTB."
    ],
    "warning": "Não converter uma inclusão no rol em licença para prioridade irrestrita ou qualquer iluminação.",
    "example": {
      "scenario": "Um veículo de manutenção hidrometeorológica é tratado como ambulância em emergência só por pertencer ao novo rol.",
      "question": "Essa equiparação é automática?",
      "answer": "Não. Utilidade pública e emergência possuem regimes próprios.",
      "variation": "O mesmo veículo instala uma lanterna fora dos requisitos técnicos.",
      "variationAnswer": "A inclusão no rol não dispensa as especificações da 970 e as condições do CTB."
    },
    "textPath": "/contran/1024-2026.json"
  },
  {
    "number": 1023,
    "year": 2026,
    "title": "Fora de estrada: passeio não autoriza via pública",
    "subject": "Estabelece os requisitos de identificação, desegurança e de circulação em vias públicas dosveículos automotores de uso exclusivo fora deestrada, com emprego recreativo, esportivo outurístico, de fabricação nacional ou importados e dáoutras providências.",
    "issueDate": "2026-06-26",
    "publicationDate": "2026-07-03",
    "lastRelatedActDate": "2026-07-03",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Altera o Anexo da Resolução 985/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10232026c.pdf",
    "relatedSources": [],
    "sourceSha256": "24f8d7ad7cd934041db4b1f1d7a2c9c97880f1a525378cf150285831c6c3f89d",
    "historical": false,
    "points": [
      "Regula veículos off-road recreativos/esportivos/turísticos, incluindo ATV e UTV.",
      "Regra: circulação proibida em vias públicas, inclusive praias abertas à circulação.",
      "Exceção depende do órgão com circunscrição sobre a via e das condições específicas."
    ],
    "warning": "Não confundir um veículo off-road com quadriciclo homologado para uso viário.",
    "example": {
      "scenario": "Um turista leva ATV para uma praia aberta ao trânsito e alega que a finalidade recreativa libera a circulação.",
      "question": "A finalidade recreativa basta?",
      "answer": "Não. A proibição alcança essas vias; a exceção não decorre só da vontade do usuário.",
      "variation": "Existe autorização do órgão competente para situação delimitada.",
      "variationAnswer": "Verificar seus limites e as demais exigências; não extrapolar para qualquer via ou atividade."
    },
    "textPath": "/contran/1023-2026.json"
  },
  {
    "number": 1022,
    "year": 2026,
    "title": "Quadriciclos: classificação e requisitos cumulativos",
    "subject": "Estabelece os requisitos de segurança e de circulação para os veículos automotores denominadosquadriciclos, de fabricação nacional ou importados e dá outras providências.",
    "issueDate": "2026-06-26",
    "publicationDate": "2026-07-01",
    "lastRelatedActDate": "2026-07-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Altera o Anexo da Resolução 985/22 Revoga a Resolução 573/15",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10222026c.pdf",
    "relatedSources": [],
    "sourceSha256": "2547703494199728cee582c9f5717d83599c8ed610494f5c3942cea23779a7d2",
    "historical": false,
    "points": [
      "Distingue categorias leves/pesadas e subcategorias.",
      "Para L6, há velocidade de projeto até 45 km/h e outros critérios cumulativos.",
      "Número de rodas, massa, configuração e potência precisam ser examinados juntos."
    ],
    "warning": "Quatro rodas, isoladamente, não comprovam a classe nem autorizam circulação. A norma substitui a 573/2015.",
    "example": {
      "scenario": "O anúncio chama de quadriciclo leve um veículo só por ter quatro rodas.",
      "question": "Essa informação encerra a classificação?",
      "answer": "Não. Conferir os demais critérios da categoria e subcategoria.",
      "variation": "O veículo tem cabine e função exclusiva de transporte de mercadorias.",
      "variationAnswer": "Examinar a subcategoria e os requisitos da plataforma; não copiar automaticamente critérios de passageiro ou veículo montado."
    },
    "textPath": "/contran/1022-2026.json"
  },
  {
    "number": 1021,
    "year": 2026,
    "title": "Motor elétrico auxiliar: modificação exige controle",
    "subject": "Aprova a Deliberação Contran nº 276, de 2026, que estabelece os requisitos para a instalação de motor elétrico auxiliar em veículos dos tipos caminhão e caminhão-trator, bem como altera o Anexo IV da Resolução",
    "issueDate": "2026-05-28",
    "publicationDate": "2026-05-29",
    "lastRelatedActDate": "2026-06-09",
    "checkedAt": "2026-10-12",
    "officialSituation": "Retificação Altera o Anexo IV da Resolução 916/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10212026.pdf",
    "relatedSources": [
      {
        "label": "Retificação da 1021",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resoluo10212026R.pdf"
      }
    ],
    "sourceSha256": "066b2d37c42826a88da8605c347ceb1647a8f182110dc759d43e02b1af5fe9de",
    "historical": false,
    "points": [
      "Abrange caminhão/caminhão-trator com motor elétrico auxiliar.",
      "A instalação é modificação sujeita a homologação compulsória.",
      "A retificação de 09/06/2026 completa a referência ao Anexo IV da 916/2022."
    ],
    "warning": "Uma tecnologia ambientalmente vantajosa não dispensa homologação e segurança.",
    "example": {
      "scenario": "Uma empresa instala motor auxiliar e alega que não precisa de controle porque o caminhão já era registrado.",
      "question": "O registro anterior dispensa o regime da modificação?",
      "answer": "Não. A resolução trata especificamente da alteração do veículo.",
      "variation": "A prova traz a ementa incompleta do PDF original.",
      "variationAnswer": "Usar a retificação: o anexo mencionado pertence à Resolução 916/2022."
    },
    "textPath": "/contran/1021-2026.json"
  },
  {
    "number": 1020,
    "year": 2025,
    "title": "Formação: regra nova sem dispensar os exames",
    "subject": "Normatiza os procedimentos sobre a aprendizagem, a habilitação e a expedição de documentos de condutores e o processo de formação do candidato à obtenção da habilitação.",
    "issueDate": "2025-12-01",
    "publicationDate": "2025-12-09",
    "lastRelatedActDate": "2025-12-09",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em Vigor Revoga o art. 2º da Resolução 1009/24 Revoga as Resoluções 265/07; 321/09; 558/15; 789/20; 849/21; 889/21; 928/22; 929/22; 930/22; 933/22; 983/22 1001/23 e 1008/24",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10202025.pdf",
    "relatedSources": [],
    "sourceSha256": "b2bf0e60ba7e04b15adbc0199ad44cda4c089fec37bfbcf24f8874e61d7c65c0",
    "historical": false,
    "points": [
      "Substitui a 789/2020 e outras normas de formação.",
      "Admite formas de formação e instrutores definidos na norma; não se limita a copiar o modelo antigo de autoescola.",
      "Licença de aprendizagem digital não é CNH definitiva; há etapas e supervisão."
    ],
    "warning": "Flexibilização não significa dirigir sozinho sem habilitação ou dispensar avaliações. Não ensinar cargas horárias antigas como regra universal.",
    "example": {
      "scenario": "O candidato obtém a licença de aprendizagem e decide dirigir desacompanhado como habilitado.",
      "question": "A licença tem esse alcance?",
      "answer": "Não. A aprendizagem depende das condições e supervisão próprias.",
      "variation": "A formação usa instrutor autônomo conforme a norma.",
      "variationAnswer": "Verificar autorização e requisitos do instrutor, sem presumir dispensa de todos os demais atos do processo."
    },
    "textPath": "/contran/1020-2025.json"
  },
  {
    "number": 1019,
    "year": 2025,
    "title": "Câmaras Temáticas: apoio técnico e competência",
    "subject": "Dispõe sobre a criação e o Regimento Interno das Câmaras Temáticas vinculadas ao Conselho Nacional de Trânsito (Contran)",
    "issueDate": "2025-04-10",
    "publicationDate": "2025-04-11",
    "lastRelatedActDate": "2025-04-11",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga a Resolução 883/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10192025.pdf",
    "relatedSources": [],
    "sourceSha256": "1ba39e773e92eb205e0b0b2ef73d0d09830d006a77f2feade0b5e4560c2e4c3c",
    "historical": false,
    "points": [
      "Disciplina criação e regimento das Câmaras Temáticas do Contran.",
      "Organiza áreas especializadas como saúde, educação e engenharia/sinalização.",
      "Participação técnica não confunde automaticamente os órgãos e suas competências."
    ],
    "warning": "Não atribuir a um grupo de estudo o mesmo poder normativo final do Contran.",
    "example": {
      "scenario": "Uma câmara debate uma proposta e um aluno trata o debate como resolução já vigente.",
      "question": "Discussão técnica equivale à publicação do ato normativo?",
      "answer": "Não. Há diferença entre apoio técnico, proposta e ato aprovado/publicado.",
      "variation": "A questão envolve saúde do condutor, e não projeto de sinalização.",
      "variationAnswer": "Identificar a câmara temática pertinente, sem confundir a especialização das áreas."
    },
    "textPath": "/contran/1019-2025.json"
  },
  {
    "number": 1018,
    "year": 2025,
    "title": "Alienação fiduciária: execução e trânsito têm papéis próprios",
    "subject": "Dispõe sobre os procedimentos de execução extrajudicial de veículos automotores com contratos de alienação fiduciária.",
    "issueDate": "2025-01-20",
    "publicationDate": "2025-01-23",
    "lastRelatedActDate": "2025-01-23",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10182025.pdf",
    "relatedSources": [],
    "sourceSha256": "bb12c6512203b0bffdd4bd083e98bfcec135a8cdae23bbf85572aff8b674824b",
    "historical": false,
    "points": [
      "Trata de execução extrajudicial perante os órgãos executivos de trânsito.",
      "A faculdade do credor está condicionada ao regime legal e às formalidades.",
      "Empresas registradoras especializadas têm atuação credenciada no processamento."
    ],
    "warning": "Não equiparar inadimplência a remoção por infração de trânsito ou autorização de tomada informal do veículo.",
    "example": {
      "scenario": "O credor identifica atraso e quer usar o rito como se bastasse uma comunicação informal.",
      "question": "A resolução dispensa os procedimentos legais?",
      "answer": "Não. A execução extrajudicial exige o rito e as condições pertinentes.",
      "variation": "O veículo é removido numa fiscalização administrativa.",
      "variationAnswer": "Isso pertence a outra hipótese; não substituir o regime de remoção pelo de garantia fiduciária."
    },
    "textPath": "/contran/1018-2025.json"
  },
  {
    "number": 1017,
    "year": 2024,
    "title": "Tratores: finalidade, cadastro e circulação",
    "subject": "Estabelece os critérios para o registro e a circulação em vias públicas de tratores e demais aparelhos automotores destinados a puxar ou arrastar maquinaria de qualquer natureza ou a executar trabalhos agrícolas, de construção e de pavimentação, bem como de seus reboques e implementos.",
    "issueDate": "2024-12-11",
    "publicationDate": "2024-12-13",
    "lastRelatedActDate": "2024-12-13",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 1º de janeiro de 2025 Revoga as Resoluções 587/16; 978/22 e 995/23",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10172024.pdf",
    "relatedSources": [],
    "sourceSha256": "e5b45f660c1ef3f396d9ef91dbed06ffe735dcf0a45934844973e1b7d53d2ab5",
    "historical": false,
    "points": [
      "Diferencia máquinas agrícolas das destinadas à construção/pavimentação.",
      "Renagro e Renavam não são nomes intercambiáveis.",
      "Registro, licenciamento, emplacamento e autorização de circulação possuem hipóteses próprias."
    ],
    "warning": "Dispensa de um ato não representa liberdade para transitar em qualquer via ou com qualquer dimensão.",
    "example": {
      "scenario": "O proprietário de uma máquina agrícola presume que seu cadastro resolve toda circulação em via pública.",
      "question": "O cadastro basta, isoladamente?",
      "answer": "Não. É preciso conferir a classificação, os documentos e as condições aplicáveis à circulação.",
      "variation": "A máquina é destinada a construção, não a trabalho agrícola.",
      "variationAnswer": "Reexaminar a hipótese de registro e as dispensas; não transportar automaticamente o regime agrícola."
    },
    "textPath": "/contran/1017-2024.json"
  },
  {
    "number": 1016,
    "year": 2024,
    "title": "Financiamento: registro e responsabilidade por informação",
    "subject": "Altera a Resolução Contran nº 807, de 15 de dezembro de 2020, que dispõe sobre os procedimentos para o registro de contratos de financiamento com garantia real de veículo nos órgãos ou entidades executivos de trânsito dos Estados e do Distrito Federal, para anotação no Certificado de Registro de Veículos (CRV) e no Certificado de Licenciamento Anual (CLA).",
    "issueDate": "2024-12-11",
    "publicationDate": "2024-12-12",
    "lastRelatedActDate": "2024-12-12",
    "checkedAt": "2026-10-12",
    "officialSituation": "Altera a Resolução 807/20",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10162024.pdf",
    "relatedSources": [],
    "sourceSha256": "5a4f814731bc8a5ef82fd070094550d3bb9e7cedfa0d996462b63ffd664005a2",
    "historical": false,
    "points": [
      "Altera procedimentos de contratos de financiamento com garantia real da 807/2020.",
      "Anotação de gravame, registro do contrato e titularidade são atos distintos.",
      "Dados e atuação das entidades devem observar os controles e responsabilidades previstos."
    ],
    "warning": "Ler também a alteração posterior da 1026/2026; o fragmento de 2024 não esgota o regime atual.",
    "example": {
      "scenario": "Um candidato confunde a anotação do financiamento com aquisição automática da propriedade.",
      "question": "São o mesmo ato?",
      "answer": "Não. A garantia financeira e os atos de propriedade têm objetos e procedimentos próprios.",
      "variation": "Uma entidade processa dados incorretos.",
      "variationAnswer": "Examinar responsabilidades e correção; a digitalização não elimina controles nem proteção de dados."
    },
    "textPath": "/contran/1016-2024.json"
  },
  {
    "number": 1015,
    "year": 2024,
    "title": "Peso: exceção tecnológica não é regra para toda frota",
    "subject": "Altera a Resolução Contran nº 882, de 13 de dezembro de 2021, que estabelece os limites de pesos e dimensões para veículos que transitem por vias terrestres, e dá outras providências, para dispor sobre o limite de peso bruto por eixo isolado dianteiro de veículos movidos à Gás Natural Veicular, Gás Natural Liquefeito, biometano, hidrogênio e célula de combustível, e veículos de propulsão elétrica ou híbrida.",
    "issueDate": "2024-12-11",
    "publicationDate": "2024-12-12",
    "lastRelatedActDate": "2024-12-12",
    "checkedAt": "2026-10-12",
    "officialSituation": "Altera a Resolução 882/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10152024.pdf",
    "relatedSources": [],
    "sourceSha256": "bd7b0f6ce3d20cf067a3ceacbdafe8a66e4d6032b9348bcb728722cf9eec788a",
    "historical": false,
    "points": [
      "Altera a 882/2021 para propulsões listadas: gás, biometano, híbrida/elétrica, hidrogênio/célula de combustível.",
      "Prevê 7 toneladas no eixo dianteiro isolado de dois pneumáticos da hipótese.",
      "Permite acréscimo de 1 t no PBT/PBTC da hipótese, observadas as condições."
    ],
    "warning": "Não aplicar o acréscimo a qualquer caminhão nem confundir limite por eixo com peso total.",
    "example": {
      "scenario": "Um caminhão convencional pede o acréscimo só por ter dois pneus no eixo.",
      "question": "Esse único dado preenche a exceção?",
      "answer": "Não. A propulsão e os demais requisitos descritos precisam estar presentes.",
      "variation": "O caminhão tem propulsão elétrica e se enquadra na hipótese.",
      "variationAnswer": "Conferir separadamente eixo e PBT/PBTC; atender um limite não prova atendimento de todos."
    },
    "textPath": "/contran/1015-2024.json"
  },
  {
    "number": 1014,
    "year": 2024,
    "title": "Campanhas: calendário de 2025 não é calendário de 2026",
    "subject": "Aprova a Deliberação CONTRAN nº 275, de 13 de setembro de 2024, que estabelece a mensagem, os temas e o cronograma das campanhas educativas de trânsito a serem realizadas de janeiro a dezembro de 2025.",
    "issueDate": "2024-10-14",
    "publicationDate": "2024-10-16",
    "lastRelatedActDate": "2024-10-16",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga a Resolução 1000/23 partir de 1º de janeiro de 2025 Altera a Resolução 351/10 Ofício-Circular nº 16/2026",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10142024R.pdf",
    "relatedSources": [],
    "sourceSha256": "538aaafa99ea31b2dbb354a3d148adb19d8660f92df20ef14c4f47a83307607f",
    "historical": true,
    "points": [
      "Organiza mensagem e calendário das campanhas de janeiro a dezembro de 2025.",
      "A mensagem daquele recorte é Desacelere. Seu bem maior é a vida.",
      "Datas anuais e diretrizes permanentes não devem ser confundidas."
    ],
    "warning": "Este guia é histórico do calendário de 2025; não certifica a edição anual de 2026.",
    "example": {
      "scenario": "Um aluno usa o anexo de 2025 como calendário anual atual sem conferir o ano.",
      "question": "A consulta está atualizada para qualquer ano?",
      "answer": "Não. O recorte anual precisa ser respeitado.",
      "variation": "A questão pede especificamente a campanha de 2025.",
      "variationAnswer": "Usar a fonte histórica e sua mensagem, explicitando o ano em vez de anunciá-la como calendário atual."
    }
  },
  {
    "number": 1013,
    "year": 2024,
    "title": "Free flow: passagem e pagamento sem praça física",
    "subject": "Dispõe sobre os sistemas de livre passagem (free flow) em vias urbanas e rurais.",
    "issueDate": "2024-10-14",
    "publicationDate": "2024-10-16",
    "lastRelatedActDate": "2024-10-16",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga a Resolução 984/22 Altera as Resoluções 973/22 e 985/22 Alterada pela Deliberação 277/26",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10132024.pdf",
    "relatedSources": [
      {
        "label": "Deliberação 277/2026",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/deliberacoes/Deliberacao2772026.pdf"
      }
    ],
    "sourceSha256": "520d69ed12c645de1793e84651906059544d08a264181de8380ff0bacd246ca8",
    "historical": false,
    "points": [
      "Abrange vias urbanas/rurais e diferentes esferas administrativas.",
      "Distingue pagamento automático e avulso, canais válidos e competências.",
      "A 1028/2026 atualiza prazo e marco do pagamento, além da transição."
    ],
    "warning": "Não memorizar o prazo do PDF de 2024 sem a alteração de 2026. Tarifa e multa são pagamentos distintos.",
    "example": {
      "scenario": "O veículo passa pelo pórtico sem parar, e o usuário conclui que não existe cobrança.",
      "question": "Ausência de cancela dispensa pagar?",
      "answer": "Não. O sistema permite circulação livre e cobrança pelos canais e prazos previstos.",
      "variation": "O registro da passagem é confirmado em data posterior.",
      "variationAnswer": "Conferir o marco atualizado e a transição mais favorável, não contar mecanicamente só da viagem."
    },
    "textPath": "/contran/1013-2024.json"
  },
  {
    "number": 1012,
    "year": 2024,
    "title": "Vaga reservada: credencial digital e vínculo do veículo",
    "subject": "Altera a Resolução Contran nº 965, de 17 de maio de 2022, que define e regulamenta as áreas de segurança e de estacionamentos específicos de veículos, a Resolução Contran nº 985, de 15 de dezembro de 2022, que aprova o Manual Brasileiro de Fiscalização de Trânsito (MBFT) e os Anexos I e IV da Resolução Contran nº 973, de 18 de julho de 2022, que institui o Regulamento de Sinalização Viária.",
    "issueDate": "2024-10-14",
    "publicationDate": "2024-10-16",
    "lastRelatedActDate": "2024-10-16",
    "checkedAt": "2026-10-12",
    "officialSituation": "Altera as Resoluções 965/22; 973/22 e 985/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10122024.pdf",
    "relatedSources": [],
    "sourceSha256": "d6ff6c688bdc5126ca8644f3dfe80181c36f8b310ae53808c1102abc1e71715b",
    "historical": false,
    "points": [
      "Credencial pode ser física ou digital e vale nacionalmente.",
      "A versão digital pode vincular um veículo; esse vínculo pode ser substituído conforme o uso.",
      "Sem vinculação, a versão impressa é usada conforme as condições descritas."
    ],
    "warning": "A tecnologia não dispensa a qualidade de beneficiário nem autoriza terceiro a usar a vaga sem o titular.",
    "example": {
      "scenario": "O beneficiário tem credencial digital vinculada ao veículo e não deixa impressão no painel.",
      "question": "A falta de papel é sempre irregular?",
      "answer": "Não. A versão vinculada tem disciplina própria de fiscalização.",
      "variation": "A credencial não foi vinculada e a pessoa também não usa a versão impressa exigida.",
      "variationAnswer": "Verificar os requisitos dessa modalidade; não transferir a dispensa da versão vinculada para qualquer caso."
    },
    "textPath": "/contran/1012-2024.json"
  },
  {
    "number": 1011,
    "year": 2024,
    "title": "Calamidade no RS: prazos excepcionais de 2024",
    "subject": "Dispõe sobre os prazos de processos e de procedimentos afetos aos órgãos e entidades do Sistema Nacional de Trânsito (SNT) e às entidades públicas e privadas prestadoras de serviços relacionados ao trânsito, em razão do estado de calamidade oriundo dos eventos climáticos em curso no estado do Rio Grande do Sul – Decreto Estadual nº 57.596/2024.",
    "issueDate": "2024-07-30",
    "publicationDate": "2024-08-19",
    "lastRelatedActDate": "2024-08-19",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga a Deliberação 274/24",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10112024R2.pdf",
    "relatedSources": [],
    "sourceSha256": "d708cbdc808bc7aebd7587d6473feb15b15f6996c7576c2f858e0b53d8cae9c7",
    "historical": true,
    "points": [
      "Delimita pessoas, veículos e autuações relacionados ao Rio Grande do Sul.",
      "Contém janelas e cronograma de retomada, não suspensão geral permanente.",
      "Alcance nacional da fiscalização não amplia o grupo beneficiado."
    ],
    "warning": "Não usar a exceção de calamidade de 2024 como prorrogação atual indiscriminada.",
    "example": {
      "scenario": "Em 2026, um condutor de outro Estado invoca a norma para ignorar um prazo novo.",
      "question": "A regra excepcional é universal e permanente?",
      "answer": "Não. Ela delimita vínculos com o RS, procedimentos e datas.",
      "variation": "A questão trata de fiscalização de veículo efetivamente beneficiado na época.",
      "variationAnswer": "Aplicar o recorte histórico pertinente e o cronograma, sem reinventar uma janela em 2026."
    }
  },
  {
    "number": 1010,
    "year": 2024,
    "title": "Competência: delegação ao órgão executivo nacional",
    "subject": "Aprova a Deliberação CONTRAN Nº 273, de 9 de abril de 2024,que delega competência de que trata o § 3º do art. 103 do Código de Trânsito Brasileiro (CTB) ao órgão máximo executivo de trânsito da União.",
    "issueDate": "2024-07-30",
    "publicationDate": "2024-08-16",
    "lastRelatedActDate": "2024-08-16",
    "checkedAt": "2026-10-12",
    "officialSituation": "Aprova a Deliberação 273/24",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10102024.pdf",
    "relatedSources": [],
    "sourceSha256": "12eb4684a6886b63584ccb3609ff890b3bc8a07a67646afb59d1786f67683fb6",
    "historical": false,
    "points": [
      "Aprova a Deliberação 273/2024.",
      "Delega a competência do CTB 103, §3º, ao órgão máximo executivo da União.",
      "Delegação é específica; não transfere todo poder do Contran."
    ],
    "warning": "Órgão executivo nacional, Contran e órgão estadual não são autoridades intercambiáveis.",
    "example": {
      "scenario": "O enunciado atribui a um órgão municipal a competência delegada por esse ato.",
      "question": "O destinatário está correto?",
      "answer": "Não. O texto indica o órgão máximo executivo de trânsito da União.",
      "variation": "O candidato afirma que todas as competências do Contran foram delegadas.",
      "variationAnswer": "Não. O ato delimita a competência por remissão ao CTB 103, §3º."
    },
    "textPath": "/contran/1010-2024.json"
  },
  {
    "number": 1009,
    "year": 2024,
    "title": "Toxicológico: prazo do laudo, validade e periodicidade",
    "subject": "Altera as Resoluções CONTRAN nº 789, de 18 de junho de2020, e nº 923, de 28 de março de 2022 e nº 985, de 15 de dezembro de 2022.",
    "issueDate": "2024-04-24",
    "publicationDate": "2024-04-25",
    "lastRelatedActDate": "2025-12-09",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Art. 2º revogado pela Resolução 1020/25 Altera as Resoluções 789/20; 923/22 e 985/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10092024.pdf",
    "relatedSources": [
      {
        "label": "Resolução 1020",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10202025.pdf"
      }
    ],
    "sourceSha256": "2c19112a82bf6357dc8710dd5c00401b721a70022e7dd8386a264814e261a9a1",
    "historical": false,
    "points": [
      "Altera regras de exames toxicológicos e fichas de fiscalização.",
      "Entrega/inserção do resultado em até 30 dias não é a validade de 90 dias desde a coleta.",
      "O art. 2º, ligado à 789/2020, foi revogado pela 1020/2025."
    ],
    "warning": "Não usar o bloco revogado de formação nem confundir periodicidade de 2 anos e 6 meses com validade do resultado.",
    "example": {
      "scenario": "O condutor acha que receber o laudo depois de 20 dias reinicia a validade do exame.",
      "question": "O recebimento muda o marco de validade?",
      "answer": "Não. A regra de validade usa a coleta, diferente do prazo de entrega.",
      "variation": "Uma questão reaproveita o art. 2º da alteração como regra atual de formação.",
      "variationAnswer": "Confrontar a revogação expressa e o regime da 1020; o ato é parcialmente atingido, não integralmente removido."
    },
    "textPath": "/contran/1009-2024.json"
  },
  {
    "number": 1007,
    "year": 2024,
    "title": "Basculante: vigência e exigibilidade em 2027",
    "subject": "Altera a Resolução CONTRAN nº 859, de 19 de julho de 2021,que dispõe sobre o sistema de segurança para a circulação de caminhões com carroceria do tipo basculante e de caminhões-tratores destinados à movimentação e operação de veículos rebocados com carroceria tipo basculante.",
    "issueDate": "2024-04-24",
    "publicationDate": "2024-04-25",
    "lastRelatedActDate": "2024-04-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 02 de maio de 2024 Altera a Resolução 859/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10072024.pdf",
    "relatedSources": [],
    "sourceSha256": "57f980f5f150c46574db974e252b79d37fa1e5b31703e7fdce19f96c2da78d95",
    "historical": false,
    "points": [
      "Altera a 859/2021.",
      "CSV no licenciamento de 2027 conforme cronograma local.",
      "A exigência indicada do art. 7º, §2º, começa em 01/01/2027."
    ],
    "warning": "Não antecipar em outubro de 2026 o requisito do art. 7º, §2º, exigível em 01/01/2027, nem o CSV do licenciamento de 2027.",
    "example": {
      "scenario": "Uma questão exige em 2026 o CSV pelo marco específico do licenciamento de 2027.",
      "question": "A exigência temporal foi corretamente aplicada?",
      "answer": "Não. Separar vigência da resolução e exigibilidade do requisito.",
      "variation": "O fato acontece no licenciamento de 2027.",
      "variationAnswer": "Examinar o calendário do Estado/DF e as demais condições, em vez de dispensar o requisito indefinidamente."
    },
    "textPath": "/contran/1007-2024.json"
  },
  {
    "number": 1006,
    "year": 2024,
    "title": "Foto da CNH: exceções não dispensam identificação",
    "subject": "Altera a Resolução CONTRAN nº 886, de 13 de dezembro de 2021, que regulamenta as especificações, a produção e a expedição da Carteira Nacional de Habilitação (CNH).",
    "issueDate": "2024-04-03",
    "publicationDate": "2024-04-08",
    "lastRelatedActDate": "2024-04-08",
    "checkedAt": "2026-10-12",
    "officialSituation": "Altera a Resolução 886/21 Revoga o art. 4º da Resolução 998/23",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10062024.pdf",
    "relatedSources": [],
    "sourceSha256": "cf1f0062b96826ddd5d8dc01896c48f707acaa66ed1f12ad60f5750b591e61ca",
    "historical": false,
    "points": [
      "Altera o Anexo III da 886/2021.",
      "Admite exceções por crença/religião ou queda de cabelo por patologia/tratamento.",
      "Face, testa e queixo devem ficar perfeitamente visíveis; revoga o art. 4º da 998."
    ],
    "warning": "Não impor proibição absoluta de vestuário religioso nem aceitar ocultação dos elementos necessários.",
    "example": {
      "scenario": "Uma candidata usa véu religioso, com face, testa e queixo visíveis.",
      "question": "A exceção pode ser examinada?",
      "answer": "Sim. A regra contempla essa hipótese sem dispensar visibilidade dos elementos indicados.",
      "variation": "O acessório cobre face e queixo.",
      "variationAnswer": "A condição da exceção não foi atendida; a justificativa religiosa não elimina o requisito de identificação."
    },
    "textPath": "/contran/1006-2024.json"
  },
  {
    "number": 1005,
    "year": 2024,
    "title": "Dimensão: combinação específica de duas unidades",
    "subject": "Aprova a Deliberação CONTRAN nº 270, de 5 de dezembro de2023, que altera a Resolução CONTRAN nº 882, de 13 de dezembro de 2021, e referenda a Deliberação CONTRAN nº 246, de 25 de novembro de 2021.",
    "issueDate": "2024-04-03",
    "publicationDate": "2024-04-08",
    "lastRelatedActDate": "2024-04-08",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10052024.pdf",
    "relatedSources": [],
    "sourceSha256": "f6ca91db8cab012af92eceaff37a88070a754c51892ed063f2d9fa73c1bf7b35",
    "historical": false,
    "points": [
      "Altera a 882/2021 e aprova a Deliberação 270/2023.",
      "Caminhão-trator e semirreboque na hipótese: comprimento máximo de 19,30 m.",
      "Não é limite universal para toda espécie de veículo."
    ],
    "warning": "Identificar configuração e norma específica antes de usar um valor isolado.",
    "example": {
      "scenario": "O candidato aplica 19,30 m a qualquer veículo rodoviário.",
      "question": "O limite é universal?",
      "answer": "Não. O dispositivo identifica uma configuração articulada de duas unidades.",
      "variation": "O conjunto tem configuração diferente.",
      "variationAnswer": "Procurar o limite correspondente; não estender automaticamente o número dessa hipótese."
    },
    "textPath": "/contran/1005-2024.json"
  },
  {
    "number": 1004,
    "year": 2023,
    "title": "PNATRANS: erro humano e responsabilidade compartilhada",
    "subject": "Dispõe sobre o Plano Nacional de Redução de Mortes e Lesões no Trânsito (PNATRANS), instituído pela Lei nº 13.614, de 11 de janeiro de 2018.",
    "issueDate": "2023-12-21",
    "publicationDate": "2023-12-26",
    "lastRelatedActDate": "2023-12-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 02 de janeiro de 2024 Revoga a Resolução 870/21 Anexo Planilha Plano de Ações",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10042023.pdf",
    "relatedSources": [],
    "sourceSha256": "3939f616980d22d996b54159e4bd3696f688231d97e63df132b3bfda7ca8f7ff",
    "historical": false,
    "points": [
      "Abordagens Sistema Seguro e Visão Zero.",
      "Erros humanos são inevitáveis; mortes e lesões graves não são aceitáveis.",
      "Responsabilidade envolve projeto, construção, gestão, fiscalização e uso, conforme competências."
    ],
    "warning": "Não interpretar Visão Zero como prova de ausência de risco ou atribuição exclusiva de culpa ao condutor.",
    "example": {
      "scenario": "Após sinistro, a equipe propõe rever desenho da via e atendimento às vítimas, além da fiscalização.",
      "question": "Isso é compatível com o plano?",
      "answer": "Sim. O plano integra áreas e responsabilidades para prevenção de mortes e lesões.",
      "variation": "A gestão atribui toda prevenção apenas aos usuários.",
      "variationAnswer": "A abordagem é incompleta: o sistema seguro prevê responsabilidade compartilhada."
    },
    "textPath": "/contran/1004-2023.json"
  },
  {
    "number": 1003,
    "year": 2023,
    "title": "MBFT: atualização de fichas não cria infração por si",
    "subject": "Altera a Resolução CONTRAN nº 985, de 15 de dezembro de 2022, que aprova o Manual Brasileiro de Fiscalização de Trânsito (MBFT).",
    "issueDate": "2023-12-21",
    "publicationDate": "2023-12-27",
    "lastRelatedActDate": "2023-12-27",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 02 de janeiro de 2024 Altera a Resolução 985/22 Anexo (Parte VI)",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10032023.pdf",
    "relatedSources": [],
    "sourceSha256": "8e1c0e18924680565fff17585acda791d88607d46193227175be18d37950640d",
    "historical": false,
    "points": [
      "Altera o Anexo do MBFT da 985/2022.",
      "Entrou em vigor em 02/01/2024.",
      "Ficha de fiscalização precisa ser relacionada ao dispositivo do CTB e às alterações posteriores."
    ],
    "warning": "Este guia não certifica cada ficha/anexo; a regulamentação não dispensa tipificação legal e fatos.",
    "example": {
      "scenario": "Uma autuação usa ficha antiga sem verificar a alteração aplicável.",
      "question": "Basta conhecer o número 985?",
      "answer": "Não. Conferir a versão da ficha e a base legal pertinente.",
      "variation": "O candidato trata o manual como lei que cria livremente infrações.",
      "variationAnswer": "Separar procedimento de fiscalização e tipo legal do CTB."
    },
    "textPath": "/contran/1003-2023.json"
  },
  {
    "number": 1002,
    "year": 2023,
    "title": "Toxicológico: calendário extraordinário de 2023",
    "subject": "Referenda a Deliberação CONTRAN nº 268, de 29 de junho de2023, que estabelece prazo para realização do exame toxicológico periódico de que trata o § 2º do art. 148-A do Código de Trânsito Brasileiro (CTB).",
    "issueDate": "2023-10-20",
    "publicationDate": "2023-10-31",
    "lastRelatedActDate": "2023-10-31",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10022023.pdf",
    "relatedSources": [],
    "sourceSha256": "f678a7469c32e4ed5d8143717e85c77026477bcdbad04fa61902c06d139a1207",
    "historical": true,
    "points": [
      "Referenda a Deliberação 268/2023.",
      "Estabeleceu data específica em dezembro de 2023 para regularização.",
      "Prazo extraordinário não é periodicidade geral do exame."
    ],
    "warning": "A janela de regularização não deve reaparecer como nova tolerância em 2026.",
    "example": {
      "scenario": "Um motorista invoca o prazo de 2023 para adiar exame devido em 2026.",
      "question": "O calendário antigo concede nova prorrogação?",
      "answer": "Não. O ato tem recorte temporal específico.",
      "variation": "A questão pede a regra aplicável ao fato na janela de 2023.",
      "variationAnswer": "Consultar o ato histórico e os demais atos da época; não extrapolar para qualquer vencimento atual."
    }
  },
  {
    "number": 998,
    "year": 2023,
    "title": "Modelo da CNH: estoque antigo e revogação parcial",
    "subject": "Altera a Resolução CONTRAN nº 886, de 13 de dezembro de 2021, que regulamenta as especificações, a produção e a expedição da Carteira Nacional de Habilitação (CNH).",
    "issueDate": "2023-09-14",
    "publicationDate": "2023-09-26",
    "lastRelatedActDate": "2024-04-08",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor a partir de 02 de outubro de 2023 Altera a Resolução 886/21 Alterada pela Resolução 1006/24",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9982023n.pdf",
    "relatedSources": [
      {
        "label": "Resolução 1006",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10062024.pdf"
      }
    ],
    "sourceSha256": "5080daf230f28436c50efa1fd3c410a94bd4c890265b563fefa14fff6db8b43d",
    "historical": false,
    "points": [
      "Altera Anexo I da 886/2021.",
      "Permite usar formulários produzidos antes da vigência até esgotar o estoque.",
      "Art. 4º foi revogado pela 1006/2024; as demais disposições não são automaticamente revogadas."
    ],
    "warning": "Modelo novo não implica cancelamento de toda CNH antiga ou inutilização imediata dos formulários autorizados.",
    "example": {
      "scenario": "A entidade pretende descartar todo estoque anterior apenas por surgir um modelo novo.",
      "question": "O art. 3º exige descarte imediato?",
      "answer": "Não. Autoriza utilização até o fim do estoque da hipótese.",
      "variation": "Uma pergunta cita o art. 4º como vigente.",
      "variationAnswer": "Identificar a revogação parcial pela 1006, sem concluir que todo o ato desapareceu."
    },
    "textPath": "/contran/998-2023.json"
  },
  {
    "number": 997,
    "year": 2023,
    "title": "Cintos e ancoragens: ensaio e escopo técnico",
    "subject": "Altera a Resolução CONTRAN nº 951, de 28 de março de 2022, que estabelece os requisitos de instalação e os procedimentos de ensaios de cintos de segurança, ancoragem e apoios de cabeça dos veículos automotores.",
    "issueDate": "2023-09-14",
    "publicationDate": "2023-09-26",
    "lastRelatedActDate": "2023-09-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor a partir de 02 de outubro de 2023 Altera a Resolução 951/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9972023.pdf",
    "relatedSources": [],
    "sourceSha256": "1dea17df18181cdd3f5b5e3e89d810424cd4dcfae453d5a3cd5ecbf64307af58",
    "historical": false,
    "points": [
      "Altera a 951/2022.",
      "Prevê referências técnicas de ensaios para cintos/ancoragens, sistemas infantis e apoios de cabeça.",
      "As normas técnicas precisam corresponder ao componente e ao escopo."
    ],
    "warning": "Não considerar que qualquer certificado estrangeiro serve para qualquer componente.",
    "example": {
      "scenario": "Um laudo de ancoragem é oferecido como prova automática de todo equipamento do veículo.",
      "question": "O escopo de um ensaio é ilimitado?",
      "answer": "Não. Deve corresponder ao requisito e ao componente examinados.",
      "variation": "O laudo atende à referência admitida para o componente pertinente.",
      "variationAnswer": "Verificar versão e escopo, sem misturar ensaio de apoio de cabeça com fixação de dispositivo infantil."
    },
    "textPath": "/contran/997-2023.json"
  },
  {
    "number": 996,
    "year": 2023,
    "title": "Bicicleta elétrica, equipamento autopropelido e ciclomotor",
    "subject": "Dispõe sobre o trânsito, em via pública, de ciclomotores, bicicletas elétricas e equipamentos de mobilidade individual autopropelidos.",
    "issueDate": "2023-06-15",
    "publicationDate": "2023-06-22",
    "lastRelatedActDate": "2023-06-22",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor a partir de 03 de julho de 2023 Revoga as Resoluções 934/22; 947/22 Anexos",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9962023.pdf",
    "relatedSources": [],
    "sourceSha256": "85d42b1b8697086ceab8a24ec018d97d0de4ace82bf94def86a9b8d267a39d9f",
    "historical": false,
    "points": [
      "Bicicleta elétrica: pedal assistido, sem acelerador, limites próprios.",
      "A definição envolve potência, velocidade de fabricação e características do veículo.",
      "Ciclomotor não se define só pelo uso de motor elétrico."
    ],
    "warning": "Não classificar qualquer veículo vendido como bicicleta pelo nome comercial ou pela velocidade observada numa viagem.",
    "example": {
      "scenario": "Um veículo tem acelerador, mas o anúncio diz bicicleta elétrica com pedal assistido.",
      "question": "O anúncio basta para enquadrar na definição?",
      "answer": "Não. A definição de bicicleta elétrica exige não dispor de acelerador e atender aos outros critérios.",
      "variation": "O condutor usa um equipamento com características distintas de bicicleta.",
      "variationAnswer": "Analisar a classe correta e regras locais de circulação, não transportar automaticamente as dispensas de outra categoria."
    },
    "textPath": "/contran/996-2023.json"
  },
  {
    "number": 994,
    "year": 2023,
    "title": "Largura: trator e demais veículos",
    "subject": "Altera a Resolução CONTRAN nº 882, de 13 de dezembro de 2021, que estabelece os limites de pesos e dimensões para veículos que transitem por vias terrestres, e dá outras providências.",
    "issueDate": "2023-06-15",
    "publicationDate": "2023-06-22",
    "lastRelatedActDate": "2023-06-22",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor a partir de 03 de julho de 2023 Altera a Resolução 882/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9942023.pdf",
    "relatedSources": [],
    "sourceSha256": "239ecdb10b99bc9d3740d72213b18e0b1c8ec3757a6961e1adf72a8c919af105",
    "historical": false,
    "points": [
      "Altera limites da 882/2021.",
      "Prevê 2,80 m para os tratores/máquinas descritos e 2,60 m para os demais veículos.",
      "Há previsão de comprimento de 15 m para a hipótese de tratores indicada."
    ],
    "warning": "Dimensão permitida na regra não elimina outras condições de circulação ou eventual autorização específica.",
    "example": {
      "scenario": "Um veículo comum tenta usar o limite de largura destinado a trator.",
      "question": "O enquadramento foi correto?",
      "answer": "Não. As classes indicadas têm limites distintos.",
      "variation": "O caso envolve máquina agrícola da hipótese.",
      "variationAnswer": "Verificar também as demais dimensões e o regime de circulação, inclusive alterações da 1017/2024."
    },
    "textPath": "/contran/994-2023.json"
  },
  {
    "number": 993,
    "year": 2023,
    "title": "Equipamentos: exigência conforme a espécie",
    "subject": "Estabelece os equipamentos obrigatórios para a frota de veículos em circulação e relaciona o índice de regulamentações sobre segurança veicular aplicáveis.",
    "issueDate": "2023-06-15",
    "publicationDate": "2023-06-22",
    "lastRelatedActDate": "2023-06-22",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor a partir de 03 de julho de 2023 Revoga a Resolução 912/22 Anexos",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9932023.pdf",
    "relatedSources": [],
    "sourceSha256": "9e135fddd4fa3b6f897ec7836b9fdf991a5803770fc3b504bebfcecebb4d465f",
    "historical": false,
    "points": [
      "Lista equipamentos obrigatórios e índice técnico de segurança.",
      "Tipo de veículo e anexos delimitam o que é exigido.",
      "Fiscalização verifica funcionamento, não apenas presença física."
    ],
    "warning": "Não presumir que todos os veículos possuem a mesma lista ou que equipamento avariado atende ao requisito.",
    "example": {
      "scenario": "O componente existe, mas não funciona.",
      "question": "A presença física basta?",
      "answer": "Não. A resolução atribui à fiscalização a verificação das condições de funcionamento.",
      "variation": "O veículo pertence a classe diversa da usada no exemplo.",
      "variationAnswer": "Consultar a relação correspondente e suas ressalvas; não copiar exigências de outra espécie."
    },
    "textPath": "/contran/993-2023.json"
  },
  {
    "number": 992,
    "year": 2023,
    "title": "Pará: prorrogação antiga com calendário delimitado",
    "subject": "Referenda a Deliberação CONTRAN nº 266, de 17 de fevereiro de 2023, que prorroga o prazo de validade da Autorização para Conduzir Ciclomotor (ACC), Permissão Para Dirigir (PPD) e Carteira Nacional de Habilitação (CNH) de condutores habilitados pelo órgão executivo de trânsito do Estado do Pará.",
    "issueDate": "2023-06-15",
    "publicationDate": "2023-06-22",
    "lastRelatedActDate": "2023-06-22",
    "checkedAt": "2026-10-12",
    "officialSituation": "Referenda a Deliberação 266/23",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9922023.pdf",
    "relatedSources": [],
    "sourceSha256": "bcabdc9e0bafd386714cc8163047738c9939580a27c50ef51c26f933b579d24e",
    "historical": true,
    "points": [
      "Referenda a Deliberação 266/2023.",
      "Delimita condutores habilitados no Pará e documentos/janelas específicos.",
      "Suspensão/cassação não era afastada pela prorrogação."
    ],
    "warning": "Não oferecer calendário excepcional de 2023 como validade atual de qualquer CNH.",
    "example": {
      "scenario": "Em 2026, o condutor usa a norma como autorização geral permanente.",
      "question": "O ato concedeu validade sem término?",
      "answer": "Não. Há cronograma e recorte de documentos e beneficiários.",
      "variation": "Na época, o direito de dirigir estava cassado.",
      "variationAnswer": "A ressalva da norma excluía usar a prorrogação para afastar essa condição."
    }
  },
  {
    "number": 991,
    "year": 2023,
    "title": "Multas: pagamento e órgão arrecadador",
    "subject": "Altera a Resolução CONTRAN nº 918, de 28 de março de 2022,que consolida as normas sobre os procedimentos para a aplicação das multas por infrações, a arrecadação e o repasse dos valores arrecadados, nos termos do inciso VIII do art. 12 do Código de Trânsito Brasileiro (CTB).",
    "issueDate": "2023-04-19",
    "publicationDate": "2023-04-25",
    "lastRelatedActDate": "2023-04-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Altera a Resolução 918/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9912023.pdf",
    "relatedSources": [],
    "sourceSha256": "d4c401bd5602309a0b90dbdbc3f3062a299ab4a375ec9961fc2f46373d87dcb8",
    "historical": false,
    "points": [
      "Atualiza a 918/2022.",
      "Órgãos autuadores federais usam GRU Cobrança ou PagTesouro nos termos descritos.",
      "Pagamento com cartão depende da disciplina e da autorização pertinente."
    ],
    "warning": "Forma de pagamento não muda a infração nem cria parcelamento obrigatório e irrestrito por todo órgão.",
    "example": {
      "scenario": "O estudante afirma que todo ente deve usar a mesma guia federal.",
      "question": "A regra do art. 25 é universal para qualquer ente?",
      "answer": "Não. Identifica os órgãos autuadores da União.",
      "variation": "O órgão oferece pagamento por cartão com autorização e parceria regular.",
      "variationAnswer": "Distinguir alternativa de quitação e requisitos operacionais de revisão ou cancelamento da infração."
    },
    "textPath": "/contran/991-2023.json"
  },
  {
    "number": 990,
    "year": 2023,
    "title": "Cana-de-açúcar: acrescentar eixo não dispensa inspeção",
    "subject": "Referenda a Deliberação CONTRAN nº 267, de 27 de fevereiro de 2023, que altera a Resolução CONTRAN nº 872, de 13 de setembro de 2021, que estabelece os requisitos necessários à circulação de Combinações de Veículos de Carga (CVC) com Peso Bruto Total Combinado superior a 74 toneladas e inferior ou igual a 91 toneladas destinadas ao transporte de cana-de-açúcar.",
    "issueDate": "2023-04-19",
    "publicationDate": "2023-04-25",
    "lastRelatedActDate": "2023-04-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Referenda a Deliberação 267/23 Altera a Resolução 872/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9902023.pdf",
    "relatedSources": [],
    "sourceSha256": "94cf746bcd6a20cf2702629c8174540d0a7874a2a86086d05604d50fbe2d5ec2",
    "historical": false,
    "points": [
      "Altera a 872/2021 para CVC na faixa específica de PBTC.",
      "Inclusão de eixo exige condições estruturais, ABS e documentos técnicos para CSV.",
      "O conjunto precisa atender às homologações e à norma de modificação."
    ],
    "warning": "Não aumentar a carga de qualquer composição só porque foi instalado mais um eixo.",
    "example": {
      "scenario": "A empresa acrescenta um eixo e considera liberado o novo peso sem laudos.",
      "question": "A instalação isolada basta?",
      "answer": "Não. Há requisitos de estrutura, frenagem, inspeção e homologação.",
      "variation": "A operação usa composição fora da faixa ou finalidade descrita.",
      "variationAnswer": "Não estender automaticamente a exceção de CVC de cana-de-açúcar à configuração diferente."
    },
    "textPath": "/contran/990-2023.json"
  },
  {
    "number": 989,
    "year": 2022,
    "title": "Vidros: área indispensável à dirigibilidade",
    "subject": "Altera a Resolução CONTRAN nº 960, de 17 de maio de 2022,que dispõe sobre os requisitos de segurança de vidros, a visibilidade para fins de circulação, o uso de vidros em veículos blindados e o uso de medidores de transmitância luminosa.",
    "issueDate": "2022-12-15",
    "publicationDate": "2022-12-26",
    "lastRelatedActDate": "2022-12-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em Vigor em 2 de janeiro de 2023 Altera a Resolução 960/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9892022.pdf",
    "relatedSources": [],
    "sourceSha256": "55a4e87fe08690f6e072143a978697661a48251ba2bcaaf1239a1683a70e4ab5",
    "historical": false,
    "points": [
      "Altera a 960/2022.",
      "Distingue vidros indispensáveis à dirigibilidade das demais áreas.",
      "A hipótese de menor transmitância nas outras áreas exige retrovisores externos em ambos os lados."
    ],
    "warning": "A exceção não autoriza película arbitrária nas áreas indispensáveis nem elimina a regra específica dos blindados.",
    "example": {
      "scenario": "O proprietário invoca a exceção dos vidros traseiros para escurecer qualquer área frontal.",
      "question": "Pode aplicar a exceção indistintamente?",
      "answer": "Não. É necessário identificar a área e as condições da norma.",
      "variation": "O veículo se enquadra na hipótese de vidros fora da área indispensável e tem os dois retrovisores.",
      "variationAnswer": "Examinar essa exceção sem extrapolar para todas as áreas ou dispensar os outros requisitos."
    },
    "textPath": "/contran/989-2022.json"
  },
  {
    "number": 988,
    "year": 2022,
    "title": "Alarme: remissão não cria número livre de decibéis",
    "subject": "Altera a Resolução CONTRAN nº 37, de 21 de maio de 1998, que fixa normas de utilização de alarmes sonoros e outros acessórios de segurança contra furto ou roubo para os veículos automotores, na forma do art. 229 do Código de Trânsito Brasileiro.",
    "issueDate": "2022-12-15",
    "publicationDate": "2022-12-26",
    "lastRelatedActDate": "2022-12-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em Vigor em 2 de janeiro de 2023 Altera a Resolução 37/98",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9882022.pdf",
    "relatedSources": [],
    "sourceSha256": "952301d5caa7b06d4870f51d171cb350c6de8b07e4c252fc948bb15c6fe36e3f",
    "historical": false,
    "points": [
      "Altera a 37/1998.",
      "Nível máximo do alarme remete à resolução específica de buzinas.",
      "Objeto é acessório de segurança contra furto/roubo, não prova de qualquer uso sonoro."
    ],
    "warning": "Não inventar limite numérico que este ato não enuncia nem confundir alarme com sirene de emergência.",
    "example": {
      "scenario": "A questão atribui à resolução um número de decibéis sem consultar a norma remetida.",
      "question": "O próprio ato fixa esse número?",
      "answer": "Não. A regra alterada remete à regulamentação específica.",
      "variation": "O proprietário instala alarme e o chama de sirene com prioridade de passagem.",
      "variationAnswer": "A função antirroubo não cria as prerrogativas de veículo de emergência."
    },
    "textPath": "/contran/988-2022.json"
  },
  {
    "number": 987,
    "year": 2022,
    "title": "Protetor lateral: posição e fabricação",
    "subject": "Altera a Resolução CONTRAN nº 953, de 28 de março de 2022,que estabelece os requisitos técnicos de fabricação e instalação de protetor lateral para veículos de carga.",
    "issueDate": "2022-12-15",
    "publicationDate": "2022-12-26",
    "lastRelatedActDate": "2022-12-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em Vigor em 2 de janeiro de 2023 Altera a Resolução 953/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9872022.pdf",
    "relatedSources": [],
    "sourceSha256": "60b580906be5409fcb028401b1562a9dba177f9cbf05e74b376a3052ff993fa0",
    "historical": false,
    "points": [
      "Altera a 953/2022.",
      "Trata de região posterior aos eixos em carroceria basculante/silo basculante.",
      "Marcação da hipótese deve estar em local aparente no protetor do lado esquerdo."
    ],
    "warning": "Não extrapolar dispensa de uma região específica para todo o veículo ou qualquer carroceria.",
    "example": {
      "scenario": "O veículo tem uma exceção para região traseira e o aluno elimina todo protetor lateral.",
      "question": "A exceção tem esse alcance?",
      "answer": "Não. Deve ser lida no recorte específico da norma-base.",
      "variation": "A marcação exigida fica invisível em local diverso.",
      "variationAnswer": "Conferir posição e visibilidade, além do marco de fabricação/modificação aplicável."
    },
    "textPath": "/contran/987-2022.json"
  },
  {
    "number": 986,
    "year": 2022,
    "title": "R-32: faixa exclusiva e complemento",
    "subject": "Altera o Anexo I da Resolução CONTRAN nº 973, de 18 de julho de 2022, que institui o Regulamento de Sinalização Viária.",
    "issueDate": "2022-12-15",
    "publicationDate": "2022-12-26",
    "lastRelatedActDate": "2022-12-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 2 de janeiro de 2023 Altera o Anexo I da Resolução 973/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9862022.pdf",
    "relatedSources": [],
    "sourceSha256": "14c0219a48e40d9f4da31516d90f7c2b674722dada537f72a2fb77a792ab9f07",
    "historical": false,
    "points": [
      "Altera o Volume I do regulamento da 973/2022.",
      "R-32 sinaliza circulação exclusiva de transporte público coletivo.",
      "Informação complementar pode delimitar horários, serviço, faixa ou outros veículos autorizados."
    ],
    "warning": "Não decidir só pela placa isolada quando há complemento; não presumir que qualquer táxi é automaticamente autorizado em toda faixa.",
    "example": {
      "scenario": "A placa vem com horário de exclusividade e controle da faixa.",
      "question": "O condutor deve ignorar o complemento?",
      "answer": "Não. A sinalização deve ser interpretada no conjunto.",
      "variation": "A sinalização admite táxi expressamente na hipótese concreta.",
      "variationAnswer": "Considerar essa informação, sem generalizar a autorização para outras faixas ou horários."
    },
    "textPath": "/contran/986-2022.json"
  },
  {
    "number": 985,
    "year": 2022,
    "title": "MBFT: manual, ficha e enquadramento legal",
    "subject": "Aprova o Manual Brasileiro de Fiscalização de Trânsito.",
    "issueDate": "2022-12-15",
    "publicationDate": "2022-12-26",
    "lastRelatedActDate": "2026-08-18",
    "checkedAt": "2026-10-12",
    "officialSituation": "Alterada pela Resoluções 1003/23; 1009/24; 1012/24; 1013/24; 1031/26 Revoga a Resolução 925/22 Anexos (Parte I, Parte II, Parte III, Parte IV, Parte V, Parte VI, Parte VII)",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9852022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 1031",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10312026.pdf"
      },
      {
        "label": "Resolução 1023",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10232026c.pdf"
      },
      {
        "label": "Resolução 1022",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10222026c.pdf"
      },
      {
        "label": "Resolução 1013",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10132024.pdf"
      },
      {
        "label": "Resolução 1012",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10122024.pdf"
      },
      {
        "label": "Resolução 1009",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10092024.pdf"
      },
      {
        "label": "Resolução 1003",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10032023.pdf"
      }
    ],
    "sourceSha256": "4b763952f62acd73f811ffe4084127b37502516ade23d90dca94e594af50c851",
    "historical": false,
    "points": [
      "Aprova o Manual Brasileiro de Fiscalização de Trânsito.",
      "Alterações posteriores alcançam fichas e procedimentos específicos.",
      "A parte alterada pela 1031/2026 tem vigência diferida; não antecipar o anexo novo."
    ],
    "warning": "A leitura do ato de aprovação não certifica todas as fichas do manual. Não ensinar a versão inicial de 2022 como compilação completa atual.",
    "example": {
      "scenario": "Uma ficha antiga foi copiada sem verificar ato modificador e vigência.",
      "question": "Conhecer o número do manual basta para aplicar essa ficha?",
      "answer": "Não. É preciso conferir redação aplicável, enquadramento e fatos.",
      "variation": "A ficha pertence ao trecho alterado em agosto com prazo de 60 dias.",
      "variationAnswer": "Respeitar a data de efeitos; publicação do ato alterador e aplicabilidade da ficha não são equivalentes."
    },
    "textPath": "/contran/985-2022.json"
  },
  {
    "number": 981,
    "year": 2022,
    "title": "Película retrorrefletiva: transição encerrada",
    "subject": "Referenda a Deliberação CONTRAN nº 263, de 7 de outubro de2022, que altera a Resolução CONTRAN nº 948, de 28 de março de 2022, que estabelece os requisitos técnicos para o emprego de película retrorrefletiva em veículos.",
    "issueDate": "2022-12-15",
    "publicationDate": "2022-12-26",
    "lastRelatedActDate": "2022-12-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 2 de janeiro de 2023 Referenda a Deliberação 263/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9812022.pdf",
    "relatedSources": [],
    "sourceSha256": "1f18cc908e2e3d44a79998a3ee87aac637d996fecba5a59235e20a5303ea8f58",
    "historical": true,
    "points": [
      "Alterou prazo do art. 8º da 948/2022.",
      "A adequação da descrição APROVADO SENATRAN foi delimitada até 01/01/2024.",
      "Prazo de adaptação não é prazo individual de validade de cada veículo."
    ],
    "warning": "Não reapresentar a tolerância transitória como prazo novo a partir de uma instalação em 2026.",
    "example": {
      "scenario": "O fabricante conta o prazo de adaptação novamente desde a compra de película em 2026.",
      "question": "O marco era a compra individual?",
      "answer": "Não. A norma estabeleceu uma data final específica.",
      "variation": "A dúvida é sobre a exigência técnica atual da película.",
      "variationAnswer": "Consultar a 948 e os atos atuais; a transição encerrada não substitui a regra técnica vigente."
    }
  },
  {
    "number": 979,
    "year": 2022,
    "title": "Biometria: não aplicar o fragmento de norma substituída",
    "subject": "Referenda a Deliberação CONTRAN nº 261, de 8 de junho de 2022, que altera a Resolução CONTRAN nº 928, de 28 de março de 2022, que estabelece critérios e requisitos técnicos para a homologação dos cursos e das plataformas tecnológicas, na modalidade de ensino à distância.",
    "issueDate": "2022-09-05",
    "publicationDate": "2022-09-09",
    "lastRelatedActDate": "2022-09-09",
    "checkedAt": "2026-10-12",
    "officialSituation": "Referenda a Deliberação 261/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9792022.pdf",
    "relatedSources": [],
    "sourceSha256": "8adb6d4cbc2ae5748867a7a9621c329afa143266acb371a75736f3ab41a0f526",
    "historical": true,
    "points": [
      "Alterava a 928/2022 e sua validação biométrica.",
      "A 928/2022 foi revogada pela 1020/2025.",
      "O percentual e o fluxo do ato antigo não são certificados como regra atual por esta revisão."
    ],
    "warning": "Este guia é histórico; observar o regime novo e seus atos operacionais.",
    "example": {
      "scenario": "A entidade usa o fragmento de 2022 como autorização suficiente para o processo atual.",
      "question": "A referência antiga resolve o procedimento atual?",
      "answer": "Não. A norma-base foi substituída e o regime novo precisa ser consultado.",
      "variation": "A prova pergunta expressamente pelo funcionamento em 2022.",
      "variationAnswer": "Distinguir o recorte histórico, sem anunciar o percentual antigo como exigência vigente universal."
    }
  },
  {
    "number": 977,
    "year": 2022,
    "title": "Vistoria: dispensa a critério do órgão",
    "subject": "Altera a Resolução CONTRAN nº 941, de 28 de março de 2022, que estabelece procedimentos para o exercício da atividade de vistoria de identificação veicular a ser realizada pelos órgãos e entidades executivos de trânsito dos Estados e do Distrito Federal, ou por pessoa jurídica de direito público ou privado, habilitada para a prestação dos serviços de vistoria veicular.",
    "issueDate": "2022-07-18",
    "publicationDate": "2022-07-25",
    "lastRelatedActDate": "2022-07-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 1º de agosto de 2022 Altera a Resolução 941/22 Revoga a Resolução 022/98",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9772022.pdf",
    "relatedSources": [],
    "sourceSha256": "ae80d5eb5663cf8187b8e05620365a6779389c7cebfad3e0406ba663bcf9f045",
    "historical": false,
    "points": [
      "Atualiza a 941/2022.",
      "Prevê hipóteses como reorganização societária, transferência entre entes públicos e filiais.",
      "A dispensa depende do órgão competente e do caso, podendo haver documentos adicionais."
    ],
    "warning": "Poder dispensar não significa dispensa automática de toda transferência entre pessoas jurídicas.",
    "example": {
      "scenario": "A empresa sofre incorporação e conclui que nenhuma verificação será necessária.",
      "question": "A hipótese dispensa automaticamente a vistoria?",
      "answer": "Não. O órgão decide e pode exigir documentos complementares.",
      "variation": "A transferência é entre particulares sem a hipótese societária descrita.",
      "variationAnswer": "Não transportar a dispensa específica para a situação diferente."
    },
    "textPath": "/contran/977-2022.json"
  },
  {
    "number": 976,
    "year": 2022,
    "title": "CNH: anexo técnico e documento emitido",
    "subject": "Referenda a Deliberação CONTRAN nº 259, de 26 de maio de 2022, que altera a Resolução CONTRAN nº 886, de 13 de dezembro de 2021, que regulamenta as especificações, a produção e a expedição da Carteira Nacional de Habilitação (CNH).",
    "issueDate": "2022-07-18",
    "publicationDate": "2022-07-25",
    "lastRelatedActDate": "2022-07-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 1º de agosto de 2022 Altera a Resolução 886/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9762022n2.pdf",
    "relatedSources": [],
    "sourceSha256": "6429055b83dd5eb5aa42fb0644bffc27db4467252085f785cf582e09b96c7d27",
    "historical": false,
    "points": [
      "Referenda a Deliberação 259/2022 e altera anexos da 886/2021.",
      "Detalhes técnicos são fornecidos às empresas credenciadas nos termos do ato.",
      "Mudança de anexo de produção não se confunde com perda automática de validade da CNH."
    ],
    "warning": "Confrontar as alterações de 998/2023 e 1006/2024 antes de usar o fragmento inicial como especificação completa atual.",
    "example": {
      "scenario": "O aluno acha que uma mudança no anexo cancela todas as habilitações emitidas.",
      "question": "A conclusão decorre automaticamente do ato?",
      "answer": "Não. Especificação de produção e validade individual têm regimes diferentes.",
      "variation": "A gráfica produz novo formulário.",
      "variationAnswer": "Usar as especificações atuais pertinentes ao credenciamento, não reproduzir qualquer versão histórica."
    },
    "textPath": "/contran/976-2022.json"
  },
  {
    "number": 975,
    "year": 2022,
    "title": "RNPC: autorização e histórico administrativo",
    "subject": "Referenda a Deliberação CONTRAN nº 257, de 4 de maio de 2022, que dispõe sobre o Registro Nacional Positivo de Condutores (RNPC).",
    "issueDate": "2022-07-18",
    "publicationDate": "2022-07-25",
    "lastRelatedActDate": "2022-07-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 1º de agosto de 2022",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9752022.pdf",
    "relatedSources": [],
    "sourceSha256": "4b2b95a90325bdbbe42be07276ae16552e76a61344d822c4c8a41469253db61f",
    "historical": false,
    "points": [
      "Cadastro considera 12 meses sem infração sujeita à pontuação, nos termos da norma.",
      "Infrações precisam ter instância administrativa encerrada para o cômputo indicado.",
      "Ingresso exige autorização prévia; a consulta tem disciplina de consentimento."
    ],
    "warning": "Não confundir RNPC com licença para ignorar infrações futuras ou inclusão compulsória de todo condutor.",
    "example": {
      "scenario": "O condutor recebe uma autuação ainda em julgamento e o aluno a trata como pontuação definitiva para esse cadastro.",
      "question": "O artigo permite ignorar o estágio administrativo?",
      "answer": "Não. O parágrafo do art. 2º exige encerramento da instância para o cômputo descrito.",
      "variation": "A pessoa não autorizou a inclusão.",
      "variationAnswer": "A autorização prévia é requisito; bom histórico não torna o cadastro automaticamente compulsório."
    },
    "textPath": "/contran/975-2022.json"
  },
  {
    "number": 974,
    "year": 2022,
    "title": "CVC de cana: regra transitória de capacitação",
    "subject": "Altera Resolução CONTRAN nº 872, de 13 de setembro de 2021, que estabelece os requisitos necessários à circulação de Combinações de Veículos de Carga (CVC) com Peso Bruto Total Combinado superior a 74 toneladas e inferior ou igual a 91 toneladas destinadas ao transporte de cana-de-açúcar, para dispor sobre a capacitação do condutor dessa CVC.",
    "issueDate": "2022-07-18",
    "publicationDate": "2022-07-25",
    "lastRelatedActDate": "2022-07-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Altera a Resolução 872/21 Revoga a Deliberação 256/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9742022.pdf",
    "relatedSources": [],
    "sourceSha256": "52314a5f0fc67d365c7afbd2dc06d38f11d0adc3953995c1383235c844018a5c",
    "historical": false,
    "points": [
      "Altera a 872/2021.",
      "Prevê curso de cargas indivisíveis até regulamentar a capacitação específica.",
      "É necessário verificar se o fato ainda se encontra na hipótese transitória."
    ],
    "warning": "Não apresentar a substituição transitória como exigência permanente sem conferir regulamentação específica posterior.",
    "example": {
      "scenario": "A prova situa o caso no período em que a capacitação específica ainda não foi regulamentada.",
      "question": "Qual referência transitória o ato oferece?",
      "answer": "Curso especializado de transporte de cargas indivisíveis, na hipótese descrita.",
      "variation": "Há regulamentação específica aplicável ao fato posterior.",
      "variationAnswer": "Reexaminar o regime; uma condição transitória não autoriza ignorar norma superveniente."
    },
    "textPath": "/contran/974-2022.json"
  },
  {
    "number": 973,
    "year": 2022,
    "title": "Sinalização: localizar o volume correto",
    "subject": "Institui o Regulamento de Sinalização Viária",
    "issueDate": "2022-07-18",
    "publicationDate": "2022-07-25",
    "lastRelatedActDate": "2024-10-16",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 031/98; 038/98; 160/04; 180/05; 236/07; 243/07; 348/10; 483/14; 486/14; 550/15; 600/16; 601/16; 690/17; 704/17; 857/21; 873/21 e 874/21 Revoga o art. 12, o inciso III do art. 14 e o Anexo II da Resolução 585/16 Alterada pelas Resoluções 986/22;1012/24; 1013/24 Vol. I - Sinalização Vertical de Regulamentação (Anexo I); Vol. II - Sinalização Vertical de Advertência (Anexo II); Vol. III - Sinalização Vertical de Indicação (Anexo III); Vol. IV - Sinalização Horizontal (Anexo IV); Vol. V - Sinalização Semafórica (Anexo V); Vol. VI - Dispositivos Auxiliares (Anexo VI); Vol. VII - Sinalização Temporária (Anexo VII); Vol. VIII - Sinalização Cicloviária (Anexo VIII); Vol. IX - Sinalização de Cruzamentos Rodoferroviários (Anexo IX)",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9732022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 1013",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10132024.pdf"
      },
      {
        "label": "Resolução 1012",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10122024.pdf"
      },
      {
        "label": "Resolução 986",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9862022.pdf"
      }
    ],
    "sourceSha256": "f4715ed8295b23030fb73c00a8c66675ab1321f28cdcd1c926260799e824eaaf",
    "historical": false,
    "points": [
      "Organiza nove volumes do Manual Brasileiro de Sinalização.",
      "Regulamentação, advertência, indicação, horizontal e semafórica são modalidades distintas.",
      "Também há volumes de dispositivos auxiliares, temporária, cicloviária e cruzamento rodoferroviário."
    ],
    "warning": "Os anexos receberam alterações por 986/2022, 1012/2024 e 1013/2024. O guia não certifica cada especificação de todos os volumes.",
    "example": {
      "scenario": "Uma obra exige sinalização temporária, e a equipe consulta apenas o volume de marcas horizontais.",
      "question": "Esse recorte substitui o volume temporário?",
      "answer": "Não. O Volume VII trata da sinalização temporária; considerar também os demais elementos necessários.",
      "variation": "O caso envolve circulação exclusiva com placa R-32.",
      "variationAnswer": "Consultar Volume I e a alteração da 986, incluindo informação complementar."
    },
    "textPath": "/contran/973-2022.json"
  },
  {
    "number": 972,
    "year": 2022,
    "title": "Piauí: retomada de prazos da pandemia",
    "subject": "Esta Resolução referenda a Deliberação CONTRAN nº 258, de 19 de maio de 2022, que dispõe sobre os prazos de processos e de procedimentos afetos aos órgãos e entidades do Sistema Nacional de Trânsito (SNT) e às entidades públicas e privadas prestadoras de serviços relacionados ao trânsito, por força das medidas de enfrentamento da pandemia de Covid-19 no Estado do Piauí.",
    "issueDate": "2022-06-20",
    "publicationDate": "2022-06-24",
    "lastRelatedActDate": "2022-06-24",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor em 1º de julho de 2022 Revoga a Portaria CONTRAN 218/21 Revoga a Resolução CONTRAN 838/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao9722022.pdf",
    "relatedSources": [],
    "sourceSha256": "1e95c5567469df1168a7b95afc2d19dc82716e8094a580356b09d2671e6173e3",
    "historical": true,
    "points": [
      "Referenda a Deliberação 258/2022.",
      "Restabelece prazos e delimita condutores, veículos e autuações ligados ao Piauí.",
      "Trata de recorte excepcional da pandemia, não de suspensão permanente."
    ],
    "warning": "Não reutilizar cronograma excepcional de 2022 como prazo geral vigente de renovação em 2026.",
    "example": {
      "scenario": "Um aluno usa o calendário pandêmico do Piauí para um processo novo de outro Estado.",
      "question": "O uso é adequado?",
      "answer": "Não. É preciso respeitar local, beneficiários, período e procedimento.",
      "variation": "A prova pede situação específica da retomada em 2022.",
      "variationAnswer": "Aplicar o documento histórico pertinente, sem transformá-lo em benefício permanente."
    }
  }
];
