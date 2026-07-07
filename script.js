// Intro
window.addEventListener('load', () => {
  setTimeout(() => {
    const intro = document.getElementById('intro');
    intro.classList.add('hide');
    setTimeout(() => intro.remove(), 1000);
  }, 3000);
});

// Mehfil name letter-by-letter reveal
(function(){
  const el = document.getElementById('mehfilLetters');
  if(!el) return;
  const name = 'Mohammed';
  el.innerHTML = name.split('').map((c,i)=>`<span class="letter" style="animation-delay:${0.1 + i*0.04}s">${c}</span>`).join('');
})();

// Typed roles
(function(){
  const roles = ['Data Analyst','AI & ML Student','Maths Tutor'];
  const out = document.getElementById('typed');
  if(!out) return;
  let ri=0,i=0,del=false;
  function tick(){
    const cur = roles[ri];
    if(!del){ i++; out.textContent = cur.slice(0,i); if(i===cur.length){del=true; return setTimeout(tick,1800);} }
    else { i--; out.textContent = cur.slice(0,i); if(i===0){del=false; ri=(ri+1)%roles.length;} }
    setTimeout(tick, del?45:90);
  }
  tick();
})();

// Ambient particles
(function(){
  const c = document.getElementById('ambient');
  for(let i=0;i<28;i++){
    const s = document.createElement('span');
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*100+'%';
    s.style.animationDuration = (6+Math.random()*6)+'s';
    s.style.animationDelay = (Math.random()*4)+'s';
    c.appendChild(s);
  }
})();

// Nav scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if(window.scrollY>30) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
  const doc = document.documentElement;
  const p = window.scrollY / (doc.scrollHeight - doc.clientHeight);
  document.getElementById('progress').style.transform = `scaleX(${p})`;
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
}, { threshold:0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Skill bars
const skills = [
  { name:'Data Analysis', level:92 },
  { name:'Statistical Modelling', level:82 },
  { name:'Data Visualization', level:88 },
  { name:'Excel', level:95 },
  { name:'SQL', level:85 },
  { name:'Python', level:84 },
  { name:'Data Validation', level:90 },
  { name:'Project Management', level:78 },
];
(function(){
  const list = document.getElementById('skillList');
  skills.forEach(s => {
    const row = document.createElement('div');
    row.className = 'reveal';
    row.innerHTML = `<div class="skill-row-lbl"><span>${s.name}</span><span>${s.level}%</span></div><div class="skill-bar"><div data-level="${s.level}"></div></div>`;
    list.appendChild(row);
    io.observe(row);
  });
  // Animate bars when visible
  const barIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.style.width = e.target.dataset.level+'%'; barIO.unobserve(e.target);} });
  }, { threshold: 0.4 });
  document.querySelectorAll('.skill-bar > div').forEach(b => barIO.observe(b));
})();

// Projects
const projects = [
  { title:'Student Progression Management System', tag:'Django', desc:'A full-stack platform to track student academic journeys, generate reports, and streamline institutional workflows.' },
  { title:'Data Analysis Dashboard', tag:'Power BI · Excel', desc:'Interactive dashboards turning multi-source datasets into decision-ready visual stories.' },
  { title:'AI Knowledge Base Chatbot', tag:'OpenAI · Pinecone · n8n', desc:'Retrieval-augmented chatbot that answers from a private vector knowledge base with citations.' },
  { title:'Mathematics Learning Platform', tag:'EdTech', desc:'Structured lesson planning and adaptive practice for learners — built from real tutoring experience.' },
];
(function(){
  const grid = document.getElementById('projectsGrid');
  projects.forEach((p,i) => {
    const wrap = document.createElement('div');
    wrap.className = 'reveal';
    wrap.innerHTML = `
      <div class="pcard glass" data-tilt>
        <div class="pcard-cover"><span class="pcard-num">0${i+1}</span></div>
        <div class="pcard-tag">${p.tag}</div>
        <h3 class="font-display">${p.title}</h3>
        <p>${p.desc}</p>
        <div class="pcard-view">View case →</div>
      </div>`;
    grid.appendChild(wrap);
    io.observe(wrap);
  });
  // Tilt
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX-r.left)/r.width - 0.5;
      const y = (e.clientY-r.top)/r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateY(${x*8}deg) rotateX(${y*-8}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform='');
  });
})();

// Hero portrait tilt + floating cards parallax + gold cursor
(function(){
  const hero = document.querySelector('[data-hero]');
  const portrait = document.getElementById('portrait');
  const c1 = document.querySelector('.hero-card-1');
  const c2 = document.querySelector('.hero-card-2');
  const cursor = document.getElementById('cursor');
  let cx=0, cy=0, tx=0, ty=0;
  window.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    if(hero){
      const r = hero.getBoundingClientRect();
      const mx = (e.clientX - r.left - r.width/2)/r.width;
      const my = (e.clientY - r.top - r.height/2)/r.height;
      if(portrait) portrait.style.transform = `perspective(1000px) rotateY(${mx*6}deg) rotateX(${my*-6}deg)`;
      if(c1) c1.style.transform = `translate(${mx*-20}px,${my*-20}px)`;
      if(c2) c2.style.transform = `translate(${mx*25}px,${my*25}px)`;
    }
  });
  // Cursor smooth-follow
  function loop(){
    cx += (tx-cx)*0.18; cy += (ty-cy)*0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
})();

// Magnetic buttons
document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX-(r.left+r.width/2))*0.25)+'px');
    el.style.setProperty('--my', ((e.clientY-(r.top+r.height/2))*0.25)+'px');
  });
  el.addEventListener('mouseleave', () => { el.style.setProperty('--mx','0'); el.style.setProperty('--my','0'); });
});
