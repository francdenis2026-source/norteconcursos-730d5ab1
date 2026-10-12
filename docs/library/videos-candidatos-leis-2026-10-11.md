# Vídeo-aulas candidatas para as leis sem vídeo (proposta para aprovação)

Pesquisa feita em 11/10/2026 no YouTube. **Nada disso foi inserido no catálogo.** Falta, para cada vídeo: assistir
um trecho, conferir data e atualização da lei e confirmar que o autor permite incorporar (embed) na plataforma.
Vídeos de resumo/áudio e de bancas específicas só entram se o conteúdo bater com o edital da PF/PRF/Polícia Civil.
Link de um vídeo: `https://www.youtube.com/watch?v=ID`.

| Lei (slug) | ID | Título / autor (como aparece na busca) | Tipo | Observação |
|---|---|---|---|---|
| lep | sM8dKIqi1BA | Lei 7.210/84 — Prof. Rodolfo Souza | aula | prioridade |
| lep | jneZ8tRLfB0 | LEP — Prof. Davi Ferraz (Monster Concursos) | aula | |
| lep | rmQJvJEFzg8 | LEP Parte 02 — Prof. Davi Ferraz | aula | |
| lep | KNu2XPrOyRQ | LEP 100 Questões, Parte 01 — Prof. Fraga | questões | |
| lep | rlTNwr-431o | LEP Atualizada 2026 | atualização | conferir se cobre as alterações recentes (regime, remição) |
| idosa | H3Wy_Mq6h-c | Estatuto do Idoso para Concursos | aula | |
| idosa | BlfDpXrd6so | Estatuto do Idoso — AlfaCon (Prof. André Adriano) | aula | foca direitos e medidas de proteção |
| idosa | 9Bpv_mtmRZ8 | 50 Questões — Estatuto do Idoso | questões | provável cobertura dos crimes (arts. 95 a 109) |
| juizados | j5wpylJ_QRY | Juizado Especial Criminal — Lei 9.099/95 | resumo | |
| juizados | balpCDf-QWo | JECRIM — Aula Animada | aula | |
| juizados | XKIJPJUsA9Y | Lei 9.099/95 — Profa. Priscilla Bandeira | aula | |
| juizados | 66HxkdQhjPk | PMERJ — Questões Lei 9.099 | questões | |
| ambientais | GvxCkJMBVXI | Lei 9.605/1998 CEBRASPE — Parte 2 | questões | banca da PF/PRF |
| ambientais | 9tZOFz_sLas | Tudo sobre a Lei dos Crimes Ambientais (com resumo) | aula | |
| ambientais | K8OmvkGU_54 | Crimes Ambientais e Infrações Administrativas — Prof. Rosenval | aula | |
| pcd | 6nDpwHcLzQ4 | Estatuto da Pessoa com Deficiência — Lei 13.146/2015 | aula | |
| pcd | Js2TZo-obhU | Lei Brasileira de Inclusão para Concursos | aula | |
| contravencoes | Rd0dWSzT3F8 | Lei Esquematizada — Contravenções Penais | resumo | |
| contravencoes | jIwMGIKSTtE | Contravenções Penais — Polícia Civil SP (live) | aula | |
| contravencoes | HTGDQRaNljk | Aula Grátis PRF — DL 3.688/1941, Parte 1 | aula | contravenções referentes à pessoa |
| contravencoes | ohF7bD2ALtQ | FGV na Mira — contravenções | questões | |
| terrorismo | QoaIv4ivo90 | Lei Antiterrorismo 13.260/16 — Parte 1 — Prof. Vinícius Reis | aula | |
| terrorismo | m8sIwG30Zew | Sexta Extravagante #11 — Diego Fontes | revisão | |
| terrorismo | ZvYmIS7XfXU | Lei de terrorismo: três pontos controvertidos — Rogério Sanches | aula | |
| racismo | kAAoi3lzuRY | Lei de Racismo — Lei 7.716/1989 | aula | |
| racismo | jHuMZKo_1yk | Aula gratuita Racismo — Legislação Penal Especial (Delegado) | aula | |
| racismo | 2xvDPnVY0E0 | Lei 7.716/1989 — PMPA — Prof. Raphael Pinho | aula | |
| racismo | JHMsquHplQ0 | Lei 7.716 em áudio atualizada (Lei 14.532/2023) | áudio | só como complemento |
| temporaria | FZ74mEnvUg0 | Lei 7.960/89 — PC-SP 2023 (Gabriela Duó) | aula | |
| temporaria | aVF-D6QYxsQ | Lei 7.960/89 — Prisão temporária | aula | |
| temporaria | vXdK8nwcDu8 | Cebraspe na Mira — prisão temporária | questões | |
| trafico-pessoas | mOEW5IR7PA4 | Lei 13.344/16: aspectos penais — Rogério Sanches | aula | de 2016: conferir alterações posteriores |

## Ainda sem pesquisa
cin, icn, sic, budapeste, pf-interestadual, quimicos, delegado, identidade, identificacao-criminal,
menor-potencial-ofensivo, henry-borel, cpf, seguranca-privada, testemunhas, antifaccao, uso-forca, ric,
pensao-regulamento. Muitos são normas curtas ou específicas da PF, com pouca oferta de aula gratuita; o
caminho natural é escolher os poucos vídeos úteis por lei, com a mesma triagem acima.

## Como entra no sistema (depois da sua aprovação)
Os vídeos entram na Central de mídia (tabela `media_videos`, via Admin → Central de mídia) com a matéria
"Legislação Especial e Direitos Humanos" e o assunto da lei; a aba "Vídeo-aulas" da página da lei passa a
mostrá-los. Para as leis acima o mapa em `src/lib/relatedVideos.ts` precisa ganhar a entrada de cada lei.
