/* Two independent public PV system profiles, saved through the existing content API. */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  if (document.getElementById('researchProfiles')?.hidden) return;
  const config = window.PUBLIC_PROFILE_CONFIG || {};
  const research = config.kind === 'research';
  const endpoint = config.endpoint || '/api/public/content/pvSystems';
  const systems = config.systems || [
    { key: 'scada', hash: 'scada-pv', title: 'SCADA PV' },
    { key: 'digitalTwin', hash: 'digital-twin-pv', title: 'Digital Twin PV' }
  ];
  const fields = config.fields || [
    ['title', 'System Name', 'text', true],
    ['overview', 'System Overview', 'textarea'],
    ['location', 'Installation Location', 'text'],
    ['capacity', 'Capacity / Scale', 'text'],
    ['systemUrl', 'System URL', 'url'],
    ['architecture', 'System Architecture', 'textarea'],
    ['features', 'Key Features', 'textarea'],
    ['specifications', 'Technical Specifications', 'textarea']
  ];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const webUrl = value => {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  };
  const photoUrl = value => {
    if (typeof value !== 'string') return '';
    if (/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(value)) return value;
    if (/^(?:\/)?assets\/images\/[\w./-]+$/.test(value)) return value;
    return webUrl(value);
  };
  function normalize(value, fallback) {
    const record = {};
    fields.forEach(([key]) => { record[key] = typeof value?.[key] === 'string' ? value[key].slice(0, 8000) : ''; });
    record.title ||= fallback;
    record.photos = Array.isArray(value?.photos) ? value.photos.slice(0, 8).map(photo => ({
      src: photoUrl(photo?.src), caption: typeof photo?.caption === 'string' ? photo.caption.slice(0, 300) : ''
    })).filter(photo => photo.src) : [];
    return record;
  }
  let content = Object.fromEntries(systems.map(system => [system.key, normalize(system.defaults, system.title)]));
  const drafts = {};
  let loaded = false;
  let saving = false;
  const loadStatus = document.getElementById('pvLoadStatus');
  const isAdmin = () => document.body.classList.contains('admin-mode');
  const panel = key => document.querySelector(`[data-system="${key}"]`);
  const form = key => panel(key).querySelector('form');
  const status = (key, message, error = false) => {
    const target = form(key).querySelector('.pv-form-status');
    target.textContent = message;
    target.dataset.error = String(error);
  };

  function render(system) {
    const record = content[system.key];
    const facts = [['Location', record.location], ['Capacity / Scale', record.capacity]];
    if (record.specifications) record.specifications.split('\n').filter(line => line.trim()).forEach(line => {
      const separator = line.indexOf(':');
      facts.push(separator > 0 ? [line.slice(0, separator).trim(), line.slice(separator + 1).trim()] : ['Specification', line]);
    });
    const factsHtml = research ? '' : facts.filter(([, value]) => value).map(([label, value]) => `<dt>${escape(label)}</dt><dd>${escape(value)}</dd>`).join('');
    const url = webUrl(record.systemUrl);
    const hasDetails = record.architecture || record.features;
    panel(system.key).innerHTML = `
      <div class="pv-heading">
        <div><h2>${escape(record.title)}</h2><p>${escape(record.overview || 'The system overview will be published here.')}</p></div>
        <button type="button" class="pv-button pv-admin" data-action="edit" hidden><i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> Edit Content &amp; Photos</button>
      </div>
      <form class="pv-editor" hidden aria-label="Edit ${escape(system.title)}">
        <h3>Update ${escape(system.title)}</h3>
        <p>Content and photos for this ${research ? 'research team' : 'system'} are saved separately. Changes are published only after a successful save.</p>
        <fieldset><div class="pv-form-grid">
          ${fields.map(([key, label, type, required]) => `<div class="pv-field ${type === 'textarea' ? 'wide' : ''}">
            <label for="${system.key}-${key}">${label}${required ? ' *' : ''}</label>
            ${type === 'textarea' ? `<textarea id="${system.key}-${key}" name="${key}" maxlength="8000" rows="4"></textarea>` : `<input id="${system.key}-${key}" name="${key}" type="${type}" maxlength="${key === 'title' ? 160 : 2000}" ${required ? 'required' : ''}>`}
            ${key === 'specifications' && !research ? '<small>Enter one specification per line, e.g. Capacity: 3.6 kWp</small>' : ''}
            ${key === 'systemUrl' ? '<small>Optional. Use an http:// or https:// URL.</small>' : ''}
          </div>`).join('')}
        </div>
        <h4 class="pv-photos-heading">${research ? 'Research, Models & Experiments' : 'Real System Photos'}</h4>
        <p class="pv-notice">Add up to 8 photos per profile. Choose JPG, PNG, or WebP files up to 10 MB each. Images are optimized before saving.</p>
        <div class="pv-photo-actions">
          <div class="pv-field"><label for="${system.key}-photos">Choose Photos</label>
          <input id="${system.key}-photos" name="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple>
          </div><div class="pv-field"><label for="${system.key}-camera">Take Photo (camera-enabled devices)</label>
          <input id="${system.key}-camera" name="camera" type="file" accept="image/jpeg,image/png,image/webp" capture="environment"></div>
        </div>
        <div class="pv-draft-photos"></div>
        <div class="pv-form-actions"><button class="pv-button" type="submit">Save &amp; Publish</button><button class="pv-button secondary" type="button" data-action="cancel">Discard Changes</button></div>
        </fieldset>
        <p class="pv-form-status" role="status" aria-live="polite"></p>
      </form>
      <div class="pv-public-content">
        ${url ? `<a class="pv-button secondary" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${research ? 'Research Resources / Demo' : 'Open System'} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ''}
        <div class="pv-layout">
          <div class="pv-copy">${research ? [
            ['architecture', 'Research Context & Objectives'], ['features', 'Current Research Directions'],
            ['specifications', 'Methods & Tools'], ['results', 'Results & Applications'], ['futureDirections', 'Future Directions']
          ].filter(([key]) => record[key]).map(([key, label]) => `<section><h3>${label}</h3><p>${escape(record[key])}</p></section>`).join('') || '<p>Detailed research information will be published here.</p>' : hasDetails ? [
            record.architecture ? `<section><h3>System Architecture</h3><p>${escape(record.architecture)}</p></section>` : '',
            record.features ? `<section><h3>Key Features</h3><p>${escape(record.features)}</p></section>` : ''
          ].join('') : '<h3>System Information</h3><p>A detailed description has not been added yet.</p>'}</div>
          ${research ? `<aside class="pv-facts"><h3>About the Research Team</h3><p class="pv-notice">${escape(system.title)}</p><a class="pv-button secondary" href="members.html#team-${escape(system.memberCode)}">Team Members</a><a class="pv-button secondary" href="publications.html">Publications</a></aside>` : `<aside class="pv-facts"><h3>Specifications &amp; Deployment</h3>${factsHtml ? `<dl>${factsHtml}</dl>` : '<p class="pv-notice">Technical specifications will be published here.</p>'}</aside>`}
        </div>
        <section class="pv-gallery" aria-label="Images ${escape(system.title)}"><h3>${research ? 'Research & Experimental Images' : 'Real System Photos'}</h3>
          ${record.photos.length ? `<div class="pv-gallery-grid">${record.photos.map(photo => `<figure><img src="${escape(photo.src)}" alt="${escape(photo.caption || record.title)}" loading="lazy"><figcaption>${escape(photo.caption)}</figcaption></figure>`).join('')}</div>` : `<div class="pv-empty"><i class="fa-solid fa-camera" aria-hidden="true"></i><p>${research ? 'No research images yet. Diagrams, models, simulation results, and experiment photos will appear here.' : 'No system photos yet. Equipment, installation, and operating interface photos will appear here.'}</p><button type="button" class="pv-button secondary pv-admin" data-action="edit" hidden>Add Images</button></div>`}
        </section>
      </div>`;
    const editor = form(system.key);
    editor.addEventListener('input', event => {
      if (drafts[system.key] && fields.some(([key]) => key === event.target.name)) {
        drafts[system.key][event.target.name] = event.target.value;
      }
    });
    editor.addEventListener('submit', event => save(event, system));
    editor.querySelectorAll('input[type="file"]').forEach(input => input.addEventListener('change', () => addPhotos(system, input)));
    panel(system.key).querySelectorAll('[data-action="edit"]').forEach(button => button.addEventListener('click', () => edit(system)));
    editor.querySelector('[data-action="cancel"]').addEventListener('click', () => {
      if (saving) return;
      delete drafts[system.key]; render(system); syncAuth();
      panel(system.key).querySelector('[data-action="edit"]').focus();
    });
  }

  function syncAuth() {
    document.querySelectorAll('.pv-admin').forEach(button => { button.hidden = !isAdmin(); button.disabled = !loaded || saving; });
    if (!isAdmin()) systems.forEach(system => {
      form(system.key).hidden = true;
      panel(system.key).querySelector('.pv-public-content').hidden = false;
    });
  }

  function edit(system) {
    if (!isAdmin() || !loaded || saving) return;
    const editor = form(system.key);
    if (!editor.hidden) { editor.elements.title.focus(); return; }
    if (!drafts[system.key]) drafts[system.key] = structuredClone(content[system.key]);
    fields.forEach(([key]) => { editor.elements[key].value = drafts[system.key][key]; });
    editor.hidden = false;
    panel(system.key).querySelector('.pv-public-content').hidden = true;
    renderDraftPhotos(system);
    editor.elements.title.focus();
  }

  function renderDraftPhotos(system) {
    const target = form(system.key).querySelector('.pv-draft-photos');
    target.innerHTML = drafts[system.key].photos.map((photo, index) => `<div class="pv-draft-photo">
      <img src="${escape(photo.src)}" alt="Image Preview ${index + 1}">
      <div class="pv-field"><label for="${system.key}-caption-${index}">Photo Caption ${index + 1}</label><input id="${system.key}-caption-${index}" type="text" maxlength="300" value="${escape(photo.caption)}"></div>
      <button type="button" class="pv-button secondary" aria-label="Remove Photo ${index + 1}">Remove Photo</button></div>`).join('');
    target.querySelectorAll('.pv-draft-photo').forEach((element, index) => {
      element.querySelector('input').addEventListener('input', event => { drafts[system.key].photos[index].caption = event.target.value; });
      element.querySelector('button').addEventListener('click', () => {
        drafts[system.key].photos.splice(index, 1); renderDraftPhotos(system);
        status(system.key, 'Photo removed from the draft. Save to apply this change.');
      });
    });
  }

  async function optimizePhoto(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPG, PNG, or WebP image.');
    if (file.size > 10 * 1024 * 1024) throw new Error('This image exceeds 10 MB. Choose a smaller file.');
    const objectUrl = URL.createObjectURL(file);
    try {
      const image = new Image(); image.src = objectUrl;
      await image.decode();
      const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d');
      context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      let src = canvas.toDataURL('image/jpeg', .82);
      if (src.length > 1200000) src = canvas.toDataURL('image/jpeg', .55);
      if (src.length > 1200000) {
        const small = document.createElement('canvas');
        small.width = Math.max(1, Math.round(canvas.width * .65));
        small.height = Math.max(1, Math.round(canvas.height * .65));
        small.getContext('2d').drawImage(canvas, 0, 0, small.width, small.height);
        src = small.toDataURL('image/jpeg', .65);
      }
      return { src, caption: '' };
    } catch (error) {
      throw new Error('This image could not be read. Choose a valid JPG, PNG, or WebP file.');
    } finally { URL.revokeObjectURL(objectUrl); }
  }

  async function addPhotos(system, input) {
    if (!isAdmin() || !drafts[system.key] || saving) return;
    const files = Array.from(input.files || []);
    if (!files.length) return;
    const draft = drafts[system.key];
    if (draft.photos.length + files.length > 8) {
      status(system.key, 'Each profile supports up to 8 photos. Select fewer files.', true); input.value = ''; return;
    }
    const fieldset = form(system.key).querySelector('fieldset');
    fieldset.disabled = true;
    status(system.key, 'Processing images…');
    try {
      const photos = [];
      for (const file of files) photos.push(await optimizePhoto(file));
      draft.photos.push(...photos); renderDraftPhotos(system);
      status(system.key, 'Photos are ready. Add captions and save to publish.');
    } catch (error) { status(system.key, error.message, true); }
    finally { fieldset.disabled = false; input.value = ''; }
  }

  async function save(event, system) {
    event.preventDefault();
    if (!isAdmin() || !loaded || saving) return;
    const editor = form(system.key);
    const next = structuredClone(content);
    fields.forEach(([key]) => { drafts[system.key][key] = editor.elements[key].value.trim(); });
    if (!drafts[system.key].title) { status(system.key, 'Enter a profile name.', true); return; }
    if (drafts[system.key].systemUrl && !webUrl(drafts[system.key].systemUrl)) {
      status(system.key, 'The URL must begin with http:// or https://.', true); return;
    }
    next[system.key] = structuredClone(drafts[system.key]);
    saving = true; syncAuth(); editor.querySelector('fieldset').disabled = true;
    status(system.key, 'Saving content and photos…');
    try {
      await window.savePublicData(endpoint, 'PUT', next);
      content = next; delete drafts[system.key];
      render(system); syncAuth();
      // Keep confirmation visible after the editor has closed.
      const confirmation = document.createElement('p');
      confirmation.className = 'pv-form-status'; confirmation.setAttribute('role', 'status');
      confirmation.textContent = 'Saved. Your content and photos are now published.';
      panel(system.key).querySelector('.pv-heading').after(confirmation);
      panel(system.key).querySelector('[data-action="edit"]').focus();
    } catch (error) { status(system.key, `${error.message} Your draft has been retained. Please try again.`, true); }
    finally { saving = false; form(system.key).querySelector('fieldset').disabled = false; syncAuth(); }
  }

  function selectTab(hash, focus = false) {
    const selected = systems.find(system => system.hash === hash) || systems.find(system => system.key === config.selectedKey) || systems[0];
    systems.forEach(system => {
      const active = system === selected;
      const tab = document.getElementById(`tab-${system.hash}`);
      if (tab) { tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; }
      panel(system.key).hidden = !active;
      if (active && focus) tab?.focus();
    });
  }
  systems.forEach((system, index) => {
    const tab = document.getElementById(`tab-${system.hash}`);
    tab?.addEventListener('click', () => {
      history.replaceState(null, '', `#${system.hash}`); selectTab(system.hash);
    });
    tab?.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') target = systems[(index + 1) % systems.length];
      else if (event.key === 'Home') target = systems[0];
      else if (event.key === 'End') target = systems[systems.length - 1];
      if (!target) return;
      event.preventDefault(); history.replaceState(null, '', `#${target.hash}`); selectTab(target.hash, true);
    });
    render(system);
  });
  selectTab(location.hash.slice(1));
  window.addEventListener('hashchange', () => selectTab(location.hash.slice(1)));
  new MutationObserver(syncAuth).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('beforeunload', event => {
    if (!Object.keys(drafts).length) return;
    event.preventDefault(); event.returnValue = '';
  });
  async function load() {
    loadStatus.textContent = 'Loading profile information…';
    try {
      const response = await fetch(endpoint, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (!data.notFound) {
        if (!data || typeof data !== 'object' || Array.isArray(data) || systems.some(system => !data[system.key])) throw new Error();
        content = Object.fromEntries(systems.map(system => [system.key, normalize(data[system.key], system.title)]));
      }
      loaded = true; systems.forEach(render); syncAuth(); loadStatus.hidden = true;
    } catch {
      loadStatus.className = 'pv-error';
      loadStatus.innerHTML = 'Unable to load content from the server. <button type="button" class="pv-button secondary">Try Again</button>';
      loadStatus.querySelector('button').addEventListener('click', load);
    }
  }
  syncAuth(); load();
});
