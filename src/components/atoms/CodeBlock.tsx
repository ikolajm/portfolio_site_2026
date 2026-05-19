export function CodeBlock({
  filePath,
  caption,
  children,
}: {
  filePath: string;
  caption?: string;
  children: string;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-sm border border-outline-subtle bg-surface-1">
        <div className="flex items-center gap-2 border-b border-outline-subtle bg-surface-2/40 px-4 py-2 font-mono text-xs uppercase tracking-nav opacity-70">
          <span className="opacity-50">{'> '}</span>
          {filePath}
        </div>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-on-surface-variant">
          <code>{children}</code>
        </pre>
      </div>
      {caption && (
        <figcaption className="font-mono text-xs opacity-60">
          // {caption}
        </figcaption>
      )}
    </figure>
  );
}
