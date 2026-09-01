import Image from 'next/image';

const H = {
  front: 'M 142 400 A 258 70 0 0 0 658 400',
  back: 'M 142 400 A 258 70 0 0 1 658 400',
};

const V = {
  front: 'M 400 142 A 70 258 0 0 1 400 658',
  back: 'M 400 142 A 70 258 0 0 0 400 658',
};

const D = {
  front: 'M 580 249 A 235 65 -40 0 1 220 551',
  back: 'M 580 249 A 235 65 -40 0 0 220 551',
};

type OrbitSide = 'front' | 'back';

function OrbitLayer({ side }: { side: OrbitSide }) {
  return (
    <svg className={`orbit-layer orbit-layer-${side}`} viewBox="0 0 800 800" aria-hidden="true" focusable="false">
      <g className={`orbit-group orbit-${side} anim-h`}><path className="orbit-path" d={H[side]} /></g>
      <g className={`orbit-group orbit-${side} anim-v`}><path className="orbit-path" d={V[side]} /></g>
      <g className={`orbit-group orbit-${side} anim-d`}><path className="orbit-path" d={D[side]} /></g>
    </svg>
  );
}

export function OrbitSeven() {
  return (
    <>
      <OrbitLayer side="back" />
      <Image
        className="manifest-orbit-logo"
        src="/media/anexo7-logo-transparent.png"
        alt=""
        width={2169}
        height={725}
        sizes="(max-width: 620px) 66vw, (max-width: 900px) 360px, 30vw"
      />
      <OrbitLayer side="front" />
      <i>dias · novos mundos ·</i>
    </>
  );
}
