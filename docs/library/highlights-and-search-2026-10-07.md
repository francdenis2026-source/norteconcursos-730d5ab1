# Grifos e busca na biblioteca

Os guias jurídicos e a leitura integral de todos os percursos usam uma apresentação compartilhada de grifos. As regras lexicais identificam requisitos/condições, exceções/negações, números/limites/prazos e penas/consequências, com legenda e botão para desativar. Cores são adaptadas aos temas claro e escuro. Texto, links, casos coloridos e regras de recuperação sem consulta são preservados.

A skill de revisão do projeto está em `.agents/skills/legal-study-highlights/SKILL.md`. Ela orienta a escolha e validação de padrões pedagógicos; o navegador aplica regras determinísticas, sem invocar uma skill ou IA em cada leitura. Os grifos são apoio lexical, não análise jurídica exaustiva nem seleção certificada do conteúdo cobrado.

A busca inclui título, disciplina, assunto, resumo, concurso, metadados da lei e texto dos guias publicados. Reconhece acentos, nomes, números com ou sem ponto e siglas CP, CPP, CTB, ECA, LEP e RLM. O filtro de assunto combina com disciplina e concurso; trocar disciplina limpa o assunto anterior. Contagem de resultados, carregamento, tentativa após erro e limpeza de filtros são visíveis. A busca textual dos guias carrega sob demanda a partir de dois caracteres, respeita RLS/status ativo e pagina até o fim mesmo com limite menor do servidor. A busca por dispositivos integrais continua disponível dentro de cada percurso.

Verificação local de preservação reconstruiu sem diferença os 3.483 dispositivos atuais e os 39 guias do snapshot anterior. Testes cobrem expressões completas, remissões/números de diplomas, caracteres/HTML, renderização segura com links, distinção CP/CPP, busca sem acentos, texto dos guias, limites de página e falha de leitura. Nenhum texto jurídico foi regravado no banco para produzir grifos.

## Correspondência visual — 08/10/2026

A digitação identifica normas por seus próprios nomes, números e siglas. Quando há correspondência com a identidade de uma norma, o catálogo restringe os resultados aos materiais daquela norma, respeitando os filtros de disciplina/assunto/concurso, em vez de incluir outras leis que apenas a mencionam. A ordenação cronológica continua válida entre os diplomas encontrados. Termos genéricos como “lei” e anos isolados não selecionam arbitrariamente uma norma.

Os cartões correspondentes recebem borda/fundo coloridos e identificação textual. Os termos digitados são destacados nos títulos, assuntos, resumos e aprofundamentos. A marcação conserva acentos, pontuação e caracteres: buscar “11340” destaca “11.340”; CP não marca o trecho dentro de CPP. Títulos de leis exibem siglas usuais e números disponíveis para que a correspondência seja visível. Marcação é feita com elementos React seguros, sem HTML da consulta. Validação: 53 testes, TypeScript e build aprovados; sem verificação visual em navegador autenticado.
