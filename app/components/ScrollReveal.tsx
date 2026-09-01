'use client';

import { useLayoutEffect } from 'react';

const revealSelector = '[data-reveal]';

export function ScrollReveal() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;

    const elements = () => Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    const revealEverything = () => {
      observer?.disconnect();
      observer = null;
      root.classList.remove('reveal-ready');
      elements().forEach((element) => element.classList.add('is-revealed'));
    };

    const start = () => {
      if (motionQuery.matches) {
        revealEverything();
        return;
      }

      root.classList.add('reveal-ready');

      if (!('IntersectionObserver' in window)) {
        revealEverything();
        return;
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });

      elements().forEach((element) => {
        if (!element.classList.contains('is-revealed')) observer?.observe(element);
      });
    };

    const syncMotionPreference = () => {
      observer?.disconnect();
      start();
    };

    start();
    motionQuery.addEventListener('change', syncMotionPreference);

    return () => {
      observer?.disconnect();
      motionQuery.removeEventListener('change', syncMotionPreference);
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
