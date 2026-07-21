'use client';

import React from 'react';
import Link from 'next/link';
import { useSealTransition } from './SealTransition';

type SealLinkProps = React.ComponentProps<typeof Link> & {
  /** Element whose center the seal-break animation should originate from. Defaults to the link itself. */
  originRef?: React.RefObject<HTMLElement | null>;
};

/**
 * A `next/link` that intercepts client-side navigation to play the
 * "break the seal" transition before routing. Falls back to normal
 * navigation for new-tab clicks, external links, and reduced-motion users.
 */
const SealLink = React.forwardRef<HTMLAnchorElement, SealLinkProps>(function SealLink(
  { href, onNavigate, originRef, ...rest },
  ref
) {
  const { breakSeal } = useSealTransition();
  const selfRef = React.useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={(node) => {
        selfRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      href={href}
      onNavigate={(e) => {
        onNavigate?.(e);
        e.preventDefault();

        const target = originRef?.current ?? selfRef.current;
        const rect = target?.getBoundingClientRect();
        const origin = rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined;

        const dest = typeof href === 'string' ? href : (href.pathname ?? '/');
        breakSeal(dest, origin);
      }}
      {...rest}
    />
  );
});

export default SealLink;
