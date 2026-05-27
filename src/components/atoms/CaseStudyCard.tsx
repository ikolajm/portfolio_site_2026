import type { CSSProperties } from 'react';
import { CaseStudyCTA } from '@/components/atoms/CaseStudyCTA';
import { TagChipList } from '@/components/atoms/TagChip';

export type Project = {
  slug: string;
  title: string;
  hook: string;
  chips: string[];
  /** Path to the project's logo SVG. Rendered as a soft watermark. */
  logo: string;
};

/**
 * CaseStudyCard — landing-page Selected Work card. The project's own logo
 * sits as an oversized watermark in the bottom-right, bleeding off the
 * card edge in outline-subtle color. Content (title, hook, chips, CTA)
 * sits in front. Status / detail metadata lives on the case-study page —
 * the landing card is for skimming.
 */
export function CaseStudyCard({ project }: { project: Project }) {
  return (
    <article className="card-surface relative overflow-hidden rounded-sm border border-outline-subtle bg-surface-1 p-6 md:p-10">
      {/* Watermark — project logo, large, solid outline-subtle color (same treatment */}
      {/* as the StatCards bleed-off icon), bleeds off the right + bottom edges */}
      <span
        aria-hidden
        className="logo-mask pointer-events-none absolute -bottom-5 -right-5 h-72 w-72 text-outline-subtle md:h-96 md:w-96 opacity-80"
        style={{ '--logo-mask': `url(${project.logo})` } as CSSProperties}
      />

      {/* Content — sits above the watermark */}
      <div className="relative flex flex-col gap-5">
        {/* Title */}
        <h3 className="text-4xl font-semibold leading-tight md:text-5xl">
          {project.title}
        </h3>

        {/* Hook */}
        <p className="max-w-xl text-lg leading-relaxed">{project.hook}</p>

        {/* Chips */}
        <TagChipList chips={project.chips} />

        {/* CTA — its own line, left-aligned so the logo watermark has room on the right */}
        <div className="mt-2 flex justify-start">
          <CaseStudyCTA slug={project.slug} />
        </div>
      </div>
    </article>
  );
}
