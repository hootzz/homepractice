import Image from 'next/image';
import type { SketchKey, HomePresentation } from '@/content/presentation';

// Fallback line drawings used until an approved game capture exists for the session
// (presentation.scene.image). Developer note only; no placeholder label is shown to users.
const paths: Record<SketchKey, React.ReactNode> = {
  berries: <>
    <path d="M18 86c22-6 44-22 58-46m-30 30 6 12m10-24 9 6m-30 22-4-9"/>
    <path className="faint" d="m30 80 4-3m10-9 4-2m10-11 3-4"/>
    <circle className="fill-berry" cx="84" cy="34" r="7"/><circle className="fill-berry" cx="97" cy="44" r="6"/><circle className="fill-berry" cx="82" cy="50" r="5"/>
  </>,
  walnut: <>
    <path className="fill-warm" d="M62 30c-18-13-39 8-36 32 1 24 20 37 38 29 18 8 36-7 37-30 2-25-21-43-39-31Z"/>
    <path d="M63 31c-9 15 6 20-1 32s-1 20 1 29M44 39c-12 8-6 18-7 25s4 13 12 15M81 38c12 9 5 18 7 25s-4 13-11 17M43 54l9 5m20 9 11-7"/>
  </>,
  waiting: <>
    <path d="M24 56h80M30 56v26m68-26v26M28 46h72"/>
    <ellipse className="fill-soft" cx="52" cy="92" rx="7" ry="4"/><ellipse className="fill-soft" cx="76" cy="92" rx="7" ry="4"/>
    <path className="faint" d="M48 30h32"/>
  </>,
  footpath: <>
    <path className="faint" d="M20 100c22-16 18-40 42-52s30-26 46-34"/>
    <ellipse className="fill-soft" cx="49" cy="72" rx="9" ry="14" transform="rotate(20 49 72)"/>
    <ellipse className="fill-soft" cx="79" cy="45" rx="9" ry="14" transform="rotate(20 79 45)"/>
  </>,
  flow: <>
    <rect className="fill-soft" x="8" y="44" width="22" height="22" rx="5"/><rect className="fill-soft" x="38" y="44" width="22" height="22" rx="5"/>
    <rect className="fill-soft" x="68" y="44" width="22" height="22" rx="5"/><rect className="fill-soft" x="98" y="44" width="22" height="22" rx="5"/>
    <path d="m31 55h5m-2-2 2 2-2 2m28-2h5m-2-2 2 2-2 2m28-2h5m-2-2 2 2-2 2"/>
  </>,
  rain_hand: <>
    <path d="m40 18-5 12m28-16-5 12m28-8-5 12"/>
    <path className="fill-warm" d="M38 62c0 14 12 22 26 22s26-8 26-22c-8 4-17 6-26 6s-18-2-26-6Z"/>
    <ellipse className="faint" cx="64" cy="98" rx="34" ry="5"/>
  </>,
  three_fields: <>
    <path className="fill-soft" d="M78 26c-8 0-12-10-3-13 2-9 15-10 19-3 9-1 13 12 4 15Z"/>
    <rect x="14" y="48" width="30" height="40" rx="5"/><rect x="49" y="48" width="30" height="40" rx="5"/><rect className="fill-soft" x="84" y="48" width="30" height="40" rx="5"/>
  </>,
  activity_cards: <>
    <rect className="fill-soft" x="27" y="29" width="49" height="63" rx="5" transform="rotate(-10 27 29)"/>
    <rect className="fill-paper" x="53" y="24" width="49" height="63" rx="5" transform="rotate(8 53 24)"/>
    <path d="m67 43 18 3m-20 9 23 3m-25 9 16 2"/>
  </>,
  gathered: <>
    <rect className="fill-soft" x="16" y="36" width="28" height="40" rx="5"/><rect className="fill-paper" x="50" y="30" width="28" height="40" rx="5"/><rect className="fill-soft" x="84" y="36" width="28" height="40" rx="5"/>
    <path className="faint" d="M20 92h88"/>
  </>,
  breath_three: <>
    <path d="M28 20h72M28 92h72"/>
    <path className="fill-soft" d="M30 22c18 10 30 22 34 34 4-12 16-24 34-34Z"/><path className="fill-soft" d="M30 90c18-10 30-22 34-34 4 12 16 24 34 34Z"/>
  </>,
};

/** Sketch only (thumbnails). */
export function SceneSketch({sketch,alt}:{sketch:SketchKey;alt:string}) {
  return <svg className="sketch" viewBox="0 0 128 112" role={alt?"img":undefined} aria-label={alt||undefined} aria-hidden={alt?undefined:true} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[sketch]}</svg>;
}

/** The one representative scene of a home practice: an approved capture when present,
 *  otherwise the sketch on a quiet panel. 16:9 (sketches 3:1); compacts once the person moves on to today's practice. */
export function SceneHero({scene,compact=false}:{scene:HomePresentation["scene"];compact?:boolean}) {
  return <div className={`scene-hero${scene.image?'':' is-sketch'}${compact?' is-compact':''}`}>{scene.image
    ?<Image src={scene.image.src} width={scene.image.width} height={scene.image.height} alt={scene.alt} unoptimized priority style={scene.image.focus?{objectPosition:scene.image.focus}:undefined}/>
    :<SceneSketch sketch={scene.sketch} alt={scene.alt}/>}</div>;
}
