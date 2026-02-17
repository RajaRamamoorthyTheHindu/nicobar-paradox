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
- **ESLint** - Linting for TypeScript files only
- **PostCSS + Autoprefixer** - CSS preprocessing

---

## Architecture

### Current State: Dual Implementation

⚠️ **IMPORTANT**: This project has TWO complete implementations:

1. **Vanilla JavaScript** (PRIMARY - currently used)
   - Location: `/js/components/`, `/styles/`, `index.html`
   - Status: Active, rendered in browser
   - Approach: Class-based components, global window object

2. **React/TypeScript** (SECONDARY - reference only)
   - Location: `/src/components/`
   - Status: Inactive, not loaded in index.html
   - Approach: Functional components with hooks

**Architectural Decision Needed**: Choose one implementation and deprecate the other to reduce maintenance burden.

### Component Structure (Vanilla JS - Active)

```
js/
├── main.js                 # Application entry point
├── components/
│   ├── Hero.js            # Landing section (introduction)
│   ├── Game.js            # Phaser 3 game simulation (423 lines)
│   ├── Timeline.js        # Historical events visualization
│   ├── Map.js             # Mapbox GL interactive map
│   └── Gallery.js         # Species gallery with filtering
├── data/
│   ├── speciesData.js     # 650+ endangered species data
│   ├── timelineData.js    # Historical transformation events
│   └── mapData.js         # Geographic data and layers
└── utils/
    └── analytics.js       # Google Analytics wrapper
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
- ❌ ESLint NOT configured for vanilla JavaScript files (`.js`)
- ❌ No Prettier configuration
- ❌ No pre-commit hooks

**Run Linting**:
```bash
npm run lint  # Only checks TypeScript files
```

### Testing

**Current State**:
- ❌ **NO TESTING INFRASTRUCTURE**
- No test files exist
- No testing frameworks installed
- No test scripts in package.json

**Critical Gap**: This is a production-blocking issue requiring immediate attention.

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
npm run lint  # ESLint for TypeScript files only
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

1. **`js/components/Game.js`** (423 lines)
   - Active game implementation using Phaser 3
   - Contains all decision logic and game state
   - Uses global `window.gameInstance` (anti-pattern)

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
   - Main entry point
   - ⚠️ Contains hardcoded Google Analytics ID (security issue)
   - Loads external CDN scripts (Phaser, Mapbox)

---

## Known Issues & Technical Debt

### Critical (Production Blockers)

1. **Zero Test Coverage**
   - No testing framework installed
   - No tests written for any component
   - High risk of regressions
   - **Action**: Add Jest + React Testing Library + Vitest

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
   - **Action**: Extract into GameLogic, GameUI, GameState modules

5. **Accessibility Gaps**
   - Only 6 ARIA attributes in entire codebase
   - No skip navigation links
   - No visible focus indicators
   - Phaser game canvas not accessible to screen readers
   - **Action**: Add ARIA labels, keyboard navigation, focus management

6. **Incomplete Linting**
   - ESLint only covers TypeScript, not vanilla JavaScript
   - No accessibility linting (eslint-plugin-jsx-a11y)
   - No import ordering rules
   - **Action**: Extend ESLint to all .js files

### Medium Priority

7. **No Error Handling**
   - No try-catch blocks around external API calls (Mapbox, Analytics)
   - No error boundaries in React components (if that architecture is chosen)
   - No fallback UI for failures
   - **Action**: Add error boundaries and try-catch

8. **Missing Documentation**
   - Minimal inline code comments
   - No JSDoc for public methods
   - No API documentation for components
   - **Action**: Add JSDoc comments, generate API docs

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

## Accessibility Requirements

### Current State
- Semantic HTML structure in `index.html`
- Only 6 ARIA attributes across entire codebase
- No keyboard navigation enhancements
- No screen reader support for game

### Required Improvements

1. **ARIA Attributes**
   - Add `aria-label` to all interactive elements
   - Add `aria-live` regions for dynamic game updates
   - Add `role` attributes for custom components

2. **Keyboard Navigation**
   - Implement visible focus indicators (`:focus-visible`)
   - Add keyboard shortcuts for game controls
   - Add skip navigation link to main content

3. **Screen Readers**
   - Add alternative text for meaningful images
   - Provide text alternatives for game visuals
   - Add sr-only utility classes for screen reader content

4. **Color Contrast**
   - Verify WCAG AA compliance for all text
   - Primary color: #B7080D (dark red)
   - Ensure sufficient contrast ratios

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
4. **Test thoroughly** - Manual testing required (no automated tests yet)

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
- [ ] Manual testing completed (no automated tests yet)
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
- Check if `window.gameInstance` is created

---

## Future Roadmap

### Short-term (Next Sprint)
1. Add testing infrastructure (Jest, React Testing Library)
2. Move API keys to environment variables
3. Refactor GameScene.ts into smaller modules
4. Extend ESLint to vanilla JavaScript files
5. Add basic accessibility improvements

### Medium-term (Next Quarter)
6. Choose single architecture (vanilla JS or React)
7. Implement comprehensive accessibility
8. Add performance monitoring (Web Vitals)
9. Create deployment pipeline
10. Add API documentation

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
npm run lint         # Lint TypeScript files

# File Locations
index.html           # Main entry point
js/components/       # Active vanilla JS components
src/components/      # Inactive React components
styles/              # CSS modules
js/data/             # Species, timeline, map data

# Critical Files
js/components/Game.js              # Active game (423 lines)
src/components/Game/GameScene.ts   # Inactive game (762 lines - monolithic)
README.md                          # Documentation (324 lines)
package.json                       # Dependencies and scripts

# Known Issues
- No tests
- Hardcoded API keys (Map.js, index.html)
- Dual architecture (vanilla + React)
- Monolithic components (GameScene.ts)
- Accessibility gaps (only 6 ARIA attributes)
```

---

**Last Updated**: 2026-02-17
**Maintained By**: Project contributors
**Version**: 1.0.0
