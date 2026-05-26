export type ChipCategory = 'frontend' | 'backend' | 'craft' | 'ai';

const CATEGORY_CLASSES: Record<ChipCategory, string> = {
  frontend: 'border-chip-frontend text-chip-frontend',
  backend: 'border-chip-backend text-chip-backend',
  craft: 'border-chip-craft text-chip-craft',
  ai: 'border-chip-ai text-chip-ai',
};

/**
 * Skill name → category lookup. Drives auto-coloring on `<TagChip>` usages
 * where the chip text matches a known skill. Anything not in the map falls
 * back to the default secondary-purple chip — good for things that aren't a
 * skill-category fit (project names like "Loom", etc.).
 *
 * Adding a new skill: register it here AND in `career/details.json`'s
 * generalSkills (jmi-hub repo). The portfolio repo's `TagChip` is the
 * site-wide source of truth for categorization.
 */
export const SKILL_CATEGORY: Record<string, ChipCategory> = {
  // Frontend & Code
  Angular: 'frontend',
  CSS: 'frontend',
  Cypress: 'frontend',
  HTML: 'frontend',
  JavaScript: 'frontend',
  'Next.js': 'frontend',
  'Next.js 16': 'frontend',
  React: 'frontend',
  'React 19': 'frontend',
  SCSS: 'frontend',
  Tailwind: 'frontend',
  'Tailwind CSS': 'frontend',
  TypeScript: 'frontend',

  // Backend & Data
  Apollo: 'backend',
  Docker: 'backend',
  'ESPN API': 'backend',
  Express: 'backend',
  Git: 'backend',
  GitHub: 'backend',
  'GitHub Actions': 'backend',
  GraphQL: 'backend',
  Heroku: 'backend',
  'Node.js': 'backend',
  PostgreSQL: 'backend',
  'REST APIs': 'backend',
  SQL: 'backend',
  TMDB: 'backend',

  // Design, Motion & Craft
  Figma: 'craft',
  'Figma API': 'craft',
  'Figma Plugin API': 'craft',
  'Framer Motion': 'craft',
  GSAP: 'craft',
  'Motion.js': 'craft',
  'React Three Fiber': 'craft',
  'Three.js': 'craft',

  // AI
  'Agent SDKs': 'ai',
  'Claude Code': 'ai',
  ComfyUI: 'ai',
  'Context Engineering': 'ai',
  'Figma Make': 'ai',
  'Prompt Engineering': 'ai',
};

function inferCategory(children: React.ReactNode): ChipCategory | undefined {
  if (typeof children === 'string') {
    return SKILL_CATEGORY[children];
  }
  return undefined;
}

/**
 * Tag chip — mono uppercase pill with a dotted border + text in a category
 * color. Auto-resolves color from the chip text when it matches a known
 * skill (via `SKILL_CATEGORY`). Pass `category` explicitly to override.
 * Falls back to the default secondary purple for unknown text.
 */
export function TagChip({
  children,
  category,
}: {
  children: React.ReactNode;
  category?: ChipCategory;
}) {
  const resolved = category ?? inferCategory(children);
  const colorClass = resolved
    ? CATEGORY_CLASSES[resolved]
    : 'border-secondary text-secondary';
  return (
    <span
      className={`inline-flex items-center rounded-sm border border-dotted px-2 py-0.5 font-mono text-xs uppercase tracking-nav ${colorClass}`}
    >
      {children}
    </span>
  );
}

const CATEGORY_ORDER: ChipCategory[] = ['frontend', 'backend', 'craft', 'ai'];

/**
 * Sort + filter helper — drops chips not in `SKILL_CATEGORY` (project names,
 * etc.) and sorts by category (frontend → backend → craft → ai) then
 * alphabetically within each. Enforces the site-wide chip rule: skills only,
 * category-then-alpha.
 */
export function sortChips(chips: string[]): string[] {
  return chips
    .filter((c) => SKILL_CATEGORY[c] !== undefined)
    .sort((a, b) => {
      const orderA = CATEGORY_ORDER.indexOf(SKILL_CATEGORY[a]!);
      const orderB = CATEGORY_ORDER.indexOf(SKILL_CATEGORY[b]!);
      if (orderA !== orderB) return orderA - orderB;
      return a.localeCompare(b);
    });
}

/**
 * Renders a list of skill chips as a flex-wrap row — sorted by category and
 * alphabetized within each. Non-skill chips (project names, etc.) are
 * filtered out. One-line replacement for hand-built `<ul>…<TagChip/>…</ul>`.
 */
export function TagChipList({ chips }: { chips: string[] }) {
  const sorted = sortChips(chips);
  return (
    <ul className="flex flex-wrap gap-2">
      {sorted.map((chip) => (
        <li key={chip}>
          <TagChip>{chip}</TagChip>
        </li>
      ))}
    </ul>
  );
}
