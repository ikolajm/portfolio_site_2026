'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BracketLabel } from '@/components/atoms/BracketLabel';

const SECTIONS = [
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

export function SiteHeader() {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isResume = pathname === '/resume';

  const [activeId, setActiveId] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isLanding) return;

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
  }, [isLanding]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 motion-safe:animate-[load-fade-in_400ms_ease-out_both] ${
        scrolled ? 'bg-surface/70 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Home"
          className="transition-opacity duration-150 hover:opacity-70"
        >
          <img
            src="/assets/svg/personal_logo_white.svg"
            alt=""
            aria-hidden
            className="h-6 w-auto"
          />
        </Link>

        {/* Desktop nav — md and up */}
        <nav className="hidden items-center gap-5 md:flex">
          {/* Scroll-spy anchors only render on landing (their target sections don't exist on deep pages) */}
          {isLanding &&
            SECTIONS.map((section) => (
              <a key={section.id} href={`/#${section.id}`} className="group">
                <BracketLabel active={activeId === section.id}>{section.label}</BracketLabel>
              </a>
            ))}

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="group cursor-pointer outline-none">
              <BracketLabel>CASE STUDIES ↓</BracketLabel>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={10}
                className="z-50 min-w-[14rem] rounded-sm border border-outline-subtle bg-surface-1/95 p-1 font-mono text-xs uppercase tracking-nav shadow-xl backdrop-blur-md"
              >
                {CASE_STUDIES.map((cs) => (
                  <DropdownMenu.Item key={cs.slug} asChild>
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 outline-none transition-colors hover:bg-surface-2/40 focus:bg-surface-2/40"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                      <span>{cs.label}</span>
                    </Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          <Link href="/resume" className="group">
            <BracketLabel active={isResume} trailingIcon={<ArrowUpRight />}>
              RESUME
            </BracketLabel>
          </Link>
        </nav>

        {/* Mobile MENU dropdown — below md. Contents vary by route: scroll anchors only on landing. */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="group cursor-pointer outline-none md:hidden">
            <BracketLabel>MENU ↓</BracketLabel>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={10}
              className="z-50 min-w-[16rem] rounded-sm border border-outline-subtle bg-surface-1/95 p-1 font-mono text-xs uppercase tracking-nav shadow-xl backdrop-blur-md"
            >
              {isLanding && (
                <>
                  {SECTIONS.map((section) => (
                    <DropdownMenu.Item key={section.id} asChild>
                      <a
                        href={`/#${section.id}`}
                        className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 outline-none transition-colors hover:bg-surface-2/40 focus:bg-surface-2/40"
                      >
                        <span className="opacity-40">#</span>
                        <span>{section.label}</span>
                      </a>
                    </DropdownMenu.Item>
                  ))}
                  <DropdownMenu.Separator className="my-1 h-px bg-outline-subtle/60" />
                </>
              )}
              {CASE_STUDIES.map((cs) => (
                <DropdownMenu.Item key={cs.slug} asChild>
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 outline-none transition-colors hover:bg-surface-2/40 focus:bg-surface-2/40"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                    <span>{cs.label}</span>
                  </Link>
                </DropdownMenu.Item>
              ))}
              <DropdownMenu.Separator className="my-1 h-px bg-outline-subtle/60" />
              <DropdownMenu.Item asChild>
                <Link
                  href="/resume"
                  className="flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 outline-none transition-colors hover:bg-surface-2/40 focus:bg-surface-2/40"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-40" />
                  <span>RESUME</span>
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
