import React, { useRef } from 'react';
import { LiquidButton } from './LiquidButton.jsx';

/**
 * PremiumCard — brushed white-silver glass card with hairline ring,
 * cursor spotlight, and nested orbits around the LiquidButton CTA.
 *
 * Designed to sit in a dark cosmic viewport. The card itself reads as a
 * bright, refined editorial module (Apple / Linear key visual style).
 */

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .6 0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const CSS = `
.pc{--mx:30%;--my:0%;position:relative;width:100%;max-width:730px;margin:0 auto 4.2rem;border-radius:22px;padding:0;box-sizing:border-box;
  font-family:"Plus Jakarta Sans","Inter","Segoe UI",system-ui,sans-serif;color:#151824;
  box-shadow:0 50px 100px -30px rgba(0,0,0,.85),0 20px 40px -20px rgba(0,0,0,.6),0 0 110px -25px rgba(190,200,255,.35)}
.pc-bg{position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;
  background:
    linear-gradient(115deg,transparent 30%,rgba(255,255,255,.7) 44%,rgba(255,255,255,0) 58%),
    linear-gradient(160deg,#fdfdfe 0%,#eceef2 52%,#d9dce4 100%);
  box-shadow:inset 0 1px 0 #fff,inset 0 -1px 0 rgba(20,24,40,.1),inset 0 -40px 60px -40px rgba(120,130,160,.25)}
.pc-bg::before{content:"";position:absolute;inset:0;
  background-image:linear-gradient(rgba(20,24,40,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(20,24,40,.045) 1px,transparent 1px);
  background-size:36px 36px;
  -webkit-mask-image:radial-gradient(ellipse 70% 90% at 15% 0%,#000,transparent 75%);
  mask-image:radial-gradient(ellipse 70% 90% at 15% 0%,#000,transparent 75%)}
.pc-bg::after{content:"";position:absolute;left:8%;right:8%;top:0;height:1px;
  background:linear-gradient(90deg,transparent,#fff,transparent)}
.pc-spot{position:absolute;inset:0;opacity:0;transition:opacity .5s;
  background:radial-gradient(420px circle at var(--mx) var(--my),rgba(255,255,255,.95),rgba(255,255,255,0) 70%)}
.pc:hover .pc-spot{opacity:1}
.pc-noise{position:absolute;inset:0;background-image:${NOISE};opacity:.07;mix-blend-mode:multiply}

.pc-ring{position:absolute;inset:0;border-radius:inherit;padding:1px;pointer-events:none;
  background:linear-gradient(135deg,rgba(255,255,255,.98),rgba(170,177,196,.6) 40%,rgba(150,158,180,.55) 70%,rgba(255,255,255,.8));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
.pc-ring--glow{opacity:0;transition:opacity .5s;
  background:radial-gradient(360px circle at var(--mx) var(--my),rgba(110,125,255,.75),transparent 65%)}
.pc:hover .pc-ring--glow{opacity:1}

.pc-body{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.18fr) minmax(0,.82fr);
  align-items:center;gap:clamp(12px,1.8vw,24px);padding:clamp(12px,1.4vw,16px) clamp(18px,2.4vw,30px)}
.pc-copy{display:flex;flex-direction:column;align-items:flex-start}
.pc-title{margin:0 0 5px;font-size:clamp(19px,1.9vw,25px);line-height:1.15;font-weight:700;letter-spacing:-.025em;
  text-wrap:balance;background:linear-gradient(180deg,#090a10 25%,#2a2f3f 80%,#444b5f 100%);-webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent}
.pc-text{margin:0;max-width:38ch;font-size:13.5px;line-height:1.45;color:#52586c;letter-spacing:-.01em}
.pc-text b{font-weight:600;color:#0d1019}

.pc-aside{position:relative;display:grid;place-items:center;min-height:76px}
.pc-aside::before{content:"";position:absolute;width:min(260px,100%);aspect-ratio:1.8;border-radius:50%;
  background:radial-gradient(closest-side,rgba(150,158,182,.5),rgba(120,130,255,.10) 62%,transparent);filter:blur(6px)}
.pc-orbit{position:absolute;border-radius:50%;border:1px solid rgba(20,24,40,.1);pointer-events:none;
  -webkit-mask-image:radial-gradient(closest-side,transparent 55%,#000);mask-image:radial-gradient(closest-side,transparent 55%,#000)}
.pc-orbit--a{width:200px;height:90px}
.pc-orbit--b{width:290px;height:125px;border-color:rgba(20,24,40,.06)}

@media (prefers-reduced-motion:no-preference){
  .pc-copy>*{animation:pc-in .8s cubic-bezier(.2,.7,.2,1) both}
  .pc-copy>:nth-child(2){animation-delay:.08s}
  @keyframes pc-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
}
@media (max-width:820px){
  .pc{margin-bottom:2.6rem}
  .pc-body{grid-template-columns:1fr;gap:14px;padding:16px 20px}
  .pc-aside{justify-self:start;min-height:64px}
  .pc-orbit{display:none}
}
`;

export function PremiumCard({
  title = 'Explore Beyond the Featured Work',
  href = 'projects/',
  className = '',
  children = (
    <>
      Dive into <b>16+ production architectures</b>, <b>interactive AI tools</b>, and{' '}
      <b>full-stack software systems</b>.
    </>
  ),
}) {
  const ref = useRef(null);

  // cursor position goes straight to CSS variables – no React re-render per move
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section ref={ref} className={`pc ${className}`.trim()} onPointerMove={onMove}>
      <style>{CSS}</style>

      <div className="pc-bg" aria-hidden="true">
        <div className="pc-spot" />
        <div className="pc-noise" />
      </div>
      <div className="pc-ring" aria-hidden="true" />
      <div className="pc-ring pc-ring--glow" aria-hidden="true" />

      <div className="pc-body">
        <div className="pc-copy">
          <h2 className="pc-title">{title}</h2>
          <p className="pc-text">{children}</p>
        </div>

        <div className="pc-aside">
          <span className="pc-orbit pc-orbit--a" aria-hidden="true" />
          <span className="pc-orbit pc-orbit--b" aria-hidden="true" />
          <LiquidButton href={href} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Preview: drop this file next to LiquidButton.jsx and render the default export ---------- */
export default function PremiumCardPreview() {
  return (
    <div
      style={{
        minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '80px 24px',
        background:
          'radial-gradient(ellipse 60% 50% at 8% 0%, rgba(150,80,170,.45), transparent 70%),' +
          'radial-gradient(ellipse 50% 40% at 95% 100%, rgba(70,60,200,.25), transparent 70%), #05050b',
      }}
    >
      <PremiumCard />
    </div>
  );
}
