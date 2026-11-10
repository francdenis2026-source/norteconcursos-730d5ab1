# Leitor completo de teoria

## Intenção
Transformar a leitura de materiais em um espaço amplo, confortável e ativo para todas as disciplinas, preservando o texto publicado e permitindo estudo personalizado.

## Objetivos
- Usar melhor a largura disponível em telas grandes e manter boa leitura em telas estreitas.
- Padronizar hierarquia tipográfica, títulos, listas, negritos, sublinhados e blocos de destaque.
- Manter os destaques automáticos existentes por tipo de conteúdo.
- Permitir selecionar trechos e aplicar marcações manuais em cores.
- Salvar marcações e anotações por usuário/material.
- Exportar o texto, marcações e anotações para PDF.
- Aplicar marca d’água fixa com nome do site e identificação do desenvolvedor em toda exportação.

## Fora do escopo
- Editar ou substituir o texto oficial publicado.
- Remover fontes, avisos legais ou revisão didática.
- Criar um editor livre de documentos.
- Exportar conteúdo sem marca d’água.

## Abordagem escolhida
Ampliar o contêiner do leitor, criar componentes reutilizáveis de marcação e anotações sobre o conteúdo renderizado, persistir o estado por usuário e slug, e gerar PDF com `jsPDF` usando o conteúdo visível, as anotações e uma marca d’água diagonal/rodapé. A seleção manual será uma camada de estudo sobre o texto, sem alterar o Markdown original.

## Resultado esperado
O aluno lê a teoria em uma área espaçosa, aplica cores em trechos importantes, registra observações e exporta um resumo estudado identificável como material da plataforma.
