/* PADELTOOLS 7.7 — Homepage statistics from Player Center (no writes) */
(()=>{'use strict';
 const KEY='padeltools_playerhub_75';
 const $=id=>document.getElementById(id);
 function render(){
   const played=$('v61-played'),wins=$('v61-wins'),rate=$('v61-rate');
   if(!played||!wins||!rate)return;
   let data;
   try{data=JSON.parse(localStorage.getItem(KEY)||'null')}catch{return}
   if(!data||!Array.isArray(data.matches))return;
   const matches=data.matches.filter(m=>m&&typeof m==='object'&&typeof m.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(m.date)&&(m.result==='win'||m.result==='loss'));
   const victories=matches.reduce((n,m)=>n+(m.result==='win'?1:0),0);
   played.textContent=String(matches.length);
   wins.textContent=String(victories);
   rate.textContent=matches.length?Math.round(victories/matches.length*100)+' %':'—';
 }
 render();
 window.addEventListener('pageshow',render);
 window.addEventListener('focus',render);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
 window.addEventListener('storage',e=>{if(e.key===KEY||e.key===null)render()});
})();
