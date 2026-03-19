import { useEffect, useRef, useState } from 'react';

/**
 * Hook to track which heading is currently visible in the viewport
 * Uses IntersectionObserver to detect when headings enter/exit view
 * Improved version: only updates when scrolling, prioritizes topmost heading
 */
export function useScrollSpy(ids: string[], rootMargin = '-100px 0px -66%') {
  const [activeId, setActiveId] = useState<string>('');
  const activeIdRef = useRef<string>('');

  useEffect(() => {
    // Track which headings are currently intersecting (by id)
    const visibleIds = new Set<string>();

    const getReferenceY = () => {
      // Use rootMargin's top value as the "activation line" when it's a negative margin (shrinks root from top).
      // Example: rootMargin "-100px ..." -> referenceY = 100.
      const parts = rootMargin.trim().split(/\s+/);
      const top = parts[0] ?? '0px';
      const vh = window.innerHeight || 0;

      const toPx = (value: string) => {
        const v = value.trim();
        if (v.endsWith('px')) return Number.parseFloat(v);
        if (v.endsWith('%')) return (Number.parseFloat(v) / 100) * vh;
        return Number.parseFloat(v);
      };

      const topPx = toPx(top);
      return Math.max(0, -topPx);
    };

    let rafId: number | null = null;
    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const referenceY = getReferenceY();

        // If IO misses updates in some browsers/environments, fall back to scanning all ids.
        const candidateIds = visibleIds.size > 0 ? Array.from(visibleIds) : ids;

        let bestId = '';
        let bestTopBelow = -Infinity; // closest to referenceY but <= referenceY
        let bestTopAbove = Infinity;  // closest above referenceY

        for (const id of candidateIds) {
          const element = document.getElementById(id);
          if (!element) continue;

          const top = element.getBoundingClientRect().top;

          if (top <= referenceY) {
            if (top > bestTopBelow) {
              bestTopBelow = top;
              bestId = id;
            }
          } else {
            if (!bestId && top < bestTopAbove) {
              bestTopAbove = top;
              bestId = id;
            }
          }
        }

        if (bestId && bestId !== activeIdRef.current) {
          activeIdRef.current = bestId;
          setActiveId(bestId);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        });

        scheduleUpdate();
      },
      { rootMargin, threshold: [0, 0.5, 1] }
    );

    // Observe all headings
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const onScroll = () => scheduleUpdate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    scheduleUpdate();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      observer.disconnect();
      visibleIds.clear();
    };
  }, [ids, rootMargin]);

  return activeId;
}
