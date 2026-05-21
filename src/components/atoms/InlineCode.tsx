import type { ReactNode } from 'react';

/**
 * Inline code / file / variable mention — a distinct mono chip that sets the
 * reference apart from surrounding prose. Size is proportional (em) so it
 * scales to whatever text it sits in.
 */
export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-on-surface">
      {children}
    </code>
  );
}
