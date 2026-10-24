'use client'; // needed for Next.js app router, harmless elsewhere
import React, { useEffect, useId, useRef } from 'react';

/**
 * LiquidButton – glossy black pill with viscous tendrils that reach for the cursor.
 * No dependencies. Renders <a> when `href` is given, otherwise <button>.
 *
 * <LiquidButton href="/projects">Explore All Projects ↗</LiquidButton>
 */

const PAD = 360;      // room around the button for tendrils (px)
const RANGE = 300;    // cursor distance at which tendrils start to wake up
const N = 18;         // spine points per tendril

const CSS = `
.lqb-wrap{position:relative;display:inline-block;isolation:isolate}
.lqb-fx{position:absolute;left:${-PAD}px;top:${-PAD}px;pointer-events:none;z-index:0;overflow:visible}
.lqb{position:relative;z-index:1;display:inline-flex;align-items:center;gap:14px;height:74px;padding:0 54px;
  border:0;border-radius:999px;background:transparent;color:#fff;cursor:pointer;text-decoration:none;
  font:600 22px/1 "Plus Jakarta Sans","Inter","Segoe UI",system-ui,sans-serif;letter-spacing:-.02em;
  text-shadow:0 1px 0 rgba(0,0,0,.6);-webkit-tap-highlight-color:transparent}
.lqb-arrow{display:inline-block;transition:transform .35s cubic-bezier(.3,1.6,.5,1)}
.lqb:hover .lqb-arrow,.lqb:focus-visible .lqb-arrow{transform:translate(3px,-3px)}
.lqb:focus-visible{outline:2px solid #9fb0ff;outline-offset:8px}
@media (max-width: 640px) {
  .lqb{height:58px;padding:0 32px;font-size:17px;gap:10px}
}
@media (max-width: 400px) {
  .lqb{height:50px;padding:0 22px;font-size:15px;gap:8px}
}
`;

const rnd = (a, b) => a + Math.random() * (b - a);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const ss = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };

// closed Catmull-Rom spline -> cubic Bézier path
function smooth(P) {
  const n = P.length;
  let d = `M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
    d += `C${(p1[0] + (p2[0] - p0[0]) / 6).toFixed(1)} ${(p1[1] + (p2[1] - p0[1]) / 6).toFixed(1)} ` +
         `${(p2[0] - (p3[0] - p1[0]) / 6).toFixed(1)} ${(p2[1] - (p3[1] - p1[1]) / 6).toFixed(1)} ` +
         `${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + 'Z';
}

export default function LiquidButton({ href, children = <>Explore All Projects <span className="lqb-arrow" aria-hidden="true">↗</span></>, className = '', ...rest }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const fid = `lqf${uid}`, g1 = `lqg1${uid}`, g2 = `lqg2${uid}`;
  const btnRef = useRef(null), svgRef = useRef(null), fltRef = useRef(null);
  const bodyRef = useRef(null), pathRef = useRef(null), glossRef = useRef(null), gloss2Ref = useRef(null);

  useEffect(() => {
    const btn = btnRef.current, svg = svgRef.current, flt = fltRef.current;
    const body = bodyRef.current, path = pathRef.current, gloss = glossRef.current, gloss2 = gloss2Ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let W = 0, H = 0, CX = 0, CY = 0, R = 0, L = 0;
    let press = 0, pressV = 0, running = false, last = 0, raf = 0;
    const m = { x: 0, y: 0, on: false }; // client coordinates

    const slots = Array.from({ length: 12 }, (_, i) => ({
      s: (i + .5) / 12 + rnd(-.025, .025), w: rnd(16, 29), len: rnd(.55, 1), gain: rnd(.7, 1),
      gap: rnd(8, 34), off: rnd(-.35, .35), lat: rnd(-22, 22), bend: rnd(-26, 26),
      f1: rnd(.6, 1.4), f2: rnd(1.2, 2.4), ph: rnd(0, 6.28), wob: rnd(8, 20),
      e: 0, ev: 0, L: 0, dx: 0, dy: 0, pts: null,
    }));

    const drawStatic = () => {
      const i = press * 3.5, set = (el, o) => { for (const k in o) el.setAttribute(k, o[k]); };
      set(body, { x: CX - W / 2 + i, y: CY - H / 2 + i * .8, width: W - i * 2, height: H - i * 1.6, rx: (H - i * 1.6) / 2 });
      set(gloss, { x: CX - W / 2 + R * .9, width: W - R * 1.8, y: CY - H / 2 + 5 + i, height: H * .38, rx: H * .19 });
      set(gloss2, { x: CX - W / 2 + R * 1.1, width: W - R * 2.2, y: CY + H * .2, height: H * .26, rx: H * .13 });
    };

    const measure = () => {
      const b = btn.getBoundingClientRect();
      W = btn.offsetWidth; H = btn.offsetHeight; // unaffected by CSS transforms
      CX = PAD + W / 2; CY = PAD + H / 2; R = H / 2; L = Math.max(0, W / 2 - R);
      const tw = W + PAD * 2, th = H + PAD * 2;
      svg.setAttribute('width', tw); svg.setAttribute('height', th);
      flt.setAttribute('width', tw); flt.setAttribute('height', th);
      drawStatic(); wake();
      return b;
    };

    // point + outward normal on the pill outline, s in [0,1)
    const onPill = (s) => {
      s = ((s % 1) + 1) % 1;
      let d = s * (4 * L + 2 * Math.PI * R);
      if (d < 2 * L) return { x: CX - L + d, y: CY - R, nx: 0, ny: -1 };
      d -= 2 * L;
      if (d < Math.PI * R) { const a = -Math.PI / 2 + d / R; return { x: CX + L + Math.cos(a) * R, y: CY + Math.sin(a) * R, nx: Math.cos(a), ny: Math.sin(a) }; }
      d -= Math.PI * R;
      if (d < 2 * L) return { x: CX + L - d, y: CY + R, nx: 0, ny: 1 };
      d -= 2 * L;
      const a = Math.PI / 2 + d / R;
      return { x: CX - L + Math.cos(a) * R, y: CY + Math.sin(a) * R, nx: Math.cos(a), ny: Math.sin(a) };
    };
    const sdf = (x, y) => Math.hypot(x - clamp(x, CX - L, CX + L), y - CY) - R;

    function wake() {
      if (running) return;
      running = true; last = performance.now(); raf = requestAnimationFrame(frame);
    }

    function frame(now) {
      const dt = Math.min(2.5, (now - last) / 16.667); last = now;
      const t = now / 1000;
      const sr = svg.getBoundingClientRect();            // cursor in local SVG space (scroll-safe)
      const mx = m.x - sr.left, my = m.y - sr.top;
      const prox = m.on ? ss(RANGE, 40, sdf(mx, my)) : 0;
      let busy = m.on && prox > 0, d = '';

      pressV *= Math.pow(.8, dt); press += pressV * dt; pressV += -press * .12 * dt; // press squash spring
      if (Math.abs(press) > .001 || Math.abs(pressV) > .001) busy = true;
      drawStatic();

      for (const s of slots) {
        const root = onPill(s.s), ix = root.x - root.nx * 7, iy = root.y - root.ny * 7;
        if (!s.pts) { s.dx = root.nx; s.dy = root.ny; s.pts = Array.from({ length: N }, () => ({ x: ix, y: iy, vx: 0, vy: 0 })); }
        let want = 0, ux = root.nx, uy = root.ny;
        if (m.on) {
          const dx = mx - root.x, dy = my - root.y, dist = Math.hypot(dx, dy) || 1;
          ux = dx / dist; uy = dy / dist;
          want = prox * ss(.1, .7, root.nx * ux + root.ny * uy) * s.gain;
          const a = s.off * .5 + Math.sin(t * s.f1 + s.ph) * .1, c = Math.cos(a), sn = Math.sin(a);
          [ux, uy] = [ux * c - uy * sn, ux * sn + uy * c];
          s.L += (clamp(dist - s.gap, 0, s.len * 340) - s.L) * .18 * dt;
        }
        if (want > 0) {
          s.dx += (ux - s.dx) * .15 * dt; s.dy += (uy - s.dy) * .15 * dt;
          const k = Math.hypot(s.dx, s.dy) || 1; s.dx /= k; s.dy /= k;
        }
        // under-damped spring on extension -> elastic overshoot and recoil
        s.ev = (s.ev + (want - s.e) * .11 * dt) * Math.pow(.8, dt); s.e += s.ev * dt;
        if (Math.abs(s.e) > .004 || Math.abs(s.ev) > .002) busy = true;
        const ext = Math.max(s.e, 0);
        if (ext < .004) { s.pts.forEach(p => { p.x = ix; p.y = iy; p.vx = p.vy = 0; }); continue; }

        const reach = s.L * ext, px = -s.dy, py = s.dx, k = Math.min(1, reach / 160);
        const ws = ss(0, .35, ext), W0 = s.w * (1.15 - .45 * Math.min(1, reach / 300)) * ws;
        const pts = s.pts, left = [], right = [];
        for (let i = 0; i < N; i++) {
          const u = i / (N - 1), p = pts[i];
          const lat = Math.sin(Math.PI * u) * s.bend * ext * k
                    + Math.sin(t * s.f2 - u * 4 + s.ph) * s.wob * u * k * Math.min(1, ext)
                    + s.lat * u * ext * k;
          const tx = ix + s.dx * reach * u + px * lat, ty = iy + s.dy * reach * u + py * lat;
          if (i === 0) { p.x = ix; p.y = iy; continue; }
          const sk = .34 - .27 * u, dm = Math.pow(.78 + .07 * u, dt); // tip is softer -> whip lag
          p.vx = (p.vx + (tx - p.x) * sk * dt) * dm; p.vy = (p.vy + (ty - p.y) * sk * dt) * dm;
          p.x += p.vx * dt; p.y += p.vy * dt;
        }
        for (let i = 0; i < N; i++) {
          const u = i / (N - 1), a = pts[Math.max(0, i - 1)], b = pts[Math.min(N - 1, i + 1)];
          let tx = b.x - a.x, ty = b.y - a.y; const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl;
          let w = W0 * (.3 + .7 * Math.pow(1 - u, 1.4) + .26 * Math.exp(-Math.pow((u - .82) / .12, 2)));
          w *= 1 + .08 * Math.sin(t * 2 + s.ph + u * 6);
          if (u > .88) w *= Math.sqrt(Math.max(.02, 1 - Math.pow((u - .88) / .12, 2)));
          const h = Math.max(w, .6) / 2;
          left.push([pts[i].x - ty * h, pts[i].y + tx * h]);
          right.push([pts[i].x + ty * h, pts[i].y - tx * h]);
        }
        d += smooth(left.concat(right.reverse()));
      }
      path.setAttribute('d', d);
      if (busy) raf = requestAnimationFrame(frame); else running = false;
    }

    const onMove = (e) => { m.x = e.clientX; m.y = e.clientY; m.on = !reduce.matches; wake(); };
    const onLeave = () => { m.on = false; };
    const onDown = () => { pressV -= .09; wake(); };
    const onScroll = () => { if (m.on) wake(); };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('blur', onLeave);
    document.documentElement.addEventListener('pointerleave', onLeave);
    btn.addEventListener('pointerdown', onDown);
    const ro = new ResizeObserver(measure);
    ro.observe(btn);
    measure();
    document.fonts?.ready.then(measure);

    return () => {
      cancelAnimationFrame(raf); running = false; ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('blur', onLeave);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      btn.removeEventListener('pointerdown', onDown);
    };
  }, []);

  const Tag = href ? 'a' : 'button';
  const tagProps = href ? { href } : { type: 'button' };

  return (
    <span className="lqb-wrap">
      <style>{CSS}</style>
      <svg ref={svgRef} className="lqb-fx" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          {/* metaball fusion + inflated wet lighting + soft contact shadow, all in one filter */}
          <filter ref={fltRef} id={fid} filterUnits="userSpaceOnUse" x="0" y="0" width="100" height="100" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="13" result="sb" />
            <feOffset in="sb" dy="16" result="so" />
            <feColorMatrix in="so" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0" result="shadow" />

            <feGaussianBlur in="goo" stdDeviation="9" result="bumpA" />
            <feSpecularLighting in="bumpA" surfaceScale="9" specularConstant="1" specularExponent="20" lightingColor="#d6dcff" result="sA">
              <feDistantLight azimuth="235" elevation="28" />
            </feSpecularLighting>
            <feComposite in="sA" in2="goo" operator="in" result="specA" />

            <feSpecularLighting in="bumpA" surfaceScale="7" specularConstant=".7" specularExponent="16" lightingColor="#5f74ff" result="sR">
              <feDistantLight azimuth="50" elevation="26" />
            </feSpecularLighting>
            <feComposite in="sR" in2="goo" operator="in" result="specR" />

            <feGaussianBlur in="goo" stdDeviation="2.2" result="bumpB" />
            <feSpecularLighting in="bumpB" surfaceScale="4" specularConstant="1.4" specularExponent="40" lightingColor="#fff" result="sB">
              <feDistantLight azimuth="235" elevation="30" />
            </feSpecularLighting>
            <feComposite in="sB" in2="goo" operator="in" result="specB" />

            <feMerge>
              <feMergeNode in="shadow" /><feMergeNode in="goo" />
              <feMergeNode in="specA" /><feMergeNode in="specR" /><feMergeNode in="specB" />
            </feMerge>
          </filter>
          <linearGradient id={g1} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".22" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={g2} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7f8fff" stopOpacity="0" /><stop offset="1" stopColor="#7f8fff" stopOpacity=".16" />
          </linearGradient>
        </defs>
        <g filter={`url(#${fid})`} fill="#07070a">
          <rect ref={bodyRef} />
          <path ref={pathRef} />
        </g>
        <rect ref={glossRef} fill={`url(#${g1})`} />
        <rect ref={gloss2Ref} fill={`url(#${g2})`} />
      </svg>

      <Tag ref={btnRef} className={`lqb ${className}`.trim()} {...tagProps} {...rest}>
        {children}
      </Tag>
    </span>
  );
}
