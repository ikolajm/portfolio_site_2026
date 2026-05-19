import { HeroMonogram } from '@/components/atoms/HeroMonogram';
import { ScrollIndicator } from '@/components/atoms/ScrollIndicator';
import { CaseStudyCTA } from '@/components/atoms/CaseStudyCTA';

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
            <div className="max-w-2xl">
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] opacity-60">
                <span className="opacity-50">[ </span>
                Jacob Ikola
                <span className="opacity-50"> ]</span>
              </p>
              <h1 className="text-3xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl">
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

      <section id="about" aria-label="About" className="py-24 space-y-6 text-lg leading-relaxed">
        <p>
          I design, I develop, and somewhere along the way I started building
          the systems between. Most developers pick a lane. I just kept adding
          them.
        </p>
        <p>
          I work best on small teams where the lanes blur. Designer, developer,
          the person on the call — same person. That&apos;s not a
          generalist&apos;s compromise; it&apos;s the only setup where the
          design decisions and the code decisions get made together. Small
          teams, big ownership.
        </p>
        <p>
          That&apos;s been my actual career: at PropelUp it was me and the CEO.
          At Spectrum Net Designs I kickstarted the company&apos;s first design
          system from scratch. Freelancing was all of it at once — designer,
          developer, and the person on every call.
        </p>
        <p>The lanes always blurred. Not by accident — by preference.</p>
        <p>
          The &quot;systems between&quot; part came out of that. The same kind
          of friction kept showing up — handoff drift between design and dev,
          foundation work eating product time, context lost between sessions. I
          started building tools to close the gaps. Lately, in my personal
          projects, that&apos;s become the main work. The case studies below
          are some of those tools, and the products I built with them.
        </p>

        <div aria-label="Tools strip" className="pt-12">
          <ul className="flex flex-wrap items-center gap-6 opacity-70">
            <li>React</li>
            <li>TypeScript</li>
            <li>Next.js</li>
            <li>Node</li>
            <li>Figma</li>
            <li>Tailwind</li>
            <li>Three.js</li>
          </ul>
          <p className="mt-4 text-sm opacity-60">
            The tools change. The way I work doesn&apos;t.
          </p>
        </div>
      </section>

      <section id="selected-work" aria-label="Selected Work" className="py-24">
        <h2 className="mb-12 text-3xl font-semibold">Selected Work</h2>
        <div className="space-y-12">
          <article>
            <h3 className="text-xl font-semibold">JAMIE</h3>
            <p className="mt-2 text-lg font-medium">
              A persistent AI development partner — part JARVIS, part operating
              system for how I work.
            </p>
            <p className="mt-3 opacity-80">
              Identity, persistent memory, structured workspaces, and a daily
              session-and-retro loop. Modeled after JARVIS — the personality
              and first-person voice are intentional design choices, not window
              dressing.
            </p>
            <ul className="mt-3 flex flex-wrap gap-3 text-sm opacity-70">
              <li>TypeScript</li>
              <li>Markdown</li>
              <li>Agent SDKs</li>
              <li>CLI</li>
            </ul>
            <CaseStudyCTA slug="jamie" />
          </article>

          <article>
            <h3 className="text-xl font-semibold">Loom</h3>
            <p className="mt-2 text-lg font-medium">
              I kept burning out building UI foundations, so I built a pipeline
              that generates them.
            </p>
            <p className="mt-3 opacity-80">
              Brand questionnaire in — tokens, 55 components across 7
              categories, 30 Figma rendering scripts, and a working Next.js
              scaffold out. Change a token, regenerate everything. Figma and
              code stay in sync because they read from the same JSON.
            </p>
            <ul className="mt-3 flex flex-wrap gap-3 text-sm opacity-70">
              <li>TypeScript</li>
              <li>Figma API</li>
              <li>Tailwind</li>
              <li>React</li>
            </ul>
            <CaseStudyCTA slug="loom" />
          </article>

          <article>
            <h3 className="text-xl font-semibold">Paperboy</h3>
            <p className="mt-2 text-lg font-medium">
              A daily news dashboard I built so I&apos;d stop opening six apps
              every morning.
            </p>
            <p className="mt-3 opacity-80">
              RSS, ESPN, and TMDB fetched in parallel — ~3 seconds for
              everything. News with two-tier filtering and cross-topic dedup,
              media with podcasts and poster galleries, scores with
              sport-specific game cards (MLB pitchers, F1 timing, UFC
              methodology).
            </p>
            <ul className="mt-3 flex flex-wrap gap-3 text-sm opacity-70">
              <li>React</li>
              <li>TypeScript</li>
              <li>Next.js</li>
              <li>Tailwind</li>
            </ul>
            <CaseStudyCTA slug="paperboy" />
          </article>

          <article>
            <h3 className="text-xl font-semibold">Party Wipe</h3>
            <p className="mt-2 text-lg font-medium">
              A D&amp;D roguelike — captures the scramble of a session going
              sideways, solo, without needing a DM.
            </p>
            <p className="mt-3 opacity-80">
              Solo party of four, zone-based combat, procedural dungeons, 5e
              SRD data layer (CC-BY-4.0). Status effect animations are where
              the design work lives — poison fog, frozen overlays, cursed
              glows. Engine and UI done; animations and polish next.
            </p>
            <ul className="mt-3 flex flex-wrap gap-3 text-sm opacity-70">
              <li>React</li>
              <li>TypeScript</li>
              <li>Next.js</li>
              <li>Tailwind</li>
              <li>Three.js</li>
            </ul>
            <CaseStudyCTA slug="party-wipe" />
          </article>
        </div>
      </section>

      <section id="experience" aria-label="Experience" className="py-24">
        <h2 className="mb-12 text-3xl font-semibold">Experience</h2>
        <div className="space-y-10">
          <article>
            <h3 className="text-xl font-semibold">Spectrum Net Designs</h3>
            <p className="text-sm opacity-70">
              Full-Stack Developer, UI Designer · Feb 2022 – Jul 2025 · Grand
              Rapids, MI
            </p>
            <p className="mt-3 opacity-80">
              Built the company&apos;s first design system from scratch — Figma
              components, code libraries, living docs. Ran client projects 1:1
              from requirements through delivery. Contributed full-stack to
              Auctioneer Software across agile sprints: React/TypeScript UI,
              GraphQL resolvers, Postgres schemas for bidding, user management,
              and auction lifecycle.
            </p>
          </article>

          <article>
            <h3 className="text-xl font-semibold">Independent Contractor</h3>
            <p className="text-sm opacity-70">
              Design &amp; Development · Mar 2021 – Jan 2022 · Remote
            </p>
            <p className="mt-3 opacity-80">
              Solo developer on marketing sites and internal SPAs. Owned the
              full loop — Figma wireframes, client feedback, production code.
              The job was catching problems in the design phase so they
              didn&apos;t become expensive in the build phase.
            </p>
          </article>

          <article>
            <h3 className="text-xl font-semibold">PropelUp</h3>
            <p className="text-sm opacity-70">
              Full-Stack Developer · May 2019 – Jul 2020 · Indianapolis, IN
            </p>
            <p className="mt-3 opacity-80">
              Sole developer on a Learning Management System. Took it from zero
              to a product that companies were beta-testing in production.
              React, Express, Node, Postgres, Heroku. Traveled with sales for
              user interviews and live demos. Built the dashboard that became
              the closer in sales conversations. Only person on the team with
              full context across design, engineering, and sales.
            </p>
          </article>
        </div>
      </section>

      <footer
        id="footer"
        aria-label="Contact"
        className="border-t border-outline-subtle py-16"
      >
        <p className="text-2xl font-semibold">Always open to a new hat.</p>
        <p className="mt-3 opacity-80">
          Design Engineering, Full Stack Development — or something that
          doesn&apos;t <em>quite</em> fit one job description.
        </p>
        <ul className="mt-6 flex flex-wrap gap-6">
          <li>
            <a href="mailto:ikolajm@gmail.com">Email</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/jacob-ikola">LinkedIn</a>
          </li>
          <li>
            <a href="https://github.com/ikolajm">GitHub</a>
          </li>
          <li>
            <a href="#">Resume</a>
          </li>
        </ul>
      </footer>
      </div>
    </main>
  );
}
