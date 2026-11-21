-- Expansão didática adicional de Administração, Arquivologia e TI — PC-AC 2026.
-- Atualiza aulas existentes sem criar duplicatas.
update public.study_materials as m
set summary = v.summary, body_md = v.body_md, updated_at = now()
from (values
('pcac-2026-guia-administracao-geral-11-trabalho-em-equipe-e-relacoes-interpessoais','Aprofunda diferença entre grupo e equipe, papéis, comunicação, confiança, conflitos, feedback, liderança, motivação e estágios de desenvolvimento de equipes.','# Trabalho em equipe e relações interpessoais

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Cinco servidores trabalham no mesmo setor, mas cada um executa tarefas isoladamente, sem objetivo compartilhado ou coordenação de resultados. Esse conjunto caracteriza:
>
> A) equipe de alto desempenho. B) grupo de pessoas, sem necessariamente constituir equipe. C) comissão formal obrigatória. D) equipe autogerida. E) rede integrada.
>
> **Resolução:** estar no mesmo setor não basta. Equipe pressupõe objetivo compartilhado, coordenação, complementaridade e responsabilidade pelo resultado. Gabarito: **B**.

## 1. Grupo e equipe: qual a diferença?
Grupo é um conjunto de pessoas que interagem ou compartilham alguma característica. Equipe é um grupo organizado para alcançar objetivo comum, com papéis coordenados e responsabilidade pelo resultado.

**Exemplo:** cinco servidores na mesma sala, cada qual cuidando de uma tarefa sem integração, formam um grupo de trabalho. Se planejam juntos o atendimento, dividem etapas, compartilham informações e respondem pelo resultado, atuam como equipe.

## 2. O que sustenta uma equipe eficaz?
- Objetivo claro: todos sabem qual resultado precisa ser alcançado.
- Papéis definidos: cada integrante entende sua contribuição.
- Competências complementares: habilidades diferentes se somam.
- Comunicação: informação chega a quem precisa, no momento adequado.
- Confiança e respeito: divergências podem ser discutidas sem humilhação.
- Responsabilidade: compromissos e prazos são acompanhados.
- Aprendizagem: erros são analisados para melhorar o processo.

Equipe não significa ausência de discordância. Divergência fundamentada pode melhorar decisões.

## 3. Desenvolvimento de equipes — modelo de Tuckman
O modelo didático apresenta fases:
1. Formação (forming): integrantes se conhecem e procuram entender objetivos e papéis.
2. Conflito/ajuste (storming): surgem divergências sobre métodos, liderança e responsabilidades.
3. Normatização (norming): acordos, regras e confiança se consolidam.
4. Desempenho (performing): equipe trabalha com maior autonomia e foco nos resultados.
5. Encerramento (adjourning): em equipes temporárias, conclui-se a tarefa e dissolvem-se os vínculos do projeto.

É um modelo explicativo, não uma lei rígida. Uma equipe pode voltar a fases anteriores quando muda a composição ou o objetivo.

## 4. Comunicação interpessoal
Comunicação eficaz exige mensagem clara, canal adequado, escuta e confirmação de entendimento. Ruídos podem surgir por linguagem ambígua, excesso de informação, hierarquia, pressa ou interpretações diferentes.

**Escuta ativa:** prestar atenção, não interromper, fazer perguntas de esclarecimento e resumir o que foi entendido. No serviço público, registre decisões e orientações relevantes pelos canais institucionais.

## 5. Conflitos: tipos e tratamento
- Conflito de tarefa: divergência sobre conteúdo, prioridade ou solução.
- Conflito de relacionamento: tensão pessoal, desrespeito ou incompatibilidade interpessoal.
- Conflito de processo: discordância sobre quem faz, quando ou como executar.

Uma resposta construtiva separa fatos de interpretações, identifica interesses, ouve envolvidos e busca solução compatível com objetivos, regras e respeito.

## 6. Estilos de administração de conflitos
- Competição: prioriza a própria posição; pode ser necessária em decisão urgente ou regra inegociável, mas pode deteriorar relações.
- Colaboração: procura solução que atenda interesses relevantes de todos; exige tempo e diálogo.
- Compromisso: cada lado cede parcialmente para chegar a acordo viável.
- Acomodação: uma parte abre mão de sua preferência, por exemplo quando o tema é pouco importante para ela.
- Evitação: adia ou não enfrenta o conflito; pode ser útil para ganhar tempo, mas não resolve problema persistente.

Não existe estilo sempre correto: depende de urgência, impacto, poder, regras e relacionamento.

## 7. Liderança e motivação
Liderança é influência para orientar pessoas em direção a objetivos comuns. Pode decorrer de posição formal ou reconhecimento informal. Chefia é posição organizacional; liderança envolve influência e mobilização.

Motivação varia entre pessoas e situações. O gestor pode favorecer condições de trabalho, clareza, reconhecimento, autonomia compatível, desenvolvimento e feedback. Não se deve presumir que todos são motivados pelo mesmo fator.

## 8. Feedback e responsabilidade
Feedback útil descreve comportamento observável, efeito produzido e expectativa futura. Evite rótulos pessoais. Combine ação concreta e prazo para revisão.

Responsabilidade compartilhada não significa que ninguém responde individualmente por sua parte. Papéis precisam estar claros, e a equipe deve acompanhar o resultado global.

## 9. Exemplo aplicado
Em uma equipe de atendimento, usuários aguardam porque cada servidor repete a conferência já realizada pelo colega. A equipe mapeia o fluxo, define quem confere cada dado, cria um canal para dúvidas e mede tempo e retrabalho. O ganho vem de coordenação e melhoria do processo, não de simplesmente exigir que cada pessoa trabalhe mais rápido.

## 10. Pegadinhas de prova
- Grupo e equipe não são sinônimos.
- Conflito pode ser funcional quando orientado à tarefa e tratado com respeito.
- Colaboração busca solução integradora; compromisso envolve concessões.
- Liderança não se limita ao cargo formal.
- Comunicação é processo de mão dupla; transmitir não garante compreensão.
- O modelo de Tuckman não obriga toda equipe a seguir fases rígidas.

**Macete:** equipe = objetivo comum + papéis coordenados + responsabilidade pelo resultado.'),
('pcac-2026-guia-arquivologia-10-digitalizacao-e-preservacao-distincoes-essenciais','Aprofunda digitalização, requisitos de qualidade e metadados, backup, preservação digital, integridade, autenticidade, migração, emulação e documentação de intervenções.','# Digitalização e preservação: distinções essenciais

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Uma instituição realiza cópias de segurança diárias de arquivos digitais. Isso, isoladamente, garante a preservação digital de longo prazo?
>
> A) Sim, backup e preservação são sinônimos. B) Sim, duas cópias bastam. C) Não; backup ajuda na recuperação, mas preservação exige contexto, metadados, integridade, autenticidade e estratégias contra obsolescência. D) Não, pois backup impede acesso. E) Sim, se os arquivos forem PDF.
>
> **Resolução:** backup é cópia para recuperação; preservação é política contínua para manter acesso, integridade, autenticidade e compreensão ao longo do tempo. Gabarito: **C**.

## 1. Digitalização
Digitalização converte documento originalmente não digital em representação digital, por exemplo, uma folha de papel capturada por scanner. A imagem obtida precisa ser legível, completa, identificada e vinculada ao documento de origem.

Um processo confiável define:
- preparação e conferência do original;
- resolução e parâmetros de captura adequados ao uso;
- controle de páginas, frente e verso, anexos e cores relevantes;
- conferência de legibilidade e completude;
- metadados de identificação e contexto;
- registro do responsável, data, equipamento e procedimento;
- armazenamento com controle de acesso e integridade.

**Atenção:** fotografar uma folha não significa, automaticamente, cumprir requisitos legais e arquivísticos para substituir o original.

## 2. Digitalização não é produção de documento nato-digital
Documento digitalizado nasce de um original não digital convertido em imagem ou arquivo. Documento nato-digital é produzido originalmente em ambiente digital, como formulário eletrônico, mensagem ou sistema.

A distinção importa porque o documento digitalizado depende da relação com o original e do procedimento de conversão; o nato-digital depende dos sistemas, metadados e controles que registraram sua produção.

## 3. Backup: para que serve?
Backup é cópia de segurança destinada a recuperar dados após falha, perda, ataque ou erro. Deve haver política de frequência, retenção, proteção contra alteração, cópias em locais distintos e testes periódicos de restauração.

Uma cópia nunca testada pode estar corrompida ou incompleta. Backup também pode reproduzir um arquivo já corrompido se não houver versões históricas.

## 4. Preservação digital
Preservação digital é o conjunto de ações técnicas e organizacionais para manter documentos acessíveis, íntegros, autênticos e compreensíveis ao longo do tempo. Enfrenta riscos como:
- falha ou obsolescência de mídias;
- formatos que deixam de ser suportados;
- sistemas e softwares descontinuados;
- perda de metadados e contexto;
- alteração não autorizada;
- perda de chaves, senhas ou dependências técnicas.

Não é uma tarefa feita uma única vez ao salvar o arquivo.

## 5. Integridade, autenticidade e confiabilidade
- Integridade: conteúdo permanece completo e sem alteração não autorizada.
- Autenticidade: é possível demonstrar que o documento é o que afirma ser, produzido ou recebido por quem se indica e mantido sob controles adequados.
- Confiabilidade: o documento representa adequadamente a atividade ou fato para o qual foi produzido.
- Disponibilidade: pode ser localizado e acessado por quem tem autorização.

Hash ou checksum ajuda a detectar alteração ao comparar valores calculados em momentos diferentes. Não prova, sozinho, autoria ou autenticidade; depende de registro confiável e cadeia de custódia.

## 6. Metadados
Metadados são informações sobre o documento e seu contexto: identificador, produtor, data, assunto, formato, versão, relação com processo, permissões, histórico e eventos de preservação. Sem metadados, um arquivo pode continuar existindo, mas perder significado e capacidade de ser localizado ou interpretado.

## 7. Estratégias de preservação
- Redundância: cópias em ambientes distintos e controlados.
- Verificação de integridade: checksums e registros de verificação.
- Migração: transferir conteúdo para formato ou ambiente atualizado, documentando mudanças e conferindo resultado.
- Emulação: reproduzir ambiente tecnológico antigo para interpretar arquivos dependentes de software ou hardware específico.
- Monitoramento: acompanhar formatos, mídias, riscos, dependências e capacidade de recuperação.

Migração e emulação não são sinônimos: migração transforma ou transfere o conteúdo; emulação reproduz o ambiente necessário para acessá-lo.

## 8. Cadeia de custódia e trilha de auditoria
Intervenções devem ser registradas: quem realizou, quando, por quê, com qual ferramenta, sobre qual arquivo, qual resultado e onde ficou armazenado. Preserve o original e a versão resultante conforme política institucional. Restrinja acessos e registre operações relevantes.

## 9. Exemplo resolvido
Um arquivo TIFF antigo precisa continuar acessível. A instituição verifica integridade, identifica dependências, migra uma cópia para formato atualizado, registra ferramenta e parâmetros, compara resultado, mantém metadados e preserva o arquivo de origem conforme a política. Apenas salvar em uma pasta nova não seria estratégia suficiente.

## 10. Pegadinhas
- Digitalização não é sinônimo de preservação.
- Backup ajuda na recuperação, mas não resolve sozinho obsolescência e contexto.
- PDF não garante autenticidade.
- Hash detecta alteração, mas não comprova autoria por si só.
- Migração transforma/transfere; emulação reproduz ambiente.
- Documento digitalizado não se torna automaticamente substituto legal do original.

**Macete:** backup = recuperar cópia; preservação = manter documento utilizável, íntegro, autêntico e compreensível ao longo do tempo.'),
('pcac-2026-ti-planilhas-analise-dados-importacao-deduplicacao','Aprofunda estrutura de bases, referências relativas/absolutas, funções, filtros, ordenação segura, tabelas dinâmicas, CSV, validação, deduplicação e rastreabilidade.','# Planilhas eletrônicas aplicadas à análise de dados

> **QUESTÃO DE ABERTURA — padrão IDECAN (autoral)**
>
> Ao ordenar uma tabela por sobrenome, qual cuidado evita associar endereço e telefone à pessoa errada?
>
> A) Selecionar somente a coluna do sobrenome. B) Ordenar a tabela inteira, mantendo cada linha como registro. C) Apagar colunas. D) Classificar cada coluna separadamente. E) Mesclar células.
>
> **Resolução:** cada linha representa um registro. A ordenação deve incluir todas as colunas para que os dados da mesma pessoa permaneçam juntos. Gabarito: **B**.

## 1. Como organizar uma base
Planilha tem células organizadas em linhas e colunas. Para análise:
- cada linha deve representar um registro;
- cada coluna deve representar uma variável;
- use cabeçalhos únicos e claros;
- mantenha um tipo de dado consistente por coluna;
- evite linhas em branco no meio da base;
- não misture subtotais e observações;
- mantenha identificador único quando possível.

Exemplo: uma tabela de atendimentos pode ter ID, data, unidade, categoria, situação e tempo de atendimento. Não coloque dois atendimentos diferentes na mesma linha.

## 2. Fórmulas e referências
Fórmulas normalmente começam com sinal de igual. Referências:
- relativa (A1): muda ao copiar;
- absoluta ($A$1): fixa linha e coluna;
- mista ($A1 ou A$1): fixa apenas coluna ou linha.

**Exemplo:** =A2*$B$1. Ao copiar para a linha seguinte, A2 vira A3, mas $B$1 permanece fixo. Isso é útil quando uma taxa fica em uma única célula.

Funções frequentes: SOMA, MÉDIA, MÍNIMO, MÁXIMO, CONT.SE, SOMASE, SE e funções de procura. Os nomes e separadores podem variar conforme idioma e programa.

## 3. Classificação e filtros
Classificar ordena os registros por um ou mais critérios. Filtro exibe apenas linhas que atendem a condições; não apaga as demais.

**Cuidado essencial:** ao ordenar, selecione ou expanda a tabela inteira. Se ordenar somente a coluna de nomes, os endereços podem ficar associados a pessoas erradas. Classificação por múltiplos níveis permite ordenar primeiro por município e depois por sobrenome.

## 4. Tabelas dinâmicas
Tabela dinâmica resume grandes conjuntos por categorias e medidas. Pode contar ocorrências, somar valores ou calcular médias por unidade, período ou categoria.

Exemplo: uma base com 2.000 atendimentos pode ser resumida por unidade para mostrar quantidade e tempo médio. A tabela dinâmica não corrige automaticamente dados mal preenchidos; primeiro limpe e padronize a base.

## 5. Gráficos
Gráficos facilitam comparação e identificação de tendências:
- barras/colunas: comparar categorias;
- linhas: acompanhar evolução temporal;
- dispersão: observar relação entre variáveis;
- setores: mostrar composição de poucas categorias, quando apropriado.

Sempre informe título, unidade, período, fonte e escala. Um eixo truncado pode exagerar diferenças visuais.

## 6. Importação e exportação
CSV é formato textual para dados tabulares. O delimitador pode ser vírgula, ponto e vírgula ou tabulação. Na importação, confira:
- codificação e acentos;
- separador de colunas;
- separador decimal;
- formato de data;
- zeros à esquerda em códigos;
- campos entre aspas;
- caracteres especiais.

Exportar para CSV pode remover fórmulas, formatação, múltiplas abas, validações e recursos do arquivo original. Guarde uma cópia da planilha original.

## 7. Validação e padronização
Validação de dados restringe entradas, por exemplo, lista de status permitidos ou intervalo numérico. Padronização corrige variações previsíveis, como espaços extras, caixa e formatos de data.

Não substitua automaticamente informação duvidosa. Registre regra aplicada, preserve valor original e marque casos que exigem revisão.

## 8. Duplicidades
Duplicidade pode ser identificada por ID, combinação de campos ou regra de negócio. Dois registros com mesmo nome podem ser pessoas diferentes; dois registros com mesmo ID podem ser duplicação ou erro.

Antes de remover:
1. defina a chave de comparação;
2. confira datas, origem e identificadores;
3. determine qual registro é mantido e por quê;
4. registre a decisão;
5. preserve cópia original e trilha de auditoria.

## 9. Dados ausentes e valores especiais
Célula vazia não é automaticamente zero. Pode significar “não informado”, “não aplicável” ou falha de preenchimento. Zero é um valor numérico. Não invente valores para completar lacunas.

## 10. Exemplo resolvido
Uma base contém “Rio Branco”, “RIO BRANCO” e “Rio-Branco”. Antes de agrupar, crie campo auxiliar normalizado com regra documentada. Preserve a grafia original para rastreabilidade e revise exceções. Não altere a fonte sem registro.

## 11. Pegadinhas
- Ordenar uma coluna isolada pode embaralhar registros.
- Filtro não elimina linhas ocultas.
- CSV não preserva todos os recursos de uma planilha.
- Referência absoluta permanece fixa ao copiar fórmula.
- Célula vazia não é igual a zero.
- Duplicidade exige critério; nomes iguais não significam necessariamente a mesma pessoa.

**Macete:** linha = registro; coluna = variável; filtro = mostrar subconjunto; ordenar = mudar sequência; tabela dinâmica = resumir.')
) as v(slug, summary, body_md)
where m.slug = v.slug;