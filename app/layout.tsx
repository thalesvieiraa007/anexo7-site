import type { Metadata } from 'next';
import './globals.css';

const title = 'ANEXO 7 — Um novo cenário a cada 7 dias';
const description = 'Estúdio cenográfico para fotografia, moda, campanhas e audiovisual. Uma nova experiência visual a cada sete dias.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: '/og.png', width: 1731, height: 909, alt: title }], locale: 'pt_BR', type: 'website' },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

