// =====================================================================
// EDIT HERE to add/update a project. Each entry needs:
//   id        - unique URL-safe slug (used as the #hash, e.g. #project-alpha)
//   name      - shown in the sidebar
//   updated   - human-readable date for "last updated"
//   status    - the status-update text (plain text; newlines are preserved)
//   artifacts - array of { label, url } - url should be a published
//               Claude Artifact link, e.g. https://claude.ai/public/artifacts/...
//               (leave the array empty if there's nothing published yet)
// To add a project: copy one of the objects below, edit the fields, done.
// =====================================================================
const PROJECTS = [
  {
    id: 'project-alpha',
    name: 'Project Alpha',
    updated: '2026-07-01',
    status: '[PLACEHOLDER] Replace with a real status update for Project Alpha — what shipped, what\'s in progress, blockers, etc.',
    artifacts: [
      { label: '[PLACEHOLDER] Design mockup artifact', url: 'https://claude.ai/public/artifacts/00000000-0000-0000-0000-000000000001' },
      { label: '[PLACEHOLDER] Data analysis artifact', url: 'https://claude.ai/public/artifacts/00000000-0000-0000-0000-000000000002' },
    ],
  },
  {
    id: 'project-beta',
    name: 'Project Beta',
    updated: '2026-06-15',
    status: '[PLACEHOLDER] Replace with a real status update for Project Beta.',
    artifacts: [
      { label: '[PLACEHOLDER] Prototype artifact', url: 'https://claude.ai/public/artifacts/00000000-0000-0000-0000-000000000003' },
    ],
  },
  {
    id: 'project-gamma',
    name: 'Project Gamma',
    updated: '2026-07-10',
    status: '[PLACEHOLDER] Example of a project with no artifacts published yet.',
    artifacts: [],
  },
  // Add more project objects here.
];
// =====================================================================

const projectList = document.getElementById('project-list');
const content = document.getElementById('content');
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');

function renderSidebar() {
  projectList.innerHTML = PROJECTS.map((project) => (
    `<li><a href="#${project.id}" data-id="${project.id}">${project.name}</a></li>`
  )).join('');
}

function renderContent(id) {
  const project = PROJECTS.find((p) => p.id === id) || PROJECTS[0];

  const artifactsHtml = project.artifacts.length
    ? `<ul class="artifact-list">${project.artifacts.map((artifact) => (
        `<li><a href="${artifact.url}" target="_blank" rel="noopener">${artifact.label}</a></li>`
      )).join('')}</ul>`
    : '<p class="no-artifacts">No artifacts published yet.</p>';

  content.innerHTML = `
    <h2>${project.name}</h2>
    <p class="updated">Last updated: ${project.updated}</p>
    <p class="status">${project.status}</p>
    ${artifactsHtml}
  `;

  projectList.querySelectorAll('a').forEach((link) => {
    link.classList.toggle('active', link.dataset.id === project.id);
  });
}

function selectFromHash() {
  const id = location.hash.replace('#', '') || PROJECTS[0].id;
  renderContent(id);
  sidebar.classList.remove('open');
}

renderSidebar();
selectFromHash();
window.addEventListener('hashchange', selectFromHash);

sidebarToggle.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  sidebarToggle.setAttribute('aria-expanded', String(isOpen));
});
