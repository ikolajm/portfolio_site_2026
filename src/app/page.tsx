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
import { TagChipList } from '@/components/atoms/TagChip';
import { CompanyLogo } from '@/components/atoms/CompanyLogo';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { JamieHeroLoop } from '@/components/atoms/JamieHeroLoop';
import { PipelineFlow } from '@/components/atoms/PipelineFlow';
import { Reveal } from '@/components/atoms/Reveal';
import { TextScramble } from '@/components/atoms/TextScramble';

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
              <Reveal
                as="p"
                className="font-mono text-sm uppercase tracking-eyebrow text-on-surface-variant md:text-base"
              >
                <TextScramble>[ Jacob Ikola ]</TextScramble>
              </Reveal>
              <Reveal
                as="h1"
                delay={100}
                className="text-4xl font-semibold leading-display tracking-tight md:text-5xl"
              >
                Design. Development.
                <br />
                And the systems between.
              </Reveal>
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
        <Reveal>
          <SectionAnchor>About</SectionAnchor>
        </Reveal>

        <Reveal className="flex flex-col gap-6 text-lg leading-relaxed">
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
        </Reveal>

        <Reveal
          as="blockquote"
          className="border-l border-outline-subtle pl-6 text-lg leading-relaxed"
        >
          The lanes always blurred. Not by accident — by preference.
        </Reveal>

        <Reveal as="p" className="text-lg leading-relaxed">
          The &quot;systems between&quot; part came out of that. The same kind
          of friction kept showing up — handoff drift between design and dev,
          foundation work eating product time, context lost between sessions.
          I started building tools to close the gaps. Lately, in my personal
          projects, that&apos;s become the main work.
        </Reveal>

        <Reveal as="p" className="text-lg leading-relaxed">
          I built an AI system, and everything in this portfolio runs through
          it — the case studies, the writing, this page. I spent years
          avoiding AI; when I finally took it on, I wanted it to be a practice,
          not a habit. Working with it well is a real discipline now — context
          engineering — and JAMIE is my answer to it. It&apos;s the first case
          study below.
        </Reveal>

        <div aria-label="Tools" className="flex flex-col gap-4 pt-4">
          <Reveal as="p" className="font-mono text-sm text-on-surface-variant">
            // The tools change. The way I work doesn&apos;t.
          </Reveal>
          <ul className="flex flex-wrap items-center gap-6 text-on-surface-variant">
            <Reveal as="li" delay={0} className="transition-colors duration-150 hover:text-on-surface">
              <SiReact size={32} title="React" />
            </Reveal>
            <Reveal as="li" delay={45} className="transition-colors duration-150 hover:text-on-surface">
              <SiTypescript size={32} title="TypeScript" />
            </Reveal>
            <Reveal as="li" delay={90} className="transition-colors duration-150 hover:text-on-surface">
              <SiNextdotjs size={32} title="Next.js" />
            </Reveal>
            <Reveal as="li" delay={135} className="transition-colors duration-150 hover:text-on-surface">
              <SiNodedotjs size={32} title="Node.js" />
            </Reveal>
            <Reveal as="li" delay={180} className="transition-colors duration-150 hover:text-on-surface">
              <SiThreedotjs size={32} title="Three.js" />
            </Reveal>
            <Reveal as="li" delay={225} className="transition-colors duration-150 hover:text-on-surface">
              <SiTailwindcss size={32} title="Tailwind CSS" />
            </Reveal>
            <Reveal as="li" delay={270} className="transition-colors duration-150 hover:text-on-surface">
              <SiFigma size={32} title="Figma" />
            </Reveal>
          </ul>
        </div>
      </section>

      <section
        id="selected-work"
        aria-label="Selected Work"
        className="flex flex-col gap-12 py-24"
      >
        <Reveal>
          <SectionAnchor>Selected Work</SectionAnchor>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal>
            <article className="flex flex-col overflow-hidden rounded-sm border border-outline-subtle bg-surface-1">
              <JamieHeroLoop framed={false} />
              <div className="flex flex-col gap-4 p-6 md:p-8">
                <header className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-semibold">JAMIE</h3>
                  <span className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">01</span>
                </header>
                <p className="text-lg font-medium">
                  A persistent AI development partner — part JARVIS, part
                  operating system for how I work.
                </p>
                <p>
                  Identity, persistent memory, structured workspaces, and a daily
                  session-and-retro loop. Modeled after JARVIS — the personality
                  and first-person voice are intentional design choices, not
                  window dressing.
                </p>
                <TagChipList chips={['Context Engineering', 'Prompt Engineering', 'Agent SDKs']} />
                <CaseStudyCTA slug="jamie" />
              </div>
            </article>
          </Reveal>

          <Reveal>
            <article className="flex flex-col overflow-hidden rounded-sm border border-outline-subtle bg-surface-1">
              <PipelineFlow framed={false} />
              <div className="flex flex-col gap-4 p-6 md:p-8">
                <header className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-semibold">Loom</h3>
                  <span className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">02</span>
                </header>
                <p className="text-lg font-medium">
                  I kept burning out building UI foundations, so I built a
                  pipeline that generates them.
                </p>
                <p>
                  Brand questionnaire in — tokens, 55 components across 7
                  categories, 30 Figma rendering scripts, and a working Next.js
                  scaffold out. Change a token, regenerate everything. Figma and
                  code stay in sync because they read from the same JSON.
                </p>
                <TagChipList chips={['TypeScript', 'Figma API', 'Tailwind', 'React']} />
                <CaseStudyCTA slug="loom" />
              </div>
            </article>
          </Reveal>

          <Reveal>
            <article className="flex flex-col gap-4 rounded-sm border border-outline-subtle bg-surface-1 p-6 md:p-8">
              <header className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold">Paperboy</h3>
                <span className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">03</span>
              </header>
              <p className="text-lg font-medium">
                A daily news dashboard I built so I&apos;d stop opening six apps
                every morning.
              </p>
              <p>
                RSS, ESPN, and TMDB fetched in parallel — ~3 seconds for
                everything. News with two-tier filtering and cross-topic dedup,
                media with podcasts and poster galleries, scores with
                sport-specific game cards (MLB pitchers, F1 timing, UFC
                methodology).
              </p>
              <TagChipList chips={['React', 'TypeScript', 'Next.js', 'Tailwind']} />
              <CaseStudyCTA slug="paperboy" />
            </article>
          </Reveal>

          <Reveal>
            <article className="flex flex-col gap-4 rounded-sm border border-outline-subtle bg-surface-1 p-6 md:p-8">
              <header className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold">Party Wipe</h3>
                <span className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">04</span>
              </header>
              <p className="text-lg font-medium">
                A D&amp;D roguelike — captures the scramble of a session going
                sideways, solo, without needing a DM.
              </p>
              <p>
                Solo party of four, zone-based combat, procedural dungeons, 5e
                SRD data layer (CC-BY-4.0). Status effect animations are where
                the design work lives — poison fog, frozen overlays, cursed
                glows. Engine and UI done; animations and polish next.
              </p>
              <TagChipList chips={['React', 'TypeScript', 'Next.js', 'Tailwind', 'Three.js']} />
              <CaseStudyCTA slug="party-wipe" />
            </article>
          </Reveal>
        </div>
      </section>

      <section
        id="experience"
        aria-label="Experience"
        className="flex flex-col gap-12 py-24"
      >
        <Reveal>
          <SectionAnchor>Experience</SectionAnchor>
        </Reveal>

        <div className="flex flex-col gap-10">
          <Reveal as="article" className="flex flex-col gap-4 md:flex-row md:gap-6">
            <CompanyLogo
              src="/assets/svg/auctioneer_software.svg"
              alt="Spectrum Net Designs / Auctioneer Software"
            />
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-2xl font-semibold">Spectrum Net Designs</h3>
              <p className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">
                Full-Stack Developer, UI Designer · Feb 2022 – Jul 2025 · Grand Rapids, MI
              </p>
              <p>
                Built the company&apos;s first design system from scratch — Figma
                components, code libraries, living docs. Ran client projects 1:1
                from requirements through delivery. Contributed full-stack to
                Auctioneer Software across agile sprints: React/TypeScript UI,
                GraphQL resolvers, Postgres schemas for bidding, user management,
                and auction lifecycle.
              </p>
            </div>
          </Reveal>

          <Reveal as="article" className="flex flex-col gap-4 md:flex-row md:gap-6">
            <CompanyLogo
              src="/assets/svg/personal_logo_white.svg"
              alt="Independent Contractor — Jacob Ikola"
            />
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-2xl font-semibold">Independent Contractor</h3>
              <p className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">
                Design &amp; Development · Mar 2021 – Jan 2022 · Remote
              </p>
              <p>
                Solo developer on marketing sites and internal SPAs. Owned the
                full loop — Figma wireframes, client feedback, production code.
                The job was catching problems in the design phase so they
                didn&apos;t become expensive in the build phase.
              </p>
            </div>
          </Reveal>

          <Reveal as="article" className="flex flex-col gap-4 md:flex-row md:gap-6">
            <CompanyLogo
              src="/assets/svg/propelup.svg"
              alt="PropelUp"
            />
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-2xl font-semibold">PropelUp</h3>
              <p className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">
                Full-Stack Developer · May 2019 – Jul 2020 · Indianapolis, IN
              </p>
              <p>
                Sole developer on a Learning Management System. Took it from zero
                to a product that companies were beta-testing in production.
                React, Express, Node, Postgres, Heroku. Traveled with sales for
                user interviews and live demos. Built the dashboard that became
                the closer in sales conversations. Only person on the team with
                full context across design, engineering, and sales.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      </div>
    </main>
  );
}
