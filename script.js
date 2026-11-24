document.querySelectorAll('.menu-toggle').forEach(b=>b.addEventListener('click',()=>{const nav=document.querySelector('.navlinks');const open=nav.classList.toggle('open');b.setAttribute('aria-expanded',String(open));}));document.querySelectorAll('[data-contact]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const name=form.querySelector('[name=name]').value.trim(),email=form.querySelector('[name=email]').value.trim(),message=form.querySelector('[name=message]').value.trim();const status=form.querySelector('.status');if(!name||!email||!message){status.textContent='Please complete all fields.';return;}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){status.textContent='Please enter a valid email address.';return;}const subject=encodeURIComponent('Portfolio inquiry from '+name);const body=encodeURIComponent('From: '+name+' ('+email+')\n\n'+message);status.textContent='Your email application will open. Please send the draft to complete your message.';window.location.href='mailto:REPLACE_WITH_MEMBER_EMAIL@example.com?subject='+subject+'&body='+body;}));

// Decorative mouse trail. Keep it out of the way of links and media controls.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const bubbleColors = ['#38bdf8', '#67e8f9', '#a78bfa'];
let lastBubbleTime = -Infinity;

document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reducedMotion.matches ||
        event.timeStamp - lastBubbleTime < 40) {
        return;
    }
    lastBubbleTime = event.timeStamp;

    const bubble = document.createElement('span');
    bubble.setAttribute('aria-hidden', 'true');
    const size = 10 + Math.random() * 14;
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    Object.assign(bubble.style, {
        position: 'fixed',
        left: (event.clientX - size / 2) + 'px',
        top: (event.clientY - size / 2) + 'px',
        width: size + 'px',
        height: size + 'px',
        border: '2px solid ' + color,
        borderRadius: '50%',
        boxShadow: 'inset 0 0 5px ' + color,
        pointerEvents: 'none',
        zIndex: '9999'
    });
    document.body.append(bubble);
    const drift = Math.random() * 44 - 22;
    const animation = bubble.animate([
        { transform: 'scale(0.65)', opacity: 0.95 },
        { transform: 'translate(' + drift + 'px, -60px) scale(1.25)', opacity: 0 }
    ], { duration: 700, easing: 'ease-out' });
    animation.onfinish = () => bubble.remove();
    animation.oncancel = () => bubble.remove();
}, { passive: true });

// Shared portfolio enhancements
(function(){
const member=location.pathname.match(/member([1-5])\.html$/);
const style=document.createElement('style');
style.textContent="a:focus-visible,button:focus-visible{outline:3px solid #94dec9;outline-offset:4px} .nova-skills{display:flex;flex-wrap:wrap;gap:.65rem;padding:0;list-style:none} .nova-skills li{border:1px solid #426a70;background:#192b39;color:#c0f1e5;border-radius:999px;padding:.5rem .9rem} .nova-gallery{width:min(94vw,1100px);max-height:94vh;background:#101729;color:#f4f6ff;border:1px solid #426a70;border-radius:16px;padding:1rem;text-align:center} .nova-gallery::backdrop{background:rgba(0,0,0,.88)} .nova-gallery img{display:block;max-width:100%;max-height:70vh;object-fit:contain;margin:1rem auto} .nova-gallery button,.nova-gallery-open{background:#94dec9;color:#101729;border:0;border-radius:8px;padding:.6rem .9rem;font:inherit;font-weight:700;cursor:pointer} .nova-gallery nav{min-height:0;justify-content:center;flex-wrap:wrap;gap:.7rem} .nova-gallery-open{margin:.7rem 0} .nova-footer-note{padding:1rem 0;color:#a9b4cb;font-size:.9rem} .nova-footer-note a{color:#94dec9} .nova-member-top{position:fixed;right:1rem;bottom:1rem;width:3rem;height:3rem;border:0;border-radius:50%;background:#94dec9;color:#101729;font-size:1.4rem;z-index:20;cursor:pointer} .nova-member-top[hidden]{display:none} @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{transition:none!important;animation:none!important}}";document.head.append(style);
const footer=document.querySelector('footer');if(footer){const note=document.createElement('div');note.className='container nova-footer-note';note.innerHTML='<strong>University of Sharjah</strong> · Interactive Multimedia · Fall 2026<br><a href="index.html#team">Meet the team</a> · <a href="index.html#work">Explore projects</a>';footer.append(note);}
if(!member)return;
const skills=[['HTML','Adobe Premiere','Adobe Dreamweaver','Adobe Photoshop','Artificial Intelligence'],['Graphic Design','Adobe Illustrator','Programming','Interactive Multimedia','Project reporting'],['HTML','CSS','Adobe Photoshop','3D Design','3D Printing'],['Graphic design','Digital workspace design','Multimedia','Teamwork'],['Graphic design','Visual composition','Multimedia','Technology']];
const section=document.createElement('section');section.id='skills';section.setAttribute('aria-labelledby','nova-skills-title');section.innerHTML='<div class="container"><div class="eyebrow">CAPABILITIES</div><h2 class="section-title" id="nova-skills-title">Skills & tools</h2><ul class="nova-skills"></ul></div>';skills[Number(member[1])-1].forEach(label=>{const item=document.createElement('li');item.textContent=label;section.querySelector('ul').append(item);});const projects=document.querySelector('#projects');if(projects)projects.before(section);else document.querySelector('main').append(section);
const topBtn=document.createElement('button');topBtn.className='nova-member-top';topBtn.type='button';topBtn.textContent='↑';topBtn.setAttribute('aria-label','Back to top');topBtn.hidden=true;document.body.append(topBtn);window.addEventListener('scroll',()=>{topBtn.hidden=window.scrollY<400;},{passive:true});topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:reducedMotion.matches?'auto':'smooth'}));
const images=[...document.querySelectorAll('main img')].filter(img=>!img.classList.contains('avatar'));if(!images.length || !window.HTMLDialogElement)return;
const dialog=document.createElement('dialog');dialog.className='nova-gallery';dialog.setAttribute('aria-label','Project image gallery');dialog.innerHTML='<button type="button" data-close autofocus>Close ×</button><img alt=""><p aria-live="polite"></p><nav aria-label="Gallery controls"><button type="button" data-prev>← Previous</button><button type="button" data-next>Next →</button></nav>';document.body.append(dialog);let current=0;let opener;
function show(i){current=(i+images.length)%images.length;const source=images[current];const preview=dialog.querySelector('img');preview.src=source.currentSrc||source.src;preview.alt=source.alt||'Project artwork';dialog.querySelector('p').textContent=(current+1)+' / '+images.length+' — '+preview.alt;}
images.forEach((img,i)=>{const trigger=document.createElement('button');trigger.type='button';trigger.className='nova-gallery-open';trigger.textContent='View full screen ↗';const anchor=img.closest('a');const tile=document.createElement('div');tile.style.minWidth='0';const original=anchor||img;original.before(tile);tile.append(original,trigger);trigger.style.display='block';trigger.style.width='100%';trigger.style.height='auto';trigger.addEventListener('click',()=>{opener=trigger;show(i);dialog.showModal();});});dialog.querySelector('[data-close]').onclick=()=>dialog.close();dialog.querySelector('[data-prev]').onclick=()=>show(current-1);dialog.querySelector('[data-next]').onclick=()=>show(current+1);dialog.addEventListener('close',()=>{if(opener)opener.focus();});dialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1);});
})();
