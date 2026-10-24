# Varredura solicitada do portal oficial da IDECAN

## Resultado real desta tentativa

**A coleta está bloqueada e não foi concluída. Nenhuma questão nova foi obtida ou semeada.**

A URL enviada pelo usuário foi normalizada apenas para remover os parâmetros de rastreamento: `https://concurso.idecan.org.br/editais?status=andamento`. O relatório `manifesto.json` registra as tentativas tanto nessa página quanto no índice oficial antigo `https://antigo-concurso.idecan.org.br/SITE/Concursos.aspx`.

Ambos falharam com `Tunnel connection failed: 403 Forbidden`, antes de obter o HTML. Isso é bloqueio de acesso de rede deste ambiente, não uma constatação de que o site da IDECAN está fora do ar ou sem provas. Leituras adicionais dos domínios raiz, novo e antigo também falharam. A tentativa com execução ampliada manteve o mesmo erro; o navegador Chromium retornou `net::ERR_TUNNEL_CONNECTION_FAILED`. Não houve tentativa de contornar desafios ou autenticação.

| Indicador desta execução | Resultado |
| --- | ---: |
| Índices tentados pelo coletor | 2 |
| Índices efetivamente lidos | 0 |
| Novos documentos encontrados | 0 |
| PDFs baixados | 0 |
| Questões novas extraídas | 0 |
| Seeds geradas/aplicadas | 0 |

Zero coletado não significa zero disponível no portal. Não foi gerado SQL de inserção sem material-fonte.

## Comparação disponível

O coletor indexou somente a referência local já existente: 273 itens no JSON legado e dois cadernos privados PC-CE com 100 posições cada. São **473 posições locais históricas**, não uma consulta atual ao Supabase, não uma contagem de questões novas e não uma contagem de liberadas. Publicações de posições privadas já presentes não devem ser somadas como inéditas.

Não existe conexão administrativa ao Supabase nesta sessão; a deduplicação definitiva precisa comparar os futuros itens com uma exportação atual dos catálogos e do acervo privado. A consulta de exportação já existente está em `../revisao-integral/exportar-acervo.sql`.

## Coleta reproduzível preparada

```sh
python scripts/idecan/scan-official-portal.py \
  --output /tmp/idecan-coleta \
  --max-pages 30 \
  --download
```

Executar em ambiente com acesso aos domínios oficiais. Saídas: `manifest.json` e, se forem efetivamente obtidos, PDFs por SHA-256 em `pdfs/`. Não colocar PDFs em `public/` do site. O comando só lê documentos públicos e grava arquivos locais: não contém credenciais e não conecta ao banco.

Para inventariar links de uma página oficial salva/renderizada no navegador:

```sh
python scripts/idecan/scan-official-portal.py \
  --output /tmp/idecan-html \
  --html /caminho/editais.html \
  --base-url 'https://concurso.idecan.org.br/editais?status=andamento' \
  --download
```

O coletor remove rastreadores sem modificar IDs opacos de download, restringe URLs e redirecionamentos ao HTTPS dos domínios oficiais, separa cadernos de gabaritos e evita links de resultados/classificações de candidatos. Cada documento guarda a página de descoberta, o rótulo do link e, se baixado, o hash e tamanho do PDF. Um rótulo “definitivo” é apenas uma indicação para revisão: não certifica o conteúdo do gabarito. HTML de bloqueio/login não é aceito como PDF. O inventário acusa cobertura incompleta e possível renderização por JavaScript; não se apresenta como uma varredura exaustiva.

O índice de concursos em andamento pode incluir provas ainda não realizadas. Provas concluídas e gabaritos devem ser localizados pelas páginas e links reais do portal; não inventar documentos, endpoints de API ou contagens de questões.

## Quando houver documentos acessíveis

1. Conferir concurso, instituição, cargo, ano, tipo de caderno, integridade e páginas dos PDFs.
2. Obter o gabarito definitivo específico, preservar anuladas e resolver qualquer divergência entre título do link e cabeçalho do documento.
3. Deduplicar por identidade e conteúdo contra os dados atuais do banco; não tratar reordenação de alternativas/tipo de caderno como questão inédita.
4. Preservar enunciados, alternativas, texto de apoio, imagens, grifos, fórmulas e fonte por página. Não extrair genericamente itens incompletos como prontos para uso.
5. Preparar o acervo privado no formato `question_corpus_sources`/`question_corpus_candidates`, com status `under_review`, usando o validador e a carga privada já existentes. Nunca inserir diretamente como `active` por ter encontrado um PDF.
6. Para publicação, seguir `CONTENT_GOVERNANCE.md`: tópico real de edital ativo, explicação didática, contexto/gabarito conferidos e, em questões jurídicas, dispositivo e jurisprudência vigentes em fontes oficiais. Normas locais não migram automaticamente para outro estado.
7. Produzir SQL idempotente com proteção de revisões concorrentes e leitura de confirmação; disponibilizar integralmente o SQL ao usuário, conforme sua orientação.

Testes locais do coletor: domínio e redirecionamento autorizado, preservação de IDs, exclusão de resultados de candidatos, inventário com fixtures sintéticas, falha de rede/desafio sem falsas seeds e rejeição de HTML disfarçado de PDF. Fixtures não foram incluídas no acervo real.

Para prosseguir com questões reais, é necessário acesso ao portal neste ambiente ou receber os PDFs de cadernos e gabaritos (ou páginas oficiais salvas em HTML). O manifesto não substitui esses documentos.
