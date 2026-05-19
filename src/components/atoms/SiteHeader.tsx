'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const SECTIONS = [
  { id: 'hero', label: 'LANDING' },
  { id: 'about', label: 'ABOUT' },
  { id: 'selected-work', label: 'WORK' },
  { id: 'experience', label: 'EXPERIENCE' },
] as const;

const CASE_STUDIES = [
  { slug: 'jamie', label: 'JAMIE' },
  { slug: 'loom', label: 'LOOM' },
  { slug: 'paperboy', label: 'PAPERBOY' },
  { slug: 'party-wipe', label: 'PARTY WIPE' },
] as const;

function Bracketed({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <span className={active ? 'opacity-100' : 'opacity-55 hover:opacity-100 transition-opacity'}>
      <span className="opacity-50">[ </span>
      <span className={active ? 'text-primary' : ''}>{children}</span>
      <span className="opacity-50"> ]</span>
    </span>
  );
}

export function SiteHeader() {
  const [activeId, setActiveId] = useState<string>('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-80px 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled ? 'bg-surface/70 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Jacob Ikola — home" className="group">
          <span className="inline-flex h-8 items-center gap-2 rounded-sm border border-outline-subtle bg-surface-1/40 px-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-on-surface transition-colors group-hover:bg-surface-2/40">
            <img
              src="/assets/svg/personal_logo_white.svg"
              alt=""
              aria-hidden
              className="h-4 w-auto"
            />
          </span>
        </Link>

        <nav className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.18em]">
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              <Bracketed active={activeId === section.id}>{section.label}</Bracketed>
            </a>
          ))}

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.18em] outline-none focus-visible:opacity-100">
              <Bracketed active={false}>CASE STUDIES ↓</Bracketed>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={10}
                className="z-50 min-w-[14rem] rounded-sm border border-outline-subtle bg-surface-1/95 p-1 font-mono text-[11px] uppercase tracking-[0.18em] shadow-xl backdrop-blur-md"
              >
                {CASE_STUDIES.map((cs) => (
                  <DropdownMenu.Item key={cs.slug} asChild>
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 outline-none transition-colors hover:bg-surface-2/40 focus:bg-surface-2/40"
                    >
                      <span className="opacity-40">→</span>
                      <span>{cs.label}</span>
                    </Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </nav>
      </div>
    </header>
  );
}
