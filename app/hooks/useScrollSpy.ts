import { useEffect, useState } from 'react';

/**
 * Hook to track which heading is currently visible in the viewport
 * Uses IntersectionObserver to detect when headings enter/exit view
 * Improved version: only updates when scrolling, prioritizes topmost heading
 */
export function useScrollSpy(ids: string[], rootMargin = '-100px 0px -66%') {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Track which headings are currently intersecting
    const visibleHeadings = new Map<string, IntersectionObserverEntry>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.set(entry.target.id, entry);
          } else {
            visibleHeadings.delete(entry.target.id);
          }
        });

        // Find the topmost visible heading
        if (visibleHeadings.size > 0) {
          let topmostEntry: IntersectionObserverEntry | null = null;
          let topmostY = Infinity;

          visibleHeadings.forEach((entry) => {
            const y = entry.boundingClientRect.top;
            if (y < topmostY) {
              topmostY = y;
              topmostEntry = entry;
            }
          });

          if (topmostEntry) {
            setActiveId(topmostEntry.target.id);
          }
        }
      },
      { rootMargin, threshold: [0, 0.5, 1] }
    );

    // Observe all headings
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      visibleHeadings.clear();
    };
  }, [ids, rootMargin]);

  return activeId;
}
