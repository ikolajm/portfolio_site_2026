export function TagChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-outline-subtle px-2 py-0.5 font-mono text-xs uppercase tracking-nav opacity-70">
      {children}
    </span>
  );
}
