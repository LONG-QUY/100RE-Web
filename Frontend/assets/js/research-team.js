/* Detailed research profiles complement, rather than replace, the member directory. */
(() => {
  const codes = { solar: 'pv', wind: 'wind', 'unit-commitment-demand-response': 'dr_uc', 'smart-grid': 'smartgrid', 'electric-vehicle': 'ev', hydrogen: 'hydrogen', bess: 'bess', ai: 'ai' };
  const selected = new URLSearchParams(location.search).get('team') || 'solar';
  const teams = window.LAB_DATA.researchAreas;
  const match = teams.find(team => team.id === selected);
  if (!match) {
    document.getElementById('researchTitle').textContent = 'Research team not found';
    document.getElementById('researchProfiles').hidden = true;
    return;
  }
  window.PUBLIC_PROFILE_CONFIG = {
    kind: 'research', endpoint: '/api/public/content/researchTeamProfiles', selectedKey: match.id,
    fields: [
      ['title', 'Team Name / Research Area', 'text', true],
      ['overview', 'Overview', 'textarea'],
      ['architecture', 'Research Context, Questions & Objectives', 'textarea'],
      ['features', 'Current Research Directions (detailed description)', 'textarea'],
      ['specifications', 'Methods, Models & Tools', 'textarea'],
      ['results', 'Research Results & Applications', 'textarea'],
      ['futureDirections', 'Future Directions', 'textarea'],
      ['systemUrl', 'Research Resources / Demo URL', 'url']
    ],
    systems: teams.map(team => ({
      key: team.id, hash: team.id, title: team.title, memberCode: codes[team.id],
      defaults: { title: team.title, overview: team.summary, architecture: team.vision,
        features: Array.isArray(team.topics) ? team.topics.map((topic, index) => `${index + 1}. ${topic}`).join('\n\n') : team.topics,
        results: team.conducted, futureDirections: team.futureDirections }
    }))
  };
  document.title = `${match.title} | Research | 100RE Laboratory`;
  document.getElementById('researchTitle').textContent = match.title;
  document.getElementById('researchMemberLink').href = `members.html#team-${codes[match.id]}`;
  const root = document.getElementById('researchProfiles');
  teams.forEach(team => {
    const section = document.createElement('section'); section.className = 'pv-panel';
    section.id = team.id; section.dataset.system = team.id; section.hidden = team.id !== match.id;
    root.append(section);
  });
})();
