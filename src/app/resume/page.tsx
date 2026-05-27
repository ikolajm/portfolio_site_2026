import type { Metadata } from 'next';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { TagChipList } from '@/components/atoms/TagChip';
import { Download } from 'lucide-react';
import { Reveal } from '@/components/atoms/Reveal';
import { TextLink } from '@/components/atoms/TextLink';
import { Button } from '@/components/atoms/Button';

export const metadata: Metadata = {
  title: 'Resume — Jacob Ikola',
  description:
    'Design engineer with 6+ years shipping web applications from Figma to production. Design-systems builder, sole-developer product owner.',
};

type Job = {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  technologies: string[];
};

type EducationEntry = {
  institution: string;
  formerlyKnownAs?: string;
  program: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  technologies: string[];
};

/**
 * Inline mirror of career/details.json. Web page + public/resume.txt update
 * together when career data shifts — manual sync (B option per discussion).
 */
const RESUME = {
  name: 'Jacob Ikola',
  title: 'Design Engineer',
  contact: {
    email: 'ikolajm@gmail.com',
    linkedin: { url: 'https://www.linkedin.com/in/jmi/', handle: 'jmi' },
    github: { url: 'https://github.com/ikolajm', handle: 'ikolajm' },
  },
  location: 'Michigan, USA',
  lastUpdated: '2026-05-26',
  summary:
    'Design engineer with 6+ years shipping web applications from Figma to production. Design-systems builder, sole-developer product owner, client-facing engineer — comfortable owning the whole stack and the AI-augmented workflows around it. Range across React, TypeScript, Node.js, and GraphQL.',
  experience: [
    {
      company: 'Independent',
      title: 'Design Engineer',
      location: 'Remote',
      startDate: '2025-08',
      endDate: 'Present',
      highlights: [
        'Built Loom — a token-first design system generator. One JSON spec produces a populated Figma library and a Next.js + Tailwind scaffold, eliminating Figma↔code drift structurally. Validated in production through three downstream projects.',
        'Shipped JAMIE — a programmable AI operating layer for daily engineering work. Identity, memory, sessions, and routing as version-controlled markdown; Anthropic Agent SDK integration; runs across Claude Code, Codex, and Gemini.',
        'Shipped Paperboy and Party Wipe as design-system proofs — Paperboy (daily news dashboard, in daily use) and Party Wipe (D&D combat roguelike), both built end-to-end on Loom’s output.',
        'Frontend motion craft — Three.js / React Three Fiber hero scenes, IntersectionObserver-based scroll-reveal, prefers-reduced-motion discipline, individual transform properties for atom-level animations.',
      ],
      technologies: [
        'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Three.js',
        'React Three Fiber', 'Figma Plugin API', 'Node.js', 'Agent SDKs',
        'Claude Code',
      ],
    },
    {
      company: 'Spectrum Net Designs',
      title: 'Full-Stack Developer, UI Designer',
      location: 'Grand Rapids, MI',
      startDate: '2022-02',
      endDate: '2025-07',
      highlights: [
        "Established a company-wide design system from the ground up — Figma components, reusable libraries, and living documentation — significantly reducing stylistic code bloat across the team's output.",
        'Operated as a 1:1 client-facing developer, leading engagements from requirements through technical architecture and delivery; balanced multiple concurrent client timelines and stakeholder relationships.',
        'Contributed full-stack to Auctioneer Software (SaaS) — React/TypeScript UI, GraphQL resolvers, and PostgreSQL schemas handling bidding data, user management, and auction lifecycle. Shipped through PR-based code review and GitHub Actions CI/CD.',
        "Contributed across the company's broader portfolio of custom software projects beyond direct client work — different stacks, different codebases, as the team needed.",
      ],
      technologies: [
        'HTML', 'SCSS', 'JavaScript', 'React', 'TypeScript', 'GraphQL',
        'SQL', 'Git', 'GitHub', 'GitHub Actions', 'Figma',
      ],
    },
    {
      company: 'Independent Contractor',
      title: 'Design & Development Consultant',
      location: 'Remote',
      startDate: '2021-03',
      endDate: '2022-01',
      highlights: [
        "Designed and built single-page applications for marketing, advertising, and internal office use — solo developer working directly with each project's designer and owner.",
        'Owned the full design-to-development lifecycle — wireframing in Figma, iterating through feedback, and shipping production-ready code to spec.',
        'Identified technical constraints early in design, proposing scalable solutions that prevented rework during implementation.',
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    },
    {
      company: 'PropelUp',
      title: 'Full-Stack Developer',
      location: 'Indianapolis, IN',
      startDate: '2019-05',
      endDate: '2020-07',
      highlights: [
        'Sole developer on a Learning Management System — grew the codebase from zero to a product that software companies beta-tested in production. React, Express, Node.js, PostgreSQL with REST APIs, deployed on Heroku.',
        'Traveled on-site with the sales team to conduct user interviews and deliver live product demos, directly shaping the roadmap from real feedback.',
        'Served as the connective thread between design, engineering, and sales — the only team member with full context across all three.',
      ],
      technologies: [
        'HTML', 'CSS', 'React', 'Node.js', 'Express', 'REST APIs',
        'PostgreSQL', 'Heroku', 'Git', 'GitHub', 'Figma',
      ],
    },
  ] satisfies Job[],
  education: [
    {
      institution: 'Blaizing Academy',
      formerlyKnownAs: 'Eleven Fifty Academy',
      program: 'Full-Stack JavaScript Cohort',
      startDate: '2019-01',
      endDate: '2019-04',
      highlights: [
        'Completed 500+ hours of hands-on training in full-stack development using React, Angular, Node.js, and PostgreSQL.',
        'Collaborated on multiple team projects, applying best practices in clean code, version control, and UI/UX fundamentals.',
        'Awarded the Teamwork Award, voted by peers for collaboration and mentorship.',
      ],
      technologies: ['React', 'Angular', 'Node.js', 'PostgreSQL'],
    },
  ] satisfies EducationEntry[],
  skills: [
    { category: 'Frontend & Code', items: ['CSS', 'Cypress', 'JavaScript', 'Next.js', 'React', 'SCSS', 'Tailwind CSS', 'TypeScript'] },
    { category: 'Backend & Data', items: ['Apollo', 'Docker', 'Express', 'GitHub Actions', 'GraphQL', 'Node.js', 'PostgreSQL', 'REST APIs'] },
    { category: 'Design, Motion & Craft', items: ['Figma', 'Figma Plugin API', 'GSAP', 'Motion.js', 'React Three Fiber', 'Three.js'] },
    { category: 'AI', items: ['Agent SDKs', 'Claude Code', 'ComfyUI', 'Context Engineering', 'Figma Make', 'Prompt Engineering'] },
  ],
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(d: string): string {
  if (d === 'Present') return 'Present';
  const [y, m] = d.split('-');
  return `${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

function CommentLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs text-on-surface-variant">
      // {children}
    </p>
  );
}

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[240px_1fr] md:gap-16">
        {/* SIDEBAR — metadata: contact, location, download */}
        <aside className="flex flex-col gap-8 md:sticky md:top-32 md:self-start">
          <div className="flex flex-col gap-3">
            <CommentLabel>Contact</CommentLabel>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <TextLink href={`mailto:${RESUME.contact.email}`}>
                  {RESUME.contact.email}
                </TextLink>
              </li>
              <li>
                <TextLink href={RESUME.contact.linkedin.url}>
                  linkedin.com/in/{RESUME.contact.linkedin.handle}
                </TextLink>
              </li>
              <li>
                <TextLink href={RESUME.contact.github.url}>
                  github.com/{RESUME.contact.github.handle}
                </TextLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <CommentLabel>Location</CommentLabel>
            <p className="text-sm">{RESUME.location}</p>
          </div>

          <div className="flex flex-col gap-3">
            <CommentLabel>Last Updated</CommentLabel>
            <p className="font-mono text-xs uppercase tracking-nav">
              {RESUME.lastUpdated}
            </p>
          </div>

          <Button asChild variant="outline" size="sm" leadingIcon={<Download />} className="self-start">
            <a href="/resume.pdf" download>Download Resume</a>
          </Button>
        </aside>

        {/* MAIN — hero, experience, education, skills */}
        <div className="flex flex-col gap-16">
          {/* HERO / SUMMARY */}
          <Reveal as="section" aria-label="Summary" className="flex flex-col gap-6">
            <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
              {RESUME.name}
            </h1>
            <p className="text-lg leading-relaxed">{RESUME.summary}</p>
          </Reveal>

          {/* EXPERIENCE */}
          <Reveal as="section" aria-label="Experience" className="flex flex-col gap-8">
            <SectionAnchor>Experience</SectionAnchor>
            <div className="flex flex-col gap-10">
              {RESUME.experience.map((job) => (
                <article
                  key={`${job.company}-${job.startDate}`}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold">{job.company}</h2>
                    <p className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">
                      {job.title} · {formatDate(job.startDate)} – {formatDate(job.endDate)} · {job.location}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2 leading-relaxed">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-3 h-1 w-1 shrink-0 rounded-full bg-on-surface-variant"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <TagChipList chips={job.technologies} />
                </article>
              ))}
            </div>
          </Reveal>

          {/* EDUCATION */}
          <Reveal as="section" aria-label="Education" className="flex flex-col gap-8">
            <SectionAnchor>Education</SectionAnchor>
            <div className="flex flex-col gap-10">
              {RESUME.education.map((edu) => (
                <article key={edu.institution} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold">
                      {edu.institution}
                      {edu.formerlyKnownAs && (
                        <span className="ml-2 text-base font-normal text-on-surface-variant">
                          (formerly {edu.formerlyKnownAs})
                        </span>
                      )}
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">
                      {edu.program} · {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2 leading-relaxed">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-3 h-1 w-1 shrink-0 rounded-full bg-on-surface-variant"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <TagChipList chips={edu.technologies} />
                </article>
              ))}
            </div>
          </Reveal>

          {/* SKILLS */}
          <Reveal as="section" aria-label="Skills" className="flex flex-col gap-8">
            <SectionAnchor>Skills</SectionAnchor>
            <div className="flex flex-col gap-6">
              {RESUME.skills.map(({ category, items }) => (
                <div key={category} className="flex flex-col gap-3">
                  <CommentLabel>{category}</CommentLabel>
                  <TagChipList chips={items} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
