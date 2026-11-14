-- Explicita a aplicação subsidiária da progressão da Lei 2.250/2009 à estrutura especial da Lei 3.228/2017.
update public.study_materials
set body_md=replace(body_md,
'Não confundir promoção com progressão: promoção muda de classe; progressão, na disciplina geral do PCCR, corresponde à movimentação entre referências salariais dentro da mesma classe, observada a lei aplicável ao cargo.',
'Não confundir promoção com progressão: promoção muda de classe; progressão é a passagem de uma referência salarial para a imediatamente superior dentro da mesma classe (Lei nº 2.250/2009, art. 15). A Lei nº 3.228/2017 mantém a estrutura própria de cinco classes e, em seu art. 17, determina a aplicação subsidiária da Lei nº 2.250/2009. Assim, a regra de progressão deve ser lida subsidiariamente e somente naquilo que não conflitar com a estrutura especial da Lei nº 3.228/2017.')
|| E'\n\n## 8. Progressão e promoção: base subsidiária\n\nA Lei nº 2.250/2009, art. 15, define progressão como passagem de uma referência salarial para a imediatamente superior, dentro da mesma classe, com interstício de 36 meses em cada referência. O art. 16 define promoção como elevação para a referência inicial da classe imediatamente superior. Para os servidores abrangidos pela Lei nº 3.228/2017, o art. 17 desta lei determina aplicação subsidiária da Lei nº 2.250/2009. Em prova, priorize a estrutura especial de cinco classes da Lei nº 3.228/2017 e utilize a regra subsidiária da Lei nº 2.250/2009 apenas quando compatível.'
,
source_note='Edital nº 001 SEAD/PCAC/2026, Anexo III; ALAC, Lei nº 2.250/2009 (arts. 7, 11, 12, 15, 16 e 18), Lei nº 3.228/2017 (arts. 4 a 17) e Lei nº 3.288/2017; Portal LEGIS, LC nº 496/2025. Consulta em 14/11/2026.',
legal_review=jsonb_set(legal_review,'{notes}',to_jsonb('Progressão: Lei 2.250/2009, art. 15, aplicada subsidiariamente por força do art. 17 da Lei 3.228/2017, apenas naquilo que não conflitar com a estrutura especial de cinco classes. Promoção por classe: Lei 3.228/2017, arts. 7, 8 e 11. LC 496/2025 mantém a estrutura da Lei 3.228/2017.'::text)),
updated_at=now()
where slug='pcac-2026-pccr-lei-2250-2009-lei-3228-2017-lc-496-2025';
