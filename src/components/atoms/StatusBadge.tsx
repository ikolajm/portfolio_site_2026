type StatusColor = 'primary' | 'amber';

/**
 * StatusBadge — pulse dot + label. Used on Selected Work cards and case-study
 * hero status lines. Color carries state semantics: primary = live / shipped /
 * validated; amber = in development.
 */
export function StatusBadge({
  label,
  color = 'primary',
}: {
  label: string;
  color?: StatusColor;
}) {
  const dotClass = color === 'amber' ? 'bg-amber-400' : 'bg-primary';
  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden
        className={`h-2 w-2 shrink-0 animate-pulse rounded-full ${dotClass}`}
      />
      <span className="font-mono text-xs uppercase tracking-nav text-on-surface-variant">
        {label}
      </span>
    </div>
  );
}
