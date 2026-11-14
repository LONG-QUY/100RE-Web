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
| Digital Systems & SCADA | `mini-scada.html` | SCADA preview, equipment/testbeds and useful links |
| How to Join Us | `join-us.html` | Choose a team, prepare CV/letter, email application |

## Research team fields

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

The SCADA preview currently generates random demo values. It is labelled as a
simulation. Actual operational system URLs and live-data connections still need
to be provided before a public operational system directory can be populated.
The application email is taken from the existing website:
`tuyen.nguyenduc@hust.edu.vn`. No new selection stages or response times are asserted.
