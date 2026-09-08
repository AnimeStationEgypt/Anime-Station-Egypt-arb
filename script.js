const anime=[
 {id:21,title:'One Piece',type:'أنمي',meta:'مغامرات • شونين',desc:'رحلة لوفي وطاقم قبعة القش نحو أعظم كنز في العالم.'},
 {id:20,title:'Naruto',type:'أنمي',meta:'نينجا • أكشن',desc:'رحلة ناروتو من طفل يحلم بالاعتراف إلى نينجا يعتمد عليه الجميع.'},
 {id:38000,title:'Demon Slayer',type:'أنمي',meta:'أكشن • فانتازيا',desc:'تانجيرو ينطلق في رحلة لإنقاذ أخته ومواجهة الشياطين.'},
 {id:5114,title:'Fullmetal Alchemist: Brotherhood',type:'أنمي',meta:'فانتازيا • دراما',desc:'الأخوان إلريك يبحثان عن وسيلة لاستعادة ما فقداه.'},
 {id:11061,title:'Hunter x Hunter',type:'أنمي',meta:'مغامرات • أكشن',desc:'غون يبدأ رحلة طويلة ليصبح صيادًا ويبحث عن والده.'},
 {id:1575,title:'Code Geass',type:'أنمي',meta:'خيال • دراما',desc:'ليلوش يحصل على قوة غامضة ويبدأ ثورة لتغيير العالم.'}
];
const manga=[
 {id:2,title:'Berserk',type:'مانجا',meta:'دارك فانتازيا • دراما',desc:'ملحمة غاتس في عالم قاسٍ مليء بالصراعات والمواجهات.'},
 {id:13,title:'One Piece',type:'مانجا',meta:'مغامرات • شونين',desc:'مانجا المغامرة الشهيرة لعالم القراصنة والكنوز.'},
 {id:42,title:'Dragon Ball',type:'مانجا',meta:'أكشن • شونين',desc:'مغامرات غوكو وأصدقائه في عالم مليء بالتحديات.'},
 {id:44347,title:'Chainsaw Man',type:'مانجا',meta:'أكشن • فانتازيا',desc:'دينجي يدخل عالم صائدي الشياطين بقوة غير عادية.'},
 {id:118846,title:'Solo Leveling',type:'مانجا',meta:'أكشن • فانتازيا',desc:'صياد ضعيف يحصل على نظام يغير مستقبله بالكامل.'},
 {id:23390,title:'My Hero Academia',type:'مانجا',meta:'أبطال • أكشن',desc:'إيزوكو يحاول أن يصبح بطلاً رغم ولادته بلا قوة.'}
];
const videos=[
 ['مشهد أكشن تجريبي — Anime Station','مشهد قصير بأسلوب سينمائي','https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
 ['One Piece — عالم المغامرة','عرض تجريبي للواجهة','https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
 ['Naruto — طريق النينجا','مشهد تجريبي','https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
 ['Demon Slayer — مواجهة ملحمية','مشهد تجريبي قصير','https://www.youtube.com/watch?v=dQw4w9WgXcQ']
];

const imgCache=new Map();
async function getCover(id,type='anime'){
 const key=type+id;if(imgCache.has(key))return imgCache.get(key);
 try{const r=await fetch(`https://api.jikan.moe/v4/${type==='manga'?'manga':'anime'}/${id}`);const j=await r.json();const u=j.data?.images?.jpg?.large_image_url||j.data?.images?.jpg?.image_url;imgCache.set(key,u);return u}catch(e){return ''}
}
function card(item,type){const d=document.createElement('article');d.className='card';d.dataset.search=(item.title+' '+item.meta+' '+item.type).toLowerCase();d.innerHTML=`<div class="poster"><span class="badge">${item.type}</span><img alt="${item.title}" loading="lazy"></div><h3>${item.title}</h3><p>${item.meta}</p>`;d.onclick=()=>openDetail(item,type);getCover(item.id,type).then(u=>{if(u)d.querySelector('img').src=u});return d}
function render(list,type,el){el.innerHTML='';if(!list.length){el.innerHTML='<div class="no-results">لا توجد نتائج مطابقة لبحثك.</div>';return}list.forEach(x=>el.appendChild(card(x,type)))}
render(anime,'anime',document.querySelector('#animeGrid'));render(manga,'manga',document.querySelector('#mangaGrid'));

document.querySelector('#videoGrid').innerHTML=videos.map(v=>`<article class="video"><div class="thumb"><a class="play" href="${v[2]}" target="_blank" rel="noopener" aria-label="تشغيل">▶</a></div><h3>${v[0]}</h3><p>${v[1]}</p></article>`).join('');

const modal=document.querySelector('#detailModal'),content=document.querySelector('#modalContent');
async function openDetail(item,type){modal.classList.add('open');modal.setAttribute('aria-hidden','false');content.innerHTML=`<div class="detail"><div class="poster"><img id="detailImg" alt="${item.title}"></div><div><span class="eyebrow">${type==='manga'?'MANGA':'ANIME'}</span><h2>${item.title}</h2><p>${item.meta}</p><p>${item.desc}</p><a class="primary" href="#videos" onclick="closeDetail()">استكشف الفيديوهات</a></div></div>`;const u=await getCover(item.id,type);if(u)document.querySelector('#detailImg').src=u}
function closeDetail(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.querySelector('#closeModal').onclick=closeDetail;modal.onclick=e=>{if(e.target===modal)closeDetail()};

document.querySelector('#searchInput').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();const filter=(arr,type,el)=>render(arr.filter(x=>(x.title+' '+x.meta+' '+x.type).toLowerCase().includes(q)),type,el);filter(anime,'anime',document.querySelector('#animeGrid'));filter(manga,'manga',document.querySelector('#mangaGrid'));});
document.querySelector('#menuBtn').onclick=()=>document.querySelector('.nav').classList.toggle('open');
document.querySelectorAll('.nav a').forEach(a=>a.onclick=()=>document.querySelector('.nav').classList.remove('open'));
document.querySelectorAll('[data-filter]').forEach(btn=>btn.onclick=()=>document.getElementById(btn.dataset.filter).scrollIntoView({behavior:'smooth'}));
