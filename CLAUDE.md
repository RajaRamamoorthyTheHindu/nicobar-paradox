# Claude Project Context: The Great Nicobar Paradox

This file provides context for AI assistants working on this project.

---

## Project Overview

**Name**: The Great Nicobar Paradox
**Type**: Interactive Educational Web Experience
**Mission**: Educate users about environmental and social impacts of India's ₹81,800 crore Great Nicobar development project through interactive storytelling, data visualization, and game simulation.

**Target Audience**: Students, environmental enthusiasts, policy makers, general public interested in conservation vs development trade-offs.

**Educational Objectives**:
1. Complexity Awareness - Understanding interconnected development decisions
2. Trade-off Recognition - Every choice has multiple consequences
3. Stakeholder Perspectives - Balancing economic, social, environmental viewpoints
4. Resource Constraints - Managing limited budgets
5. Long-term Thinking - Considering cumulative effects

---

## Technology Stack

### Primary Implementation (Active)
- **HTML5** - Semantic markup in `index.html`
- **CSS3** - Modular stylesheets in `styles/` directory
- **Vanilla JavaScript (ES6+)** - Component modules in `js/` directory
- **Phaser 3** (v3.80.1) - Game engine for decision simulation
- **Mapbox GL JS** (v2.15.0) - Interactive map visualization
- **Google Analytics** - User engagement tracking

### Secondary Implementation (Inactive, for migration reference)
- **React 18** - Functional components with hooks
- **TypeScript 5.3** - Type safety with strict mode
- **Tailwind CSS** - Utility-first styling
- **Vite 5** - Build tool and dev server

### Build & Development
- **Vite** - Module bundler and dev server (port 5173)
- **TypeScript Compiler** - Type checking before build
- **ESLint** - Linting for TypeScript and JavaScript files
- **Vitest** - Unit testing framework (jsdom environment)
- **PostCSS + Autoprefixer** - CSS preprocessing

---

## Architecture

### Current State: Dual Implementation

⚠️ **IMPORTANT**: This project has TWO complete implementations:

1. **Vanilla JavaScript** (PRIMARY - currently used)
   - Location: `/js/components/`, `/styles/`, `index.html`
   - Status: Active, rendered in browser
   - Approach: Class-based components, ES6 module imports/exports

2. **React/TypeScript** (SECONDARY - reference only)
   - Location: `/src/components/`
   - Status: Inactive, not loaded in index.html
   - Approach: Functional components with hooks

**Architectural Decision Needed**: Choose one implementation and deprecate the other to reduce maintenance burden.

### Component Structure (Vanilla JS - Active)

```
js/
├── main.js                 # Application entry point (ES6 module)
├── config.js               # Application configuration constants
├── components/
│   ├── Hero.js            # Landing section (introduction)
│   ├── Game.js            # Phaser 3 game simulation
│   ├── Timeline.js        # Historical events visualization
│   ├── Map.js             # Mapbox GL interactive map
│   └── Gallery.js         # Species gallery with filtering
├── constants/
│   └── gameConstants.js   # Game decision data and effects
├── data/
│   ├── speciesData.js     # 650+ endangered species data
│   ├── timelineData.js    # Historical transformation events
│   └── mapData.js         # Geographic data and layers
├── services/
│   ├── gameLogic.js       # Pure game logic functions
│   └── __tests__/
│       └── gameLogic.test.js  # Game logic unit tests (25 tests)
└── utils/
    ├── analytics.js       # Google Analytics wrapper
    ├── errorHandler.js    # Error logging, fallback UI, CDN checks
    └── __tests__/
        ├── analytics.test.js      # Analytics unit tests (7 tests)
        └── errorHandler.test.js   # Error handler unit tests (16 tests)
```

### Component Structure (React/TypeScript - Reference)

```
src/
├── App.tsx                     # Main application component
├── components/
│   ├── Hero/
│   │   └── Hero.tsx           # Landing hero section
│   ├── Game/
│   │   ├── GameComponent.tsx  # Game container with lazy loading
│   │   ├── GameScene.ts       # Phaser 3 game logic (762 lines - MONOLITHIC)
│   │   └── speciesData.ts     # Duplicate of js/data/speciesData.js
│   ├── Timeline/
│   │   ├── Timeline.tsx       # Timeline container
│   │   └── timelineData.ts    # Duplicate of js/data/timelineData.js
│   ├── Map/
│   │   └── Map.tsx            # Mapbox GL wrapper
│   └── Gallery/
│       ├── Gallery.tsx        # Species gallery component
│       └── speciesData.ts     # Duplicate of js/data/speciesData.js
└── utils/
    └── analytics.ts           # Duplicate of js/utils/analytics.js
```

---

## Directory Structure

```
/home/user/nicobar-paradox/
├── index.html                 # Main entry point (uses vanilla JS)
├── package.json              # Dependencies and scripts
├── vite.config.ts            # Vite build configuration
├── vite.config.js            # Duplicate Vite config (consolidate needed)
├── tsconfig.json             # TypeScript configuration (strict mode)
├── eslint.config.js          # ESLint rules (TypeScript only)
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS with autoprefixer
├── README.md                 # Comprehensive documentation (324 lines)
├── CLAUDE.md                 # This file
├── styles/                   # CSS modules
│   ├── main.css             # Global styles and layout
│   ├── game.css             # Game component styles
│   ├── timeline.css         # Timeline animations
│   ├── map.css              # Map layout
│   └── gallery.css          # Species gallery grid
├── js/                       # Vanilla JavaScript (ACTIVE)
│   ├── main.js
│   ├── components/
│   ├── data/
│   └── utils/
└── src/                      # React/TypeScript (INACTIVE)
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/
    └── utils/
```

---

## Development Practices

### Code Style

**JavaScript/TypeScript**:
- ES6+ syntax (arrow functions, template literals, destructuring)
- Class-based components in vanilla JS
- Functional components with hooks in React
- PascalCase for components, camelCase for functions/variables
- TypeScript strict mode enabled

**CSS**:
- BEM-like naming conventions
- Feature-based file organization
- Flexbox and Grid for layouts
- CSS custom properties for theming
- Responsive design (mobile-first)

### Linting & Formatting

**Current State**:
- ✅ ESLint configured for TypeScript files (`.ts`, `.tsx`)
- ✅ ESLint configured for vanilla JavaScript files (`.js`) with `sourceType: 'module'`
- ❌ No Prettier configuration
- ❌ No pre-commit hooks

**Run Linting**:
```bash
npm run lint  # Checks both TypeScript and JavaScript files
```

### Testing

**Current State**:
- ✅ **Vitest** installed and configured (jsdom environment)
- ✅ 48 tests across 3 test files
- ✅ `npm test` script configured in package.json

**Test Files**:
- `js/services/__tests__/gameLogic.test.js` — 25 tests (game logic, metrics, budget, victory/defeat)
- `js/utils/__tests__/analytics.test.js` — 7 tests (event tracking, error handling)
- `js/utils/__tests__/errorHandler.test.js` — 16 tests (logging, fallback UI, CDN checks)

**Run Tests**:
```bash
npm test       # Run all tests once
npm run test   # Same as above
```

---

## Common Tasks

### Development Server

```bash
npm run dev  # Starts Vite dev server on http://localhost:5173
```

### Build for Production

```bash
npm run build  # Runs TypeScript compiler, then Vite build
# Output: dist/ directory
```

### Preview Production Build

```bash
npm run preview  # Preview the production build locally
```

### Lint Code

```bash
npm run lint  # ESLint for TypeScript and JavaScript files
```

### Run Tests

```bash
npm test  # Runs Vitest (48 tests across 3 files)
```

---

## Game Mechanics Reference

### Game Structure

**Budget**: ₹81,800 crores (matches real project allocation)
**Turns**: 10 maximum
**Metrics**: Three-pillar system (0-100 scale)
- Social Impact (purple) - community welfare, indigenous rights
- Economic Growth (yellow) - job creation, infrastructure
- Environmental Health (green) - ecosystem preservation, biodiversity

### Four Decision Options

1. **Build Port Infrastructure**
   - Cost: ₹15,000 crores
   - Effects: Social -20, Economic +25, Ecology -30
   - High economic gain, severe environmental damage

2. **Implement Conservation Measures**
   - Cost: ₹8,000 crores
   - Effects: Social -15, Economic -25, Ecology +20
   - Environmental investment, economic setback

3. **Expand Urban Development**
   - Cost: ₹12,000 crores
   - Effects: Social -25, Economic +30, Ecology -35
   - Strong economic boost, community protests

4. **Focus on Social Programs**
   - Cost: ₹5,000 crores
   - Effects: Social +20, Economic -20, Ecology -15
   - Lowest cost, improves community relations

### Victory Conditions

All must be met:
1. All three metrics stay above 50%
2. Complete all 10 turns
3. Maintain positive budget
4. Demonstrate balanced approach

### Defeat Scenarios

Game ends if:
1. Any metric drops to ≤30% (collapse)
2. Budget reaches ₹0 (bankruptcy)
3. Fail to maintain balance across 10 turns

---

## Critical Files for Development

### Must Read Before Editing

1. **`js/components/Game.js`**
   - Active game implementation using Phaser 3
   - UI rendering and Phaser scene management
   - Delegates game logic to `js/services/gameLogic.js`
   - Includes screen reader announcements via `aria-live` region

2. **`src/components/Game/GameScene.ts`** (762 lines)
   - Inactive React/TypeScript game implementation
   - **MONOLITHIC** - mixes UI, logic, state, analytics
   - Needs refactoring if this architecture is chosen

3. **`README.md`** (324 lines)
   - Comprehensive project documentation
   - Game mechanics detailed explanation (lines 95-229)
   - Educational objectives and data sources

4. **`js/data/speciesData.js`**
   - 650+ endangered species catalog
   - Scientific names, conservation status, threats
   - Used by Gallery component

5. **`index.html`**
   - Main entry point with `<script type="module">` loading
   - Semantic landmarks (`<header>`, `<main>`) with skip navigation
   - ARIA labels on all sections, `aria-live` game status region
   - Modal dialog with `role="dialog"`, `aria-modal`, focus management
   - ⚠️ Contains hardcoded Google Analytics ID (security issue)
   - Loads external CDN scripts (Phaser, Mapbox)

6. **`js/utils/errorHandler.js`**
   - Centralized error handling utilities
   - `logError()` — structured error logging
   - `renderFallback()` — fallback UI for failed components
   - `isCDNAvailable()` — checks CDN-loaded global availability

7. **`js/services/gameLogic.js`**
   - Pure game logic functions extracted from Game.js
   - `applyDecision()`, `checkGameOver()`, `checkVictory()`
   - `formatBudget()`, `clampMetric()`
   - Fully unit tested (25 tests)

---

## Known Issues & Technical Debt

### Critical (Production Blockers)

1. ~~**Zero Test Coverage**~~ — **RESOLVED**
   - ✅ Vitest installed and configured
   - ✅ 48 tests across 3 test files (gameLogic, analytics, errorHandler)
   - **Remaining**: Expand coverage to component initialization and UI interactions

2. **Hardcoded API Keys**
   - Mapbox token in `js/components/Map.js` line 28
   - Google Analytics ID in `index.html`
   - **Security Risk**: Credentials exposed in public repo
   - **Action**: Move to environment variables (`.env`)

3. **Dual Architecture Maintenance**
   - Complete code duplication between vanilla JS and React
   - Every feature implemented twice
   - Bug fixes need dual application
   - **Action**: Choose one architecture, deprecate the other

### High Priority

4. **Monolithic Components**
   - `GameScene.ts` (762 lines) violates Single Responsibility Principle
   - Mixes UI rendering, game logic, state management, analytics
   - **Note**: Vanilla JS `Game.js` now delegates logic to `gameLogic.js`
   - **Action**: Apply same extraction to React `GameScene.ts` if that architecture is chosen

5. ~~**Accessibility Gaps**~~ — **RESOLVED**
   - ✅ Skip navigation link added
   - ✅ Semantic landmarks (`<header>`, `<main>`) with `aria-label` on all sections
   - ✅ Visible focus indicators (`:focus-visible` styles)
   - ✅ Game canvas `role="application"` with `aria-live` announcements
   - ✅ Modal dialog: `role="dialog"`, `aria-modal`, focus trap, Escape to close, focus restoration
   - ✅ Species cards: `tabindex`, `role="button"`, keyboard Enter/Space support
   - ✅ Filter/layer buttons: `aria-pressed` state management
   - ✅ `.sr-only` utility class for screen reader content
   - ✅ `prefers-reduced-motion` media query
   - **Remaining**: WCAG AA color contrast audit, additional alt text for images

6. ~~**Incomplete Linting**~~ — **PARTIALLY RESOLVED**
   - ✅ ESLint now covers vanilla JavaScript files (`.js`) with `sourceType: 'module'`
   - ❌ No accessibility linting (eslint-plugin-jsx-a11y)
   - ❌ No import ordering rules
   - **Action**: Add accessibility and import ordering ESLint plugins

### Medium Priority

7. ~~**No Error Handling**~~ — **RESOLVED**
   - ✅ Centralized error handler (`js/utils/errorHandler.js`)
   - ✅ try-catch around all external API calls (Phaser init, Mapbox init, Analytics)
   - ✅ try-catch in component methods (`makeDecision`, `toggleLayer`, `showSpeciesDetails`)
   - ✅ Fallback UI rendered on component failure (`renderFallback()`)
   - ✅ CDN availability checks before component initialization
   - ✅ Global `error` and `unhandledrejection` handlers in `main.js`
   - ✅ Mapbox `on('error')` event handler
   - ✅ 16 unit tests for error handler

8. ~~**Missing Documentation**~~ — **RESOLVED**
   - ✅ JSDoc with `@module`, `@class`, `@typedef`, `@param`, `@returns` on all 15 JS files
   - ✅ Type definitions for all data structures (Species, TimelineEvent, Decision, GameStats, etc.)
   - **Remaining**: Generate HTML API docs from JSDoc

9. **No Deployment Guide**
   - README missing deployment instructions
   - No environment variable documentation
   - No CI/CD pipeline
   - **Action**: Add deployment section to README

---

## Environment Variables

### Current State
⚠️ **No environment variables currently configured**

All secrets are hardcoded in source:
- Mapbox token: `js/components/Map.js` line 28
- Google Analytics ID: `index.html`

### Required Setup (To Be Implemented)

Create `.env` file:
```env
VITE_MAPBOX_TOKEN=your_mapbox_token_here
VITE_GA_ID=your_google_analytics_id_here
```

Update code to use:
```javascript
// Instead of hardcoded token
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
```

Add `.env` to `.gitignore` and create `.env.example` for reference.

---

## Data Sources & Accuracy

All educational content is grounded in real-world data:

**Sources**:
- Environmental Impact Assessments (official government documents)
- Scientific research papers (peer-reviewed)
- Conservation organization reports (IUCN, WWF, etc.)
- Satellite imagery (Mapbox satellite layers)
- Government project documents (₹81,800 crore allocation)

**Key Facts**:
- 650+ species at risk (documented)
- 166 sq km of pristine forest affected (measured)
- Species include scientific names and conservation status
- Timeline events based on historical record

**Important**: Game mechanics are simplified for playability, but grounded in real impacts.

---

## Performance Considerations

### Optimizations Present

✅ Intersection Observer for lazy component initialization
✅ Game loads only when in viewport
✅ GSAP for smooth animations
✅ Phaser WebGL rendering (60fps capable)
✅ CSS transitions instead of JavaScript animations
✅ Vite automatic code splitting

### Missing Optimizations

❌ No image optimization pipeline
❌ No lazy loading for images
❌ Blocking external scripts (Phaser, Mapbox CDN)
❌ No performance budgets
❌ No Web Vitals monitoring

---

## Accessibility

### Implemented Features
- ✅ Skip navigation link (`<a class="skip-link" href="#main-content">`)
- ✅ Semantic landmarks: `<header>`, `<main id="main-content">`
- ✅ `aria-label` on all sections, game canvas, modal, buttons
- ✅ `aria-live="polite"` region for game state announcements (`#game-status`)
- ✅ `role="application"` on game canvas, `role="dialog"` on modal
- ✅ `aria-pressed` on filter buttons (Gallery) and layer toggles (Map)
- ✅ `aria-modal="true"` and `aria-hidden` management on species modal
- ✅ Visible focus indicators via `:focus-visible` CSS
- ✅ Keyboard support: Enter/Space on species cards, Escape to close modal
- ✅ Focus trap in modal (Tab/Shift+Tab cycling between focusable elements)
- ✅ Focus restoration when modal closes (returns to triggering element)
- ✅ `.sr-only` utility class for screen reader-only content
- ✅ `prefers-reduced-motion: reduce` media query (disables animations)
- ✅ Screen reader game announcements (decisions, metrics, game over)

### Remaining Improvements

1. **Color Contrast**
   - Verify WCAG AA compliance for all text
   - Primary color: #B7080D (dark red)
   - Ensure sufficient contrast ratios

2. **Images**
   - Add alternative text for all meaningful images
   - Mark decorative images with `alt=""`

3. **Additional Keyboard Navigation**
   - Add keyboard shortcuts for game decision buttons
   - Add arrow key navigation for timeline

---

## Working with This Codebase

### Before Making Changes

1. **Read the README.md** - Understand the educational mission
2. **Identify the active implementation** - Vanilla JS or React?
3. **Check for duplication** - Does this exist in both implementations?
4. **Consider educational impact** - Does this serve the learning objectives?

### When Adding Features

1. **Data-driven approach** - Add data to data modules, not components
2. **Maintain balance** - Keep the three-pillar system balanced
3. **Real-world grounding** - Use factual data from credible sources
4. **Test thoroughly** - Run `npm test` and add tests for new logic

### When Refactoring

1. **Don't break the active implementation** - Vanilla JS is currently live
2. **Extract, don't rewrite** - Preserve working functionality
3. **Add tests first** - Before refactoring, add test coverage
4. **Document decisions** - Update this CLAUDE.md with changes

### When Fixing Bugs

1. **Check both implementations** - Bug may exist in both vanilla and React
2. **Verify game logic** - Ensure win/loss conditions still work
3. **Test metrics** - Verify all three metrics update correctly
4. **Check budget** - Ensure costs are deducted properly

---

## Contribution Guidelines

### Code Quality Standards

- Use ES6+ JavaScript syntax
- Follow existing naming conventions
- Add JSDoc comments for public methods
- Keep functions under 50 lines
- Keep files under 300 lines (except documented exceptions)
- Avoid global variables (except where required by architecture)

### Pull Request Checklist

- [ ] Code follows project style
- [ ] `npm test` passes (48+ tests)
- [ ] Manual testing completed for UI interactions
- [ ] Game mechanics still balanced
- [ ] Documentation updated (README, CLAUDE.md)
- [ ] No new hardcoded secrets
- [ ] Accessibility considered
- [ ] Educational impact maintained

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Clear, descriptive commit message"

# Push to remote
git push -u origin feature/your-feature-name

# Create pull request for review
```

---

## Troubleshooting

### Dev Server Won't Start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build Fails

```bash
# Check TypeScript errors
npx tsc --noEmit

# Check for linting errors (TypeScript only)
npm run lint
```

### Map Not Rendering

- Check Mapbox GL JS loaded from CDN (check network tab)
- Verify Mapbox token is valid (currently hardcoded in Map.js)
- Check browser console for errors

### Game Not Starting

- Verify Phaser 3 loaded from CDN
- Check browser console for initialization errors
- Verify game container exists in DOM
- Check `main.js` CDN availability check (`isCDNAvailable('Phaser')`)
- Look for fallback error UI in the game section

### Tests Failing

```bash
npm test  # Run all tests
# Tests use jsdom environment (configured via @vitest-environment directive)
# Test files located in __tests__/ directories alongside source
```

---

## Future Roadmap

### Short-term (Next Sprint)
1. ~~Add testing infrastructure~~ — **DONE** (Vitest, 48 tests)
2. Move API keys to environment variables
3. Refactor React `GameScene.ts` into smaller modules (vanilla JS already done)
4. ~~Extend ESLint to vanilla JavaScript files~~ — **DONE**
5. ~~Add basic accessibility improvements~~ — **DONE** (comprehensive)
6. Expand test coverage to component initialization and UI interactions
7. Add WCAG AA color contrast audit

### Medium-term (Next Quarter)
8. Choose single architecture (vanilla JS or React)
9. Add performance monitoring (Web Vitals)
10. Create deployment pipeline
11. Generate HTML API docs from JSDoc comments

### Long-term (Future)
11. Add user accounts and save progress
12. Implement multiplayer decision-making
13. Expand to other development projects
14. Add localization (multiple languages)
15. Mobile app version

---

## Contact & Resources

**README**: See `/home/user/nicobar-paradox/README.md` for comprehensive documentation
**Issues**: Track known issues in the "Known Issues & Technical Debt" section above
**Questions**: Review this CLAUDE.md first, then consult README.md

---

## Quick Reference Commands

```bash
# Development
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production (dist/)
npm run preview      # Preview production build
npm run lint         # Lint TypeScript and JavaScript files
npm test             # Run Vitest (48 tests across 3 files)

# File Locations
index.html           # Main entry point (ES6 module loading)
js/components/       # Active vanilla JS components
js/services/         # Game logic (pure functions, unit tested)
js/utils/            # Analytics, error handler (unit tested)
js/constants/        # Game decision constants
js/data/             # Species, timeline, map data
src/components/      # Inactive React components
styles/              # CSS modules (incl. accessibility styles)

# Critical Files
js/components/Game.js              # Active game UI + Phaser scene
js/services/gameLogic.js           # Game logic (25 tests)
js/utils/errorHandler.js           # Error handling utilities (16 tests)
src/components/Game/GameScene.ts   # Inactive game (762 lines - monolithic)
README.md                          # Documentation (324 lines)
package.json                       # Dependencies and scripts

# Remaining Issues
- Hardcoded API keys (Map.js, index.html)
- Dual architecture (vanilla + React)
- Monolithic React GameScene.ts (vanilla JS version refactored)
- WCAG AA color contrast audit needed
```

---

**Last Updated**: 2026-02-17
**Maintained By**: Project contributors
**Version**: 1.1.0

### Changelog

**v1.1.0** (2026-02-17) — ES6 Modules, Error Handling, Accessibility, JSDoc
- Converted all vanilla JS from `window.X` globals to ES6 `import`/`export` modules
- Added `<script type="module">` loading in `index.html`
- Created `js/utils/errorHandler.js` with `logError`, `renderFallback`, `isCDNAvailable`
- Added try-catch around all external API calls (Phaser, Mapbox, Google Analytics)
- Added global `error`/`unhandledrejection` handlers and CDN availability checks
- Added fallback UI for failed component initialization
- Implemented comprehensive accessibility: skip nav, landmarks, ARIA labels, `aria-live`, focus management, keyboard navigation, modal focus trap, `prefers-reduced-motion`
- Added JSDoc documentation (`@module`, `@class`, `@typedef`, `@param`, `@returns`) to all 15 JS files
- Extracted game logic to `js/services/gameLogic.js` (pure functions)
- Added `js/config.js` and `js/constants/gameConstants.js`
- Set up Vitest with 48 tests (gameLogic, analytics, errorHandler)
- Extended ESLint to cover JavaScript files with `sourceType: 'module'`
