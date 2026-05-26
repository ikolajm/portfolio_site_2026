import type { LucideIcon } from 'lucide-react';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';

export type StatCard = {
  icon: LucideIcon;
  value: string;
  label: string;
  caption?: string;
};

/**
 * Grid of stat cards — each a bordered surface with a faint oversized icon
 * bleeding off the corner and the figure stacked on top. 1-col on mobile,
 * 2×2 from sm up. For "signature numbers" callouts: every card stays
 * co-visible so the set reads at a glance — no carousel. Heading uses
 * SectionAnchor so it shares the [ LABEL ] ──── treatment with every other
 * page section.
 */
export function StatCards({
  heading,
  stats,
}: {
  heading?: string;
  stats: StatCard[];
}) {
  return (
    <section aria-label={heading} className="flex flex-col gap-8">
      {heading && <SectionAnchor>{heading}</SectionAnchor>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="card-surface relative overflow-hidden rounded-sm border border-outline-subtle bg-surface-1 p-6"
            >
              <Icon
                aria-hidden
                size={104}
                strokeWidth={1.25}
                className="pointer-events-none absolute -bottom-5 -right-5 text-outline-subtle"
              />
              <div className="relative flex flex-col gap-1">
                <span className="text-4xl font-semibold leading-display tracking-tight">
                  {s.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-nav opacity-60">
                  {s.label}
                </span>
                {s.caption && (
                  <span className="font-mono text-xs opacity-50">
                    {s.caption}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
