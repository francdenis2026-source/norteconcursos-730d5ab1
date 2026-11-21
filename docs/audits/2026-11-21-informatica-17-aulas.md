# Auditoria das 17 aulas autorais de Informática — PC-AC 2026

Data: 2026-11-21. Origem: consulta direta à tabela `public.study_materials` do Supabase, seguida de inspeção do controle de revisão no código `src/lib/materialPracticeReview.ts` e do consumo em `src/lib/studyMaterials.ts`.

## Escopo

17 slugs: `informatica-01-01`, `informatica-01-02`, `informatica-01-03`, `informatica-03-01`, `informatica-03-02`, `informatica-03-03`, `informatica-03-04`, `informatica-03-041`, `informatica-04-01`, `informatica-04-02`, `informatica-04-03`, `informatica-04-04`, `informatica-05-01`, `informatica-05-02`, `informatica-05-03`, `informatica-05-04`, `informatica-05-05`.

## Resultado da auditoria automatizada

| Critério | Resultado |
| --- | ---: |
| Aulas encontradas | 17/17 |
| Status `active` | 17/17 |
| Seção `## Aprofundamento:` | 17/17 |
| Questão introdutória | 17/17 |
| Questões autorais no JSON `quiz` | 34 |
| Comentários com menos de 35 caracteres | 0 |
| Questões com resolução em três passos | 34/34 |
| Feedback de erro sincronizado com a justificativa | 34/34 |
| Registros `practice_review` presentes | **0/17** |

## Resultado por aula

| Slug | Tema | Caracteres de `body_md` | Questões | Estado |
| --- | --- | ---: | ---: | --- |
| informatica-01-01 | Hardware, software e periféricos | 3436 | 2 | Ativa |
| informatica-01-02 | Memória RAM, cache e SSD | 2703 | 2 | Ativa |
| informatica-01-03 | Sistemas operacionais e arquivos | 1771 | 2 | Ativa |
| informatica-03-01 | Windows: arquivos e atalhos | 1577 | 2 | Ativa |
| informatica-03-02 | Linux: diretórios e comandos | 1463 | 2 | Ativa |
| informatica-03-03 | Linux: permissões | 1509 | 2 | Ativa |
| informatica-03-04 | Internet, intranet e VPN | 2460 | 2 | Ativa |
| informatica-03-041 | DNS, DHCP, HTTP e HTTPS | 1616 | 2 | Ativa |
| informatica-04-01 | Malware, phishing e prevenção | 1829 | 2 | Ativa |
| informatica-04-02 | Backup completo, incremental e diferencial | 2081 | 2 | Ativa |
| informatica-04-03 | Confidencialidade, integridade e disponibilidade | 2997 | 2 | Ativa |
| informatica-04-04 | Navegadores, cookies e privacidade | 2811 | 2 | Ativa |
| informatica-05-01 | Word e Writer: estilos | 2967 | 2 | Ativa |
| informatica-05-02 | Excel e Calc: fórmulas | 2576 | 2 | Ativa |
| informatica-05-03 | PowerPoint e Impress | 2684 | 2 | Ativa |
| informatica-05-04 | E-mail: SMTP, IMAP e POP3 | 2671 | 2 | Ativa |
| informatica-05-05 | Modelo OSI e TCP/IP | 1934 | 2 | Ativa |

## Achados e ressalvas

1. **Material didático publicado:** os 17 registros estão ativos no banco. Isto não prova, isoladamente, que o site de produção já exibiu a atualização; é necessária validação visual.
2. **Questões não liberadas no treinador:** `practice_review` é nulo em todos os 17 registros. O código exige revisão correspondente ao conteúdo exato e fontes verificadas para admitir questões. Não gerar aprovações artificiais.
3. **Proveniência:** as aulas são materiais autorais novos; não são transcrições nem reproduções dos PDFs de terceiro indisponíveis.
4. **Referência ao edital:** `contest_name` aponta para PC-AC 2026. A vinculação nominal e as notas de origem não substituem cotejo item a item com documento oficial e validação humana do conteúdo.
5. **Questões extras de múltipla escolha:** algumas aulas possuem questões em `body_md`; estas não são automaticamente contabilizadas no campo `quiz` nem no catálogo do treinador.
6. **Qualidade didática:** presença de seções, extensão textual e tamanho do feedback são verificações estruturais; não constituem prova de correção factual ou adequação pedagógica integral.

## Próximas ações obrigatórias

- Revisar individualmente as 34 questões, gabaritos e justificativas com fontes adequadas.
- Registrar revisão real no formato exigido pelo controle de `materialPracticeReview.ts`, sem contornar as condições de integridade.
- Verificar eventual duplicação com o catálogo de questões existente e contagem do treinador.
- Validar exibição real em claro/escuro na biblioteca e execução de exercícios em produção.

**Conclusão:** auditoria estrutural das 17 aulas concluída; conteúdo publicado no banco; liberação do treinador e validação visual **pendentes**.
