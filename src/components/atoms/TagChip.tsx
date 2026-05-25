export function TagChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-dotted border-secondary px-2 py-0.5 font-mono text-xs uppercase tracking-nav text-secondary">
      {children}
    </span>
  );
}
