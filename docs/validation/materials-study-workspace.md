# Materiais: texto, explicação e prática

Implementação de 24/10/2026. Materiais individuais, trilhas e páginas de disciplinas compartilham abas compactas. Os percursos jurídicos mantêm o leitor por artigo e passam a usar a mesma seleção de prática, limitada ao diploma e artigo abertos.

- A bateria usa até 20 questões elegíveis, com correção, comentário, texto de apoio e figuras. Exibe a quantidade real quando não há cobertura suficiente; não gera questões nem duplica itens para atingir 20.
- A prática embutida é fixação da visita, sem pontuação/histórico de tentativas. A interface informa isso; o treinador completo mantém o fluxo de registro existente.
- O link para o treinador transporta disciplina, assunto, lei e artigo. Um recorte sem correspondências permanece vazio. Art. 5 não inclui Art. 50 ou Art. 5-A, nem o mesmo número em outro diploma.
- Tópicos cadastrados prevalecem sobre a classificação automática do texto. Na ausência de metadados, utiliza-se a classificação temática existente na plataforma.
- As questões são carregadas quando a aba é aberta e o catálogo é compartilhado pelo cache existente. As respostas permanecem ao alternar as abas.
- A operação não publica conteúdo novo, não modifica o banco nem certifica atualização legislativa. Textos, fontes, datas de conferência e bloqueios de revisão existentes permanecem. Explicações cadastradas não equivalem a revisão atual.
- Incorporada a main remota, preservando a correção recente que evita rolagem ao mudar de artigo internamente.

## Validação

- Build de produção aprovado após incorporar a main.
- 66 testes direcionados aprovados (escopos, leitura, navegação, trilhas e filtros).
- Navegador com autenticação/dados simulados, sem gravações no banco real: materiais, trilhas, disciplinas e percurso jurídico em 390, 768 e 1366 px; modos claro/escuro; sem rolagem horizontal; bateria de 20, certo/errado, preservação das respostas e recorte jurídico vazio.
- Suíte geral: 865 aprovados de 867. Falhas anteriores: dependência local ausente `@electric-sql/pglite` no teste de sessões; teste da importação IDECAN ainda espera 177 registros, enquanto o arquivo existente contém 273.
- Typecheck global continua bloqueado por erros anteriores em `PanelTextScale.tsx` (retorno do cleanup do efeito) e `PerformanceCharts.tsx` (tipos de formatadores Recharts). Nenhum erro apontado nos arquivos desta implementação.

O teste de navegador pode ser repetido com servidor local e:

```sh
PLAYWRIGHT_MODULE=/caminho/playwright-core/index.mjs node scripts/qa/materials-workspace.mjs
```
