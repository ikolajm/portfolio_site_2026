export const metadata = {
  title: '404 — Jacob Ikola',
  description: 'Path not found.',
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center gap-8 px-6 pt-32 pb-24">
      <p className="font-mono text-xs uppercase tracking-nav opacity-60">
        STATUS: 404 — PATH NOT FOUND
      </p>

      <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
        Nothing here.
      </h1>

      <p className="text-lg leading-relaxed opacity-80">
        Either the URL is wrong, the page moved, or it never existed. The
        rest of the site still works — use the header to get back on
        track.
      </p>

      <p className="font-mono text-sm opacity-60">
        <span className="opacity-50">{'> '}</span>
        no match.
      </p>
    </main>
  );
}
