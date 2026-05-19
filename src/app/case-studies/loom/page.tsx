import type { Metadata } from 'next';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { TagChip } from '@/components/atoms/TagChip';
import { CodeBlock } from '@/components/atoms/CodeBlock';
import { MediaBlock } from '@/components/atoms/MediaBlock';
import { CrossLinkSection } from '@/components/atoms/CrossLinkSection';
import { CalloutBlock } from '@/components/atoms/CalloutBlock';

export const metadata: Metadata = {
  title: 'Loom — Jacob Ikola',
  description:
    'A questionnaire-driven design-system pipeline. One JSON source, Figma and React in lockstep — 55 components, zero drift. Used across this portfolio.',
};

export default function LoomCaseStudy() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 pt-32 pb-24">
      {/* HERO */}
      <section aria-label="Hero" className="flex flex-col gap-8">
        <SectionAnchor>Case Study</SectionAnchor>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
            Loom
          </h1>
          <p className="text-2xl leading-relaxed opacity-90">
            I kept burning out building UI foundations, so I built a pipeline
            that generates them.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-nav opacity-60">
            STATUS: ACTIVE — USED ACROSS THIS PORTFOLIO
          </p>
          <ul className="flex flex-wrap gap-2">
            <li><TagChip>TypeScript</TagChip></li>
            <li><TagChip>Figma API</TagChip></li>
            <li><TagChip>Tailwind</TagChip></li>
            <li><TagChip>React</TagChip></li>
          </ul>
          <p className="font-mono text-xs opacity-50">
            // every atom on this page came out of it
          </p>
        </div>

        <MediaBlock
          aspect="16/9"
          placeholder="hero media — Remotion explainer (questionnaire → JSON configs → Figma scripts → components)"
        />
      </section>

      {/* MEDIABLOCK — artifact-first position 2 */}
      <MediaBlock
        aspect="16/10"
        placeholder="same input, two synchronized worlds — Figma file (top) + generated code (bottom), both produced from spec/config/"
        caption="one JSON in, Figma and React out — and they stay in lockstep because they read from the same file"
      />

      {/* PROBLEM */}
      <section aria-label="Problem" className="flex flex-col gap-8">
        <SectionAnchor>The Problem</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            Every time I started a new project the right way — modular UI,
            proper tokens, real components, dark mode, Figma parity — I spent
            the first few weeks on foundation work and never made it to the
            product. The foundation kept eating the project.
          </p>
          <p>
            Design and dev had to be set up twice: once in Figma, once in
            code, with manual translation between them. Every change meant
            updating both worlds and praying they didn&apos;t drift. A primary
            color tweak became a half-day of synchronization. I wanted to
            solve it once — a system where the design tokens, the Figma
            library, and the production code all came out of the same source.
          </p>
          <p>That system is Loom.</p>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section aria-label="Architecture" className="flex flex-col gap-8">
        <SectionAnchor>Architecture</SectionAnchor>
        <p className="text-lg leading-relaxed">
          Loom is five things working in series.
        </p>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">A three-tier questionnaire</h3>
            <p className="leading-relaxed opacity-80">
              Tier 1 sets style direction defaults (product type + style
              direction). Tier 2 is the concrete brand work — primary color,
              font pairing, edge style, spacing density, shadow depth, type
              scale. Tier 3 is overrides for unusual cases. About 10–15
              decisions total. Answerable in a single client conversation or
              a quiet evening at the desk.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Five base config files</h3>
            <p className="leading-relaxed opacity-80">
              The questionnaire answers compile to JSON:{' '}
              <code className="font-mono text-sm">colors.json</code>,{' '}
              <code className="font-mono text-sm">spacing.json</code>,{' '}
              <code className="font-mono text-sm">sizing.json</code>,{' '}
              <code className="font-mono text-sm">typography.json</code>,{' '}
              <code className="font-mono text-sm">effects.json</code>. These
              are the single source of truth. Everything downstream reads
              from them.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Thirty Figma scripts</h3>
            <p className="leading-relaxed opacity-80">
              Paste them into the Plugin API console in order — one
              shared-utils helper, then 29 step scripts. The output is a
              fully-populated Figma file: variables for the entire token
              system, text styles, primitives, semantics, layout templates,
              and 55 component sets. From paste-go to a working Figma library
              is about fifteen minutes.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Thirty code template modules</h3>
            <p className="leading-relaxed opacity-80">
              Orchestrated by{' '}
              <code className="font-mono text-sm">
                scripts/code-templates/orchestrator.js
              </code>
              . Each module owns one component family — Button, Calendar,
              the Radix-wrapped dialogs and menus, the data display set, the
              navigation patterns, the form controls. The templates emit
              React/Tailwind components, Storybook-style stories, an
              interactive playground, and a scaffold deployable to any
              Next.js project.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">
              One <code className="font-mono text-2xl">setup.sh</code>
            </h3>
            <p className="leading-relaxed opacity-80">
              The scaffold ships with a setup script that deploys{' '}
              <code className="font-mono text-sm">tokens.css</code>, the 55
              atoms, the playground, the stories, and the providers directly
              into a target project&apos;s{' '}
              <code className="font-mono text-sm">frontend/src/</code>. No
              intermediate{' '}
              <code className="font-mono text-sm">generated/</code> directory
              in the consuming project — flat path, fewer indirections.
            </p>
          </div>
        </div>

        <p className="text-lg leading-relaxed">
          The key architectural property: all of it reads from the same JSON.
          Change a token in{' '}
          <code className="font-mono text-base">spec/config/</code>,
          regenerate, both worlds update — Figma and code in lockstep. Drift
          isn&apos;t just discouraged; it&apos;s structurally impossible.
        </p>

        <p className="text-lg leading-relaxed opacity-80">
          Loom isn&apos;t a CLI tool published to npm. It isn&apos;t a SaaS
          product. It isn&apos;t trying to be Material Design or Shadcn or a
          competitor to any of them. It&apos;s a private generator for my
          own projects — a way to turn a short questionnaire into a working
          design system instead of six months of foundation work.
        </p>
      </section>

      {/* DECISIONS */}
      <section aria-label="Decisions" className="flex flex-col gap-8">
        <SectionAnchor>Decisions</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            <strong>Config as single source of truth.</strong> Most design
            system pipelines have Figma and code as separate worlds maintained
            in parallel. Designers update Figma; engineers update code; the
            two drift; somebody notices; somebody fixes the drift; the cycle
            repeats. By generating both from the same JSON, the cycle is gone.
            There is no drift to find because there is no second source.
          </p>
          <p>
            <strong>A prototyping system that produces production output.</strong>{' '}
            The usual trade-off is prototype fast OR ship quality. Loom
            produces both. The 55 generated atoms covered 100% of
            Paperboy&apos;s UI — the daily news dashboard — with one atom
            added downstream (a project-specific Logo). For Party Wipe — the
            D&amp;D roguelike — the same 55 atoms produced a totally
            different dark-fantasy aesthetic with two atoms added (Logo +
            GameIcon). Same generator, different brand, production-ready
            output both times.
          </p>
          <p>
            <strong>Components earn their place by being used.</strong> Five
            components have been dropped after real-world validation —
            ScrollArea (overflow-auto was always sufficient), Resizable
            (app-level layout concern, not an atom), InputGroup (composition
            handled it through Input&apos;s icon slots), Stat and ColorPicker
            (in the schemas but never reached for). The pipeline is more
            focused than it was after the first build, not more bloated, and
            each new product makes it a little sharper.
          </p>
          <p>
            <strong>Architecture lessons fed back as fixes.</strong> Three
            playground bugs surfaced during the first Paperboy integration —
            state bleed between stories (fixed with a{' '}
            <code className="font-mono text-sm">key</code>-based remount),
            void elements crashing the playground (fixed with a{' '}
            <code className="font-mono text-sm">resolveIconProps()</code>{' '}
            utility), selection components rendering empty (fixed by baking
            sample items into{' '}
            <code className="font-mono text-sm">defaultProps</code>). The
            flat token path and the functional-category sidebar grouping
            both came from real-world friction during integration. Each fix
            went back into the generator before the next product ran.
          </p>
          <p>
            <strong>The work compounds in durable knowledge.</strong> Four
            wiki pages came out of building Loom — the three-layer
            architecture pattern (Config / CVA / Radix-or-lib), the
            R&amp;D-then-mechanize workflow for any generator, the
            playground/stories integration patterns surfaced during Paperboy,
            and the project-specific color-layer pattern surfaced during
            Party Wipe. Those patterns apply beyond this generator.
          </p>
        </div>
      </section>

      <CalloutBlock eyebrow="The shape of it">
        <p className="text-3xl font-semibold leading-display tracking-tight md:text-4xl">
          One questionnaire in. Two synchronized pipelines out. Zero drift.
        </p>
      </CalloutBlock>

      {/* UNDER THE HOOD */}
      <section aria-label="Under the Hood" className="flex flex-col gap-8">
        <SectionAnchor>Under the Hood</SectionAnchor>
        <p className="text-lg leading-relaxed">
          JSON in, files out. Four slices below show the shape — the config
          everything reads from, one generator template, one Figma step
          script (paste-go into the Plugin API console), and the setup
          script that lands the whole bundle in a target project.
        </p>

        <div className="flex flex-col gap-8">
          <CodeBlock
            filePath="spec/config/base/colors.json"
            caption="the palette + role mapping the rest of the system reads from"
          >{`{
  "$note": "Generated from primary: #1E90FF, secondary: #1E90FF, accent: #1E90FF.
            Neutral tinted from primary hue (210°). Questionnaire is the override
            mechanism — change inputs and regenerate.",
  "palette": {
    "primary":   { "50": "#ecf2f9", "300": "#4da7ff", "500": "#006dd6", ... },
    "secondary": { ... },
    "neutral":   { "5": "#0c0d0e", "15": "#242629", "90": "#e4e6e7", ... },
    "success":   { ... },
    "warning":   { ... },
    "error":     { ... },
    "info":      { ... }
  },
  "roles": {
    "dark":  { "surface": "neutral.10", "on-surface": "neutral.90", ... },
    "light": { "surface": "neutral.95", "on-surface": "neutral.10", ... }
  }
}`}
          </CodeBlock>

          <CodeBlock
            filePath="scripts/code-templates/components/button.js"
            caption="one generator module — Button family"
          >{`const { buildVariantStyles, buildSizeStyles, buildTypographyClasses } = require('../shared');
const { filterSizes, extractIconSizes, buildSizeStylesWithText } = require('./helpers');

function generateButton(name, config, meta) {
  const variantStyles = config.variants ? buildVariantStyles(config.variants) : {};
  const sizes = filterSizes(config.sizes);
  const sizeStyles = buildSizeStylesWithText(sizes, meta.textFamily);
  const iconSizesConfig = filterSizes(config['icon-sizes'] || {});
  const iconSizes = extractIconSizes(sizes);
  const typo = buildTypographyClasses(config);
  // Merge regular sizes and icon-only sizes into one CVA dimension.
  // icon-sm, icon-md, icon-lg are the square icon-only sizes.
  const allSizeEntries = { ...sizeStyles };
  for (const [k, v] of Object.entries(iconSizesConfig)) {
    allSizeEntries[\`icon-\${k}\`] = v;
  }

  return \`import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
// ... emits the full Button.tsx component
\`;
}`}
          </CodeBlock>

          <CodeBlock
            filePath="generated/figma-scripts/01_primitives_color.js"
            caption="one of 29 paste-go scripts — runs in Figma's Plugin API console"
          >{`(async () => {
  const CONFIG = {
    primary:   { "50": "#ecf2f9", "300": "#4da7ff", ... },
    secondary: { ... },
    neutral:   { ... },
    // ...
  };

  const SCOPES = ["FRAME_FILL", "SHAPE_FILL", "TEXT_FILL", "STROKE_COLOR"];
  const collection = figma.variables.createVariableCollection("primitives.color");
  const modeId = collection.modes[0].modeId;
  collection.renameMode(modeId, "default");

  let count = 0;
  for (const [family, shades] of Object.entries(CONFIG)) {
    for (const [shade, hex] of Object.entries(shades)) {
      createVar(
        collection,
        \`color/\${family}/\${shade}\`,
        "COLOR",
        hexToFigmaColor(hex),
        modeId,
        SCOPES,
        \`var(--color-\${family}-\${shade})\`
      );
      count++;
    }
  }

  return \`primitives.color: \${count} variables created\`;
})()`}
          </CodeBlock>

          <CodeBlock
            filePath="generated/scaffold/setup.sh"
            caption="lands tokens.css, the 55 atoms, the playground, and the providers into a target project's frontend/src/"
          >{`#!/bin/bash
# setup.sh — Scaffold design system into a Next.js + Tailwind v4 project.
#
# Usage: ./scaffold/setup.sh <frontend-dir>
# Example: ./scaffold/setup.sh ./frontend
#
# Run from the generated/ directory. Each step is idempotent.

set -euo pipefail

FRONTEND_DIR="\${1:?Usage: setup.sh <frontend-dir>}"
SRC_DIR="$FRONTEND_DIR/src"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
GEN_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "=== Design System Setup ==="
echo "Source:  $GEN_DIR"
echo "Target:  $FRONTEND_DIR"
# ... copies tokens.css, atoms/, providers/, playground, stories
# All idempotent — re-running just overwrites cleanly.`}
          </CodeBlock>
        </div>
      </section>

      <CrossLinkSection currentSlug="loom" />
    </main>
  );
}
