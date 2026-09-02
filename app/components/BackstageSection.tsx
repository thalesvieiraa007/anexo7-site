import { AmbientVideo } from './AmbientVideo';

const backstageClips = [
  {
    id: '01',
    className: 'backstage-card--main',
    src: '/media/backstage-studio-prep.mp4',
    poster: '/media/backstage-studio-prep.jpg',
    category: 'Backstage / Estúdio',
    detail: 'Preparação',
    duration: '00:26',
    label: 'Preparação de equipamentos e luzes no estúdio ANEXO 7',
  },
  {
    id: '02',
    className: 'backstage-card--portrait',
    src: '/media/backstage-studio-motion.mp4',
    poster: '/media/backstage-studio-motion.jpg',
    category: 'Backstage / Estúdio',
    detail: 'Bastidores',
    duration: '00:36',
    label: 'Bastidores de um ensaio em andamento no estúdio ANEXO 7',
  },
  {
    id: '03',
    className: 'backstage-card--production',
    src: '/media/backstage-production-model.mp4',
    poster: '/media/backstage-production-model.jpg',
    category: 'Backstage / Em produção',
    detail: 'Marca em ação',
    duration: '00:17',
    label: 'Produção de uma marca com modelo e cenário no ANEXO 7',
  },
  {
    id: '04',
    className: 'backstage-card--wide',
    src: '/media/backstage-production-wide.mp4',
    poster: '/media/backstage-production-wide.jpg',
    category: 'Backstage / Em produção',
    detail: 'Set em movimento',
    duration: '00:07',
    label: 'Equipe, iluminação e modelos durante uma produção no ANEXO 7',
  },
] as const;

export function BackstageSection() {
  return (
    <section className="backstage-section" data-reveal-section aria-labelledby="backstage-title">
      <header className="backstage-heading">
        <p className="section-index" data-reveal="fade-up">02 — Backstage</p>
        <div className="backstage-heading-copy">
          <p className="backstage-eyebrow" data-reveal="fade-up" data-reveal-delay="1">
            <span aria-hidden="true" /> ANEXO 7 / EM PROCESSO
          </p>
          <h2 id="backstage-title" data-reveal="blur" data-reveal-delay="2" data-reveal-duration="long">
            Antes da imagem,<br />vem o processo.
          </h2>
          <p className="backstage-intro" data-reveal="fade-up" data-reveal-delay="3">
            Luz, direção, preparação e movimento. O que acontece antes do resultado também faz parte da cena.
          </p>
          <p className="backstage-scroll-cue" data-reveal="fade-up" data-reveal-delay="4" aria-hidden="true">
            Role para ver os bastidores <span>↓</span>
          </p>
        </div>
      </header>

      <div className="backstage-stage">
        {backstageClips.map((clip, index) => (
          <figure
            className={`backstage-card ${clip.className}`}
            data-reveal="media"
            data-reveal-delay={String(index + 1)}
            data-reveal-duration="long"
            key={clip.id}
          >
            <AmbientVideo src={clip.src} poster={clip.poster} label={clip.label} />
            <span className="backstage-frame" aria-hidden="true" />
            <div className="backstage-card-top" aria-hidden="true">
              <span className="backstage-rec">REC</span>
              <span>BACKSTAGE / {clip.id}</span>
            </div>
            <figcaption>
              <span>{clip.category}</span>
              <span>{clip.detail}</span>
              <time dateTime={`PT${clip.duration.replace(':', 'M')}S`}>{clip.duration}</time>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
