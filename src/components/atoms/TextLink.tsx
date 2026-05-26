import Link from 'next/link';

/**
 * TextLink — inline primary-color text link with a standardized hover.
 * Full opacity at rest, dims on hover. Used for prose links (email, social,
 * cross-references) — distinct from BracketLabel (nav/CTA) and CaseStudyCTA.
 *
 * Auto-routes to `next/link` for internal hrefs and to `<a>` (with the right
 * target/rel) for external (`http(s)://`, `mailto:`, `tel:`). Override via
 * the `external` prop when the auto-detect is wrong.
 */
type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const BASE_CLASS =
  'text-primary underline underline-offset-4 transition-opacity duration-150 hover:opacity-70';

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

function needsBlankTarget(href: string): boolean {
  return /^https?:/i.test(href);
}

export function TextLink({
  href,
  children,
  external,
  className,
  ariaLabel,
}: Props) {
  const treatAsExternal = external ?? isExternal(href);
  const finalClass = className ? `${BASE_CLASS} ${className}` : BASE_CLASS;

  if (treatAsExternal) {
    const targetProps = needsBlankTarget(href)
      ? { target: '_blank', rel: 'noreferrer noopener' }
      : {};
    return (
      <a href={href} className={finalClass} aria-label={ariaLabel} {...targetProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={finalClass} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
