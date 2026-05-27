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
import { CaseStudyCard, type Project } from '@/components/atoms/CaseStudyCard';
import { CompanyLogo } from '@/components/atoms/CompanyLogo';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { Reveal } from '@/components/atoms/Reveal';
import { TextScramble } from '@/components/atoms/TextScramble';

const LANDING_PROJECTS: Project[] = [
  {
    slug: 'jamie',
    title: 'JAMIE',
    hook: 'A persistent AI development partner — part JARVIS, part operating system for how I work.',
    chips: ['Context Engineering', 'Prompt Engineering', 'Agent SDKs', 'TypeScript'],
    logo: '/assets/svg/jamie-logo.svg',
  },
  {
    slug: 'loom',
    title: 'Loom',
    hook: 'I kept burning out building UI foundations, so I built a pipeline that generates them.',
    chips: ['TypeScript', 'Figma Plugin API', 'Tailwind CSS', 'React'],
    logo: '/assets/svg/loom.svg',
  },
  {
    slug: 'paperboy',
    title: 'Paperboy',
    hook: "A daily news dashboard I built so I'd stop opening six apps every morning.",
    chips: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    logo: '/assets/svg/paperboy-logo.svg',
  },
  {
    slug: 'party-wipe',
    title: 'Party Wipe',
    hook: 'A D&D roguelike that captures the scramble of a session going sideways, solo.',
    chips: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    logo: '/assets/svg/party-wipe-logo.svg',
  },
];

export default function Home() {
  return (
    <main>
      <section
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 motion-safe:animate-[load-fade-in_400ms_ease-out_700ms_both]">
          <ScrollIndicator />
        </div>
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
        </Reveal>

        <Reveal
          as="blockquote"
          className="border-l border-outline-subtle pl-6 text-lg leading-relaxed"
        >
          The lanes always blurred. Not by accident — by preference.
        </Reveal>

        <Reveal as="p" className="text-lg leading-relaxed">
          The &quot;systems between&quot; part came from the same friction
          showing up everywhere — handoff drift between design and dev,
          foundation work eating product time, context lost between sessions.
          Lately, building tools to close those gaps has become the main
          work. I built an AI system, and everything in this portfolio runs
          through it — the case studies, the writing, this page. JAMIE is
          the first case study below.
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
          {LANDING_PROJECTS.map((project) => (
            <Reveal key={project.slug}>
              <CaseStudyCard project={project} />
            </Reveal>
          ))}
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
                user interviews and live demos. Only person on the team with
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
