-- Complemento autoral sobre verbo vicário; idempotente.
UPDATE public.study_materials SET body_md=body_md || $lesson$

---

## Verbo vicário: substitua o verbo, não repita a ação

**Questão inicial:** Em “Ana estuda mais do que Bruno faz”, o verbo **faz** significa produzir algo ou substitui **estuda**? **Resposta: substitui estuda.**

### 🧩 Mapa visual de substituição

| Frase repetitiva | Frase com verbo vicário | O que foi substituído? |
| --- | --- | --- |
| Pedro corre mais do que Lucas **corre**. | Pedro corre mais do que Lucas **faz**. | **faz → corre** |
| Ana estuda mais do que Bruno **estuda**. | Ana estuda mais do que Bruno **faz**. | **faz → estuda** |
| Maria respondeu rapidamente, como Pedro **respondeu**. | Maria respondeu rapidamente, como Pedro **fez**. | **fez → respondeu** |

> 💡 **DICA VISUAL DE PROVA:** imagine uma seta saindo de **faz** e apontando para o verbo anterior: **FAZ → ESTUDA**. Se a troca preserva o sentido e evita repetição, o verbo exerce função vicária.

### Explicação fácil

“Vicário” quer dizer **substituto**. O verbo vicário recupera uma ação que já apareceu no contexto. O verbo **fazer** é muito frequente nessa função, mas nem todo **fazer** é vicário.

**Compare:**

- “Paulo treina mais do que seu colega **faz**.” → **faz** substitui **treina**: vicário.
- “A cozinheira **faz** bolos.” → **faz** significa prepara/produz: **não** é vicário.

### Técnica de resolução em três passos

1. Identifique o verbo que parece substituir uma ação, especialmente **faz**, **fez** ou **fazia**.
2. Procure a ação anterior e troque o verbo candidato por ela, conjugando adequadamente.
3. Verifique se o sentido se mantém e se a função é evitar a repetição. Se sim, é uso vicário.

**Cuidado:** o verbo não é vicário por sua forma isolada. O contexto decide.

### Duas questões autorais comentadas

**1.** Em “Mariana lê mais livros do que seu irmão faz”, “faz” substitui qual verbo? **Resposta: lê.** Reescrevendo: “Mariana lê mais livros do que seu irmão lê.”

**2.** Em “A cozinheira faz bolos para vender”, “faz” é vicário? **Resposta: não.** Aqui o verbo significa preparar ou produzir; não retoma outro verbo mencionado.
$lesson$, updated_at=now() WHERE slug='portugues-verbos-tempos-vozes' AND content_status='active' AND position('## Verbo vicário: substitua o verbo, não repita a ação' in body_md)=0;
