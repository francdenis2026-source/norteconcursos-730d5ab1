update public.study_materials
set body_md=replace(body_md,'## 4. Lotação inicial e permanência — art. 65, § 13, e art. 65, §§ 14 a 16','## 4. Lotação inicial e permanência — art. 67, §§ 13 a 16'),
source_note='LC nº 129/2004 consolidada após LC nº 496/2025 e LC nº 526/2026; especialmente arts. 64 a 79-E e art. 67, §§ 13 a 16, conforme texto oficial e remissão expressa do Edital PC-AC 2026, item 1.2.2.',
updated_at=now()
where slug='pcac-2026-lc129-atualizacao-lc526-2026-ingresso-formacao-lotacao';