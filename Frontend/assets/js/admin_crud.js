/**
 * 100RE LABORATORY - Universal In-Place Admin CRUD Engine
 * Enables Add, Edit, Delete for all public website sections (News, Journey, Research Areas, Projects, Publications, Photos)
 */

(function () {
  'use strict';

  // 1. Unified Data Manager with Cloudflare KV Real-Time Database Sync
  const API_BASE = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1') ? '' : '';

  const englishNewsDefaults = structuredClone(window.LAB_DATA?.news || []);
  function localizeLegacyNews(key, items) {
    if (key !== 'news' || !Array.isArray(items)) return items;
    return items.map(item => {
      const defaults = englishNewsDefaults.find(record => record.id === item.id);
      const hashes = window.LAB_LEGACY_NEWS_HASHES?.[item.id];
      if (!defaults || !hashes) return item;
      const localized = { ...item };
      for (const field of ['imageCaption', 'excerpt', 'content']) {
        let hash = 2166136261;
        for (const char of item[field] || '') hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
        if (hash === hashes[field]) localized[field] = defaults[field];
      }
      return localized;
    });
  }

  const DataManager = {
    get(key) {
      try {
        const saved = localStorage.getItem('100re_data_' + key);
        if (saved) return localizeLegacyNews(key, JSON.parse(saved));
      } catch (e) {
        console.warn('Error reading from localStorage for ' + key, e);
      }
      return (window.LAB_DATA && window.LAB_DATA[key]) ? window.LAB_DATA[key] : [];
    },

    pendingWrites: new Set(),
    savedCollections: new Set(),

    cache(key, items) {
      items = localizeLegacyNews(key, items);
      try {
        localStorage.setItem('100re_data_' + key, JSON.stringify(items));
      } catch (e) {
        console.warn('Error caching ' + key, e);
      }
      if (window.LAB_DATA) window.LAB_DATA[key] = items;
      window.dispatchEvent(new CustomEvent('100re_data_updated', { detail: { key, items } }));
    },

    async set(key, items) {
      if (this.pendingWrites.has(key)) throw new Error('Saving your changes. Please wait.');
      this.pendingWrites.add(key);
      try {
        await window.savePublicData(`${API_BASE}/api/public/content/${key}`, 'PUT', items);
        this.savedCollections.add(key);
        this.cache(key, items);
      } finally {
        this.pendingWrites.delete(key);
      }
    },

    async fetchFromServer(key) {
      try {
        const res = await fetch(`${API_BASE}/api/public/content/${key}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && !this.pendingWrites.has(key) && !this.savedCollections.has(key)) {
            this.cache(key, data);
            return data;
          }
        }
      } catch (e) {
        // Fallback to local memory / LAB_DATA silently
      }
      return null;
    },

    async add(key, item) {
      const items = [...this.get(key)];
      item.id = item.id || (key + '-' + Date.now());
      items.unshift(item);
      await this.set(key, items);
      return item;
    },

    async update(key, id, updatedData) {
      const items = [...this.get(key)];
      const idx = items.findIndex(i => String(i.id) === String(id));
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updatedData };
        await this.set(key, items);
        return items[idx];
      }
      throw new Error('The item you want to edit could not be found.');
    },

    async remove(key, id) {
      let items = this.get(key);
      items = items.filter(i => String(i.id) !== String(id));
      await this.set(key, items);
      return true;
    }
  };

  // Preload and sync all collections from KV Database on startup
  ['news', 'journey', 'researchAreas', 'projects', 'publications', 'photos', 'featuredAlumni', 'teamAlumni'].forEach(key => {
    DataManager.fetchFromServer(key);
  });

  window.DataManager = DataManager;

  // 2. Collection Schemas & Configuration
  const SCHEMAS = {
    news: {
      name: "News Article",
      plural: "News Articles",
      containerId: "newsContainer",
      fields: [
        { key: "title", label: "Article Title", type: "text", required: true },
        { key: "date", label: "Date (e.g. March 15, 2026)", type: "text", required: true },
        { key: "readTime", label: "Read Time (e.g. 5 min read)", type: "text", defaultValue: "4 min read" },
        { key: "image", label: "Cover Image URL / Upload", type: "image", required: true },
        { key: "excerpt", label: "Short Excerpt", type: "textarea", required: true },
        { key: "content", label: "Full Article Content / Details", type: "textarea" }
      ],
      renderItem(item) {
        return `
          <article class="news-card" data-id="${item.id}">
            <div class="news-img-wrap">
              <img src="${item.image || 'assets/images/logo.jpg'}" alt="${item.title}" class="news-img" onerror="this.src='assets/images/logo.jpg'">
            </div>
            <div class="news-card-body">
              <div class="news-date"><i class="fa-regular fa-calendar"></i> ${item.date} · <i class="fa-regular fa-clock"></i> ${item.readTime || '4 min read'}</div>
              <h3 class="news-title">${item.title}</h3>
              <p class="news-excerpt">${item.excerpt || ''}</p>
              ${getAdminCardButtons('news', item.id)}
            </div>
          </article>
        `;
      }
    },

    journey: {
      name: "Journey Event",
      plural: "Journey Events",
      containerId: "journeyContainer",
      fields: [
        { key: "title", label: "Event Title", type: "text", required: true },
        { key: "date", label: "Date / Period (e.g. Sep 2023 / 2024)", type: "text", required: true },
        { key: "category", label: "Category (e.g. International Conference, Delegation, Workshop)", type: "text", required: true },
        { key: "image", label: "Event Image URL / Upload", type: "image", required: true },
        { key: "description", label: "Event Description & Highlights", type: "textarea", required: true }
      ],
      renderItem(item) {
        return `
          <article class="journey-card" data-id="${item.id}">
            <div class="journey-img-wrap">
              <img src="${item.image || 'assets/images/logo.jpg'}" alt="${item.title}" class="journey-img" onerror="this.src='assets/images/logo.jpg'">
              <span class="journey-badge">${item.category || 'Event'}</span>
            </div>
            <div class="journey-card-body">
              <div class="journey-date"><i class="fa-regular fa-calendar-days"></i> ${item.date}</div>
              <h3 class="journey-title">${item.title}</h3>
              <p class="journey-desc">${item.description || ''}</p>
              ${getAdminCardButtons('journey', item.id)}
            </div>
          </article>
        `;
      }
    },

    researchAreas: {
      name: "Research Team",
      plural: "Research Teams",
      containerId: "researchAreasContainer",
      fields: [
        { key: "title", label: "Area Title (e.g. Solar Energy (PV))", type: "text", required: true },
        { key: "team", label: "Team Name (e.g. PV Team)", type: "text", required: true },
        { key: "teamCode", label: "Member Directory Team", type: "select", options: [
          { value: '', label: 'Use existing team mapping' },
          { value: 'pv', label: 'Solar PV' }, { value: 'ai', label: 'Artificial Intelligence' },
          { value: 'dr_uc', label: 'Demand Response & Unit Commitment' }, { value: 'wind', label: 'Wind Energy' },
          { value: 'smartgrid', label: 'Smart Grid' }, { value: 'ev', label: 'Electric Vehicle' },
          { value: 'hydrogen', label: 'Hydrogen' }, { value: 'bess', label: 'Battery Energy Storage' }
        ] },
        { key: "leader", label: "Leader Name (e.g. Bui Quang Minh)", type: "text", required: true },
        { key: "icon", label: "FontAwesome Icon (e.g. fa-solar-panel, fa-wind, fa-atom)", type: "text", defaultValue: "fa-atom" },
        { key: "heroImage", label: "Banner Image URL / Upload", type: "image", required: true },
        { key: "summary", label: "Summary & Objectives", type: "textarea", required: true },
        { key: "vision", label: "Research Vision", type: "textarea" },
        { key: "topics", label: "Core Topics (one per line)", type: "multiline_list", required: true },
        { key: "conducted", label: "Research & Experience", type: "textarea" },
        { key: "futureDirections", label: "Future Directions", type: "textarea" }
      ],
      renderItem(item) {
        const topics = Array.isArray(item.topics) ? item.topics : (typeof item.topics === 'string' ? item.topics.split('\n').filter(Boolean) : []);
        const memberTeam = item.teamCode || {
          solar: 'pv', wind: 'wind', 'unit-commitment-demand-response': 'dr_uc',
          'smart-grid': 'smartgrid', 'electric-vehicle': 'ev', hydrogen: 'hydrogen', bess: 'bess', ai: 'ai'
        }[item.slug || item.id];
        return `
          <article class="research-card" data-id="${item.id}">
            <div class="research-card-img-wrap">
              <img src="${item.heroImage || 'assets/images/banner_pv.jpg'}" alt="${item.title}" class="research-card-thumb" onerror="this.src='assets/images/banner_pv.jpg'">
              <div class="research-card-badge"><i class="fa-solid ${item.icon || 'fa-atom'}"></i> ${item.team || item.title}</div>
            </div>
            <div class="research-card-body">
              <h3 class="research-card-title">${item.title}</h3>
              <div class="research-card-leader" style="font-size: 0.85rem; color: #16a34a; font-weight: 600; margin-bottom: 8px;">Leader: ${item.leader || 'Assoc. Prof. Nguyen Duc Tuyen'}</div>
              <p class="research-card-desc" style="font-size: 0.88rem; color: #64748b; line-height: 1.5; margin-bottom: 12px;">${item.summary || ''}</p>
              ${topics.length ? `
                <div style="font-size: 0.82rem; font-weight: 700; color: #0f172a; text-transform: uppercase; margin-bottom: 6px;">Core Topics:</div>
                <ul class="research-topics-list" style="margin-bottom: 14px;">
                  ${topics.slice(0, 4).map(t => `<li><i class="fa-solid fa-check"></i> <span>${t}</span></li>`).join('')}
                </ul>
              ` : ''}
              ${item.futureDirections ? `
                <div style="margin-top: auto; padding-top: 10px; border-top: 1px dashed #e2e8f0; font-size: 0.82rem; color: #64748b; margin-bottom: 12px;">
                  <strong>Future Direction:</strong> ${item.futureDirections}
                </div>
              ` : ''}
              <div class="pv-form-actions"><a class="pv-button" href="research-team.html?team=${encodeURIComponent(item.id)}">Explore Research <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
              ${memberTeam ? `<a class="pv-button secondary" href="members.html#team-${memberTeam}">Members</a>` : ''}</div>
              ${getAdminCardButtons('researchAreas', item.id)}
            </div>
          </article>
        `;
      }
    },

    projects: {
      name: "Research Project",
      plural: "Research Projects",
      containerId: "projectsContainer",
      fields: [
        { key: "title", label: "Project Title", type: "text", required: true },
        { key: "period", label: "Implementation Period (e.g. 2023 - 2025)", type: "text", required: true },
        { key: "org", label: "Client / Funding Organization (e.g. GIZ / MOET / EVN)", type: "text", required: true },
        { key: "desc", label: "Project Summary & Scope", type: "textarea", required: true },
        { key: "tags", label: "Key Tags (comma-separated, e.g. Smart Grid, Microgrid, GIZ)", type: "tags" }
      ],
      renderItem(item) {
        const tags = Array.isArray(item.tags) ? item.tags : (typeof item.tags === 'string' ? item.tags.split(',').map(s => s.trim()).filter(Boolean) : []);
        return `
          <article class="project-card" data-id="${item.id}" style="background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #16a34a; padding: 24px; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px;">
              <span style="display: inline-block; background: #f0fdf4; color: #16a34a; font-size: 0.78rem; font-weight: 700; padding: 3px 10px; border: 1px solid #bbf7d0;">${item.period}</span>
              <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">${item.org || item.client || ''}</span>
            </div>
            <h3 style="font-family: 'Oswald', sans-serif; font-size: 1.35rem; color: #0f172a; margin-bottom: 8px;">${item.title}</h3>
            <p style="font-size: 0.9rem; color: #475569; line-height: 1.6; margin-bottom: 16px; flex-grow: 1;">${item.desc || ''}</p>
            ${tags.length ? `
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;">
                ${tags.map(t => `<span style="background: #f1f5f9; color: #334155; font-size: 0.75rem; padding: 2px 8px; font-weight: 600;">#${t}</span>`).join('')}
              </div>
            ` : ''}
            ${getAdminCardButtons('projects', item.id)}
          </article>
        `;
      }
    },

    publications: {
      name: "Publication",
      plural: "Publications",
      containerId: "pubListContainer",
      fields: [
        { key: "title", label: "Paper Title", type: "text", required: true },
        { key: "authors", label: "Authors (e.g. Nguyen Duc Tuyen, Bui Quang Minh, et al.)", type: "text", required: true },
        { key: "venue", label: "Journal / Conference Venue", type: "text", required: true },
        { key: "year", label: "Publication Year (e.g. 2024)", type: "text", required: true },
        { key: "category", label: "Category", type: "select", options: ["international-journal", "domestic-journal", "conference", "book-chapter", "invited-talk"], required: true },
        { key: "doi", label: "DOI / Paper Link (e.g. 10.1016/j.renene.2023.123456)", type: "text" },
        { key: "url", label: "Google Scholar / Publisher URL", type: "text" },
        { key: "citations", label: "Citations Count", type: "text" }
      ],
      renderItem(item) {
        const catName = item.category === 'international-journal' ? 'International Journal' :
                        item.category === 'domestic-journal' ? 'Domestic Journal' :
                        item.category === 'conference' ? 'Conference' :
                        item.category === 'book-chapter' ? 'Book Chapter' : 'Invited Talk';
        return `
          <article class="pub-item" data-id="${item.id}" data-category="${item.category || 'international-journal'}">
            <div class="pub-meta-top">
              <span class="pub-badge-category">${catName}</span>
              <span class="pub-year"><i class="fa-regular fa-calendar"></i> ${item.year || ''}</span>
            </div>
            <h3 class="pub-title">${item.title}</h3>
            <div class="pub-authors"><strong>Authors:</strong> ${item.authors}</div>
            <div class="pub-venue"><strong>Venue:</strong> ${item.venue || item.journal || ''}</div>
            <div class="pub-links">
              ${item.doi ? `<a href="${item.doi.startsWith('http') ? item.doi : 'https://doi.org/' + item.doi}" target="_blank" rel="noopener noreferrer" class="pub-link-btn"><i class="fa-solid fa-link"></i> DOI: ${item.doi}</a>` : ''}
              <button class="pub-link-btn" type="button" onclick="navigator.clipboard.writeText('${(item.authors || '').replace(/'/g, "\\'")} (${item.year}). ${(item.title || '').replace(/'/g, "\\'")}. ${(item.venue || item.journal || '').replace(/'/g, "\\'")}.'); if (typeof showToast === 'function') { showToast('APA citation copied to clipboard.'); } else { alert('Citation copied to clipboard!'); }">
                <i class="fa-regular fa-copy"></i> Copy Citation
              </button>
            </div>
            ${getAdminCardButtons('publications', item.id)}
          </article>
        `;
      }
    },

    photos: {
      name: "Photo",
      plural: "Photos",
      containerId: "galleryGrid",
      fields: [
        { key: "title", label: "Photo Title", type: "text", required: true },
        { key: "caption", label: "Caption / Description", type: "textarea", required: true },
        { key: "category", label: "Category (e.g. teams, visits, conferences)", type: "select", options: ["teams", "visits", "conferences"], required: true },
        { key: "image", label: "Photo URL / Upload", type: "image", required: true }
      ],
      renderItem(item) {
        return `
          <div class="gallery-item" data-id="${item.id}" data-category="${item.category || 'teams'}" style="position: relative;" onclick="if(typeof openLightbox==='function') openLightbox('${item.image || 'assets/images/logo.jpg'}', '${(item.caption || item.title || '').replace(/'/g, "\\'")}')">
            <img src="${item.image || 'assets/images/logo.jpg'}" alt="${item.title}" class="gallery-img" onerror="this.src='assets/images/logo.jpg'">
            <div class="gallery-caption-overlay">${item.title}</div>
            <div class="universal-admin-card-actions" style="position: absolute; bottom: 8px; right: 8px; z-index: 10;" onclick="event.stopPropagation()">
              <button type="button" class="btn-crud-edit" style="padding: 4px 8px; font-size: 0.725rem;" onclick="window.AdminCRUD.openModal('photos', '${item.id}')">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="btn-crud-delete" style="padding: 4px 8px; font-size: 0.725rem;" onclick="window.AdminCRUD.confirmDelete('photos', '${item.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      }
    },

    featuredAlumni: {
      name: "Featured Alumnus",
      plural: "Featured Alumni Profiles",
      containerId: "featuredAlumniContainer",
      fields: [
        { key: "name", label: "Full Name", type: "text", required: true },
        { key: "labPeriod", label: "Lab Period (e.g. 2/2019 – 8/2022)", type: "text", required: true },
        { key: "formerRole", label: "Former Lab Role (e.g. Former PV Lead and Lab Lead)", type: "text", required: true },
        { key: "currentPos", label: "Current Position (e.g. PhD student @ Virginia Tech)", type: "text", required: true },
        { key: "teamCode", label: "Research Team", type: "select", options: [
          { value: "all", label: "All / General" },
          { value: "pv", label: "PV Team" },
          { value: "dr_uc", label: "Unit Commitment & DR" },
          { value: "wind", label: "Wind Team" },
          { value: "smartgrid", label: "Smart Grid Team" },
          { value: "ev", label: "Electric Vehicle Team" },
          { value: "hydrogen", label: "Hydrogen Team" },
          { value: "bess", label: "BESS Team" },
          { value: "ai", label: "AI Team" }
        ], defaultValue: "all" },
        { key: "image", label: "Profile Photo URL / Upload", type: "image", required: true },
        { key: "email", label: "Email Address", type: "text" },
        { key: "phone", label: "Phone Number", type: "text" },
        { key: "achievements", label: "Achievements & Awards (one per line)", type: "multiline_list" },
        { key: "bio", label: "Biography & Lab Contributions", type: "textarea", required: true }
      ],
      renderItem(item) {
        const achs = Array.isArray(item.achievements) ? item.achievements : (typeof item.achievements === 'string' ? item.achievements.split('\n').filter(Boolean) : []);
        return `
          <article class="alumni-card" data-id="${item.id}">
            <div class="alumni-card-top">
              <div class="alumni-avatar-wrap">
                <img src="${item.image || 'assets/images/logo.jpg'}" alt="${item.name}" class="alumni-avatar" onerror="this.src='assets/images/logo.jpg'">
              </div>
              <div class="alumni-info-header">
                <span class="alumni-period"><i class="fa-regular fa-calendar"></i> ${item.labPeriod || ''}</span>
                <h3 class="alumni-name">${item.name}</h3>
                <div class="alumni-role">${item.formerRole || ''}</div>
                <div class="alumni-pos"><i class="fa-solid fa-briefcase"></i> ${item.currentPos || ''}</div>
              </div>
            </div>
            <div class="alumni-card-body">
              ${achs.length ? `
                <div>
                  <h4 class="alumni-achievements-title"><i class="fa-solid fa-award"></i> Achievements</h4>
                  <ul class="alumni-achievements-list">
                    ${achs.map(ach => `<li><i class="fa-solid fa-check"></i><span>${ach}</span></li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              <p style="font-size: 0.88rem; color: #475569; line-height: 1.55; margin-top: 4px;">${item.bio || ''}</p>
              <div class="alumni-contacts">
                ${item.email ? `<div class="alumni-contact-item"><i class="fa-solid fa-envelope" style="color:#16a34a;"></i> <span>Email: <a href="mailto:${item.email}">${item.email}</a></span></div>` : ''}
                ${item.phone ? `<div class="alumni-contact-item"><i class="fa-solid fa-phone" style="color:#16a34a;"></i> <span>Phone: <a href="tel:${item.phone.replace(/[^0-9+]/g, '')}">${item.phone}</a></span></div>` : ''}
              </div>
              ${getAdminCardButtons('featuredAlumni', item.id)}
            </div>
          </article>
        `;
      }
    },

    teamAlumni: {
      name: "Team Alumnus",
      plural: "Team Alumni Members",
      containerId: "teamAlumniContainer",
      fields: [
        { key: "name", label: "Full Name", type: "text", required: true },
        { key: "team", label: "Display Team Name (e.g. PV Team)", type: "text", required: true },
        { key: "teamCode", label: "Filter Team Category", type: "select", options: [
          { value: "pv", label: "PV Team" },
          { value: "dr_uc", label: "Unit Commitment" },
          { value: "wind", label: "Wind Team" },
          { value: "smartgrid", label: "Smart Grid" },
          { value: "ev", label: "Electric Vehicle" },
          { value: "hydrogen", label: "Hydrogen Team" },
          { value: "bess", label: "BESS Team" },
          { value: "ai", label: "AI Team" },
          { value: "all", label: "Other / All" }
        ], required: true },
        { key: "image", label: "Avatar Photo URL / Upload", type: "image", required: true }
      ],
      renderItem(item) {
        return `
          <div class="team-alumnus-card" data-id="${item.id}">
            <div class="team-alumnus-avatar-wrap">
              <img src="${item.image || 'assets/images/logo.jpg'}" alt="${item.name}" class="team-alumnus-avatar" onerror="this.src='assets/images/logo.jpg'">
            </div>
            <h4 class="team-alumnus-name">${item.name}</h4>
            <span class="team-alumnus-team">${item.team || ''}</span>
            ${getAdminCardButtons('teamAlumni', item.id)}
          </div>
        `;
      }
    }
  };

  function getAdminCardButtons(collectionKey, itemId) {
    return `
      <div class="universal-admin-card-actions">
        <button type="button" class="btn-crud-edit" onclick="window.AdminCRUD.openModal('${collectionKey}', '${itemId}')">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button type="button" class="btn-crud-delete" onclick="window.AdminCRUD.confirmDelete('${collectionKey}', '${itemId}')">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </div>
    `;
  }

  // 3. Admin CRUD Interface Controller
  const AdminCRUD = {
    activeCollection: null,
    editingItemId: null,
    getAdminCardButtons: getAdminCardButtons,

    init() {
      this.injectStyles();
      this.injectModal();
      this.renderCurrentPage();

      // Listen for data updates
      window.addEventListener('100re_data_updated', () => {
        this.renderCurrentPage();
      });

      // Observe class changes on body to toggle admin buttons
      const observer = new MutationObserver(() => {
        this.updateAdminBars();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

      // Run on DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.renderCurrentPage());
      } else {
        this.renderCurrentPage();
      }
    },

    injectStyles() {
      if (document.getElementById('universalCrudStyles')) return;
      const style = document.createElement('style');
      style.id = 'universalCrudStyles';
      style.textContent = `
        /* Universal Admin Action Bar */
        .universal-admin-bar {
          display: none;
          align-items: center;
          justify-content: space-between;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-left: 4px solid #16a34a;
          padding: 12px 20px;
          margin-bottom: 28px;
          box-shadow: var(--shadow-sm);
        }
        body.admin-mode .universal-admin-bar {
          display: flex;
        }
        .btn-universal-add {
          background: #16a34a;
          color: #ffffff !important;
          border: 1px solid #15803d;
          padding: 8px 18px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 0px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.2);
        }
        .btn-universal-add:hover {
          background: #15803d;
          transform: translateY(-1px);
          box-shadow: 0 4px 10px rgba(22, 163, 74, 0.3);
        }

        /* Card Admin Actions */
        .universal-admin-card-actions {
          display: none;
          align-items: center;
          gap: 8px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #f1f5f9;
        }
        body.admin-mode .universal-admin-card-actions {
          display: flex;
        }
        .btn-crud-edit, .btn-crud-delete {
          flex: 1;
          padding: 6px 12px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border: 1px solid transparent;
          transition: all 0.15s ease;
          border-radius: 0px;
        }
        .btn-crud-edit {
          background: #f8fafc;
          color: #1e293b;
          border-color: #cbd5e1;
        }
        .btn-crud-edit:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
        .btn-crud-delete {
          background: #fef2f2;
          color: #dc2626;
          border-color: #fecaca;
        }
        .btn-crud-delete:hover {
          background: #fee2e2;
          color: #b91c1c;
        }

        /* Universal Modal Dialog */
        .universal-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 5000;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeInBackdrop 0.2s ease-out;
        }
        .universal-modal-backdrop.show {
          display: flex;
        }
        .universal-modal-window {
          background: #ffffff;
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid #cbd5e1;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          animation: scaleInModal 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes scaleInModal {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .universal-modal-header {
          padding: 16px 24px;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .universal-modal-title {
          font-family: 'Oswald', sans-serif;
          font-size: 1.4rem;
          color: #0f172a;
          margin: 0;
        }
        .universal-modal-close {
          background: transparent;
          border: none;
          font-size: 1.4rem;
          color: #64748b;
          cursor: pointer;
          padding: 4px;
          line-height: 1;
        }
        .universal-modal-close:hover {
          color: #0f172a;
        }
        .universal-modal-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .crud-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .crud-form-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        .crud-form-input, .crud-form-textarea, .crud-form-select {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid #cbd5e1;
          font-family: 'Inter', sans-serif;
          font-size: 0.92rem;
          color: #1e293b;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .crud-form-input:focus, .crud-form-textarea:focus, .crud-form-select:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.15);
        }
        .crud-form-textarea {
          min-height: 85px;
          resize: vertical;
        }
        .universal-modal-footer {
          padding: 16px 24px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
      `;
      document.head.appendChild(style);
    },

    injectModal() {
      if (document.getElementById('universalCrudModal')) return;
      const modal = document.createElement('div');
      modal.id = 'universalCrudModal';
      modal.className = 'universal-modal-backdrop';
      modal.innerHTML = `
        <div class="universal-modal-window">
          <div class="universal-modal-header">
            <h3 class="universal-modal-title" id="crudModalTitle">Edit Item</h3>
            <button type="button" class="universal-modal-close" onclick="window.AdminCRUD.closeModal()">&times;</button>
          </div>
          <form id="crudModalForm" onsubmit="window.AdminCRUD.handleFormSubmit(event)">
            <div class="universal-modal-body" id="crudModalFields">
              <!-- Form fields injected dynamically -->
            </div>
            <div class="universal-modal-footer">
              <button type="button" class="btn-crud-edit" style="flex: initial; padding: 8px 18px;" onclick="window.AdminCRUD.closeModal()">Cancel</button>
              <button type="submit" class="btn-universal-add" style="flex: initial; padding: 8px 22px;">
                <i class="fa-solid fa-floppy-disk"></i> Save Changes
              </button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(modal);
    },

    renderCurrentPage() {
      if (typeof window.renderAllAlumni === 'function' && (document.getElementById('featuredAlumniContainer') || document.getElementById('teamAlumniContainer'))) {
        window.renderAllAlumni();
        const featCont = document.getElementById('featuredAlumniContainer');
        if (featCont && SCHEMAS.featuredAlumni) this.injectPageAdminBar('featuredAlumni', SCHEMAS.featuredAlumni, featCont);
        const teamCont = document.getElementById('teamAlumniContainer');
        if (teamCont && SCHEMAS.teamAlumni) this.injectPageAdminBar('teamAlumni', SCHEMAS.teamAlumni, teamCont);
        this.updateAdminBars();
        return;
      }

      for (const [key, schema] of Object.entries(SCHEMAS)) {
        const container = document.getElementById(schema.containerId);
        if (container) {
          this.activeCollection = key;
          if (key === 'publications' && typeof window.renderPublications === 'function') {
            window.renderPublications();
          } else {
            const items = DataManager.get(key);
            container.innerHTML = items.map(item => schema.renderItem(item)).join('');
          }
          this.injectPageAdminBar(key, schema, container);
        }
      }
      this.updateAdminBars();
    },

    injectPageAdminBar(key, schema, container) {
      let bar = document.getElementById('adminBar_' + key);
      if (!bar) {
        bar = document.createElement('div');
        bar.id = 'adminBar_' + key;
        bar.className = 'universal-admin-bar';
        bar.innerHTML = `
          <div>
            <strong style="color:#15803d; font-size: 0.95rem;"><i class="fa-solid fa-shield-halved"></i> Admin Mode Active</strong>
            <div style="font-size: 0.8rem; color:#475569;">You can add, modify or remove ${schema.plural.toLowerCase()} on this page.</div>
          </div>
          <button type="button" class="btn-universal-add" onclick="window.AdminCRUD.openModal('${key}')">
            <i class="fa-solid fa-plus"></i> Add New ${schema.name}
          </button>
        `;
        const parent = container.parentNode;
        const pubBar = parent.querySelector('.pub-control-bar') || parent.querySelector('.filter-pills');
        if (pubBar) {
          parent.insertBefore(bar, pubBar);
        } else {
          parent.insertBefore(bar, container);
        }
      }
    },

    hasEditRights() {
      const token = localStorage.getItem('100re_token');
      const isAdmin = localStorage.getItem('100re_is_admin') === 'true';
      const role = (localStorage.getItem('100re_user_role') || '').toLowerCase();
      const user = (localStorage.getItem('100re_logged_username') || '').toLowerCase();
      if (!token && !document.body.classList.contains('admin-mode')) {
        return false;
      }
      if (isAdmin || role === 'admin' || role === 'supervisor' || role === 'team_leader' || role === 'teamleader') {
        return true;
      }
      if (user === '100re' || user === 'admin' || user === 'supervisor' || user.includes('leader') || user.includes('tuyen')) {
        return true;
      }
      return document.body.classList.contains('admin-mode');
    },

    updateAdminBars() {
      const isAuth = this.hasEditRights();
      const bars = document.querySelectorAll('.universal-admin-bar, .alumni-admin-bar');
      bars.forEach(b => {
        b.style.display = isAuth ? 'flex' : 'none';
      });
      const cardActions = document.querySelectorAll('.universal-admin-card-actions, .alumni-card-actions');
      cardActions.forEach(a => {
        a.style.display = isAuth ? 'flex' : 'none';
      });
      const addBtns = document.querySelectorAll('.alumni-admin-btn');
      addBtns.forEach(btn => {
        btn.style.display = isAuth ? 'inline-flex' : 'none';
      });
    },

    openModal(collectionKey, itemId = null) {
      const schema = SCHEMAS[collectionKey];
      if (!schema) return;
      this.activeCollection = collectionKey;
      this.editingItemId = itemId;

      const items = DataManager.get(collectionKey);
      const existing = itemId ? items.find(i => String(i.id) === String(itemId)) : null;

      const titleEl = document.getElementById('crudModalTitle');
      if (titleEl) {
        titleEl.textContent = itemId ? `Edit ${schema.name}` : `Add New ${schema.name}`;
      }

      const fieldsContainer = document.getElementById('crudModalFields');
      if (fieldsContainer) {
        fieldsContainer.innerHTML = schema.fields.map(f => {
          let val = existing ? (existing[f.key] !== undefined ? existing[f.key] : '') : (f.defaultValue || '');
          if (f.type === 'multiline_list' && Array.isArray(val)) {
            val = val.join('\n');
          } else if (f.type === 'tags' && Array.isArray(val)) {
            val = val.join(', ');
          }

          if (f.type === 'textarea' || f.type === 'multiline_list') {
            return `
              <div class="crud-form-group">
                <label class="crud-form-label">${f.label} ${f.required ? '<span style="color:#ef4444;">*</span>' : ''}</label>
                <textarea class="crud-form-textarea" name="${f.key}" ${f.required ? 'required' : ''}>${val}</textarea>
              </div>
            `;
          } else if (f.type === 'select') {
            return `
              <div class="crud-form-group">
                <label class="crud-form-label">${f.label} ${f.required ? '<span style="color:#ef4444;">*</span>' : ''}</label>
                <select class="crud-form-select" name="${f.key}">
                  ${(f.options || []).map(opt => {
                    const optVal = typeof opt === 'object' ? opt.value : opt;
                    const optLabel = typeof opt === 'object' ? opt.label : opt;
                    return `<option value="${optVal}" ${val === optVal ? 'selected' : ''}>${optLabel}</option>`;
                  }).join('')}
                </select>
              </div>
            `;
          } else if (f.type === 'image') {
            return `
              <div class="crud-form-group">
                <label class="crud-form-label">${f.label} ${f.required ? '<span style="color:#ef4444;">*</span>' : ''}</label>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input type="text" class="crud-form-input" name="${f.key}" id="inputImage_${f.key}" value="${val}" placeholder="assets/images/... or https://..." ${f.required ? 'required' : ''}>
                  <label class="btn-crud-edit" style="cursor: pointer; white-space: nowrap; flex: initial; padding: 9px 12px;">
                    <i class="fa-solid fa-upload"></i> Upload
                    <input type="file" accept="image/*" style="display: none;" onchange="window.AdminCRUD.handleImageUpload(event, 'inputImage_${f.key}')">
                  </label>
                </div>
              </div>
            `;
          } else {
            return `
              <div class="crud-form-group">
                <label class="crud-form-label">${f.label} ${f.required ? '<span style="color:#ef4444;">*</span>' : ''}</label>
                <input type="${f.type || 'text'}" class="crud-form-input" name="${f.key}" value="${val}" ${f.required ? 'required' : ''}>
              </div>
            `;
          }
        }).join('');
      }

      const modal = document.getElementById('universalCrudModal');
      if (modal) modal.classList.add('show');
    },

    handleImageUpload(event, targetInputId) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const input = document.getElementById(targetInputId);
        if (input) input.value = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    closeModal() {
      const modal = document.getElementById('universalCrudModal');
      if (modal) modal.classList.remove('show');
      this.editingItemId = null;
    },

    async handleFormSubmit(event) {
      event.preventDefault();
      const schema = SCHEMAS[this.activeCollection];
      if (!schema) return;

      const formData = new FormData(event.target);
      const dataObj = {};

      schema.fields.forEach(f => {
        let val = formData.get(f.key) || '';
        if (f.type === 'multiline_list') {
          dataObj[f.key] = val.split('\n').map(s => s.trim()).filter(Boolean);
        } else if (f.type === 'tags') {
          dataObj[f.key] = val.split(',').map(s => s.trim()).filter(Boolean);
        } else {
          dataObj[f.key] = val;
        }
      });

      try {
        if (this.editingItemId) {
          await DataManager.update(this.activeCollection, this.editingItemId, dataObj);
        } else {
          await DataManager.add(this.activeCollection, dataObj);
        }
      } catch (error) {
        this.notify(error.message, true);
        return;
      }

      this.notify('Changes saved.');
      this.closeModal();
      this.renderCurrentPage();
    },

        async confirmDelete(collectionKey, itemId) {
      const schema = SCHEMAS[collectionKey];
      if (!schema) return;

      const collTitles = {
        'photos': 'Gallery Photo',
        'projects': 'Research Project',
        'news': 'News Article',
        'publications': 'Publication',
        'journey': 'Journey Entry',
        'research': 'Research Direction',
        'collaborations': 'Collaborator',
        'lab_equipment': 'Lab Equipment',
        'fund_raise': 'Funding Contribution',
        'featuredAlumni': 'Featured Alumni Profile',
        'teamAlumni': 'Team Alumni'
      };
        const itemName = collTitles[collectionKey] || schema.name || 'item';

      let isConfirmed = false;
      if (typeof window.showConfirmModal === 'function') {
        isConfirmed = await window.showConfirmModal({
          title: `Confirm Deletion ${itemName}`,
          message: `Permanently delete this ${itemName.toLowerCase()}? This cannot be undone.`,
          confirmText: 'Delete Permanently',
          cancelText: 'Cancel',
          type: 'danger'
        });
      } else {
        isConfirmed = true;
      }

      if (isConfirmed) {
        try {
          await DataManager.remove(collectionKey, itemId);
        } catch (error) {
          this.notify(error.message, true);
          return;
        }
        this.notify(`The ${itemName.toLowerCase()} has been deleted.`);
        this.renderCurrentPage();
      }
    },

    notify(message, isError = false) {
      const toastContainer = document.getElementById('toastContainer');
      if (!toastContainer) {
        alert(message);
        return;
      }
      const toast = document.createElement('div');
      toast.className = `toast ${isError ? 'error' : ''}`;
      toast.innerHTML = `
        <i class="fa-solid ${isError ? 'fa-triangle-exclamation' : 'fa-circle-check'}"></i>
        <span></span>
      `;
      toast.querySelector('span').textContent = message;
      toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    }
  };

  window.AdminCRUD = AdminCRUD;

  // Auto initialize Admin CRUD on page load
  AdminCRUD.init();

})();
