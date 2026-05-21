'use client';

import { createElement, useEffect, useRef, useState } from 'react';
import type { ElementType, HTMLAttributes } from 'react';

type RevealProps = {
  /** Element to render. Defaults to div; use 'li' inside lists for valid markup. */
  as?: ElementType;
  /** Stagger offset in ms — for groups that enter the viewport together. */
  delay?: number;
} & HTMLAttributes<HTMLElement>;

/**
 * Scroll-reveal wrapper — fades + rises its children into view the first time
 * they cross the viewport. One-shot: the observer disconnects after revealing,
 * so scrolling back up never re-triggers it. Under prefers-reduced-motion it
 * renders fully visible immediately and never observes.
 *
 * Hidden/shown states live in globals.css (`[data-reveal]`); this only flips
 * `data-shown`. The reveal animation's fill holds `transform` on this node —
 * keep transform-based hover effects on a child element so they don't fight it.
 */
export function Reveal({ as = 'div', delay = 0, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ...rest,
      ref,
      'data-reveal': '',
      'data-shown': shown ? '' : undefined,
      style: delay ? { ...style, animationDelay: `${delay}ms` } : style,
    },
    children,
  );
}
