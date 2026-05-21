import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export type ProcessStep = {
  icon: LucideIcon;
  title: string;
  body: ReactNode;
};

/**
 * Vertical numbered process breakdown — an icon node on a connecting rail,
 * a zero-padded index, a title, and a body. For sequential "N things in
 * series" sections. Reusable across case studies.
 */
export function ProcessSteps({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, i) => {
        const Icon = step.icon;
        const last = i === steps.length - 1;
        const num = String(i + 1).padStart(2, '0');
        return (
          <li key={step.title} className="flex gap-5">
            {/* rail — icon node + connecting line */}
            <div className="flex shrink-0 flex-col items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-outline-subtle bg-surface-1">
                <Icon size={18} className="text-on-surface" aria-hidden />
              </div>
              {!last && <div className="w-px flex-1 bg-outline-subtle" />}
            </div>

            {/* content */}
            <div className={last ? 'flex flex-col gap-2' : 'flex flex-col gap-2 pb-10'}>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs tracking-nav text-on-surface-variant">
                  {num}
                </span>
                <h3 className="text-2xl font-semibold">{step.title}</h3>
              </div>
              <p className="leading-relaxed text-on-surface">
                {step.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
