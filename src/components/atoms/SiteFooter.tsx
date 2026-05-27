import type { CSSProperties } from 'react';
import Link from 'next/link';
import { BracketLabel } from '@/components/atoms/BracketLabel';

export function SiteFooter() {
  return (
    <footer
      id="footer"
      aria-label="Contact"
      className="mx-auto flex max-w-3xl flex-col gap-8 border-t border-outline-subtle px-6 py-16"
    >
      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-3 text-3xl font-semibold leading-display tracking-tight">
          <span
            aria-hidden
            className="logo-mask inline-block h-7 w-10 shrink-0"
            style={{ '--logo-mask': "url('/assets/svg/cowboy-hat.svg')" } as CSSProperties}
          />
          Always open to a new hat.
        </p>
        <p className="text-lg leading-relaxed opacity-80">
          Design Engineering, Full Stack Development — or something that
          doesn&apos;t <em>quite</em> fit one job description.
        </p>
      </div>

      <ul className="flex flex-wrap gap-4">
        <li>
          <a href="mailto:ikolajm@gmail.com" className="group inline-block">
            <BracketLabel>Email</BracketLabel>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/jmi/"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-block"
          >
            <BracketLabel>LinkedIn</BracketLabel>
          </a>
        </li>
        <li>
          <a
            href="https://github.com/ikolajm"
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-block"
          >
            <BracketLabel>GitHub</BracketLabel>
          </a>
        </li>
        <li>
          <Link href="/resume" className="group inline-block">
            <BracketLabel>Resume</BracketLabel>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
