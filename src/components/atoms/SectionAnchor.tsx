export function SectionAnchor({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="font-mono text-xs uppercase tracking-nav opacity-60 whitespace-nowrap">
        <span className="opacity-50">[ </span>
        {children}
        <span className="opacity-50"> ]</span>
      </h2>
      <span
        aria-hidden
        className="section-anchor-line h-px flex-1 origin-left bg-outline-subtle/60"
      />
    </div>
  );
}
