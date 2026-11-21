-- Complemento didático autoral aprovado pelo responsável: objeto direto pleonástico.
-- Idempotente; não altera os quizzes nem os registros de revisão existentes.
UPDATE public.study_materials
SET body_md = body_md || $lesson$

---

## 🎯 Questão de concurso: reconheça o objeto direto pleonástico

**Em qual alternativa há objeto direto pleonástico?**

A) Quem submete todos os seus atos à própria censura.

B) Isso os ocupados não têm tempo de fazer.

C) Não lhes sobra tempo para examinar o passado.

D) O que havemos de atravessar é duvidoso.

E) Esse período os ocupados o perdem.

**Gabarito: E.** A expressão **esse período** aparece antes do verbo e é retomada pelo pronome pessoal átono **o**. O mesmo objeto direto é expresso duas vezes para receber destaque.

### 🧩 Mapa visual: dois termos, um único objeto

| Objeto antecipado | Pronome que o retoma | Verbo | Pergunta ao verbo |
| --- | --- | --- | --- |
| **ESSE PERÍODO** | **O** | perdem | Perdem **o quê?** Esse período. |
| **ESSAS QUESTÕES** | **AS** | resolvi | Resolvi **o quê?** Essas questões. |

> 💡 **DICA DE PROVA — SETA DE RETOMADA:** **Esse período** → **o**. Se as duas expressões apontam para o mesmo objeto direto, procure o **pleonasmo**. Na frase “Essas questões, eu **as** resolvi”, **essas questões** → **as**.

### 🔎 Passo a passo para acertar

1. **Encontre o verbo:** *perdem*.
2. **Pergunte ao verbo:** “perdem o quê?” → *esse período*.
3. **Procure a repetição:** o pronome **o** também representa *esse período*.
4. **Conclua:** há **objeto direto pleonástico**, porque o objeto foi antecipado e retomado por um pronome.

**Sem pleonasmo:** “Os ocupados perdem esse período.”

**Com pleonasmo:** “**Esse período**, os ocupados **o** perdem.”

### ⚠️ Por que as outras alternativas não são a resposta?

- **A:** não apresenta objeto direto antecipado e retomado por pronome átono.
- **B:** “isso” está antecipado, mas não é repetido por um pronome átono com a mesma função. **Atenção:** antecipar um objeto não basta para criar pleonasmo.
- **C:** “lhes” equivale a “a eles” e exerce função de **objeto indireto**, não retoma objeto direto antecipado.
- **D:** não apresenta a repetição de um objeto direto por pronome átono.
- **E:** **esse período → o**: a retomada está explícita.

### 🧠 Macete para memorizar

**OBJETO + PRONOME DE RETOMADA = OBJETO DIRETO PLEONÁSTICO**, desde que ambos tenham a mesma referência e a função sintática seja de objeto direto.

Os pronomes **o, a, os, as** são pistas frequentes, mas sua presença isolada **não** comprova pleonasmo. É indispensável localizar o objeto repetido.

### ✍️ Fixação: duas questões autorais

**1.** Em “Aquelas orientações, nós **as** seguimos”, há objeto direto pleonástico?

**Resposta: sim.** “Aquelas orientações” é o objeto antecipado; “as” retoma exatamente esse objeto. Pergunte: seguimos o quê? Aquelas orientações.

**2.** Em “Nós **as** seguimos”, o pronome “as” sozinho comprova objeto direto pleonástico?

**Resposta: não.** Há objeto direto pronominal, mas a frase não apresenta outro termo explícito repetindo o mesmo objeto.

**Nota editorial:** exemplo de questão apresentado pelo usuário em imagem de aula; banca e ano não confirmados. A explicação e as questões de fixação são autorais.
$lesson$,
    updated_at = now()
WHERE slug = 'pcac-2026-portugues-10-sintaxe-oracao-periodo'
  AND content_status = 'active'
  AND position('## 🎯 Questão de concurso: reconheça o objeto direto pleonástico' in body_md) = 0;
