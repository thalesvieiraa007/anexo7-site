import { BackstageSection } from './components/BackstageSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OrbitSeven } from './components/OrbitSeven';
import { ScenarioGallery } from './components/ScenarioGallery';
import { ScrollReveal } from './components/ScrollReveal';
import { WhatsAppFloat } from './components/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />

      <main className="anexo-site" id="conteudo">
        <Hero />
        <ScrollReveal />

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

        <BackstageSection />

        <ScenarioGallery />

        <section className="cycle-statement" data-reveal-section aria-label="Conceito de renovação semanal">
          <div className="floating-spheres cycle-spheres" data-reveal="scale" data-reveal-duration="long" aria-hidden="true"><span /><span /><span /><span /></div>
          <p data-reveal="fade-up">Quando você voltar,</p>
          <h2 data-reveal="blur" data-reveal-delay="1" data-reveal-duration="long">já será<br /><span>outro lugar.</span></h2>
          <div className="cycle-seven" data-reveal="scale" data-reveal-delay="2" data-reveal-duration="long" aria-hidden="true">7</div>
          <p className="cycle-caption" data-reveal="fade-left" data-reveal-delay="3">Um ciclo contínuo de arquitetura, direção de arte e imagem.</p>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
