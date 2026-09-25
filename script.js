const portfolio = document.querySelector('#portfolio');
const folders = [...document.querySelectorAll('.folder')];
const tabs = [...document.querySelectorAll('.folder-tab')];
const typewriter = document.querySelector('#typewriter');
const contactEmail = 'sandra.jimenesramiro@gmail.com';
const text = 'Gameplay Programmer · Unity · C#';
let shown = '';
let deleting = false;

const projects = [
  { id: 'rubbish-pathfinder', title: 'The Rubbish Pathfinder', year: '2024', category: 'Proyecto Académico', role: 'Programación de Gameplay y Diseño de Juego', engine: 'Unity 2D | C#', platform: 'Itch.io', status: 'ready', synopsis: 'Aventura 2D con foco en sistemas de navegación, interacción y progresión diseñados para reforzar el recorrido del jugador.', coverClass: 'cover-rubbish', galleryClass: 'gallery-rubbish' },
  { id: 'whispers-vanished-case', title: 'Whispers of Vanished Case', year: '2024', category: 'Proyecto Académico', role: 'Programación de Gameplay y Diseño de Juego', engine: 'Unity 2D | C#', platform: 'Itch.io', status: 'ready', synopsis: 'Experiencia narrativa de misterio con lógica de investigación, ritmo de descubrimiento y momentos guiados por pistas.', coverClass: 'cover-whispers', galleryClass: 'gallery-whispers' },
  { id: 'clashing-blocks', title: 'Clashing Blocks', year: '2024', category: 'Proyecto Académico', role: 'Programación de Gameplay y Diseño de Juego', engine: 'Unity 2D | C#', platform: 'Itch.io', status: 'ready', synopsis: 'Juego centrado en reglas claras, respuesta inmediata y mecánicas de bloques con lectura rápida para partidas dinámicas.', coverClass: 'cover-blocks', galleryClass: 'gallery-blocks' },
  { id: 'dash-and-dine', title: 'Dash&Dine', year: '2025', category: 'Proyecto Académico', role: 'Programación de Gameplay y Diseño de Juego', engine: 'Unity 3D/2D | C#', platform: 'Itch.io', status: 'ready', synopsis: 'Proyecto con énfasis en loop de acciones, gestión de ritmo y controles ágiles para una experiencia rápida y expresiva.', coverClass: 'cover-dash', galleryClass: 'gallery-dash' },
  { id: 'last-beacon', title: 'The Last Beacon', year: '2026', category: 'Proyecto actual', role: 'En desarrollo', engine: 'Unity | C#', platform: 'Coming soon', status: 'soon', synopsis: 'Proyecto actual en desarrollo. El espacio queda preparado para añadir tráiler, imágenes y detalles cuando estén listos.', coverClass: 'cover-beacon', galleryClass: 'gallery-beacon' },
];

function tickTypewriter() {
  const complete = shown === text;
  const empty = shown.length === 0;
  const delay = complete && !deleting ? 1450 : empty && deleting ? 400 : deleting ? 42 : 76;
  setTimeout(() => {
    if (complete && !deleting) deleting = true;
    else if (empty && deleting) deleting = false;
    else shown = text.slice(0, deleting ? shown.length - 1 : shown.length + 1);
    typewriter.textContent = shown;
    tickTypewriter();
  }, delay);
}

function setActiveFolder(folder) {
  const isActive = folder.classList.contains('active');
  folders.forEach((item) => {
    item.classList.remove('active', 'inactive');
    item.querySelector('.folder-tab').setAttribute('aria-expanded', 'false');
  });
  portfolio.classList.toggle('is-open', !isActive);
  if (!isActive) {
    folder.classList.add('active');
    folder.querySelector('.folder-tab').setAttribute('aria-expanded', 'true');
    folders.filter((item) => item !== folder).forEach((item) => item.classList.add('inactive'));
  }
}

function renderProjects() {
  const grid = document.querySelector('#projectsGrid');
  grid.innerHTML = projects.map((project) => `
    <button class="project-cover ${project.coverClass}" type="button" data-project="${project.id}" aria-label="Ver ${project.title}">
      <span class="project-year">▣ ${project.year}</span>
      <span class="project-hover"><strong>${project.title}</strong><span>${project.status === 'soon' ? 'Coming soon' : project.year}</span></span>
    </button>
  `).join('');
  grid.querySelectorAll('[data-project]').forEach((button) => button.addEventListener('click', () => showProject(button.dataset.project)));
}

function showProject(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;
  const list = document.querySelector('#projectsList');
  const detail = document.querySelector('#projectDetail');
  const related = projects.filter((item) => item.id !== project.id);
  list.classList.add('hidden');
  detail.classList.remove('hidden');
  detail.innerHTML = `
    <button class="back-button" type="button" id="backToProjects">← Volver a proyectos</button>
    <div class="project-hero">
      <div><p class="eyebrow">${project.category}</p><h2>${project.title}</h2><p class="project-synopsis">${project.synopsis}</p></div>
      <div class="trailer-box ${project.coverClass}"><span>▷</span><span>${project.status === 'soon' ? 'Trailer coming soon' : 'Espacio para trailer'}</span></div>
    </div>
    <dl class="project-meta">
      <div><dt>Fecha</dt><dd>${project.year}</dd></div>
      <div><dt>Rol</dt><dd>${project.role}</dd></div>
      <div><dt>Motor y lenguaje</dt><dd>${project.engine}</dd></div>
      <div><dt>Plataforma</dt><dd>${project.platform}</dd></div>
    </dl>
    <div class="gallery-strip" aria-label="Imágenes de ${project.title}">
      <div class="gallery-frame ${project.galleryClass}"><span>Imagen 1</span></div>
      <div class="gallery-frame ${project.galleryClass}"><span>Imagen 2</span></div>
      <div class="gallery-frame ${project.galleryClass}"><span>Imagen 3</span></div>
    </div>
    <section class="related-projects" aria-label="También te gustaría">
      <p class="eyebrow">También te gustaría</p>
      <div class="related-grid">${related.map((item) => `<button class="related-card" type="button" data-project="${item.id}"><span>${item.year}</span><strong>${item.title}</strong></button>`).join('')}</div>
    </section>
  `;
  detail.querySelector('#backToProjects').addEventListener('click', () => {
    detail.classList.add('hidden');
    list.classList.remove('hidden');
  });
  detail.querySelectorAll('[data-project]').forEach((button) => button.addEventListener('click', () => showProject(button.dataset.project)));
}

tabs.forEach((tab) => tab.addEventListener('click', () => setActiveFolder(tab.closest('.folder'))));
document.querySelector('#contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#message').value;
  const subject = encodeURIComponent(`Contacto portfolio — ${name || 'Nueva oportunidad'}`);
  const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});

renderProjects();
tickTypewriter();
