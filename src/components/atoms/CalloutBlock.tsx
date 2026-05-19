/**
 * Bordered surface with a mono telemetry eyebrow on top and any content
 * below. Used for thesis lockups (single display sentence) and stat
 * grids (when paired with <StatGrid> children).
 */
export function CalloutBlock({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={eyebrow}
      className="flex flex-col gap-6 rounded-sm border border-outline-subtle bg-surface-1 p-8"
    >
      <p className="font-mono text-xs uppercase tracking-nav opacity-60">
        {eyebrow}
      </p>
      {children}
    </section>
  );
}
