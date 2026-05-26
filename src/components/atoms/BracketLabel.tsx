import type { ReactNode } from 'react';

export function BracketLabel({
  children,
  active = false,
  trailingIcon,
}: {
  children: ReactNode;
  active?: boolean;
  /** Optional icon rendered trailing the label, inside the brackets.
   *  Used to mark cross-page links with `↗`. */
  trailingIcon?: ReactNode;
}) {
  return (
    <span
      className={`font-mono text-xs uppercase tracking-nav transition-colors ${
        active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
      }`}
    >
      <span className="opacity-50">[ </span>
      <span
        className={`transition-colors ${
          active ? 'text-primary' : 'group-hover:text-primary'
        }`}
      >
        {children}
        {trailingIcon && (
          <span className="ml-1.5 inline-flex align-middle [&>svg]:h-3 [&>svg]:w-3">
            {trailingIcon}
          </span>
        )}
      </span>
      <span className="opacity-50"> ]</span>
    </span>
  );
}
