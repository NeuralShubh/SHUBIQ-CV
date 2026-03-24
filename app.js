// -- STATE --
let currentTemplate = 'exec';
let photoData = null;
let expEntries = [];
let eduEntries = [];
let skillEntries = [];
let projEntries = [];
let certEntries = [];
let expCount = 0, eduCount = 0, skillCount = 0, projCount = 0, certCount = 0;

// -- INIT --
window.addEventListener('load', () => {
  addExperience();
  addEducation();
  addSkill('JavaScript', 85);
  addSkill('Project Management', 90);
  addProject();
  addCert();
  document.getElementById('f-firstname').value = 'Your';
  document.getElementById('f-lastname').value = 'Name';
  document.getElementById('f-jobtitle').value = 'Senior Professional';
  document.getElementById('f-email').value = 'your@email.com';
  document.getElementById('f-phone').value = '+91 98765 43210';
  document.getElementById('f-location').value = 'Mumbai, India';
  document.getElementById('f-summary').value = 'Accomplished professional with a proven track record of delivering results. Passionate about innovation and building high-performing teams.';
  updatePreview();
  initReveal();
});

// -- NAV --
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.padding = window.scrollY > 60 ? '12px 5%' : '18px 5%';
});

let cachedStylesText = null;
async function getStylesText() {
  if(cachedStylesText) return cachedStylesText;
  try {
    const res = await fetch('styles.css', { cache: 'no-cache' });
    cachedStylesText = await res.text();
  } catch {
    cachedStylesText = '';
  }
  return cachedStylesText;
}

// -- TABS --
function showTab(btn, tabId) {
  document.querySelectorAll('.form-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// -- TEMPLATE SELECT --
function selectTemplate(t) {
  currentTemplate = t;
  document.querySelectorAll('.tmpl-opt').forEach(o => o.classList.remove('selected'));
  const opt = document.getElementById('opt-' + t);
  if(opt) opt.classList.add('selected');
  updatePreview();
}

// -- PHOTO --
function handlePhoto(e) {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    photoData = ev.target.result;
    document.getElementById('photoPreview').src = photoData;
    document.getElementById('photoPreview').style.display = 'block';
    document.getElementById('photoPlaceholder').style.display = 'none';
    updatePreview();
  };
  reader.readAsDataURL(file);
}

// -- EXPERIENCE --
function addExperience(data={}) {
  expCount++;
  const id = 'exp-' + expCount;
  const div = document.createElement('div');
  div.className = 'entry-block';
  div.id = id;
  div.innerHTML = `
    <div class="entry-label">Experience #${expCount}</div>
    <button class="entry-remove" onclick="removeEntry('${id}','exp')">x</button>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Job Title</label><input type="text" class="form-input exp-title" placeholder="Software Engineer" value="${data.title||''}" oninput="updatePreview()"></div>
      <div class="form-group"><label class="form-label">Company</label><input type="text" class="form-input exp-company" placeholder="Google" value="${data.company||''}" oninput="updatePreview()"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Start Date</label><input type="text" class="form-input exp-start" placeholder="Jan 2021" value="${data.start||''}" oninput="updatePreview()"></div>
      <div class="form-group"><label class="form-label">End Date</label><input type="text" class="form-input exp-end" placeholder="Present" value="${data.end||'Present'}" oninput="updatePreview()"></div>
    </div>
    <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea exp-desc" rows="3" placeholder="Led a team of 8 engineers to deliver..." oninput="updatePreview()">${data.desc||''}</textarea></div>
  `;
  document.getElementById('exp-list').appendChild(div);
  expEntries.push(id);
}

// -- EDUCATION --
function addEducation(data={}) {
  eduCount++;
  const id = 'edu-' + eduCount;
  const div = document.createElement('div');
  div.className = 'entry-block';
  div.id = id;
  div.innerHTML = `
    <div class="entry-label">Education #${eduCount}</div>
    <button class="entry-remove" onclick="removeEntry('${id}','edu')">x</button>
    <div class="form-group"><label class="form-label">Degree / Qualification</label><input type="text" class="form-input edu-degree" placeholder="B.Tech in Computer Science" value="${data.degree||''}" oninput="updatePreview()"></div>
    <div class="form-group"><label class="form-label">Institution</label><input type="text" class="form-input edu-inst" placeholder="IIT Bombay" value="${data.inst||''}" oninput="updatePreview()"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Year</label><input type="text" class="form-input edu-year" placeholder="2018 - 2022" value="${data.year||''}" oninput="updatePreview()"></div>
      <div class="form-group"><label class="form-label">Grade / CGPA</label><input type="text" class="form-input edu-grade" placeholder="8.9 CGPA" value="${data.grade||''}" oninput="updatePreview()"></div>
    </div>
  `;
  document.getElementById('edu-list').appendChild(div);
  eduEntries.push(id);
}

// -- SKILL --
function addSkill(name='', level=75) {
  skillCount++;
  const id = 'skill-' + skillCount;
  const div = document.createElement('div');
  div.className = 'skill-input-row';
  div.id = id;
  div.innerHTML = `
    <input type="text" class="form-input skill-name" placeholder="e.g. Python" value="${name}" oninput="updatePreview()" style="flex:1;">
    <input type="range" class="skill-level" min="10" max="100" value="${level}" oninput="updatePreview()" style="width:80px;accent-color:var(--gold);">
    <button onclick="removeEntry('${id}','skill')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;">x</button>
  `;
  document.getElementById('skills-list').appendChild(div);
  skillEntries.push(id);
}

// -- PROJECTS --
function addProject(data={}) {
  projCount++;
  const id = 'proj-' + projCount;
  const div = document.createElement('div');
  div.className = 'entry-block';
  div.id = id;
  div.innerHTML = `
    <div class="entry-label">Project #${projCount}</div>
    <button class="entry-remove" onclick="removeEntry('${id}','proj')">x</button>
    <div class="form-group"><label class="form-label">Project Name</label><input type="text" class="form-input proj-name" placeholder="E-Commerce Platform" value="${data.name||''}" oninput="updatePreview()"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Tech Stack</label><input type="text" class="form-input proj-tech" placeholder="React, Node.js, MongoDB" value="${data.tech||''}" oninput="updatePreview()"></div>
      <div class="form-group"><label class="form-label">Year</label><input type="text" class="form-input proj-year" placeholder="2023" value="${data.year||''}" oninput="updatePreview()"></div>
    </div>
    <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea proj-desc" rows="2" placeholder="Built a full-stack platform handling 10k+ users..." oninput="updatePreview()">${data.desc||''}</textarea></div>
    <div class="form-group"><label class="form-label">Link (optional)</label><input type="text" class="form-input proj-link" placeholder="github.com/user/project" value="${data.link||''}" oninput="updatePreview()"></div>
  `;
  document.getElementById('proj-list').appendChild(div);
  projEntries.push(id);
}

// -- CERTS --
function addCert(data={}) {
  certCount++;
  const id = 'cert-' + certCount;
  const div = document.createElement('div');
  div.className = 'entry-block';
  div.id = id;
  div.innerHTML = `
    <div class="entry-label">Cert #${certCount}</div>
    <button class="entry-remove" onclick="removeEntry('${id}','cert')">x</button>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Certificate Name</label><input type="text" class="form-input cert-name" placeholder="AWS Solutions Architect" value="${data.name||''}" oninput="updatePreview()"></div>
      <div class="form-group"><label class="form-label">Issuer</label><input type="text" class="form-input cert-issuer" placeholder="Amazon Web Services" value="${data.issuer||''}" oninput="updatePreview()"></div>
    </div>
    <div class="form-group"><label class="form-label">Year</label><input type="text" class="form-input cert-year" placeholder="2023" value="${data.year||''}" oninput="updatePreview()"></div>
  `;
  document.getElementById('certs-list').appendChild(div);
  certEntries.push(id);
}

// -- REMOVE --
function removeEntry(id, type) {
  const el = document.getElementById(id);
  if(el) el.remove();
  const lists = { exp: expEntries, edu: eduEntries, skill: skillEntries, proj: projEntries, cert: certEntries };
  const arr = lists[type];
  const i = arr.indexOf(id);
  if(i > -1) arr.splice(i, 1);
  updatePreview();
}

// -- FILTER TEMPLATES --
function filterTemplates(btn, cat) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.template-card').forEach(card => {
    card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
  });
}

// -- COLLECT DATA --
function getData() {
  const g = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
  const name = (g('f-firstname') + ' ' + g('f-lastname')).trim() || 'Your Name';
  const exps = expEntries.map(id => {
    const el = document.getElementById(id);
    if(!el) return null;
    return {
      title: el.querySelector('.exp-title')?.value || '',
      company: el.querySelector('.exp-company')?.value || '',
      start: el.querySelector('.exp-start')?.value || '',
      end: el.querySelector('.exp-end')?.value || '',
      desc: el.querySelector('.exp-desc')?.value || ''
    };
  }).filter(Boolean);
  const edus = eduEntries.map(id => {
    const el = document.getElementById(id);
    if(!el) return null;
    return {
      degree: el.querySelector('.edu-degree')?.value || '',
      inst: el.querySelector('.edu-inst')?.value || '',
      year: el.querySelector('.edu-year')?.value || '',
      grade: el.querySelector('.edu-grade')?.value || ''
    };
  }).filter(Boolean);
  const skills = skillEntries.map(id => {
    const el = document.getElementById(id);
    if(!el) return null;
    return { name: el.querySelector('.skill-name')?.value || '', level: el.querySelector('.skill-level')?.value || 75 };
  }).filter(Boolean).filter(s => s.name);
  const projs = projEntries.map(id => {
    const el = document.getElementById(id);
    if(!el) return null;
    return {
      name: el.querySelector('.proj-name')?.value || '',
      tech: el.querySelector('.proj-tech')?.value || '',
      year: el.querySelector('.proj-year')?.value || '',
      desc: el.querySelector('.proj-desc')?.value || '',
      link: el.querySelector('.proj-link')?.value || ''
    };
  }).filter(Boolean);
  const certs = certEntries.map(id => {
    const el = document.getElementById(id);
    if(!el) return null;
    return { name: el.querySelector('.cert-name')?.value || '', issuer: el.querySelector('.cert-issuer')?.value || '', year: el.querySelector('.cert-year')?.value || '' };
  }).filter(Boolean);
  return {
    name, jobtitle: g('f-jobtitle'), email: g('f-email'), phone: g('f-phone'),
    location: g('f-location'), linkedin: g('f-linkedin'), website: g('f-website'),
    summary: g('f-summary'), languages: g('f-languages'),
    exps, edus, skills, projs, certs, photo: photoData
  };
}

// -- RENDER TEMPLATES --
function renderExec(d) {
  const photoHtml = d.photo
    ? `<img src="${d.photo}" style="width:88px;height:88px;border-radius:50%;border:2px solid #C9A84C;object-fit:cover;flex-shrink:0;" alt="Photo">`
    : `<div class="cv-exec-avatar">${d.name.charAt(0)||'?'}</div>`;
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .map(c => `<div class="cv-exec-contact-item">&middot; ${c}</div>`)
    .join('');
  const expsHtml = d.exps.map(e => `<div class="cv-entry"><div class="cv-entry-title">${e.title||'Job Title'}</div><div class="cv-entry-sub">${e.company||'Company'}</div><div class="cv-entry-date">${e.start||''}${e.end ? ' - '+e.end : ''}</div>${e.desc ? `<div class="cv-entry-desc">${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-entry"><div class="cv-entry-title">${e.degree||'Degree'}</div><div class="cv-entry-sub">${e.inst||'Institution'}</div><div class="cv-entry-date">${e.year||''}${e.grade ? ' | '+e.grade : ''}</div></div>`).join('');
  const skillsHtml = d.skills.map(s => `<div class="cv-skill-row"><div class="cv-skill-name">${s.name}</div><div class="cv-skill-bar"><div class="cv-skill-fill" style="width:${s.level}%;"></div></div></div>`).join('');
  const projsHtml = d.projs.map(p => `<div class="cv-entry"><div class="cv-entry-title">${p.name||'Project'}</div>${p.tech ? `<div class="cv-entry-sub">${p.tech}</div>` : ''}${p.desc ? `<div class="cv-entry-desc">${p.desc}</div>` : ''}</div>`).join('');
  const certsHtml = d.certs.map(c => `<div class="cv-cert-item"><span>${c.name||'Certificate'}${c.issuer ? ' | '+c.issuer : ''}</span><span class="cv-cert-year">${c.year||''}</span></div>`).join('');
  const tagsHtml = d.languages ? d.languages.split(',').map(l => `<span class="cv-tag">${l.trim()}</span>`).join('') : '';
  return `<div class="cv-exec"><div class="cv-exec-accent-bar"></div><div class="cv-exec-inner">
    <div class="cv-exec-header">${photoHtml}<div><div class="cv-exec-name">${d.name}</div><div class="cv-exec-role">${d.jobtitle||'Your Role'}</div><div class="cv-exec-contact">${contactItems}</div></div></div>
    <div class="cv-exec-body">
      <div class="cv-exec-main">
        ${d.summary ? `<div class="cv-section"><div class="cv-section-title">Profile</div><div class="cv-summary">${d.summary}</div></div>` : ''}
        ${expsHtml ? `<div class="cv-section"><div class="cv-section-title">Experience</div>${expsHtml}</div>` : ''}
        ${projsHtml ? `<div class="cv-section"><div class="cv-section-title">Projects</div>${projsHtml}</div>` : ''}
      </div>
      <div class="cv-exec-sidebar">
        ${edusHtml ? `<div class="cv-section"><div class="cv-section-title">Education</div>${edusHtml}</div>` : ''}
        ${skillsHtml ? `<div class="cv-section"><div class="cv-section-title">Skills</div>${skillsHtml}</div>` : ''}
        ${tagsHtml ? `<div class="cv-section"><div class="cv-section-title">Languages</div>${tagsHtml}</div>` : ''}
        ${certsHtml ? `<div class="cv-section"><div class="cv-section-title">Certifications</div>${certsHtml}</div>` : ''}
      </div>
    </div>
  </div></div>`;
}

function renderMinimal(d) {
  const photoHtml = d.photo
    ? `<img src="${d.photo}" style="width:72px;height:72px;border-radius:4px;object-fit:cover;" alt="Photo">`
    : `<div class="cv-min-avatar">User</div>`;
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .map(c => `<span class="cv-min-contact-item">${c}</span>`)
    .join('');
  const expsHtml = d.exps.map(e => `<div class="cv-min-entry"><div class="cv-min-entry-title">${e.title||'Job Title'} <span style="color:#888;font-weight:400;">@ ${e.company||'Company'}</span></div><div class="cv-min-entry-sub">${e.start||''}${e.end ? ' - '+e.end : ''}</div>${e.desc ? `<div class="cv-min-entry-desc">${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-min-entry"><div class="cv-min-entry-title">${e.degree||'Degree'}</div><div class="cv-min-entry-sub">${e.inst||''}${e.year ? ' | '+e.year : ''}${e.grade ? ' | '+e.grade : ''}</div></div>`).join('');
  const skillsHtml = d.skills.map(s => `<div class="cv-min-skill-item"><div class="cv-min-skill-name">${s.name}</div><div class="cv-min-skill-dots">${[...Array(5)].map((_,i) => `<div class="cv-min-skill-dot${i < Math.round(s.level/20) ? ' filled' : ''}"></div>`).join('')}</div></div>`).join('');
  const projsHtml = d.projs.map(p => `<div class="cv-min-entry"><div class="cv-min-entry-title">${p.name||'Project'}${p.year ? ` <span style="color:#999;font-size:.78rem;">${p.year}</span>`:''}</div>${p.tech ? `<div class="cv-min-entry-sub">${p.tech}</div>` : ''}${p.desc ? `<div class="cv-min-entry-desc">${p.desc}</div>` : ''}</div>`).join('');
  const certsHtml = d.certs.map(c => `<div class="cv-min-cert">${c.name||''}${c.issuer ? ' | '+c.issuer : ''}<span class="cv-min-cert-year">${c.year||''}</span></div>`).join('');
  const langTags = d.languages ? d.languages.split(',').map(l => `<span class="cv-min-tag">${l.trim()}</span>`).join('') : '';
  return `<div class="cv-minimal"><div class="cv-min-inner">
    <div class="cv-min-header"><div><div class="cv-min-name">${d.name}</div><div class="cv-min-role">${d.jobtitle||'Your Role'}</div><div class="cv-min-contact" style="margin-top:10px;">${contactItems}</div></div>${photoHtml}</div>
    <div class="cv-min-body">
      <div>
        ${d.summary ? `<div class="cv-min-section"><div class="cv-min-section-title">About</div><div class="cv-min-summary">${d.summary}</div></div>` : ''}
        ${expsHtml ? `<div class="cv-min-section"><div class="cv-min-section-title">Experience</div>${expsHtml}</div>` : ''}
        ${projsHtml ? `<div class="cv-min-section"><div class="cv-min-section-title">Projects</div>${projsHtml}</div>` : ''}
      </div>
      <div>
        ${edusHtml ? `<div class="cv-min-section"><div class="cv-min-section-title">Education</div>${edusHtml}</div>` : ''}
        ${skillsHtml ? `<div class="cv-min-section"><div class="cv-min-section-title">Skills</div>${skillsHtml}</div>` : ''}
        ${langTags ? `<div class="cv-min-section"><div class="cv-min-section-title">Languages</div>${langTags}</div>` : ''}
        ${certsHtml ? `<div class="cv-min-section"><div class="cv-min-section-title">Certifications</div>${certsHtml}</div>` : ''}
      </div>
    </div>
  </div></div>`;
}

function renderCreative(d) {
  const photoHtml = d.photo
    ? `<img src="${d.photo}" style="width:90px;height:90px;border-radius:16px;border:2px solid rgba(168,85,247,.6);object-fit:cover;flex-shrink:0;" alt="Photo">`
    : `<div class="cv-cr-avatar">${d.name.charAt(0)||'?'}</div>`;
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .map(c => `<div class="cv-cr-contact-item">&middot; ${c}</div>`)
    .join('');
  const expsHtml = d.exps.map(e => `<div class="cv-cr-entry"><div class="cv-cr-entry-title">${e.title||'Job Title'}</div><div class="cv-cr-entry-sub">${e.company||'Company'} | ${e.start||''}${e.end ? ' - '+e.end : ''}</div>${e.desc ? `<div class="cv-cr-entry-desc">${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-cr-entry"><div class="cv-cr-entry-title">${e.degree||'Degree'}</div><div class="cv-cr-entry-sub">${e.inst||''}${e.year ? ' | '+e.year : ''}</div></div>`).join('');
  const skillsHtml = d.skills.map(s => `<div class="cv-cr-skill"><div class="cv-cr-skill-name">${s.name}</div><div class="cv-cr-skill-bar"><div class="cv-cr-skill-fill" style="width:${s.level}%;"></div></div></div>`).join('');
  const projsHtml = d.projs.map(p => `<div class="cv-cr-entry"><div class="cv-cr-entry-title">${p.name||'Project'}</div>${p.tech ? `<div class="cv-cr-entry-sub">${p.tech}</div>` : ''}${p.desc ? `<div class="cv-cr-entry-desc">${p.desc}</div>` : ''}</div>`).join('');
  const certsHtml = d.certs.map(c => `<div style="margin-bottom:8px;"><span class="cv-cr-tag">${c.name||''}${c.year ? ' | '+c.year : ''}</span></div>`).join('');
  const langTags = d.languages ? d.languages.split(',').map(l => `<span class="cv-cr-tag">${l.trim()}</span>`).join('') : '';
  return `<div class="cv-creative"><div class="cv-cr-blob"></div><div class="cv-cr-inner">
    <div class="cv-cr-header">${photoHtml}<div><div class="cv-cr-name">${d.name}</div><div class="cv-cr-role">${d.jobtitle||'Your Role'}</div><div class="cv-cr-contact">${contactItems}</div></div></div>
    <div class="cv-cr-body">
      <div>
        ${d.summary ? `<div class="cv-cr-section"><div class="cv-cr-section-title">Profile</div><div class="cv-cr-summary">${d.summary}</div></div>` : ''}
        ${expsHtml ? `<div class="cv-cr-section"><div class="cv-cr-section-title">Experience</div>${expsHtml}</div>` : ''}
        ${projsHtml ? `<div class="cv-cr-section"><div class="cv-cr-section-title">Projects</div>${projsHtml}</div>` : ''}
      </div>
      <div>
        ${edusHtml ? `<div class="cv-cr-section"><div class="cv-cr-section-title">Education</div>${edusHtml}</div>` : ''}
        ${skillsHtml ? `<div class="cv-cr-section"><div class="cv-cr-section-title">Skills</div>${skillsHtml}</div>` : ''}
        ${langTags ? `<div class="cv-cr-section"><div class="cv-cr-section-title">Languages</div>${langTags}</div>` : ''}
        ${certsHtml ? `<div class="cv-cr-section"><div class="cv-cr-section-title">Certifications</div>${certsHtml}</div>` : ''}
      </div>
    </div>
  </div></div>`;
}

function renderTech(d) {
  const fname = d.name.split(' ')[0]||'dev';
  const expsHtml = d.exps.map(e => `<div class="cv-tech-entry"><div class="cv-tech-entry-title">${e.title||'Role'}</div><div class="cv-tech-entry-sub">${e.company||'Company'}</div><div class="cv-tech-entry-date">${e.start||''}${e.end ? ' -> '+e.end : ''}</div>${e.desc ? `<div class="cv-tech-entry-desc"># ${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-tech-entry"><div class="cv-tech-entry-title">${e.degree||'Degree'}</div><div class="cv-tech-entry-sub">${e.inst||''}</div><div class="cv-tech-entry-date">${e.year||''}${e.grade ? ' | '+e.grade : ''}</div></div>`).join('');
  const skillsHtml = d.skills.map(s => `<div class="cv-tech-skill"><div class="cv-tech-skill-name">${s.name}</div><div class="cv-tech-skill-bar"><div class="cv-tech-skill-fill" style="width:${s.level}%;"></div></div></div>`).join('');
  const projsHtml = d.projs.map(p => `<div class="cv-tech-entry"><div class="cv-tech-entry-title">${p.name||'Project'}</div>${p.tech ? `<div class="cv-tech-entry-sub">// ${p.tech}</div>` : ''}${p.desc ? `<div class="cv-tech-entry-desc">${p.desc}</div>` : ''}</div>`).join('');
  const certsHtml = d.certs.map(c => `<div class="cv-tech-cert"><span>${c.name||''}</span>${c.issuer ? ` <span style="color:#8b949e;">| ${c.issuer}</span>` : ''} <span style="color:#e3b341;float:right;">${c.year||''}</span></div>`).join('');
  const langTags = d.languages ? d.languages.split(',').map(l => `<span class="cv-tech-tag">${l.trim()}</span>`).join('') : '';
  const contactStr = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .map(c => `<div class="cv-tech-contact-item"><span>//</span> ${c}</div>`)
    .join('');
  return `<div class="cv-tech"><div class="cv-tech-inner">
    <div class="cv-tech-topbar">
      <div class="cv-tech-dot" style="background:#ff5f57;"></div>
      <div class="cv-tech-dot" style="background:#ffbd2e;"></div>
      <div class="cv-tech-dot" style="background:#28c940;"></div>
      <div class="cv-tech-filename">${fname.toLowerCase()}_cv.md</div>
    </div>
    <div class="cv-tech-header">
      <div class="cv-tech-comment">// ${d.jobtitle||'Developer'} | Resume</div>
      <div class="cv-tech-name"><span class="prompt">$</span> ${d.name}</div>
      <div class="cv-tech-role">-> ${d.jobtitle||'Your Role'}</div>
      <div class="cv-tech-contact">${contactStr}</div>
    </div>
    <div class="cv-tech-body">
      <div>
        ${d.summary ? `<div class="cv-tech-section"><div class="cv-tech-section-title">About</div><div class="cv-tech-summary">${d.summary} */</div></div>` : ''}
        ${expsHtml ? `<div class="cv-tech-section"><div class="cv-tech-section-title">Experience</div>${expsHtml}</div>` : ''}
        ${projsHtml ? `<div class="cv-tech-section"><div class="cv-tech-section-title">Projects</div>${projsHtml}</div>` : ''}
      </div>
      <div>
        ${edusHtml ? `<div class="cv-tech-section"><div class="cv-tech-section-title">Education</div>${edusHtml}</div>` : ''}
        ${skillsHtml ? `<div class="cv-tech-section"><div class="cv-tech-section-title">Skills</div>${skillsHtml}</div>` : ''}
        ${langTags ? `<div class="cv-tech-section"><div class="cv-tech-section-title">Languages</div>${langTags}</div>` : ''}
        ${certsHtml ? `<div class="cv-tech-section"><div class="cv-tech-section-title">Certifications</div>${certsHtml}</div>` : ''}
      </div>
    </div>
  </div></div>`;
}

function renderAurum(d) {
  const photoHtml = d.photo
    ? `<img src="${d.photo}" class="cv-aurum-avatar" alt="Photo">`
    : `<div class="cv-aurum-avatar">${d.name.charAt(0)||'?'}</div>`;
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .map(c => `<span>${c}</span>`)
    .join('<span>|</span>');
  const expsHtml = d.exps.map(e => `<div class="cv-aurum-entry"><div class="cv-aurum-entry-title">${e.title||'Job Title'}</div><div class="cv-aurum-entry-sub">${e.company||'Company'}${e.start ? ' | '+e.start : ''}${e.end ? ' - '+e.end : ''}</div>${e.desc ? `<div class="cv-aurum-entry-desc">${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-aurum-entry"><div class="cv-aurum-entry-title">${e.degree||'Degree'}</div><div class="cv-aurum-entry-sub">${e.inst||'Institution'}${e.year ? ' | '+e.year : ''}${e.grade ? ' | '+e.grade : ''}</div></div>`).join('');
  const skillsHtml = d.skills.map(s => `<div class="cv-aurum-skill"><div>${s.name}</div><div class="cv-aurum-skill-bar"><div class="cv-aurum-skill-fill" style="width:${s.level}%;"></div></div></div>`).join('');
  const projsHtml = d.projs.map(p => `<div class="cv-aurum-entry"><div class="cv-aurum-entry-title">${p.name||'Project'}</div>${p.tech ? `<div class="cv-aurum-entry-sub">${p.tech}</div>` : ''}${p.desc ? `<div class="cv-aurum-entry-desc">${p.desc}</div>` : ''}</div>`).join('');
  const certsHtml = d.certs.map(c => `<div class="cv-aurum-cert">${c.name||'Certificate'}${c.issuer ? ' | '+c.issuer : ''}${c.year ? ' | '+c.year : ''}</div>`).join('');
  const langTags = d.languages ? d.languages.split(',').map(l => `<span class="cv-aurum-tag">${l.trim()}</span>`).join('') : '';
  return `<div class="cv-aurum"><div class="cv-aurum-inner">
    <div class="cv-aurum-header">
      <div>
        <div class="cv-aurum-name">${d.name}</div>
        <div class="cv-aurum-role">${d.jobtitle||'Your Role'}</div>
        <div class="cv-aurum-contact">${contactItems}</div>
      </div>
      ${photoHtml}
    </div>
    <div class="cv-aurum-body">
      <div>
        ${d.summary ? `<div class="cv-aurum-section"><div class="cv-aurum-title">Profile</div><div class="cv-aurum-summary">${d.summary}</div></div>` : ''}
        ${expsHtml ? `<div class="cv-aurum-section"><div class="cv-aurum-title">Experience</div>${expsHtml}</div>` : ''}
        ${projsHtml ? `<div class="cv-aurum-section"><div class="cv-aurum-title">Projects</div>${projsHtml}</div>` : ''}
      </div>
      <div>
        ${edusHtml ? `<div class="cv-aurum-section"><div class="cv-aurum-title">Education</div>${edusHtml}</div>` : ''}
        ${skillsHtml ? `<div class="cv-aurum-section"><div class="cv-aurum-title">Skills</div>${skillsHtml}</div>` : ''}
        ${langTags ? `<div class="cv-aurum-section"><div class="cv-aurum-title">Languages</div>${langTags}</div>` : ''}
        ${certsHtml ? `<div class="cv-aurum-section"><div class="cv-aurum-title">Certifications</div>${certsHtml}</div>` : ''}
      </div>
    </div>
  </div></div>`;
}

function renderCobalt(d) {
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .map(c => `<div>${c}</div>`)
    .join('');
  const expsHtml = d.exps.map(e => `<div class="cv-cobalt-entry"><div class="cv-cobalt-entry-title">${e.title||'Job Title'}</div><div class="cv-cobalt-entry-sub">${e.company||'Company'}${e.start ? ' | '+e.start : ''}${e.end ? ' - '+e.end : ''}</div>${e.desc ? `<div class="cv-cobalt-entry-desc">${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-cobalt-entry"><div class="cv-cobalt-entry-title">${e.degree||'Degree'}</div><div class="cv-cobalt-entry-sub">${e.inst||'Institution'}${e.year ? ' | '+e.year : ''}${e.grade ? ' | '+e.grade : ''}</div></div>`).join('');
  const skillsHtml = d.skills.map(s => `<div class="cv-cobalt-skill"><div>${s.name}</div><div class="cv-cobalt-skill-bar"><div class="cv-cobalt-skill-fill" style="width:${s.level}%;"></div></div></div>`).join('');
  const projsHtml = d.projs.map(p => `<div class="cv-cobalt-entry"><div class="cv-cobalt-entry-title">${p.name||'Project'}</div>${p.tech ? `<div class="cv-cobalt-entry-sub">${p.tech}</div>` : ''}${p.desc ? `<div class="cv-cobalt-entry-desc">${p.desc}</div>` : ''}</div>`).join('');
  const certsHtml = d.certs.map(c => `<div class="cv-cobalt-cert">${c.name||'Certificate'}${c.issuer ? ' | '+c.issuer : ''}${c.year ? ' | '+c.year : ''}</div>`).join('');
  const langTags = d.languages ? d.languages.split(',').map(l => `<span class="cv-cobalt-tag">${l.trim()}</span>`).join('') : '';
  return `<div class="cv-cobalt"><div class="cv-cobalt-inner">
    <div class="cv-cobalt-body">
      <div class="cv-cobalt-rail">
        <div class="cv-cobalt-name">${d.name}</div>
        <div class="cv-cobalt-role">${d.jobtitle||'Your Role'}</div>
        <div class="cv-cobalt-contact">${contactItems}</div>
      </div>
      <div class="cv-cobalt-main">
        ${d.summary ? `<div class="cv-cobalt-section"><div class="cv-cobalt-title">Profile</div><div class="cv-cobalt-summary">${d.summary}</div></div>` : ''}
        ${expsHtml ? `<div class="cv-cobalt-section"><div class="cv-cobalt-title">Experience</div>${expsHtml}</div>` : ''}
        ${projsHtml ? `<div class="cv-cobalt-section"><div class="cv-cobalt-title">Projects</div>${projsHtml}</div>` : ''}
        ${edusHtml ? `<div class="cv-cobalt-section"><div class="cv-cobalt-title">Education</div>${edusHtml}</div>` : ''}
        ${skillsHtml ? `<div class="cv-cobalt-section"><div class="cv-cobalt-title">Skills</div>${skillsHtml}</div>` : ''}
        ${langTags ? `<div class="cv-cobalt-section"><div class="cv-cobalt-title">Languages</div>${langTags}</div>` : ''}
        ${certsHtml ? `<div class="cv-cobalt-section"><div class="cv-cobalt-title">Certifications</div>${certsHtml}</div>` : ''}
      </div>
    </div>
  </div></div>`;
}

function renderOpal(d) {
  const photoHtml = d.photo
    ? `<img src="${d.photo}" style="width:76px;height:76px;border-radius:12px;object-fit:cover;border:1px solid #c9a84c;" alt="Photo">`
    : `<div class="cv-opal-avatar">${d.name.charAt(0)||'?'}</div>`;
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .map(c => `<span>${c}</span>`)
    .join('<span>|</span>');
  const expsHtml = d.exps.map(e => `<div class="cv-opal-entry"><div class="cv-opal-entry-title">${e.title||'Job Title'}</div><div class="cv-opal-entry-sub">${e.company||'Company'}${e.start ? ' | '+e.start : ''}${e.end ? ' - '+e.end : ''}</div>${e.desc ? `<div class="cv-opal-entry-desc">${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-opal-entry"><div class="cv-opal-entry-title">${e.degree||'Degree'}</div><div class="cv-opal-entry-sub">${e.inst||'Institution'}${e.year ? ' | '+e.year : ''}${e.grade ? ' | '+e.grade : ''}</div></div>`).join('');
  const skillsHtml = d.skills.map(s => `<div class="cv-opal-skill"><div>${s.name}</div><div class="cv-opal-skill-bar"><div class="cv-opal-skill-fill" style="width:${s.level}%;"></div></div></div>`).join('');
  const projsHtml = d.projs.map(p => `<div class="cv-opal-entry"><div class="cv-opal-entry-title">${p.name||'Project'}</div>${p.tech ? `<div class="cv-opal-entry-sub">${p.tech}</div>` : ''}${p.desc ? `<div class="cv-opal-entry-desc">${p.desc}</div>` : ''}</div>`).join('');
  const certsHtml = d.certs.map(c => `<div class="cv-opal-entry"><div class="cv-opal-entry-title">${c.name||'Certificate'}</div><div class="cv-opal-entry-sub">${c.issuer ? c.issuer+' | ' : ''}${c.year||''}</div></div>`).join('');
  const langTags = d.languages ? d.languages.split(',').map(l => `<span class="cv-opal-tag">${l.trim()}</span>`).join('') : '';
  return `<div class="cv-opal"><div class="cv-opal-inner">
    <div class="cv-opal-header">
      <div>
        <div class="cv-opal-name">${d.name}</div>
        <div class="cv-opal-role">${d.jobtitle||'Your Role'}</div>
        <div class="cv-opal-contact">${contactItems}</div>
      </div>
      ${photoHtml}
    </div>
    <div class="cv-opal-body">
      <div>
        ${d.summary ? `<div class="cv-opal-section"><div class="cv-opal-title">Profile</div><div class="cv-opal-entry-desc">${d.summary}</div></div>` : ''}
        ${expsHtml ? `<div class="cv-opal-section"><div class="cv-opal-title">Experience</div>${expsHtml}</div>` : ''}
        ${projsHtml ? `<div class="cv-opal-section"><div class="cv-opal-title">Projects</div>${projsHtml}</div>` : ''}
      </div>
      <div>
        ${edusHtml ? `<div class="cv-opal-section"><div class="cv-opal-title">Education</div>${edusHtml}</div>` : ''}
        ${skillsHtml ? `<div class="cv-opal-section"><div class="cv-opal-title">Skills</div>${skillsHtml}</div>` : ''}
        ${langTags ? `<div class="cv-opal-section"><div class="cv-opal-title">Languages</div>${langTags}</div>` : ''}
        ${certsHtml ? `<div class="cv-opal-section"><div class="cv-opal-title">Certifications</div>${certsHtml}</div>` : ''}
      </div>
    </div>
  </div></div>`;
}

function renderAtlas(d) {
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .map(c => `<span>${c}</span>`)
    .join('<span>|</span>');
  const expsHtml = d.exps.map(e => `<div class="cv-atlas-card"><div class="cv-atlas-entry-title">${e.title||'Job Title'}</div><div class="cv-atlas-entry-sub">${e.company||'Company'}${e.start ? ' | '+e.start : ''}${e.end ? ' - '+e.end : ''}</div>${e.desc ? `<div class="cv-atlas-entry-desc">${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-atlas-card"><div class="cv-atlas-entry-title">${e.degree||'Degree'}</div><div class="cv-atlas-entry-sub">${e.inst||'Institution'}${e.year ? ' | '+e.year : ''}${e.grade ? ' | '+e.grade : ''}</div></div>`).join('');
  const skillsHtml = d.skills.map(s => `<div class="cv-atlas-skill"><div>${s.name}</div><div class="cv-atlas-skill-bar"><div class="cv-atlas-skill-fill" style="width:${s.level}%;"></div></div></div>`).join('');
  const projsHtml = d.projs.map(p => `<div class="cv-atlas-card"><div class="cv-atlas-entry-title">${p.name||'Project'}</div>${p.tech ? `<div class="cv-atlas-entry-sub">${p.tech}</div>` : ''}${p.desc ? `<div class="cv-atlas-entry-desc">${p.desc}</div>` : ''}</div>`).join('');
  const certsHtml = d.certs.map(c => `<div class="cv-atlas-card"><div class="cv-atlas-entry-title">${c.name||'Certificate'}</div><div class="cv-atlas-entry-sub">${c.issuer ? c.issuer+' | ' : ''}${c.year||''}</div></div>`).join('');
  const langTags = d.languages ? d.languages.split(',').map(l => `<span class="cv-atlas-tag">${l.trim()}</span>`).join('') : '';
  return `<div class="cv-atlas"><div class="cv-atlas-inner">
    <div class="cv-atlas-top">
      <div>
        <div class="cv-atlas-name">${d.name}</div>
        <div class="cv-atlas-role">${d.jobtitle||'Your Role'}</div>
        <div class="cv-atlas-contact">${contactItems}</div>
      </div>
    </div>
    <div class="cv-atlas-body">
      <div>
        ${d.summary ? `<div class="cv-atlas-card"><div class="cv-atlas-title">Profile</div><div class="cv-atlas-entry-desc">${d.summary}</div></div>` : ''}
        ${expsHtml ? `<div class="cv-atlas-card"><div class="cv-atlas-title">Experience</div>${expsHtml}</div>` : ''}
        ${projsHtml ? `<div class="cv-atlas-card"><div class="cv-atlas-title">Projects</div>${projsHtml}</div>` : ''}
      </div>
      <div>
        ${edusHtml ? `<div class="cv-atlas-card"><div class="cv-atlas-title">Education</div>${edusHtml}</div>` : ''}
        ${skillsHtml ? `<div class="cv-atlas-card"><div class="cv-atlas-title">Skills</div>${skillsHtml}</div>` : ''}
        ${langTags ? `<div class="cv-atlas-card"><div class="cv-atlas-title">Languages</div>${langTags}</div>` : ''}
        ${certsHtml ? `<div class="cv-atlas-card"><div class="cv-atlas-title">Certifications</div>${certsHtml}</div>` : ''}
      </div>
    </div>
  </div></div>`;
}

function renderObsidian(d) {
  const initials = (d.name || 'Your Name')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0].toUpperCase())
    .join('') || 'YN';
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .map(c => `<div>${c}</div>`)
    .join('');
  const expsHtml = d.exps.map(e => `<div class="cv-obsidian-entry"><div class="cv-obsidian-entry-title">${e.title||'Job Title'}</div><div class="cv-obsidian-entry-sub">${e.company||'Company'}${e.start ? ' | '+e.start : ''}${e.end ? ' - '+e.end : ''}</div>${e.desc ? `<div class="cv-obsidian-entry-desc">${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-obsidian-entry"><div class="cv-obsidian-entry-title">${e.degree||'Degree'}</div><div class="cv-obsidian-entry-sub">${e.inst||'Institution'}${e.year ? ' | '+e.year : ''}${e.grade ? ' | '+e.grade : ''}</div></div>`).join('');
  const skillsHtml = d.skills.map(s => `<div class="cv-obsidian-skill"><div class="cv-obsidian-skill-name">${s.name}</div><div class="cv-obsidian-skill-bar"><div class="cv-obsidian-skill-fill" style="width:${s.level}%;"></div></div></div>`).join('');
  const projsHtml = d.projs.map(p => `<div class="cv-obsidian-entry"><div class="cv-obsidian-entry-title">${p.name||'Project'}</div>${p.tech ? `<div class="cv-obsidian-entry-sub">${p.tech}</div>` : ''}${p.desc ? `<div class="cv-obsidian-entry-desc">${p.desc}</div>` : ''}</div>`).join('');
  const certsHtml = d.certs.map(c => `<div class="cv-obsidian-entry"><div class="cv-obsidian-entry-title">${c.name||'Certificate'}</div><div class="cv-obsidian-entry-sub">${c.issuer ? c.issuer+' | ' : ''}${c.year||''}</div></div>`).join('');
  const langTags = d.languages ? d.languages.split(',').map(l => `<span class="cv-obsidian-tag">${l.trim()}</span>`).join('') : '';
  return `<div class="cv-obsidian"><div class="cv-obsidian-inner">
    <div class="cv-obsidian-body">
      <div class="cv-obsidian-sidebar">
        <div class="cv-obsidian-avatar">${initials}</div>
        <div class="cv-obsidian-name">${d.name}</div>
        <div class="cv-obsidian-role">${d.jobtitle||'Your Role'}</div>
        <div class="cv-obsidian-contact">${contactItems}</div>
        <div class="cv-obsidian-divider"></div>
        ${skillsHtml ? `<div class="cv-obsidian-section"><div class="cv-obsidian-title">Skills</div>${skillsHtml}</div>` : ''}
        ${langTags ? `<div class="cv-obsidian-section"><div class="cv-obsidian-title">Languages</div>${langTags}</div>` : ''}
      </div>
      <div class="cv-obsidian-main">
        ${d.summary ? `<div class="cv-obsidian-section"><div class="cv-obsidian-title">Profile</div><div class="cv-obsidian-entry-desc">${d.summary}</div><div class="cv-obsidian-divider"></div></div>` : ''}
        ${expsHtml ? `<div class="cv-obsidian-section"><div class="cv-obsidian-title">Experience</div>${expsHtml}</div>` : ''}
        ${projsHtml ? `<div class="cv-obsidian-section"><div class="cv-obsidian-title">Projects</div>${projsHtml}</div>` : ''}
        ${edusHtml ? `<div class="cv-obsidian-section"><div class="cv-obsidian-title">Education</div>${edusHtml}</div>` : ''}
        ${certsHtml ? `<div class="cv-obsidian-section"><div class="cv-obsidian-title">Certifications</div>${certsHtml}</div>` : ''}
      </div>
    </div>
  </div></div>`;
}

function renderATS(d) {
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .join(' | ');
  const expsHtml = d.exps
    .filter(e => e.title || e.company || e.desc)
    .map(e => `<article class="cv-ats-entry">
      <div class="cv-ats-entry-title">${e.title||'Job Title'}</div>
      <div class="cv-ats-entry-sub">${e.company||'Company'}${e.start ? ' | '+e.start : ''}${e.end ? ' - '+e.end : ''}</div>
      ${e.desc ? `<div class="cv-ats-entry-desc">${e.desc}</div>` : ''}
    </article>`).join('');
  const edusHtml = d.edus
    .filter(e => e.degree || e.inst)
    .map(e => `<article class="cv-ats-entry">
      <div class="cv-ats-entry-title">${e.degree||'Degree'}</div>
      <div class="cv-ats-entry-sub">${e.inst||'Institution'}${e.year ? ' | '+e.year : ''}${e.grade ? ' | '+e.grade : ''}</div>
    </article>`).join('');
  const skillsText = d.skills.map(s => s.name).filter(Boolean).join(', ');

  return `<article class="cv-ats"><div class="cv-ats-inner">
    <header>
      <h1 class="cv-ats-name">${d.name}</h1>
      <div class="cv-ats-contact">${contactItems}</div>
    </header>
    ${d.summary ? `<section class="cv-ats-section">
      <h2 class="cv-ats-title">Summary</h2>
      <p class="cv-ats-summary">${d.summary}</p>
    </section>` : ''}
    ${expsHtml ? `<section class="cv-ats-section">
      <h2 class="cv-ats-title">Experience</h2>
      ${expsHtml}
    </section>` : ''}
    ${skillsText ? `<section class="cv-ats-section">
      <h2 class="cv-ats-title">Skills</h2>
      <p class="cv-ats-skills">${skillsText}</p>
    </section>` : ''}
    ${edusHtml ? `<section class="cv-ats-section">
      <h2 class="cv-ats-title">Education</h2>
      ${edusHtml}
    </section>` : ''}
  </div></article>`;
}

function renderModern(d) {
  const contactItems = [
    { label: d.email, icon: 'M12 4c2.8 0 5 1.8 5 4v6c0 2.2-2.2 4-5 4H4c-2.8 0-5-1.8-5-4V8c0-2.2 2.2-4 5-4h8Zm0 2H4c-1.6 0-3 1-3 2.2l7 4.2 7-4.2C15 7 13.6 6 12 6Zm3 4.1-6.5 3.9a1 1 0 0 1-1 0L1 10.1V14c0 1.2 1.4 2.2 3 2.2h8c1.6 0 3-1 3-2.2v-3.9Z' },
    { label: d.phone, icon: 'M6.6 1.6 8.9 0c.6-.4 1.4-.2 1.8.4l1.5 2.3c.3.5.2 1.2-.3 1.6l-1.4 1.1c.7 1.5 1.9 3 3.3 4.3 1.3 1.3 2.8 2.6 4.3 3.3l1.1-1.4c.4-.5 1.1-.6 1.6-.3l2.3 1.5c.6.4.8 1.2.4 1.8l-1.6 2.3c-.4.6-1.1.8-1.8.7-2.8-.5-6-2.4-9.1-5.5-3.1-3.1-5-6.3-5.5-9.1-.1-.7.1-1.4.7-1.8Z' },
    { label: d.location, icon: 'M8 0C4.7 0 2 2.7 2 6c0 3.8 4.2 9.4 5.3 10.8.4.5 1 .5 1.4 0C9.8 15.4 14 9.8 14 6c0-3.3-2.7-6-6-6Zm0 8.2A2.2 2.2 0 1 1 8 3.8a2.2 2.2 0 0 1 0 4.4Z' }
  ].filter(i => i.label);

  const contactHtml = contactItems.map(i => `<span><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="${i.icon}" fill="currentColor"/></svg>${i.label}</span>`).join('');

  const achievements = d.projs.slice(0, 2).map(p => p.desc || p.name).filter(Boolean);
  const achievementsHtml = (achievements.length ? achievements : [
    'Improved operational efficiency through process redesign.',
    'Delivered high-impact initiatives on tight timelines.'
  ]).map(a => `<li>${a}</li>`).join('');

  const expsHtml = d.exps.map(e => `<div class="cv-modern-entry"><div class="cv-modern-entry-title">${e.title||'Job Title'}</div><div class="cv-modern-entry-sub">${e.company||'Company'}${e.start ? ' | '+e.start : ''}${e.end ? ' - '+e.end : ''}</div>${e.desc ? `<div class="cv-modern-entry-desc">${e.desc}</div>` : ''}</div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-modern-entry"><div class="cv-modern-entry-title">${e.degree||'Degree'}</div><div class="cv-modern-entry-sub">${e.inst||'Institution'}${e.year ? ' | '+e.year : ''}${e.grade ? ' | '+e.grade : ''}</div></div>`).join('');
  const skillsText = d.skills.map(s => s.name).filter(Boolean).join(', ');

  return `<article class="cv-modern"><div class="cv-modern-inner">
    <header class="cv-modern-header">
      <div class="cv-modern-name">${d.name}</div>
      <div class="cv-modern-sub">${d.jobtitle||'Your Role'} | ${d.email||''}</div>
      <div class="cv-modern-contact">${contactHtml}</div>
      <ul class="cv-modern-achievements">${achievementsHtml}</ul>
    </header>
    <div class="cv-modern-grid">
      <div>
        ${d.summary ? `<section class="cv-modern-section"><h2 class="cv-modern-title">Summary</h2><p class="cv-modern-entry-desc">${d.summary}</p></section>` : ''}
        ${expsHtml ? `<section class="cv-modern-section"><h2 class="cv-modern-title">Experience</h2>${expsHtml}</section>` : ''}
      </div>
      <div>
        ${skillsText ? `<section class="cv-modern-section"><h2 class="cv-modern-title">Skills</h2><p class="cv-modern-skills">${skillsText}</p></section>` : ''}
        ${edusHtml ? `<section class="cv-modern-section"><h2 class="cv-modern-title">Education</h2>${edusHtml}</section>` : ''}
      </div>
    </div>
  </div></article>`;
}

function renderTimeline(d) {
  const contactItems = [d.email, d.phone, d.location, d.linkedin, d.website]
    .filter(Boolean)
    .join(' | ');
  const expsHtml = d.exps.map(e => `<div class="cv-timeline-item">
      <div class="cv-timeline-role">${e.title||'Job Title'}</div>
      <div class="cv-timeline-meta">${e.company||'Company'}${e.start ? ' | '+e.start : ''}${e.end ? ' - '+e.end : ''}</div>
      ${e.desc ? `<div class="cv-timeline-desc">${e.desc}</div>` : ''}
    </div>`).join('');
  const edusHtml = d.edus.map(e => `<div class="cv-timeline-item">
      <div class="cv-timeline-role">${e.degree||'Degree'}</div>
      <div class="cv-timeline-meta">${e.inst||'Institution'}${e.year ? ' | '+e.year : ''}${e.grade ? ' | '+e.grade : ''}</div>
    </div>`).join('');
  const skillsText = d.skills.map(s => s.name).filter(Boolean).join(', ');

  return `<article class="cv-timeline"><div class="cv-timeline-inner">
    <header class="cv-timeline-header">
      <div class="cv-timeline-name">${d.name}</div>
      <div class="cv-timeline-sub">${d.jobtitle||'Your Role'}</div>
      <div class="cv-timeline-contact">${contactItems}</div>
    </header>
    <div class="cv-timeline-grid">
      <div>
        ${d.summary ? `<section class="cv-timeline-section"><h2 class="cv-timeline-title">Summary</h2><p class="cv-timeline-desc">${d.summary}</p></section>` : ''}
        ${expsHtml ? `<section class="cv-timeline-section"><h2 class="cv-timeline-title">Experience</h2><div class="cv-timeline-line">${expsHtml}</div></section>` : ''}
      </div>
      <div>
        ${skillsText ? `<section class="cv-timeline-section"><h2 class="cv-timeline-title">Skills</h2><p class="cv-timeline-skills">${skillsText}</p></section>` : ''}
        ${edusHtml ? `<section class="cv-timeline-section"><h2 class="cv-timeline-title">Education</h2><div class="cv-timeline-line">${edusHtml}</div></section>` : ''}
      </div>
    </div>
  </div></article>`;
}

function renderDev(d) {
  const summary = d.summary || 'Developer focused on building reliable, performant systems and clean user experiences.';
  const skillLevel = (lvl) => {
    const n = Number(lvl || 0);
    if(n >= 80) return 'Expert';
    if(n >= 60) return 'Advanced';
    if(n >= 40) return 'Intermediate';
    return 'Beginner';
  };
  const skillsHtml = d.skills.map(s => `<div class="cv-dev-skill"><span>${s.name}</span><span class="cv-dev-level">${skillLevel(s.level)}</span></div>`).join('');
  const projsHtml = d.projs.map(p => {
    const techs = (p.tech || '').split(',').map(t => t.trim()).filter(Boolean);
    const badges = techs.map(t => `<span class="cv-dev-badge">${t}</span>`).join('');
    const link = p.link ? `<a class="cv-dev-link" href="${p.link}" target="_blank" rel="noopener">GitHub: ${p.link}</a>` : '';
    return `<div class="cv-dev-project">
      <div class="cv-dev-project-title">${p.name||'Project'}</div>
      ${p.desc ? `<div class="cv-dev-project-desc">${p.desc}</div>` : ''}
      ${badges ? `<div class="cv-dev-badges">${badges}</div>` : ''}
      ${link}
    </div>`;
  }).join('');
  const expsHtml = d.exps.map(e => `<div class="cv-dev-exp">
    <div class="cv-dev-exp-title">${e.title||'Role'}</div>
    <div class="cv-dev-exp-sub">${e.company||'Company'}${e.start ? ' | '+e.start : ''}${e.end ? ' - '+e.end : ''}</div>
    ${e.desc ? `<div class="cv-dev-project-desc">${e.desc}</div>` : ''}
  </div>`).join('');

  return `<article class="cv-dev"><div class="cv-dev-inner">
    <header class="cv-dev-header">
      <div class="cv-dev-name">${d.name}</div>
      <div class="cv-dev-sub">${d.jobtitle||'Developer'} | ${d.email||''}</div>
      <div class="cv-dev-summary">${summary}</div>
    </header>
    <section class="cv-dev-section">
      <h2 class="cv-dev-title">Skills</h2>
      <div class="cv-dev-skill-grid">${skillsHtml}</div>
    </section>
    <section class="cv-dev-section">
      <h2 class="cv-dev-title">Projects</h2>
      ${projsHtml}
    </section>
    ${expsHtml ? `<section class="cv-dev-section">
      <h2 class="cv-dev-title">Experience</h2>
      ${expsHtml}
    </section>` : ''}
  </div></article>`;
}

// -- UPDATE PREVIEW --
function updatePreview() {
  const d = getData();
  const renders = { exec: renderExec, minimal: renderMinimal, creative: renderCreative, tech: renderTech, aurum: renderAurum, cobalt: renderCobalt, opal: renderOpal, atlas: renderAtlas, obsidian: renderObsidian, ats: renderATS, modern: renderModern, timeline: renderTimeline, dev: renderDev };
  const html = (renders[currentTemplate] || renderExec)(d);
  document.getElementById('cv-preview-frame').innerHTML = html;
}

// -- DOWNLOAD PDF --
async function downloadPDF() {
  const fontsLink = document.querySelector('link[href*="fonts.googleapis.com"]');
  const d = getData();
  const renders = { exec: renderExec, minimal: renderMinimal, creative: renderCreative, tech: renderTech, aurum: renderAurum, cobalt: renderCobalt, opal: renderOpal, atlas: renderAtlas, obsidian: renderObsidian, ats: renderATS, modern: renderModern, timeline: renderTimeline, dev: renderDev };
  const cvHtml = `<div class="print-page">${(renders[currentTemplate] || renderExec)(d)}</div>`;
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('show');
  const container = document.createElement('div');
  container.innerHTML = cvHtml;
  container.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:794px;';
  // Inject styles
  if(fontsLink) container.prepend(fontsLink.cloneNode(true));
  const styleEl = document.createElement('style');
  styleEl.textContent = await getStylesText();
  container.prepend(styleEl);
  document.body.appendChild(container);
  const fname = (d.name || 'CV').replace(/\s+/g, '_');
  const opt = {
    margin: [0,0,0,0],
    filename: `${fname}_CV.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: null },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(container).save().then(() => {
    document.body.removeChild(container);
    overlay.classList.remove('show');
    showToast('PDF downloaded successfully.');
  }).catch(() => {
    document.body.removeChild(container);
    overlay.classList.remove('show');
    showToast('Download failed. Try Print instead.');
  });
}

// -- PRINT --
async function printCV() {
  const d = getData();
  const renders = { exec: renderExec, minimal: renderMinimal, creative: renderCreative, tech: renderTech, aurum: renderAurum, cobalt: renderCobalt, opal: renderOpal, atlas: renderAtlas, obsidian: renderObsidian, ats: renderATS, modern: renderModern, timeline: renderTimeline, dev: renderDev };
  const cvHtml = `<div class="print-page">${(renders[currentTemplate] || renderExec)(d)}</div>`;
  const w = window.open('','_blank','width=900,height=700');
  const cssText = await getStylesText();
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>CV - ${d.name}</title><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:wght@400;700&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet"><style>${cssText}body{margin:0;padding:0;}@media print{body{margin:0;}}</style></head><body class="print-mode">${cvHtml}<script>window.onload=()=>{window.print();}</script></body></html>`);
  w.document.close();
}

// -- TOAST --
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// -- REVEAL --
function initReveal() {
  document.body.classList.add('js-ready');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if(e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 80); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
