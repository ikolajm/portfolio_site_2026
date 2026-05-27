import type { Metadata } from 'next';
import {
  Workflow,
  LayoutDashboard,
  GalleryHorizontalEnd,
  RadioTower,
  Zap,
  Trophy,
} from 'lucide-react';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { TagChipList } from '@/components/atoms/TagChip';
import { CrossLinkSection } from '@/components/atoms/CrossLinkSection';
import { PartsList, type Part } from '@/components/atoms/PartsList';
import { InlineCode } from '@/components/atoms/InlineCode';
import { StatCards } from '@/components/atoms/StatCards';
import { Reveal } from '@/components/atoms/Reveal';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { TextLink } from '@/components/atoms/TextLink';
import { TerminalGallery, type GalleryEntry } from '@/components/atoms/TerminalGallery';
import { MediaGallery, type GalleryFrame } from '@/components/atoms/MediaGallery';

export const metadata: Metadata = {
  title: 'Paperboy — Jacob Ikola',
  description:
    'A daily news dashboard I built so I’d stop opening six apps every morning. RSS, ESPN, and TMDB in parallel — 80–145 calls, 3 seconds, one JSON digest.',
};

const ARCH_PARTS: Part[] = [
  {
    icon: Workflow,
    title: 'The pipeline',
    body: (
      <p>
        A TypeScript command. RSS feeds for editorial news (Google News
        subsections + ESPN sports + opinion outlets), the ESPN scoreboard API
        for the day&apos;s games, and TMDB for movies and streaming — 80–145
        API calls per run, all in flight at once, finishing in 2–3 seconds.
        The output is a single{' '}
        <InlineCode>digest.json</InlineCode> under{' '}
        <InlineCode>digests/YYYY-MM-DD/</InlineCode>. That
        file is the artifact.
      </p>
    ),
  },
  {
    icon: LayoutDashboard,
    title: 'The dashboard',
    body: (
      <>
        <p>
          A Next.js app that reads{' '}
          <InlineCode>digest.json</InlineCode>{' '}at request
          time. There is no server running between digest builds. When you
          load the page, the dashboard parses today&apos;s JSON and renders.
          Static-ish behavior at the surface; the data underneath is fresh
          every morning. It surfaces three tabs:
        </p>
        <ul className="flex flex-col gap-2 border-l border-outline-subtle pl-5 text-on-surface-variant">
          <li>
            <strong className="text-on-surface">News</strong>{' '}is two-tier
            filtering — Headlines / Topics / Sports / Opinions, with contextual
            sub-filters per tier-1 selection. Cross-topic dedup keeps the same
            story from showing up in AI <em>and</em> Cybersecurity.
          </li>
          <li>
            <strong className="text-on-surface">Media</strong>{' '}is podcast rows
            plus horizontal poster galleries for In Theatres, Streaming, and
            Coming Soon, with watch-provider logos and detail overlays.
          </li>
          <li>
            <strong className="text-on-surface">Scores</strong>{' '}is recaps and
            schedule sub-tabs with per-sport rendering — MLB shows winning and
            losing pitchers, F1 shows session timing across the weekend, UFC
            shows fight methodology, NBA and NHL show scoring breakdowns. About
            35 games get enriched with box scores, season leaders, injuries,
            and series context — all in ~3.5 seconds via parallel fetches to
            ESPN&apos;s summary endpoint.
          </li>
        </ul>
      </>
    ),
  },
];

const PAPERBOY_FRAMES: GalleryFrame[] = [
  {
    src: '/assets/media/paperboy-1.png',
    alt: 'News landing — headlines, popular today, topic feeds',
  },
  {
    src: '/assets/media/paperboy-2.png',
    alt: 'Media — poster galleries for movies, streaming, coming soon',
  },
  {
    src: '/assets/media/paperboy-3.png',
    alt: 'Scores — game card box, leaders, injuries',
  },
  {
    src: '/assets/media/paperboy-4.png',
    alt: 'Scores - Full game detail view of NBA playoff game',
  },
];

const UNDER_HOOD: GalleryEntry[] = [
  {
    tab: 'Digest',
    filePath: 'digests/2026-05-26/digest.json',
    description: (
      <>
        The artifact at the heart of the pipeline. One file per morning
        under{' '}
        <InlineCode>digests/YYYY-MM-DD/</InlineCode> — the dashboard reads
        this directly, no server in between.
      </>
    ),
    code: `{
  "meta": {
    "date": "2026-05-26",
    "day_of_week": "Tuesday",
    "story_count": 142,
    "run_mode": "initial",
    "last_run": "2026-05-26T07:14:33.812Z"
  },
  "sections": {
    "popular_today": [ /* trending headlines */ ],
    "local":         { "locations": [ /* per-location story lists */ ] },
    "for_you":       [ /* topic feeds the reader follows */ ],
    "on_your_radar": [ /* topic feeds in rotation */ ],
    "scores": {
      "team_sports": { "recaps": [...], "schedule": [...], "standings": [...] },
      "ufc":         { "recaps": {...}, "schedule": {...} },
      "f1":          { "recaps": {...}, "schedule": {...} }
    },
    "entertainment": { "movies": [...], "streaming": [...], "upcoming": [...] },
    "podcasts":      [ /* episodes that dropped today */ ],
    "opinions":      [ /* opinion-section pieces */ ]
  },
  "deep_dives": []
}`,
  },
  {
    tab: 'Pipeline',
    filePath: 'scripts/digest/pipeline.ts',
    description:
      "Fetch everything in parallel, isolate each source. A TMDB outage doesn't kill news; ESPN downtime doesn't kill media. The graceful-degradation decision in 17 lines.",
    code: `// Fetch everything in parallel. allSettled (not all) so one branch failing
// — e.g. an ESPN outage, a TMDB 500 — doesn't kill the whole digest.
// Failed branches degrade to empty data with a warning.
const [rssSettled, scoresSettled, tmdbSettled] = await Promise.allSettled([
  fetchBatch(feedBatch),
  fetchAllScores(config, targetDate),
  credentials ? fetchTmdb(config, credentials) : Promise.resolve({}),
]);

const rssResults = rssSettled.status === "fulfilled" ? rssSettled.value : {};
if (rssSettled.status === "rejected") {
  warnings.push(\`RSS batch failed entirely: \${formatReason(rssSettled.reason)}\`);
}

const scores = scoresSettled.status === "fulfilled"
  ? scoresSettled.value
  : emptyScoresSection(targetDate);
if (scoresSettled.status === "rejected") {
  warnings.push(\`Scores fetch failed entirely: \${formatReason(scoresSettled.reason)}\`);
}`,
  },
  {
    tab: 'Filter',
    filePath: 'scripts/digest/filter.ts',
    description:
      "RSS entries go through a three-stage filter: staleness, URL quality, and cross-topic dedup. The DedupPool keeps the same story from showing up in both AI and Cybersecurity — Decision 2 in code.",
    code: `import { normalizeUrl } from "../normalize-url.js";
import type { RssEntry } from "../../shared/types/digest.js";

// --- Staleness ---

export function isStale(dateStr: string, maxHours = 36): boolean {
  if (!dateStr) return false;
  const pubDate = new Date(dateStr);
  const hoursAgo = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60);
  return hoursAgo > maxHours;
}

// --- URL quality ---

const BAD_URL_PATTERNS = [
  /\\/tag\\//i,
  /\\/category\\//i,
  /\\/search\\?/i,
  /\\/search\\//i,
  /\\/author\\//i,
];

export function isLowQualityUrl(url: string): boolean {
  if (!url) return false;
  if (url.includes("news.google.com")) return false;
  return BAD_URL_PATTERNS.some(p => p.test(url));
}

// --- Cross-topic dedup ---

/**
 * Shared pool for cross-topic dedup. Topics (for_you + on_your_radar)
 * share one pool so the same story doesn't appear in both AI and
 * Cybersecurity. Popular, local, and opinions maintain their own
 * independent pools.
 */
export class DedupPool {
  private seen = new Set<string>();

  claim(url: string): boolean {
    if (!url) return true;
    const normalized = normalizeUrl(url);
    if (this.seen.has(normalized)) return false;
    this.seen.add(normalized);
    return true;
  }
}

export function dedupByUrl(entries: RssEntry[], pool?: DedupPool): RssEntry[] {
  const localPool = pool ?? new DedupPool();
  return entries.filter(entry => localPool.claim(entry.url));
}

// --- Combined pipeline ---

export function filterEntries(
  entries: RssEntry[],
  maxHours = 36,
  pool?: DedupPool,
): RssEntry[] {
  return dedupByUrl(entries, pool)
    .filter(e => !isStale(e.date, maxHours))
    .filter(e => !isLowQualityUrl(e.url));
}`,
  },
];

export default function PaperboyCaseStudy() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 pt-32 pb-24">
      {/* HERO */}
      <Reveal as="section" aria-label="Hero" className="flex flex-col gap-8">
        <SectionAnchor>Case Study</SectionAnchor>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
            Paperboy
          </h1>
          <p className="text-2xl leading-relaxed opacity-90">
            A daily news dashboard I built so I&apos;d stop opening six apps
            every morning.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <StatusBadge label="Shipped 2026-05 · In daily use" />
          <TagChipList chips={['React', 'TypeScript', 'Next.js', 'Tailwind CSS']} />
        </div>
      </Reveal>

      {/* GALLERY — product-first position 2 */}
      <Reveal>
        <MediaGallery frames={PAPERBOY_FRAMES} />
      </Reveal>

      {/* PROBLEM */}
      <Reveal as="section" aria-label="Problem" className="flex flex-col gap-8">
        <SectionAnchor>The Problem</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            Six apps every morning. Google News for headlines, ESPN for
            scores, a podcast app for what dropped overnight, TMDB for what&apos;s
            new in theatres, a streaming service for what to watch tonight,
            a local outlet for what was happening near home. Each one was a
            tab away from the next, each one a different shape of
            &quot;here&apos;s what&apos;s going on,&quot; and none of them
            knew what I actually cared about.
          </p>
          <p>
            I wanted one place that pulled the actual signal from each
            source and laid it out in the shape my morning already has — a
            quick scan of headlines, then sports, then what&apos;s worth
            listening to or watching that night.
          </p>
        </div>
      </Reveal>

      {/* ARCHITECTURE */}
      <Reveal as="section" aria-label="Architecture" className="flex flex-col gap-8">
        <SectionAnchor>Architecture</SectionAnchor>
        <p className="text-lg leading-relaxed">
          Paperboy is two halves that don&apos;t talk to each other in real
          time.
        </p>

        <PartsList parts={ARCH_PARTS} />

        <p className="text-lg leading-relaxed opacity-80">
          The dashboard is built entirely on{' '}
          <TextLink href="/case-studies/loom">Loom</TextLink>, a design-system pipeline I built before Paperboy — its 55
          generated atoms covering every interaction surface.
        </p>
      </Reveal>

      {/* DECISIONS */}
      <Reveal as="section" aria-label="Decisions" className="flex flex-col gap-8">
        <SectionAnchor>Decisions</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            <strong>Script-first, not server-first.</strong>{' '}Most aggregators
            I&apos;d seen had a server polling, a database holding results,
            an API serving the dashboard. Paperboy has none of that. One
            script produces one JSON file; the dashboard reads the file. The
            interface between pipeline and frontend is the filesystem. No
            DevOps, no persistent state, no drift between &quot;what the
            database has&quot; and &quot;what the user sees.&quot; If the
            digest is right, the dashboard is right.
          </p>
          <p>
            <strong>Editorial sources over keyword search.</strong>{' '}Google
            News topic feeds, ESPN&apos;s structured RSS, podcast publisher
            feeds, TMDB&apos;s curated lists. No keyword search anywhere.
            Search noise is the easiest way to ruin a daily feed — one viral
            headline pollutes a topic for a week.
          </p>
          <p>
            <strong>Graceful degradation as a baseline.</strong> Every
            external fetch is wrapped in{' '}
            <InlineCode>Promise.allSettled</InlineCode>{' '}
            with per-source isolation. When TMDB has a bad morning, news and
            scores still ship; entertainment degrades to empty with a
            warning. When ESPN goes down, you still get news and podcasts.
            One outage doesn&apos;t kill the day.
          </p>
          <p>
            <strong>Team color accessibility built in.</strong> Every team
            color routes through an{' '}
            <InlineCode>ensureContrast()</InlineCode>{' '}
            utility that compares the brand color against the current
            theme&apos;s surface luminance and substitutes the alternate
            when contrast is insufficient. Light mode and dark mode both
            supported. The dashboard uses team brand colors aggressively —
            scoring breakdowns, F1 session tables, box-score row hovers —
            and the contrast logic keeps every one of them readable.
          </p>
          <p>
            <strong>Audit scripts for every dataset I can&apos;t keep in my head.</strong>{' '}
            F1 driver rosters change every season and mid-season. Circuit
            timezones change as the calendar expands. So{' '}
            <InlineCode>audit-f1</InlineCode>{' '}fetches the
            live ESPN season and reports drivers and circuits missing from
            the static maps, with ready-to-paste stub entries. Same pattern
            for the media bias dataset (scans past digests for coverage
            gaps), same pattern for endpoint health (every RSS feed, ESPN
            URL, and TMDB endpoint, status-checked in 1 second). When the
            daily digest emits a warning, there&apos;s a script that closes
            the loop.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <StatCards
          heading="By the numbers"
          stats={[
            {
              icon: GalleryHorizontalEnd,
              value: '6',
              label: 'Apps replaced',
              caption: 'one tab every morning',
            },
            {
              icon: RadioTower,
              value: '80–145',
              label: 'API calls / morning',
              caption: 'all in parallel',
            },
            {
              icon: Zap,
              value: '~3s',
              label: 'Daily build',
              caption: 'fetch to digest',
            },
            {
              icon: Trophy,
              value: '~35',
              label: 'Games enriched',
              caption: 'box scores, leaders, injuries',
            },
          ]}
        />
      </Reveal>

      {/* UNDER THE HOOD */}
      <Reveal as="section" aria-label="Under the Hood" className="flex flex-col gap-8">
        <SectionAnchor>Under the Hood</SectionAnchor>
        <p className="text-lg leading-relaxed">
          JSON in, files out. The three slices below show the shape of the
          pipeline end to end — the digest artifact, the fetch wrapper that
          keeps it resilient, and the filter that turns raw RSS into clean
          signal. Pick one.
        </p>

        <TerminalGallery entries={UNDER_HOOD} />
      </Reveal>

      <Reveal>
        <CrossLinkSection currentSlug="paperboy" />
      </Reveal>
    </main>
  );
}
