import type { CSSProperties } from 'react';

/**
 * Bordered figure container with a fixed aspect ratio. Children render
 * inside; if children is omitted, the `placeholder` string renders in
 * the `[ ... ]` mono telemetry register. Optional `caption` lands below
 * as a `// ` mono comment line.
 */
export function MediaBlock({
  aspect = '16/10',
  caption,
  placeholder,
  children,
}: {
  aspect?: string;
  caption?: string;
  placeholder?: string;
  children?: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className="flex items-center justify-center overflow-hidden rounded-sm border border-outline-subtle bg-surface-1"
        style={{ aspectRatio: aspect } as CSSProperties}
      >
        {children ?? (
          <p className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">
            [ {placeholder} ]
          </p>
        )}
      </div>
      {caption && (
        <figcaption className="font-mono text-xs text-on-surface-variant">
          // {caption}
        </figcaption>
      )}
    </figure>
  );
}
