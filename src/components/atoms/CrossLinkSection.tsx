import Link from 'next/link';
import { BracketLabel } from '@/components/atoms/BracketLabel';
import { CompanyLogo } from '@/components/atoms/CompanyLogo';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { CASE_STUDIES } from '@/data/case-studies';

export function CrossLinkSection({ currentSlug }: { currentSlug: string }) {
  const others = CASE_STUDIES.filter((cs) => cs.slug !== currentSlug);

  return (
    <section aria-label="More case studies" className="flex flex-col gap-12">
      <SectionAnchor>More Case Studies</SectionAnchor>

      <div className="flex flex-col gap-10">
        {others.map((cs) => (
          <article key={cs.slug} className="flex flex-col gap-4 md:flex-row md:gap-6">
            {cs.badge.kind === 'logo' ? (
              <CompanyLogo src={cs.badge.src} alt={`${cs.name} logo`} />
            ) : (
              <div className="card-surface flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border border-outline-subtle bg-surface-1 md:h-28 md:w-28">
                <span className="font-mono text-2xl tracking-nav opacity-70 md:text-3xl">
                  {cs.index}
                </span>
              </div>
            )}
            <div className="flex flex-1 flex-col gap-3">
              <h3 className="text-2xl font-semibold">{cs.name}</h3>
              <p className="opacity-80">{cs.blurb}</p>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group mt-2 inline-block self-start"
              >
                <BracketLabel>read case study</BracketLabel>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
