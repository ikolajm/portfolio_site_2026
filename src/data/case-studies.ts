export type CaseStudyBadge =
  | { kind: 'index' }
  | { kind: 'logo'; src: string };

export type CaseStudyMeta = {
  slug: string;
  index: string;
  name: string;
  blurb: string;
  badge: CaseStudyBadge;
};

/**
 * Canonical ordering for the four portfolio case studies. Index is
 * stable across the site — `01 JAMIE` everywhere, `02 Loom` everywhere.
 * All four case studies carry their own logo mark. Cross-link sections
 * filter the current slug out of this list.
 */
export const CASE_STUDIES: CaseStudyMeta[] = [
  {
    slug: 'jamie',
    index: '01',
    name: 'JAMIE',
    blurb:
      'A persistent AI development partner — part JARVIS, part operating system for how I work.',
    badge: { kind: 'logo', src: '/assets/svg/jamie-logo.svg' },
  },
  {
    slug: 'loom',
    index: '02',
    name: 'Loom',
    blurb:
      'I kept burning out building UI foundations, so I built a pipeline that generates them.',
    badge: { kind: 'logo', src: '/assets/svg/loom.svg' },
  },
  {
    slug: 'paperboy',
    index: '03',
    name: 'Paperboy',
    blurb:
      'A daily news dashboard I built so I’d stop opening six apps every morning.',
    badge: { kind: 'logo', src: '/assets/svg/paperboy-logo.svg' },
  },
  {
    slug: 'party-wipe',
    index: '04',
    name: 'Party Wipe',
    blurb:
      'A D&D roguelike — captures the scramble of a session going sideways, solo, without needing a DM.',
    badge: { kind: 'logo', src: '/assets/svg/party-wipe-logo.svg' },
  },
];
