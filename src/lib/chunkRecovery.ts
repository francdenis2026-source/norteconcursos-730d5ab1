/** Runs before hydration: a missing entry or lazy chunk can precede React's boundary. */
export const CHUNK_RECOVERY_SCRIPT = `(function(){
  var pattern=/failed to fetch dynamically imported module|loading chunk|importing a module script failed|failed to load module script/i;
  function recover(value){
    if(!pattern.test(String(value&&value.message||value||''))||!navigator.onLine)return;
    try{
      // Up to 4 attempts per minute; throttled attempts are delayed (not dropped) so a
      // second rebuild arriving mid-reload no longer leaves a blank screen.
      if(window.__ncRecoveryPending)return;
      var key='norte-stale-chunk-recovery',now=Date.now(),list=[];
      try{list=JSON.parse(sessionStorage.getItem(key)||'[]');}catch(e){list=[];}
      if(!Array.isArray(list))list=[];
      list=list.filter(function(t){return typeof t==='number'&&now-t<60000;});
      if(list.length>=4)return;
      var last=list.length?list[list.length-1]:0,wait=last&&now-last<3000?3000:0;
      list.push(now);
      sessionStorage.setItem(key,JSON.stringify(list));
      window.__ncRecoveryPending=true;
      setTimeout(function(){
        var url=new URL(location.href);
        url.searchParams.set('_nc_reload',String(Date.now()));
        location.replace(url.href);
      },wait);
    }catch(e){ /* The visible error boundary remains available when storage is blocked. */ }
  }
  window.addEventListener('vite:preloadError',function(event){recover(event.payload);});
  window.addEventListener('unhandledrejection',function(event){recover(event.reason);});
  window.addEventListener('error',function(event){
    var t=event.target;
    // Failed <script type=module>/<link rel=modulepreload> loads fire a plain Event on the element (no message, no bubbling): capture them.
    if(t&&t!==window&&(t.tagName==='SCRIPT'&&t.type==='module'||t.tagName==='LINK'&&/modulepreload/.test(t.rel||''))){recover('failed to load module script');return;}
    recover(event.error||event.message);
  },true);
})();`;