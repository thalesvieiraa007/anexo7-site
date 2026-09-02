'use client';

import { useLayoutEffect } from 'react';

const revealSelector = '[data-reveal]';

export function ScrollReveal() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 620px)');
    let observer: IntersectionObserver | null = null;
    let backstageObserver: IntersectionObserver | null = null;

    const elements = () => Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    const revealEverything = () => {
      observer?.disconnect();
      observer = null;
      backstageObserver?.disconnect();
      backstageObserver = null;
      root.classList.remove('reveal-ready');
      elements().forEach((element) => element.classList.add('is-revealed'));
    };

    const watchMobileBackstage = () => {
      backstageObserver?.disconnect();
      backstageObserver = null;

      if (!mobileQuery.matches || !('IntersectionObserver' in window)) return;

      const stage = document.querySelector<HTMLElement>('.backstage-stage');
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>('.backstage-stage .backstage-card[data-reveal]'),
      );

      if (!stage || cards.length === 0) return;

      backstageObserver = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        cards.forEach((card) => {
          card.classList.add('is-revealed');
          observer?.unobserve(card);
        });

        backstageObserver?.disconnect();
        backstageObserver = null;
      }, { rootMargin: '0px 0px 18% 0px', threshold: 0.01 });

      backstageObserver.observe(stage);
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

      watchMobileBackstage();
    };

    const syncMotionPreference = () => {
      observer?.disconnect();
      start();
    };

    const syncViewportMode = () => {
      if (mobileQuery.matches) {
        watchMobileBackstage();
        return;
      }

      backstageObserver?.disconnect();
      backstageObserver = null;
    };

    start();
    motionQuery.addEventListener('change', syncMotionPreference);
    mobileQuery.addEventListener('change', syncViewportMode);

    return () => {
      observer?.disconnect();
      backstageObserver?.disconnect();
      motionQuery.removeEventListener('change', syncMotionPreference);
      mobileQuery.removeEventListener('change', syncViewportMode);
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
