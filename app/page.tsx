import Image from 'next/image';
import { AmbientVideo } from './components/AmbientVideo';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScenarioGallery } from './components/ScenarioGallery';

export default function Home() {
  return (
    <main className="anexo-site">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <Hero />

      <div id="conteudo">
        <section className="manifest" id="conceito" aria-labelledby="manifest-title">
          <div className="manifest-number" aria-hidden="true"><span>7</span><i>dias · novos mundos ·</i></div>
          <div className="manifest-copy">
            <p className="section-index">01 — 07</p>
            <p className="section-kicker">O estúdio nunca fica pronto</p>
            <h2 id="manifest-title">A cada sete dias,<br />o espaço esquece<br />o que era.</h2>
            <div className="manifest-note">
              <p>O ANEXO 7 é um estúdio cenográfico em constante transformação. Um lugar para campanhas, editoriais, conteúdo e imagens que precisam existir fora do óbvio.</p>
              <p>Você não entra apenas em um set.<br />Entra na próxima ideia.</p>
            </div>
          </div>
        </section>

        <section className="studio-entry" aria-labelledby="entry-title">
          <div className="entry-copy">
            <p className="section-index">02 — Entrada</p>
            <h2 id="entry-title">Atravesse<br />o galpão.</h2>
            <p>Concreto, luz, estrutura e silêncio antes do clique. O percurso começa muito antes da câmera.</p>
            <dl><div><dt>Formato</dt><dd>Foto + Vídeo</dd></div><div><dt>Ciclo</dt><dd>07 dias</dd></div><div><dt>Estado</dt><dd>Em transformação</dd></div></dl>
          </div>
          <div className="entry-media">
            <Image className="entry-backdrop" src="/media/behind-the-scenes.jpg" alt="" fill sizes="(max-width: 800px) 100vw, 65vw" />
            <AmbientVideo src="/media/studio-walkthrough.mp4" poster="/media/behind-the-scenes.jpg" label="Passeio visual pelo galpão e pelos bastidores do ANEXO 7" className="entry-video" />
            <span className="entry-time" aria-hidden="true">REC · ANEXO 7</span>
          </div>
        </section>

        <ScenarioGallery />

        <section className="cycle-statement" aria-label="Conceito de renovação semanal">
          <p>Quando você voltar,</p>
          <h2>já será<br /><span>outro lugar.</span></h2>
          <div className="cycle-seven" aria-hidden="true">7</div>
          <p className="cycle-caption">Um ciclo contínuo de arquitetura, direção de arte e imagem.</p>
        </section>
      </div>

      <Footer />
    </main>
  );
}

