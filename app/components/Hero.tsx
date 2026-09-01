import Image from 'next/image';

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <Image src="/media/hero-industrial.jpg" alt="Produção de moda no cenário industrial do ANEXO 7" fill priority sizes="100vw" />
      <div className="hero-shade" />
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

