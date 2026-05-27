export const metadata = {
  title: '404 — Jacob Ikola',
  description: 'Path not found.',
};

export default function NotFound() {
  return (
    <main data-page="not-found" className="grid min-h-screen place-items-center px-6">
      <div className="flex w-full max-w-3xl flex-col gap-8">
        <h1 className="text-5xl font-semibold leading-display tracking-tight md:text-6xl">
          Nothing here.
        </h1>

        <p className="text-lg leading-relaxed opacity-80">
          Either the URL is wrong, the page moved, or it never existed. The
          rest of the site still works — use the header to get back on
          track.
        </p>
      </div>
    </main>
  );
}
