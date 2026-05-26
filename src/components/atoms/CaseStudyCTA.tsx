import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/atoms/Button';

export function CaseStudyCTA({ slug }: { slug: string }) {
  return (
    <Button asChild variant="outline" size="sm" trailingIcon={<ArrowUpRight />}>
      <Link href={`/case-studies/${slug}`}>Read Case Study</Link>
    </Button>
  );
}
