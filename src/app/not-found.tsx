export const metadata = {
  title: '404 — Jacob Ikola',
  description: 'Path not found.',
};

export default function NotFound() {
  return (
    <main data-page="not-found" className="mx-auto flex min-h-[80vh] max-w-3xl flex-col justify-center gap-8 px-6 pt-32 pb-24">

      <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
        Nothing here.
      </h1>

      <p className="text-lg leading-relaxed opacity-80">
        Either the URL is wrong, the page moved, or it never existed. The
        rest of the site still works — use the header to get back on
        track.
      </p>
    </main>
  );
}
