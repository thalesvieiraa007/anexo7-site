import { FaWhatsapp } from 'react-icons/fa6';

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href="https://wa.me/message/JHS64XR2XQUQH1"
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com o ANEXO 7 no WhatsApp"
    >
      <span className="whatsapp-mark" aria-hidden="true"><FaWhatsapp /></span>
    </a>
  );
}
