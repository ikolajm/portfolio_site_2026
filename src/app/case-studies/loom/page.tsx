import type { Metadata } from 'next';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { TagChipList } from '@/components/atoms/TagChip';
import { TerminalGallery, type GalleryEntry } from '@/components/atoms/TerminalGallery';
import { PipelineFlow } from '@/components/atoms/PipelineFlow';
import { CrossLinkSection } from '@/components/atoms/CrossLinkSection';
import { ProcessSteps, type ProcessStep } from '@/components/atoms/ProcessSteps';
import { InlineCode } from '@/components/atoms/InlineCode';
import { Reveal } from '@/components/atoms/Reveal';
import { ClipboardList, Braces, Palette, Boxes, Terminal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Loom — Jacob Ikola',
  description:
    'A questionnaire-driven design-system pipeline. One JSON source, Figma and React in lockstep — 55 components, zero drift. Used across this portfolio.',
};

const ARCH_STEPS: ProcessStep[] = [
  {
    icon: ClipboardList,
    title: 'A three-tier questionnaire',
    body: 'Tier 1 sets style direction defaults (product type + style direction). Tier 2 is the concrete brand work — primary color, font pairing, edge style, spacing density, shadow depth, type scale. Tier 3 is overrides for unusual cases. About 10–15 decisions total. Answerable in a single client conversation or a quiet evening at the desk.',
  },
  {
    icon: Braces,
    title: 'Five base config files',
    body: (
      <>
        The questionnaire answers compile to JSON:{' '}
        <InlineCode>colors.json</InlineCode>,{' '}
        <InlineCode>spacing.json</InlineCode>,{' '}
        <InlineCode>sizing.json</InlineCode>,{' '}
        <InlineCode>typography.json</InlineCode>,{' '}
        <InlineCode>effects.json</InlineCode>. These are the
        single source of truth. Everything downstream reads from them.
      </>
    ),
  },
  {
    icon: Palette,
    title: 'Thirty Figma scripts',
    body: 'Paste them into the Plugin API console in order — one shared-utils helper, then 29 step scripts. The output is a fully-populated Figma file: variables for the entire token system, text styles, primitives, semantics, layout templates, and 55 component sets. From paste-go to a working Figma library is about fifteen minutes.',
  },
  {
    icon: Boxes,
    title: 'Thirty code template modules',
    body: (
      <>
        Orchestrated by{' '}
        <InlineCode>
          scripts/code-templates/orchestrator.js
        </InlineCode>
        . Each module owns one component family — Button, Calendar, the
        Radix-wrapped dialogs and menus, the data display set, the navigation
        patterns, the form controls. The templates emit React/Tailwind
        components, Storybook-style stories, an interactive playground, and a
        scaffold deployable to any Next.js project.
      </>
    ),
  },
  {
    icon: Terminal,
    title: 'One setup.sh',
    body: (
      <>
        The scaffold ships with a setup script that deploys{' '}
        <InlineCode>tokens.css</InlineCode>, the 55 atoms,
        the playground, the stories, and the providers directly into a target
        project&apos;s <InlineCode>frontend/src/</InlineCode>.
        No intermediate <InlineCode>generated/</InlineCode>{' '}
        directory in the consuming project — flat path, fewer indirections.
      </>
    ),
  },
];

const UNDER_HOOD: GalleryEntry[] = [
  {
    tab: 'Config',
    filePath: 'spec/config/base/colors.json',
    description: (
      <>
        The single source of truth. The questionnaire compiles to five JSON
        files — this is{' '}
        <InlineCode>colors.json</InlineCode>, the palette and
        role mapping every downstream step reads from.
      </>
    ),
    code: `{
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
}`,
  },
  {
    tab: 'Generator',
    filePath: 'scripts/code-templates/components/button.js',
    description:
      "One of thirty generator modules. Each owns a component family and emits its React/Tailwind component, stories, and playground entry — this one builds the Button family.",
    code: `const { buildVariantStyles, buildSizeStyles, buildTypographyClasses } = require('../shared');
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
}`,
  },
  {
    tab: 'Figma script',
    filePath: 'generated/figma-scripts/01_primitives_color.js',
    description:
      "One of twenty-nine paste-go scripts. Run in order in Figma's Plugin API console, they build the variables, text styles, and component sets — this one creates the colour primitives.",
    code: `(async () => {
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
})()`,
  },
  {
    tab: 'Setup',
    filePath: 'generated/scaffold/setup.sh',
    description: (
      <>
        The last mile. The scaffold ships with this script — it deploys{' '}
        <InlineCode>tokens.css</InlineCode>, the 55 atoms,
        the playground, and the providers straight into a target
        project&apos;s <InlineCode>frontend/src/</InlineCode>.
      </>
    ),
    code: `#!/bin/bash
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
# All idempotent — re-running just overwrites cleanly.`,
  },
];

export default function LoomCaseStudy() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 pt-32 pb-24">
      {/* HERO */}
      <Reveal as="section" aria-label="Hero" className="flex flex-col gap-8">
        <SectionAnchor>Case Study</SectionAnchor>

        {/* intro */}
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
            Loom
          </h1>
          <p className="text-2xl leading-relaxed">
            I kept burning out building UI foundations, so I built a pipeline
            that generates them.
          </p>
          <p className="font-mono text-xs text-on-surface-variant">
            // every atom on this page came out of it
          </p>
        </div>

        {/* stats */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">
              Active — used across this portfolio
            </span>
          </div>
          <TagChipList chips={['TypeScript', 'Figma API', 'Tailwind', 'React']} />
        </div>

      </Reveal>

      {/* PIPELINE DIAGRAM — questionnaire in, two synchronized worlds out */}
      <Reveal>
        <PipelineFlow />
      </Reveal>

      {/* PROBLEM */}
      <Reveal as="section" aria-label="Problem" className="flex flex-col gap-8">
        <SectionAnchor>The Problem</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            Every time I started a new project the right way — modular UI,
            proper tokens, real components, dark mode, Figma parity — I spent
            the first few weeks on foundation work and never made it to the
            product.
          </p>
          <blockquote className="border-l border-outline-subtle pl-6">
            The foundation kept eating the project.
          </blockquote>
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
      </Reveal>

      {/* ARCHITECTURE */}
      <Reveal as="section" aria-label="Architecture" className="flex flex-col gap-8">
        <SectionAnchor>Architecture</SectionAnchor>
        <p className="text-lg leading-relaxed">
          Loom is five things working in series.
        </p>

        <ProcessSteps steps={ARCH_STEPS} />

        <p className="text-lg leading-relaxed">
          The key architectural property: all of it reads from the same JSON.
          Change a token in{' '}
          <InlineCode>spec/config/</InlineCode>,
          regenerate, both worlds update — Figma and code in lockstep.
        </p>

        <blockquote className="border-l border-outline-subtle pl-6 text-lg leading-relaxed">
          Drift isn&apos;t just discouraged — it&apos;s structurally
          impossible. There is no second source to drift from.
        </blockquote>

        <p className="text-lg leading-relaxed">
          Loom isn&apos;t a CLI tool published to npm. It isn&apos;t a SaaS
          product. It isn&apos;t trying to be Material Design or Shadcn or a
          competitor to any of them. It&apos;s a private generator for my
          own projects — a way to turn a short questionnaire into a working
          design system instead of six months of foundation work.
        </p>
      </Reveal>

      {/* UNDER THE HOOD */}
      <Reveal as="section" aria-label="Under the Hood" className="flex flex-col gap-8">
        <SectionAnchor>Under the Hood</SectionAnchor>
        <p className="text-lg leading-relaxed">
          JSON in, files out. The four slices below show the shape of the
          pipeline end to end — pick one.
        </p>

        <TerminalGallery entries={UNDER_HOOD} />
      </Reveal>

      <Reveal>
        <CrossLinkSection currentSlug="loom" />
      </Reveal>
    </main>
  );
}
