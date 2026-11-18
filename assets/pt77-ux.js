/* PADELTOOLS 7.7 — Mobile navigation and accessibility (no storage writes). */
(()=>{'use strict';
const isCenter=/\/herramientas\/centro-jugador\.html$/.test(location.pathname);
const main=document.querySelector('main');if(!main)return;
if(!main.id)main.id='pt-main';
const lang=(document.documentElement.lang||'es').slice(0,2);
const words={es:{skip:'Saltar al contenido',home:'Inicio',tools:'Herramientas',player:'Mi centro',id:'PADEL ID',top:'Volver arriba',nav:'Navegación rápida'},en:{skip:'Skip to content',home:'Home',tools:'Tools',player:'My center',id:'PADEL ID',top:'Back to top',nav:'Quick navigation'},de:{skip:'Zum Inhalt springen',home:'Start',tools:'Werkzeuge',player:'Mein Zentrum',id:'PADEL ID',top:'Nach oben',nav:'Schnellnavigation'}};
const t=words[lang]||words.es;
const skip=document.createElement('a');skip.href='#pt-main';skip.className='pt77-skip';skip.textContent=t.skip;document.body.prepend(skip);
if(isCenter){
 const nav=document.createElement('nav');nav.className='pt77-mobile-nav';nav.setAttribute('aria-label',t.nav);
 const entries=[['../index.html','⌂',t.home],['index.html','▦',t.tools],['centro-jugador.html','◉',t.player],['padel-id.html','♙',t.id]];
 for(const [href,symbol,label] of entries){const a=document.createElement('a');a.href=href;a.textContent=symbol+' ';const span=document.createElement('span');span.textContent=label;a.append(span);if(label===t.player){a.setAttribute('aria-current','page');a.className='current'}nav.append(a)}
 document.body.append(nav);document.body.classList.add('pt77-has-nav');
}
const top=document.createElement('button');top.type='button';top.className='pt77-top';top.setAttribute('aria-label',t.top);top.textContent='↑';top.hidden=true;top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));document.body.append(top);
let ticking=false;const update=()=>{top.hidden=scrollY<700;ticking=false};addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});update();
})();