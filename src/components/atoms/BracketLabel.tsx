export function BracketLabel({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`font-mono text-xs uppercase tracking-nav transition-colors ${
        active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
      }`}
    >
      <span className="opacity-50">[ </span>
      <span
        className={`transition-colors ${
          active ? 'text-primary' : 'group-hover:text-primary'
        }`}
      >
        {children}
      </span>
      <span className="opacity-50"> ]</span>
    </span>
  );
}
