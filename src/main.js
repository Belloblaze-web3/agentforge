const operators = [
  { id: 'ad-operator', category: 'ads', label: 'Ads', initials: 'AC', name: 'AdCatalyst', role: 'Performance ads operator', description: 'Build, launch, and iterate paid social systems that find the signal before the budget disappears.', tags: ['Meta', 'Testing', 'ROAS'], price: '$850', cadence: '/ sprint', availability: 'Starts in 24h', rating: '4.9', reviews: '34', accent: 'lime', featured: true },
  { id: 'social-operator', category: 'social', label: 'Social', initials: 'LO', name: 'Loopline', role: 'Social systems operator', description: 'Turn one strong point of view into a consistent publishing loop across the channels that matter.', tags: ['Strategy', 'Scheduling', 'Replies'], price: '$620', cadence: '/ month', availability: '3 spots open', rating: '4.8', reviews: '27', accent: 'coral', featured: false },
  { id: 'va-operator', category: 'assistant', label: 'Virtual assistant', initials: 'OP', name: 'Orbit', role: 'Executive ops operator', description: 'Clear the runway: research, inboxes, coordination, CRM upkeep, and the tasks only you think you can do.', tags: ['Research', 'Admin', 'CRM'], price: '$390', cadence: '/ week', availability: 'Online now', rating: '5.0', reviews: '19', accent: 'violet', featured: false },
  { id: 'content-operator', category: 'content', label: 'Content', initials: 'CL', name: 'Clarity', role: 'Content studio operator', description: 'Make your expertise legible with sharp angles, useful writing, and a pipeline that keeps shipping.', tags: ['Writing', 'SEO', 'LinkedIn'], price: '$540', cadence: '/ sprint', availability: 'Starts in 48h', rating: '4.9', reviews: '42', accent: 'blue', featured: true },
  { id: 'video-operator', category: 'video', label: 'Video', initials: 'FR', name: 'FrameRate', role: 'Short-form video operator', description: 'Concept, cut, caption, and package the clips that make people stop scrolling and keep watching.', tags: ['Reels', 'Scripts', 'Editing'], price: '$1,200', cadence: '/ pack', availability: '2 spots open', rating: '4.7', reviews: '16', accent: 'orange', featured: false },
  { id: 'signals-operator', category: 'signals', label: 'Market signals', initials: 'SN', name: 'Signal/Noise', role: 'Crypto & meme intelligence', description: 'Monitor narrative velocity, map the meme cycle, and turn noisy feeds into a researchable watchlist.', tags: ['Alerts', 'Narratives', 'Research'], price: '$480', cadence: '/ month', availability: 'Online now', rating: '4.8', reviews: '23', accent: 'pink', featured: true, caution: true }
];

const grid = document.querySelector('#agent-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#agent-search');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
let activeFilter = 'all';
let searchTerm = '';

function operatorCard(operator) {
  return `<article class="agent-card reveal is-visible accent-${operator.accent}" data-category="${operator.category}">
    <div class="agent-card-top"><div class="agent-avatar"><span>${operator.initials}</span><i></i></div><span class="card-label">${operator.label}</span>${operator.featured ? '<span class="featured-label">Featured</span>' : ''}</div>
    <div class="agent-title-row"><div><h3>${operator.name}</h3><p>${operator.role}</p></div><span class="agent-arrow">↗</span></div>
    <p class="agent-description">${operator.description}</p>
    <div class="tag-row">${operator.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
    <div class="agent-card-bottom"><div class="price"><strong>${operator.price}</strong><span>${operator.cadence}</span></div><div class="card-meta"><span class="availability"><i></i>${operator.availability}</span><span class="rating">★ ${operator.rating} <small>(${operator.reviews})</small></span></div></div>
    ${operator.caution ? '<div class="caution-note">Research & alerts only — no trade execution</div>' : ''}
    <button class="card-action js-profile" data-agent="${operator.id}" type="button">View operator <span>→</span></button>
  </article>`;
}

function visibleOperators() {
  return operators.filter(operator => {
    const matchesFilter = activeFilter === 'all' || operator.category === activeFilter;
    const haystack = [operator.name, operator.role, operator.description, operator.tags.join(' ')].join(' ').toLowerCase();
    return matchesFilter && (!searchTerm || haystack.includes(searchTerm));
  });
}

function renderOperators() {
  const visible = visibleOperators();
  grid.innerHTML = visible.map(operatorCard).join('');
  emptyState.hidden = visible.length > 0;
  grid.hidden = visible.length === 0;
  grid.querySelectorAll('.js-profile').forEach(button => button.addEventListener('click', () => openModal(button.dataset.agent)));
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle('is-active', item === button));
    renderOperators();
  });
});
searchInput.addEventListener('input', event => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderOperators();
});

const modal = document.querySelector('#inquiry-modal');
const modalForm = document.querySelector('#inquiry-form');
const successState = document.querySelector('#success-state');
const modalCopy = document.querySelector('#modal-copy');
const selectedAgent = document.querySelector('#selected-agent');
let chosenOperator = null;

function openModal(operatorId = null) {
  chosenOperator = operators.find(operator => operator.id === operatorId) || null;
  modal.hidden = false;
  document.body.classList.add('modal-open');
  successState.hidden = true;
  modalForm.hidden = false;
  modalCopy.textContent = chosenOperator ? `You’re looking at ${chosenOperator.name}. Tell us what you want to ship and we’ll send a clear first-step plan.` : 'Tell us what you want to move. We’ll route you to the right specialist and reply with a clear next step.';
  selectedAgent.innerHTML = chosenOperator
    ? `<span class="mini-orb">${chosenOperator.initials}</span><span><small>Selected operator</small><strong>${chosenOperator.name} / ${chosenOperator.role}</strong></span><span class="selected-price">${chosenOperator.price}<small>${chosenOperator.cadence}</small></span>`
    : '<span class="mini-orb">AG</span><span><small>Selected operator</small><strong>Open brief — we’ll match you</strong></span><span class="selected-price">Flexible</span>';
  window.setTimeout(() => modal.querySelector('input')?.focus(), 50);
}
function closeModal() {
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  modalForm.reset();
}
document.querySelectorAll('.js-book').forEach(button => button.addEventListener('click', () => openModal()));
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('[data-close-modal]').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
modalForm.addEventListener('submit', event => {
  event.preventDefault();
  modalForm.hidden = true;
  successState.hidden = false;
});

const mobileToggle = document.querySelector('.mobile-toggle');
const mainNav = document.querySelector('#main-nav');
mobileToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('is-open');
  mobileToggle.setAttribute('aria-expanded', String(open));
  mobileToggle.querySelector('span').textContent = open ? '×' : '＋';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mainNav.classList.remove('is-open')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
renderOperators();
