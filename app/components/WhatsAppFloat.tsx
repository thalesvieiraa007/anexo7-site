import { FaWhatsapp } from 'react-icons/fa6';

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/message/JHS64XR2XQUQH1"
      target="_blank"
      rel="noreferrer"
      aria-label="Agende seu cenário agora pelo WhatsApp do ANEXO 7"
    >
      <span className="whatsapp-mark" aria-hidden="true"><FaWhatsapp /></span>
      <span><small>WhatsApp</small>Agende seu cenário agora</span>
      <i aria-hidden="true">↗</i>
    </a>
  );
}
