// Keyset pagination avoids offset drift when concurrent inserts precede a page.
export async function collectSnapshotRows(order, requestPage) {
 const rows=[];
 for (;;) {
  const params=new URLSearchParams({select:'*',order:`${order}.asc`,limit:'200'});
  if(rows.length)params.set(order,`gt.${rows.at(-1)[order]}`);
  const page=await requestPage(params);
  if(!Array.isArray(page))throw Error('Snapshot page must be an array');
  let previous=rows.at(-1)?.[order];
  for(const row of page){
   const current=row[order];
   if(typeof current!=='string'||!current||(previous!==undefined&&current<=previous))throw Error('Snapshot cursor is missing, duplicated or out of order');
   previous=current;
  }
  rows.push(...page);
  if(page.length<200)return rows;
 }
}
