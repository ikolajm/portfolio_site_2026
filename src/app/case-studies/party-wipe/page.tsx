import type { Metadata } from 'next';
import {
  LayoutTemplate,
  Swords,
  Filter,
  Repeat,
  Sparkles,
  Timer,
  Skull,
  Palette,
  PanelsTopLeft,
} from 'lucide-react';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { TagChipList } from '@/components/atoms/TagChip';
import { CodeBlock } from '@/components/atoms/CodeBlock';
import { InlineCode } from '@/components/atoms/InlineCode';
import { MediaBlock } from '@/components/atoms/MediaBlock';
import { CrossLinkSection } from '@/components/atoms/CrossLinkSection';
import { PartsList, type Part } from '@/components/atoms/PartsList';
import { TextLink } from '@/components/atoms/TextLink';
import { StatCards } from '@/components/atoms/StatCards';
import { Reveal } from '@/components/atoms/Reveal';
import { StatusBadge } from '@/components/atoms/StatusBadge';

export const metadata: Metadata = {
  title: 'Party Wipe — Jacob Ikola',
  description:
    'A D&D roguelike — the combat half, no DM required. 18 monsters, 6 classes, three cycling bosses, zone-based tactics, ten themed feedback families.',
};

const ARCH_PARTS: Part[] = [
  {
    icon: LayoutTemplate,
    title: 'Phase-driven UX, no menus',
    body: (
      <p>
        Every game phase is a full-screen takeover with a persistent floating
        HUD. Phases: <InlineCode>room-preview</InlineCode>,{' '}
        <InlineCode>combat</InlineCode>,{' '}
        <InlineCode>loot</InlineCode>,{' '}
        <InlineCode>rest</InlineCode>,{' '}
        <InlineCode>level-up</InlineCode>,{' '}
        <InlineCode>game-over</InlineCode>. No inventory
        menu, no character-sheet dialog opened mid-combat. The current phase{' '}
        <em>is</em> the screen. Removes the rules-research detour that loses
        new players at tabletop.
      </p>
    ),
  },
  {
    icon: Swords,
    title: 'Zone-based combat',
    body: (
      <p>
        Three abstract zones — front, mid, back. Distance determines melee
        (same zone), ranged (adjacent), or far (skip one). No grid tiles, no
        positioning within a zone. The tactical layer is{' '}
        <em>which zone you&apos;re in</em>, not which five-foot square. Loses
        tabletop&apos;s AoE-placement game; gains four-second turns and a
        battlefield that reads in one glance.
      </p>
    ),
  },
  {
    icon: Filter,
    title: 'Curated content as MVP discipline',
    body: (
      <p>
        The D&amp;D 5e SRD ships 304 monsters, 9 classes with 30+ subclasses,
        400+ spells. Party Wipe runs on 18 monsters, 6 classes, 23 spells, 14
        weapons, 6 consumables. Every survivor earns its slot by teaching a
        strategy loop — skeleton&apos;s bludgeoning vulnerability and poison
        immunity make weapon choice matter; mummy&apos;s fire vulnerability
        with a frighten-inflict turns a hard hitter into a softer
        save-or-suck. The trim is a prototype constraint. Breadth comes back
        when the engine&apos;s earned it.
      </p>
    ),
  },
  {
    icon: Repeat,
    title: 'Cycling bosses with multiplicative scaling',
    body: (
      <p>
        Three boss templates — chimera, young black dragon, stone giant —
        cycle by floor and scale multiplicatively. A Floor 3 chimera and a
        Floor 23 chimera are the same fight beat-for-beat, statted bigger.
        Infinite-depth runs sustainable from three boss designs.
      </p>
    ),
  },
  {
    icon: Sparkles,
    title: 'Visual feedback as pedagogy',
    body: (
      <p>
        Combat events flow through one bus{' '}
        (<InlineCode>data/combat-events.ts</InlineCode>) and
        render as full-card overlays on the affected token. Three layers:
        scrim, one of ten family-themed flourishes (fire embers, ice shards,
        lightning forks, and so on), and a result composition
        (number-in-glyph + qualifier ribbon for{' '}
        <InlineCode>CRIT</InlineCode> /{' '}
        <InlineCode>VULNERABLE</InlineCode> /{' '}
        <InlineCode>RESISTED</InlineCode>). A new player
        learns &quot;fire damage on a vulnerable enemy with a critical
        hit&quot; without ever opening a rules reference — every element of
        that read is encoded visually. Sixty-nine CSS tokens feed per-concern
        TS registries (damage, condition, intent, class) that components
        consume via <InlineCode>var(...)</InlineCode>.
      </p>
    ),
  },
];

export default function PartyWipeCaseStudy() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 pt-32 pb-24">
      {/* HERO */}
      <Reveal as="section" aria-label="Hero" className="flex flex-col gap-8">
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

        <div className="flex flex-col gap-3">
          <StatusBadge label="In development · Engine and UI complete" color="amber" />
          <TagChipList chips={['TypeScript', 'Next.js', 'React', 'Framer Motion']} />
        </div>
      </Reveal>

      {/* MEDIABLOCK — visual-led position 2 */}
      <Reveal>
        <MediaBlock
          aspect="16/10"
          placeholder="a single combat moment — Wizard casts burning-hands on a hell-hound; charge-up at the caster, scrim + fire flourish + number-in-glyph + VULNERABLE ribbon on the target"
          caption="same event bus, three structural layers — scrim, flourish, result"
        />
      </Reveal>

      {/* PROBLEM */}
      <Reveal as="section" aria-label="Problem" className="flex flex-col gap-8">
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
      </Reveal>

      {/* ARCHITECTURE */}
      <Reveal as="section" aria-label="Architecture" className="flex flex-col gap-8">
        <SectionAnchor>Architecture</SectionAnchor>
        <p className="text-lg leading-relaxed">
          The game is five things working together.
        </p>

        <PartsList parts={ARCH_PARTS} />

        <p className="text-lg leading-relaxed opacity-80">
          Party Wipe is built on{' '}
          <TextLink href="/case-studies/loom">Loom</TextLink>, the same design-system pipeline behind Paperboy — one
          questionnaire in, two visually distinct products out.
        </p>
      </Reveal>

      {/* DECISIONS */}
      <Reveal as="section" aria-label="Decisions" className="flex flex-col gap-8">
        <SectionAnchor>Decisions</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            <strong>Combat first, story later.</strong>{' '}Most D&amp;D digital
            adaptations render the whole experience: narrative, exploration,
            character relationships, combat. Party Wipe deliberately
            doesn&apos;t. Story tracking is the solved-ish half (wikis,
            objective trees, prepared encounters); combat is where the
            friction lives. Building only the combat half means the engine
            gets sharpened on the actual hard problem before it has to plug
            into a larger system.
          </p>
          <p>
            <strong>Zone abstraction over grid.</strong>{' '}Most digital D&amp;D
            either keeps the grid (BG3, Solasta) or abstracts to text-only
            (most CRPG-likes). Three zones is the middle abstraction that
            preserves positioning as a tactical choice without making turns
            expensive. Newcomers read the battlefield instantly.
          </p>
          <p>
            <strong>Qualifier as field, not event.</strong>{' '}
            <InlineCode>CRIT</InlineCode>,{' '}
            <InlineCode>VULNERABLE</InlineCode>, and{' '}
            <InlineCode>RESISTED</InlineCode> used to fire
            as separate floating popups offset from the damage number.
            Folded them into a{' '}
            <InlineCode>qualifier</InlineCode> field on
            the damage event itself, rendered as a small uppercase ribbon
            anchored above the number-in-glyph. Three events became one.
            The visual hierarchy is identical every time, so the pattern
            becomes recognizable instead of soup.
          </p>
          <p>
            <strong>Visual death decoupled from data death.</strong> Combat
            resolvers flip{' '}
            <InlineCode>isAlive: false</InlineCode>{' '}
            immediately, but{' '}
            <InlineCode>ZoneToken</InlineCode> holds the
            visual alive for 1200ms after a{' '}
            <InlineCode>kill</InlineCode> event — long
            enough for the damage flourish to play through before the card
            grayscales. Five kill paths (player melee, player spell, enemy
            melee, enemy save-AoE, DoT) all emit the same event and get the
            same hold.
          </p>
          <p>
            <strong>One source of truth per visual concern.</strong> Damage,
            condition, intent, and class colors each live as a TS registry
            reading from CSS custom properties in{' '}
            <InlineCode>game-tokens.css</InlineCode>. No
            component owns its own color map. Adding a new damage family is
            one file. Theming a new screen is reading existing tokens. The
            architecture survives expansion when the trimmed content grows
            back to full breadth.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <StatCards
          heading="By the numbers"
          stats={[
            {
              icon: Timer,
              value: '~20m',
              label: 'Run length',
              caption: 'consumable session',
            },
            {
              icon: Skull,
              value: '18',
              label: 'Monsters',
              caption: 'strategy loops',
            },
            {
              icon: Palette,
              value: '10',
              label: 'Feedback families',
              caption: 'themed flourishes',
            },
            {
              icon: PanelsTopLeft,
              value: '0',
              label: 'Menus',
              caption: 'phase is the screen',
            },
          ]}
        />
      </Reveal>

      {/* UNDER THE HOOD */}
      <Reveal as="section" aria-label="Under the Hood" className="flex flex-col gap-8">
        <SectionAnchor>Under the Hood</SectionAnchor>
        <p className="text-lg leading-relaxed">
          The roster is the load-bearing artifact — every monster annotated
          with the strategy loop that earns it a slot.
        </p>

        <div className="flex flex-col gap-8">
          <CodeBlock
            filePath="src/data/v1-roster.ts"
            caption="The curated 18 monsters / 23 spells / 14 weapons / 6 consumables — each comment explains why the entry earned its slot"
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
        </div>
      </Reveal>

      <Reveal>
        <CrossLinkSection currentSlug="party-wipe" />
      </Reveal>
    </main>
  );
}
