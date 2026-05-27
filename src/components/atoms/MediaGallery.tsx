'use client';

import { useEffect, useState, type CSSProperties } from 'react';

export interface GalleryFrame {
  src: string;
  alt: string;
}

/**
 * Auto-advancing, fade-transition image gallery. Pauses on hover so a reader
 * lingering on a frame doesn't get yanked to the next. Dots render below the
 * bordered figure for visibility on any frame, with a comfortable hit area
 * for click-to-jump. Optional caption sits below the dots, matching the
 * MediaBlock caption vocabulary.
 */
export function MediaGallery({
  frames,
  caption,
  aspect = '16/10',
  intervalMs = 5000,
}: {
  frames: GalleryFrame[];
  caption?: string;
  aspect?: string;
  intervalMs?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || frames.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % frames.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, intervalMs, frames.length]);

  return (
    <figure className="flex flex-col gap-3">
      <div
        className="relative overflow-hidden rounded-sm border border-outline-subtle bg-surface-1"
        style={{ aspectRatio: aspect } as CSSProperties}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {frames.map((frame, i) => (
          <img
            key={frame.src}
            src={frame.src}
            alt={frame.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Dots — below the figure, comfortable hit area */}
      <div className="flex items-center justify-center gap-1">
        {frames.map((frame, i) => (
          <button
            key={frame.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show frame ${i + 1}: ${frame.alt}`}
            className="group flex h-8 w-8 cursor-pointer items-center justify-center"
          >
            <span
              aria-hidden
              className={`block h-2 rounded-full transition-all duration-200 ${
                i === active
                  ? 'w-8 bg-on-surface'
                  : 'w-2 bg-on-surface/30 group-hover:bg-on-surface/60'
              }`}
            />
          </button>
        ))}
      </div>

      {caption && (
        <figcaption className="font-mono text-xs text-on-surface-variant">
          // {caption}
        </figcaption>
      )}
    </figure>
  );
}
