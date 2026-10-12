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
  },
  {
    "number": 971,
    "year": 2022,
    "title": "Rio de Janeiro: calendário excepcional de 2022",
    "subject": "Esta Resolução referenda a Deliberação CONTRAN nº 254, de 25 de março de 2022, que dispõe sobre os prazos de processos e de procedimentos afetos aos órgãos e entidades do Sistema Nacional de Trânsito (SNT) e às entidades públicas e privadas prestadoras de serviços relacionados ao trânsito, por força das medidas de enfrentamento da pandemia de Covid-19 no Estado do Rio de Janeiro.",
    "issueDate": "2022-06-20",
    "publicationDate": "2022-06-24",
    "lastRelatedActDate": "2022-06-24",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Revoga a Portaria CONTRAN 209/21 Revoga a Resolução CONTRAN 829/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao9712022.pdf",
    "relatedSources": [],
    "sourceSha256": "4f7321d2a9d8c2013b608d4ff00df81e008beccbffab779ef5ea3d32423c98d1",
    "historical": true,
    "points": [
      "A medida tem recorte territorial no Rio de Janeiro e decorre da pandemia.",
      "Os cronogramas referem-se a vencimentos e procedimentos de 2020–2022."
    ],
    "warning": "Calendário histórico: não usar para prorrogar CNH vencida em 2026. O PDF traz inclusive a expressão impossível “31 de setembro de 2022”; não criar exercício que a ensine como data válida.",
    "example": {
      "scenario": "Uma pessoa invoca este calendário de 2022 para dirigir com CNH vencida em outubro de 2026.",
      "question": "O ato concede essa prorrogação?",
      "answer": "Não. O benefício exige enquadramento no período e nas hipóteses originais.",
      "variation": "A questão pede a retomada dos prazos ocorrida no Rio de Janeiro em 2022.",
      "variationAnswer": "Nesse caso, trata-se de consulta histórica, exigindo a fonte e eventuais correções do período."
    },
    "reviewedScope": "Arts. 1º–4º e cronogramas dos Anexos I e II"
  },
  {
    "number": 970,
    "year": 2022,
    "title": "Iluminação: emitir luz não é retrorrefletir",
    "subject": "Esta Resolução dispõe sobre as características e especificações técnicas dos sistemas de sinalização, de iluminação e seus dispositivos, bem como sobre o uso de lanternas especiais em veículos.",
    "issueDate": "2022-06-20",
    "publicationDate": "2022-06-24",
    "lastRelatedActDate": "2026-07-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos (I ao XVI) e Anexos (XVII ao XXI) Alterada pela Resolução 1024/26 Em vigor em 1º de julho de 2022 Revoga as Resoluções 268/08; 614/16; 667/17; 681/17; 761/18 e 799/20 Revoga a partir de 1º de janeiro de 2024 as Resoluções 227/07; 294/08; 383/11 e 436/13",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao9702022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 1024",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao10242026c.pdf"
      }
    ],
    "sourceSha256": "311838ffba73e35468132ed0b4c4c50098420c7fbc58a3cdf36472670e861fb4",
    "historical": false,
    "points": [
      "Dispositivo de iluminação ilumina a via; dispositivo de sinalização emite sinal para outros usuários.",
      "Retrorrefletor indica a presença do veículo devolvendo luz originada de outra fonte."
    ],
    "warning": "Ler com a alteração da 1024/2026 sobre lanternas especiais. Este guia não substitui os ensaios dos anexos nem autoriza mudar o sistema original.",
    "example": {
      "scenario": "Um dispositivo traseiro devolve a luz do farol de outro veículo, sem produzir luz própria.",
      "question": "É retrorrefletor ou farol?",
      "answer": "Retrorrefletor: a fonte luminosa não está no próprio dispositivo.",
      "variation": "O equipamento projeta um facho para iluminar a via à frente.",
      "variationAnswer": "A função descrita é de farol; não basta a cor da peça para classificar sua função."
    },
    "reviewedScope": "Art. 2º, I–IV; divisão dos anexos dos arts. 3º e 4º",
    "textPath": "/contran/970-2022.json"
  },
  {
    "number": 969,
    "year": 2022,
    "title": "Placas: regra geral e exceção da motocicleta",
    "subject": "Esta Resolução dispõe sobre o sistema de Placas de Identificação de Veículos (PIV), registrados no território nacional.",
    "issueDate": "2022-06-20",
    "publicationDate": "2022-06-24",
    "lastRelatedActDate": "2022-06-24",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Em vigor em 1° de julho de 2022 Revoga a Deliberação 260/22 Revoga as Resoluções 493/75; 793/94; 32/98; 60/98; 88/99; 231/07; 241/07; 275/08; 286/08; 309/09; 342/10; 372/11; 527/15; 670/17; 742/18; 780/19; 786/20; 792/20 e 887/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao9692022.pdf",
    "relatedSources": [],
    "sourceSha256": "c0e48ed8cef1cf155df26cfde04a91c9670dd2b773d986b7efcaee387d48d8a8",
    "historical": false,
    "points": [
      "Regra geral: PIV dianteira e traseira após o registro.",
      "Motocicletas, motonetas, reboques e os demais veículos listados no art. 2º, § 1º usam apenas a PIV traseira.",
      "Carga que encobre a placa pode exigir segunda PIV traseira."
    ],
    "warning": "Não exigir troca universal de placa antiga só pela existência do modelo novo; as hipóteses de substituição dependem do art. 56.",
    "example": {
      "scenario": "Uma motocicleta registrada está sem placa dianteira, mas possui a traseira regular.",
      "question": "A ausência da dianteira, por si só, viola a regra desta resolução?",
      "answer": "Não. Motocicletas estão na exceção expressa da PIV apenas traseira.",
      "variation": "O mesmo fato ocorre com um automóvel comum.",
      "variationAnswer": "Aplica-se a regra geral de placas dianteira e traseira; a exceção da motocicleta não se estende ao automóvel."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/969-2022.json"
  },
  {
    "number": 968,
    "year": 2022,
    "title": "Identificação: VIN e seus três blocos",
    "subject": "Esta resolução estabelece o critério de identificação de veículos, a que se refere o art. 114 do Código de Trânsito Brasileiro (CTB).",
    "issueDate": "2022-06-20",
    "publicationDate": "2022-06-24",
    "lastRelatedActDate": "2022-06-24",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Em vigor em 1º de julho de 2022 Revoga a partir de 1º de janeiro de 2025 as Resoluções 836/97; 24/98; 282/08; 325/09; 581/16 e 634/16",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao9682022.pdf",
    "relatedSources": [],
    "sourceSha256": "9202086a67b4d85f9b239a6b0d2a6db10d9207ebbe42b3c6fc9b1031ecb63d0f",
    "historical": false,
    "points": [
      "VIN: 17 caracteres distribuídos em WMI, VDS e VIS.",
      "WMI identifica o fabricante; VDS descreve características; VIS individualiza o veículo.",
      "Identificadores gravados e placa são instrumentos distintos."
    ],
    "warning": "O marco de 1º/01/2025 indicado no catálogo é anterior à conferência de 2026. Não misturar os campos VIN com o código da placa ou ensinar todas as gravações a partir deste resumo.",
    "example": {
      "scenario": "Uma questão chama o código alfanumérico da placa de VIN de 17 caracteres.",
      "question": "A identificação está correta?",
      "answer": "Não. A placa e o número de identificação veicular são identificadores diferentes.",
      "variation": "A questão descreve a seção inicial de três caracteres que identifica o fabricante.",
      "variationAnswer": "Trata-se do WMI, primeira seção do VIN."
    },
    "reviewedScope": "Arts. 2º–4º, com foco no art. 3º, I–IV",
    "textPath": "/contran/968-2022.json"
  },
  {
    "number": 967,
    "year": 2022,
    "title": "Baixa: retirar de circulação não é transferir",
    "subject": "Estabelece critérios para a baixa do registro de veículos, bem como os prazos para efetivação.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Em Vigor em 1º de junho de 2022 Revoga a Deliberação 255/22 Revoga o art. 30º da Resolução 611/16 Revoga as Resoluções 011/98; 113/00; 179/05 e 661/17",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9672022.pdf",
    "relatedSources": [],
    "sourceSha256": "50012b6bdb9d15a551d631893b74a7fcacba26d928b0bf0a7be1dfc358807bd5",
    "historical": false,
    "points": [
      "A baixa é obrigatória nas hipóteses de veículo irrecuperável, definitivamente desmontado e outras previstas no art. 2º.",
      "A solicitação motivada é dirigida ao órgão executivo estadual ou distrital de registro.",
      "Cumpridas as exigências, o órgão emite a Certidão de Baixa."
    ],
    "warning": "Não confundir baixa definitiva com transferência de proprietário ou simples falta de uso. O recolhimento de documentos e identificadores depende da hipótese do art. 3º.",
    "example": {
      "scenario": "Um veículo foi definitivamente desmontado e seu responsável pretende apenas transferir o registro como se pudesse circular.",
      "question": "A transferência substitui o procedimento de baixa?",
      "answer": "Não. A desmontagem definitiva está entre as hipóteses de baixa obrigatória.",
      "variation": "O veículo continua íntegro e foi vendido para uso regular.",
      "variationAnswer": "A venda comum exige o procedimento de transferência; não se presume baixa só pela troca de proprietário."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/967-2022.json"
  },
  {
    "number": 966,
    "year": 2022,
    "title": "Retrovisores: anexos dependem do veículo",
    "subject": "Dispõe sobre os requisitos técnicos dos espelhos retrovisores de veículos.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Em Vigor em 1º de junho de 2022 Revoga o art. 5º da Resolução 799/20 Revoga as Resoluções 682/17 e 703/17",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9662022.pdf",
    "relatedSources": [],
    "sourceSha256": "cc4ec391bc8d869733a37c39e4a61fdefa1a4ba9bb7e53ec39703fd61266bed9",
    "historical": false,
    "points": [
      "Retrovisor permite observar área adjacente sem visão direta.",
      "Motocicletas e veículos listados no art. 3º seguem o Anexo I.",
      "Automóveis e veículos listados no art. 4º seguem os Anexos II, III e IV."
    ],
    "warning": "Ensaios e equivalências técnicas devem respeitar o dispositivo aplicável. Não deduzir conformidade só porque o acessório cabe no veículo.",
    "example": {
      "scenario": "Um candidato aplica ao retrovisor de motocicleta o conjunto de anexos reservado aos automóveis.",
      "question": "A escolha do anexo está correta?",
      "answer": "Não. O art. 3º remete as motocicletas ao Anexo I.",
      "variation": "O caso trata de retrovisores de um automóvel.",
      "variationAnswer": "A referência é o art. 4º e seus Anexos II, III e IV, com as condições técnicas previstas."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/966-2022.json"
  },
  {
    "number": 965,
    "year": 2022,
    "title": "Estacionamento reservado: competência e sinalização",
    "subject": "Define e regulamenta as áreas de segurança e de estacionamentos específicos de veículos.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2024-10-16",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Revoga as Resoluções 302/08; 303/08 e 304/08 Alterada pela Resolução 1012/24",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9652022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 1012",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10122024.pdf"
      }
    ],
    "sourceSha256": "316bb6e2310873698f88323510940bd9f1bfc232ee17e87764223e13b9014569",
    "historical": false,
    "points": [
      "Estacionamento específico em via pública é estabelecido pelo órgão com circunscrição sobre a via.",
      "A sinalização deve seguir os padrões do CONTRAN.",
      "Credenciais para pessoa idosa ou com deficiência têm disciplina modificada pela 1012/2024."
    ],
    "warning": "Pintura particular não cria área pública de estacionamento exclusivo. Não copiar o capítulo antigo de credenciais sem a alteração de 2024.",
    "example": {
      "scenario": "Um comerciante pinta a via pública como vaga exclusiva de sua loja, sem regulamentação do órgão competente.",
      "question": "A pintura cria estacionamento específico regular?",
      "answer": "Não. O art. 2º exige estabelecimento e regulamentação pelo órgão de trânsito competente.",
      "variation": "O órgão com circunscrição regulamenta e sinaliza a área nos padrões do CONTRAN.",
      "variationAnswer": "A origem da área agora atende ao requisito estudado; o usuário deve ainda respeitar sua finalidade e condições."
    },
    "reviewedScope": "Arts. 2º e 4º; confronto com a alteração 1012/2024",
    "textPath": "/contran/965-2022.json"
  },
  {
    "number": 964,
    "year": 2022,
    "title": "Air bag: equipamento suplementar e recorte de fabricação",
    "subject": "Dispõe sobre a obrigatoriedade do uso do equipamento suplementar de segurança passiva - Air Bag, na parte frontal, para o condutor e o passageiro do assento dianteiro, dos veículos das categorias M1 e N1.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 311/09; 394/11; 534/15 e 597/16",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9642022.pdf",
    "relatedSources": [],
    "sourceSha256": "57413c13be140bb7a3bd42b6a6a4449a90ead53282d4f7bde3fde0f21d9d0989",
    "historical": false,
    "points": [
      "Air bag frontal é equipamento suplementar de segurança passiva para condutor e passageiro dianteiro.",
      "O art. 2º alcança M1 e N1 fabricados a partir de 1º/01/2014.",
      "Há dispensas específicas no art. 4º, como veículos de uso bélico."
    ],
    "warning": "Suplementar significa adicional, não substituto do cinto. Não transformar o marco de fabricação em obrigação automática de adaptar qualquer veículo antigo.",
    "example": {
      "scenario": "Um automóvel comum M1 fabricado em 2025 é apresentado sem air bag frontal obrigatório.",
      "question": "O ano de fabricação o coloca fora do recorte da norma?",
      "answer": "Não. Ele é posterior a 1º/01/2014 e se enquadra na categoria, ressalvadas dispensas específicas que não foram dadas no caso.",
      "variation": "A questão trata de veículo de uso bélico.",
      "variationAnswer": "É necessário aplicar a dispensa expressa do art. 4º, e não a regra sem exceções."
    },
    "reviewedScope": "Arts. 1º–4º",
    "textPath": "/contran/964-2022.json"
  },
  {
    "number": 963,
    "year": 2022,
    "title": "Rodas especiais: troca precisa atender à segurança",
    "subject": "Estabelece os requisitos mínimos de segurança para rodas especiais de veículos",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Revoga as Resoluções 533/78; 545/78 e 569/81",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9632022.pdf",
    "relatedSources": [],
    "sourceSha256": "edc0bf70666d3b98a94e927e4a1c700ad85fe38f3c8696aeeb61a58f6726acca",
    "historical": false,
    "points": [
      "Rodas especiais substituem as originais ou opcionais de fábrica.",
      "A disciplina estudada alcança automóveis e camionetas de uso misto deles derivadas.",
      "É proibida circulação com rodas substitutas que não cumpram os requisitos do Anexo."
    ],
    "warning": "Aparência ou encaixe da roda não comprovam atendimento aos requisitos. A alteração do conjunto roda/pneu também precisa seguir a regulamentação pertinente.",
    "example": {
      "scenario": "Um automóvel recebe rodas fora das especificações mínimas do Anexo, embora caibam nos cubos.",
      "question": "O encaixe físico torna regular a circulação?",
      "answer": "Não. O art. 4º exige os requisitos de segurança, além da mera possibilidade de montagem.",
      "variation": "Foram comprovados os requisitos técnicos da roda e das modificações do conjunto roda/pneu.",
      "variationAnswer": "A análise é de conformidade técnica; o caso anterior não era irregular simplesmente por ser uma roda especial."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/963-2022.json"
  },
  {
    "number": 962,
    "year": 2022,
    "title": "Mato Grosso: prazos da pandemia encerrados",
    "subject": "Dispõe sobre os prazos de processos e de procedimentos afetos aos órgãos e entidades do Sistema Nacional de Trânsito (SNT) e às entidades públicas e privadas prestadoras de serviços relacionados ao trânsito, por força das medidas de enfrentamento da pandemia de Covid-19 no Estado do Mato Grosso.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Revoga a Deliberação 253/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9622022.pdf",
    "relatedSources": [],
    "sourceSha256": "6ae3dd6d1f43244223df6cdc75877bf8e31ed6ac74b4f44d8fc18f8a06b742a4",
    "historical": true,
    "points": [
      "O ato alcança condutores habilitados pelo órgão do Mato Grosso.",
      "O cronograma contempla CNH/ACC vencidas de março de 2020 a dezembro de 2022.",
      "A última data do Anexo é 31/01/2023."
    ],
    "warning": "Consulta histórica: não ensinar este calendário como prorrogação vigente em 2026.",
    "example": {
      "scenario": "Uma CNH de Mato Grosso vence em 2026 e seu titular cita o cronograma da pandemia.",
      "question": "Esse vencimento está contemplado?",
      "answer": "Não. O cronograma tem recorte temporal encerrado e não inclui vencimentos de 2026.",
      "variation": "A pergunta descreve CNH vencida em dezembro de 2022 e exige o prazo excepcional daquele período.",
      "variationAnswer": "No enquadramento histórico indicado, o Anexo prevê renovação até 31/01/2023."
    },
    "reviewedScope": "Arts. 1º–4º e Anexo"
  },
  {
    "number": 961,
    "year": 2022,
    "title": "Acessibilidade: equipamento e informação no CRLV-e",
    "subject": "Estabelece requisitos técnicos de acessibilidade para os veículos de transporte coletivo de passageiros e os procedimentos para a indicação do nível de acessibilidade no Certificado de Registro e Licenciamento do Veículo em meio digital (CRLV-e).",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Em Vigor em 1º de junho de 2022 Revoga as Resoluções 402/12; 469/13 e 605/16",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9612022.pdf",
    "relatedSources": [],
    "sourceSha256": "6e59a8f05fcfab991dfba863f2b94478daddb80bc76940f88c4401a5550cf449",
    "historical": false,
    "points": [
      "Acessibilidade abrange os requisitos do veículo e a informação de suas características no CRLV-e.",
      "O art. 3º remete ao Anexo I para a indicação das características ou tipos de acessibilidade."
    ],
    "warning": "Não presumir que a presença de um equipamento dispensa os demais requisitos ou a informação documental.",
    "example": {
      "scenario": "Um ônibus acessível tem equipamento adequado, mas o responsável afirma que as características não precisam aparecer no CRLV-e.",
      "question": "A informação documental é dispensada?",
      "answer": "Não. O art. 3º exige a apresentação das características ou tipos de acessibilidade no CRLV-e.",
      "variation": "O documento informa a acessibilidade, mas um requisito técnico não foi atendido.",
      "variationAnswer": "A inscrição documental não substitui a conformidade técnica do veículo."
    },
    "reviewedScope": "Arts. 1º–3º",
    "textPath": "/contran/961-2022.json"
  },
  {
    "number": 960,
    "year": 2022,
    "title": "Vidros: avaliar o conjunto e a área de visão",
    "subject": "Dispõe sobre os requisitos de segurança de vidros, a visibilidade para fins de circulação, o uso de vidros em veículos blindados e o uso de medidores de transmitância luminosa.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-12-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Revoga o art. 3º da Resolução 786/20 Revoga as Resoluções 216/06; 253/07; 254/07; 334/09; 385/11; 386/11; 580/16; 707/17 e 869/21 Alterada a partir de 2 de janeiro de 2023 pela Resolução 989/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9602022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 989",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9892022.pdf"
      }
    ],
    "sourceSha256": "f2523e474d2c0b959375284261338a86a334e415c8355ea1426db17a612774c2",
    "historical": false,
    "points": [
      "Nas áreas indispensáveis à dirigibilidade, o limite mínimo de transmitância é 70%.",
      "Película não refletiva deve preservar os limites do conjunto vidro-película.",
      "A 989/2022 alterou o regime das demais áreas: não copiar o antigo mínimo de 28% sem a ressalva atual."
    ],
    "warning": "A chancela da película não prova, sozinha, a transmitância final do conjunto. Este guia não esgota as dispensas, áreas excluídas nem a medição técnica.",
    "example": {
      "scenario": "Em uma área lateral indispensável à dirigibilidade, o conjunto vidro-película apresenta transmitância de 65%.",
      "question": "A película com chancela de 70% torna o conjunto conforme?",
      "answer": "Não. O requisito do caso é do conjunto, que ficou abaixo de 70%.",
      "variation": "O conjunto apresenta 75%, mas a película é refletiva.",
      "variationAnswer": "O percentual isolado não elimina a proibição específica de película refletiva."
    },
    "reviewedScope": "Arts. 4º, 8º e 10; alteração 989/2022",
    "textPath": "/contran/960-2022.json"
  },
  {
    "number": 959,
    "year": 2022,
    "title": "Ônibus M3: CAT e comprovação técnica",
    "subject": "Estabelece os requisitos de segurança para veículos de transporte de passageiros tipos micro-ônibus e ônibus, categoria M3, de fabricação nacional e importados.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Em Vigor em 1º de junho de 2022 Revoga as Resoluções 445/13; 629/16; 644/16 e 754/18",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9592022.pdf",
    "relatedSources": [],
    "sourceSha256": "54bffc991227481786dfd33567af33f74db38abd649577dcabaa22d331ddfbfa",
    "historical": false,
    "points": [
      "O objeto são ônibus e micro-ônibus da categoria M3, nacionais e importados.",
      "Pedidos de CAT precisam demonstrar atendimento aos requisitos previstos.",
      "A preservação de CAT antigo depende das condições do art. 3º, não apenas da data de emissão."
    ],
    "warning": "Não confundir CAT, CCT e CRLV-e. Os ensaios de estabilidade e estrutura são exigências próprias; não foram integralmente auditados neste guia.",
    "example": {
      "scenario": "Um fabricante pede CAT para ônibus M3 sem comprovar os requisitos técnicos que o art. 2º exige.",
      "question": "A identificação como M3 dispensa a comprovação?",
      "answer": "Não. A categoria define o recorte, mas o pedido precisa atender às exigências da resolução.",
      "variation": "O caso trata de micro-ônibus M2.",
      "variationAnswer": "Deve-se consultar o regime próprio da 939/2022; não aplicar automaticamente o guia da M3."
    },
    "reviewedScope": "Arts. 1º–3º",
    "textPath": "/contran/959-2022.json"
  },
  {
    "number": 958,
    "year": 2022,
    "title": "Emissões: motor, combustível e ano importam",
    "subject": "Dispõe sobre os limites de emissões de gases e partículas pelo escapamento de veículos automotores, sua fiscalização pelos agentes de trânsito, requisitos de controle de gases do cárter e sons produzidos por equipamentos utilizados em veículos.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Em Vigor em 1º de junho de 2022 Revoga a observação 9 do anexo V da Resolução 916/22 Revoga as Resoluções 507/76; 451/13; 452/13; 624/16 e 666/17",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9582022.pdf",
    "relatedSources": [],
    "sourceSha256": "821add1770727840c9c6730377ca91460733a0151f03824dea4c8614228e0cae",
    "historical": false,
    "points": [
      "A resolução abrange emissões, procedimentos de fiscalização, gases do cárter e sons de equipamentos.",
      "As tabelas do art. 3º para ciclo Otto distinguem ano de fabricação e combustível.",
      "O ato também revogou a observação 9 do Anexo V da 916/2022."
    ],
    "warning": "Não memorizar um único limite de CO para toda a frota. Este guia não certifica todas as tabelas, instrumentos ou normas ambientais referenciadas.",
    "example": {
      "scenario": "Uma questão aplica a mesma linha de limite de CO a veículos com anos e combustíveis diferentes, sem consultar a tabela.",
      "question": "A comparação é suficiente?",
      "answer": "Não. É preciso enquadrar ano de fabricação, combustível e procedimento na tabela aplicável.",
      "variation": "Os veículos têm o mesmo combustível, mas anos de fabricação distintos.",
      "variationAnswer": "A igualdade do combustível não dispensa verificar a faixa de ano de cada veículo."
    },
    "reviewedScope": "Arts. 1º–3º",
    "textPath": "/contran/958-2022.json"
  },
  {
    "number": 957,
    "year": 2022,
    "title": "Veículo de coleção: idade não basta",
    "subject": "Dispõe sobre os requisitos para registro e licenciamento de veículo de coleção.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Em Vigor em 1º de junho de 2022 Revoga as Resoluções 056/98 e 127/01",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9572022n2.pdf",
    "relatedSources": [],
    "sourceSha256": "f3f3f2bd2f25e0824203bfc655da86a632d63ce35cbf11b859822e46e31c58f6",
    "historical": false,
    "points": [
      "A definição do art. 2º exige antiguidade e valor histórico próprio, admitindo original ou modificado.",
      "A preservação de características é avaliada para o CVCOL nos termos próprios."
    ],
    "warning": "O art. 2º usa “mais de trinta anos” e o art. 3º usa “trinta anos ou mais”. O caso evita a fronteira exata; não criar exercício automático para resolver essa diferença textual.",
    "example": {
      "scenario": "Um veículo com 35 anos é apresentado como de coleção apenas pela idade, sem demonstrar valor histórico ou os demais requisitos.",
      "question": "A idade sozinha é suficiente?",
      "answer": "Não. A definição exige valor histórico próprio, e o registro e licenciamento seguem requisitos específicos.",
      "variation": "Um veículo com 35 anos tem valor histórico e atende aos requisitos comprovados para seu registro.",
      "variationAnswer": "O enquadramento passa pela antiguidade e pelos demais requisitos; não pela idade isolada."
    },
    "reviewedScope": "Arts. 2º–3º",
    "textPath": "/contran/957-2022.json"
  },
  {
    "number": 956,
    "year": 2022,
    "title": "Eixo elétrico auxiliar: auxiliar não substitui tração",
    "subject": "Estabelece os requisitos para produção de veículos tipo semirreboque com eixo elétrico auxiliar e sua instalação.",
    "issueDate": "2022-05-17",
    "publicationDate": "2022-05-25",
    "lastRelatedActDate": "2022-05-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexo Em Vigor em 1º de junho de 2022",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9562022.pdf",
    "relatedSources": [],
    "sourceSha256": "583274c4c9dc9477902d6934abdc4eec24622bc11ef028e53039f6dc33368d05",
    "historical": false,
    "points": [
      "O eixo converte energia regenerada em torque auxiliar, sem substituir a tração principal.",
      "Mesmo instalado opcionalmente, deve cumprir os requisitos do Anexo.",
      "Semirreboque com eixo elétrico precisa de código específico e CAT, conforme o art. 2º."
    ],
    "warning": "Opcionalidade de instalação não dispensa segurança, ensaios ou identificação específica.",
    "example": {
      "scenario": "Um fabricante instala o eixo como opcional e afirma que, por isso, não precisa atender ao Anexo.",
      "question": "A justificativa procede?",
      "answer": "Não. O art. 1º, § 2º determina atendimento mesmo na instalação opcional.",
      "variation": "O equipamento é descrito como substituto completo da tração principal.",
      "variationAnswer": "Isso não corresponde à definição de eixo elétrico auxiliar estudada no art. 1º."
    },
    "reviewedScope": "Arts. 1º–2º",
    "textPath": "/contran/956-2022.json"
  },
  {
    "number": 955,
    "year": 2022,
    "title": "Bicicleta externa: placa e lanternas precisam aparecer",
    "subject": "Dispõe sobre o transporte de cargas ou bicicletas nas partes externas dos veículos dos tipos automóvel, caminhonete, camioneta e utilitário.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga as Resoluções 349/10 e 589/16",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9552022.pdf",
    "relatedSources": [],
    "sourceSha256": "09d9fc332a39b19014e59a3e305df6685520f1eabe442a78d305cc8739695335",
    "historical": false,
    "points": [
      "Carga e suporte precisam respeitar limites do veículo e dos fabricantes.",
      "Encobrimento da sinalização exige régua de sinalização; encobrimento da placa exige segunda placa traseira.",
      "Amarração não pode comprometer visibilidade e estabilidade."
    ],
    "warning": "Não corrigir o encobrimento da placa com papel manuscrito. As exigências de placa e sinalização são distintas e podem coexistir.",
    "example": {
      "scenario": "Bicicletas no suporte traseiro encobrem tanto a placa quanto as lanternas.",
      "question": "Basta instalar uma segunda placa?",
      "answer": "Não. O art. 5º exige a solução de identificação e, para a sinalização encoberta, a régua correspondente.",
      "variation": "As lanternas estão livres, mas a placa continua parcialmente coberta.",
      "variationAnswer": "A exigência relativa à placa permanece; “parcialmente” também está abrangido."
    },
    "reviewedScope": "Arts. 2º–6º",
    "textPath": "/contran/955-2022.json"
  },
  {
    "number": 954,
    "year": 2022,
    "title": "Estabilidade: cronograma corrigido pela Deliberação 264",
    "subject": "Dispõe sobre a obrigatoriedade do uso do sistema de controle de estabilidade nos veículos das categorias M1, M2, M3, N1, N2, N3, O3 e O4 novos saídos de fábrica, nacionais e importados.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-10-31",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga as Resoluções 567/15 e 641/16 Revoga as Arts. 2º e 3º da Resolução 799/20 Alterada pela Deliberação 264",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9542022.pdf",
    "relatedSources": [
      {
        "label": "Deliberação 264/2022",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/deliberacoes/Deliberacao2642022.pdf"
      }
    ],
    "sourceSha256": "56fa725fd66a8943186dcbe62f6e5f8e6fb9145e481117b281b4048288c19897",
    "historical": false,
    "points": [
      "O sistema exigido depende da categoria e das alternativas permitidas no art. 3º.",
      "A Deliberação 264 corrigiu os marcos de projeto do cronograma.",
      "Para M2, M3, N2, N3, O3 e O4, o marco dos projetos novos passou a 1º/07/2023; os anteriores seguem a exigência a partir de 1º/01/2025."
    ],
    "warning": "Não usar o PDF original sozinho para o art. 7º. A alteração substitui datas do projeto e não significa que todos os veículos antigos em circulação devem receber adaptação.",
    "example": {
      "scenario": "Uma questão sobre o cronograma mantém 14/12/2016 como marco de projeto dos veículos do inciso II, ignorando a Deliberação 264.",
      "question": "A data continua sendo a referência desse inciso?",
      "answer": "Não. A deliberação alterou o marco para 1º/07/2023, com o regime dos projetos anteriores indicado no inciso.",
      "variation": "A pergunta exige adaptação universal de qualquer veículo usado, apenas porque chegou 2025.",
      "variationAnswer": "O cronograma é de veículos produzidos/importados no recorte da norma; não autoriza essa extensão universal."
    },
    "reviewedScope": "Arts. 1º–3º e 7º; Deliberação 264/2022",
    "textPath": "/contran/954-2022.json"
  },
  {
    "number": 953,
    "year": 2022,
    "title": "Protetor lateral: dispensa de região não é dispensa total",
    "subject": "Estabelece os requisitos técnicos de fabricação e instalação do protetor lateral para veículos de carga.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-12-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga as Resoluções 323/09 e 377/11 Alterada a partir de 2 de janeiro de 2023 pela Resolução 987/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9532022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 987",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9872022.pdf"
      }
    ],
    "sourceSha256": "758f8bc4a506dfd26f8ad17924babba003b252aa81a6699b0c12c29a5bc29e01",
    "historical": false,
    "points": [
      "O art. 2º trata de caminhões, reboques e semirreboques com PBT superior a 3.500 kg, no recorte de fabricação e alterações definido.",
      "A 987/2022 mudou a dispensa da região posterior aos eixos para carroçaria basculante ou silo basculante.",
      "O art. 3º enumera regiões longitudinais dispensadas."
    ],
    "warning": "Não generalizar a dispensa de uma região para todo o veículo. Ler o inciso IV na redação de 2023, não na original.",
    "example": {
      "scenario": "Um caminhão basculante invoca a dispensa da região posterior aos eixos para retirar também a proteção exigida em outra região.",
      "question": "A dispensa autoriza a retirada integral?",
      "answer": "Não. O art. 3º trata de regiões determinadas, não de autorização geral para retirar o equipamento.",
      "variation": "A pergunta se limita à região posterior aos eixos do caminhão com carroçaria basculante.",
      "variationAnswer": "É necessário considerar a redação do inciso IV dada pela 987/2022."
    },
    "reviewedScope": "Arts. 2º–3º; alteração 987/2022",
    "textPath": "/contran/953-2022.json"
  },
  {
    "number": 952,
    "year": 2022,
    "title": "Para-choque traseiro: categoria e alteração do veículo",
    "subject": "Estabelece as especificações técnicas para a fabricação e a instalação de para-choques traseiros nos veículos de fabricação nacional ou importados das categorias N2, N3, O3 e O4.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga as Resoluções 593/16; 645/16 e 674/17",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9522022.pdf",
    "relatedSources": [],
    "sourceSha256": "47fa0150b323a2edd1a5d4758c637f8813fda7a02ccf6ea7b329025ff99b5403",
    "historical": false,
    "points": [
      "O recorte abrange N2, N3, O3 e O4.",
      "O art. 3º alcança fabricação ou importação a partir de 1º/01/2017.",
      "Alterações que exigem inspeção para CSV também atraem as especificações do Anexo I, conforme o § 1º."
    ],
    "warning": "Não usar o marco de 2017 para dispensar automaticamente um veículo modificado enquadrado no § 1º. Ensaios e exceções têm disciplina própria.",
    "example": {
      "scenario": "Um veículo da categoria alcançada sofreu modificação que exige CSV; o responsável diz que seu ano antigo basta para afastar todas as especificações.",
      "question": "O argumento resolve o caso?",
      "answer": "Não. O art. 3º, § 1º também disciplina as alterações com inspeção exigida para CSV.",
      "variation": "A questão descreve automóvel M1 comum.",
      "variationAnswer": "Ele não entra no recorte de categorias do art. 1º apenas porque possui para-choque traseiro."
    },
    "reviewedScope": "Arts. 1º–3º",
    "textPath": "/contran/952-2022.json"
  },
  {
    "number": 951,
    "year": 2022,
    "title": "Cintos e ancoragem: conjunto técnico, não só presença",
    "subject": "Estabelece os requisitos de instalação e os procedimentos de ensaios de cintos de segurança, ancoragem e apoios de cabeça dos veículos automotores.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2023-09-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Alterada a partir de 02 de outubro de 2023 pela Resolução 997/23 Anexos Revoga as Resoluções 278/08; 518/15 e 551/15",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9512022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 997",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9972023.pdf"
      }
    ],
    "sourceSha256": "a41b468b4fadc5428cf6a8eb73994c24e057f5293277781bea06845388504369",
    "historical": false,
    "points": [
      "Cinto, ancoragem e apoio de cabeça têm requisitos técnicos nos anexos.",
      "O art. 3º define o recorte de produção/importação a partir de 30/01/2020.",
      "A 997/2023 alterou o Anexo I quanto aos apoios de cabeça; consultar a redação atual do ponto específico."
    ],
    "warning": "Ter um cinto instalado não prova que sua ancoragem atende ao ensaio. As exceções de apoio de cabeça não se transformam em dispensa universal de cintos.",
    "example": {
      "scenario": "Um fabricante demonstra somente que há cintos, sem verificar a ancoragem exigida.",
      "question": "A demonstração cobre todos os requisitos estudados?",
      "answer": "Não. O art. 2º exige o atendimento técnico dos cintos, da ancoragem e dos apoios de cabeça, conforme sua aplicação.",
      "variation": "Uma hipótese de exceção da 997/2023 é citada para dispensar todos os cintos do veículo.",
      "variationAnswer": "A exceção precisa ser aplicada ao item e ao recorte exatos; não se amplia automaticamente para outros equipamentos."
    },
    "reviewedScope": "Arts. 1º–3º; alteração 997/2023",
    "textPath": "/contran/951-2022.json"
  },
  {
    "number": 950,
    "year": 2022,
    "title": "Transporte internacional: inspeção e certificado",
    "subject": "Dispõe sobre a atribuição de competência para a realização da inspeção técnica veicular nos veículos utilizados no transporte rodoviário internacional de cargas e passageiros.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Revoga as Resoluções 247/07; 359/10 e 379/11",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9502022.pdf",
    "relatedSources": [],
    "sourceSha256": "6dbccd76cd408cb9635af75709e4173949963d2b463644eda5b18104bc57d76e",
    "historical": false,
    "points": [
      "O órgão máximo executivo de trânsito da União realiza a inspeção por empresas licenciadas no regime do art. 2º.",
      "Veículo aprovado recebe selo de segurança vinculado ao certificado.",
      "O certificado é de porte obrigatório na forma prevista pela resolução."
    ],
    "warning": "Não confundir o selo com dispensa do certificado, nem empresa licenciada com qualquer oficina.",
    "example": {
      "scenario": "Um veículo de transporte rodoviário internacional aprovado traz o selo no para-brisa, mas seu responsável diz que não precisa portar o certificado.",
      "question": "O selo elimina o requisito documental?",
      "answer": "Não. O art. 3º vincula selo e certificado e exige o porte deste nos termos da resolução.",
      "variation": "A inspeção foi feita por oficina sem o licenciamento exigido para essa atividade.",
      "variationAnswer": "O vínculo com empresa licenciada também integra o regime de competência do art. 2º."
    },
    "reviewedScope": "Arts. 1º–3º",
    "textPath": "/contran/950-2022.json"
  },
  {
    "number": 949,
    "year": 2022,
    "title": "Impacto lateral: retificação muda datas do cronograma",
    "subject": "Estabelece os requisitos de proteção aos ocupantes de veículos em casos de impacto lateral contra barreira deformável e em casos de impacto lateral em poste.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-06-07",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga as Resoluções 721/18 e 751/18 Revoga o Art. 6º da Resolução 799/20 Retificação",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9492022.pdf",
    "relatedSources": [
      {
        "label": "Retificação da 949",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9492022R.pdf"
      }
    ],
    "sourceSha256": "9b1505055be305a5358bded0622340a69a1c3ee11d762a9a6dffaa20f91a09cf",
    "historical": false,
    "points": [
      "Impacto lateral contra barreira e impacto contra poste têm ensaios próprios.",
      "A retificação do art. 5º, I, a substituiu 22/01/2018 por 1º/01/2020.",
      "A retificação do art. 5º, II, a substituiu 31/12/2018 por 1º/01/2026."
    ],
    "warning": "Em outubro de 2026, não apresentar o marco de janeiro de 2026 como futuro. O alcance depende do ensaio, categoria e condições do dispositivo; o cronograma original está retificado.",
    "example": {
      "scenario": "Uma questão exige a data do art. 5º, II, a e oferece apenas a redação original de 31/12/2018.",
      "question": "Qual marco consta da retificação oficial?",
      "answer": "1º de janeiro de 2026. O PDF original deve ser lido com a retificação de 07/06/2022.",
      "variation": "A pergunta se refere ao art. 5º, I, a.",
      "variationAnswer": "Nesse outro dispositivo, a data corrigida é 1º de janeiro de 2020; não trocar os dois marcos."
    },
    "reviewedScope": "Arts. 1º–5º, com foco na retificação de 07/06/2022",
    "textPath": "/contran/949-2022.json"
  },
  {
    "number": 948,
    "year": 2022,
    "title": "Retrorrefletivos: a transição de 2024 já terminou",
    "subject": "Estabelece os requisitos técnicos para o emprego de película retrorrefletiva em veículos.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-12-26",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga a Resolução 643/16 Alterada pela Deliberação 263/22",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9482022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 981",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9812022.pdf"
      },
      {
        "label": "Deliberação 263/2022",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/deliberacoes/Deliberacao2632022.pdf"
      }
    ],
    "sourceSha256": "4913ca4062bac5feecd4fe75ccb7f6eaff849c44ca3286eca77ce33379e4b1b6",
    "historical": false,
    "points": [
      "Película retrorrefletiva aumenta a visibilidade diurna e noturna.",
      "As categorias do art. 2º devem atender às disposições dos anexos.",
      "O prazo da descrição “APROVADO SENATRAN” foi estendido até 1º/01/2024."
    ],
    "warning": "A transição não permanece aberta em 2026. Película retrorrefletiva de sinalização não é película de escurecimento de vidro, regulada por outro ato.",
    "example": {
      "scenario": "Um responsável invoca em 2026 a extensão até janeiro de 2024 para continuar sem a descrição exigida.",
      "question": "O prazo antigo ainda justifica a falta?",
      "answer": "Não. A extensão tem marco encerrado; é necessário aplicar a exigência e suas condições atuais.",
      "variation": "A pergunta trata de película escura no para-brisa.",
      "variationAnswer": "O objeto muda: deve-se consultar o regime de vidros da 960/2022 e sua alteração, não a 948."
    },
    "reviewedScope": "Arts. 1º–3º e 8º; Deliberação 263/2022 e ratificação 981/2022",
    "textPath": "/contran/948-2022.json"
  },
  {
    "number": 946,
    "year": 2022,
    "title": "Granel: conter e cobrir a carga",
    "subject": "Dispõe sobre o transporte de cargas de sólidos a granel nas vias abertas à circulação pública em todo o território.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Revoga as Resoluções 441/13; 499/14; 618/16 e 664/17",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9462022.pdf",
    "relatedSources": [],
    "sourceSha256": "1b91a007fceff406f34ecfd16c3d2835b5c384484d8e9a3aed9db265440f9343",
    "historical": false,
    "points": [
      "Carga sólida a granel não está acondicionada em embalagem.",
      "Nas hipóteses do art. 2º, cobertura deve ser integral, ancorada e conservada.",
      "A regra geral tem ressalva para transporte com regulamentação específica."
    ],
    "warning": "Guardas laterais não substituem a cobertura exigida. A previsão especial da cana inteira não autoriza cordas em qualquer carga.",
    "example": {
      "scenario": "Areia é transportada diretamente em carroceria aberta com laterais fechadas, mas sem a cobertura exigida.",
      "question": "As laterais bastam?",
      "answer": "Não. Nas condições do art. 2º, também é necessária cobertura integral e eficaz, sem prejudicar equipamentos obrigatórios.",
      "variation": "O veículo possui cobertura, mas a areia ultrapassa os limites da carroceria.",
      "variationAnswer": "A cobertura não elimina a exigência de respeitar os limites da carroceria do art. 2º, § 4º."
    },
    "reviewedScope": "Arts. 2º–3º",
    "textPath": "/contran/946-2022.json"
  },
  {
    "number": 945,
    "year": 2022,
    "title": "Amarração: corda da lona não amarra a carga",
    "subject": "Fixa os requisitos mínimos de segurança para amarração das cargas transportadas em veículos de carga.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga as Resoluções 552/15; 631/16 e 676/17",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9452022.pdf",
    "relatedSources": [],
    "sourceSha256": "7c1f561b92dd67b37bfb3d94783a22ec82fc991d90823a11c19159c64d9909c9",
    "historical": false,
    "points": [
      "Amarração e ancoragem devem conter a carga nas condições esperadas da viagem.",
      "O art. 4º prevê cintas, correntes ou cabos de aço e requisitos de capacidade.",
      "Cordas são proibidas para amarração da carga, mas podem fixar a lona de cobertura."
    ],
    "warning": "A regra geral não elimina regimes específicos ou veículos com sistema próprio de contenção, nos termos do art. 2º. Não confundir cobertura com amarração.",
    "example": {
      "scenario": "Em transporte sujeito à regra geral, caixas são amarradas apenas por cordas.",
      "question": "É suficiente se a corda parecer resistente?",
      "answer": "Não. O art. 4º, § 3º proíbe cordas como dispositivo de amarração da carga.",
      "variation": "A carga está amarrada com os dispositivos adequados e a corda prende somente a lona.",
      "variationAnswer": "Esse uso da corda é admitido pela ressalva; ainda devem ser cumpridos os demais requisitos de segurança."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/945-2022.json"
  },
  {
    "number": 944,
    "year": 2022,
    "title": "Identificação auxiliar: não é base do AIT",
    "subject": "Dispõe sobre o dispositivo auxiliar de identificação veicular.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga as Resoluções 370/10; 387/11; 575/15 e 616/16",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9442022.pdf",
    "relatedSources": [],
    "sourceSha256": "eb16406adc5734b417b1524ddb8c9f338c4824e069b315a1cb7b943782694d27",
    "historical": false,
    "points": [
      "O sistema auxiliar de identificação é facultativo, respeitadas as especificações.",
      "O art. 3º veda fundamentar a identificação para AIT nesse sistema auxiliar.",
      "Caracteres diferentes da placa de registro têm consequência específica no art. 4º."
    ],
    "warning": "Faixa de identificação auxiliar não substitui a placa oficial, mesmo que seja mais fácil de visualizar.",
    "example": {
      "scenario": "O agente identifica o veículo para o AIT exclusivamente pela inscrição auxiliar, sem fundamento na identificação oficial.",
      "question": "O procedimento atende ao art. 3º?",
      "answer": "Não. A norma impede que a identificação para o AIT se fundamente no sistema auxiliar.",
      "variation": "A inscrição auxiliar coincide com a placa, mas é apresentada como obrigatória para toda a frota.",
      "variationAnswer": "O art. 2º trata de uso facultativo; coincidência de caracteres não altera a natureza dessa previsão."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/944-2022.json"
  },
  {
    "number": 943,
    "year": 2022,
    "title": "Motofrete e mototáxi: categoria e equipamentos",
    "subject": "Estabelece requisitos mínimos de segurança para o transporte remunerado de passageiros (mototáxi) e de cargas (motofrete) em motocicleta e motoneta, e dá outras providências.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga as Resoluções 251/07; 356/10 e 378/11",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9432022.pdf",
    "relatedSources": [],
    "sourceSha256": "5bd331bb20e2cf1a4103a557dd7d4a8956ed3f7996876f5e4b8a177aba40c084",
    "historical": false,
    "points": [
      "Veículo autorizado para transporte remunerado deve ser registrado na categoria aluguel.",
      "A proteção de pernas e motor e o aparador de linha integram os equipamentos do art. 3º.",
      "A autorização do serviço e as exigências do veículo são requisitos diferentes."
    ],
    "warning": "Não confundir categoria de aluguel do veículo com categoria da CNH. Este guia não certifica todas as exigências pessoais ou municipais do serviço.",
    "example": {
      "scenario": "Uma motocicleta foi autorizada para motofrete, mas continua registrada como particular.",
      "question": "A autorização dispensa o registro na categoria aluguel?",
      "answer": "Não. O art. 2º exige a categoria de registro adequada para o serviço remunerado autorizado.",
      "variation": "O registro está correto, mas falta um equipamento de segurança exigido no art. 3º.",
      "variationAnswer": "A categoria correta não substitui as exigências dos equipamentos."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/943-2022.json"
  },
  {
    "number": 942,
    "year": 2022,
    "title": "Siderúrgicos: classificar a carga antes de amarrar",
    "subject": "Estabelece as exigências sobre a análise, comparação e transporte de material siderúrgico para veículos rodoviários e de carga.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Em vigor Anexos Revoga as Resoluções 701/17; 767/18 e 821/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9422022.pdf",
    "relatedSources": [],
    "sourceSha256": "20df5cf12ec80e8aff9077ea837799cd819e7360ef36a838608b7465b8974c8e",
    "historical": false,
    "points": [
      "A classificação distingue produtos siderúrgicos e seus insumos.",
      "O carvão, a granel ou ensacado, é considerado insumo pelo art. 3º.",
      "Arrumação e amarração seguem as condições específicas da resolução."
    ],
    "warning": "Não aplicar uma única configuração a barras, bobinas e outros materiais diferentes. Este guia não certifica os esquemas técnicos de cada tipo.",
    "example": {
      "scenario": "Uma questão exclui o carvão ensacado do regime sob a justificativa de que não é produto metálico acabado.",
      "question": "A exclusão corresponde ao art. 3º?",
      "answer": "Não. A resolução considera o carvão a granel ou ensacado como insumo de produtos siderúrgicos.",
      "variation": "O caso troca barras por bobinas e mantém a configuração de amarração sem reavaliar a carga.",
      "variationAnswer": "É preciso conferir as condições próprias do material; a classificação interfere na arrumação e contenção."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/942-2022.json"
  },
  {
    "number": 941,
    "year": 2022,
    "title": "Vistoria de identificação: habilitação prévia",
    "subject": "Estabelece procedimentos para o exercício da atividade de vistoria de identificação veicular a ser realizada pelos órgãos e entidades executivos de trânsito dos Estados e do Distrito Federal, ou por pessoa jurídica de direito público ou privado, habilitada para a prestação dos serviços de vistoria veicular.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-07-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Alterada a partir de 1º de agosto de 2022 pela Resolução 977/22 Revoga as Resoluções 466/13; 496/14; 737/18 e 781/20",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9412022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 977",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9772022.pdf"
      }
    ],
    "sourceSha256": "3215840c6ec3d2f3a9a7af22d0c539270e0686c71418b92c172d9cb773d8880f",
    "historical": false,
    "points": [
      "A responsabilidade da vistoria de identificação é do órgão executivo estadual ou distrital.",
      "Pessoa jurídica pública ou privada pode prestar o serviço quando previamente habilitada.",
      "A vistoria de identificação não é automaticamente a inspeção técnica para emissão de CSV."
    ],
    "warning": "A 977/2022 alterou o regime de habilitação; consultar suas condições para casos específicos. Este guia não dá autorização genérica para vistoria móvel.",
    "example": {
      "scenario": "Uma empresa privada oferece vistoria de identificação sem a habilitação prevista.",
      "question": "Ser pessoa jurídica privada basta?",
      "answer": "Não. O art. 2º admite a execução por pessoa jurídica previamente habilitada, mantendo a responsabilidade do órgão de trânsito.",
      "variation": "A empresa é habilitada e a hipótese exige vistoria de identificação.",
      "variationAnswer": "A condição de prestador foi atendida, mas o procedimento e o laudo ainda precisam seguir as regras aplicáveis."
    },
    "reviewedScope": "Arts. 1º–2º; leitura com a alteração 977/2022",
    "textPath": "/contran/941-2022.json"
  },
  {
    "number": 940,
    "year": 2022,
    "title": "Capacete: óculos comuns não substituem proteção",
    "subject": "Disciplina o uso de capacete para condutor e passageiro de motocicletas, motonetas, ciclomotores, triciclos motorizados e quadriciclos motorizados.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Revoga as Resoluções 453/13; 680/17 e 846/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9402022.pdf",
    "relatedSources": [],
    "sourceSha256": "d9ce096ccc33966f87ac336bbae87d014bf0609c158815e34f6d3cdc37a6cc6c",
    "historical": false,
    "points": [
      "Capacete precisa estar afixado pela cinta jugular e engate abaixo do maxilar inferior.",
      "Capacete deve ter viseira ou, na ausência dela, óculos de proteção.",
      "Óculos de sol, corretivos ou EPI usados isoladamente não substituem os óculos de proteção."
    ],
    "warning": "As regras não se aplicam aos triciclos e quadriciclos com cabine fechada indicados no art. 1º. Exceção de cabine não é dispensa para motocicleta aberta.",
    "example": {
      "scenario": "Um motociclista usa capacete sem viseira e somente óculos de grau.",
      "question": "Os óculos de grau, sozinhos, atendem à exigência?",
      "answer": "Não. O art. 4º, § 2º proíbe usá-los isoladamente em substituição aos óculos de proteção.",
      "variation": "Usa óculos de proteção que permitem os óculos de grau simultaneamente.",
      "variationAnswer": "Essa combinação é prevista na definição do § 1º, respeitadas as condições de uso e os demais requisitos."
    },
    "reviewedScope": "Arts. 1º–4º",
    "textPath": "/contran/940-2022.json"
  },
  {
    "number": 939,
    "year": 2022,
    "title": "Micro-ônibus M2: cronograma retificado",
    "subject": "Estabelece os requisitos de segurança para veículos de transporte de passageiros tipo micro-ônibus, categoria M2, de fabricação nacional e importado.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-05-27",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Revoga as Resoluções 416/12; 505/14; 646/16 e 753/18 Retificação",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9392022.pdf",
    "relatedSources": [
      {
        "label": "Retificação da 939",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9392022R.pdf"
      }
    ],
    "sourceSha256": "a1e7da37e6b9e6daa45e862b3fbbd19eb1513ad3213b9be8e0305b6c0a144d57",
    "historical": false,
    "points": [
      "A resolução se aplica a micro-ônibus da categoria M2.",
      "A retificação substituiu o marco do projeto no art. 4º, I por 1º/01/2023.",
      "O inciso II prevê o alcance geral dos requisitos da Tabela 2 a partir de 1º/01/2025, no recorte do dispositivo."
    ],
    "warning": "Não memorizar 28/12/2018 do PDF original no inciso retificado. M2 e M3 têm normas técnicas distintas.",
    "example": {
      "scenario": "A questão apresenta 28/12/2018 como marco de projeto vigente no art. 4º, I.",
      "question": "Qual correção precisa ser considerada?",
      "answer": "A retificação oficial de 27/05/2022 passou o marco para 1º de janeiro de 2023.",
      "variation": "O caso trata de ônibus da categoria M3.",
      "variationAnswer": "Consulte o regime próprio da 959/2022, em vez de transferir automaticamente o cronograma da M2."
    },
    "reviewedScope": "Arts. 1º–4º; retificação de 27/05/2022",
    "textPath": "/contran/939-2022.json"
  },
  {
    "number": 938,
    "year": 2022,
    "title": "Cronotacógrafo: registros além da velocidade",
    "subject": "Dispõe sobre requisitos técnicos mínimos do registrador instantâneo e inalterável de velocidade e tempo (cronotacógrafo).",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 092/99 e 406/12 Revoga a Art. 2º da Resolução 786/20",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9382022.pdf",
    "relatedSources": [],
    "sourceSha256": "d33fe3ce62400a855cb9604a452b8d50ff223f338157de3d9695d59978ed0915",
    "historical": false,
    "points": [
      "O aparelho registra velocidade e tempo de forma instantânea e inalterável.",
      "Pode ser mecânico, eletrônico ou integrar conjunto computadorizado.",
      "O art. 3º exige informações das últimas 24 horas de operação, incluindo distância e interrupções."
    ],
    "warning": "“Últimas 24 horas de operação” não é um prazo trabalhista de jornada autorizada. Este guia não certifica os limites legais de trabalho e descanso.",
    "example": {
      "scenario": "Um aparelho mostra apenas a velocidade atual, sem os registros mínimos das últimas 24 horas de operação.",
      "question": "Isso atende ao art. 3º?",
      "answer": "Não. A norma exige as informações mínimas de operação, não apenas um velocímetro instantâneo.",
      "variation": "O cronotacógrafo integra um conjunto computadorizado que exerce outras funções.",
      "variationAnswer": "A integração é admitida pelo art. 2º, desde que preserve as funções e os requisitos exigidos."
    },
    "reviewedScope": "Arts. 1º–4º",
    "textPath": "/contran/938-2022.json"
  },
  {
    "number": 937,
    "year": 2022,
    "title": "Engate: capacidade declarada pelo fabricante",
    "subject": "Dispõe sobre o dispositivo de acoplamento mecânico para reboque (engate) utilizado em veículos com peso bruto total de até 3.500 kg e dá outras providências.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 197/06 e 234/07",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9372022.pdf",
    "relatedSources": [],
    "sourceSha256": "2a4bfdbadcfc7408dfca9c43cd977effa8c5d32992b5ea252542ee999f78068d",
    "historical": false,
    "points": [
      "O recorte inclui veículos com PBT de até 3.500 kg com capacidade de tracionar declarada.",
      "A norma trata do engate não original de fábrica e exige requisitos próprios.",
      "A plaqueta de rastreabilidade informa fabricante, modelo de aplicação e outras características."
    ],
    "warning": "Instalar engate não cria capacidade de tração que o fabricante não declarou. O índice traz “01.04.222”; adotada a publicação de 01/04/2022 confirmada no PDF oficial. O objeto não é qualquer engate de qualquer veículo.",
    "example": {
      "scenario": "Um veículo de 3.000 kg recebe engate, mas não possui capacidade de tracionar reboques declarada pelo fabricante.",
      "question": "O peso abaixo de 3.500 kg basta para autorizar a utilização no regime estudado?",
      "answer": "Não. O art. 1º também exige a capacidade declarada de tracionar.",
      "variation": "Há capacidade declarada, mas o engate não atende ao licenciamento e requisitos aplicáveis.",
      "variationAnswer": "A capacidade do veículo é necessária, mas não substitui a conformidade do acessório."
    },
    "reviewedScope": "Arts. 1º–4º",
    "publicationIndexDate": "01.04.222",
    "textPath": "/contran/937-2022.json"
  },
  {
    "number": 936,
    "year": 2022,
    "title": "Aviso do cinto: posição do condutor e retificação",
    "subject": "Dispõe sobre a obrigatoriedade da instalação de dispositivo de aviso de não afivelamento dos cintos de segurança",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-07-07",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga o art. 7º da Resolução 799/20 e a Resolução 760/18 Retificação",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9362022.pdf",
    "relatedSources": [
      {
        "label": "Retificação da 936",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/resolucao9362022R.pdf"
      }
    ],
    "sourceSha256": "376ed27631ac85bdeadf8bd75030286e0f7eed7c414739bdc4bad2bfe6b2a664",
    "historical": false,
    "points": [
      "A posição do condutor deve ter o aviso de não afivelamento, conforme aplicação da norma.",
      "Quando instalados nas posições dos passageiros indicados no art. 3º, os dispositivos também precisam cumprir os requisitos.",
      "O cronograma usa 1º/01/2021 como marco de projeto após a retificação; o inciso II alcança os projetos anteriores a partir de 1º/01/2024."
    ],
    "warning": "Aviso sonoro/visual não substitui a obrigação de usar o cinto. Não repetir 31/12/2018 do cronograma original retificado.",
    "example": {
      "scenario": "Uma questão descreve o aviso do assento do condutor como facultativo em veículo abrangido pelo art. 2º.",
      "question": "A classificação é correta?",
      "answer": "Não. A posição do condutor tem exigência obrigatória no regime aplicável.",
      "variation": "A questão pede o marco do projeto do art. 4º, I após a retificação.",
      "variationAnswer": "O marco é 1º de janeiro de 2021, e não 31 de dezembro de 2018."
    },
    "reviewedScope": "Arts. 1º–4º; retificação de 07/07/2022",
    "textPath": "/contran/936-2022.json"
  },
  {
    "number": 935,
    "year": 2022,
    "title": "Rochas ornamentais: verificação durante o percurso",
    "subject": "Dispõe sobre os requisitos de segurança para o transporte de blocos e chapas serradas de rochas ornamentais.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexo Revoga as Resoluções 354/10 e 790/20",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9352022.pdf",
    "relatedSources": [],
    "sourceSha256": "7d22c013b55ce10887ff127111cec2fc3af6d0c63121b8a94f7ebaa790e4fad6",
    "historical": false,
    "points": [
      "O transporte de blocos e chapas serradas exige condutor aprovado e certificado em CETCI.",
      "O condutor deve verificar periodicamente travas e tensionamento durante o percurso.",
      "Reaperto é necessário quando a verificação demonstrar a necessidade."
    ],
    "warning": "Inspeção antes da partida não dispensa as verificações periódicas. O conteúdo e a realização atual do curso devem ser conferidos na regulamentação de formação vigente.",
    "example": {
      "scenario": "O motorista verifica a amarração somente antes da saída e recusa qualquer conferência durante a viagem.",
      "question": "A conduta atende ao art. 4º?",
      "answer": "Não. A norma atribui ao condutor verificação periódica durante o percurso, com reaperto quando necessário.",
      "variation": "A verificação do percurso revela afrouxamento das cintas.",
      "variationAnswer": "Deve realizar o reaperto necessário; a conferência não é mera formalidade."
    },
    "reviewedScope": "Arts. 3º–4º",
    "textPath": "/contran/935-2022.json"
  },
  {
    "number": 932,
    "year": 2022,
    "title": "RENAINF: autuar e arrecadar são funções distintas",
    "subject": "Dispõe sobre a organização e o funcionamento do Registro Nacional de Infrações de Trânsito (RENAINF), de que trata o inciso XXX do art. 19 do Código de Trânsito Brasileiro (CTB).",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 637/16 e 677/17",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9322022.pdf",
    "relatedSources": [],
    "sourceSha256": "599e61f21ee948aab0e3bf8f774bcda832b9f218c15c609722a8727d389caf40",
    "historical": false,
    "points": [
      "O registro nacional integra-se ao RENAVAM e ao RENACH.",
      "Órgão autuador autua, julga defesa de autuação e aplica multa no recorte definido.",
      "Órgão arrecadador efetua cobrança e recebimento, segundo a definição do art. 4º."
    ],
    "warning": "Receber o valor da multa não transforma, por si só, o arrecadador no autor da autuação ou julgador da defesa.",
    "example": {
      "scenario": "Um órgão recebe o pagamento da multa e é tratado como autuador apenas por esse recebimento.",
      "question": "As duas funções são necessariamente iguais?",
      "answer": "Não. As definições do art. 4º distinguem autuação e arrecadação; podem envolver órgãos com funções diferentes.",
      "variation": "A pergunta indica o órgão que efetivamente autuou e aprecia a defesa da autuação.",
      "variationAnswer": "A função descrita corresponde ao órgão autuador, não somente à arrecadação."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/932-2022.json"
  },
  {
    "number": 931,
    "year": 2022,
    "title": "SNE: adesão e disponibilização da notificação",
    "subject": "Estabelece o Sistema de Notificação Eletrônica (SNE).",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 622/16 e 636/16",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9312022.pdf",
    "relatedSources": [],
    "sourceSha256": "d3318afc884001ffd232d88e7fcb4385187a5061ca72d06893619eda13b93d80",
    "historical": false,
    "points": [
      "O SNE é meio de comunicação virtual mediante adesão prévia.",
      "Abrange notificações e meios de defesa e recurso previstos no art. 4º.",
      "A expedição da notificação de autuação corresponde à efetiva disponibilização no sistema, registrada, para o prazo de 30 dias referido no art. 5º."
    ],
    "warning": "Não confundir expedição com o momento em que o usuário abre a mensagem. Este guia não promete desconto automático por instalar aplicativo.",
    "example": {
      "scenario": "No regime do SNE aplicável, a notificação é disponibilizada e registrada, mas o usuário só a abre dias depois.",
      "question": "A abertura tardia é o marco da expedição do art. 5º?",
      "answer": "Não. O dispositivo usa a efetiva disponibilização no SNE, devidamente registrada.",
      "variation": "A questão afirma que o sistema serve apenas para enviar multas, sem comportar defesa prévia ou recurso.",
      "variationAnswer": "A afirmação não corresponde ao art. 4º, que contempla esses instrumentos de comunicação."
    },
    "reviewedScope": "Arts. 2º, 4º–5º",
    "textPath": "/contran/931-2022.json"
  },
  {
    "number": 927,
    "year": 2022,
    "title": "Aptidão: restrição não é inaptidão definitiva",
    "subject": "Dispõe sobre o exame de aptidão física e mental, a avaliação psicológica e o credenciamento das entidades públicas e privadas de que tratam o art. 147, I e §§ 1º a 4º e o art. 148 da Lei nº 9.503, de 23 de setembro de 1997, que institui o Código de Trânsito Brasileiro.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Revoga as Resoluções 425/12; 474/14 e 500/14",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9272022.pdf",
    "relatedSources": [],
    "sourceSha256": "d758833ebd14b6364d4bdfd84f73c72a20cfa30845cbb52629e4184e9dcf7b59",
    "historical": false,
    "points": [
      "Apto com restrições envolve registro de restrição ou adaptação veicular.",
      "Inapto temporário corresponde a motivo passível de tratamento ou correção.",
      "Inapto corresponde, na definição do art. 8º, a motivo irreversível para a categoria pretendida."
    ],
    "warning": "Resultado médico e resultado psicológico têm classificações próprias. A necessidade de adaptação não autoriza presumir inaptidão; procedimentos de habilitação devem ser lidos com a 1020/2025.",
    "example": {
      "scenario": "O médico conclui que o candidato pode conduzir com uma restrição a registrar na CNH.",
      "question": "Isso equivale automaticamente a inapto?",
      "answer": "Não. A categoria descrita no art. 8º é apto com restrições.",
      "variation": "O motivo da reprovação é passível de tratamento ou correção.",
      "variationAnswer": "A classificação médica descrita é inapto temporário, não inaptidão irreversível."
    },
    "reviewedScope": "Arts. 8º–9º, com foco nos resultados do exame médico",
    "textPath": "/contran/927-2022.json"
  },
  {
    "number": 926,
    "year": 2022,
    "title": "Infração sem veículo: prazo de expedição da autuação",
    "subject": "Dispõe sobre a padronização dos procedimentos administrativos na lavratura de Auto de Infração de Trânsito, na expedição de notificação de autuação e de notificação de penalidade por infrações de responsabilidade de pessoas físicas ou jurídicas, sem a utilização de veículos, expressamente mencionadas no Código de Trânsito Brasileiro (CTB).",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga a Resolução 390/11",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9262022.pdf",
    "relatedSources": [],
    "sourceSha256": "77efd4adc15dc23f142e338a77da24742d9b5effa09bfbef7a268bbf26cffab7",
    "historical": false,
    "points": [
      "O objeto é a infração expressamente prevista no CTB sob responsabilidade de pessoa física/jurídica sem utilização de veículo.",
      "No regime do art. 4º, ressalvado o art. 5º, a NA deve ser expedida em até 30 dias da constatação.",
      "A defesa de autuação tem prazo próprio, não inferior a 30 dias conforme o dispositivo."
    ],
    "warning": "Expedir notificação e receber correspondência são eventos diferentes. Não aplicar o regime sem identificar a infração e as exceções do art. 5º.",
    "example": {
      "scenario": "Em hipótese alcançada pelo art. 4º, sem a exceção do art. 5º, a NA só é expedida 40 dias após a constatação.",
      "question": "Foi respeitado o limite de expedição estudado?",
      "answer": "Não. O limite do caso é de 30 dias contados da constatação.",
      "variation": "A expedição ocorreu em 20 dias, mas o recebimento foi posterior.",
      "variationAnswer": "Não concluir atraso de expedição só pela data de recebimento; os dois eventos precisam ser distinguidos."
    },
    "reviewedScope": "Arts. 1º–4º",
    "textPath": "/contran/926-2022.json"
  },
  {
    "number": 924,
    "year": 2022,
    "title": "Transporte escolar: campos de visão, não só presença de câmera",
    "subject": "Consolida normas sobre a utilização obrigatória de espelhos retrovisores, equipamento do tipo câmera-monitor ou outro dispositivo equivalente, nos veículos destinados ao transporte coletivo de escolares.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-05-27",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Revoga as Resoluções 504/14 e 763/18 Retificação",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9242022.pdf",
    "relatedSources": [
      {
        "label": "Retificação da 924",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9242022R.pdf"
      }
    ],
    "sourceSha256": "248f0989704594e0cd54aa5192678fe5a19b7ad6d314e91b3ba6a97fb8c235c4",
    "historical": false,
    "points": [
      "Os campos de visão podem ser obtidos por retrovisores, câmera-monitor, combinação ou outros dispositivos tecnicamente eficientes.",
      "O equipamento precisa cumprir as especificações dos anexos.",
      "A retificação do art. 4º, I substituiu 1º/01/2019 por 1º/01/2024 como marco do projeto."
    ],
    "warning": "Não dispensar campos de visão apenas porque existe uma câmera. O cronograma original deve ser lido com a retificação; não presumir adaptação universal a partir do resumo.",
    "example": {
      "scenario": "Um transporte escolar tem câmera, mas não proporciona um campo de visão exigido pelo anexo aplicável.",
      "question": "A câmera, por si só, atende à norma?",
      "answer": "Não. A alternativa tecnológica precisa obter os campos de visão e atender às especificações técnicas exigidas.",
      "variation": "A solução combina retrovisores e câmera e comprova os campos de visão.",
      "variationAnswer": "A combinação é admitida pelo art. 2º; o resultado técnico e as demais condições precisam ser atendidos."
    },
    "reviewedScope": "Arts. 2º–4º; retificação de 27/05/2022",
    "textPath": "/contran/924-2022.json"
  },
  {
    "number": 923,
    "year": 2022,
    "title": "Toxicológico: prazo do laudo atualizado para 30 dias",
    "subject": "Dispõe sobre o exame toxicológico de larga janela de detecção, em amostra queratínica, para a habilitação, renovação ou mudança para as categorias C, D e E, decorrente da Lei nº 13.103, de 02 de março de 2015.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2024-04-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Alterada pela Resolução 1009/24 Revoga as Resoluções 691/17; 713/17; 724/18 e 843/21Revoga o art. 4º da Resolução 786/20 e os arts. 2º e 4º da Resolução 855/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9232022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 1009",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10092024.pdf"
      }
    ],
    "sourceSha256": "c2a5db6c9b6ba190346489a9f223c4f0be9d100bc8cef817a1120033e86b3ad4",
    "historical": false,
    "points": [
      "O exame estudado tem análise retrospectiva mínima de 90 dias em amostra queratínica.",
      "Todas as etapas precisam de cadeia de custódia com validade forense.",
      "O prazo do art. 9º para entrega do laudo passou de 15 para 30 dias contados da coleta pela 1009/2024."
    ],
    "warning": "O PDF original conserva o prazo antigo de 15 dias. Não confundir janela retrospectiva, validade do resultado e prazo de entrega, nem tratar a lista desta resolução como exaustiva de toda exigência do CTB atual.",
    "example": {
      "scenario": "Um laboratório usa a redação original para afirmar que o art. 9º vigente mantém prazo máximo de 15 dias para entrega do laudo.",
      "question": "Qual é a redação modificadora conferida?",
      "answer": "A 1009/2024 alterou o prazo máximo para trinta dias contados da coleta.",
      "variation": "A questão chama os 90 dias de análise retrospectiva de prazo para entrega do laudo.",
      "variationAnswer": "São grandezas diferentes: retrospectiva refere-se à janela de detecção; a entrega segue o art. 9º atualizado."
    },
    "reviewedScope": "Arts. 2º–4º e 9º; redação da 1009/2024",
    "textPath": "/contran/923-2022.json"
  },
  {
    "number": 922,
    "year": 2022,
    "title": "CSV: inspeção de segurança não é mera identificação",
    "subject": "Estabelece procedimentos para a prestação de serviços por Instituição Técnica Licenciada (ITL) e Entidade Técnica Públicaou Paraestatal (ETP), para emissão do Certificado de Segurança Veicular (CSV), de que trata o art. 106 do Código de Trânsito Brasileiro (CTB).",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 632/16; 669/17; 693/17 e 695/17",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9222022.pdf",
    "relatedSources": [],
    "sourceSha256": "2a6b8a4818faa0ab91f88fa22305ff784257dee0bc5c3d50fd50edf165b22909",
    "historical": false,
    "points": [
      "A resolução disciplina ITL e ETP na prestação de serviços para emissão do CSV.",
      "O art. 2º inclui inspeção de veículos modificados e outros casos indicados.",
      "Laudos previstos no art. 3º têm finalidades próprias; não se confundem automaticamente com o CSV."
    ],
    "warning": "Uma vistoria de identificação não substitui a inspeção de segurança exigida para a modificação. Conferir a instituição e o procedimento aplicáveis.",
    "example": {
      "scenario": "Uma modificação exige inspeção de segurança para CSV, mas o proprietário apresenta apenas vistoria de identificação.",
      "question": "Os procedimentos são intercambiáveis?",
      "answer": "Não. A vistoria de identificação e a inspeção de segurança têm objetos distintos; deve ser atendida a inspeção exigida.",
      "variation": "A inspeção cabível é feita pela instituição habilitada e resulta no CSV exigido.",
      "variationAnswer": "Esse é o documento do regime de segurança; ainda devem ser cumpridas as demais exigências da modificação e do registro."
    },
    "reviewedScope": "Arts. 1º–3º",
    "textPath": "/contran/922-2022.json"
  },
  {
    "number": 921,
    "year": 2022,
    "title": "Tanque suplementar: autorização antes da instalação",
    "subject": "Disciplina múltiplos tanques, a instalação de tanque suplementar e a alteração da capacidade do tanque original de combustível em veículos, dedicados à sua propulsão ou operação de seus equipamentos especializados, e dá outras providências.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 181/05 e 194/06",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9212022.pdf",
    "relatedSources": [],
    "sourceSha256": "c2d4543478c7cd706a4a82e20e9ffe1f055c263b8341425500244d60bfc3098e",
    "historical": false,
    "points": [
      "Tanque suplementar é instalado após registro/licenciamento e destinado à propulsão ou equipamento especializado.",
      "Instalação e alteração da capacidade exigem prévia autorização.",
      "O art. 3º prevê limite de 1.200 litros para tanques de veículos automotores e regime próprio de 350 litros em reboques/semirreboques para equipamentos especializados."
    ],
    "warning": "Não transferir o limite de 1.200 litros para qualquer tanque em reboque. O regime varia conforme veículo e finalidade.",
    "example": {
      "scenario": "Um caminhão recebe tanque suplementar antes de pedir a autorização competente.",
      "question": "Pedir a autorização depois satisfaz a exigência de autorização prévia?",
      "answer": "Não. O art. 5º exige autorização antes da instalação ou da alteração da capacidade.",
      "variation": "Um semirreboque usa tanque para equipamento especializado durante o transporte e invoca o limite de 1.200 litros.",
      "variationAnswer": "O art. 3º, § 3º prevê para esse caso o limite de 350 litros; os recortes não são equivalentes."
    },
    "reviewedScope": "Arts. 2º–5º",
    "textPath": "/contran/921-2022.json"
  },
  {
    "number": 920,
    "year": 2022,
    "title": "Fiscalização não metrológica também exige conformidade",
    "subject": "Regulamenta a utilização de sistemas automáticos não metrológicos de fiscalização, nos termos do § 2º do artigo 280 do Código de Trânsito Brasileiro.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 165/04; 174/05 e 458/13",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9202022.pdf",
    "relatedSources": [],
    "sourceSha256": "15be466f6f31ce9c8d1780f83d2458855878446080a6f3f3efb29826418020d6",
    "historical": false,
    "points": [
      "Os sistemas possuem registrador de imagem e tipos de instalação definidos.",
      "A conformidade do modelo deve ser avaliada pelo INMETRO ou entidade acreditada.",
      "Precisam atender aos requisitos mínimos da infração a detectar."
    ],
    "warning": "“Não metrológico” não significa sem controle técnico. Não aplicar esta disciplina automaticamente a medidores de velocidade.",
    "example": {
      "scenario": "Uma câmera de fiscalização é usada sem avaliação de conformidade do modelo, sob a alegação de que o sistema não é metrológico.",
      "question": "A alegação afasta o art. 3º?",
      "answer": "Não. O dispositivo exige avaliação de conformidade do modelo mesmo nesse tipo de sistema.",
      "variation": "A avaliação existe, mas o sistema não atende ao requisito específico da infração detectada.",
      "variationAnswer": "A conformidade geral do modelo não substitui o atendimento dos requisitos específicos mínimos."
    },
    "reviewedScope": "Arts. 1º–4º",
    "textPath": "/contran/920-2022.json"
  },
  {
    "number": 919,
    "year": 2022,
    "title": "Extintor: obrigatório em ônibus, facultativo em automóvel",
    "subject": "Estabelece as especificações para os extintores de incêndio de instalação obrigatória ou facultativa nos veículos automotores.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 157/04; 223/07; 272/08; 333/09; 516/15; 521/15; 536/15 e 556/15",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9192022.pdf",
    "relatedSources": [],
    "sourceSha256": "7804d14417f6cbf42e38cc0a01ae538ed9479aaa5c991778f51d717f74c3f120",
    "historical": false,
    "points": [
      "Ônibus, micro-ônibus, caminhão e demais categorias do art. 2º têm instalação obrigatória.",
      "Em automóveis e outras categorias do § 1º, a instalação é facultativa por opção do proprietário.",
      "Quem opta por instalar deve seguir as especificações da resolução."
    ],
    "warning": "Facultativo não significa permitido instalar equipamento vencido ou inadequado. Não estender a opção do automóvel ao ônibus.",
    "example": {
      "scenario": "Um ônibus circula sem extintor e seu responsável cita a faculdade prevista para automóveis.",
      "question": "A faculdade se aplica ao ônibus?",
      "answer": "Não. Ônibus está no grupo de instalação obrigatória do art. 2º.",
      "variation": "O proprietário de automóvel particular opta por instalar extintor.",
      "variationAnswer": "A escolha é facultativa no recorte do § 1º, mas o equipamento instalado deve cumprir as normas aplicáveis."
    },
    "reviewedScope": "Arts. 2º–3º",
    "textPath": "/contran/919-2022.json"
  },
  {
    "number": 918,
    "year": 2022,
    "title": "Multas: autuação e penalidade são etapas distintas",
    "subject": "Consolida as normas sobre procedimentos para a aplicação das multas por infrações, a arrecadação e o repasse dos valores arrecadados, nos termos do Código de Trânsito Brasileiro (CTB).",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2023-04-25",
    "checkedAt": "2026-10-12",
    "officialSituation": "Alterada pela Resolução 991/23 Revoga as Resoluções 156/04; 424/12; 442/13; 574/15; 619/16; 697/17; 736/18 e 845/21Revoga a Deliberação 115/11",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9182022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 991",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9912023.pdf"
      }
    ],
    "sourceSha256": "5153b6823048ef78d7f19e181252a4b6701dffa7bed3e8b64b6ae1cbc34eae41",
    "historical": false,
    "points": [
      "O AIT inicia o processo administrativo; NA e notificação de penalidade têm funções distintas.",
      "No regime do art. 4º, a NA deve ser expedida em até 30 dias do cometimento.",
      "A não expedição da NA no prazo leva ao arquivamento do AIT, na hipótese estudada."
    ],
    "warning": "O prazo é de expedição, não de recebimento. Há exceção remissiva ao art. 3º, § 5º. A 991/2023 alterou o regime de multa pela não identificação: não reproduzir o artigo correspondente só pelo PDF original.",
    "example": {
      "scenario": "Fora da exceção indicada, o órgão só expede a NA 40 dias depois do cometimento da infração.",
      "question": "Qual efeito prevê o art. 4º, § 1º?",
      "answer": "Arquivamento do AIT pela não expedição no prazo de trinta dias.",
      "variation": "A NA foi expedida em prazo regular, mas o proprietário a recebeu depois.",
      "variationAnswer": "O recebimento posterior, sozinho, não comprova descumprimento do prazo de expedição; analisar os eventos corretos."
    },
    "reviewedScope": "Arts. 2º–4º; leitura com a alteração 991/2023",
    "textPath": "/contran/918-2022.json"
  },
  {
    "number": 917,
    "year": 2022,
    "title": "Madeira: a fronteira de 2,50 metros",
    "subject": "Fixa os requisitos técnicos de segurança para o transporte de toras e de madeira bruta por veículo rodoviário de carga.",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Anexos Revoga as Resoluções 196/06 e 246/07",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9172022.pdf",
    "relatedSources": [],
    "sourceSha256": "ce93606a20221dab64008df1b4b9776d79bd9e66deefc7d25a4efc011552f258",
    "historical": false,
    "points": [
      "Tora é madeira bruta com comprimento superior a 2,50 m.",
      "Toras seguem transporte longitudinal com as disposições previstas.",
      "Madeira bruta de até 2,50 m pode ser transportada longitudinal ou transversalmente, cumpridas as condições próprias."
    ],
    "warning": "Não classificar madeira de exatamente 2,50 m como “superior a 2,50 m”. A orientação permitida não dispensa contenção e amarração.",
    "example": {
      "scenario": "A carga contém madeira bruta de exatamente 2,50 metros de comprimento.",
      "question": "Ela é tora pela definição desta resolução?",
      "answer": "Não. A definição exige comprimento superior a 2,50 m; o caso está no recorte do art. 4º.",
      "variation": "O comprimento passa a 2,60 metros.",
      "variationAnswer": "Entra na definição de tora e no regime de transporte longitudinal do art. 3º."
    },
    "reviewedScope": "Arts. 2º–4º",
    "textPath": "/contran/917-2022.json"
  },
  {
    "number": 916,
    "year": 2022,
    "title": "Modificação: autorização, CAT e CSV têm funções próprias",
    "subject": "Dispõe sobre a concessão de código de marca/modelo/versão, bem como sobre a permissão de modificações em veículos previstas nos arts. 98 e 106 da Lei nº 9.503, de 23 de setembro de 1997, que institui o Código de Trânsito Brasileiro (CTB).",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2026-05-29",
    "checkedAt": "2026-10-12",
    "officialSituation": "Alterada pela Resolução 958/22 Anexo IV alterado pela Resolução 1021/26 Anexos Revoga as Resoluções 78/98; 115/00; 291/08; 292/08; 319/09; 369/10; 384/11; 397/11; 419/12; 450/13; 463/13; 479/14; 673/17 e 847/21",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9162022.pdf",
    "relatedSources": [
      {
        "label": "Resolução 1021",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao10212026.pdf"
      },
      {
        "label": "Resolução 958",
        "url": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9582022.pdf"
      }
    ],
    "sourceSha256": "a52f98b3134d0e92f6f104ca329199b914e1a74f5abc941a03dc36e6efa49d21",
    "historical": false,
    "points": [
      "Modificação em veículo registrado exige autorização prévia da autoridade responsável.",
      "Novo código/CAT e inspeção/CSV dependem das hipóteses dos anexos.",
      "O Anexo IV deve ser lido com a 1021/2026; a observação 9 do Anexo V foi revogada pela 958/2022."
    ],
    "warning": "Não transformar emissão de CSV em autorização automática para qualquer modificação. A 1021/2026 teve ementa retificada; consultar o ato relacionado para o Anexo IV atual.",
    "example": {
      "scenario": "Um proprietário realiza a modificação e só depois solicita a autorização para o veículo já registrado.",
      "question": "A ordem atende ao art. 4º, I?",
      "answer": "Não. A autorização exigida deve ser prévia, e as demais exigências dependem da modificação.",
      "variation": "A autorização foi obtida, mas a modificação exige inspeção e CSV segundo o anexo aplicável.",
      "variationAnswer": "A autorização não dispensa a inspeção e o documento de segurança exigidos para aquele caso."
    },
    "reviewedScope": "Arts. 3º–4º; alterações 958/2022 e 1021/2026 com retificação",
    "textPath": "/contran/916-2022.json"
  },
  {
    "number": 915,
    "year": 2022,
    "title": "ABS e CBS: funções diferentes na frenagem",
    "subject": "Dispõe sobre os procedimentos para avaliação dos sistemas de freios de veículos e sobre a obrigatoriedade do uso do sistema antitravamento das rodas (ABS) e/ou frenagem combinada das rodas (CBS).",
    "issueDate": "2022-03-28",
    "publicationDate": "2022-04-01",
    "lastRelatedActDate": "2022-04-01",
    "checkedAt": "2026-10-12",
    "officialSituation": "Revoga as Resoluções 380/11; 395/11; 509/14; 519/15; 535/15; 596/16; 606/16 e 657/17",
    "sourceUrl": "https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9152022.pdf",
    "relatedSources": [],
    "sourceSha256": "07b53ce129b94e6a5fc9b3cba7039af2c7f6cef5097ab89f74b7e9c85425ebc6",
    "historical": false,
    "points": [
      "ABS evita o travamento das rodas durante a frenagem.",
      "CBS distribui proporcionalmente a força de frenagem entre as rodas.",
      "A exigência e as alternativas dependem do tipo de veículo e dos requisitos aplicáveis."
    ],
    "warning": "Os dois sistemas não são sinônimos. A definição não autoriza substituir qualquer ABS por CBS; cronogramas e categorias precisam ser conferidos no dispositivo próprio.",
    "example": {
      "scenario": "Uma questão define como ABS o sistema cuja função descrita é distribuir proporcionalmente a força de frenagem entre as rodas.",
      "question": "A definição corresponde ao art. 3º?",
      "answer": "Não. A descrição é de CBS. O ABS tem como finalidade evitar o travamento das rodas.",
      "variation": "O sistema evita travamento por sensores e unidade de comando.",
      "variationAnswer": "Essa é a função de ABS, sem que a identificação da função dispense os requisitos técnicos aplicáveis."
    },
    "reviewedScope": "Art. 3º, I–II; art. 4º",
    "textPath": "/contran/915-2022.json"
  }
];
