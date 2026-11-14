# Public website structure

The public navigation has seven primary destinations. Workspace code, permissions,
storage and authentication remain outside this change.

| Navigation | Entry page | Content |
| --- | --- | --- |
| About Lab | `index.html` | Home, introduction, goals and contact |
| Publications | `publications.html` | Academic publications |
| Research Teams | `research-areas.html` | Eight teams, research details, members, supervisors and alumni; projects and research experiences remain accessible here |
| News & Activities | `news.html` | News, Journey and photo gallery |
| Collaborators & Funding | `collaborations.html` | Academic/industry collaborators, project funding links and lab support |
| Operational Systems | `mini-scada.html` | SCADA preview, equipment/testbeds and useful links |
| How to Join Us | `join-us.html` | Choose a team, prepare CV/letter, email application |

## Research team fields

Each team now has a separate research presentation page at
`research-team.html?team=<research ID>`, reachable from both the team directory
and the corresponding group on the member page. The directory remains a summary.
Detailed profiles use the public collection `researchTeamProfiles`, with independent
records for the eight teams. Fields cover overview, research context/objectives,
current directions, methods/tools, results/applications, future directions, links,
and captioned research images. Existing research data seeds the initial sections;
editors can expand them and upload images without inventing missing research facts.
The profile editor shares the verified content/photo saving flow with the PV pages.

Keep research content in the existing `researchAreas` collection for compatibility.
Each entry uses `id`, `slug`, `teamCode`, `title`, `team`, `leader`, `icon`,
`heroImage`, `summary`, `vision`, `topics`, `conducted`, and `futureDirections`.
The public editor exposes the directory team, vision and research experience.

`teamCode` links an entry to existing member records and member-page anchors:

| Team | Member code | Existing research ID |
| --- | --- | --- |
| Solar PV | `pv` | `solar` |
| Artificial Intelligence | `ai` | `ai` |
| Demand Response & Unit Commitment | `dr_uc` | `unit-commitment-demand-response` |
| Wind Energy | `wind` | `wind` |
| Smart Grid | `smartgrid` | `smart-grid` |
| Electric Vehicle | `ev` | `electric-vehicle` |
| Hydrogen | `hydrogen` | `hydrogen` |
| Battery Energy Storage | `bess` | `bess` |

Existing records without `teamCode` retain their ID-based mapping. Members remain
in their existing public member source; no duplicate member dataset is created.
Demand Response and Unit Commitment form one team, making eight teams in total.

## Maintenance

Edit `scripts/build_public_navigation.py`, then run:

```powershell
python scripts/build_public_navigation.py
```

Navigation is generated directly into all public HTML pages, including active
states, so links are available before JavaScript loads. Dropdown buttons and
primary links are separate: visitors can open a section directly or expand it.
Existing page URLs remain available.

The systems page has two separate tabs, `#scada-pv` and `#digital-twin-pv`.
Each profile is stored under its own key (`scada`, `digitalTwin`) in the existing
public content collection `pvSystems`. Fields are `title`, `overview`, `location`,
`capacity`, `systemUrl`, `architecture`, `features`, `specifications`, and `photos`.
Photos store a compressed JPEG data URL and caption in this collection, so they
persist using the existing local JSON storage or Cloudflare KV without requiring
a separate photo service. Each system accepts up to eight images; uploads are
limited to JPG, PNG and WebP, up to 10 MB each, resized to at most 1600 pixels.

Logged-in editors can update the profile, choose files or use the device camera,
edit captions, remove images and save or cancel on the same page. Saving requires
server confirmation; failed requests retain the draft. Camera capture depends on
device/browser support; desktop browsers can select existing photos instead.
The page no longer generates simulated telemetry. Actual system descriptions,
installation photos and operational URLs should be entered by the lab editor.
The application email is taken from the existing website:
`tuyen.nguyenduc@hust.edu.vn`. No new selection stages or response times are asserted.
