# V2 Plan: Reckoning Section + Narrative Style Revamp

## Context

The game is mathematically unwinnable by design — every decision damages at least 2 of 3 metrics, making 10 turns impossible. The educational thesis is that the outcome was predetermined, not that the player made bad choices. Currently, the page has two problems:

1. **Wrong section order** — Game comes before Timeline/Map/Gallery, asking the player to make decisions before they understand what they're deciding about. The intended arc is Wonder → Stakes → Grief → Agency → Reckoning.
2. **Wrong framing** — Section headers, game copy, and game-over messages frame this as a neutral contest between development and preservation. It isn't. The state always wins.

The build adds a Reckoning section, reorders sections, and rewrites copy throughout to serve the narrative arc.

### Design decisions already made

- **"Play Again" button stays** — repeated failure is itself the emotional journey. The player exhausts the possibility space and arrives at the realization themselves.
- **Game-over messages reframed** — shift from "you failed" to "this was predetermined / the system was designed this way."
- **Reckoning section added** — a new final section where the thesis lands, with clustered Frontline article links.
- **Sections reordered** — Hero → Timeline → Map → Gallery → Game → Reckoning (Wonder → Stakes → Grief → Agency → Reckoning).
- **Copy revamped across all sections** — every section header and subhead rewritten to serve the narrative arc.

---

## Files to Modify

| File | Change |
|---|---|
| `index.html` | Reorder sections; rewrite all section headers; add Reckoning section and stylesheet link |
| `js/services/gameLogic.js` | Reframe `getEndMessage()` — system, not player failure |
| `js/services/__tests__/gameLogic.test.js` | Update string assertions to match new messages |
| `js/components/Game.js` | Reframe `endGame()` overlay; add scroll-to-reckoning button |
| `js/main.js` | Import and initialize `Reckoning` component |
| `js/components/Reckoning.js` | **New file** |
| `styles/reckoning.css` | **New file** |

---

## Step 1 — Reorder Sections in `index.html`

**Current order:** Hero → Game → Timeline → Map → Gallery
**New order:** Hero → Timeline → Map → Gallery → Game → Reckoning

Move the `#game-section` block (currently lines 38–75 in index.html) to after `#endangered-species`. No class changes needed — the `bg-gray` on `#timeline` stays, giving the rhythm: white → gray → white → white → white → dark.

---

## Step 2 — Rewrite Section Copy in `index.html`

### Hero (Wonder — establish what exists before naming the threat)

- Subhead: `"One of earth's last untouched islands — ancient rainforests, nesting leatherbacks, and a people who have lived here for ten thousand years. Now subject to India's largest infrastructure project."`

### Timeline — `#timeline` (Stakes — a chronicle of decisions without consent)

- H2: Keep `"A Land in Flux"`
- Subhead: `"These are the decisions that were made about Great Nicobar. Most of them without asking anyone who lives here."`

### Map — `#map-section` (Stakes — the physical scale)

- H2: Keep `"The Vanishing Nicobar"`
- Subhead: `"166 square kilometres of primary rainforest. 9.64 lakh trees. One of the world's most active seismic fault lines. Explore what is proposed to be transformed, and what cannot be restored."`

### Gallery — `#endangered-species` (Grief — not a catalog, an elegy)

- H2: `"Who Lives Here"` (replaces `"Vanishing Treasures"`)
- Subhead: `"650+ species whose habitat is the project's footprint. They were not consulted either."`

### Game — `#game-section` (Agency — honest invitation, no false promise)

- H2: `"You Have ₹81,800 Crore. Ten Decisions."` (replaces duplicate `"The Great Nicobar Paradox"`)
- Subhead: `"Every rupee you spend changes something. Nothing stays unchanged. Try to hold it together."`
- `"Victory Conditions"` block heading → `"What You're Trying to Do"` (removes the implication of achievability)

---

## Step 3 — Reframe `getEndMessage()` in `gameLogic.js`

**File:** `js/services/gameLogic.js` (around line 60)

Replace player-failure framing with system-accountability framing:

```js
const messages = {
  social: 'The communities here were never part of the plan. No allocation of funds changes whose land this is.',
  ecology: 'You cannot build a deep-water port in a primary rainforest without destroying it. There was no version where this didn\'t happen.',
  economic: 'The numbers were never meant to add up for the people who live here.',
  budget: 'The costs were always underestimated. That was not an accident.',
  turns: 'The project timeline was fixed before the first public consultation was held.'
};
```

Default (unknown reason): `"The outcome was determined before the first decision was made."`

---

## Step 4 — Update tests in `gameLogic.test.js`

**File:** `js/services/__tests__/gameLogic.test.js` (lines 101–131)

The tests use `.toContain()` with specific substrings from the old messages. Update each to match the new messages:

| Reason | Old assertion | New assertion |
|---|---|---|
| `social` | `toContain('Social fabric')` | `toContain('communities here')` |
| `ecology` | `toContain('Ecological collapse')` | `toContain('cannot build')` |
| `economic` | `toContain('Economic promises')` | `toContain('never meant to add up')` |
| `budget` | `toContain('Budget depleted')` | `toContain('underestimated')` |
| `turns` | `toContain('Time runs out')` | `toContain('timeline was fixed')` |
| `unknown` | `toContain('precarious balance')` | `toContain('determined before')` |

---

## Step 5 — Reframe `endGame()` in `Game.js`

**File:** `js/components/Game.js` (around line 297, the `endGame()` method)

Two changes:

### A. Replace the overlay body text

Current ending text:
```
This was a simulation.
The destruction is real.
Scroll down to learn more.
```

Replace with:
```
There was no winning combination.

This was a simulation.
The destruction is real.
```

### B. Add scroll-to-reckoning button below "Play Again"

```js
scene.add.rectangle(512, 650, 320, 50, 0x1f2937)
  .setInteractive({ useHandCursor: true })
  .on('pointerdown', () => {
    document.getElementById('reckoning')
      .scrollIntoView({ behavior: 'smooth' });
  });

scene.add.text(512, 650, 'See what was decided for them →', {
  fontSize: '18px',
  color: '#ffffff',
  fontFamily: 'Georgia, serif'
}).setOrigin(0.5);
```

---

## Step 6 — Create `js/components/Reckoning.js`

New file. Follows the class-based pattern of `Gallery.js` / `Timeline.js`. Renders into `.reckoning-content` inside the section.

### Article data — 10 Frontline stories in 3 clusters

**CLUSTER 1: The Ecosystem** (what gets destroyed)

| # | Title | Article ID |
|---|---|---|
| 1 | A Costly Gamble with Forests, Biodiversity, and Indigenous Rights | `article69158497` |
| 2 | The Port at Galathea Bay | `article69159231` |
| 3 | The Saltwater Crocodile and Other Wildlife at Risk | `article69150433` |
| 4 | Coral Reefs, Marine Ecosystems, Climate Change | `article69158539` |
| 5 | The Nicobar Macaque: Extinction Risk | `article69352272` |

**CLUSTER 2: The People** (who gets erased)

| # | Title | Article ID |
|---|---|---|
| 6 | Shompen and Nicobarese: Tribal Rights at Stake | `article70007102` |
| 7 | The Nicobarese Tribe and the Megaproject | `article69368487` |
| 8 | The SIA and Shompen Land Rights | `article69858021` |
| 9 | Interview: D. Ayyappan on Tribal Rights | `article69464236` |

**CLUSTER 3: The Language** (the deepest loss — single article, closing cluster)

| # | Title | Article ID |
|---|---|---|
| 10 | Linguicide: When the Land Goes, the Language Dies | `article70420227` |

All article URLs follow the pattern: `https://frontline.thehindu.com/the-nation/{articleId}/`

### Component DOM structure

```
reckoning-thesis    ← 1–2 sentences naming the system
reckoning-clusters  ← 3 cluster groups
  reckoning-cluster ← cluster heading + label + article cards
    article-card    ← reuse gallery card styles
reckoning-close     ← final statement, large, centered
```

Article cards reuse `.article-card`, `.article-title`, `.article-description`, `.article-link` CSS classes from `gallery.css` — no duplicate card CSS needed.

All links open in `target="_blank" rel="noopener noreferrer"`.

### Key text content

**Thesis (rendered in component):**
> In February 2021, NITI Aayog approved the ₹81,800 crore Great Nicobar project. No public hearing. No consent from the Shompen. No environmental clearance from the communities whose forests would be felled. The game you just played had no winning condition. Neither did they.

**Closing statement:**
> *The Shompen have lived on this island for over 10,000 years.*
> *They were never asked.*

---

## Step 7 — Create `styles/reckoning.css`

Scoped to `.reckoning-section`. Uses existing CSS variables (`--primary`, `--text-primary`, etc.).

Key rules:
- `.reckoning-section` — `background: #0a0a0a; color: #e5e7eb` — **dark inversion, the tonal break**
- `.reckoning-section .section-header h2` — `color: #ffffff; font-size: 3rem`
- `.reckoning-section .section-header p` — `color: #9ca3af`
- `.reckoning-thesis` — centered, max-width 48rem, `font-size: 1.125rem`, `color: #d1d5db`, `border-left: 3px solid var(--primary)`, padding-left, margin-bottom 4rem
- `.reckoning-clusters` — CSS grid, `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`, gap 3rem
- `.reckoning-cluster` — `border-top: 2px solid #374151`, padding-top 2rem
- `.reckoning-cluster h3` — `color: #ffffff`, font-size 1.5rem, margin-bottom 0.25rem
- `.cluster-label` — `color: var(--primary)`, uppercase, letter-spacing, font-size 0.75rem, margin-bottom 1.5rem
- Article cards inside `.reckoning-section`: override `background: #111827; border-color: #374151; color: #e5e7eb`
- `.reckoning-close` — full-width centered, `padding: 6rem 0`, `font-size: 1.5rem`, italic, `color: #9ca3af`

---

## Step 8 — Wire into `main.js`

Add import and initialization following the existing pattern (after Gallery):

```js
import { Reckoning } from './components/Reckoning.js';

// In DOMContentLoaded handler:
if (document.getElementById('reckoning')) {
  try {
    new Reckoning();
  } catch (error) {
    logError('Reckoning', error);
  }
}
```

No CDN dependency check needed (pure JS, no external libs).

---

## Step 9 — Add Reckoning section to `index.html`

Add stylesheet in `<head>`:
```html
<link rel="stylesheet" href="/styles/reckoning.css">
```

Add section after `#endangered-species` (and after `#game-section` which has been moved), before `</main>`:
```html
<!-- Reckoning Section -->
<section id="reckoning" class="section reckoning-section" aria-label="Reckoning">
  <div class="container">
    <div class="section-header reckoning-header">
      <h2>The State Always Wins</h2>
      <p>You played the game. You tried different choices. The outcome was always the same —
         because the decision was made before you ever arrived.</p>
    </div>
    <div class="reckoning-content">
      <!-- Populated by Reckoning.js -->
    </div>
  </div>
</section>
```

---

## Verification Checklist

1. `npm run dev` — all 6 sections render in correct order without console errors
2. Section order confirms: Hero → Timeline → Map → Gallery → Game → Reckoning
3. All copy reads correctly (headers, subheads, game instructions)
4. Play game to defeat — new end messages are system-framing, not player-blaming
5. Click "See what was decided for them →" — smooth scroll to `#reckoning`
6. "Play Again" — game resets correctly; Reckoning section persists below
7. All 10 Frontline links open in new tab (verify URLs are correct)
8. `npm test` — all 48 tests pass including updated `getEndMessage` assertions
9. `npm run lint` — no errors

---

## Git

- Branch: `claude/visual-story-planning-4ejZL`
- Commit and push when all verification passes
