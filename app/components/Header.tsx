'use client';

import { useEffect, useRef, useState } from 'react';
import { BrandMark } from './BrandMark';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

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

    const navigation = navigationRef.current;
    const navigationLinks = navigation
      ? Array.from(navigation.querySelectorAll<HTMLElement>('a[href]'))
      : [];
    const focusableElements = [menuToggleRef.current, ...navigationLinks].filter(
      (element): element is HTMLElement => Boolean(element),
    );
    const focusFrame = window.requestAnimationFrame(() => navigationLinks[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        menuToggleRef.current?.focus();
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || focusableElements.length === 0) return;

      const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
      const nextIndex = event.shiftKey
        ? (currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1)
        : (currentIndex === focusableElements.length - 1 ? 0 : currentIndex + 1);

      if (currentIndex === -1 || (event.shiftKey && currentIndex === 0) || (!event.shiftKey && currentIndex === focusableElements.length - 1)) {
        event.preventDefault();
        focusableElements[nextIndex]?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-menu-open' : ''}`}>
      <a className="wordmark" href="#inicio" aria-label="ANEXO 7 — início" onClick={() => setOpen(false)}>
        <BrandMark />
      </a>
      <button ref={menuToggleRef} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen((value) => !value)}>
        <span /><span />
      </button>
      <nav ref={navigationRef} id="main-navigation" className={open ? 'is-open' : ''} aria-label="Navegação principal">
        <a href="#conceito" onClick={() => setOpen(false)}>Conceito</a>
        <a href="#cenarios" onClick={() => setOpen(false)}>Cenários</a>
        <a href="https://www.instagram.com/anexo7estudio/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <a className="header-cta" href="https://wa.me/message/JHS64XR2XQUQH1" target="_blank" rel="noreferrer">Mais informações</a>
      </nav>
    </header>
  );
}
