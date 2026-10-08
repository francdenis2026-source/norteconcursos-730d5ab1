---
name: legal-study-highlights
description: Revisar grifos pedagógicos dos textos legais e guias jurídicos da biblioteca Norte Concursos, preservando integralmente a fonte oficial.
---

# Grifos para estudo de legislação

Use ao criar ou revisar destaques de leis na biblioteca. Identifique expressões que mudam o enquadramento: sujeito, finalidade específica, requisitos cumulativos/alternativos, exceções, negações, quantidade, prazo, limite e sanção. Prefira a expressão completa a uma palavra genérica como “lei” ou “crime”.

As categorias e regras de exibição ficam em `src/lib/legalHighlights.ts`; a leitura compartilhada fica em `src/components/library/LegalStudyReading.tsx`. As regras são marcadores lexicais, não interpretação jurídica automática nem uma seleção exaustiva do que a banca cobra. Compare novos padrões com contextos positivos e contraexemplos antes de generalizar.

Preserve caracteres, acentos, espaços, pontuação, remissões e conteúdo do texto oficial. Aplique marcação somente na apresentação; nunca regrave a lei com base em correspondência lexical. Não insira HTML da fonte. Mantenha links íntegros e o modo sem grifos. Grifos de texto e fundos dos casos concretos precisam coexistir com contraste nos temas claro e escuro.

Mudanças de conteúdo jurídico exigem a governança do projeto e fonte compilada oficial conferida; jurisprudência exige o tribunal competente. Não confunda destaque de “revogado” com validação de vigência. Não crie questão ativa de edital apenas a partir de um grifo. Use recuperação ativa: após ler, o aluno explica a regra e a exceção sem consultar; a skill Tutor pode apoiar a pedagogia, sem substituir essas verificações.

Valide reconstrução exata do texto, sobreposição de padrões, limites de palavras, intervalos numéricos, segurança de renderização e ausência de dicas na etapa de recuperação ainda não revelada. Execute os testes e verifique os pontos de integração dos guias e da leitura integral.
