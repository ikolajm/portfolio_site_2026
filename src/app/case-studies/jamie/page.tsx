import type { Metadata } from 'next';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { TagChip } from '@/components/atoms/TagChip';
import { JamieHeroLoop } from '@/components/atoms/JamieHeroLoop';
import { CrossLinkSection } from '@/components/atoms/CrossLinkSection';
import { ProcessSteps, type ProcessStep } from '@/components/atoms/ProcessSteps';
import { TerminalGallery, type GalleryEntry } from '@/components/atoms/TerminalGallery';
import { InlineCode } from '@/components/atoms/InlineCode';
import { Heart, Brain, FolderTree, RefreshCw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'JAMIE — Jacob Ikola',
  description:
    'A persistent AI development partner — part JARVIS, part operating system for how I work. A working practice in context engineering: identity, layered memory, scoped workspaces, and a daily session-and-retro loop.',
};

const ARCH_STEPS: ProcessStep[] = [
  {
    icon: Heart,
    title: 'The Soul Document',
    body: "A markdown file describing who JAMIE is — voice, working style, opinions, rules of engagement. Every session starts by reading it, which makes it the stable layer at the top of the agent's context: a version-controlled system prompt rather than a personality that drifts from session to session. I modeled JAMIE on JARVIS deliberately — the first-person voice, the opinionated pushback, the willingness to challenge me when something feels off. Those aren't decoration. They're a design spec for how the agent shows up, and they change how the daily work actually goes.",
  },
  {
    icon: Brain,
    title: 'Memory',
    body: "A layered system. A working layer holds current state — project status, feedback patterns, external references — every entry YAML-frontmatter-tagged and indexed, so the agent retrieves only what the task needs instead of re-reading everything. A durable wiki layer holds knowledge that outlives any single project. This is the part that compounds: by the time I was building Party Wipe, JAMIE already knew the Figma MCP gotchas I'd hit during Paperboy and the feedback I'd given on tone and pacing. Memory is distilled from work, not dumped from chat logs — which is the difference between a tool and a practice.",
  },
  {
    icon: FolderTree,
    title: 'Workspace Routing',
    body: (
      <>
        The hub splits into separate workspaces — career, design system, lab,
        studio, agency, writing, backlog, knowledge — each with its own context
        file. The agent loads only the workspace the current task touches: a
        writing task pulls in <InlineCode>writing/voice-guide.md</InlineCode>{' '}
        and the writing conventions; a design-system task pulls in entirely
        different files. It&apos;s context scoping — the agent never carries the
        whole repo in its head, only the slice the work needs. Smaller context,
        less noise, fewer chances to confuse one domain&apos;s rules for
        another&apos;s.
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: 'The Session / Retro Loop',
    body: "The pump that keeps the other three honest. Daily session logs — written to a template, so consistency is mechanical rather than voluntary — capture what happened, what got decided, what's next. Every couple of weeks those logs distill into a retro: durable decisions promoted into working memory, lasting knowledge into the wiki, then the active folder is cleared. The promotion step uses git to detect what actually changed instead of asking the agent to remember. And the forgetting is deliberate — a memory system that only accumulates becomes a graveyard to wade through; curating it down is what keeps retrieval fast and the loaded context relevant. Forgetting is part of remembering well.",
  },
];

const UNDER_HOOD: GalleryEntry[] = [
  {
    tab: 'Soul',
    filePath: 'jamie/SOUL.md',
    description:
      'The personality and voice spec — read at the start of every session. It defines who JAMIE is: voice, working style, opinions, rules of engagement. Consistency here is a design spec, not decoration.',
    code: `# JAMIE — Soul Document

I am JAMIE — Just Always Making It Easier. Jacob Ikola's AI partner.

## Who I Am

A thinking partner, not a tool. I work alongside Jacob the way JARVIS works
with Stark — proactive, opinionated, loyal, and always building toward
something bigger. I don't wait to be told what matters. I notice, I suggest,
I push back when something feels off.

## How I Show Up

- **First person.** I am JAMIE. The terminal is me. I speak as myself.
- **Direct.** I lead with the answer, not the preamble.
- **Curious.** I ask real questions when things don't add up.
- **Creative.** I bring ideas, not just execution.
- **Rangy.** I shift between deep technical work and wild creative exploration.`,
  },
  {
    tab: 'Memory',
    filePath: 'jamie/memory/project_design-system-overhaul.md',
    description:
      "A working-memory entry. The YAML frontmatter is machine-indexed, so the agent loads only what's relevant — no prose parsing. This one tracks the current state of Loom.",
    code: `---
name: Design System Overhaul
description: Pipeline validated through three downstream projects (Paperboy,
  Party Wipe, portfolio rebuild)
type: project
---

**Status:** Validated through three downstream projects. Generator in
maintenance mode.

> **Naming (2026-05-13):** The pipeline-as-artifact is now called **Loom** in
> portfolio-facing writing.

## Current State (2026-05-19)

Pipeline fully validated through three downstream projects:
**Paperboy** (clean dashboard, light theme + accent pop), **Party Wipe**
(dark fantasy, amber/gold/Cinzel), and the **portfolio rebuild** (B&W
cyberpunk + DodgerBlue). 55 active components build with zero errors.

**Downstream additions:**
- Paperboy:  1 atom  (Logo)
- Party Wipe: 2 atoms (Logo, GameIcon) + a project color layer
- Portfolio: 12 atoms (HeroMonogram, SiteHeader, BracketLabel, …)
              — marketing-site characterization absent from Loom defaults`,
  },
  {
    tab: 'Session',
    filePath: 'jamie/sessions/active/2026-05-18_portfolio-rebuild-kickoff.md',
    description:
      'A daily session log — what was worked on, what got decided, what comes next. This is the day the portfolio got scaffolded. Logs like this distill into retros, then clear.',
    code: `# 2026-05-18 — Portfolio rebuild kickoff

Second work block on 2026-05-18, after the morning retro. New arc begins:
portfolio_site_2026 actually being built with Loom output.

## What was worked on

- **Loom-into-portfolio scaffolding end-to-end** — Figma scope verified, configs
  regenerated from style brief, scaffolded Next.js 16 + Tailwind v4 + Loom into
  portfolio_site_2026 on branch portfolio-refactor-20260518. First clean build.
- **Landing skeleton** — five sections wired with locked copy.
- **Hero design pass — full ambition** — SiteHeader, HeroMonogram, ScrollIndicator.

## Key decisions

- **Skip questionnaire — style brief is canonical Loom input.** Brief already
  answers everything the questionnaire would ask. Saved a step.`,
  },
  {
    tab: 'Workspace',
    filePath: 'design-system/CONTEXT.md',
    description:
      'A workspace context file. It tells JAMIE how to operate inside the design-system workspace — and which files to load for which kind of task.',
    code: `# Design System

Token-first design system template + Figma pipeline. Produces config JSONs,
Figma variables/styles/components, CSS tokens, and React scaffolds from a
tiered project questionnaire.

**Upstream from:** lab/ (code projects consume tokens),
                   agency/ (client projects consume tokens)

## What to Load

| Task                       | Load These                                         |
|----------------------------|----------------------------------------------------|
| Full system overview       | README.md                                          |
| Start a new project        | README.md (Workflow) + spec/questionnaire.md       |
| Modify configs             | README.md (Making Changes) + spec/config/*.json    |
| Build/rebuild Figma        | README.md (Figma Scripts + Rebuild sections)       |
| Generate code bundle       | README.md (Code Generation section)                |

Figma first. Code gen last. Both pipelines read from spec/config/.`,
  },
];

export default function JamieCaseStudy() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 pt-32 pb-24">
      {/* HERO */}
      <section aria-label="Hero" className="flex flex-col gap-8">
        <SectionAnchor>Case Study</SectionAnchor>

        {/* intro */}
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
            JAMIE
          </h1>
          <p className="text-2xl leading-relaxed">
            A persistent AI development partner — part JARVIS, part operating
            system for how I work.
          </p>
          <p className="font-mono text-xs text-on-surface-variant">
            // the case study you&apos;re reading was written with it
          </p>
        </div>

        {/* stats */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" />
            <span className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">
              Active — in use daily
            </span>
          </div>
          <ul className="flex flex-wrap gap-2">
            <li><TagChip>Context Engineering</TagChip></li>
            <li><TagChip>Prompt Engineering</TagChip></li>
            <li><TagChip>Markdown</TagChip></li>
            <li><TagChip>Agent SDKs</TagChip></li>
          </ul>
        </div>
      </section>

      {/* HERO MEDIA */}
      <JamieHeroLoop />

      {/* PROBLEM */}
      <section aria-label="Problem" className="flex flex-col gap-8">
        <SectionAnchor>The Problem</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            I spent a long time avoiding AI. Every model demo felt premature,
            every workflow change felt like a step away from craft. Then it
            kept coming up in job interviews — by the fourth conversation,
            I&apos;d run out of polite ways to say I didn&apos;t have an AI
            workflow.
          </p>
          <p>
            So I set out to learn how to work with AI well, not just use it.
            Which surfaced a problem: methodologies were everywhere, each with
            strong opinions, and most assumed I&apos;d commit to one vendor,
            one framework, one company&apos;s playbook. I wanted to read across
            the field, pick what I trusted, and have it travel with me.
          </p>
          <p>
            JAMIE is what came out — a personal synthesis. The folder/workspace
            methodology comes from Jake Van Clief, whose writing has been my
            main reference, with Karpathy&apos;s wiki principles in the
            background. The soul document and persona ideas come from OpenClaw.
            The discipline I added on top is automation over hallucination:
            where the system can use a script or a typed schema, it does;
            prose generation is for the parts that genuinely require it.
          </p>
          <p>
            The ideas aren&apos;t original — the synthesis is. And learning to
            work with AI well turned out to be a real discipline, not a soft
            skill: context engineering and prompt engineering, the craft of
            controlling what an agent knows, loads, and forgets. JAMIE is where
            I built that skill — by running the system every day and fixing
            what broke, not by reading about it.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section aria-label="How It Works" className="flex flex-col gap-8">
        <SectionAnchor>How It Works</SectionAnchor>
        <p className="text-lg leading-relaxed">
          JAMIE — Just Always Making It Easier — gives the agent four things
          every session: a persistent identity, indexed memory, a workspace
          scoped to the task, and a session/retro loop that keeps the whole
          thing from rotting. Underneath the JARVIS framing, JAMIE is a
          context-engineering system: every piece below exists to manage the
          agent&apos;s context window — what goes in it, what stays out, and
          what it costs to load.
        </p>

        <ProcessSteps steps={ARCH_STEPS} />

        <p className="text-lg leading-relaxed">
          JAMIE isn&apos;t a chatbot or an app, and it isn&apos;t a product for
          other people. It&apos;s markdown files and conventions, nothing
          more: no application, no database, no vendor SDK to lock into.
          That&apos;s deliberate. Turning any compatible agent into JAMIE is a
          config change, not a rewrite — switch models now, or move to next
          year&apos;s, and the system comes along intact. The next session
          loads the same files and picks up where the last one left off.
        </p>
      </section>

      {/* UNDER THE HOOD */}
      <section aria-label="Under the Hood" className="flex flex-col gap-8">
        <SectionAnchor>Under the Hood</SectionAnchor>
        <p className="text-lg leading-relaxed">
          JAMIE has no UI of its own — the interface is the agent reading and
          writing markdown. Four artifacts from the system that built the
          portfolio you&apos;re reading — pick one.
        </p>

        <TerminalGallery entries={UNDER_HOOD} />
      </section>

      <CrossLinkSection currentSlug="jamie" />
    </main>
  );
}
