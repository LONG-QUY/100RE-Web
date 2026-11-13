import { readSession } from './session.js';

/**
 * 100RE LAB WORKSPACE — Authentication & Identity Resolution
 * Supports Cloudflare Access headers in production, Admin Sessions, and Dev Auth Switcher.
 */

export async function resolveUser(request, env, db) {
  let email = request.headers.get('cf-access-authenticated-user-email');
  const devUserHeader = request.headers.get('x-dev-user-id') || request.headers.get('x-dev-user-email') || request.headers.get('x-logged-user');
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();

  const session = token ? await readSession(env?.MEMBERS_KV, `session_${token}`) : null;
  if (token && !session) return { user: null, isAuthenticated: false };

  // 1. Check Dev User Header (Highest Priority for explicit user role switching & local preview)
  if (!session && devUserHeader) {
    const rawVal = devUserHeader.toLowerCase().trim();
    const normalized = rawVal.replace(/@100relab(\.hust\.edu\.vn)?$/, '');

    // Check Super Admin
    if (rawVal === '100re' || rawVal === 'usr-admin-01' || normalized === '100re') {
      return {
        user: {
          id: 'usr-admin-01',
          email: 'admin@100relab.hust.edu.vn',
          display_name: 'System Admin (100RE)',
          name: 'System Admin (100RE)',
          username: '100re',
          role: 'admin',
          isSupervisor: true,
          isLeader: true,
          isSystemAdmin: true,
          status: 'active',
          avatar_url: 'assets/images/logo.jpg',
          teams: ['team-pv', 'team-wind', 'team-hydrogen', 'team-smartgrid', 'team-ev', 'team-ai', 'team-bess', 'team-ucdr'],
          projects: [],
          teamRoles: {},
          permissions: ['perm_ws_admin', 'perm_news', 'perm_journey', 'perm_research', 'perm_projects', 'perm_pubs', 'perm_photos', 'perm_members', 'perm_ws_all_teams', 'perm_ws_projects', 'perm_ws_tasks_create', 'perm_ws_tasks_update', 'perm_ws_scinote_edit', 'perm_ws_scinote_signoff', 'perm_ws_datasets', 'perm_ws_documents']
        },
        isAuthenticated: true
      };
    }

    // Check Duong Minh Hai
    if (rawVal === 'hai.duongminh@100relab' || rawVal === 'hai.duongminh' || rawVal === 'usr-res-05' || normalized === 'hai.duongminh') {
      return {
        user: {
          id: 'usr-res-05',
          email: 'hai.duongminh@100relab',
          display_name: 'Duong Minh Hai',
          name: 'Duong Minh Hai',
          username: 'hai.duongminh@100relab',
          role: 'researcher',
          isSupervisor: false,
          isLeader: false,
          isSystemAdmin: false,
          status: 'active',
          avatar_url: 'assets/images/duong_minh_hai.png',
          teams: ['team-smartgrid'],
          projects: ['proj-grid-01'],
          teamRoles: { 'team-smartgrid': 'member' },
          permissions: ['perm_news', 'perm_journey', 'perm_research', 'perm_projects', 'perm_pubs', 'perm_photos', 'perm_ws_tasks_update', 'perm_ws_scinote_edit', 'perm_ws_datasets']
        },
        isAuthenticated: true
      };
    }

    // Check by ID in DB
    let u = await db.first('SELECT * FROM users WHERE id = ?', [devUserHeader]);
    if (u) return enrichUser(u, db);

    // Check by Email in DB
    u = await db.first('SELECT * FROM users WHERE email = ?', [rawVal]);
    if (u) return enrichUser(u, db);

    // Check by Email normalized
    u = await db.first('SELECT * FROM users WHERE email = ?', [`${normalized}@100relab`]);
    if (u) return enrichUser(u, db);

    // Check by Member Key in DB
    u = await db.first('SELECT * FROM users WHERE member_key = ?', [rawVal]);
    if (u) return enrichUser(u, db);
  }

  // 2. Check Cloudflare Access authenticated email
  if (!session && email) {
    const u = await db.first('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (u) return enrichUser(u, db);
  }

  if (session) {
    let uTeams = session.teams;
    if (!uTeams || uTeams.length === 0) {
      if (session.team) uTeams = [session.team];
      else uTeams = ['team-smartgrid'];
    }
    return {
      user: {
        id: session.id || session.userId || 'usr-smartgrid-1788108587815',
        name: session.display_name || session.name || session.username,
        display_name: session.display_name || session.name || session.username,
        username: session.username,
        email: session.email || `${session.username}@100relab`,
        role: session.role || 'researcher',
        teams: uTeams,
        projects: session.projects || [],
        isSupervisor: session.role === 'supervisor' || session.role === 'admin' || session.username === '100re',
        isLeader: session.role === 'team_leader' || session.role === 'supervisor' || session.role === 'admin',
        isSystemAdmin: session.role === 'admin' || session.username === '100re',
        status: 'active'
      },
      isAuthenticated: true
    };
  }

  // 4. Default fallback: resolve Supervisor
  const defaultUser = await db.first('SELECT * FROM users WHERE role = ? LIMIT 1', ['supervisor']);
  if (defaultUser) return enrichUser(defaultUser, db);

  return {
    user: {
      id: 'usr-sup-01',
      email: 'supervisor@100relab.hust.edu.vn',
      display_name: 'Assoc. Prof. Nguyen Duc Tuyen',
      name: 'Assoc. Prof. Nguyen Duc Tuyen',
      username: 'supervisor',
      role: 'supervisor',
      isSupervisor: true,
      isLeader: true,
      isSystemAdmin: false,
      status: 'active',
      avatar_url: 'assets/images/tuyen_nguyen_duc.jpg',
      teams: ['team-pv', 'team-wind', 'team-hydrogen', 'team-smartgrid', 'team-ev', 'team-ai', 'team-bess', 'team-ucdr'],
      projects: [],
      teamRoles: {},
      permissions: ['perm_ws_admin', 'perm_news', 'perm_journey', 'perm_research', 'perm_projects', 'perm_pubs', 'perm_photos', 'perm_members', 'perm_ws_all_teams', 'perm_ws_projects', 'perm_ws_tasks_create', 'perm_ws_tasks_update', 'perm_ws_scinote_edit', 'perm_ws_scinote_signoff', 'perm_ws_datasets', 'perm_ws_documents']
    },
    isAuthenticated: true
  };
}

async function enrichUser(userRow, db) {
  if (!userRow || userRow.status !== 'active') {
    return { user: null, isAuthenticated: false };
  }

  const teamMembers = await db.all('SELECT tm.*, t.name as team_name, t.slug as team_slug FROM team_members tm JOIN teams t ON tm.team_id = t.id WHERE tm.user_id = ?', [userRow.id]);
  const projectMembers = await db.all('SELECT pm.*, p.name as project_name FROM project_members pm JOIN projects p ON pm.project_id = p.id WHERE pm.user_id = ?', [userRow.id]);

  const teams = teamMembers.map(tm => tm.team_id);
  const projects = projectMembers.map(pm => pm.project_id);

  return {
    user: {
      ...userRow,
      teams,
      projects,
      teamMembers,
      projectMembers,
      teamRoles: Object.fromEntries(teamMembers.map(tm => [tm.team_id, tm.team_role])),
      isSupervisor: userRow.role === 'supervisor' || userRow.role === 'admin',
      isLeader: userRow.role === 'team_leader' || userRow.role === 'supervisor' || userRow.role === 'admin',
      isSystemAdmin: userRow.role === 'admin'
    },
    isAuthenticated: true
  };
}
