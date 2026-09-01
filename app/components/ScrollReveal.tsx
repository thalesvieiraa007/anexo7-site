'use client';

import { useEffect } from 'react';

const selector = '[data-reveal]';

export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const elements = () => Array.from(document.querySelectorAll<HTMLElement>(selector));

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

      elements().forEach((element) => element.classList.remove('is-revealed'));
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 });

      elements().forEach((element) => observer?.observe(element));
      frame = window.requestAnimationFrame(() => root.classList.add('reveal-ready'));
    };

    const syncMotionPreference = () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      start();
    };

    start();
    motionQuery.addEventListener('change', syncMotionPreference);

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      motionQuery.removeEventListener('change', syncMotionPreference);
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
