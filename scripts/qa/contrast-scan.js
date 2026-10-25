// WCAG 2.x relative luminance. Solid backgrounds only; photographs/gradients need visual review.
(options) => {
  const { selector = "body *", headerFallback } = options || {};
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const rgba = color => { ctx.clearRect(0,0,1,1); ctx.fillStyle=color; ctx.fillRect(0,0,1,1); return [...ctx.getImageData(0,0,1,1).data].map((x,i)=>i===3?x/255:x); };
  const over=(f,b)=>{const a=f[3]+b[3]*(1-f[3]);return [0,1,2].map(i=>a?(f[i]*f[3]+b[i]*b[3]*(1-f[3]))/a:0).concat(a);};
  const lum=c=>c.slice(0,3).map(v=>{const n=v/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;}).reduce((v,n,i)=>v+n*[.2126,.7152,.0722][i],0);
  const checked=[], skipped=[];
  for (const el of document.querySelectorAll(selector)) {
    const text=[...el.childNodes].filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent).join(' ').trim();
    if(!text || !el.checkVisibility({checkOpacity:true,checkVisibilityCSS:true}) || el.closest('[disabled],[aria-disabled="true"],svg,script,style,[aria-hidden="true"]'))continue;
    const style=getComputedStyle(el);let bg=[0,0,0,0],reason='';
    for(let node=el;node;node=node.parentElement){const s=getComputedStyle(node);
      if(Number(s.opacity)<.99){reason='opacity';break;}
      if(s.backgroundImage!=='none'){
        if(headerFallback && node.matches('.app-topbar,.home-header,.daily-header')) { bg=over(bg,headerFallback);break; }
        reason='image/gradient';break;
      }
      bg=over(bg,rgba(s.backgroundColor));if(bg[3]>=.999)break;
    }
    if(reason || bg[3]<.999){skipped.push({text:text.slice(0,60),reason:reason||'transparent background'});continue;}
    const fg=over(rgba(style.color),bg), a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
    const large=parseFloat(style.fontSize)>=24 || (parseFloat(style.fontSize)>=18.66 && parseInt(style.fontWeight)>=700);
    checked.push({text:text.slice(0,85),class:el.className,ratio:Math.round(ratio*100)/100,required:large?3:4.5,foreground:style.color,background:bg.slice(0,3).map(Math.round)});
  }
  return {checked:checked.length, failures:checked.filter(x=>x.ratio<x.required).sort((a,b)=>a.ratio-b.ratio),skipped:skipped.length,exclusions:skipped.slice(0,10)};
}
