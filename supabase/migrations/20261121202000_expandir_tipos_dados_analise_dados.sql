-- Amplia a explicação didática sobre tipos de dados no material PC-AC 2026.
-- Atualização idempotente por substituição da seção delimitada, preservando o restante da aula.
update public.study_materials
set body_md = regexp_replace(
  body_md,
  '## 2\. Tipos de dados.*?## 3\. Fontes de informação',
  $replacement$## 2. Tipos de dados

Os dados podem ser classificados conforme a maneira como estão organizados. A pergunta principal é: **o sistema já sabe exatamente onde cada informação fica ou precisa interpretar o conteúdo para encontrá-la?**

### 2.1 Dados estruturados

São dados organizados em um **formato previamente definido**, normalmente com tabelas, colunas e tipos de campos conhecidos. Cada informação ocupa um lugar determinado.

Pense em uma ficha de cadastro com espaços próprios para nome, CPF, data de nascimento e município. O sistema sabe que o campo “data de nascimento” deve receber uma data e que “município” deve receber um nome de cidade.

**Exemplo de uma tabela de ocorrências:**

| Número | Data | Município | Natureza |
|---|---|---|---|
| 001 | 10/11/2026 | Rio Branco | Furto |
| 002 | 11/11/2026 | Cruzeiro do Sul | Roubo |

Nesse caso, todas as linhas seguem as mesmas colunas. O banco consegue localizar, por exemplo, todas as ocorrências registradas em Rio Branco ou em determinada data.

- **Onde aparecem:** bancos de dados relacionais, planilhas organizadas, cadastros e tabelas com campos definidos.
- **Como reconhecer na prova:** o enunciado fala em linhas, colunas, campos fixos, registros padronizados ou esquema previamente definido.

### 2.2 Dados semiestruturados

Possuem **alguma organização**, mas não precisam seguir uma tabela rígida com exatamente as mesmas colunas para todos os registros. A estrutura aparece por meio de etiquetas, chaves, marcadores ou metadados que identificam o significado de cada parte.

Imagine uma encomenda: ela não está organizada em uma tabela, mas tem etiquetas como “destinatário”, “endereço” e “código de rastreio”. Essas etiquetas ajudam o sistema a entender o conteúdo.

**Exemplo em JSON:**

```json
{
  "servidor": "Ana",
  "matricula": 1254,
  "lotacao": "Delegacia Central"
}
```

As chaves “servidor”, “matricula” e “lotacao” identificam o significado dos valores. Outro registro poderia trazer um campo adicional, como “telefone”, sem que todos os registros precisassem ter exatamente o mesmo conjunto de campos.

- **Outros exemplos:** XML, arquivos JSON, e-mails com cabeçalho e corpo, logs de sistemas e documentos com metadados.
- **Como reconhecer na prova:** há marcadores ou organização identificável, mas o formato é mais flexível do que uma tabela fixa.

**Atenção:** JSON e XML não são exemplos de dados sem estrutura. Eles possuem organização por chaves ou etiquetas; por isso, são normalmente classificados como semiestruturados.

### 2.3 Dados não estruturados

São dados que **não seguem um modelo tabular ou um conjunto fixo de campos para organizar seu conteúdo principal**. A informação pode estar em linguagem natural, som, imagem ou vídeo. Para localizar ou interpretar o que interessa, muitas vezes é necessário analisar o próprio conteúdo.

Pense em uma gravação de uma ligação: o arquivo existe e pode ter nome, data e duração, mas o conteúdo da conversa não está automaticamente separado em colunas como “nome do suspeito”, “endereço” e “horário”. Alguém ou algum sistema precisa analisar a gravação para identificar esses elementos.

**Exemplos:**
- texto livre de um depoimento ou relato;
- fotografia de uma ocorrência;
- gravação de áudio de uma ligação;
- vídeo de uma câmera de segurança;
- documento digitalizado como imagem, sem texto organizado em campos.

- **Como reconhecer na prova:** o enunciado menciona texto livre, imagem, fotografia, áudio, vídeo ou conteúdo cujo significado não está separado em campos padronizados.

### 2.4 Comparação para não confundir

| Tipo | Como está organizado? | Exemplo fácil |
|---|---|---|
| **Estruturado** | Campos fixos e esquema definido | Tabela de cadastro |
| **Semiestruturado** | Chaves, etiquetas ou marcadores; estrutura flexível | JSON ou XML |
| **Não estruturado** | Sem esquema tabular fixo para o conteúdo principal | Áudio, foto ou vídeo |

### 2.5 Um mesmo trabalho pode reunir os três tipos

Imagine uma investigação policial:

1. A planilha com número da ocorrência, data e município é **estruturada**.
2. O arquivo JSON exportado pelo sistema, com chaves que identificam cada informação, é **semiestruturado**.
3. O vídeo da câmera de segurança e o áudio de uma testemunha são **não estruturados**.

Os três materiais podem ser analisados em conjunto. O tipo depende da forma como o dado está organizado, e não do assunto tratado.

### 2.6 Pegadinhas frequentes em concursos

- **Planilha com colunas definidas:** em regra, dado estruturado.
- **JSON ou XML:** semiestruturado, pois utiliza chaves ou etiquetas.
- **Fotografia, áudio e vídeo:** exemplos típicos de dados não estruturados.
- **Arquivo digital não significa dado estruturado:** uma foto salva no computador continua sendo, quanto ao conteúdo principal, não estruturada.
- **Estrutura não é sinônimo de qualidade:** uma tabela pode estar perfeitamente organizada e conter datas erradas, informações incompletas ou registros duplicados.
- **Uma base pode misturar os três tipos:** não é obrigatório que todo o conteúdo de uma organização pertença a apenas uma categoria.

**Técnica para resolver:** procure primeiro a pista sobre a organização. Se houver campos fixos e padronizados, marque **estruturado**. Se houver chaves, etiquetas ou marcadores com flexibilidade, marque **semiestruturado**. Se o conteúdo for texto livre, imagem, áudio ou vídeo sem campos fixos, marque **não estruturado**.

## 3. Fontes de informação$replacement$,
  'gs'
),
updated_at = now()
where slug = 'pcac-2026-guia-analise-dados-01-fundamentos-ciclo-analitico'
  and body_md like '%## 2. Tipos de dados%'
  and body_md like '%## 3. Fontes de informação%';
