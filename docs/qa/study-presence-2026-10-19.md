# Indicador público de estudo

Indicador compacto na barra da homepage, junto à marca no desktop e abaixo dela no mobile. Dourado marca atividade positiva; zero usa ponto neutro. O número é abreviado apenas na apresentação visual; o rótulo acessível e a descrição mantêm o total completo. Sem animação ou anúncios repetidos de leitor de tela.

## Dados

A função `get_public_study_presence()` retorna exclusivamente `studying_now`, `as_of` e `window_seconds`. Conta contas distintas com `active_seconds > 0` e batimento nos últimos 90 segundos em `study_sessions`, reutilizando o mecanismo de tempo ativo da área de estudos. Não conta visitantes da homepage nem acessa sessões individuais no navegador. A janela é uma aproximação de presença recente, não uma lista de conexões instantâneas.

A migração cria um índice de atividade recente e libera a execução da função agregada para visitantes e usuários autenticados, sem alterar políticas das tabelas. A API de administração não aceitou a credencial disponível; o usuário escolheu executar o SQL no editor do Supabase. A função publicada foi posteriormente confirmada via chamada pública HTTP 200. O retorno real no momento da verificação foi zero, e o navegador exibiu “0 pessoas estudando agora”. Não foi necessária nova confirmação do usuário.

O cliente consulta a cada 30 segundos enquanto a página está visível, com prazo de 8 segundos. Dados inválidos, erros e respostas com mais de 60 segundos não são exibidos. Uma verificação de idade a cada 15 segundos e ao mudar a visibilidade impede manter um número antigo quando a rede está indisponível. A ausência da função interrompe novas consultas periódicas até uma nova entrada/foco; o espaço reservado evita deslocar a navegação.

## Validação

- TypeScript e build de produção aprovados.
- Três testes unitários de valores válidos, zero, singular/plural, dados malformados, antigos e futuros.
- Navegador com dados simulados em 1440/1280/1150/1024/768/600/390/320: altura da barra até 80 px, indicador e cadastro dentro da viewport, zero, singular, número grande, indisponibilidade e tema escuro.
- Verificação separada no navegador consultando a função pública real do Supabase, sem simular a resposta do indicador.

As capturas de layout com 12 pessoas usam um fixture de teste. Nenhum número ilustrativo é usado em produção. Não há nomes, IDs ou informações individuais nas respostas públicas.
