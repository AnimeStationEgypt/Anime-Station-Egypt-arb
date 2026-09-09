const anime=[
 {id:21,title:'One Piece',type:'أنمي',meta:'مغامرات • شونين',desc:'رحلة لوفي وطاقم قبعة القش نحو أعظم كنز في العالم.',hero:true},
 {id:20,title:'Naruto',type:'أنمي',meta:'نينجا • أكشن',desc:'رحلة ناروتو من طفل يحلم بالاعتراف إلى نينجا يعتمد عليه الجميع.'},
 {id:38000,title:'Demon Slayer',type:'أنمي',meta:'أكشن • فانتازيا',desc:'تانجيرو ينطلق في رحلة لإنقاذ أخته ومواجهة الشياطين.'},
 {id:5114,title:'Fullmetal Alchemist: Brotherhood',type:'أنمي',meta:'فانتازيا • دراما',desc:'الأخوان إلريك يبحثان عن وسيلة لاستعادة ما فقداه.'},
 {id:11061,title:'Hunter x Hunter',type:'أنمي',meta:'مغامرات • أكشن',desc:'غون يبدأ رحلة طويلة ليصبح صيادًا ويبحث عن والده.'},
 {id:1575,title:'Code Geass',type:'أنمي',meta:'خيال • دراما',desc:'ليلوش يحصل على قوة غامضة ويبدأ ثورة لتغيير العالم.'},
 {id:859,title:'Mobile Suit Gundam',type:'أنمي',meta:'خيال علمي • أكشن',desc:'صراع ملحمي في مستقبل تتغير فيه موازين القوى.'},
 {id:1535,title:'Death Note',type:'أنمي',meta:'غموض • نفسي',desc:'دفتر غامض يضع صاحبه أمام قرارات تغير مصير العالم.'}
];
const manga=[
 {id:2,title:'Berserk',type:'مانجا',meta:'دارك فانتازيا • دراما',desc:'ملحمة غاتس في عالم قاسٍ مليء بالصراعات والمواجهات.'},
 {id:13,title:'One Piece',type:'مانجا',meta:'مغامرات • شونين',desc:'مانجا المغامرة الشهيرة لعالم القراصنة والكنوز.',official:'https://mangaplus.shueisha.co.jp/'},
 {id:42,title:'Dragon Ball',type:'مانجا',meta:'أكشن • شونين',desc:'مغامرات غوكو وأصدقائه في عالم مليء بالتحديات.'},
 {id:44347,title:'Chainsaw Man',type:'مانجا',meta:'أكشن • فانتازيا',desc:'دينجي يدخل عالم صائدي الشياطين بقوة غير عادية.',official:'https://mangaplus.shueisha.co.jp/'},
 {id:118846,title:'Solo Leveling',type:'مانجا',meta:'أكشن • فانتازيا',desc:'صياد ضعيف يحصل على نظام يغير مستقبله بالكامل.'},
 {id:23390,title:'My Hero Academia',type:'مانجا',meta:'أبطال • أكشن',desc:'إيزوكو يحاول أن يصبح بطلاً رغم ولادته بلا قوة.'},
 {id:3,title:'20th Century Boys',type:'مانجا',meta:'غموض • دراما',desc:'قصة غامضة تتشابك فيها ذكريات الطفولة مع مستقبل العالم.'},
 {id:15,title:'Gintama',type:'مانجا',meta:'كوميديا • أكشن',desc:'مغامرات ساخرة تجمع الكوميديا والقتال في عالم غير عادي.'}
];

// Verified video list: removed the two reported broken entries and use well-known official trailer IDs.
const videos=[
 ['One Piece — العرض الرسمي','فيديو YouTube مضمّن داخل المنصة','S8_YwFLCh4U'],
 ['Naruto — العرض الرسمي','فيديو YouTube مضمّن داخل المنصة','vZ1mP7m8p0Q'],
 ['Demon Slayer — العرض الرسمي','فيديو YouTube مضمّن داخل المنصة','VQGCKyvzIM4'],
 ['Jujutsu Kaisen — العرض الرسمي','فيديو YouTube مضمّن داخل المنصة','pkKu9hLT-t8'],
 ['Attack on Titan — العرض الرسمي','فيديو YouTube مضمّن داخل المنصة','MGRm4IzK1SQ'],
 ['Bleach — Thousand-Year Blood War','فيديو YouTube مضمّن داخل المنصة','78WIYzX_m98'],
 ['Dragon Ball Super — العرض','فيديو YouTube مضمّن داخل المنصة','b-d0q5dV3nQ'],
 ['My Hero Academia — عرض الموسم','فيديو YouTube مضمّن داخل المنصة','Q7w7tK3hQhQ']
];

const imgCache=new Map();
const coverOverrides={
 'anime38000':'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg',
 'anime5114':'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg',
 'anime11061':'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg',
 'anime1575':'https://cdn.myanimelist.net/images/anime/1032/135088l.jpg',
 'manga2':'https://cdn.myanimelist.net/images/manga/1/157897l.jpg',
 'manga13':'https://cdn.myanimelist.net/images/manga/2/253146l.jpg'
};
function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
async function getCover(id,type='anime'){
 const key=type+id;
 if(imgCache.has(key))return imgCache.get(key);
 if(coverOverrides[key]){imgCache.set(key,coverOverrides[key]);return coverOverrides[key]}
 const endpoint=type==='manga'?'manga':'anime';
 for(let attempt=0;attempt<3;attempt++){
  try{
   const r=await fetch(`https://api.jikan.moe/v4/${endpoint}/${id}`);
   if(r.ok){const j=await r.json();const u=j.data?.images?.jpg?.large_image_url||j.data?.images?.jpg?.image_url||'';if(u){imgCache.set(key,u);return u}}
   if(r.status===429)await sleep(900*(attempt+1));
  }catch(e){if(attempt<2)await sleep(600*(attempt+1))}
 }
 return ''
}
function fallbackImage(el,title){el.onerror=null;el.src=`https://placehold.co/500x750/0d1a2c/67c8ff?text=${encodeURIComponent(title)}`}
function card(item,type){
 const d=document.createElement('article');d.className='card';d.dataset.search=(item.title+' '+item.meta+' '+item.type).toLowerCase();
 d.innerHTML=`<div class="poster"><span class="badge">${item.type}</span><img alt="${item.title}" loading="lazy"></div><h3>${item.title}</h3><p>${item.meta}</p>`;
 d.onclick=()=>openDetail(item,type);
 const img=d.querySelector('img');img.onerror=()=>fallbackImage(img,item.title);getCover(item.id,type).then(u=>{img.src=u||`https://placehold.co/500x750/0d1a2c/67c8ff?text=${encodeURIComponent(item.title)}`});return d
}
function render(list,type,el){el.innerHTML='';if(!list.length){el.innerHTML='<div class="no-results">لا توجد نتائج مطابقة لبحثك.</div>';return}list.forEach(x=>el.appendChild(card(x,type)))}
const animeGrid=document.querySelector('#animeGrid'),mangaGrid=document.querySelector('#mangaGrid');render(anime,'anime',animeGrid);render(manga,'manga',mangaGrid);

const videoGrid=document.querySelector('#videoGrid');
videoGrid.innerHTML=videos.map(v=>`<article class="video" data-video-id="${v[2]}" data-video-title="${v[0]}"><div class="thumb"><img loading="lazy" alt="${v[0]}" src="https://i.ytimg.com/vi/${v[2]}/hqdefault.jpg" onerror="this.src='https://placehold.co/800x450/10243e/67c8ff?text=Anime+Station'"><button class="play" type="button" aria-label="تشغيل ${v[0]}">▶</button></div><h3>${v[0]}</h3><p>${v[1]}</p></article>`).join('');

document.querySelectorAll('.video').forEach(card=>card.addEventListener('click',()=>openVideoPlayer(card.dataset.videoId,card.dataset.videoTitle)));
const playerModal=document.querySelector('#videoPlayerModal') || (()=>{
 const el=document.createElement('div');el.id='videoPlayerModal';el.className='video-player-modal';el.setAttribute('aria-hidden','true');el.innerHTML=`<div class="video-player-shell"><button class="video-player-close" type="button" aria-label="إغلاق الفيديو">×</button><div class="video-player-frame"><iframe id="youtubePlayer" title="Anime Station video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><h2 id="videoPlayerTitle"></h2><p>الفيديو يعمل داخل Anime Station عبر مشغل YouTube الرسمي.</p></div>`;document.body.appendChild(el);return el;})();
const youtubePlayer=document.querySelector('#youtubePlayer');
const videoPlayerTitle=document.querySelector('#videoPlayerTitle');
function openVideoPlayer(videoId,title){
 videoPlayerTitle.textContent=title;youtubePlayer.src=`https://www.youtube.com/embed/${encodeURIComponent(videoId)}?playsinline=1&rel=0&modestbranding=1&origin=${encodeURIComponent(location.origin)}`;playerModal.classList.add('open');playerModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-lock');
}
function closeVideoPlayer(){youtubePlayer.src='';playerModal.classList.remove('open');playerModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-lock')}
playerModal.querySelector('.video-player-close').onclick=closeVideoPlayer;playerModal.addEventListener('click',e=>{if(e.target===playerModal)closeVideoPlayer()});

const modal=document.querySelector('#detailModal'),content=document.querySelector('#modalContent');
async function openDetail(item,type){
 modal.classList.add('open');modal.setAttribute('aria-hidden','false');
 content.innerHTML=`<div class="detail"><div class="poster"><img id="detailImg" alt="${item.title}"></div><div><span class="eyebrow">${type==='manga'?'MANGA':'ANIME'}</span><h2>${item.title}</h2><p><b>${item.meta}</b></p><p>${item.desc}</p><div class="detail-actions"><button class="primary" type="button" onclick="closeDetail();document.getElementById('videos').scrollIntoView({behavior:'smooth'})">شاهد الفيديوهات</button>${item.official?`<a class="secondary" href="${item.official}" target="_blank" rel="noopener">المصدر الرسمي</a>`:''}</div></div></div>`;
 const img=document.querySelector('#detailImg');img.onerror=()=>fallbackImage(img,item.title);const u=await getCover(item.id,type);img.src=u||`https://placehold.co/500x750/0d1a2c/67c8ff?text=${encodeURIComponent(item.title)}`
}
function closeDetail(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.querySelector('#closeModal').onclick=closeDetail;modal.onclick=e=>{if(e.target===modal)closeDetail()};document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDetail();closeVideoPlayer()}});

document.querySelector('#searchInput').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();render(anime.filter(x=>(x.title+' '+x.meta+' '+x.type).toLowerCase().includes(q)),'anime',animeGrid);render(manga.filter(x=>(x.title+' '+x.meta+' '+x.type).toLowerCase().includes(q)),'manga',mangaGrid);});
const menu=document.querySelector('#mainNav'),menuBtn=document.querySelector('#menuBtn');menuBtn.onclick=()=>{const open=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)};document.querySelectorAll('.nav a').forEach(a=>a.onclick=()=>{menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')});
document.querySelectorAll('[data-filter]').forEach(btn=>btn.onclick=()=>document.getElementById(btn.dataset.filter).scrollIntoView({behavior:'smooth'}));
getCover(21,'anime').then(u=>{if(u)document.querySelector('#heroBackdrop').style.backgroundImage=`url('${u}')`});
