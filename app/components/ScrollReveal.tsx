'use client';

import { useLayoutEffect } from 'react';

const sectionSelector = '[data-reveal-section]';

export function ScrollReveal() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;

    const sections = () => Array.from(document.querySelectorAll<HTMLElement>(sectionSelector));

    const revealEverything = () => {
      observer?.disconnect();
      observer = null;
      root.classList.remove('reveal-ready');
      sections().forEach((section) => section.classList.add('is-reveal-active'));
    };

    const start = () => {
      if (motionQuery.matches) {
        revealEverything();
        return;
      }

      root.classList.add('reveal-ready');
      sections().forEach((section) => section.classList.remove('is-reveal-active'));

      if (!('IntersectionObserver' in window)) {
        revealEverything();
        return;
      }

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-reveal-active');
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -22% 0px', threshold: 0.06 });

      sections().forEach((section) => observer?.observe(section));
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
