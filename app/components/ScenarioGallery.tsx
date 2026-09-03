'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { AmbientVideo } from './AmbientVideo';

type SceneMedia =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string; alt: string };

type Scene = {
  title: string;
  note: string;
  media: SceneMedia[];
};

const scenes: Scene[] = [
  {
    title: 'Terra em cena',
    note: 'Volume · matéria · silêncio',
    media: [
      { type: 'image', src: '/media/terracotta-group.jpg', alt: 'Três modelos no cenário terracota diante de uma composição com raposas' },
      { type: 'image', src: '/media/terracotta-stage.jpg', alt: 'Editorial em cenário monocromático terracota com raposa' },
    ],
  },
  {
    title: 'Faroeste urbano',
    note: 'Madeira · couro · tensão',
    media: [
      { type: 'image', src: '/media/western-portrait.jpg', alt: 'Modelo com figurino marrom no cenário de faroeste urbano' },
      { type: 'image', src: '/media/western-stage.jpg', alt: 'Vista completa do cenário de faroeste urbano' },
      { type: 'image', src: '/media/western-seated.jpg', alt: 'Modelo sentada no cenário de faroeste urbano' },
      { type: 'image', src: '/media/western-detail.jpg', alt: 'Detalhe de moda em couro no cenário de faroeste urbano' },
      { type: 'video', src: '/media/western-motion.mp4', poster: '/media/western-stage.jpg', alt: 'Vídeo do cenário de faroeste urbano' },
    ],
  },
  {
    title: 'Estruturas',
    note: 'Metal · sombra · precisão',
    media: [
      { type: 'image', src: '/media/metal-stage.jpg', alt: 'Modelo no cenário metálico industrial' },
      { type: 'image', src: '/media/metal-group.jpg', alt: 'Três modelos no cenário metálico industrial' },
      { type: 'image', src: '/media/metal-portrait.jpg', alt: 'Retrato no cenário de estruturas metálicas' },
      { type: 'image', src: '/media/metal-close.jpg', alt: 'Detalhe de editorial denim no cenário metálico' },
      { type: 'image', src: '/media/metal-duo.jpg', alt: 'Duas modelos no cenário de estruturas metálicas' },
    ],
  },
  {
    title: 'Coração aberto',
    note: 'Luz · afeto · vermelho',
    media: [
      { type: 'image', src: '/media/heart-stage.jpg', alt: 'Modelo diante de projeção luminosa em formato de coração' },
      { type: 'image', src: '/media/heart-balloons.jpg', alt: 'Modelo entre balões vermelhos em formato de coração' },
      { type: 'image', src: '/media/heart-flowers.jpg', alt: 'Retrato com flores vermelhas e projeção de coração' },
      { type: 'image', src: '/media/heart-red.jpg', alt: 'Editorial em cenário vermelho com textura de corações' },
    ],
  },
  {
    title: 'Brasil em jogo',
    note: 'Cor · gesto · movimento',
    media: [
      { type: 'image', src: '/media/brasil-stage.jpg', alt: 'Modelo no cenário verde e amarelo Brasil em jogo' },
      { type: 'image', src: '/media/brasil-close.jpg', alt: 'Detalhe do editorial Brasil em jogo com bolas de futebol' },
      { type: 'image', src: '/media/brasil-standing.jpg', alt: 'Modelo em pé no cenário Brasil em jogo' },
      { type: 'image', src: '/media/brasil-squat.jpg', alt: 'Modelo agachada com bola no cenário Brasil em jogo' },
      { type: 'image', src: '/media/brasil-ball.jpg', alt: 'Editorial com bola no cenário Brasil em jogo' },
      { type: 'image', src: '/media/brasil-bts.jpg', alt: 'Bastidores da montagem do cenário Brasil em jogo' },
      { type: 'video', src: '/media/brasil-motion.mp4', poster: '/media/brasil-stage.jpg', alt: 'Vídeo do cenário Brasil em jogo' },
    ],
  },
  {
    title: 'Linha de força',
    note: 'Ritmo · corpo · direção',
    media: [
      { type: 'image', src: '/media/fitness-stage.jpg', alt: 'Produção esportiva na pista cenográfica' },
      { type: 'image', src: '/media/fitness-seated.jpg', alt: 'Atleta sentado na pista cenográfica' },
      { type: 'image', src: '/media/fitness-runner.jpg', alt: 'Atleta em posição de largada' },
      { type: 'image', src: '/media/fitness-rope.jpg', alt: 'Atleta treinando com corda naval' },
      { type: 'image', src: '/media/fitness-balls.jpg', alt: 'Atleta entre bolas de exercício prateadas' },
    ],
  },
  {
    title: 'Órbita bruta',
    note: 'Ferrugem · luz dura · moda',
    media: [{ type: 'image', src: '/media/rust-portrait.jpg', alt: 'Modelo em frente a escultura circular oxidada' }],
  },
  {
    title: 'Constelação pop',
    note: 'Cor · pontos · suspensão',
    media: [{ type: 'video', src: '/media/confetti-motion.mp4', poster: '/media/confetti-stage.jpg', alt: 'Cenário branco com pontos coloridos e formas suspensas' }],
  },
  {
    title: 'Bistrô noturno',
    note: 'Luz quente · rua · encontro',
    media: [{ type: 'video', src: '/media/bistro-motion.mp4', poster: '/media/bistro-stage.jpg', alt: 'Fachada cenográfica de bistrô iluminado à noite' }],
  },
  {
    title: 'Jardim menta',
    note: 'Verde · flor · delicadeza',
    media: [{ type: 'video', src: '/media/mint-motion.mp4', poster: '/media/mint-stage.jpg', alt: 'Cenário verde menta com flores e regadores metálicos' }],
  },
];

function SceneCard({ scene, index }: { scene: Scene; index: number }) {
  const [active, setActive] = useState(0);
  const selected = scene.media[active];

  function changeMedia(direction: 1 | -1) {
    setActive((current) => (current + direction + scene.media.length) % scene.media.length);
  }

  return (
    <article
      className="scene"
      aria-label={`Cenário ${index + 1} de ${scenes.length}: ${scene.title}`}
    >
      <div className="scene-media">
        <div className="scene-media-stage" key={selected.src}>
          {selected.type === 'image' ? (
            <Image src={selected.src} alt={selected.alt} fill loading="lazy" sizes="(max-width: 720px) 84vw, 42vw" />
          ) : (
            <AmbientVideo src={selected.src} poster={selected.poster} label={selected.alt} />
          )}
        </div>
        <span className="scene-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        {scene.media.length > 1 ? (
          <div className="scene-media-nav" aria-label={`Mídias de ${scene.title}`}>
            <button type="button" onClick={() => changeMedia(-1)} aria-label={`Mídia anterior de ${scene.title}`}>←</button>
            <span aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(scene.media.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => changeMedia(1)} aria-label={`Próxima mídia de ${scene.title}`}>→</button>
          </div>
        ) : null}
      </div>
      <div className="scene-caption"><h3>{scene.title}</h3><p>{scene.note}</p></div>
    </article>
  );
}

export function ScenarioGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  function move(direction: 1 | -1) {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.62, behavior: 'smooth' });
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
    <section className="scenarios" id="cenarios" data-reveal-section aria-labelledby="scenarios-title">
      <div className="scenarios-heading">
        <div data-reveal="fade-up"><p className="section-index">03 — 07</p><p className="section-kicker">Cenários em rotação</p></div>
        <h2 id="scenarios-title" data-reveal="blur" data-reveal-delay="1" data-reveal-duration="long">Explore o que<br />já existiu aqui.</h2>
        <p className="scenarios-intro" data-reveal="fade-up" data-reveal-delay="2">Cada ambiente nasce com prazo para desaparecer. Arraste, descubra e imagine o próximo.</p>
      </div>
      <div className="gallery-shell">
        <div ref={trackRef} className="gallery-track" data-reveal="scene" data-reveal-delay="3" onScroll={syncCurrent} tabIndex={0} aria-label={`Galeria horizontal de ${scenes.length} cenários`}>
          {scenes.map((scene, index) => <SceneCard scene={scene} index={index} key={scene.title} />)}
        </div>
        <div className="gallery-controls" data-reveal="fade-up" data-reveal-delay="4">
          <p><span>{String(current + 1).padStart(2, '0')}</span> / {String(scenes.length).padStart(2, '0')}</p>
          <div className="gallery-navigation"><button type="button" onClick={() => move(-1)} aria-label="Cenário anterior">←</button><button type="button" onClick={() => move(1)} aria-label="Próximo cenário">→</button></div>
        </div>
      </div>
    </section>
  );
}
