/** Runs before hydration: a missing entry or lazy chunk can precede React's boundary. */
export const CHUNK_RECOVERY_SCRIPT = `(function(){
  var pattern=/failed to fetch dynamically imported module|loading chunk|importing a module script failed|failed to load module script/i;
  function recover(value){
    if(!pattern.test(String(value&&value.message||value||''))||!navigator.onLine)return;
    try{
      var key='norte-stale-chunk-recovery',now=Date.now(),previous=Number(sessionStorage.getItem(key)||0);
      if(previous&&now-previous<10000)return;
      sessionStorage.setItem(key,String(now));
      var url=new URL(location.href);
      url.searchParams.set('_nc_reload',String(now));
      location.replace(url.href);
    }catch(e){ /* The visible error boundary remains available when storage is blocked. */ }
  }
  window.addEventListener('vite:preloadError',function(event){recover(event.payload);});
  window.addEventListener('unhandledrejection',function(event){recover(event.reason);});
  window.addEventListener('error',function(event){recover(event.error||event.message);});
})();`;