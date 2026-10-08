# Grifos e busca na biblioteca

Os guias jurídicos e a leitura integral de todos os percursos usam uma apresentação compartilhada de grifos. As regras lexicais identificam requisitos/condições, exceções/negações, números/limites/prazos e penas/consequências, com legenda e botão para desativar. Cores são adaptadas aos temas claro e escuro. Texto, links, casos coloridos e regras de recuperação sem consulta são preservados.

A skill de revisão do projeto está em `.agents/skills/legal-study-highlights/SKILL.md`. Ela orienta a escolha e validação de padrões pedagógicos; o navegador aplica regras determinísticas, sem invocar uma skill ou IA em cada leitura. Os grifos são apoio lexical, não análise jurídica exaustiva nem seleção certificada do conteúdo cobrado.

A busca inclui título, disciplina, assunto, resumo, concurso, metadados da lei e texto dos guias publicados. Reconhece acentos, nomes, números com ou sem ponto e siglas CP, CPP, CTB, ECA, LEP e RLM. O filtro de assunto combina com disciplina e concurso; trocar disciplina limpa o assunto anterior. Contagem de resultados, carregamento, tentativa após erro e limpeza de filtros são visíveis. A busca textual dos guias carrega sob demanda a partir de dois caracteres, respeita RLS/status ativo e pagina até o fim mesmo com limite menor do servidor. A busca por dispositivos integrais continua disponível dentro de cada percurso.

Verificação local de preservação reconstruiu sem diferença os 3.483 dispositivos atuais e os 39 guias do snapshot anterior. Testes cobrem expressões completas, remissões/números de diplomas, caracteres/HTML, renderização segura com links, distinção CP/CPP, busca sem acentos, texto dos guias, limites de página e falha de leitura. Nenhum texto jurídico foi regravado no banco para produzir grifos.
