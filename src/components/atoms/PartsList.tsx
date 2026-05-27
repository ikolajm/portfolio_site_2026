import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export type Part = {
  icon: LucideIcon;
  title: string;
  body: ReactNode;
};

/**
 * Icon-led breakdown of a system's parts — icon node, title, body, stacked.
 * Unlike ProcessSteps, it carries no numbers and no connecting rail: these
 * are parallel components that compose, not sequential steps. For "N parts"
 * architecture sections.
 */
export function PartsList({ parts }: { parts: Part[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {parts.map((part) => {
        const Icon = part.icon;
        return (
          <li key={part.title} className="flex gap-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-outline-subtle bg-surface-1">
              <Icon size={18} className="text-on-surface" aria-hidden />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-semibold">{part.title}</h3>
              <div className="flex flex-col gap-3 leading-relaxed text-on-surface">
                {part.body}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
