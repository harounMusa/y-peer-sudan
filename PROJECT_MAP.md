# Y-PEER Sudan — Multi-Page Site

## TECH_STACK
- **HTML5** (semantic: header, main, nav, section, footer)
- **Tailwind CSS v3.4.17** (CDN, pinned)
- **Vanilla JS** — `shared.js` (156 LOC) handles header/footer rendering, active page detection, mobile nav toggle, i18n engine (register/t/setLang/toggle), lang persistence, RTL switching
- **Inline SVG** icons + favicon (zero external deps)

## SYSTEM_FLOW
```
User navigates: index.html → who-we-are.html → what-we-do.html → impact.html → contact.html
                        ↕ (shared.js renders header/footer on every page)

Each page: HTTP GET → .html → CDN (tailwindcss, Google Fonts) → shared.js injects header+footer
No build step, no backend. Static hosting only.
```

## ARCHITECTURE
```
Y-peer/
├── index.html           # Home — Hero + What We Do preview + By the Numbers
├── who-we-are.html      # About — story, mission/vision, values (4 cards)
├── what-we-do.html      # Programs — 6 program cards + approach (3-step)
├── impact.html          # Impact — 4 initiatives + impact snapshot
├── contact.html         # Contact — form, email, location, commitment box
├── shared.js            # Shared: header/footer templates, active nav, mobile menu
├── PROJECT_MAP.md       # This file
```

**shared.js (`/shared.js`)**
- Template strings for header (nav with active detection) and footer (3-column: brand, contact, links)
- Logo SVG extracted once, reused in header and footer
- Event delegation for mobile hamburger toggle and menu close on link click
- i18n system: `register()`, `t()`, `setLang()`, `toggle()` — shared translations (nav, footer) + per-page translations registered in each HTML page
- `data-i18n` attribute lookup on switch; meta tags use `content`, other elements use `innerHTML`
- Language persisted via `localStorage`; RTL direction via `document.documentElement.dir`
- Desktop + mobile lang toggle buttons via event delegation (`#lang-toggle`, `#lang-toggle-mobile`)
- No jQuery, no external deps, 0 HTTP requests beyond initial load

**Design decisions:**
- Multi-page static site — each section becomes a dedicated HTML file with extended content
- DRY via shared.js — header/footer written once, rendered on all 5 pages
- Navigation uses page links (`who-we-are.html`) instead of hash anchors (`#who-we-are`)
- Active page detection via `location.pathname` comparison

## VERIFIABLE GOALS — ALL VERIFIED
| # | Goal | Status | Verification |
|---|------|--------|-------------|
| 1 | 5 separate pages exist | ✅ | `index.html`, `who-we-are.html`, `what-we-do.html`, `impact.html`, `contact.html` |
| 2 | shared.js renders header+footer on all pages | ✅ | Each page has `<div id="header">` + `<div id="footer">` + `<script src="shared.js">` |
| 3 | Active nav highlights current page | ✅ | `text-white` vs `text-gray-300 hover:text-white` via `location.pathname` |
| 4 | Mobile hamburger works site-wide | ✅ | Event delegation in shared.js |
| 5 | Extended content on each page | ✅ | See per-file content below |
| 6 | HTML tag balance | ✅ | All 5 files: html 1/1, main 1/1, div balanced, section balanced |
| 7 | No regression — all original content preserved | ✅ | Hero, Who We Are, What We Do, Impact, Contact all present |
| 8 | Arabic/English toggle works site-wide | ✅ | `i18n.toggle()` via `#lang-toggle`/`#lang-toggle-mobile` buttons; per-page translations registered; language persisted in localStorage; RTL/LTR switching |

## PAGE CONTENT SUMMARY
| Page | Sections | Extended content |
|------|----------|-----------------|
| `index.html` | Hero with globe SVG, What We Do preview (4 cards), By the Numbers (4 stats) | Globe v2: 5×5 grid, 3D sphere shading (highlight + edge shadow), refined Africa path with Gulf of Guinea/Horn, improved Sudan shape with orange stroke glow, atmosphere ring. Preview cards, stat snapshot, dual CTAs |
| `who-we-are.html` | Hero, About, Mission & Vision (2 cards), Our Values (4 cards) | Mission/Vision section, Values: Youth Leadership, Inclusion, Safeguarding, Transparency |
| `what-we-do.html` | Hero, Program Areas (6 cards), Our Approach (3-step) | Added Youth Leadership & Peacebuilding cards, Train-Trainer→Outreach→Action pipeline |
| `impact.html` | Hero, Initiatives (4 cards), Impact Snapshot (4 stats) | Added Peer Educator Training & Community Health Outreach initiatives, stat grid |
| `contact.html` | Hero, Contact form, Contact info, Commitment box | Full contact form (name/email/subject/message), expanded info cards, commitment statement |

## ORPHANS & PENDING
**None.** i18n complete — all 5 pages have `data-i18n` attributes on translatable elements, per-page translations registered, shared.js handles meta/content distinction, language persisted. No placeholders, no TODOs, no dead code.
