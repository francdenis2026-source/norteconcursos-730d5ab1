# Arte completa no fundo da área do aluno

A aplicação anterior usava um fundo com camada quase opaca, exibido somente em alguns painéis. No celular, a largura fixa de 780 px recortava as laterais; cards por cima escondiam o restante da composição.

A área de concursos agora reserva uma faixa decorativa antes do conteúdo para exibir a imagem inteira, com `background-size: contain`, proporção original, opacidade integral e sem cards ou textos por cima. A largura máxima de 800 px limita a altura no desktop; no celular a faixa acompanha a largura disponível. A arte também continua como fundo suave e repetido ao longo da página. Foram reutilizados os arquivos existentes, sem alterações nas imagens.

O estilo azul é o padrão das áreas do aluno; assinaturas, ranking e medalhas mantêm a variante dourada. A biblioteca e o treinador também passam a receber a arte decorativa fora de suas superfícies de leitura. ENEM e administração permanecem sem a identidade de carreiras policiais. A faixa não participa da árvore de acessibilidade e não aparece na impressão. A hero da homepage não foi alterada.

Validação: build de produção em cópia temporária; 53 testes de navegação, biblioteca, contexto do treinador e planos passaram. `scripts/qa/student-background.py` verificou 40 combinações de rota, tema e largura, incluindo proporção, ausência de corte lateral, opacidade integral, conteúdo abaixo da arte e exclusão em impressão, ENEM e identidade administrativa. Sessão e backend simulados; nenhum usuário ou registro do Supabase foi alterado. Capturas ficam em `outputs/qa`, fora do Git.
