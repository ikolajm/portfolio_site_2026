import {
  SiFigma,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from '@icons-pack/react-simple-icons';
import { HeroMonogram } from '@/components/atoms/HeroMonogram';
import { ScrollIndicator } from '@/components/atoms/ScrollIndicator';
import { CaseStudyCTA } from '@/components/atoms/CaseStudyCTA';
import { TagChip } from '@/components/atoms/TagChip';
import { CompanyLogo } from '@/components/atoms/CompanyLogo';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';

export default function Home() {
  return (
    <main>
      <section
        id="hero"
        aria-label="Hero"
        className="relative min-h-[95vh] overflow-hidden"
      >
        <HeroMonogram className="absolute inset-0" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-32 md:px-12">
            <div className="flex max-w-2xl flex-col gap-4">
              <p className="font-mono text-sm uppercase tracking-eyebrow opacity-60 md:text-base">
                <span className="opacity-50">[ </span>
                Jacob Ikola
                <span className="opacity-50"> ]</span>
              </p>
              <h1 className="text-4xl font-semibold leading-display tracking-tight md:text-5xl">
                Design. Development.
                <br />
                And the systems between.
              </h1>
            </div>
          </div>
        </div>

        <ScrollIndicator className="absolute bottom-8 left-1/2 -translate-x-1/2" />
      </section>

      <div className="mx-auto max-w-3xl px-6">

      <section
        id="about"
        aria-label="About"
        className="flex flex-col gap-12 py-24"
      >
        <SectionAnchor>About</SectionAnchor>

        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            I design, I develop, and somewhere along the way I started building
            the systems between. Most developers pick a lane. I just kept
            adding them.
          </p>
          <p>
            I work best on small teams where the lanes blur. Designer,
            developer, the person on the call — same person. That&apos;s not a
            generalist&apos;s compromise; it&apos;s the only setup where the
            design decisions and the code decisions get made together. Small
            teams, big ownership.
          </p>
          <p>
            That&apos;s been my actual career: at PropelUp it was me and the
            CEO. At Spectrum Net Designs I kickstarted the company&apos;s
            first design system from scratch. Freelancing was all of it at
            once — designer, developer, and the person on every call.
          </p>
        </div>

        <blockquote className="border-l border-outline-subtle pl-6 text-lg font-semibold leading-relaxed">
          The lanes always blurred. Not by accident — by preference.
        </blockquote>

        <p className="text-lg leading-relaxed">
          The &quot;systems between&quot; part came out of that. The same kind
          of friction kept showing up — handoff drift between design and dev,
          foundation work eating product time, context lost between sessions.
          I started building tools to close the gaps. Lately, in my personal
          projects, that&apos;s become the main work. The case studies below
          are some of those tools, and the products I built with them.
        </p>

        <div aria-label="Tools" className="flex flex-col gap-4 pt-4">
          <p className="font-mono text-sm opacity-60">
            // The tools change. The way I work doesn&apos;t.
          </p>
          <ul className="flex flex-wrap items-center gap-6 opacity-80">
            <li><SiReact size={32} title="React" /></li>
            <li><SiTypescript size={32} title="TypeScript" /></li>
            <li><SiNextdotjs size={32} title="Next.js" /></li>
            <li><SiNodedotjs size={32} title="Node.js" /></li>
            <li><SiThreedotjs size={32} title="Three.js" /></li>
            <li><SiTailwindcss size={32} title="Tailwind CSS" /></li>
            <li><SiFigma size={32} title="Figma" /></li>
          </ul>
        </div>
      </section>

      <section
        id="selected-work"
        aria-label="Selected Work"
        className="flex flex-col gap-12 py-24"
      >
        <SectionAnchor>Selected Work</SectionAnchor>

        <div className="flex flex-col gap-6">
          <article className="flex flex-col gap-4 rounded-sm border border-outline-subtle bg-surface-1 p-6 md:p-8">
            <header className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-semibold">JAMIE</h3>
              <span className="font-mono text-xs uppercase tracking-nav opacity-50">01</span>
            </header>
            <p className="text-lg font-medium">
              A persistent AI development partner — part JARVIS, part operating
              system for how I work.
            </p>
            <p className="opacity-80">
              Identity, persistent memory, structured workspaces, and a daily
              session-and-retro loop. Modeled after JARVIS — the personality
              and first-person voice are intentional design choices, not window
              dressing.
            </p>
            <ul className="flex flex-wrap gap-2">
              <li><TagChip>TypeScript</TagChip></li>
              <li><TagChip>Markdown</TagChip></li>
              <li><TagChip>Agent SDKs</TagChip></li>
              <li><TagChip>CLI</TagChip></li>
            </ul>
            <CaseStudyCTA slug="jamie" />
          </article>

          <article className="flex flex-col gap-4 rounded-sm border border-outline-subtle bg-surface-1 p-6 md:p-8">
            <header className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-semibold">Loom</h3>
              <span className="font-mono text-xs uppercase tracking-nav opacity-50">02</span>
            </header>
            <p className="text-lg font-medium">
              I kept burning out building UI foundations, so I built a pipeline
              that generates them.
            </p>
            <p className="opacity-80">
              Brand questionnaire in — tokens, 55 components across 7
              categories, 30 Figma rendering scripts, and a working Next.js
              scaffold out. Change a token, regenerate everything. Figma and
              code stay in sync because they read from the same JSON.
            </p>
            <ul className="flex flex-wrap gap-2">
              <li><TagChip>TypeScript</TagChip></li>
              <li><TagChip>Figma API</TagChip></li>
              <li><TagChip>Tailwind</TagChip></li>
              <li><TagChip>React</TagChip></li>
            </ul>
            <CaseStudyCTA slug="loom" />
          </article>

          <article className="flex flex-col gap-4 rounded-sm border border-outline-subtle bg-surface-1 p-6 md:p-8">
            <header className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-semibold">Paperboy</h3>
              <span className="font-mono text-xs uppercase tracking-nav opacity-50">03</span>
            </header>
            <p className="text-lg font-medium">
              A daily news dashboard I built so I&apos;d stop opening six apps
              every morning.
            </p>
            <p className="opacity-80">
              RSS, ESPN, and TMDB fetched in parallel — ~3 seconds for
              everything. News with two-tier filtering and cross-topic dedup,
              media with podcasts and poster galleries, scores with
              sport-specific game cards (MLB pitchers, F1 timing, UFC
              methodology).
            </p>
            <ul className="flex flex-wrap gap-2">
              <li><TagChip>React</TagChip></li>
              <li><TagChip>TypeScript</TagChip></li>
              <li><TagChip>Next.js</TagChip></li>
              <li><TagChip>Tailwind</TagChip></li>
            </ul>
            <CaseStudyCTA slug="paperboy" />
          </article>

          <article className="flex flex-col gap-4 rounded-sm border border-outline-subtle bg-surface-1 p-6 md:p-8">
            <header className="flex items-baseline justify-between gap-4">
              <h3 className="text-2xl font-semibold">Party Wipe</h3>
              <span className="font-mono text-xs uppercase tracking-nav opacity-50">04</span>
            </header>
            <p className="text-lg font-medium">
              A D&amp;D roguelike — captures the scramble of a session going
              sideways, solo, without needing a DM.
            </p>
            <p className="opacity-80">
              Solo party of four, zone-based combat, procedural dungeons, 5e
              SRD data layer (CC-BY-4.0). Status effect animations are where
              the design work lives — poison fog, frozen overlays, cursed
              glows. Engine and UI done; animations and polish next.
            </p>
            <ul className="flex flex-wrap gap-2">
              <li><TagChip>React</TagChip></li>
              <li><TagChip>TypeScript</TagChip></li>
              <li><TagChip>Next.js</TagChip></li>
              <li><TagChip>Tailwind</TagChip></li>
              <li><TagChip>Three.js</TagChip></li>
            </ul>
            <CaseStudyCTA slug="party-wipe" />
          </article>
        </div>
      </section>

      <section
        id="experience"
        aria-label="Experience"
        className="flex flex-col gap-12 py-24"
      >
        <SectionAnchor>Experience</SectionAnchor>

        <div className="flex flex-col gap-10">
          <article className="flex flex-col gap-4 md:flex-row md:gap-6">
            <CompanyLogo
              src="/assets/svg/auctioneer_software.svg"
              alt="Spectrum Net Designs / Auctioneer Software"
            />
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-2xl font-semibold">Spectrum Net Designs</h3>
              <p className="font-mono text-xs uppercase tracking-nav opacity-60">
                Full-Stack Developer, UI Designer · Feb 2022 – Jul 2025 · Grand Rapids, MI
              </p>
              <p className="opacity-80">
                Built the company&apos;s first design system from scratch — Figma
                components, code libraries, living docs. Ran client projects 1:1
                from requirements through delivery. Contributed full-stack to
                Auctioneer Software across agile sprints: React/TypeScript UI,
                GraphQL resolvers, Postgres schemas for bidding, user management,
                and auction lifecycle.
              </p>
            </div>
          </article>

          <article className="flex flex-col gap-4 md:flex-row md:gap-6">
            <CompanyLogo
              src="/assets/svg/personal_logo_white.svg"
              alt="Independent Contractor — Jacob Ikola"
            />
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-2xl font-semibold">Independent Contractor</h3>
              <p className="font-mono text-xs uppercase tracking-nav opacity-60">
                Design &amp; Development · Mar 2021 – Jan 2022 · Remote
              </p>
              <p className="opacity-80">
                Solo developer on marketing sites and internal SPAs. Owned the
                full loop — Figma wireframes, client feedback, production code.
                The job was catching problems in the design phase so they
                didn&apos;t become expensive in the build phase.
              </p>
            </div>
          </article>

          <article className="flex flex-col gap-4 md:flex-row md:gap-6">
            <CompanyLogo
              src="/assets/svg/propelup.svg"
              alt="PropelUp"
            />
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-2xl font-semibold">PropelUp</h3>
              <p className="font-mono text-xs uppercase tracking-nav opacity-60">
                Full-Stack Developer · May 2019 – Jul 2020 · Indianapolis, IN
              </p>
              <p className="opacity-80">
                Sole developer on a Learning Management System. Took it from zero
                to a product that companies were beta-testing in production.
                React, Express, Node, Postgres, Heroku. Traveled with sales for
                user interviews and live demos. Built the dashboard that became
                the closer in sales conversations. Only person on the team with
                full context across design, engineering, and sales.
              </p>
            </div>
          </article>
        </div>
      </section>

      </div>
    </main>
  );
}
