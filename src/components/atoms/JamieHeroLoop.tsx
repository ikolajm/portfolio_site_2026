'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { PenLine, Palette, Bug, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Query = { text: string; icon: LucideIcon; workspace: string };

const QUERIES: Query[] = [
  { text: 'rewrite the loom case study intro', icon: PenLine, workspace: '/writing' },
  { text: 'regenerate the color tokens', icon: Palette, workspace: '/design-system' },
  { text: 'debug the paperboy fetch race', icon: Bug, workspace: '/lab' },
  { text: 'prep interview talking points', icon: Briefcase, workspace: '/career' },
];
const N = QUERIES.length;

// Each query's cell in the 3×3 hub grid — clockwise from top-left, so the
// active highlight hops around the ring in query order. The center cell holds
// JAMIE; the four edge cells stay empty.
const CELLS = [
  { cls: 'col-start-1 row-start-1', labelAbove: true },
  { cls: 'col-start-3 row-start-1', labelAbove: true },
  { cls: 'col-start-3 row-start-3', labelAbove: false },
  { cls: 'col-start-1 row-start-3', labelAbove: false },
];

type Phase = 'typing' | 'holding' | 'deleting' | 'gap';

const TYPE_MS = 45;
const DELETE_MS = 22;
const HOLD_MS = 1800;
const GAP_MS = 300;

/**
 * JAMIE hero loop — a terminal types developer queries on a loop; JAMIE sits
 * at the center of a 3×3 hub of workspace icons, and the workspace each query
 * routes to lights up in primary blue while that query holds.
 */
export function JamieHeroLoop({ framed = true }: { framed?: boolean }) {
  const [reduced, setReduced] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [chars, setChars] = useState(0);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const q = QUERIES[qIndex];

    if (phase === 'typing') {
      if (chars < q.text.length) {
        const t = setTimeout(() => setChars((c) => c + 1), TYPE_MS);
        return () => clearTimeout(t);
      }
      setPhase('holding');
      return;
    }
    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('deleting'), HOLD_MS);
      return () => clearTimeout(t);
    }
    if (phase === 'deleting') {
      if (chars > 0) {
        const t = setTimeout(() => setChars((c) => c - 1), DELETE_MS);
        return () => clearTimeout(t);
      }
      setPhase('gap');
      return;
    }
    const t = setTimeout(() => {
      setQIndex((i) => (i + 1) % N);
      setChars(0);
      setPhase('typing');
    }, GAP_MS);
    return () => clearTimeout(t);
  }, [reduced, phase, qIndex, chars]);

  const text = reduced ? QUERIES[0].text : QUERIES[qIndex].text.slice(0, chars);
  const cursorSteady = reduced || phase === 'typing' || phase === 'deleting';
  const activeIndex = reduced ? 0 : phase === 'holding' ? qIndex : -1;

  return (
    <div
      role="img"
      aria-label="Animation: a terminal types developer queries while JAMIE, at the center of a hub of workspace icons, lights up the workspace each query routes to."
      className={`media-grid relative aspect-[4/3] overflow-hidden md:aspect-[16/9] ${
        framed ? 'rounded-sm border border-outline-subtle' : ''
      }`}
    >
      <div className="flex h-full flex-col">
        {/* TERMINAL — the query types in */}
        <div className="relative z-10 flex shrink-0 items-baseline gap-2 px-6 pt-6 font-mono text-xs sm:text-sm">
          <span className="text-on-surface-variant">{'>'}</span>
          <span className="whitespace-nowrap text-on-surface">
            {text}
            <span
              aria-hidden
              className={cursorSteady ? '' : 'animate-[blink_1.1s_linear_infinite]'}
            >
              ▌
            </span>
          </span>
        </div>

        {/* HUB — JAMIE centered in a 3×3 grid of workspace icons */}
        <div className="flex flex-1 items-center justify-center">
          <div className="grid h-[300px] w-[460px] scale-[0.85] grid-cols-3 grid-rows-3 place-items-center md:scale-100">
            {/* center — JAMIE */}
            <div className="relative z-10 col-start-2 row-start-2 flex h-14 w-14 items-center justify-center rounded-sm border border-outline-subtle bg-surface-2">
              <span
                aria-hidden
                className="logo-mask block h-8 w-8 text-on-surface"
                style={{ '--logo-mask': 'url(/assets/svg/jamie-logo.svg)' } as CSSProperties}
              />
            </div>

            {/* workspace icons */}
            {QUERIES.map((q, i) => {
              const cell = CELLS[i];
              const active = i === activeIndex;
              const Icon = q.icon;
              return (
                <div key={q.workspace} className={`relative ${cell.cls}`}>
                  {/* pulse rings — only while active */}
                  {active &&
                    !reduced &&
                    [0, 1, 2].map((r) => (
                      <span
                        key={r}
                        aria-hidden
                        className="absolute inset-0 rounded-sm border border-primary"
                        style={{
                          animation: `hub-ping 1.9s ease-out ${(r * -0.63).toFixed(2)}s infinite`,
                        }}
                      />
                    ))}

                  {/* icon circle */}
                  <div
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-sm border transition-colors duration-300 ${
                      active
                        ? 'border-primary bg-primary/10'
                        : 'border-outline-subtle bg-surface-2'
                    }`}
                  >
                    <Icon
                      size={20}
                      aria-hidden
                      className={`transition-colors duration-300 ${
                        active ? 'text-primary' : 'text-on-surface-variant'
                      }`}
                    />
                  </div>

                  {/* workspace label — revealed while active */}
                  <span
                    aria-hidden
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs text-on-surface transition-opacity duration-300 ${
                      active ? 'opacity-100' : 'opacity-0'
                    } ${cell.labelAbove ? 'bottom-full mb-2' : 'top-full mt-2'}`}
                  >
                    {q.workspace}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
