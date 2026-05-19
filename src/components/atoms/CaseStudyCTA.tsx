import Link from 'next/link';

export function CaseStudyCTA({ slug }: { slug: string }) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group mt-6 inline-block cursor-pointer font-mono text-xs uppercase tracking-[0.22em] opacity-70 transition-opacity hover:opacity-100"
    >
      <span className="opacity-50">[ </span>
      <span className="transition-colors group-hover:text-primary">read case study</span>
      <span className="opacity-50"> ]</span>
    </Link>
  );
}
