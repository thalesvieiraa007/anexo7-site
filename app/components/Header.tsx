'use client';

import { useEffect, useState } from 'react';
import { BrandMark } from './BrandMark';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-menu-open' : ''}`}>
      <a className="wordmark" href="#inicio" aria-label="ANEXO 7 — início" onClick={() => setOpen(false)}>
        <BrandMark />
      </a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen((value) => !value)}>
        <span /><span />
      </button>
      <nav id="main-navigation" className={open ? 'is-open' : ''} aria-label="Navegação principal">
        <a href="#conceito" onClick={() => setOpen(false)}>Conceito</a>
        <a href="#cenarios" onClick={() => setOpen(false)}>Cenários</a>
        <a href="https://www.instagram.com/anexo7estudio/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <a className="header-cta" href="https://wa.me/message/JHS64XR2XQUQH1" target="_blank" rel="noreferrer">Mais informações</a>
      </nav>
    </header>
  );
}
