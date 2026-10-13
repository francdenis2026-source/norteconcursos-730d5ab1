# Busca dentro de uma matéria

A busca por expressão filtrava os artigos, mas não mostrava a ocorrência no corpo do dispositivo. Além disso, o artigo aberto podia permanecer fora dos resultados e a comparação exigia acentos iguais aos do texto.

Agora a busca normaliza acentos e maiúsculas, aceita números de artigo (inclusive `Art.213` e `798-A`) e combina termos. Cada resultado mostra um trecho com destaque. O artigo aberto acompanha os filtros; ausência de resultados apresenta mensagem própria. A ação “Ver no texto oficial” abre a leitura e localiza a primeira ocorrência. Os controles anterior/próximo respeitam os resultados. Trocar de matéria limpa a busca e os filtros específicos.

O alcance é o rótulo, capítulo e texto dos dispositivos da matéria aberta. A correção não altera o texto legal, explicações, progresso ou banco de dados.

Validação: 405 testes aprovados, incluindo regressões de seleção e renderização da tela para “estupro”, ausência de resultados, acentos, artigos e grifos; TypeScript e build de produção aprovados. A validação da tela usou renderização com dados controlados, sem acesso à sessão autenticada do candidato na plataforma pública.

Envio à main: `3487b78`. Em 13/10/2026 às 05:30 UTC, o arquivo público `/assets/legal-course._slug-DHTBHON_.js` retornou 200 e contém o trecho destacado, a limpeza de filtros e o estado de ausência de resultados. Isso confirma a disponibilização do código da correção; não é uma inspeção visual da sessão do candidato.
