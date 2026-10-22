(function(){
  const key='grant-rental-theme', system=matchMedia('(prefers-color-scheme: dark)');
  let explicit;try{explicit=localStorage.getItem(key);}catch{}
  function setTheme(theme){document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;document.querySelectorAll('.theme-toggle').forEach(b=>{b.textContent=theme==='dark'?'Light mode':'Dark mode';b.setAttribute('aria-pressed',String(theme==='dark'));b.setAttribute('aria-label','Switch to '+(theme==='dark'?'light':'dark')+' mode');});}
  setTheme(explicit==='dark'||explicit==='light'?explicit:system.matches?'dark':'light');
  document.addEventListener('DOMContentLoaded',()=>{setTheme(document.documentElement.dataset.theme);document.querySelectorAll('.theme-toggle').forEach(b=>b.addEventListener('click',()=>{explicit=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(explicit);try{localStorage.setItem(key,explicit);}catch{}}));});
  system.addEventListener('change',e=>{if(explicit!=='dark'&&explicit!=='light')setTheme(e.matches?'dark':'light');});
})();
