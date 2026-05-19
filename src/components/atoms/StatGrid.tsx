export type Stat = {
  label: string;
  value: string;
  caption?: string;
};

/**
 * Four-cell stat grid — telemetry-styled label, display-scale value,
 * mono caption. Lays out as 2×2 on mobile, 1×4 on md and up.
 */
export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <dt className="font-mono text-xs uppercase tracking-nav opacity-60">
            {s.label}
          </dt>
          <dd className="text-3xl font-semibold leading-display tracking-tight md:text-4xl">
            {s.value}
          </dd>
          {s.caption && (
            <dd className="font-mono text-xs opacity-50">{s.caption}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}
