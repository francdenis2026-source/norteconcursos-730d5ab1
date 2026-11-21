update public.study_materials
set body_md=replace(
  body_md,
  '- **Art. 156 — pedido de reconsideração:** é dirigido à autoridade que expediu o ato ou proferiu a primeira decisão; não pode ser renovado.',
  '- **Art. 156 — pedido de reconsideração:** é dirigido à autoridade que expediu o ato ou proferiu a primeira decisão; não pode ser renovado. O parágrafo único determina que o requerimento e o pedido de reconsideração sejam despachados em cinco dias e decididos dentro de trinta dias.'
),
updated_at=now()
where slug='pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025';