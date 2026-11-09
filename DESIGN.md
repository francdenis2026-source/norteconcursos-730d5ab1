# Norte Concursos — Design Audit & Redesign Plan

**Baseline reviewed:** `main` at `adcc09a3cc9dc148b72193f7b18b8d90fd4be115`  
**Scope:** public homepage, authenticated student workspace, study tools, contest/edital pages, administration, desktop and mobile.  
**Audit mode:** read-only code and connected-browser inspection. No visual behavior or business logic was changed during this audit.

## 1. Product truth and non-negotiables

The existing `PRODUCT.md` is the source of truth:

- Audience: candidates preparing for public-service examinations, especially public-safety careers.
- Product: questions, mock exams, notices, legislation, study routines and performance in one coherent workspace.
- Brand: Norte Concurso; gold remains the highlight and primary action color.
- Visual constraints: avoid brown and blue-petrol; use a professional visual language appropriate to public-safety education.
- Preserve the homepage introduction video behavior; only its visual treatment may change.
- Preserve existing routes, data, permissions, paid-plan rules, study features and administrative workflows.
- Keep the platform responsive on desktop, tablet and mobile.

**Important correction to the initial proposal:** a petrol/teal-led palette would contradict the committed product brief. The redesign will use a restrained gold + graphite + porcelain/neutral system instead. Green, red and blue-gray may remain only as semantic status colors where meaning requires them; they must not become competing brand accents.

## 2. Audit findings

### P0 — Conflicting visual sources of truth

- `src/styles.css` is approximately 592 KB and contains roughly 171 `:root` occurrences, 527 `.dark` occurrences and 283 `!important` declarations.
- The global stylesheet contains the Porcelain & Gold foundation, but page-level styles add independent palettes and repeated overrides.
- Student styles currently define several competing accent families: blue, cyan/teal, green, violet, rose and amber. `dashboard-light.css` also introduces a violet hue and a blue primary that conflict with the product's gold-first brand commitment.
- `student-overview-v3.css`, `student-saas-dashboard.css`, `student-design-system.css` and `student-home-premium.css` each define overlapping surface, text, accent or theme variables.

**Impact:** a page can look different depending on which route-specific stylesheet wins the cascade. Theme fixes may solve one page and regress another.

### P0 — Homepage CSS cascade is fragmented

`src/routes/index.tsx` imports around 20 homepage-specific stylesheets, including multiple generations of refinement/recomposition files (`home-refinement`, `home-refinements`, `home-layout-fixes`, `home-recomposition`, etc.).

**Impact:** difficult-to-predict cascade order, duplicated rules, fragile responsive fixes and high regression risk when adjusting the homepage.

### P0 — Student workspace has multiple overlapping style layers

`DashboardLayout.tsx` imports separate layers for glass, light mode, canvas, artwork, navigation, design system, mobile navigation, banners, topbar, fullscreen, workspace refresh, SaaS dashboard and premium home styling. The dashboard overview route then imports another five visual layers.

**Impact:** layout, theme and component states are being styled in several places instead of one predictable system.

### P1 — Theme semantics are not consistent

The code uses page-specific hues (including violet, teal, indigo, sky, orange and rose) in addition to semantic success/warning/error colors.

**Impact:** accents compete with the brand and create inconsistent visual meaning across navigation, cards and headings. Semantic colors should communicate state, not act as independent page identities.

### P1 — Navigation and information architecture need a single rule set

The student shell has desktop sidebar navigation, a top navigation, mobile navigation, a command search and route-specific secondary navigation. The connected browser inspection of the PC-AC digital notice showed several navigation layers in the same page.

**Impact:** users can encounter repeated navigation, excess chrome and less room for the actual study content. Each breakpoint needs one deliberate primary navigation pattern and a clear secondary pattern.

### P1 — Brand signatures and editor/development artifacts need production review

The connected page displayed the platform signature, developer imprint and a Lovable editor badge. The first two are rendered by shared root components; the Lovable badge may be injected by the hosting/editor environment and must be verified before changing source code.

**Impact:** brand credits should be intentional, singular and unobtrusive; editor-only UI must never be mistaken for product UI.

### P1 — “One window” must not mean clipping educational content

Dashboard summaries and focused workspaces should use the available viewport efficiently. Long-form legislation, lessons, question explanations and study materials must remain naturally scrollable and readable.

**Rule:** no hidden content, forced clipping or fixed heights that cut off controls. Use compact headers, responsive grids and internal scrolling only when it improves a specific workspace.

## 3. Approved visual direction

### Brand palette

| Role | Direction |
|---|---|
| Primary action / highlight | Restrained Norte gold |
| Main dark surface | Graphite / deep neutral |
| Light canvas | Porcelain / cool neutral |
| Reading surface | White or softly tinted neutral |
| Primary text | Deep graphite in light mode; warm off-white in dark mode |
| Secondary text | Accessible neutral gray |
| Success / warning / error | Semantic green / amber / red, used consistently |
| Blue / teal / violet | Not brand accents; use only where an existing data meaning requires them |

Keep the existing Archivo family and JetBrains Mono for numeric/data contexts unless browser comparison demonstrates a clear readability problem. Do not introduce font churn for decoration.

### Component language

- Clear hierarchy; one primary action per section.
- Compact but comfortable cards; avoid nesting cards inside cards without a functional reason.
- Consistent 8-point spacing rhythm, 12–16 px surface radii and visible but restrained borders.
- Data values use tabular numerals.
- Controls target at least 44 × 44 px on touch screens.
- Keyboard focus is visible; normal text contrast targets WCAG AA.
- Motion is purposeful and respects reduced-motion preferences.
- No decorative gradients, glow or glass effects unless they clarify hierarchy and survive both themes.

## 4. Implementation sequence

### Phase 0 — Baseline and inventory
- Keep this audit and the current `PRODUCT.md` as the decision record.
- Record the current `main` SHA before each phase.
- Capture desktop (1440 px), tablet (1024 px) and mobile (390 px) screenshots for light and dark themes.
- Identify route-specific CSS ownership before moving or deleting any stylesheet.

### Phase 1 — Design tokens and theme foundation
- Define one set of semantic tokens for light and dark themes.
- Map existing component variables to semantic tokens rather than replacing every component at once.
- Remove violet/teal as brand accents while preserving semantic status colors.
- Validate typography, focus, contrast, borders, radii and spacing in shared components.

### Phase 2 — Student application shell
- Refine sidebar, topbar, page container, breadcrumbs, mobile navigation and fullscreen behavior.
- Remove duplicate navigation affordances where the same action is presented twice.
- Ensure content width and vertical space adapt without cutting content.

### Phase 3 — Student dashboard
- Establish one clear hierarchy for greeting, contest context, next action, progress and quick access.
- Consolidate the overlapping overview styles after visual regression captures exist.
- Preserve every existing metric, link, permission and action.

### Phase 4 — High-frequency study surfaces
- Meu Plano / Study Coach.
- Agenda de Estudos / Cronograma.
- Edital verticalizado and PC-AC study area.
- Questões, trainer and mock exams.
- Biblioteca, legislation and reading surfaces.
- Performance and ranking.

Each area gets its own content hierarchy but shares the same component and token system.

### Phase 5 — Public homepage
- Preserve the existing introduction video behavior and content.
- Simplify the cascade by consolidating duplicate homepage overrides only after screenshots and selector ownership are mapped.
- Improve hero hierarchy, contest discovery, platform features, plans and footer.
- Keep the public homepage distinct from the authenticated workspace while sharing brand tokens.

### Phase 6 — Administration and responsive QA
- Audit admin tables, filters, forms, dialogs, empty states and dense data screens.
- Test 1440 / 1024 / 390 px, both themes, keyboard navigation and reduced motion.
- Run typecheck, lint, build and the relevant route/regression tests after each phase.

## 5. Release gates

A phase is not complete until:

1. No route, data query, permission, plan rule or business action changed unintentionally.
2. No content or control is clipped at supported viewport sizes.
3. Light and dark themes are both readable and visually coherent.
4. Keyboard focus, touch targets and contrast are acceptable.
5. Typecheck, lint, build and relevant tests pass.
6. Before/after screenshots have been reviewed at desktop and mobile sizes.
7. The change is committed to `main` and the deployment result is checked before claiming it is live.

## 6. Tooling note

The repository includes design guidance under `.agents/skills/` (including Impeccable, UI-UX Pro Max, Design System and redesign-existing-projects). This audit used those versioned instructions and repository evidence. The REA executable installed on the user's Windows machine cannot be launched from this GitHub-connected session; no claim is made that the local `rea` command was run here. The same audit findings and implementation plan are recorded so the work can continue consistently in either environment.
