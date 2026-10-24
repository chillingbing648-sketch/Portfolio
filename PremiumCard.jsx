'use client';
import React, { useRef } from 'react';
import LiquidButton from './LiquidButton.jsx'; // your existing button, untouched

/**
 * PremiumCard – "The Complete Universe" call-to-action card.
 *
 * Material idea: the button is wet, glossy and convex; the card is its opposite —
 * brushed white-silver glass with a hairline edge, a faint engineering grid and a soft
 * spotlight that follows the cursor. The only thing they share is the indigo
 * light colour, so the button looks "seated" in the card instead of copied by it.
 */

const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .6 0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const CSS = `
.pc{--mx:30%;--my:0%;position:relative;width:100%;max-width:960px;margin:0 auto 4.8rem;border-radius:28px;
  font-family:"Plus Jakarta Sans","Inter","Segoe UI",system-ui,sans-serif;color:#151824;
  box-shadow:0 60px 110px -35px rgba(0,0,0,.9),0 24px 48px -24px rgba(0,0,0,.65),0 0 130px -30px rgba(190,200,255,.38)}
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

.pc-body{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);
  align-items:center;gap:clamp(16px,3vw,40px);padding:clamp(28px,4vw,48px)}
.pc-copy{display:flex;flex-direction:column;align-items:flex-start}
.pc-eyebrow{display:inline-flex;align-items:center;gap:10px;padding:6px 13px 6px 11px;border-radius:999px;
  border:1px solid rgba(20,24,40,.1);background:rgba(255,255,255,.65);box-shadow:0 1px 0 #fff inset,0 1px 2px rgba(20,24,40,.06);
  font:500 11.5px/1 "JetBrains Mono","SF Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#596077}
.pc-dot{width:6px;height:6px;border-radius:50%;background:#5b6cff;box-shadow:0 0 8px 1px rgba(91,108,255,.55)}
.pc-title{margin:22px 0 14px;font-size:clamp(28px,3.4vw,42px);line-height:1.08;font-weight:700;letter-spacing:-.03em;
  text-wrap:balance;background:linear-gradient(180deg,#0b0d15 30%,#4b5166);-webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent}
.pc-text{margin:0;max-width:46ch;font-size:16.5px;line-height:1.65;color:#5f657a}
.pc-text b{font-weight:600;color:#161a28}

.pc-aside{position:relative;display:grid;place-items:center;min-height:170px}
.pc-aside::before{content:"";position:absolute;width:min(380px,110%);aspect-ratio:1.5;border-radius:50%;
  background:radial-gradient(closest-side,rgba(150,158,182,.5),rgba(120,130,255,.10) 62%,transparent);filter:blur(6px)}
.pc-orbit{position:absolute;border-radius:50%;border:1px solid rgba(20,24,40,.1);pointer-events:none;
  -webkit-mask-image:radial-gradient(closest-side,transparent 55%,#000);mask-image:radial-gradient(closest-side,transparent 55%,#000)}
.pc-orbit--a{width:300px;height:190px}
.pc-orbit--b{width:430px;height:280px;border-color:rgba(20,24,40,.06)}

@media (prefers-reduced-motion:no-preference){
  .pc-copy>*{animation:pc-in .8s cubic-bezier(.2,.7,.2,1) both}
  .pc-copy>:nth-child(2){animation-delay:.08s}.pc-copy>:nth-child(3){animation-delay:.16s}
  @keyframes pc-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
}
@media (max-width:820px){
  .pc{margin-bottom:3rem}
  .pc-body{grid-template-columns:1fr}
  .pc-aside{justify-self:start;min-height:130px}
  .pc-orbit{display:none}
}
`;

export function PremiumCard({
  eyebrow = 'The complete universe',
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
          <span className="pc-eyebrow"><i className="pc-dot" />{eyebrow}</span>
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
