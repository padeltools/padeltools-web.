/* PADELTOOLS 7.7 — Explicit profile save; compatible with existing PADEL ID auto-save. */
(()=>{'use strict';const button=document.getElementById('pt77-save-profile'),status=document.getElementById('pt77-save-status');if(!button||!status)return;
const messages={es:['Guardar cambios','Perfil guardado correctamente.','No se pudo guardar. Comprueba el almacenamiento del navegador.'],en:['Save changes','Profile saved successfully.','Could not save. Check browser storage.'],de:['Änderungen speichern','Profil erfolgreich gespeichert.','Speichern fehlgeschlagen. Bitte Browserspeicher prüfen.']};
function tr(){const v=document.getElementById('lang')?.value||'es';return messages[v]||messages.es}
function translate(){button.textContent=tr()[0];status.textContent=''}
document.getElementById('lang')?.addEventListener('change',translate);
button.addEventListener('click',()=>{const fields=['name','level','position','style'],current={};for(const k of fields){const el=document.getElementById(k);if(!el)return;current[k]=el.value}try{const key='padeltools_id_76',previous=JSON.parse(localStorage.getItem(key)||'{}');const next={...previous,...current};localStorage.setItem(key,JSON.stringify(next));const verify=JSON.parse(localStorage.getItem(key)||'{}');if(fields.some(k=>verify[k]!==current[k]))throw Error('verify');status.textContent=tr()[1];status.style.color='#286744';}catch(e){status.textContent=tr()[2];status.style.color='#9b3d3d';}});
translate();})();
