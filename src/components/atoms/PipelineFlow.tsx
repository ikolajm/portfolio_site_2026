'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { SiFigma, SiNextdotjs } from '@icons-pack/react-simple-icons';
import { ArrowRight, ArrowUpRight, ArrowDownRight, ArrowDown } from 'lucide-react';

/**
 * Loom's pipeline as a 3-tier flow diagram: a brand questionnaire compiles
 * through Loom into two synchronized output worlds — a Figma library and a
 * Next.js scaffold. Content is sourced from the Loom case study copy.
 *
 * Desktop branches horizontally; mobile stacks the questionnaire and Loom,
 * then branches into a row of both outputs. Lucide arrows carry the flow —
 * no path geometry to drift. On a loop, the flow
 * lights up cumulatively left-to-right (questionnaire → Loom → both outputs),
 * holds with the whole pipeline lit, then resets. Reduced motion stays on the
 * plain diagram.
 */

const QUESTIONNAIRE = [
  'Primary color',
  'Font pairing',
  'Type scale',
  'Spacing density',
  'Edge style',
];
const FIGMA_OUT = [
  'Token variables',
  'Text styles',
  'Layout templates',
  '55 component sets',
];
const NEXT_OUT = [
  'tokens.css',
  '55 React atoms',
  'Storybook stories',
  'Playground',
];

// Stage durations (ms), indexed by stage: rest, questionnaire, Loom, outputs.
const STAGE_MS = [600, 750, 750, 1600];

function QuestionnaireIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="3" width="14" height="18" rx="1.6" />
      <path d="M9 8h6M9 12h6M9 16h3.5" />
    </svg>
  );
}

function Card({
  icon,
  title,
  items,
  lit,
  className,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
  lit: boolean;
  className: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2.5 rounded-sm border bg-surface-2 p-4 transition-colors duration-300 ${className} ${
        lit ? 'border-primary' : 'border-outline-subtle'
      }`}
    >
      <div
        className={`flex items-center gap-2 transition-colors duration-300 ${
          lit ? 'text-primary' : 'text-on-surface'
        }`}
      >
        {icon}
        <span className="font-mono text-xs uppercase tracking-nav">{title}</span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-center gap-2 font-mono text-[11px] leading-tight text-on-surface-variant"
          >
            <span className="h-1 w-1 shrink-0 rounded-full bg-current" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoomNode({ lit }: { lit: boolean }) {
  return (
    <div
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border bg-surface-2 transition-colors duration-300 ${
        lit ? 'border-primary' : 'border-outline-subtle'
      }`}
    >
      <span
        aria-hidden
        className={`logo-mask block h-9 w-9 transition-colors duration-300 ${
          lit ? 'text-primary' : 'text-on-surface'
        }`}
        style={{ '--logo-mask': 'url(/assets/svg/loom.svg)' } as CSSProperties}
      />
    </div>
  );
}

const figmaIcon = <SiFigma size={16} color="currentColor" aria-hidden />;
const nextIcon = <SiNextdotjs size={16} color="currentColor" aria-hidden />;

export function PipelineFlow({ framed = true }: { framed?: boolean }) {
  const [reduced, setReduced] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(
      () => setStage((s) => (s + 1) % STAGE_MS.length),
      STAGE_MS[stage],
    );
    return () => clearTimeout(t);
  }, [reduced, stage]);

  // The flow lights up cumulatively: questionnaire (1), Loom (2), outputs (3).
  const s = reduced ? 0 : stage;
  const qLit = s >= 1;
  const loomLit = s >= 2;
  const outLit = s >= 3;

  const arrowCls = (on: boolean) =>
    `shrink-0 transition-colors duration-300 ${on ? 'text-primary' : 'text-on-surface'}`;

  return (
    <div
      className={`media-grid p-6 md:p-10 ${
        framed ? 'rounded-sm border border-outline-subtle' : ''
      }`}
    >
      {/* MOBILE — questionnaire, Loom, then a branched row of both outputs */}
      <div className="flex w-full flex-col items-center gap-3 md:hidden">
        <Card className="w-full" icon={<QuestionnaireIcon />} title="Questionnaire" items={QUESTIONNAIRE} lit={qLit} />
        <ArrowDown size={22} className={arrowCls(loomLit)} aria-hidden />
        <LoomNode lit={loomLit} />
        <ArrowDown size={22} className={arrowCls(outLit)} aria-hidden />
        <div className="grid w-full grid-cols-2 gap-3">
          <Card className="min-w-0" icon={figmaIcon} title="Figma" items={FIGMA_OUT} lit={outLit} />
          <Card className="min-w-0" icon={nextIcon} title="Next.js" items={NEXT_OUT} lit={outLit} />
        </div>
      </div>

      {/* DESKTOP — branched horizontal flow */}
      <div className="hidden items-center justify-center gap-4 md:flex">
        <Card className="w-[184px] shrink-0" icon={<QuestionnaireIcon />} title="Questionnaire" items={QUESTIONNAIRE} lit={qLit} />
        <ArrowRight size={24} className={arrowCls(loomLit)} aria-hidden />
        <LoomNode lit={loomLit} />
        {/* column of two arrows */}
        <div className="flex flex-col justify-center gap-4">
          <ArrowUpRight size={24} className={arrowCls(outLit)} aria-hidden />
          <ArrowDownRight size={24} className={arrowCls(outLit)} aria-hidden />
        </div>

        {/* column of two cards */}
        <div className="flex flex-col gap-6">
          <Card className="w-[184px] shrink-0" icon={figmaIcon} title="Figma" items={FIGMA_OUT} lit={outLit} />
          <Card className="w-[184px] shrink-0" icon={nextIcon} title="Next.js" items={NEXT_OUT} lit={outLit} />
        </div>
      </div>
    </div>
  );
}
