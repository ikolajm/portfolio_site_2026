# Portfolio Site 2026 — Claude Instructions

## Project Overview

Jake's personal portfolio site for full-stack web development and UX/UI design. 6+ years of experience. Currently seeking work opportunities.

## Tech Stack

- **Vanilla JavaScript** (ES modules, no build step, no bundler)
- **HTML5 / CSS3** (no framework, no preprocessor)
- **GSAP 3.14.1** — animations, ScrollTrigger, SplitText (all via CDN)
- **Three.js v0.149.0** — 3D graphics (via CDN)
- No npm, no package.json, no TypeScript

## Project Structure

```
portfolio_site_2026/
├── index.html              # Main portfolio page
├── availo.html             # Availo project case study page
├── js/                     # ES module scripts
│   ├── gsap-main.js        # Main page animations
│   ├── gsap-shared.js      # Shared GSAP helpers
│   ├── gsap-project.js     # Project page animations
│   ├── animationConfig.js  # Centralized animation settings (edit timing/easing here)
│   ├── state.js            # App state
│   ├── svgBG.js            # Animated SVG background
│   ├── wave.js             # Wave animation
│   ├── projectSlideshow.js # Project carousel
│   ├── experience.js       # Experience section
│   ├── sceneConfig.js      # Three.js scene config
│   ├── particleShader.js   # GPU particle shader
│   ├── colorField.js       # Color interpolation
│   └── elapsedTime.js      # Time tracking
├── styles/
│   ├── variables.css       # Design tokens — edit colors/spacing here
│   ├── main.css            # Global styles
│   ├── home.css, about.css, experience.css, contact.css
│   ├── project_feature_short.css
│   └── full_project_feature.css
└── assets/
    ├── svg/                # Logos, icons, graphics
    ├── photos/
    └── videos/
```

## Conventions

- **No build tools.** All JS uses `<script type="module">` with CDN imports. Do not introduce npm, bundlers, or transpilers.
- **Animation config is centralized** in `js/animationConfig.js`. Edit timing and easing values there, not inline.
- **Design tokens** live in `styles/variables.css`. Use CSS custom properties — do not hardcode colors or spacing.
- **Responsive breakpoints:** 1000px, 750px, 500px. No CSS framework.
- **Primary color:** `#0099E5`. Dark surface: `#141515`.
- **Respect `prefers-reduced-motion`** — already guarded in `svgBG.js`. Apply the same pattern when adding new animations.
- **No TypeScript, no JSDoc, no ESLint.** Keep it vanilla.

## Key Context

- This is a design-forward, animation-heavy portfolio. Visual polish and smooth scroll interactions are a priority.
- GSAP ScrollTrigger drives most scroll-based reveals. Keep animation timelines readable and organized.
- Three.js is used for particle/3D effects. Changes to `sceneConfig.js` or `particleShader.js` affect render performance — be conservative.
- The site has two HTML pages. New project case studies follow the pattern of `availo.html`.
