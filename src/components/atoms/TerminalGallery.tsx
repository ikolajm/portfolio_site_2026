'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';

export type GalleryEntry = {
  tab: string;
  filePath: string;
  description: ReactNode;
  code: string;
};

/**
 * Swappable code gallery — a tab bar selects one of several pipeline slices;
 * the selected slice shows its description alongside its CodeBlock.
 */
export function TerminalGallery({ entries }: { entries: GalleryEntry[] }) {
  const [active, setActive] = useState(0);
  const current = entries[active];

  return (
    <div className="flex flex-col gap-6">
      {/* tab bar — underline selector, deliberately unlike the code panel */}
      <div className="flex flex-wrap gap-6 border-b border-outline-subtle">
        {entries.map((entry, i) => (
          <button
            key={entry.tab}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`-mb-px cursor-pointer border-b-2 pb-2.5 font-mono text-xs uppercase tracking-nav transition-colors ${
              i === active
                ? 'border-on-surface text-on-surface'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {entry.tab}
          </button>
        ))}
      </div>

      {/* body — description beside the selected code slice */}
      <div className="flex flex-col gap-6">
        <p className="leading-relaxed text-on-surface">
          {current.description}
        </p>
        <CodeBlock key={current.tab} filePath={current.filePath}>
          {current.code}
        </CodeBlock>
      </div>
    </div>
  );
}
