import type { CSSProperties } from 'react';

export function CompanyLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border border-outline-subtle bg-surface-1 p-4 md:h-28 md:w-28">
      <span
        role="img"
        aria-label={alt}
        className="logo-mask block h-full w-full"
        style={{ '--logo-mask': `url(${src})` } as CSSProperties}
      />
    </div>
  );
}
