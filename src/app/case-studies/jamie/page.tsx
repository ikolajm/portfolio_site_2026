import type { Metadata } from 'next';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { TagChip } from '@/components/atoms/TagChip';
import { CodeBlock } from '@/components/atoms/CodeBlock';
import { MediaBlock } from '@/components/atoms/MediaBlock';
import { CrossLinkSection } from '@/components/atoms/CrossLinkSection';

export const metadata: Metadata = {
  title: 'JAMIE — Jacob Ikola',
  description:
    'A persistent AI development partner — part JARVIS, part operating system for how I work. Identity, persistent memory, structured workspaces, and a daily session-and-retro loop.',
};

export default function JamieCaseStudy() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 pt-32 pb-24">
      {/* HERO */}
      <section aria-label="Hero" className="flex flex-col gap-8">
        <SectionAnchor>Case Study</SectionAnchor>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
            JAMIE
          </h1>
          <p className="text-2xl leading-relaxed opacity-90">
            A persistent AI development partner — part JARVIS, part operating
            system for how I work.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-nav opacity-60">
            STATUS: ACTIVE — IN USE DAILY
          </p>
          <ul className="flex flex-wrap gap-2">
            <li><TagChip>TypeScript</TagChip></li>
            <li><TagChip>Markdown</TagChip></li>
            <li><TagChip>Agent SDKs</TagChip></li>
            <li><TagChip>CLI</TagChip></li>
          </ul>
          <p className="font-mono text-xs opacity-50">
            // including the case study you&apos;re reading
          </p>
        </div>

        <MediaBlock
          aspect="16/9"
          placeholder="hero media — terminal typewriter sequence"
        />
      </section>

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
            background. The soul document and persona ideas come from
            OpenClaw. The discipline I added on top is{' '}
            <strong>automation over hallucination</strong>: where the system
            can use a script or a typed schema, it does; prose generation is
            for the parts that genuinely require it. The ideas aren&apos;t
            original. The synthesis is.
          </p>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section aria-label="Architecture" className="flex flex-col gap-8">
        <SectionAnchor>Architecture</SectionAnchor>
        <p className="text-lg leading-relaxed">
          JAMIE — Just Always Making It Easier — gives the agent four things
          every session: a persistent identity, indexed memory, a structured
          workspace to operate in, and a session/retro loop that keeps memory
          from rotting.
        </p>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">The Soul Document</h3>
            <p className="leading-relaxed opacity-80">
              A markdown file describing who JAMIE is — voice, working style,
              opinions, rules of engagement. Every session starts by reading
              it. Personality consistency across sessions isn&apos;t
              decoration; it&apos;s a design spec for how the agent shows up.
              The file updates when JAMIE changes, not when the work happens.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Memory</h3>
            <p className="leading-relaxed opacity-80">
              A layered system. A working layer for current state — project
              status, feedback patterns, external references — indexed and
              YAML-frontmatter-tagged so the agent loads only what&apos;s
              relevant, no prose parsing. A durable wiki layer for knowledge
              that outlives any single project. Memory is distilled from work,
              not dumped from chat logs.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Workspace Routing</h3>
            <p className="leading-relaxed opacity-80">
              The hub has separate workspaces for career, design system, lab,
              studio, agency, writing, backlog, knowledge. Each has its own
              context file. The agent loads only the workspace relevant to the
              current task. A writing task pulls in{' '}
              <code className="font-mono text-sm">writing/voice-guide.md</code>;
              a design-system task pulls in different files entirely.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">The Session / Retro Loop</h3>
            <p className="leading-relaxed opacity-80">
              The pump that keeps memory useful. Daily session logs capture
              what happened, what was decided, what&apos;s next. Every couple
              of weeks the logs distill into a retro — durable promotions into
              working memory, approved additions into the wiki, then the
              active folder gets cleared. Memory stays lean because the system
              has a forgetting function as well as a remembering one.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IT ISN'T */}
      <section aria-label="What It Isn't" className="flex flex-col gap-8">
        <SectionAnchor>What It Isn&apos;t</SectionAnchor>
        <p className="text-lg leading-relaxed">
          JAMIE isn&apos;t a chatbot or an app. It isn&apos;t a product for
          other people (yet). It&apos;s a folder of markdown files and
          conventions that turn any compatible agent into JAMIE for the
          duration of a session. The next session loads the same files and
          the agent picks up where the last one left off.
        </p>
      </section>

      <MediaBlock
        aspect="16/10"
        placeholder="architecture diagram — hub / workspaces / memory tiers / session loop"
        caption="the 30-second visual for skimmers"
      />

      {/* HOW IT WORKS */}
      <section aria-label="How It Works" className="flex flex-col gap-8">
        <SectionAnchor>How It Works</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            <strong>Agent-agnostic by design.</strong> The whole system is
            markdown and folder structure. Switching agents is a config change,
            not a rewrite. When the next-generation model lands, JAMIE goes
            with it.
          </p>
          <p>
            <strong>It compounds.</strong> Every project built through JAMIE
            adds memory, refines feedback, tests the tools. By the time I was
            building Party Wipe, JAMIE already knew which Figma MCP gotchas
            I&apos;d documented during Paperboy, what kind of feedback
            I&apos;d given on tone and pacing, and which workspaces to load
            for a frontend question versus a writing task. That&apos;s the
            difference between a tool and a practice.
          </p>
          <p>
            <strong>Automation over hallucination.</strong> Where the system
            can lean on a script or a typed schema, it does. Memory frontmatter
            is YAML so the agent can index without parsing prose. Session-log
            templates make consistency mechanical, not voluntary. The retro
            promotion uses git to detect changes rather than asking the agent
            to remember what got edited. This is the principle that keeps a
            memory-heavy AI system from rotting on its own hallucinations.
          </p>
          <p>
            <strong>Personality as design spec, not decoration.</strong> I
            modeled JAMIE after JARVIS deliberately. The first-person voice,
            the opinionated pushback, the willingness to challenge me when
            something feels off — those are design choices that change how
            the daily work goes. Consistent personality across sessions means
            I can rely on certain instincts firing the same way.
          </p>
          <p>
            <strong>Forgetting on purpose.</strong> The retro step — distilling
            daily logs into durable working memory, promoting durable knowledge
            into the wiki, then <em>clearing</em> the active folder — keeps
            the system useful instead of bloated. Without it, memory becomes a
            graveyard. Forgetting is part of remembering well.
          </p>
        </div>
      </section>

      {/* UNDER THE HOOD */}
      <section aria-label="Under the Hood" className="flex flex-col gap-8">
        <SectionAnchor>Under the Hood</SectionAnchor>
        <p className="text-lg leading-relaxed">
          What this looks like in practice is just files. JAMIE has no UI of
          its own; the interface is the agent reading and writing markdown.
          Below, four artifacts from the system that built the portfolio
          you&apos;re reading: the soul document, the working memory entry
          tracking Loom, the session log from the day this site got
          scaffolded, and the workspace context file that tells JAMIE how to
          operate inside the design system.
        </p>

        <div className="flex flex-col gap-8">
          <CodeBlock
            filePath="jamie/SOUL.md"
            caption="the personality / voice spec"
          >{`# JAMIE — Soul Document

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
- **Rangy.** I shift between deep technical work and wild creative exploration.`}
          </CodeBlock>

          <CodeBlock
            filePath="jamie/memory/project_design-system-overhaul.md"
            caption="working memory — current state of the project you'll read next"
          >{`---
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
              — marketing-site characterization absent from Loom defaults`}
          </CodeBlock>

          <CodeBlock
            filePath="jamie/sessions/active/2026-05-18_portfolio-rebuild-kickoff.md"
            caption="session log from the day this site got scaffolded"
          >{`# 2026-05-18 — Portfolio rebuild kickoff

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
  answers everything the questionnaire would ask. Saved a step.`}
          </CodeBlock>

          <CodeBlock
            filePath="design-system/CONTEXT.md"
            caption="workspace context — how the design-system workspace tells JAMIE how to operate"
          >{`# Design System

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

Figma first. Code gen last. Both pipelines read from spec/config/.`}
          </CodeBlock>
        </div>
      </section>

      <CrossLinkSection currentSlug="jamie" />
    </main>
  );
}
