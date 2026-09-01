'use client';

import { FormEvent, useState } from 'react';
import { BrandMark } from './BrandMark';

export function Footer() {
  const [sent, setSent] = useState(false);
  function submitNewsletter(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }

  return (
    <footer className="site-footer" id="contato">
      <div className="footer-callout">
        <p>Seu próximo set<br />pode começar aqui.</p>
        <a href="https://wa.me/message/JHS64XR2XQUQH1" target="_blank" rel="noreferrer">Falar com o ANEXO 7 <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-grid">
        <div className="footer-brand"><a className="footer-wordmark" href="#inicio" aria-label="ANEXO 7 — início"><BrandMark className="brand-mark-footer" /></a><p>Estúdio cenográfico para fotografia, moda, conteúdo e audiovisual.</p></div>
        <div className="footer-links"><p>Conecte-se</p><a href="https://www.instagram.com/anexo7estudio/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://wa.me/message/JHS64XR2XQUQH1" target="_blank" rel="noreferrer">WhatsApp ↗</a><a href="https://share.google/JmyZKXWmNFDlbMyon" target="_blank" rel="noreferrer">Localização ↗</a></div>
        <div className="newsletter">
          <p>Receba o próximo cenário.</p>
          {sent ? <div className="newsletter-success" role="status">Cadastro preparado. A integração será ativada em breve.</div> : <form onSubmit={submitNewsletter}><label className="sr-only" htmlFor="newsletter-email">Seu melhor e-mail</label><input id="newsletter-email" type="email" placeholder="SEU MELHOR E-MAIL" required /><button type="submit" aria-label="Cadastrar e-mail">→</button></form>}
          <small>Sem spam. Só novas ideias em cena.</small>
        </div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} ANEXO 7</p><p>Um novo cenário a cada 7 dias.</p><a href="#inicio">Voltar ao topo ↑</a></div>
    </footer>
  );
}
