import Image from 'next/image';

type BrandMarkProps = { className?: string };

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <span className={`brand-mark ${className}`.trim()} aria-hidden="true">
      <Image src="/media/anexo7-logo.jpg" alt="" width={150} height={150} sizes="140px" />
    </span>
  );
}
