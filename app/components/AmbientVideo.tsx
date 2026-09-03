'use client';

import { useEffect, useRef, useState } from 'react';

type AmbientVideoProps = { src: string; poster: string; label: string; className?: string };

type ViewportListener = (isNearViewport: boolean) => void;

const viewportListeners = new Map<Element, ViewportListener>();
let viewportObserver: IntersectionObserver | null = null;

function getViewportObserver() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return null;

  if (!viewportObserver) {
    viewportObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => viewportListeners.get(entry.target)?.(entry.isIntersecting));
    }, { rootMargin: '280px' });
  }

  return viewportObserver;
}

function observeNearViewport(element: Element, listener: ViewportListener) {
  const observer = getViewportObserver();

  if (!observer) {
    listener(true);
    return () => undefined;
  }

  viewportListeners.set(element, listener);
  observer.observe(element);

  return () => {
    observer.unobserve(element);
    viewportListeners.delete(element);

    if (viewportListeners.size === 0) {
      observer.disconnect();
      viewportObserver = null;
    }
  };
}

type MotionListener = (reduceMotion: boolean) => void;

const motionListeners = new Set<MotionListener>();
let motionQuery: MediaQueryList | null = null;

function getMotionQuery() {
  if (typeof window === 'undefined') return null;
  motionQuery ??= window.matchMedia('(prefers-reduced-motion: reduce)');
  return motionQuery;
}

function notifyMotionListeners() {
  const reduceMotion = getMotionPreference();
  motionListeners.forEach((listener) => listener(reduceMotion));
}

function subscribeToMotionPreference(listener: MotionListener) {
  const query = getMotionQuery();
  if (!query) return () => undefined;

  if (motionListeners.size === 0) query.addEventListener('change', notifyMotionListeners);
  motionListeners.add(listener);

  return () => {
    motionListeners.delete(listener);
    if (motionListeners.size === 0) query.removeEventListener('change', notifyMotionListeners);
  };
}

function getMotionPreference() {
  return getMotionQuery()?.matches ?? false;
}

export function AmbientVideo({ src, poster, label, className = '' }: AmbientVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nearViewportRef = useRef(false);
  const [nearViewport, setNearViewport] = useState(false);
  const [sourceLoaded, setSourceLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(getMotionPreference);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    return observeNearViewport(frame, (isNearViewport) => {
      nearViewportRef.current = isNearViewport;
      setNearViewport(isNearViewport);
      if (isNearViewport && !getMotionPreference()) setSourceLoaded(true);
    });
  }, []);

  useEffect(() => {
    return subscribeToMotionPreference((shouldReduceMotion) => {
      setReduceMotion(shouldReduceMotion);
      if (!shouldReduceMotion && nearViewportRef.current) setSourceLoaded(true);
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (sourceLoaded && nearViewport && !reduceMotion) video.play().catch(() => undefined);
    else video.pause();
  }, [sourceLoaded, nearViewport, reduceMotion]);

  return (
    <div ref={frameRef} className={`ambient-video ${className}`.trim()}>
      <video ref={videoRef} aria-label={label} poster={poster} muted loop playsInline preload="none" draggable={false} controlsList="nodownload noremoteplayback" disablePictureInPicture>
        {sourceLoaded ? <source src={src} type="video/mp4" /> : null}
      </video>
    </div>
  );
}
