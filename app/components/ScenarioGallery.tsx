'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AmbientVideo } from './AmbientVideo';

const scenes = [
  { type: 'image', src: '/media/terracotta-stage.jpg', title: 'Terra em cena', note: 'Volume · matéria · silêncio', alt: 'Editorial em cenário monocromático terracota com raposa' },
  { type: 'video', src: '/media/western-motion.mp4', poster: '/media/western-stage.jpg', title: 'Faroeste urbano', note: 'Madeira · couro · tensão', alt: 'Vídeo do cenário western do ANEXO 7' },
  { type: 'image', src: '/media/metal-stage.jpg', title: 'Estruturas', note: 'Metal · sombra · precisão', alt: 'Modelo em cenário metálico industrial' },
  { type: 'image', src: '/media/heart-stage.jpg', title: 'Coração aberto', note: 'Luz · afeto · vermelho', alt: 'Modelo diante de projeção luminosa em formato de coração' },
  { type: 'video', src: '/media/brasil-motion.mp4', poster: '/media/brasil-stage.jpg', title: 'Brasil em jogo', note: 'Cor · gesto · movimento', alt: 'Vídeo do cenário verde e amarelo Brasil' },
  { type: 'image', src: '/media/fitness-stage.jpg', title: 'Linha de força', note: 'Ritmo · corpo · direção', alt: 'Produção esportiva em pista cenográfica' },
  { type: 'image', src: '/media/rust-portrait.jpg', title: 'Órbita bruta', note: 'Ferrugem · luz dura · moda', alt: 'Modelo em frente a escultura circular oxidada' },
] as const;

export function ScenarioGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function move(direction: 1 | -1) {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: 'smooth' });
  }

  function syncCurrent() {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth / 2;
    const closest = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setCurrent(closest.index);
  }

  return (
    <section className="scenarios" id="cenarios" aria-labelledby="scenarios-title">
      <div className="scenarios-heading">
        <div data-reveal="fade-up"><p className="section-index">03 — 07</p><p className="section-kicker">Cenários em rotação</p></div>
        <h2 id="scenarios-title" data-reveal="blur" data-reveal-delay="1" data-reveal-duration="long">Explore o que<br />já existiu aqui.</h2>
        <p className="scenarios-intro" data-reveal="fade-up" data-reveal-delay="2">Cada ambiente nasce com prazo para desaparecer. Arraste, descubra e imagine o próximo.</p>
      </div>
      <div className="gallery-shell">
        <div ref={trackRef} className="gallery-track" onScroll={syncCurrent} tabIndex={0} aria-label="Galeria horizontal de sete cenários">
          {scenes.map((scene, index) => (
            <article className="scene" data-reveal="scene" data-reveal-delay={String(Math.min(index, 3))} key={scene.title} aria-label={`Cenário ${index + 1} de 7: ${scene.title}`}>
              <div className="scene-media">
                {scene.type === 'image' ? <Image src={scene.src} alt={scene.alt} fill loading="lazy" sizes="(max-width: 720px) 82vw, 58vw" /> : <AmbientVideo src={scene.src} poster={scene.poster} label={scene.alt} />}
                <span className="scene-number" aria-hidden="true">0{index + 1}</span>
              </div>
              <div className="scene-caption"><h3>{scene.title}</h3><p>{scene.note}</p></div>
            </article>
          ))}
        </div>
        <div className="gallery-controls" data-reveal="fade-up" data-reveal-delay="2">
          <p><span>{String(current + 1).padStart(2, '0')}</span> / 07</p>
          <div><button type="button" onClick={() => move(-1)} aria-label="Cenário anterior">←</button><button type="button" onClick={() => move(1)} aria-label="Próximo cenário">→</button></div>
        </div>
      </div>
    </section>
  );
}
