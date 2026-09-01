'use client';

import { useEffect, useRef, useState } from 'react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisible = useRef(true);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const syncPlayback = () => {
      if (isVisible.current && !document.hidden) video.play().catch(() => undefined);
      else video.pause();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible.current = entry.isIntersecting && entry.intersectionRatio >= 0.28;
      syncPlayback();
    }, { threshold: [0, 0.28, 0.65] });

    observer.observe(section);
    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, []);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const nextSoundOn = !soundOn;
    video.muted = !nextSoundOn;
    setSoundOn(nextSoundOn);
    if (nextSoundOn) video.play().catch(() => undefined);
  }

  return (
    <section ref={sectionRef} className="hero" id="inicio" aria-labelledby="hero-title">
      <video ref={videoRef} className="hero-video" aria-label="Vídeo de apresentação do estúdio ANEXO 7" autoPlay muted loop playsInline preload="metadata" poster="/media/hero-industrial.jpg">
        <source src="/media/hero-presentation.mp4" type="video/mp4" />
      </video>
      <div className="hero-shade" />
      <div className="floating-spheres hero-spheres" aria-hidden="true"><span /><span /><span /></div>
      <button className={`hero-sound-toggle${soundOn ? ' is-on' : ''}`} type="button" aria-pressed={soundOn} onClick={toggleSound}>
        <span aria-hidden="true" />{soundOn ? 'Som ligado' : 'Ativar som'}
      </button>
      <div className="hero-copy">
        <p>Estúdio cenográfico · João Pessoa</p>
        <h1 id="hero-title">ANEXO <span>7</span></h1>
        <div className="hero-line">
          <p>Um novo cenário<br />a cada 7 dias.</p>
          <a href="#conceito">Entrar no estúdio <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="hero-orbit" aria-hidden="true"><span>07</span></div>
      <div className="hero-counter" aria-hidden="true">00:07</div>
    </section>
  );
}
