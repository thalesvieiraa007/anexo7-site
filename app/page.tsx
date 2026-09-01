import Image from 'next/image';
import { AmbientVideo } from './components/AmbientVideo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OrbitSeven } from './components/OrbitSeven';
import { ScenarioGallery } from './components/ScenarioGallery';
import { ScrollReveal } from './components/ScrollReveal';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function Home() {
  return (
    <main className="anexo-site">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <Hero />
      <ScrollReveal />

      <div id="conteudo">
        <section className="manifest" id="conceito" data-reveal-section aria-labelledby="manifest-title">
          <div className="manifest-number" data-reveal="scale" data-reveal-delay="3" data-reveal-duration="long" aria-hidden="true"><OrbitSeven /></div>
          <div className="manifest-copy">
            <p className="section-index" data-reveal="fade-up">01 — 07</p>
            <p className="section-kicker" data-reveal="fade-up" data-reveal-delay="1">O estúdio nunca fica pronto</p>
            <h2 id="manifest-title" data-reveal="blur" data-reveal-delay="2" data-reveal-duration="long">A cada sete dias,<br />o espaço esquece<br />o que era.</h2>
            <div className="manifest-note" data-reveal="fade-up" data-reveal-delay="3">
              <p>O ANEXO 7 é um estúdio cenográfico em constante transformação. Um lugar para campanhas, editoriais, conteúdo e imagens que precisam existir fora do óbvio.</p>
              <p>Você não entra apenas em um set.<br />Entra na próxima ideia.</p>
            </div>
          </div>
        </section>

        <section className="studio-entry" data-reveal-section aria-labelledby="entry-title">
          <div className="entry-copy">
            <p className="section-index" data-reveal="fade-right">02 — Entrada</p>
            <h2 id="entry-title" data-reveal="fade-right" data-reveal-delay="1" data-reveal-duration="long">Atravesse<br />o galpão.</h2>
            <p data-reveal="blur" data-reveal-delay="2">Concreto, luz, estrutura e silêncio antes do clique. O percurso começa muito antes da câmera.</p>
            <dl data-reveal="fade-up" data-reveal-delay="4"><div><dt>Formato</dt><dd>Foto + Vídeo</dd></div><div><dt>Ciclo</dt><dd>07 dias</dd></div><div><dt>Estado</dt><dd>Em transformação</dd></div></dl>
          </div>
          <div className="entry-media" data-reveal="media" data-reveal-delay="3" data-reveal-duration="long">
            <Image className="entry-backdrop" src="/media/behind-the-scenes.jpg" alt="" fill sizes="(max-width: 800px) 100vw, 65vw" />
            <AmbientVideo src="/media/studio-walkthrough.mp4" poster="/media/behind-the-scenes.jpg" label="Passeio visual pelo galpão e pelos bastidores do ANEXO 7" className="entry-video" />
            <span className="entry-time" aria-hidden="true">REC · ANEXO 7</span>
          </div>
        </section>

        <ScenarioGallery />

        <section className="cycle-statement" data-reveal-section aria-label="Conceito de renovação semanal">
          <div className="floating-spheres cycle-spheres" data-reveal="scale" data-reveal-duration="long" aria-hidden="true"><span /><span /><span /><span /></div>
          <p data-reveal="fade-up">Quando você voltar,</p>
          <h2 data-reveal="blur" data-reveal-delay="1" data-reveal-duration="long">já será<br /><span>outro lugar.</span></h2>
          <div className="cycle-seven" data-reveal="scale" data-reveal-delay="2" data-reveal-duration="long" aria-hidden="true">7</div>
          <p className="cycle-caption" data-reveal="fade-left" data-reveal-delay="3">Um ciclo contínuo de arquitetura, direção de arte e imagem.</p>
        </section>
      </div>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
