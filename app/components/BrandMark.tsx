import Image from 'next/image';

type BrandMarkProps = { className?: string };

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`.trim()} aria-hidden="true">
      <Image src="/media/anexo7-logo-transparent.png" alt="" width={2169} height={725} sizes="(max-width: 720px) 150px, 284px" />
    </span>
  );
}
