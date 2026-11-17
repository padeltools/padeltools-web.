(()=>{'use strict';
const KEY='padeltools_playerhub_75',ID_LANG='padeltools_id_lang';
const $=id=>document.getElementById(id);
const copy={
es:{eyebrow:'DATOS DEL CENTRO DEL JUGADOR',title:'Tu rendimiento conectado',local:'Datos locales',description:'Las cifras proceden exclusivamente de los partidos registrados. Se actualizan al volver a esta pantalla.',losses:'Derrotas',last10:'Victorias últimos 10',streak:'Racha actual',trainings:'Entrenamientos',recent:'Tus últimos partidos',open:'Abrir Centro del Jugador',updated:'Sincronizado con el historial local',empty:'Todavía no hay partidos registrados.',win:'V',loss:'D'},
en:{eyebrow:'PLAYER CENTER DATA',title:'Your connected performance',local:'Local data',description:'Figures are calculated only from your saved matches. They refresh when you return to this page.',losses:'Losses',last10:'Wins in last 10',streak:'Current streak',trainings:'Training sessions',recent:'Your latest matches',open:'Open Player Center',updated:'Synced with local match history',empty:'No matches saved yet.',win:'W',loss:'L'},
de:{eyebrow:'DATEN AUS DEM SPIELERZENTRUM',title:'Deine vernetzte Leistung',local:'Lokale Daten',description:'Alle Werte stammen ausschließlich aus gespeicherten Matches und werden beim Zurückkehren aktualisiert.',losses:'Niederlagen',last10:'Siege letzte 10',streak:'Aktuelle Serie',trainings:'Trainings',recent:'Deine letzten Matches',open:'Spielerzentrum öffnen',updated:'Mit lokalem Spielverlauf synchronisiert',empty:'Noch keine Matches gespeichert.',win:'S',loss:'N'}};
function lang(){const v=$('lang')?.value||localStorage.getItem(ID_LANG)||'es';return copy[v]?v:'es'}
function getData(){try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&Array.isArray(v.matches)?v:null}catch{return null}}
function validDate(s){if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;const d=new Date(s+'T12:00:00');return !Number.isNaN(d.getTime())&&d.toISOString().slice(0,10)===s}
function sortMatches(a,b){return b.date.localeCompare(a.date)||String(b.id||'').localeCompare(String(a.id||''))}
function sync(){
 const t=copy[lang()];document.querySelectorAll('[data-8c]').forEach(el=>{const v=t[el.dataset['8c']];if(v)el.textContent=v});
 const data=getData(),matches=(data?.matches||[]).filter(m=>m&&validDate(m.date)&&(m.result==='win'||m.result==='loss')).sort(sortMatches);
 const wins=matches.filter(m=>m.result==='win').length,losses=matches.length-wins,recent=matches.slice(0,10),recentWins=recent.filter(m=>m.result==='win').length;
 let streak=0;const result=matches[0]?.result;if(result)for(const m of matches){if(m.result!==result)break;streak++}
 $('pt8c-losses').textContent=String(losses);
 $('pt8c-last10').textContent=recent.length?recentWins+' / '+recent.length:'—';
 $('pt8c-streak').textContent=streak?(result==='win'?t.win:t.loss)+' '+streak:'—';
 $('pt8c-trainings').textContent=String(Array.isArray(data?.training)?data.training.length:0);
 const history=$('pt8c-history');history.replaceChildren();
 if(!recent.length){const el=document.createElement('p');el.className='pt8c-empty';el.textContent=t.empty;history.append(el)}
 else for(const m of recent.slice().reverse()){const el=document.createElement('span');el.className='pt8c-result '+m.result;el.textContent=m.result==='win'?t.win:t.loss;el.title=m.date+' · '+(m.result==='win'?t.win:t.loss);history.append(el)}
 $('pt8c-updated').textContent=t.updated;
 // Refresh the original card counters without modifying the player's saved profile.
 const n=matches.length; $('matches').textContent=String(n);$('wins').textContent=String(wins);$('rate').textContent=n?Math.round(wins/n*100)+'%':'—';
}
$('lang')?.addEventListener('change',sync);
window.addEventListener('pageshow',sync);
window.addEventListener('focus',sync);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync()});
window.addEventListener('storage',e=>{if(e.key===KEY||e.key===ID_LANG)sync()});
sync();
})();