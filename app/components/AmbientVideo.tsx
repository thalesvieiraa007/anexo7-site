'use client';

import { useEffect, useRef, useState } from 'react';

type AmbientVideoProps = { src: string; poster: string; label: string; className?: string };

export function AmbientVideo({ src, poster, label, className = '' }: AmbientVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReduceMotion(motionQuery.matches);
    syncMotion();
    motionQuery.addEventListener('change', syncMotion);
    const observer = new IntersectionObserver(([entry]) => {
      setNearViewport(entry.isIntersecting);
      if (!entry.isIntersecting) videoRef.current?.pause();
    }, { rootMargin: '280px' });
    if (frameRef.current) observer.observe(frameRef.current);
    return () => { observer.disconnect(); motionQuery.removeEventListener('change', syncMotion); };
  }, []);

  useEffect(() => {
    if (nearViewport && !reduceMotion) videoRef.current?.play().catch(() => undefined);
  }, [nearViewport, reduceMotion]);

  return (
    <div ref={frameRef} className={`ambient-video ${className}`.trim()}>
      <video ref={videoRef} aria-label={label} poster={poster} muted loop playsInline preload="none">
        {nearViewport && !reduceMotion ? <source src={src} type="video/mp4" /> : null}
      </video>
    </div>
  );
}

