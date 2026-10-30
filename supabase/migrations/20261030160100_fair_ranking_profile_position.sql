-- Keep the candidate's profile placement in sync with the General ranking.
do $do$
declare body text;
begin
 select pg_get_functiondef('public.get_ranking_profile(uuid)'::regprocedure) into body;
 if position('row_number() over (order by x.qp + x.sp + x.fp + x.ep desc, x.user_id) as pos' in body) > 0 then
   body := replace(body,
    'row_number() over (order by x.qp + x.sp + x.fp + x.ep desc, x.user_id) as pos',
    'rank() over (order by x.qp + x.sp + x.fp + x.ep desc, coalesce(x.qc::numeric / nullif(x.qn,0), -1) desc, x.qc desc, x.qn desc, x.sp desc) as pos');
   execute body;
 elsif position('rank() over (order by x.qp + x.sp + x.fp + x.ep desc, coalesce(x.qc::numeric' in body) = 0 then
   raise exception 'Unrecognized ranking profile definition';
 end if;
end $do$;
