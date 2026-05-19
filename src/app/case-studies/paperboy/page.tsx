import type { Metadata } from 'next';
import { SectionAnchor } from '@/components/atoms/SectionAnchor';
import { TagChip } from '@/components/atoms/TagChip';
import { CodeBlock } from '@/components/atoms/CodeBlock';
import { MediaBlock } from '@/components/atoms/MediaBlock';
import { CrossLinkSection } from '@/components/atoms/CrossLinkSection';
import { CalloutBlock } from '@/components/atoms/CalloutBlock';
import { StatGrid } from '@/components/atoms/StatGrid';

export const metadata: Metadata = {
  title: 'Paperboy — Jacob Ikola',
  description:
    'A daily news dashboard I built so I’d stop opening six apps every morning. RSS, ESPN, and TMDB in parallel — 80–145 calls, 3 seconds, one JSON digest.',
};

export default function PaperboyCaseStudy() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-20 px-6 pt-32 pb-24">
      {/* HERO */}
      <section aria-label="Hero" className="flex flex-col gap-8">
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
          <p className="font-mono text-xs uppercase tracking-nav opacity-60">
            STATUS: SHIPPED 2026-05 — IN DAILY USE
          </p>
          <ul className="flex flex-wrap gap-2">
            <li><TagChip>TypeScript</TagChip></li>
            <li><TagChip>Next.js 16</TagChip></li>
            <li><TagChip>React 19</TagChip></li>
            <li><TagChip>ESPN API</TagChip></li>
            <li><TagChip>TMDB</TagChip></li>
          </ul>
        </div>
      </section>

      {/* MEDIABLOCK — product-first position 2 */}
      <MediaBlock
        aspect="16/10"
        placeholder="the dashboard — opening, switching News / Media / Scores, expanding an NBA card to linescore + leaders + injuries, filtering News by Topics → AI"
        caption="actual product, not a mockup"
      />

      {/* PROBLEM */}
      <section aria-label="Problem" className="flex flex-col gap-8">
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
      </section>

      {/* ARCHITECTURE */}
      <section aria-label="Architecture" className="flex flex-col gap-8">
        <SectionAnchor>Architecture</SectionAnchor>
        <p className="text-lg leading-relaxed">
          Paperboy is two halves that don&apos;t talk to each other in real
          time.
        </p>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">The pipeline</h3>
            <p className="leading-relaxed opacity-80">
              A TypeScript command. RSS feeds for editorial news (Google
              News subsections + ESPN sports + opinion outlets), the ESPN
              scoreboard API for the day&apos;s games, and TMDB for movies
              and streaming — 80–145 API calls per run, all in flight at
              once, finishing in 2–3 seconds. The output is a single{' '}
              <code className="font-mono text-sm">digest.json</code> under{' '}
              <code className="font-mono text-sm">digests/YYYY-MM-DD/</code>.
              That file is the artifact.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">The dashboard</h3>
            <p className="leading-relaxed opacity-80">
              A Next.js app that reads{' '}
              <code className="font-mono text-sm">digest.json</code> at
              request time. There is no server running between digest
              builds. When you load the page, the dashboard parses
              today&apos;s JSON and renders. Static-ish behavior at the
              surface; the data underneath is fresh every morning.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Three tabs</h3>
            <p className="leading-relaxed opacity-80">
              <strong>News</strong> is two-tier filtering — Headlines /
              Topics / Sports / Opinions, with contextual sub-filters per
              tier-1 selection. Cross-topic dedup keeps the same story from
              showing up in AI <em>and</em> Cybersecurity.{' '}
              <strong>Media</strong> is podcast rows plus horizontal poster
              galleries for In Theatres, Streaming, and Coming Soon, with
              watch-provider logos and detail overlays.{' '}
              <strong>Scores</strong> is recaps and schedule sub-tabs with
              per-sport rendering — MLB shows winning and losing pitchers,
              F1 shows session timing across the weekend, UFC shows fight
              methodology, NBA and NHL show scoring breakdowns. About 35
              games get enriched with box scores, season leaders, injuries,
              and series context — all in ~3.5 seconds via parallel fetches
              to ESPN&apos;s summary endpoint.
            </p>
          </div>
        </div>

        <p className="text-lg leading-relaxed opacity-80">
          The dashboard runs on 55 atoms generated by{' '}
          <strong>Loom</strong> — a design-system pipeline I built before
          this. One atom was added downstream: a project-specific{' '}
          <code className="font-mono text-base">Logo.tsx</code>. The 55
          atoms covered every interaction surface.
        </p>
      </section>

      {/* DECISIONS */}
      <section aria-label="Decisions" className="flex flex-col gap-8">
        <SectionAnchor>Decisions</SectionAnchor>
        <div className="flex flex-col gap-6 text-lg leading-relaxed">
          <p>
            <strong>Script-first, not server-first.</strong> Most aggregators
            I&apos;d seen had a server polling, a database holding results,
            an API serving the dashboard. Paperboy has none of that. One
            script produces one JSON file; the dashboard reads the file. The
            interface between pipeline and frontend is the filesystem. No
            DevOps, no persistent state, no drift between &quot;what the
            database has&quot; and &quot;what the user sees.&quot; If the
            digest is right, the dashboard is right.
          </p>
          <p>
            <strong>Config-driven everything.</strong> Every source — topics,
            sports, podcast feeds, opinion outlets, TMDB endpoints — lives
            in{' '}
            <code className="font-mono text-sm">config/config.json</code>.
            Adding a new topic is a one-line edit. Adding a new sport is a
            one-line edit. Adding a new editorial subsection under Headlines
            is a config-array entry. The dashboard&apos;s surface evolves
            without code changes.
          </p>
          <p>
            <strong>Editorial sources over keyword search.</strong> Google
            News topic feeds, ESPN&apos;s structured RSS, podcast publisher
            feeds, TMDB&apos;s curated lists. No keyword search anywhere.
            Search noise is the easiest way to ruin a daily feed — one viral
            headline pollutes a topic for a week.
          </p>
          <p>
            <strong>Graceful degradation as a baseline.</strong> Every
            external fetch is wrapped in{' '}
            <code className="font-mono text-sm">Promise.allSettled</code>{' '}
            with per-source isolation. When TMDB has a bad morning, news and
            scores still ship, entertainment degrades to empty with a
            warning. When ESPN goes down, you still get news and podcasts.
            One outage doesn&apos;t kill the day.
          </p>
          <p>
            <strong>Team color accessibility built in.</strong> Every team
            color routes through an{' '}
            <code className="font-mono text-sm">ensureContrast()</code>{' '}
            utility that compares the brand color against the current
            theme&apos;s surface luminance and substitutes the alternate
            when contrast is insufficient. Light mode and dark mode both
            supported. The dashboard uses team brand colors aggressively —
            scoring breakdowns, F1 session tables, box-score row hovers —
            and the contrast logic keeps every one of them readable.
          </p>
          <p>
            <strong>Intentional deferrals, documented per feature.</strong>{' '}
            Media bias badges have data and UI ready (43 outlets mapped,
            color spectrum coded) and are commented out because per-card
            badges crowded the headline attention. Deep dive buttons have
            full infrastructure built and are also commented out — the
            interaction model isn&apos;t settled. Live score polling is
            permanently out of scope; building a product on top of an
            unauthenticated ESPN endpoint isn&apos;t a precedent I want to
            set. Each deferral lives in{' '}
            <code className="font-mono text-sm">docs/DEFERRED.md</code> with
            the reasoning.
          </p>
          <p>
            <strong>Audit scripts for every dataset I can&apos;t keep in my head.</strong>{' '}
            F1 driver rosters change every season and mid-season. Circuit
            timezones change as the calendar expands. So{' '}
            <code className="font-mono text-sm">audit-f1</code> fetches the
            live ESPN season and reports drivers and circuits missing from
            the static maps, with ready-to-paste stub entries. Same pattern
            for the media bias dataset (scans past digests for coverage
            gaps), same pattern for endpoint health (every RSS feed, ESPN
            URL, and TMDB endpoint, status-checked in 1 second). When the
            daily digest emits a warning, there&apos;s a script that closes
            the loop.
          </p>
        </div>
      </section>

      <CalloutBlock eyebrow="By the numbers">
        <StatGrid
          stats={[
            { label: 'Atoms in', value: '55', caption: 'from Loom' },
            { label: 'Atoms added', value: '1', caption: 'project Logo only' },
            { label: 'API calls / morning', value: '80–145', caption: 'in parallel' },
            { label: 'Daily build', value: '3s', caption: 'end to end' },
          ]}
        />
      </CalloutBlock>

      {/* UNDER THE HOOD */}
      <section aria-label="Under the Hood" className="flex flex-col gap-8">
        <SectionAnchor>Under the Hood</SectionAnchor>
        <p className="text-lg leading-relaxed">
          Config in, JSON out, with a parallel fetch graph in the middle.
          Two slices show the shape — the sports section of the config (each
          sport is four fields) and the pipeline orchestrator that fans the
          fetches out and degrades branches independently.
        </p>

        <div className="flex flex-col gap-8">
          <CodeBlock
            filePath="config/config.json"
            caption="the sports section — each sport is four fields; adding a sport is one config entry"
          >{`{
  "sports": {
    "NBA": {
      "url": "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
      "recaps":   true,
      "schedule": true,
      "odds":     false
    },
    "NHL": {
      "url": "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",
      "recaps":   true,
      "schedule": true,
      "odds":     false
    },
    "MLB": {
      "url": "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
      "recaps":   true,
      "schedule": true,
      "odds":     false
    },
    "F1":   { "url": "...", "recaps": true, "schedule": true, "odds": false },
    "UFC":  { "url": "...", "recaps": true, "schedule": true, "odds": false }
  }
}`}
          </CodeBlock>

          <CodeBlock
            filePath="scripts/digest/pipeline.ts"
            caption="orchestrator — Promise.allSettled over RSS batch + scores + TMDB; branch failures degrade to warnings, the digest still completes"
          >{`/**
 * Digest pipeline orchestration.
 * Fetches all data sources in parallel, applies filtering,
 * and assembles the complete Digest object.
 */

import type { PaperboyConfig, Credentials } from "../../shared/types/config.js";
import type { Digest, DigestSections } from "../../shared/types/digest.js";
import { fetchBatch }     from "../fetch-rss.js";
import { fetchTmdb }      from "../fetch-tmdb.js";
import { fetchAllScores } from "../fetch-scores.js";
import { enrichAllGames } from "../scores/enrich.js";

export async function buildDigest(
  config: PaperboyConfig,
  creds: Credentials
): Promise<Digest> {
  const [rss, scores, tmdb] = await Promise.allSettled([
    fetchBatch(buildFeedBatch(config)),
    fetchAllScores(config.sports),
    fetchTmdb(config.tmdb, creds.tmdb),
  ]);

  // Branch failures degrade — the digest still completes.
  const sections = assembleSections({ rss, scores, tmdb });
  const meta     = buildMeta(sections, { rss, scores, tmdb });

  return { sections, meta };
}`}
          </CodeBlock>
        </div>
      </section>

      <CrossLinkSection currentSlug="paperboy" />
    </main>
  );
}
