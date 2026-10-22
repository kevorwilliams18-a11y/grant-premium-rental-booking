'use strict';
document.getElementById('year').textContent = new Date().getFullYear();
const toggle=document.querySelector('.menu-toggle');
const nav=document.getElementById('main-nav');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');toggle.focus();}});

document.querySelectorAll('[data-price]').forEach(element=>{const rate=window.RENTAL_CONFIG?.dailyRates[element.dataset.price];if(Number.isFinite(rate)&&rate>0)element.textContent=new Intl.NumberFormat('en-JM',{style:'currency',currency:'JMD',currencyDisplay:'code'}).format(rate)+' / day';});
