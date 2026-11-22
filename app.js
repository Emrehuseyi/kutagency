(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const products={
 tatlilar:[
  {name:'Fıstık Gibi',desc:'Antep fıstığı ve yoğun Belçika çikolatasıyla imza lezzet.',image:'product.webp',kind:'İMZA LEZZET'},
  {name:'Ebruli',desc:'Waffle, meyve ve çikolatanın sevilen buluşması.',image:'waffle.webp',kind:'WAFFLE'},
  {name:'Buket',desc:'Meyveler ve çikolatanın tatlı uyumu.',image:'meyveli.webp',kind:'MEYVELİ'},
  {name:'Kadife',desc:'Kek dokusu ve çikolatanın dengesi.',image:'lifestyle_1.webp',kind:'PASTA'},
  {name:'Begonvil',desc:'Çikolatanın yoğunluğunu sevenlere.',image:'cikolata_krem.webp',kind:'ÇİKOLATALI'},
  {name:'Gardenya',desc:'Özel sunumlu çikolatalı tatlı.',image:'truffe.webp',kind:'ÇİKOLATALI'},
  {name:'Spoonful',desc:'Kaşık kaşık çikolata deneyimi.',image:'sufle.webp',kind:'KAŞIK TATLISI'},
  {name:'Yonca (Vegan)',desc:'Vegan seçenekler arasından bir lezzet.',image:'meyveli.webp',kind:'VEGAN'},
  {name:'Alçiçek',desc:'Meyveyle buluşan yumuşak kek dokusu.',image:'kahve_kek.webp',kind:'ÖZEL SUNUM'},
  {name:'Saksı',desc:'Farklı sunumuyla dikkat çeken tatlı.',image:'hero.webp',kind:'ÖZEL SUNUM'},
  {name:'LoveBombing',desc:'Bazı şubelerde sunulan özel lezzet.',image:'brownie_icecek.webp',kind:'ŞUBEYE ÖZEL'},
  {name:'Gökkuşağı BOX',desc:'Bazı şubelerde sunulan paylaşmalık seçenek.',image:'lifestyle_3.webp',kind:'ŞUBEYE ÖZEL'}],
 kahveler:[
  {name:'Caffè Latte',desc:'Espresso ve sütle yumuşak bir kahve molası.',image:'lifestyle_4.webp',kind:'KAHVE'},
  {name:'Caffè Mocha',desc:'Kahve ve çikolatanın vazgeçilmez ikilisi.',image:'kahve_kek.webp',kind:'KAHVE'},
  {name:'Türk Kahvesi',desc:'Klasik, tanıdık ve güçlü bir aroma.',image:'lifestyle_4.webp',kind:'KAHVE'},
  {name:'Americano',desc:'Espressonun yalın karakteri.',image:'lifestyle_4.webp',kind:'KAHVE'},
  {name:'White Mocha',desc:'Beyaz çikolatalı yumuşak içim.',image:'lifestyle_4.webp',kind:'KAHVE'},
  {name:'Filtre Kahve',desc:'Sade ve dengeli kahve keyfi.',image:'lifestyle_4.webp',kind:'KAHVE'}],
 icecekler:[
  {name:'Sıcak Çikolata',desc:'Çikolata sevenler için sıcacık bir mola.',image:'pour.webp',kind:'SICAK'},
  {name:'Ice Mocha',desc:'Çikolatanın serin kahveyle buluşması.',image:'lifestyle_4.webp',kind:'SOĞUK'},
  {name:'Ice Latte',desc:'Buzlu ve hafif kahve.',image:'lifestyle_4.webp',kind:'SOĞUK'},
  {name:'Cool Lime',desc:'Güne ferahlık katan bir içecek.',image:'lifestyle_4.webp',kind:'SOĞUK'},
  {name:'Berry Hibiscus',desc:'Meyvemsi, ferah bir alternatif.',image:'lifestyle_4.webp',kind:'SOĞUK'},
  {name:'Çay',desc:'Tatlı sohbetlere eşlik eden klasik.',image:'lifestyle_4.webp',kind:'SICAK'}]
};
const branches={ankara:[{name:'Mamak',area:'MAMAK / ANKARA'},{name:'Pursaklar',area:'PURSAKLAR / ANKARA'},{name:'Hamamönü',area:'ALTINDAĞ / ANKARA'},{name:'Kızılay',area:'ÇANKAYA / ANKARA'},{name:'Etlik',area:'KEÇİÖREN / ANKARA'}],kirikkale:[{name:'Kırıkkale – Yenişehir',area:'YAHŞİHAN / KIRIKKALE'}]};
const safe=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
let category='tatlilar',expanded=false,filtered=[],lastFocused=null;
function getFiltered(){const q=$('#menuSearch').value.trim().toLocaleLowerCase('tr-TR');return products[category].filter(x=>(x.name+' '+x.desc).toLocaleLowerCase('tr-TR').includes(q))}
function renderMenu(){filtered=getFiltered();const entries=expanded?filtered:filtered.slice(0,6);$('#productGrid').innerHTML=entries.length?entries.map((x,i)=>`<article class="product"><button type="button" class="product-button" data-index="${i}" aria-label="${safe(x.name)} ürün detayını görüntüle"><div class="product-img"><img src="images/${safe(x.image)}" loading="lazy" alt="${safe(x.name)} için temsili çekim"><span class="product-index">${String(i+1).padStart(2,'0')} / ${String(filtered.length).padStart(2,'0')}</span><span class="product-plus" aria-hidden="true">+</span></div><div class="product-detail"><div><h3>${safe(x.name)}</h3><p>${safe(x.desc)}</p></div><span class="product-kind">${safe(x.kind)}</span></div></button></article>`).join(''):'<p class="empty-state">Bu aramayla eşleşen ürün bulunamadı.</p>';
const more=$('#seeMore');more.hidden=filtered.length<=6;more.innerHTML=expanded?'DAHA AZ GÖSTER <span>↑</span>':`TÜM LEZZETLERİ GÖSTER <span>↓</span>`}
$$('.filter').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;expanded=false;$('#menuSearch').value='';$$('.filter').forEach(x=>{const yes=x===b;x.classList.toggle('active',yes);x.setAttribute('aria-selected',yes?'true':'false')});renderMenu()}));
$('#menuSearch').addEventListener('input',()=>{expanded=false;renderMenu()});$('#seeMore').addEventListener('click',()=>{expanded=!expanded;renderMenu()});
const dialog=$('#productDialog');function closeDialog(){dialog.classList.remove('open');dialog.setAttribute('aria-hidden','true');document.body.classList.remove('no-scroll');lastFocused?.focus()}
$('#productGrid').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(!b)return;const p=filtered[Number(b.dataset.index)];if(!p)return;lastFocused=document.activeElement;$('#dialogImage').src='images/'+p.image;$('#dialogTitle').textContent=p.name;$('#dialogDesc').textContent=p.desc;$('#dialogCategory').textContent=p.kind;dialog.classList.add('open');dialog.setAttribute('aria-hidden','false');document.body.classList.add('no-scroll');$('.dialog-close').focus()});
$$('[data-close]').forEach(b=>b.addEventListener('click',closeDialog));$('#dialogCTA').addEventListener('click',closeDialog);
dialog.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const focusable=$$('[data-close],#dialogCTA');const first=focusable[1],last=focusable[focusable.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
function renderBranches(city='ankara'){$('#branchList').innerHTML=branches[city].map((x,i)=>{const q=encodeURIComponent(`Çikolata Kuşağı ${x.name} ${city==='ankara'?'Ankara':'Kırıkkale'}`);return `<article class="branch-entry"><span class="branch-num">${String(i+1).padStart(2,'0')}</span><div class="branch-copy"><h3>${safe(x.name)}</h3><p>${safe(x.area)}</p></div><a href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener noreferrer" aria-label="${safe(x.name)} için haritada arama aç">↗</a></article>`}).join('');$$('.city-tab').forEach(b=>{const yes=b.dataset.city===city;b.classList.toggle('selected',yes);b.setAttribute('aria-selected',String(yes))})}
$$('.city-tab').forEach(b=>b.addEventListener('click',()=>renderBranches(b.dataset.city)));
const mobile=$('#mobileMenu'),toggle=$('#mobileToggle');function toggleMenu(open){mobile.classList.toggle('open',open);mobile.inert=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç');document.body.classList.toggle('no-scroll',open)}toggle.addEventListener('click',()=>toggleMenu(!mobile.classList.contains('open')));$$('#mobileMenu a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(dialog.classList.contains('open'))closeDialog();if(mobile.classList.contains('open'))toggleMenu(false)}});
const header=$('#header');window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>15),{passive:true});
const video=$('#heroVideo'),sound=$('#soundToggle');sound.addEventListener('click',async()=>{video.muted=!video.muted;sound.querySelector('span').textContent=video.muted?'SESİ AÇ':'SESİ KAPAT';sound.setAttribute('aria-pressed',String(!video.muted));if(!video.muted){video.volume=.4;try{await video.play()}catch(e){video.muted=true;sound.querySelector('span').textContent='SESİ AÇ'}}});if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){video.pause()}else{const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)video.play().catch(()=>{});else video.pause()}),{threshold:.05});obs.observe($('.hero'))}
const f=$('#franchiseForm');f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f).entries());if(!d.consent)return;const msg=['ÇİKOLATA KUŞAĞI — FRANCHISE ÖN BAŞVURU','',`Ad Soyad: ${d.name.trim()}`,`Telefon: ${d.phone.trim()}`,`E-posta: ${d.email.trim()}`,`Şehir / İlçe: ${d.city.trim()}`,`Not: ${d.message?.trim()||'-'}`].join('\n');$('#formSummary').value=msg;$('#mailSummary').href='mailto:?subject='+encodeURIComponent('Çikolata Kuşağı — Franchise Ön Başvuru')+'&body='+encodeURIComponent(msg);f.hidden=true;$('#formResult').hidden=false;$('#formResult').scrollIntoView({behavior:'smooth',block:'center'})});$('#editForm').addEventListener('click',()=>{f.hidden=false;$('#formResult').hidden=true});$('#copySummary').addEventListener('click',async()=>{const v=$('#formSummary').value;try{await navigator.clipboard.writeText(v);$('#copySummary').textContent='KOPYALANDI ✓'}catch(e){$('#formSummary').select();document.execCommand('copy');$('#copySummary').textContent='KOPYALANDI ✓'}});$('#year').textContent=new Date().getFullYear();renderMenu();renderBranches();
})();
