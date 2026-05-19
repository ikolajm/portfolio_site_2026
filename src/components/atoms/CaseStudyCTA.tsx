import Link from 'next/link';
import { BracketLabel } from '@/components/atoms/BracketLabel';

export function CaseStudyCTA({ slug }: { slug: string }) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group mt-6 inline-block"
    >
      <BracketLabel>read case study</BracketLabel>
    </Link>
  );
}
