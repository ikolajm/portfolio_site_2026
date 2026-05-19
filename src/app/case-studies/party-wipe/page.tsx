import type { Metadata } from 'next';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { TagChip } from '@/components/atoms/TagChip';
import { CodeBlock } from '@/components/atoms/CodeBlock';
import { MediaBlock } from '@/components/atoms/MediaBlock';
import { CrossLinkSection } from '@/components/atoms/CrossLinkSection';
import { CalloutBlock } from '@/components/atoms/CalloutBlock';
import { StatGrid } from '@/components/atoms/StatGrid';

export const metadata: Metadata = {
  title: 'Party Wipe — Jacob Ikola',
  description:
    'A D&D roguelike — the combat half, no DM required. 18 monsters, 6 classes, three cycling bosses, zone-based tactics, ten themed feedback families.',
};

export default function PartyWipeCaseStudy() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 pt-32 pb-24">
      {/* HERO */}
      <section aria-label="Hero" className="flex flex-col gap-8">
        <SectionAnchor>Case Study</SectionAnchor>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
            Party Wipe
          </h1>
          <p className="text-2xl leading-relaxed opacity-90">
            I wanted to play D&amp;D, but never had a committed group. Party
            Wipe is the combat half — a 20-minute single-player roguelike,
            no DM required.
          </p>
        </div>

        <ul className="flex flex-wrap gap-2">
          <li><TagChip>TypeScript</TagChip></li>
          <li><TagChip>Next.js 16</TagChip></li>
          <li><TagChip>React 19</TagChip></li>
          <li><TagChip>Framer Motion</TagChip></li>
          <li><TagChip>Loom</TagChip></li>
        </ul>

        <MediaBlock
          aspect="16/9"
          placeholder="hero media — four-character party mid-encounter, fire-bolt mid-flourish (charge-up, target scrim, embers rising, damage-in-glyph with CRIT ribbon)"
        />
      </section>

      {/* MEDIABLOCK — visual-led position 2 */}
      <MediaBlock
        aspect="16/10"
        placeholder="a single combat moment — Wizard casts burning-hands on a hell-hound; charge-up at the caster, scrim + fire flourish + number-in-glyph + VULNERABLE ribbon on the target"
        caption="same event bus, three structural layers — scrim, flourish, result"
      />

      {/* PROBLEM */}
      <section aria-label="Problem" className="flex flex-col gap-8">
        <SectionAnchor>The Problem</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            D&amp;D has a gatekeeping problem. A committed group, a willing
            DM, four-plus-hour sessions, paper bookkeeping, a rules tome
            longer than most novels. Two audiences bounce off it: gamers
            who&apos;d be receptive to tabletop but won&apos;t commit, and
            non-gamers who&apos;d try a shortplay if the rules barrier
            disappeared.
          </p>
          <p>
            Most of that friction lives in combat. Story tracking is solvable
            — campaign wiki, DM-managed objective tree, prepared encounters.
            Combat is the harder problem: conditions, action economy, dice
            math, resource bookkeeping, damage-type interactions. New
            players bounce off the rules density before they ever feel the
            strategic loop underneath.
          </p>
          <p>
            I wanted to find out what &quot;consumable D&amp;D combat&quot;
            could look like, with no good way to learn it from the table.
            So I built Party Wipe — a single-player roguelike that runs the
            combat layer end-to-end without a DM, on a heavily curated SRD
            subset. Longer-term, this becomes the combat engine inside a
            DM/player dashboard that lowers the barrier for casual table
            play.
          </p>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section aria-label="Architecture" className="flex flex-col gap-8">
        <SectionAnchor>Architecture</SectionAnchor>
        <p className="text-lg leading-relaxed">
          The game is six things working together.
        </p>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Phase-driven UX, no menus</h3>
            <p className="leading-relaxed opacity-80">
              Every game phase is a full-screen takeover with a persistent
              floating HUD. Phases:{' '}
              <code className="font-mono text-sm">room-preview</code>,{' '}
              <code className="font-mono text-sm">combat</code>,{' '}
              <code className="font-mono text-sm">loot</code>,{' '}
              <code className="font-mono text-sm">rest</code>,{' '}
              <code className="font-mono text-sm">level-up</code>,{' '}
              <code className="font-mono text-sm">game-over</code>. No
              inventory menu, no character-sheet dialog opened mid-combat.
              The current phase <em>is</em> the screen. Removes the
              rules-research detour that loses new players at tabletop.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Zone-based combat</h3>
            <p className="leading-relaxed opacity-80">
              Three abstract zones — front, mid, back. Distance determines
              melee (same zone), ranged (adjacent), or far (skip one). No
              grid tiles, no positioning within a zone. The tactical layer
              is <em>which zone you&apos;re in</em>, not which five-foot
              square. Loses tabletop&apos;s AoE-placement game; gains
              four-second turns and a battlefield that reads in one glance.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Curated content as MVP discipline</h3>
            <p className="leading-relaxed opacity-80">
              The D&amp;D 5e SRD ships 304 monsters, 9 classes with 30+
              subclasses, 400+ spells. Party Wipe runs on 18 monsters, 6
              classes, 23 spells, 14 weapons, 6 consumables. Every survivor
              earns its slot by teaching a strategy loop — skeleton&apos;s
              bludgeoning vulnerability and poison immunity make weapon
              choice matter; mummy&apos;s fire vulnerability with a
              frighten-inflict turns a hard hitter into a softer
              save-or-suck. The trim is a prototype constraint. Breadth
              comes back when the engine&apos;s earned it.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Cycling bosses with multiplicative scaling</h3>
            <p className="leading-relaxed opacity-80">
              Three boss templates — chimera, young black dragon, stone
              giant — cycle by floor and scale multiplicatively. A Floor 3
              chimera and a Floor 23 chimera are the same fight
              beat-for-beat, statted bigger. Infinite-depth runs sustainable
              from three boss designs.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Visual feedback as pedagogy</h3>
            <p className="leading-relaxed opacity-80">
              Combat events flow through one bus (
              <code className="font-mono text-sm">data/combat-events.ts</code>
              ) and render as full-card overlays on the affected token.
              Three layers: scrim, one of ten family-themed flourishes
              (fire embers, ice shards, lightning forks, and so on), and a
              result composition (number-in-glyph + qualifier ribbon for{' '}
              <code className="font-mono text-sm">CRIT</code> /{' '}
              <code className="font-mono text-sm">VULNERABLE</code> /{' '}
              <code className="font-mono text-sm">RESISTED</code>). A new
              player learns &quot;fire damage on a vulnerable enemy with a
              critical hit&quot; without ever opening a rules reference —
              every element of that read is encoded visually. Sixty-nine
              CSS tokens feed per-concern TS registries (damage, condition,
              intent, class) that components consume via{' '}
              <code className="font-mono text-sm">var(...)</code>.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Loom underneath</h3>
            <p className="leading-relaxed opacity-80">
              Built on the same 55-atom design system Paperboy uses, plus
              two project-specific atoms (
              <code className="font-mono text-sm">Logo</code>,{' '}
              <code className="font-mono text-sm">GameIcon</code>). One
              questionnaire, two visually distinct products.
            </p>
          </div>
        </div>
      </section>

      {/* DECISIONS */}
      <section aria-label="Decisions" className="flex flex-col gap-8">
        <SectionAnchor>Decisions</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            <strong>Combat first, story later.</strong> Most D&amp;D digital
            adaptations render the whole experience: narrative, exploration,
            character relationships, combat. Party Wipe deliberately
            doesn&apos;t. Story tracking is the solved-ish half (wikis,
            objective trees, prepared encounters); combat is where the
            friction lives. Building only the combat half means the engine
            gets sharpened on the actual hard problem before it has to plug
            into a larger system.
          </p>
          <p>
            <strong>Zone abstraction over grid.</strong> Most digital D&amp;D
            either keeps the grid (BG3, Solasta) or abstracts to text-only
            (most CRPG-likes). Three zones is the middle abstraction that
            preserves positioning as a tactical choice without making turns
            expensive. Newcomers read the battlefield instantly.
          </p>
          <p>
            <strong>Qualifier as field, not event.</strong>{' '}
            <code className="font-mono text-sm">CRIT</code>,{' '}
            <code className="font-mono text-sm">VULNERABLE</code>, and{' '}
            <code className="font-mono text-sm">RESISTED</code> used to fire
            as separate floating popups offset from the damage number.
            Folded them into a{' '}
            <code className="font-mono text-sm">qualifier</code> field on
            the damage event itself, rendered as a small uppercase ribbon
            anchored above the number-in-glyph. Three events became one.
            The visual hierarchy is identical every time, so the pattern
            becomes recognizable instead of soup.
          </p>
          <p>
            <strong>Visual death decoupled from data death.</strong> Combat
            resolvers flip{' '}
            <code className="font-mono text-sm">isAlive: false</code>{' '}
            immediately, but{' '}
            <code className="font-mono text-sm">ZoneToken</code> holds the
            visual alive for 1200ms after a{' '}
            <code className="font-mono text-sm">kill</code> event — long
            enough for the damage flourish to play through before the card
            grayscales. Five kill paths (player melee, player spell, enemy
            melee, enemy save-AoE, DoT) all emit the same event and get the
            same hold.
          </p>
          <p>
            <strong>One source of truth per visual concern.</strong> Damage,
            condition, intent, and class colors each live as a TS registry
            reading from CSS custom properties in{' '}
            <code className="font-mono text-sm">game-tokens.css</code>. No
            component owns its own color map. Adding a new damage family is
            one file. Theming a new screen is reading existing tokens. The
            architecture survives expansion when the trimmed content grows
            back to full breadth.
          </p>
        </div>
      </section>

      <CalloutBlock eyebrow="By the numbers">
        <StatGrid
          stats={[
            { label: 'Run length', value: '~20m', caption: 'consumable session' },
            { label: 'Monsters', value: '18', caption: 'strategy loops' },
            { label: 'Feedback families', value: '10', caption: 'themed flourishes' },
            { label: 'Menus', value: '0', caption: 'phase is the screen' },
          ]}
        />
      </CalloutBlock>

      {/* UNDER THE HOOD */}
      <section aria-label="Under the Hood" className="flex flex-col gap-8">
        <SectionAnchor>Under the Hood</SectionAnchor>
        <p className="text-lg leading-relaxed">
          Four annotated artifacts show the shape — the curated roster, the
          floor cadence, the overlay system that renders combat feedback,
          and the game-semantic tokens every visual registry reads from.
        </p>

        <div className="flex flex-col gap-8">
          <CodeBlock
            filePath="src/data/v1-roster.ts"
            caption="the curated 18 monsters / 23 spells / 14 weapons / 6 consumables — each comment explains why the entry earned its slot"
          >{`/**
 * V1 Roster — Curated game content
 *
 * Every entry here is distinct, functional, and intentional.
 * Generators and UI filter against these lists.
 * Nothing outside the roster appears in gameplay.
 *
 * Philosophy: FF GBA / BG1 / Fallout 1 — small scope, everything works.
 */

// ─── Monsters (18 curated from 304) ────────────────────────────
export const V1_MONSTERS = new Set([
  // ─ Floor 1 — CR 0.125–0.25 ─
  'giant-rat',     // 0.125 — mob: vanilla cleanup fodder
  'goblin',        // 0.25  — mob: vanilla flexible attacker
  'skeleton',      // 0.25  — bludgeoning-vulnerable + poison-immune (damage-type teacher)
  'wolf',          // 0.25  — Bite inflicts prone (STR save)

  // ─ Floor 2 — CR 0.5–1 ─
  'shadow',        // 0.5   — resists nonmagical physical, vulnerable to radiant
  'ghoul',         // 1     — Claws inflict paralyzed (CON save)
  'giant-spider',  // 1     — Bite inflicts poisoned (CON save); the poison creature
  // ... 11 more, each carrying one strategy loop the engine actually wires
]);`}
          </CodeBlock>

          <CodeBlock
            filePath="src/data/encounter-config.ts"
            caption="five-floor cadence — CR pools, enemy counts, room-type weights"
          >{`/**
 * Encounter Config — Maps floor tiers to CR pools and enemy counts.
 *
 * Compressed 5-floor cadence — CR climbs fast so a ~10-room run spans
 * floors 1–2 (two bosses); good runs reach floors 3–5.
 */

export interface FloorTier {
  floors: [number, number];
  crPool: number[];
  enemyCount: {
    combat: [number, number];
    elite:  [number, number];
  };
}

export const floorTiers: FloorTier[] = [
  { floors: [1, 1], crPool: [0.125, 0.25], enemyCount: { combat: [2, 3], elite: [1, 2] } },
  { floors: [2, 2], crPool: [0.5,   1],    enemyCount: { combat: [2, 3], elite: [1, 2] } },
  { floors: [3, 3], crPool: [2,     3],    enemyCount: { combat: [2, 3], elite: [1, 2] } },
  // ... floors 4–5
];`}
          </CodeBlock>

          <CodeBlock
            filePath="src/components/game/feedback/TokenFeedbackOverlay.tsx"
            caption="the three-layer overlay system — scrim, family-flourish, result composition"
          >{`'use client';

/**
 * Per-card overlay that consolidates all per-target combat feedback:
 * damage / heal / miss / immune / defend (on the target card) and
 * spell-cast charge-up (on the caster card).
 *
 * Three layers, stacked on the card:
 *   1. Scrim    — dims the card content behind the result
 *   2. Flourish — themed animation (family-color radial pulse, layered)
 *   3. Result   — qualifier ribbon + number-in-glyph
 */

import { onCombatFeedback, type CombatFeedbackEvent } from '@/data/combat-events';
import { DAMAGE_VISUALS, damageColor, damageFamily } from '@/data/damage-visuals';
import { HIT_EVENT_VISUALS } from '@/data/hit-event-visuals';
import {
  FireEmbers, NecroticWisps, HealingMotes, AcidSplash, PhysicalImpact,
  ThunderShockwave, ForcePulse, RadiantBeam,
  // ... one component per damage family
} from './flourishes';

// Subscribes to the combat-event bus, renders the three-layer overlay
// for the duration of the event, then unmounts cleanly.`}
          </CodeBlock>

          <CodeBlock
            filePath="src/game-tokens.css"
            caption="69 game-semantic CSS tokens — the source every TS visual registry reads via var(...)"
          >{`/**
 * game-tokens.css — Game-semantic color tokens
 *
 * TS visual registries reference these via \`var(--token)\` strings —
 * never raw hex. Edit values here, not in TS.
 */

:root {
  /* ─── Damage families ─────────────────────────────────── */
  --damage-physical:    #c4bdb8;
  --damage-fire:        #e8723a;
  --damage-cold:        #5b9bd5;
  --damage-lightning:   #d4c94a;
  --damage-thunder:     #9b7fd4;
  --damage-acid:        #8cc43c;
  --damage-radiant:     #e8c263;
  --damage-necrotic:    #4aba8a;
  --damage-force:       #8b7fd4;
  --damage-healing:     #d45b6e;

  /* ─── Conditions (13 GameConditions + 2 StatusFlags) ─── */
  --condition-paralyzed:     #e0b341;
  --condition-poisoned:      #5bad5a;
  --condition-frightened:    #9b7fd4;
  /* ... + intent, class, schools */
}`}
          </CodeBlock>
        </div>
      </section>

      <CrossLinkSection currentSlug="party-wipe" />
    </main>
  );
}
