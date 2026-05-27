export function ScrollIndicator({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none font-mono text-xs uppercase tracking-tag opacity-60 ${className}`}
      aria-hidden
    >
      <span className="opacity-50">{'> '}</span>
      scroll
      <span className="ml-1 inline-block animate-[blink_1.1s_steps(1)_infinite]">_</span>
    </div>
  );
}
