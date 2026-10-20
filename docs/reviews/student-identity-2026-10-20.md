# Área do aluno: composição confirmada

Implementada a composição aprovada pelo proprietário: retirar a imagem decorativa separada acima do painel, substituir a foto da estudante no card principal por uma nova arte do distintivo e usar o título “Área do aluno”, preservando saudação, data e acesso ao desempenho.

A nova imagem `area-aluno-distintivo.webp` foi adaptada da arte fornecida, mantendo o emblema e as inscrições “Carreiras Policiais”. O card usa `object-fit: contain`, sem cortes, e o celular recebe a mesma arte, sem o antigo `source` da estudante. A hero da homepage não foi modificada. A arte de fundo suave da área interna permanece.

O título é HTML acessível, com fonte encorpada e acabamento metálico inspirado nas inscrições do distintivo. A fonte local é um subconjunto latino de DejaVu Serif Condensed Bold, em WOFF de aproximadamente 14 kB; licença preservada em `public/media/fonts/norte-insignia-LICENSE.txt`. Não foi apresentada como a fonte original do emblema. Foram corrigidos os estilos antigos do modo claro que deixavam descrição e data escuras sobre o card.

Validação: build de produção; 53 regressões de navegação, biblioteca, contexto do treinador e planos; 40 verificações de rota/tema/largura, incluindo título, ausência da imagem superior duplicada, arte correta em celular/desktop, preservação das ações, contraste dos textos segundo os tokens próprios para imagem e ausência de excesso horizontal dentro do card. Sessão e backend simulados, sem alterações no Supabase. Capturas ficam em `outputs/qa`, ignorado pelo Git.
