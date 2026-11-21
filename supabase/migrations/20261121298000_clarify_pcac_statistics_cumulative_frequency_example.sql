-- Remove a confusing self-correction fragment from the worked cumulative-frequency example.
-- Idempotent: only the exact legacy sentence is replaced; all calculations and content remain unchanged.
update public.study_materials
set body_md = replace(
  body_md,
  $old$Terceira: 8 + 5? Não: use o acumulado anterior. 8 + 4 = 12.$old$,
  $new$Terceira: use o acumulado anterior (8) e some a frequência da terceira classe (4): 8 + 4 = 12.$new$
),
updated_at = now()
where slug = 'pcac-2026-estatistica-02-distribuicao-frequencias'
  and body_md like '%Terceira: 8 + 5? Não: use o acumulado anterior. 8 + 4 = 12.%';
