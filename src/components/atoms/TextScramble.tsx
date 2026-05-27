'use client';

import { useEffect, useState } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>/\\';

/**
 * Decode-on-mount text effect — each character cycles through random glyphs
 * before settling to its target, staggered left-to-right with jitter so the
 * word resolves like a hacker-UI decode. Brackets and spaces stay static so
 * the silhouette is recognizable from frame zero. One-shot on mount;
 * `prefers-reduced-motion` renders the target immediately, no animation.
 *
 * Children must be a plain string (so the target length and per-char positions
 * are deterministic). Wrap one short headline at a time — not body prose.
 */
export function TextScramble({
  children,
  durationMs = 700,
}: {
  children: string;
  durationMs?: number;
}) {
  const target = children;
  const [text, setText] = useState(target);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(target);
      return;
    }

    const chars = target.split('');
    // Brackets and spaces never scramble; everything else settles between
    // 30% and 100% of the total duration, ordered left-to-right with jitter.
    const settleAt = chars.map((c, i) =>
      c === ' ' || c === '[' || c === ']'
        ? 0
        : durationMs * (0.3 + 0.6 * (i / chars.length) + 0.1 * Math.random()),
    );

    let raf = 0;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const out = chars
        .map((c, i) =>
          elapsed >= settleAt[i]
            ? c
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)],
        )
        .join('');
      setText(out);
      if (elapsed < durationMs) {
        raf = requestAnimationFrame(tick);
      } else {
        setText(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return <>{text}</>;
}
