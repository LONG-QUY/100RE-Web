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
    ['title', 'Tên hệ thống', 'text', true],
    ['overview', 'Giới thiệu hệ thống', 'textarea'],
    ['location', 'Vị trí lắp đặt', 'text'],
    ['capacity', 'Công suất / quy mô', 'text'],
    ['systemUrl', 'Đường dẫn truy cập hệ thống', 'url'],
    ['architecture', 'Cấu trúc hệ thống', 'textarea'],
    ['features', 'Chức năng chính', 'textarea'],
    ['specifications', 'Thông số kỹ thuật', 'textarea']
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
    const facts = [['Vị trí', record.location], ['Công suất / quy mô', record.capacity]];
    if (record.specifications) record.specifications.split('\n').filter(line => line.trim()).forEach(line => {
      const separator = line.indexOf(':');
      facts.push(separator > 0 ? [line.slice(0, separator).trim(), line.slice(separator + 1).trim()] : ['Thông số', line]);
    });
    const factsHtml = research ? '' : facts.filter(([, value]) => value).map(([label, value]) => `<dt>${escape(label)}</dt><dd>${escape(value)}</dd>`).join('');
    const url = webUrl(record.systemUrl);
    const hasDetails = record.architecture || record.features;
    panel(system.key).innerHTML = `
      <div class="pv-heading">
        <div><h2>${escape(record.title)}</h2><p>${escape(record.overview || 'Thông tin giới thiệu hệ thống sẽ được cập nhật tại đây.')}</p></div>
        <button type="button" class="pv-button pv-admin" data-action="edit" hidden><i class="fa-solid fa-pen-to-square" aria-hidden="true"></i> Chỉnh sửa thông tin &amp; ảnh</button>
      </div>
      <form class="pv-editor" hidden aria-label="Chỉnh sửa ${escape(system.title)}">
        <h3>Cập nhật ${escape(system.title)}</h3>
        <p>Nội dung và ảnh của ${research ? 'nhóm nghiên cứu' : 'hệ thống'} này được lưu riêng. Các thay đổi chỉ hiển thị công khai sau khi bạn lưu thành công.</p>
        <fieldset><div class="pv-form-grid">
          ${fields.map(([key, label, type, required]) => `<div class="pv-field ${type === 'textarea' ? 'wide' : ''}">
            <label for="${system.key}-${key}">${label}${required ? ' *' : ''}</label>
            ${type === 'textarea' ? `<textarea id="${system.key}-${key}" name="${key}" maxlength="8000" rows="4"></textarea>` : `<input id="${system.key}-${key}" name="${key}" type="${type}" maxlength="${key === 'title' ? 160 : 2000}" ${required ? 'required' : ''}>`}
            ${key === 'specifications' && !research ? '<small>Mỗi dòng một thông số, ví dụ: Công suất: 3.6 kWp</small>' : ''}
            ${key === 'systemUrl' ? '<small>Không bắt buộc. Sử dụng đường dẫn http:// hoặc https://.</small>' : ''}
          </div>`).join('')}
        </div>
        <h4 class="pv-photos-heading">${research ? 'Hình ảnh nghiên cứu, mô hình & thí nghiệm' : 'Ảnh hệ thống thực tế'}</h4>
        <p class="pv-notice">Tối đa 8 ảnh cho mỗi hệ thống. Chọn JPG, PNG hoặc WebP, tối đa 10 MB/ảnh. Ảnh được tối ưu trước khi lưu.</p>
        <div class="pv-photo-actions">
          <div class="pv-field"><label for="${system.key}-photos">Chọn ảnh từ máy</label>
          <input id="${system.key}-photos" name="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple>
          </div><div class="pv-field"><label for="${system.key}-camera">Chụp ảnh (thiết bị có camera)</label>
          <input id="${system.key}-camera" name="camera" type="file" accept="image/jpeg,image/png,image/webp" capture="environment"></div>
        </div>
        <div class="pv-draft-photos"></div>
        <div class="pv-form-actions"><button class="pv-button" type="submit">Lưu &amp; hiển thị</button><button class="pv-button secondary" type="button" data-action="cancel">Hủy thay đổi</button></div>
        </fieldset>
        <p class="pv-form-status" role="status" aria-live="polite"></p>
      </form>
      <div class="pv-public-content">
        ${url ? `<a class="pv-button secondary" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${research ? 'Tài liệu / demo nghiên cứu' : 'Mở hệ thống'} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></a>` : ''}
        <div class="pv-layout">
          <div class="pv-copy">${research ? [
            ['architecture', 'Bối cảnh & mục tiêu nghiên cứu'], ['features', 'Các hướng nghiên cứu đang triển khai'],
            ['specifications', 'Phương pháp & công cụ'], ['results', 'Kết quả & ứng dụng'], ['futureDirections', 'Định hướng tiếp theo']
          ].filter(([key]) => record[key]).map(([key, label]) => `<section><h3>${label}</h3><p>${escape(record[key])}</p></section>`).join('') || '<p>Nội dung nghiên cứu chi tiết đang được cập nhật.</p>' : hasDetails ? [
            record.architecture ? `<section><h3>Cấu trúc hệ thống</h3><p>${escape(record.architecture)}</p></section>` : '',
            record.features ? `<section><h3>Chức năng chính</h3><p>${escape(record.features)}</p></section>` : ''
          ].join('') : '<h3>Thông tin hệ thống</h3><p>Chưa có mô tả chi tiết cho hệ thống này.</p>'}</div>
          ${research ? `<aside class="pv-facts"><h3>Về nhóm nghiên cứu</h3><p class="pv-notice">${escape(system.title)}</p><a class="pv-button secondary" href="members.html#team-${escape(system.memberCode)}">Thành viên của nhóm</a><a class="pv-button secondary" href="publications.html">Công bố khoa học</a></aside>` : `<aside class="pv-facts"><h3>Thông số &amp; triển khai</h3>${factsHtml ? `<dl>${factsHtml}</dl>` : '<p class="pv-notice">Thông số kỹ thuật đang được cập nhật.</p>'}</aside>`}
        </div>
        <section class="pv-gallery" aria-label="Hình ảnh ${escape(system.title)}"><h3>${research ? 'Hình ảnh nghiên cứu & thí nghiệm' : 'Ảnh hệ thống thực tế'}</h3>
          ${record.photos.length ? `<div class="pv-gallery-grid">${record.photos.map(photo => `<figure><img src="${escape(photo.src)}" alt="${escape(photo.caption || record.title)}" loading="lazy"><figcaption>${escape(photo.caption)}</figcaption></figure>`).join('')}</div>` : `<div class="pv-empty"><i class="fa-solid fa-camera" aria-hidden="true"></i><p>${research ? 'Chưa có ảnh nghiên cứu. Sơ đồ, mô hình, kết quả mô phỏng và ảnh thí nghiệm của nhóm sẽ được hiển thị tại đây.' : 'Chưa có ảnh hệ thống thực tế. Ảnh chụp thiết bị, khu vực lắp đặt và giao diện vận hành sẽ được hiển thị tại đây.'}</p><button type="button" class="pv-button secondary pv-admin" data-action="edit" hidden>Thêm hình ảnh</button></div>`}
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
      <img src="${escape(photo.src)}" alt="Ảnh xem trước ${index + 1}">
      <div class="pv-field"><label for="${system.key}-caption-${index}">Chú thích ảnh ${index + 1}</label><input id="${system.key}-caption-${index}" type="text" maxlength="300" value="${escape(photo.caption)}"></div>
      <button type="button" class="pv-button secondary" aria-label="Xóa ảnh ${index + 1}">Xóa ảnh</button></div>`).join('');
    target.querySelectorAll('.pv-draft-photo').forEach((element, index) => {
      element.querySelector('input').addEventListener('input', event => { drafts[system.key].photos[index].caption = event.target.value; });
      element.querySelector('button').addEventListener('click', () => {
        drafts[system.key].photos.splice(index, 1); renderDraftPhotos(system);
        status(system.key, 'Ảnh đã được gỡ khỏi bản chỉnh sửa. Bấm Lưu để áp dụng.');
      });
    });
  }

  async function optimizePhoto(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP.');
    if (file.size > 10 * 1024 * 1024) throw new Error('Ảnh vượt quá 10 MB. Vui lòng chọn ảnh nhỏ hơn.');
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
      throw new Error('Không đọc được ảnh. Vui lòng chọn một ảnh JPG, PNG hoặc WebP hợp lệ.');
    } finally { URL.revokeObjectURL(objectUrl); }
  }

  async function addPhotos(system, input) {
    if (!isAdmin() || !drafts[system.key] || saving) return;
    const files = Array.from(input.files || []);
    if (!files.length) return;
    const draft = drafts[system.key];
    if (draft.photos.length + files.length > 8) {
      status(system.key, 'Mỗi hệ thống có tối đa 8 ảnh. Vui lòng chọn ít ảnh hơn.', true); input.value = ''; return;
    }
    const fieldset = form(system.key).querySelector('fieldset');
    fieldset.disabled = true;
    status(system.key, 'Đang xử lý ảnh…');
    try {
      const photos = [];
      for (const file of files) photos.push(await optimizePhoto(file));
      draft.photos.push(...photos); renderDraftPhotos(system);
      status(system.key, 'Ảnh đã sẵn sàng. Thêm chú thích và bấm Lưu để hiển thị công khai.');
    } catch (error) { status(system.key, error.message, true); }
    finally { fieldset.disabled = false; input.value = ''; }
  }

  async function save(event, system) {
    event.preventDefault();
    if (!isAdmin() || !loaded || saving) return;
    const editor = form(system.key);
    const next = structuredClone(content);
    fields.forEach(([key]) => { drafts[system.key][key] = editor.elements[key].value.trim(); });
    if (!drafts[system.key].title) { status(system.key, 'Vui lòng nhập tên hệ thống.', true); return; }
    if (drafts[system.key].systemUrl && !webUrl(drafts[system.key].systemUrl)) {
      status(system.key, 'Đường dẫn hệ thống phải bắt đầu bằng http:// hoặc https://.', true); return;
    }
    next[system.key] = structuredClone(drafts[system.key]);
    saving = true; syncAuth(); editor.querySelector('fieldset').disabled = true;
    status(system.key, 'Đang lưu nội dung và ảnh…');
    try {
      await window.savePublicData(endpoint, 'PUT', next);
      content = next; delete drafts[system.key];
      render(system); syncAuth();
      // Keep confirmation visible after the editor has closed.
      const confirmation = document.createElement('p');
      confirmation.className = 'pv-form-status'; confirmation.setAttribute('role', 'status');
      confirmation.textContent = 'Đã lưu. Nội dung và ảnh đã được hiển thị công khai.';
      panel(system.key).querySelector('.pv-heading').after(confirmation);
      panel(system.key).querySelector('[data-action="edit"]').focus();
    } catch (error) { status(system.key, `${error.message} Bản chỉnh sửa vẫn được giữ để bạn thử lại.`, true); }
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
    loadStatus.textContent = 'Đang tải thông tin hệ thống…';
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
      loadStatus.innerHTML = 'Chưa tải được nội dung từ máy chủ. <button type="button" class="pv-button secondary">Thử lại</button>';
      loadStatus.querySelector('button').addEventListener('click', load);
    }
  }
  syncAuth(); load();
});
