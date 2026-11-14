# Auditoria de cobertura — PC-AC 2026 (Oficial Investigador)

Data da auditoria: 14/11/2026. Base primária: Edital nº 001 SEAD/PCAC, de 05/11/2026, Anexo III; legislação estadual consolidada nos portais oficiais.

## Fonte e regra de escopo
- Edital: https://arquivos.qconcursos.com/regulamento/arquivo/89141/pc-ac-2026-edital-n-1-edital.pdf
- Anexo III, páginas 47–50 do PDF (linhas 2406–2647 na extração consultada).
- O edital inclui Português, Raciocínio Lógico, Informática e Realidade do Acre para todos os cargos, e para Oficial Investigador inclui Conhecimentos Jurídicos, Legislação Institucional, Contabilidade, Estatística, Arquivologia, TI/Segurança da Informação e Análise de Dados.
- Não tratar a existência de um material como prova de cobertura integral. Cada item do programa deve estar mapeado a aula, exercícios e fonte.

## Estado do banco verificado
Tabela public.study_materials, contest_name = 'PC-AC 2026'. Na consulta de 14/11/2026:
- 21 materiais de Legislação Institucional, todos active; 127 flashcards e 146 questões.
- Contabilidade: 7 materiais, 35 flashcards e 35 questões.
- Estatística: 10 materiais, 50 flashcards e 50 questões.
- Língua Portuguesa: 13 materiais, 65 flashcards e 65 questões.
- Raciocínio Lógico: 12 materiais, 60 flashcards e 60 questões.
- Noções de Informática: 10 materiais, 50 flashcards e 50 questões.
- Realidade do Estado do Acre: 3 materiais, 15 flashcards e 15 questões.
- Noções de Direito Administrativo: 8 materiais, 40 flashcards e 40 questões.
- Noções de Direito Constitucional: 3 materiais, 15 flashcards e 15 questões.
- Noções de Direito Penal e Processual Penal: 9 materiais, 45 flashcards e 45 questões.
- Arquivologia: 16 materiais, 80 flashcards e 80 questões.
- Análise de Dados e Informações: 11 materiais, 55 flashcards e 55 questões.
- Tecnologia da Informação e Segurança da Informação: 2 materiais, 10 flashcards e 10 questões.
- Administração Pública: 7 materiais, 35 flashcards e 35 questões.
- Noções de Administração: 15 materiais, 75 flashcards e 75 questões.

Os totais são inventário de registros, não validação pedagógica nem prova de cobertura de cada subitem.

## Conteúdos adicionados diretamente ao banco nesta sessão
1. LC nº 129/2004 após LC nº 526/2026: ingresso, estágio probatório, posse, curso de formação, primeira lotação e permanência territorial.
2. LC nº 39/1993: disposições preliminares, provimento, jornada e vacância.
3. LC nº 39/1993: acumulação, penalidades, prescrição, sindicância, afastamento cautelar e PAD.
4. LC nº 39/1993: licença-prêmio, impedimentos e requerimento.
5. Word/Writer: estilos, documentos extensos, revisão e proteção.
6. Excel/Calc: fórmulas, referências, filtros, validação, tabelas dinâmicas e gráficos.
7. PowerPoint/Impress: slide mestre, animações, transições e integração.
8. Internet, intranet, HTTPS, navegadores e avaliação de fontes.
9. Correio eletrônico: SMTP, POP3, IMAP, phishing e proteção de dados.
10. Computação em nuvem, compartilhamento, coautoria e gestão de permissões.
11. Sistemas de informação, autenticação, autorização, auditoria, transparência e proteção de dados.

Os onze registros estão ativos e possuem resumo, flashcards e quiz. O seed idempotente correspondente foi versionado em `supabase/migrations/20261114160000_pcac_2026_content_additions.sql`.

## Gaps e validações obrigatórias

### Legislação Institucional
- Confirmar artigo por artigo a Lei Federal nº 14.735/2023, LC nº 129/2004 (incluindo LC nº 496/2025 e LC nº 526/2026), Lei Estadual nº 2.250/2009 e LC nº 39/1993 (incluindo LC nº 525/2026).
- Verificar se os novos materiais da LC nº 39/1993 são compatíveis com o recorte “nos dispositivos aplicáveis” do edital e com a disciplina especial da LC nº 129/2004.
- Conferir a redação consolidada dos anexos do PCCR e as tabelas remuneratórias; não usar valores históricos como atuais.
- Conferir se direitos, vantagens, deveres, vedações, responsabilidade e regime disciplinar da LC 129 e Lei 14.735 estão cobertos sem duplicação ou conflito.

### Conhecimentos básicos
- Português: 13 materiais para 17 itens do Anexo III; mapear explicitamente cada um dos 17 itens e criar aulas para qualquer item sem cobertura.
- Raciocínio Lógico: 12 materiais para 15 itens; verificar se cada item tem aula e exercícios próprios, especialmente relações de ordem/equivalência, PA/PG, probabilidades e interpretação de gráficos.
- Informática: agora há 10 materiais para 10 blocos; conferir item a item a profundidade e a correspondência dos três materiais iniciais e dos sete complementares, especialmente funções de planilhas, protocolos, navegadores, e segurança da informação.
- Realidade do Acre: 3 materiais; verificar todos os tópicos do edital (história, Tratado de Ayacucho, geografia, fuso, municípios/regionais, bacias, relevo, clima, vegetação, unidades de conservação, povos indígenas inclusive isolados, Constituição estadual, Poderes, indicadores, economia, transportes, fronteira e segurança pública). O arquivo src/data/acreStudyContent.ts tem conteúdo por eixos e requer auditoria de todos os itens e das datas das fontes.

### Conhecimentos jurídicos e específicos
- Direito Constitucional: mapear princípios fundamentais, direitos/deveres individuais e coletivos, remédios, arts. 37–41, art. 144 e Constituição do Acre.
- Direito Administrativo: mapear princípios, organização, poderes, poder de polícia, atos, agentes, responsabilidade civil e improbidade após Lei 14.230/2021.
- Penal/Processual Penal: conferir todos os artigos e leis expressamente listados no Anexo III, inclusive CPP 4º–23, 155–184, 275–281, Lei 12.037/2009, prisões e cautelares.
- Contabilidade: 7 blocos expressos no edital; verificar cada subitem e aprofundar operações financeiras, conciliação, análise de movimentações e fluxos.
- Estatística: mapear 9 blocos, incluindo quartis/decis/percentis e regressão/correlação; confirmar exercícios.
- Arquivologia, TI/Segurança e Análise de Dados: fazer correspondência linha a linha com os itens 1–9 do Anexo III e checar se os módulos existentes cobrem exatamente os subitens.

## Regras para concluir
1. Fonte primária do edital e texto oficial consolidado da lei.
2. Toda aula deve declarar escopo, fonte e data de conferência quando houver conteúdo normativo ou dado mutável.
3. Questões com gabarito e explicação; não cadastrar questão sem base confirmada.
4. Evitar duplicar materiais; completar por slug/tema com operações idempotentes.
5. Rodar os testes direcionados e a bateria integral do package.json: typecheck, lint, test e build.
6. Verificar checks do GitHub Actions na branch de trabalho e só então abrir/mesclar PR para main.
7. Após merge, verificar commit na main e estado real da publicação; não inferir deploy a partir do merge.
