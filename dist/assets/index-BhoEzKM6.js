var We=Object.defineProperty;var Xe=(t,e,i)=>e in t?We(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var Ee=(t,e,i)=>Xe(t,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=i(o);fetch(o.href,a)}})();function De(){const t=new Date().getHours();let e;t>=6&&t<12?e="env-morning":t>=12&&t<17?e="env-afternoon":t>=17&&t<20?e="env-sunset":e="env-night",document.body.classList.add(e)}function ke(t){document.body.classList.remove("env-morning","env-afternoon","env-sunset","env-night","theme-matrix"),t?document.body.classList.add(t):De()}const Ye=8e3,Ke=200,Je=150,Qe=650,Ae=22;let C=!1,oe=null,z=null,ee=null;function Ze(){var p,b;if(C)return;if(C=!1,window.__skipRequested){J("early-skip");return}window.addEventListener("loader:request-skip",()=>{C||J("user-skip")},{once:!0}),"scrollRestoration"in history&&(history.scrollRestoration="manual");const t=document.getElementById("cinematic-loader");if(!t){me();return}const e=t.querySelectorAll(".boot-line"),i=document.getElementById("loaderProgressFill");if(!e.length){me();return}const n=(b=(p=window.matchMedia)==null?void 0:p.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:b.matches,o=/bot|googlebot|bingbot|crawler|spider|lighthouse|chrome-lighthouse/i.test(navigator.userAgent);if(n||o){J(o?"crawler":"reduced-motion");return}const a=document.getElementById("loaderSkipBtn"),s=h=>{h.key==="Escape"&&!C&&(window.removeEventListener("keydown",s),J("user-escape"))};window.addEventListener("keydown",s),a&&a.addEventListener("click",()=>{window.removeEventListener("keydown",s),J("user-skip")},{once:!0}),oe=setTimeout(()=>{window.removeEventListener("keydown",s),J("timeout")},Ye);let r=0;const c=(h,m)=>{C||(ee=setTimeout(()=>{ee=null,C||h()},m))};function d(h,m){if(C)return;const E=h.querySelector(".boot-text"),x=h.querySelector(".boot-cursor"),M=h.dataset.msg||"",O=parseInt(h.dataset.progress,10)||0,R=h.classList.contains("welcome");h.classList.add("visible"),x&&(x.style.display="inline-block"),i&&(i.style.width=`${O}%`);let u=0,f=performance.now();function k(g){if(C){z=null;return}const w=g-f;if(w>=Ae){const B=Math.max(1,Math.floor(w/Ae));if(u=Math.min(u+B,M.length),E&&(E.textContent=M.substring(0,u)),f=g,u>=M.length){z=null,x&&!R&&(x.style.display="none"),m(R);return}}z=requestAnimationFrame(k)}z=requestAnimationFrame(k)}function l(){if(C||r>=e.length)return;const h=e[r];d(h,m=>{if(C)return;const E=r>=e.length-1;if(m||E){c(()=>me(),Qe);return}r++,c(l,Je)})}c(l,Ke)}function me(){C||(C=!0,$e(),Be(),document.dispatchEvent(new CustomEvent("loader:complete")),et())}function J(t){if(C)return;C=!0,$e();const e=document.getElementById("cinematic-loader");e&&(e.classList.add("dismissed"),e.style.pointerEvents="none",e.style.transition="opacity 0.3s ease",e.style.opacity="0",setTimeout(()=>{e.style.display="none"},350)),Be(),document.dispatchEvent(new CustomEvent("loader:complete",{detail:{reason:t}}))}function $e(){oe!==null&&(clearTimeout(oe),oe=null),ee!==null&&(clearTimeout(ee),ee=null),z!==null&&(cancelAnimationFrame(z),z=null)}function Be(){document.body.classList.remove("loading","loader-active","no-scroll"),document.documentElement.classList.remove("loading"),document.body.style.overflow="",document.documentElement.style.overflow="","scrollRestoration"in history&&(history.scrollRestoration="manual"),window.scrollTo(0,0)}function et(){const t=document.getElementById("cinematic-loader");if(t){if(t.classList.add("dismissed"),t.style.pointerEvents="none",typeof gsap<"u"){gsap.to(t,{opacity:0,duration:.6,ease:"power2.inOut",onComplete:()=>{t.style.display="none"}});return}t.style.transition="opacity 0.5s ease",t.style.opacity="0",setTimeout(()=>{t.style.display="none"},550)}}let Q=null;function tt(){Q&&(Q(),Q=null);const t=document.getElementById("cursorDot"),e=document.getElementById("cursorOrb"),i=document.getElementById("ambientGlow");if(!t||!e)return;if(window.matchMedia("(hover: none), (pointer: coarse)").matches){t.style.display="none",e.style.display="none",i&&(i.style.display="none");return}const o=window.matchMedia("(prefers-reduced-motion: reduce)").matches;let a=window.innerWidth/2,s=window.innerHeight/2,r=a,c=s,d=null;const l=h=>{a=h.clientX,s=h.clientY,t.style.transform=`translate3d(${a}px, ${s}px, 0)`,i&&(i.style.transform=`translate3d(${a}px, ${s}px, 0)`)};window.addEventListener("mousemove",l,{passive:!0});const p=()=>{o?(r=a,c=s):(r+=(a-r)*.14,c+=(s-c)*.14),e.style.transform=`translate3d(${r}px, ${c}px, 0)`,d=requestAnimationFrame(p)};p();const b=ie({cursorOrb:e,reducedMotion:o});return Q=()=>{window.removeEventListener("mousemove",l),d&&cancelAnimationFrame(d),b==null||b(),e.classList.remove("hover-active","hover-link"),e.removeAttribute("data-cursor")},Q}function ie({cursorOrb:t=document.getElementById("cursorOrb"),reducedMotion:e=!1}={}){if(!t)return()=>{};const i=["a","button",".btn",".glass-panel",".skill-capsule",".contact-card-interactive",".social-card-item",".project-card",".constellation-node",".loader-skip-btn",".library-tab",".nav-mobile-terminal-btn",".terminal-close-action",".term-dot"].join(","),n=document.querySelectorAll(i),o=[],a=(r,c,d)=>{r.addEventListener(c,d),o.push(()=>{r.removeEventListener(c,d)})};return n.forEach(r=>{const c=r.matches("a, button, .btn"),d=()=>{t.classList.remove("hover-active","hover-link"),t.classList.add(c?"hover-active":"hover-link"),t.dataset.cursor=c?"interactive":"hover"},l=()=>{t.classList.remove("hover-active","hover-link"),delete t.dataset.cursor};a(r,"mouseenter",d),a(r,"mouseleave",l)}),document.querySelectorAll(".btn, .contact-card-interactive, .social-card-item").forEach(r=>{a(r,"click",d=>{if(e)return;const l=r.getBoundingClientRect(),p=Math.max(l.width,l.height),b=document.createElement("span");b.className="ripple",b.style.width=`${p}px`,b.style.height=`${p}px`,b.style.left=`${d.clientX-l.left-p/2}px`,b.style.top=`${d.clientY-l.top-p/2}px`,r.appendChild(b),b.addEventListener("animationend",()=>b.remove(),{once:!0})})}),()=>{o.forEach(r=>r())}}function it(){if(typeof Lenis>"u")return null;const t=new Lenis({duration:1.05,easing:s=>1-Math.pow(2,-10*s),direction:"vertical",smoothWheel:!0,wheelMultiplier:1,touchMultiplier:2});window.lenis=t;let e=!1;if(typeof gsap<"u"&&typeof ScrollTrigger<"u")gsap.registerPlugin(ScrollTrigger),e=!0,t.on("scroll",ScrollTrigger.update),gsap.ticker.add(s=>{t.raf(s*1e3)}),gsap.ticker.lagSmoothing(0,0);else{let s=function(r){t.raf(r),requestAnimationFrame(s)};requestAnimationFrame(s)}const i=document.getElementById("scroll-progress-bar");t.on("scroll",({scroll:s})=>{if(i){const r=document.documentElement.scrollHeight-window.innerHeight;if(r>0){const c=s/r*100;i.style.width=Math.min(100,Math.max(0,c))+"%"}}});let n=null;function o(){n=requestAnimationFrame(o)}n=requestAnimationFrame(o);const a=document.getElementById("returnToOrigin");if(a){let s=!1;const r=()=>{const c=t.scroll>window.innerHeight*.8;c!==s&&(s=c,a.classList.toggle("visible",c))};t.on("scroll",r),a.addEventListener("click",()=>{typeof gsap<"u"&&typeof ScrollToPlugin<"u"?(gsap.registerPlugin(ScrollToPlugin),gsap.to(a,{scale:1.4,duration:.2,ease:"power2.out",yoyo:!0,repeat:1}),gsap.to(window,{scrollTo:{y:0,autoKill:!1},duration:1.4,ease:"power4.inOut"})):t.scrollTo(0,{duration:1.2})})}return t._portfolioCleanup=()=>{n!==null&&(cancelAnimationFrame(n),n=null),e&&typeof gsap<"u"&&gsap.ticker.remove(t.raf),t.destroy()},t}function nt(){const t=document.getElementById("navbar"),e=document.getElementById("menuBtn"),i=document.getElementById("navLinks");if(t&&(t.style.transform="",t.style.opacity="1",t.style.visibility="visible",window.addEventListener("scroll",()=>{const a=window.scrollY>60;t.classList.toggle("scrolled",a),t.classList.toggle("navbar--scrolled",a)},{passive:!0})),e&&i){const a=()=>{i.classList.contains("active")&&(i.classList.remove("active"),e.textContent="☰",e.setAttribute("aria-expanded","false"))},s=()=>{var r;i.classList.add("active"),e.textContent="✕",e.setAttribute("aria-expanded","true"),(r=i.querySelector("a"))==null||r.focus()};e.addEventListener("click",r=>{r.stopPropagation(),i.classList.contains("active")?a():s()}),document.addEventListener("click",r=>{i.classList.contains("active")&&!t.contains(r.target)&&a()}),document.addEventListener("keydown",r=>{r.key==="Escape"&&i.classList.contains("active")&&(a(),e.focus())}),document.querySelectorAll(".nav-links a").forEach(r=>{r.addEventListener("click",c=>{const d=r.getAttribute("href");if(d&&d.startsWith("#")){const l=document.querySelector(d);if(l){c.preventDefault(),a(),window.lenis?window.lenis.scrollTo(l,{offset:-80}):l.scrollIntoView({behavior:"smooth",block:"start"});try{history.pushState(null,"",d)}catch{}}}else a()})})}const n=document.querySelectorAll("section[id]"),o=document.querySelectorAll(".nav-links a");n.length&&o.length&&window.addEventListener("scroll",()=>{let a="";n.forEach(s=>{window.scrollY>=s.offsetTop-200&&(a=s.id)}),o.forEach(s=>{s.classList.toggle("active",s.getAttribute("href")==="#"+a)})},{passive:!0})}let je=0,D=null;const Fe=Object.freeze({cableColor:"#A855F7",pulseColor:"#A855F7",tunnelColor:"#5227FF",speed:.12,flowDirection:"outward",threadCount:8,frequency:5,spread:.2,taper:1,fanMode:"center",position:.5,mirror:!0,pulseSpeed:2,pulseLength:.28,pulseBlend:1,pulseWidth:1,thickness:.35,rimWidth:.15,waviness:.3,sway:.5,size:1,glow:1,falloff:.6,fadeNear:.5,fadeFar:2,brightness:.85,opacity:1,colorVariance:!0,shimmer:!0,grain:!0,grainIntensity:.05,mouseInteraction:!0,mouseStrength:.12,quality:"auto"}),at=Object.freeze({center:0,left:1,right:2});function I(t,e,i){return Math.min(i,Math.max(e,t))}function ot(t,e,i){return t+(e-t)*i}function N(t,e,i,n){return ot(t,e,1-Math.exp(-i*n))}function ae(t){if(typeof t!="string")return[1,1,1];const e=t.trim().replace(/^#/,""),i=e.length===3?e.split("").map(o=>o+o).join(""):e;if(!/^[0-9a-fA-F]{6}$/.test(i))return[1,1,1];const n=parseInt(i,16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function st(){return/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent||"")}function Te(t){let e=t;if(e==="auto"){const n=navigator.hardwareConcurrency||4;st()||n<=4?e="medium":n>=10?e="ultra":e="high"}const i={low:{iterations:7,particleLayers:.45,pulseCount:.55,dpr:1,grain:!1},medium:{iterations:8,particleLayers:.65,pulseCount:.72,dpr:1.25,grain:!0},high:{iterations:10,particleLayers:.9,pulseCount:1,dpr:1.5,grain:!0},ultra:{iterations:12,particleLayers:1.15,pulseCount:1.35,dpr:1.75,grain:!0}};return{name:e,...i[e]||i.high}}function xe(t,e,i){const n=t.createShader(e);if(!n)throw new Error("Unable to create WebGL shader.");if(t.shaderSource(n,i),t.compileShader(n),!t.getShaderParameter(n,t.COMPILE_STATUS)){const o=t.getShaderInfoLog(n)||"Unknown shader compilation error.";throw t.deleteShader(n),new Error(o)}return n}function Se(t,e,i){const n=xe(t,t.VERTEX_SHADER,e),o=xe(t,t.FRAGMENT_SHADER,i),a=t.createProgram();if(!a)throw t.deleteShader(n),t.deleteShader(o),new Error("Unable to create WebGL program.");if(t.attachShader(a,n),t.attachShader(a,o),t.linkProgram(a),t.deleteShader(n),t.deleteShader(o),!t.getProgramParameter(a,t.LINK_STATUS)){const s=t.getProgramInfoLog(a)||"Unknown program link error.";throw t.deleteProgram(a),new Error(s)}return a}const rt=`#version 300 es

in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,lt=`#version 300 es

precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;

uniform float u_speed;
uniform float u_flowDirection;

uniform float u_threadCount;
uniform float u_frequency;
uniform float u_spread;
uniform float u_taper;
uniform float u_fanMode;
uniform float u_position;
uniform float u_mirror;

uniform float u_pulseSpeed;
uniform float u_pulseLength;
uniform float u_pulseBlend;
uniform float u_pulseWidth;

uniform float u_thickness;
uniform float u_rimWidth;
uniform float u_waviness;
uniform float u_sway;
uniform float u_size;

uniform float u_glow;
uniform float u_falloff;
uniform float u_fadeNear;
uniform float u_fadeFar;

uniform float u_brightness;
uniform float u_opacity;

uniform float u_colorVariance;
uniform float u_shimmer;

uniform float u_grain;
uniform float u_grainIntensity;

uniform float u_mouseStrength;
uniform float u_mouseActive;
uniform vec2 u_mouse;
uniform float u_mouseVelocity;

uniform float u_impulse;
uniform float u_superPulse;
uniform float u_scrollSpeed;

uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_pulseColor;
uniform vec3 u_tunnelColor;

#define TAU 6.28318530718
#define PI 3.14159265359

float hash11(float p) {
  return fract(
    sin(p * 127.1) *
    43758.5453123
  );
}

float hash21(vec2 p) {
  return fract(
    sin(dot(p, vec2(127.1, 311.7))) *
    43758.5453123
  );
}

float noise1(float x) {
  float i = floor(x);
  float f = fract(x);

  f = f * f * (3.0 - 2.0 * f);

  return mix(
    hash11(i),
    hash11(i + 1.0),
    f
  );
}

float noise2(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);

  f = f * f * (3.0 - 2.0 * f);

  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));

  return mix(
    mix(a, b, f.x),
    mix(c, d, f.x),
    f.y
  );
}

float softGlow(
  float distanceValue,
  float width,
  float falloff
) {
  float d =
    abs(distanceValue) /
    max(width, 0.0001);

  return pow(
    max(
      1.0 -
      smoothstep(0.0, 1.0, d),
      0.0
    ),
    max(falloff, 0.05)
  );
}

vec3 palette(float t) {
  vec3 c1 = u_color1;
  vec3 c2 = u_color2;
  vec3 c3 = u_color3;

  vec3 base =
    mix(
      c1,
      c2,
      smoothstep(0.0, 1.0, t)
    );

  return mix(
    base,
    c3,
    smoothstep(0.70, 1.0, t) * 0.55
  );
}

void main() {

  vec2 px = gl_FragCoord.xy;

  vec2 res =
    max(
      u_resolution,
      vec2(1.0)
    );

  vec2 uv =
    (px - 0.5 * res) /
    min(res.x, res.y);

  // Mouse-driven camera/parallax.
  vec2 pointer =
    (u_mouse - 0.5) *
    u_mouseStrength *
    u_mouseActive;

  vec2 center = pointer;

  float fanX = 0.0;

  if (
    u_fanMode > 0.5 &&
    u_fanMode < 1.5
  ) {
    fanX = -0.22;
  }

  if (u_fanMode > 1.5) {
    fanX = 0.22;
  }

  fanX =
    mix(
      fanX,
      (u_position - 0.5) * 1.4,
      0.35
    );

  vec2 p = uv - center;

  p.x -= fanX;

  p *= max(
    0.72,
    u_size
  );

  float radius =
    length(p);

  float angle =
    atan(p.y, p.x);

  float radial =
    max(radius, 0.00018);

  // Strong logarithmic tunnel depth.
  float depth =
    clamp(
      -log(radial) * 0.35 + 0.5,
      0.0,
      1.0
    );

  float rawDepth =
    depth;

  float flow =
    u_flowDirection;

  float speed =
    u_speed *
    (
      1.0 +
      min(
        abs(u_scrollSpeed),
        3.0
      ) *
      0.65
    );

  float timeFlow =
    u_time *
    speed *
    flow;

  float globalSway =
    sin(
      u_time *
      (
        0.08 +
        u_speed * 0.3
      )
    ) *
    u_sway *
    0.14;

  globalSway +=
    sin(
      u_time * 0.17 +
      radius * 1.7
    ) *
    u_sway *
    0.035;

  float threadPhaseSpace =
    fract(
      angle / TAU +
      0.5 +
      globalSway
    );

  float threadCount =
    max(
      1.0,
      floor(u_threadCount)
    );

  float lane =
    threadPhaseSpace *
    threadCount;

  float threadIndex =
    floor(lane);

  float localLane =
    fract(lane) -
    0.5;

  // Organic cable wave.
  float seed =
    hash11(
      threadIndex +
      13.17
    );

  float phase =
    seed * TAU;

  float wave =
    sin(
      depth *
      (u_frequency * 3.2) +
      timeFlow * 0.8 +
      phase
    ) *
    u_waviness;

  wave +=
    sin(
      depth *
      (u_frequency * 1.1) -
      timeFlow * 0.45 +
      phase * 1.7
    ) *
    u_waviness *
    0.4;

  float dynamicAngle =
    angle +
    globalSway +
    wave *
    (
      0.22 +
      radius * 0.45
    );

  float dynamicCos =
    cos(dynamicAngle);

  float dynamicSin =
    sin(dynamicAngle);

  // Thread taper.
  float taperFactor =
    mix(
      0.52,
      1.35,
      smoothstep(
        0.02,
        1.0,
        depth
      )
    );

  taperFactor *=
    1.0 +
    max(0.0, u_taper) *
    0.18 *
    depth;

  float laneDistance =
    abs(
      localLane +
      sin(
        depth * 8.0 +
        phase +
        timeFlow * 0.23
      ) *
      0.018 *
      u_waviness
    );

  float threadWidth =
    max(
      0.0012,
      u_thickness *
      0.035 *
      taperFactor
    );

  float coreWidth =
    threadWidth *
    mix(
      0.68,
      1.0,
      u_pulseWidth
    );

  float threadCore =
    softGlow(
      laneDistance,
      coreWidth *
      max(
        0.12,
        u_spread * 2.0
      ),
      u_falloff + 0.45
    );

  float threadRim =
    softGlow(
      laneDistance,
      threadWidth *
      max(
        0.25,
        u_spread * 4.0
      ),
      max(
        0.3,
        u_falloff
      )
    );

  // WebThreads-style oscillating field.
  float threadY =
    uv.y -
    u_position +
    sin(
      uv.x *
      u_frequency +
      timeFlow +
      threadIndex *
      TAU /
      threadCount
    ) *
    u_spread;

  float fieldDistance =
    abs(threadY) *
    (
      1.25 +
      depth * 1.8
    ) +
    laneDistance *
    0.32;

  float fieldGlow =
    softGlow(
      fieldDistance,
      max(
        0.012,
        u_spread *
        (
          0.14 +
          depth * 0.20
        )
      ),
      u_falloff
    );

  // Travelling pulse.
  float strandSpeed =
    0.55 +
    seed * 0.9;

  float pulsePhase =
    fract(
      rawDepth * 0.92 +
      timeFlow *
      u_pulseSpeed *
      0.18 *
      strandSpeed +
      seed * 0.73
    );

  float pulseDistance =
    abs(
      rawDepth -
      pulsePhase
    );

  pulseDistance =
    min(
      pulseDistance,
      1.0 -
      pulseDistance
    );

  float pulseRadius =
    max(
      0.0005,
      u_pulseLength *
      0.5
    );

  float pulse =
    1.0 -
    smoothstep(
      pulseRadius *
      max(
        0.08,
        1.0 -
        u_pulseBlend *
        0.82
      ),
      pulseRadius,
      pulseDistance
    );

  pulse =
    pow(
      clamp(pulse, 0.0, 1.0),
      mix(
        3.8,
        1.1,
        clamp(
          u_pulseBlend,
          0.0,
          1.0
        )
      )
    );

  // Click / tap impulse.
  float impulseWave =
    fract(
      rawDepth +
      u_impulse *
      0.58
    );

  float impulseDistance =
    abs(
      rawDepth -
      impulseWave
    );

  impulseDistance =
    min(
      impulseDistance,
      1.0 -
      impulseDistance
    );

  float impulse =
    smoothstep(
      0.11,
      0.0,
      impulseDistance
    ) *
    u_impulse;

  // Major system pulse.
  float superWave =
    fract(
      rawDepth +
      u_superPulse *
      0.78
    );

  float superDistance =
    abs(
      rawDepth -
      superWave
    );

  superDistance =
    min(
      superDistance,
      1.0 -
      superDistance
    );

  float superPulse =
    smoothstep(
      0.16,
      0.0,
      superDistance
    ) *
    u_superPulse;

  // Shimmer.
  float shimmer = 1.0;

  if (u_shimmer > 0.5) {

    shimmer +=
      sin(
        u_time * 2.2 +
        threadIndex * 1.71 +
        phase
      ) *
      0.08;

    shimmer +=
      noise1(
        threadIndex *
        1.9 +
        u_time *
        0.21
      ) *
      0.06;
  }

  // Colour variation.
  float colorT =
    clamp(
      (
        threadIndex +
        seed * 0.6
      ) /
      max(
        1.0,
        threadCount - 1.0
      ),
      0.0,
      1.0
    );

  vec3 baseColor =
    palette(
      colorT * 0.82
    );

  if (u_colorVariance > 0.5) {
    baseColor *=
      1.0 +
      (
        seed - 0.5
      ) *
      0.16;
  }

  vec3 threadColor =
    baseColor;

  vec3 pulseColor =
    mix(
      baseColor,
      u_pulseColor,
      0.74
    );

  float pulseMix =
    max(
      pulse,
      max(
        impulse * 0.8,
        superPulse
      )
    );

  // Micro particle field.
  float particleGrid =
    depth * 26.0 +
    angle * 3.0 +
    threadIndex * 1.73 +
    timeFlow * 0.7;

  float particleCell =
    floor(particleGrid);

  float particlePhase =
    fract(particleGrid);

  float particleSeed =
    hash11(
      particleCell +
      threadIndex * 17.0
    );

  float particleDepth =
    fract(
      depth * 19.0 +
      particleSeed
    );

  float particle =
    smoothstep(
      0.13,
      0.0,
      abs(
        particlePhase - 0.5
      )
    ) *
    smoothstep(
      0.05,
      0.38,
      particleDepth
    ) *
    smoothstep(
      1.0,
      0.25,
      particleDepth
    ) *
    (
      0.22 +
      particleSeed * 0.62
    );

  particle *=
    (
      0.30 +
      0.70 *
      pulse
    );

  // Mouse activity.
  vec2 md =
    uv -
    (
      u_mouse -
      0.5
    ) *
    1.6;

  float mouseGlow =
    exp(
      -dot(md, md) *
      5.0
    ) *
    u_mouseActive;

  mouseGlow *=
    0.16 +
    0.46 *
    clamp(
      u_mouseVelocity,
      0.0,
      1.0
    );

  // Tunnel fade.
  float nearFade =
    smoothstep(
      0.0,
      max(
        0.01,
        u_fadeNear
      ),
      rawDepth
    );

  float farEdge =
    smoothstep(
      0.98,
      max(
        0.15,
        1.0 -
        0.18 /
        max(
          0.25,
          u_fadeFar
        )
      ),
      rawDepth
    );

  float radialFade =
    smoothstep(
      2.0,
      0.22,
      radius
    );

  float tunnelFade =
    nearFade *
    farEdge *
    radialFade;

  // Perspective brightness.
  float nearBoost =
    mix(
      0.76,
      1.38,
      smoothstep(
        0.18,
        0.92,
        rawDepth
      )
    );

  nearBoost *=
    0.94 +
    0.06 *
    u_size;

  float body =
    threadCore *
    (
      0.80 +
      0.50 *
      threadRim
    ) *
    shimmer;

  float rim =
    threadRim *
    u_glow *
    0.80;

  float web =
    fieldGlow *
    0.24;

  float energy =
    pulse *
    (
      1.25 +
      0.75 *
      u_pulseWidth
    ) +
    impulse *
    1.35 +
    superPulse *
    2.1;

  vec3 color =
    threadColor *
    (
      body +
      rim * 0.82 +
      web * 0.42
    );

  color =
    mix(
      color,
      pulseColor,
      clamp(
        pulseMix * 0.86,
        0.0,
        1.0
      )
    );

  color +=
    u_pulseColor *
    energy *
    0.62;

  color +=
    u_tunnelColor *
    web *
    0.14;

  color +=
    u_pulseColor *
    particle *
    0.56;

  color +=
    vec3(
      0.34,
      0.22,
      0.55
    ) *
    mouseGlow *
    0.45;

  float intensity =
    (
      body * 0.74 +
      rim * 0.48 +
      web * 0.25 +
      particle * 0.54 +
      energy * 0.38 +
      mouseGlow
    );

  intensity *=
    tunnelFade;

  intensity *=
    nearBoost;

  intensity *=
    u_brightness;

  float coreVignette =
    1.0 -
    smoothstep(
      0.0,
      0.54,
      radius
    );

  color +=
    u_tunnelColor *
    coreVignette *
    0.035 *
    u_glow;

  if (u_grain > 0.5) {

    float grain =
      (
        hash21(
          gl_FragCoord.xy +
          fract(
            u_time *
            0.018
          )
        ) -
        0.5
      ) *
      u_grainIntensity *
      0.55;

    color += grain;
    intensity += grain * 0.22;
  }

  color =
    max(
      color,
      vec3(0.0)
    );

  float alpha =
    clamp(
      intensity *
      u_opacity,
      0.0,
      0.86
    );

  fragColor =
    vec4(
      color * alpha,
      alpha
    );
}
`,ct=`#version 300 es

in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv =
    a_position *
    0.5 +
    0.5;

  gl_Position =
    vec4(
      a_position,
      0.0,
      1.0
    );
}
`,ut=`#version 300 es

precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_scene;
uniform float u_grain;
uniform float u_grainIntensity;
uniform float u_time;

float hash21(vec2 p) {
  return fract(
    sin(
      dot(
        p,
        vec2(
          127.1,
          311.7
        )
      )
    ) *
    43758.5453123
  );
}

void main() {

  vec4 scene =
    texture(
      u_scene,
      v_uv
    );

  if (u_grain > 0.5) {

    float n =
      (
        hash21(
          gl_FragCoord.xy +
          fract(
            u_time *
            0.015
          )
        ) -
        0.5
      ) *
      u_grainIntensity *
      0.45;

    scene.rgb += n;
  }

  fragColor =
    vec4(
      max(
        scene.rgb,
        vec3(0.0)
      ),
      clamp(
        scene.a,
        0.0,
        1.0
      )
    );
}
`;class dt{constructor(e,i,n){Ee(this,"frame",e=>{if(!this.running)return;const i=Math.min(.05,Math.max(.001,(e-this.lastTime)/1e3));this.lastTime=e;const n=this.reducedMotion?.16:1;this.time+=i*n,this.applyConfigUniforms(),this.updateDynamics(i),this.draw(),this.raf=requestAnimationFrame(this.frame)});this.canvas=e,this.config={...Fe,...i||{}},this.getScrollSpeed=typeof n=="function"?n:()=>je,this.gl=null,this.program=null,this.compositeProgram=null,this.vao=null,this.quadVao=null,this.quadBuffer=null,this.framebuffer=null,this.frameTexture=null,this.depthRenderbuffer=null,this.running=!1,this.raf=0,this.time=0,this.lastTime=0,this.mouse={x:.5,y:.5},this.targetMouse={x:.5,y:.5},this.previousMouse={x:.5,y:.5},this.mouseVelocity=0,this.mouseActive=0,this.targetMouseActive=0,this.impulse=0,this.impulseVelocity=0,this.superPulse=0,this.superPulseVelocity=0,this.superPulseTimer=0,this.nextSuperPulse=this.randomSuperPulseDelay(),this.pageVisible=!document.hidden,this.reducedMotion=!1,this.mediaQuery=null,this.quality=Te(this.config.quality),this._boundMouseMove=o=>this.onMouseMove(o),this._boundMouseEnter=()=>{this.targetMouseActive=1},this._boundMouseLeave=()=>{this.targetMouseActive=0},this._boundTouchMove=o=>this.onTouchMove(o),this._boundPointerDown=()=>this.triggerPulse(),this._boundVisibility=()=>this.onVisibilityChange(),this._boundResize=()=>this.resize(),this._boundMotionChange=o=>{this.reducedMotion=!!o.matches},this.initialize()}randomSuperPulseDelay(){return 15+Math.random()*26}initialize(){var i,n;const e=this.canvas.getContext("webgl2",{alpha:!0,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:"high-performance"});if(!e){console.warn("[particles.js] WebGL 2 is unavailable; background disabled gracefully.");return}this.gl=e,this.mediaQuery=((i=window.matchMedia)==null?void 0:i.call(window,"(prefers-reduced-motion: reduce)"))||null,this.reducedMotion=!!((n=this.mediaQuery)!=null&&n.matches),this.createPrograms(),this.createQuad(),this.bindEvents(),this.resize(),this.updateStaticUniforms()}createPrograms(){const e=this.gl;this.program=Se(e,rt,lt),this.compositeProgram=Se(e,ct,ut),this.u={resolution:e.getUniformLocation(this.program,"u_resolution"),time:e.getUniformLocation(this.program,"u_time"),speed:e.getUniformLocation(this.program,"u_speed"),flowDirection:e.getUniformLocation(this.program,"u_flowDirection"),threadCount:e.getUniformLocation(this.program,"u_threadCount"),frequency:e.getUniformLocation(this.program,"u_frequency"),spread:e.getUniformLocation(this.program,"u_spread"),taper:e.getUniformLocation(this.program,"u_taper"),fanMode:e.getUniformLocation(this.program,"u_fanMode"),position:e.getUniformLocation(this.program,"u_position"),mirror:e.getUniformLocation(this.program,"u_mirror"),pulseSpeed:e.getUniformLocation(this.program,"u_pulseSpeed"),pulseLength:e.getUniformLocation(this.program,"u_pulseLength"),pulseBlend:e.getUniformLocation(this.program,"u_pulseBlend"),pulseWidth:e.getUniformLocation(this.program,"u_pulseWidth"),thickness:e.getUniformLocation(this.program,"u_thickness"),rimWidth:e.getUniformLocation(this.program,"u_rimWidth"),waviness:e.getUniformLocation(this.program,"u_waviness"),sway:e.getUniformLocation(this.program,"u_sway"),size:e.getUniformLocation(this.program,"u_size"),glow:e.getUniformLocation(this.program,"u_glow"),falloff:e.getUniformLocation(this.program,"u_falloff"),fadeNear:e.getUniformLocation(this.program,"u_fadeNear"),fadeFar:e.getUniformLocation(this.program,"u_fadeFar"),brightness:e.getUniformLocation(this.program,"u_brightness"),opacity:e.getUniformLocation(this.program,"u_opacity"),colorVariance:e.getUniformLocation(this.program,"u_colorVariance"),shimmer:e.getUniformLocation(this.program,"u_shimmer"),grain:e.getUniformLocation(this.program,"u_grain"),grainIntensity:e.getUniformLocation(this.program,"u_grainIntensity"),mouseStrength:e.getUniformLocation(this.program,"u_mouseStrength"),mouseActive:e.getUniformLocation(this.program,"u_mouseActive"),mouse:e.getUniformLocation(this.program,"u_mouse"),mouseVelocity:e.getUniformLocation(this.program,"u_mouseVelocity"),impulse:e.getUniformLocation(this.program,"u_impulse"),superPulse:e.getUniformLocation(this.program,"u_superPulse"),scrollSpeed:e.getUniformLocation(this.program,"u_scrollSpeed"),color1:e.getUniformLocation(this.program,"u_color1"),color2:e.getUniformLocation(this.program,"u_color2"),color3:e.getUniformLocation(this.program,"u_color3"),pulseColor:e.getUniformLocation(this.program,"u_pulseColor"),tunnelColor:e.getUniformLocation(this.program,"u_tunnelColor")},this.cu={scene:e.getUniformLocation(this.compositeProgram,"u_scene"),grain:e.getUniformLocation(this.compositeProgram,"u_grain"),grainIntensity:e.getUniformLocation(this.compositeProgram,"u_grainIntensity"),time:e.getUniformLocation(this.compositeProgram,"u_time")}}createQuad(){const e=this.gl;this.vao=e.createVertexArray(),e.bindVertexArray(this.vao);const i=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW);const n=e.getAttribLocation(this.program,"a_position");e.enableVertexAttribArray(n),e.vertexAttribPointer(n,2,e.FLOAT,!1,0,0),e.bindVertexArray(null),this.quadBuffer=i,this.quadVao=e.createVertexArray(),e.bindVertexArray(this.quadVao),e.bindBuffer(e.ARRAY_BUFFER,this.quadBuffer);const o=e.getAttribLocation(this.compositeProgram,"a_position");e.enableVertexAttribArray(o),e.vertexAttribPointer(o,2,e.FLOAT,!1,0,0),e.bindVertexArray(null)}createFramebuffer(){const e=this.gl,i=Math.max(1,this.canvas.width),n=Math.max(1,this.canvas.height);this.framebuffer&&e.deleteFramebuffer(this.framebuffer),this.frameTexture&&e.deleteTexture(this.frameTexture),this.depthRenderbuffer&&e.deleteRenderbuffer(this.depthRenderbuffer),this.framebuffer=e.createFramebuffer(),this.frameTexture=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.frameTexture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,i,n,0,e.RGBA,e.UNSIGNED_BYTE,null),e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,this.frameTexture,0),e.drawBuffers([e.COLOR_ATTACHMENT0]),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE?(console.warn("[particles.js] Offscreen framebuffer unavailable; using direct rendering."),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.deleteTexture(this.frameTexture),this.framebuffer=null,this.frameTexture=null):e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindTexture(e.TEXTURE_2D,null)}getDpr(){const e=Math.min(window.devicePixelRatio||1,this.quality.dpr||1.5);return this.reducedMotion?Math.min(e,1.25):e}resize(){if(!this.gl||!this.canvas)return;const e=this.getDpr(),i=Math.max(1,Math.round(window.innerWidth*e)),n=Math.max(1,Math.round(window.innerHeight*e));(this.canvas.width!==i||this.canvas.height!==n)&&(this.canvas.width=i,this.canvas.height=n,this.createFramebuffer()),this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}bindEvents(){var e,i;window.addEventListener("mousemove",this._boundMouseMove,{passive:!0}),window.addEventListener("touchmove",this._boundTouchMove,{passive:!0}),window.addEventListener("resize",this._boundResize,{passive:!0}),this.canvas.addEventListener("mouseenter",this._boundMouseEnter,{passive:!0}),this.canvas.addEventListener("mouseleave",this._boundMouseLeave,{passive:!0}),this.canvas.addEventListener("pointerdown",this._boundPointerDown,{passive:!0}),document.addEventListener("visibilitychange",this._boundVisibility),(i=(e=this.mediaQuery)==null?void 0:e.addEventListener)==null||i.call(e,"change",this._boundMotionChange)}onMouseMove(e){this.targetMouse.x=I(e.clientX/Math.max(1,window.innerWidth),0,1),this.targetMouse.y=I(1-e.clientY/Math.max(1,window.innerHeight),0,1),this.targetMouseActive=1}onTouchMove(e){var n;const i=(n=e.touches)==null?void 0:n[0];i&&(this.targetMouse.x=I(i.clientX/Math.max(1,window.innerWidth),0,1),this.targetMouse.y=I(1-i.clientY/Math.max(1,window.innerHeight),0,1),this.targetMouseActive=1)}onVisibilityChange(){this.pageVisible=!document.hidden,this.pageVisible?this.resume():this.pause()}updateStaticUniforms(){!this.gl||!this.program||this.applyConfigUniforms()}applyConfigUniforms(){const e=this.gl,i=this.config,n=this.u;if(!e||!n)return;const o=this.quality;e.useProgram(this.program),e.uniform1f(n.speed,Number(i.speed)||0),e.uniform1f(n.flowDirection,i.flowDirection==="inward"?-1:1),e.uniform1f(n.threadCount,I(Math.round(Number(i.threadCount)||1),1,18)),e.uniform1f(n.frequency,Math.max(.1,Number(i.frequency)||.1)),e.uniform1f(n.spread,Math.max(0,Number(i.spread)||0)),e.uniform1f(n.taper,Number(i.taper)||0),e.uniform1f(n.fanMode,at[i.fanMode]??0),e.uniform1f(n.position,I(Number(i.position)||.5,0,1)),e.uniform1f(n.mirror,i.mirror?1:0),e.uniform1f(n.pulseSpeed,Math.max(0,Number(i.pulseSpeed)||0)),e.uniform1f(n.pulseLength,I(Number(i.pulseLength)||.28,.01,1)),e.uniform1f(n.pulseBlend,I(Number(i.pulseBlend)||0,0,1)),e.uniform1f(n.pulseWidth,I(Number(i.pulseWidth)||1,.1,2)),e.uniform1f(n.thickness,Math.max(.001,Number(i.thickness)||.35)),e.uniform1f(n.rimWidth,Math.max(.001,Number(i.rimWidth)||.15)),e.uniform1f(n.waviness,Math.max(0,Number(i.waviness)||0)),e.uniform1f(n.sway,Math.max(0,Number(i.sway)||0)),e.uniform1f(n.size,Math.max(.2,Number(i.size)||1)),e.uniform1f(n.glow,Math.max(0,Number(i.glow)||0)),e.uniform1f(n.falloff,Math.max(.05,Number(i.falloff)||.6)),e.uniform1f(n.fadeNear,Math.max(.01,Number(i.fadeNear)||.5)),e.uniform1f(n.fadeFar,Math.max(.25,Number(i.fadeFar)||2)),e.uniform1f(n.brightness,Math.max(0,Number(i.brightness)||0)),e.uniform1f(n.opacity,I(Number(i.opacity)||1,0,1)),e.uniform1f(n.colorVariance,i.colorVariance?1:0),e.uniform1f(n.shimmer,i.shimmer?1:0),e.uniform1f(n.grain,i.grain&&o.grain?1:0),e.uniform1f(n.grainIntensity,Math.max(0,Number(i.grainIntensity)||0)),e.uniform1f(n.mouseStrength,i.mouseInteraction?Math.max(0,Number(i.mouseStrength)||0):0);const a=ae(i.tunnelColor),s=ae(i.cableColor),r=[1,1,1],c=ae(i.pulseColor),d=ae(i.tunnelColor);e.uniform3f(n.color1,a[0],a[1],a[2]),e.uniform3f(n.color2,s[0],s[1],s[2]),e.uniform3f(n.color3,r[0],r[1],r[2]),e.uniform3f(n.pulseColor,c[0],c[1],c[2]),e.uniform3f(n.tunnelColor,d[0],d[1],d[2])}updateDynamics(e){var d;const i=this.config,n=this.reducedMotion,o=n?1.5:7;this.mouse.x=N(this.mouse.x,this.targetMouse.x,o,e),this.mouse.y=N(this.mouse.y,this.targetMouse.y,o,e),this.mouseActive=N(this.mouseActive,this.targetMouseActive,5.5,e);const a=this.mouse.x-this.previousMouse.x,s=this.mouse.y-this.previousMouse.y,r=Math.min(1,Math.hypot(a,s)/Math.max(e,1/120)*.75);this.mouseVelocity=N(this.mouseVelocity,r,8,e),this.previousMouse.x=this.mouse.x,this.previousMouse.y=this.mouse.y,this.impulseVelocity=N(this.impulseVelocity,0,6.5,e),this.impulse=N(this.impulse,0,4.8,e),n||(this.superPulseTimer+=e,this.superPulseTimer>=this.nextSuperPulse&&(this.superPulseTimer=0,this.nextSuperPulse=this.randomSuperPulseDelay(),this.superPulse=1)),this.superPulseVelocity=N(this.superPulseVelocity,0,5,e),this.superPulse=N(this.superPulse,0,n?3:1.25,e);const c=Number((d=this.getScrollSpeed)==null?void 0:d.call(this))||0;mt(this.gl,this.program,this.u,{time:this.time,resolution:[this.canvas.width,this.canvas.height],mouse:[this.mouse.x,this.mouse.y],mouseActive:this.mouseActive,mouseVelocity:this.mouseVelocity,impulse:this.impulse,superPulse:this.superPulse,scrollSpeed:I(c,-3,3),grain:i.grain&&this.quality.grain?1:0})}draw(){const e=this.gl;if(!e||!this.program)return;const i=!!this.framebuffer&&this.config.grain&&this.quality.grain;e.disable(e.DEPTH_TEST),e.enable(e.BLEND),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ONE_MINUS_SRC_ALPHA),i?e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer):e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,this.canvas.width,this.canvas.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(this.program),e.bindVertexArray(this.vao),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindVertexArray(null),i&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,this.canvas.width,this.canvas.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(this.compositeProgram),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,this.frameTexture),e.uniform1i(this.cu.scene,0),e.uniform1f(this.cu.grain,1),e.uniform1f(this.cu.grainIntensity,Number(this.config.grainIntensity)||0),e.uniform1f(this.cu.time,this.time),e.bindVertexArray(this.quadVao),e.drawArrays(e.TRIANGLE_STRIP,0,4),e.bindVertexArray(null),e.bindTexture(e.TEXTURE_2D,null))}start(){return this.running||!this.gl||!this.pageVisible?this:(this.running=!0,this.lastTime=performance.now(),this.raf=requestAnimationFrame(this.frame),this)}pause(){this.running&&(this.running=!1,this.raf&&cancelAnimationFrame(this.raf),this.raf=0)}resume(){this.running||!this.gl||!this.pageVisible||this.start()}triggerPulse(){this.impulseVelocity=Math.min(1,this.impulseVelocity+.9),this.impulse=Math.min(1,this.impulse+.82)}triggerSuperPulse(){this.superPulse=1,this.superPulseVelocity=1,this.superPulseTimer=0,this.nextSuperPulse=this.randomSuperPulseDelay()}setFlowDirection(e){this.config.flowDirection=e==="inward"?"inward":"outward",this.applyConfigUniforms()}setIntensity(e){const i=I(Number(e)||0,0,3);this.config.brightness=i,this.config.opacity=I(i,0,1),this.applyConfigUniforms()}setConfig(e={}){if(!e||typeof e!="object")return this;const i=Object.prototype.hasOwnProperty.call(e,"quality");return Object.assign(this.config,e),i&&(this.quality=Te(this.config.quality),this.resize()),this.applyConfigUniforms(),this}destroy(){var i,n,o,a,s;this.pause(),window.removeEventListener("mousemove",this._boundMouseMove),window.removeEventListener("touchmove",this._boundTouchMove),window.removeEventListener("resize",this._boundResize),(i=this.canvas)==null||i.removeEventListener("mouseenter",this._boundMouseEnter),(n=this.canvas)==null||n.removeEventListener("mouseleave",this._boundMouseLeave),(o=this.canvas)==null||o.removeEventListener("pointerdown",this._boundPointerDown),document.removeEventListener("visibilitychange",this._boundVisibility),(s=(a=this.mediaQuery)==null?void 0:a.removeEventListener)==null||s.call(a,"change",this._boundMotionChange);const e=this.gl;e&&(this.vao&&e.deleteVertexArray(this.vao),this.quadVao&&e.deleteVertexArray(this.quadVao),this.quadBuffer&&e.deleteBuffer(this.quadBuffer),this.framebuffer&&e.deleteFramebuffer(this.framebuffer),this.frameTexture&&e.deleteTexture(this.frameTexture),this.depthRenderbuffer&&e.deleteRenderbuffer(this.depthRenderbuffer),this.program&&e.deleteProgram(this.program),this.compositeProgram&&e.deleteProgram(this.compositeProgram)),this.gl=null,this.program=null,this.compositeProgram=null,this.vao=null,this.quadVao=null,this.quadBuffer=null,this.framebuffer=null,this.frameTexture=null,this.depthRenderbuffer=null,D===this&&(D=null)}}function mt(t,e,i,n){!t||!e||!i||(t.useProgram(e),n.time!==void 0&&t.uniform1f(i.time,n.time),n.resolution&&t.uniform2f(i.resolution,n.resolution[0],n.resolution[1]),n.mouse&&t.uniform2f(i.mouse,n.mouse[0],n.mouse[1]),n.mouseActive!==void 0&&t.uniform1f(i.mouseActive,n.mouseActive),n.mouseVelocity!==void 0&&t.uniform1f(i.mouseVelocity,n.mouseVelocity),n.impulse!==void 0&&t.uniform1f(i.impulse,n.impulse),n.superPulse!==void 0&&t.uniform1f(i.superPulse,n.superPulse),n.scrollSpeed!==void 0&&t.uniform1f(i.scrollSpeed,n.scrollSpeed),n.grain!==void 0&&t.uniform1f(i.grain,n.grain))}function ht(t=()=>je){const e=document.getElementById("webgl-bg");if(!e)return console.warn('[particles.js] No <canvas id="webgl-bg"> found in the DOM.'),null;D&&(D.destroy(),D=null),e.style.position=e.style.position||"fixed",e.style.inset=e.style.inset||"0",e.style.width=e.style.width||"100%",e.style.height=e.style.height||"100%",e.style.display=e.style.display||"block",e.style.pointerEvents=e.style.pointerEvents||"none";try{return D=new dt(e,Fe,t),D.start(),D}catch(i){if(console.error("[particles.js] Initialization failed:",i),D){try{D.destroy()}catch{}D=null}return null}}function pt(){ft(),gt(),yt()}function ft(){var b;const t=document.getElementById("hero");if(!t)return;const e=(b=window.matchMedia)==null?void 0:b.call(window,"(prefers-reduced-motion: reduce)").matches,i=document.getElementById("navbar"),n=[t.querySelector(".hero-status-pill"),t.querySelector(".hero-subtitle")].filter(Boolean),o=t.querySelector(".hero-title"),a=[t.querySelector(".typing-container"),t.querySelector(".hero-desc")].filter(Boolean),s=Array.from(t.querySelectorAll(".hero-btns .btn")),r=Array.from(t.querySelectorAll(".hero-stat")),c=t.querySelector(".hero-portrait-wrapper"),d=Array.from(t.querySelectorAll(".holo-badge")),l=document.getElementById("ai-assistant-btn");if(e||typeof gsap>"u"){t.classList.add("hero-cinematic-revealed");return}gsap.set(i,{autoAlpha:0,y:-60}),gsap.set(n,{autoAlpha:0,y:20}),gsap.set(o,{autoAlpha:0,y:35,filter:"blur(10px)"}),gsap.set(a,{autoAlpha:0,y:22}),gsap.set(s,{autoAlpha:0,y:16,scale:.9}),gsap.set(r,{autoAlpha:0,y:20}),gsap.set(c,{autoAlpha:0,scale:.82,rotateY:-15,transformPerspective:1200}),gsap.set(d,{autoAlpha:0,scale:.5}),gsap.set(l,{autoAlpha:0,scale:0}),gsap.timeline({defaults:{ease:"power3.out"},onComplete:()=>t.classList.add("hero-cinematic-revealed")}).to(i,{autoAlpha:1,y:0,duration:1,ease:"power4.out"},0).to(n,{autoAlpha:1,y:0,duration:.7,stagger:.1},.4).to(o,{autoAlpha:1,y:0,filter:"blur(0px)",duration:1,ease:"power4.out"},.6).to(a,{autoAlpha:1,y:0,duration:.8,stagger:.15},.9).to(s,{autoAlpha:1,y:0,scale:1,duration:.7,stagger:.15,ease:"back.out(1.7)"},1.25).to(r,{autoAlpha:1,y:0,duration:.6,stagger:.1},1.6).to(c,{autoAlpha:1,scale:1,rotateY:0,duration:1.2,ease:"power4.out"},1.5).to(d,{autoAlpha:1,scale:1,duration:.8,stagger:.2,ease:"back.out(2)"},2.1).to(l,{autoAlpha:1,scale:1,duration:.6,ease:"back.out(2)"},2.7)}function gt(){const t=["AI-Powered Products","Cinematic Experiences","Intelligent Systems","Things That Matter"];let e=0,i=0,n=!1;const o=document.getElementById("typewriter");if(!o)return;function a(){const s=t[e];o.textContent=n?s.substring(0,i-1):s.substring(0,i+1),i+=n?-1:1;let r=n?38:85;!n&&i===s.length?(r=2400,n=!0):n&&i===0&&(n=!1,e=(e+1)%t.length,r=400),setTimeout(a,r)}setTimeout(a,1200)}function yt(){var o,a;if((a=(o=window.matchMedia)==null?void 0:o.call(window,"(hover: none), (pointer: coarse)"))==null?void 0:a.matches)return;const e=document.querySelector(".hero-portrait-wrapper"),i=document.getElementById("heroPortrait"),n=document.querySelector(".portrait-rim-light");!e||!i||(e.addEventListener("mousemove",s=>{const r=e.getBoundingClientRect(),c=s.clientX-r.left,d=s.clientY-r.top,l=(d-r.height/2)/(r.height/2)*-14,p=(c-r.width/2)/(r.width/2)*14;i.style.transform=`perspective(1000px) rotateX(${l}deg) rotateY(${p}deg) scale3d(1.02,1.02,1.02)`,n&&(n.style.setProperty("--mouse-x",`${c/r.width*100}%`),n.style.setProperty("--mouse-y",`${d/r.height*100}%`))}),e.addEventListener("mouseleave",()=>{i.style.transform="",n&&(n.style.setProperty("--mouse-x","50%"),n.style.setProperty("--mouse-y","50%"))}))}async function te(t,e=[]){try{const i=await fetch(t);if(!i.ok)throw new Error(`HTTP error! status: ${i.status}`);return await i.json()}catch(i){return console.warn(`[Aether Data] Fetch failed for ${t}, using fallback dataset.`,i),e}}const vt=[{category:"Frontend",icon:"🎨",items:[{name:"HTML5",icon:"⚡"},{name:"CSS3",icon:"🎨"},{name:"JavaScript ES6+",icon:"🟡"},{name:"TypeScript",icon:"🔷"},{name:"React",icon:"⚛️"},{name:"Next.js",icon:"▲"},{name:"TailwindCSS",icon:"💨"},{name:"Three.js",icon:"🌐"},{name:"WebGL",icon:"🖼️"},{name:"Responsive Design",icon:"📱"},{name:"Accessibility",icon:"♿"}]},{category:"Backend & Databases",icon:"⚙️",items:[{name:"Node.js",icon:"🟩"},{name:"Java",icon:"☕"},{name:"Express.js",icon:"🚀"},{name:"React",icon:"⚛️"},{name:"Data Structures",icon:"🧩"},{name:"MySQL",icon:"🗄️"},{name:"MongoDB",icon:"🍃"},{name:"Firebase",icon:"🔥"},{name:"Supabase",icon:"⚡"}]},{category:"AI & Intelligence",icon:"🤖",items:[{name:"Prompt Engineering",icon:"💬"},{name:"OpenAI APIs",icon:"🧠"},{name:"Claude APIs",icon:"✦"},{name:"AI Agents",icon:"🤖"}]},{category:"DevOps & Architecture",icon:"🛠️",items:[{name:"Git",icon:"🐙"},{name:"Vercel",icon:"▲"},{name:"GitHub Pages",icon:"📄"},{name:"GitHub Actions",icon:"⚙️"},{name:"CI/CD",icon:"🔧"}]},{category:"Soft Skills",icon:"🧠",items:[{name:"Leadership",icon:"👑"},{name:"Public Speaking",icon:"🎙️"},{name:"Teamwork",icon:"🤝"},{name:"Critical Thinking",icon:"💡"},{name:"Decision Making",icon:"🎯"},{name:"Strategic Thinking",icon:"📈"},{name:"Adaptability",icon:"🔄"},{name:"Time Management",icon:"⏱️"}]}];async function bt(){const t=document.getElementById("skills-wrapper")||document.getElementById("skills-container");if(!t)return;const e=await te("data/skills.json",vt);wt(t,e),Et(),ie()}function wt(t,e){t.innerHTML=e.map(i=>`
        <div class="skill-category">
            <div class="skill-category-header">
                <span class="skill-category-icon" aria-hidden="true">${i.icon}</span>
                <h4>${i.category}</h4>
                <div class="skill-cat-line" aria-hidden="true"></div>
            </div>
            <div class="skill-tags" role="list" aria-label="${i.category} skills">
                ${i.items.map(n=>`
                    <div class="skill-capsule" role="listitem" tabindex="0" data-skill="${n.name.toLowerCase()}" title="${n.name} · Core Stack Capability" aria-label="${n.name}">
                        <span class="skill-icon" aria-hidden="true">${n.icon}</span>${n.name}
                    </div>
                `).join("")}
            </div>
        </div>
    `).join("")}function Et(){var e,i;typeof gsap>"u"||(i=(e=window.matchMedia)==null?void 0:e.call(window,"(hover: none), (pointer: coarse)"))!=null&&i.matches||document.querySelectorAll(".skill-capsule").forEach(n=>{n.addEventListener("mousemove",o=>{const a=n.getBoundingClientRect(),s=(o.clientX-a.left-a.width/2)*.15,r=(o.clientY-a.top-a.height/2)*.15;gsap.to(n,{x:s,y:r,duration:.3,ease:"power2.out"})}),n.addEventListener("mouseleave",()=>{gsap.to(n,{x:0,y:0,duration:.5,ease:"elastic.out(1,0.5)"})})})}const kt=[{id:"modal-kaamkaagaz",number:"01 / 04",title:"KaamKaagaz — Civic Tech & Admissions Platform",accentGradient:"linear-gradient(90deg,#c8561b,#f59e0b)",tech:["Next.js 15","React 19","TypeScript","Tailwind CSS"],description:"A multilingual civic-tech web application transforming complicated Indian government paperwork and college admissions into clear, structured, step-by-step guidance.",github:"https://github.com/chillingbing648-sketch/KaamKaagaz.git",live:"https://chillingbing648-sketch.github.io/KaamKaagaz/",award:null,caseStudy:{heroGradient:"linear-gradient(135deg,#1c0e08,#2a140a,#0d1520)",story:"Government paperwork and university admissions in India are rarely difficult because the forms themselves are complex — the real friction is deciphering scattered requirements across outdated portals. Having managed university admissions logistics firsthand as an IT Specialist at University of Mumbai, I saw hundreds of students overwhelmed by contradictory requirements. I built KaamKaagaz to turn that anxiety into a clean, transparent roadmap from question to official submission.",problem:"Critical guidance for essential documents and higher-education admissions is fragmented across disconnected portals, laden with bureaucratic jargon, and inaccessible in regional languages.",architecture:"Architected with Next.js 15 (App Router), React 19, and TypeScript as a static-exported, zero-dependency civic engine. Features a deterministic, privacy-first client-side conversational search engine that normalizes Hinglish/Hindi queries without remote API latency or data tracking.",stack:["Next.js 15","React 19","TypeScript 5.6","Tailwind CSS 4","Static Export","localStorage","GitHub Actions"],challenges:"Structuring complex, multi-stage bureaucratic workflows into unambiguous state machines while ensuring 100% data privacy by keeping checklist data strictly in local storage.",impact:"Empowered students and citizens with self-serve clarity across essential government documentation and higher-education admission portals.",lessons:"Civic technology must prioritize trust, transparency, and accessibility over algorithmic obscurity. When you design for clarity, you remove real-world friction for thousands."}},{id:"modal-attendify",number:"02 / 04",title:"Attendify — Attendance Platform",accentGradient:"linear-gradient(90deg,#3b82f6,#8b5cf6)",tech:["C++","Node.js","JSON"],description:"A highly organized web-based platform for structured attendance data tracking. Engineered with a clean UI to manage real-time attendance logistics seamlessly.",github:"https://github.com/chillingbing648-sketch/Attendify.git",live:"https://preview--vivid-web-transform.lovable.app/",award:null,caseStudy:{heroGradient:"linear-gradient(135deg,#06103a,#120d3a,#0d1530)",story:"A problem experienced firsthand every semester — no clean, fast way to track attendance across multiple subjects with different thresholds.",problem:"Students need to maintain minimum attendance percentages across 5–8 subjects simultaneously. No lightweight tool existed to project future attendance and alert when thresholds were at risk.",architecture:"Built with C++ core logic for attendance calculations, wrapped with a Node.js API layer and a clean JSON data store.",stack:["C++","Node.js","JSON Data Store","REST API","HTML/CSS/JS"],challenges:"Integrating C++ core processing with Node.js async API handling. Keeping user state synced across browser restarts without authentication friction.",impact:"Eliminated spreadsheet dependency for attendance tracking. Real-time projections give students clear visibility of their academic standing.",lessons:"The simplest ideas often create the most value. Bridging compiled languages with web UIs is powerful."}},{id:"modal-sustainable",number:"03 / 04",title:"Continuity - Financial Sustainability Vault",accentGradient:"linear-gradient(90deg,#10b981,#06b6d4)",tech:["AI Integration","React","Data Analysis"],description:"Continuity is a secure digital legacy platform that brings wills, investments, assets, estates, and important documents into one trusted place — with controlled access for the people who matter most.",github:"https://github.com/chillingbing648-sketch/Continuity.git",live:"https://chillingbing648-sketch.github.io/Continuity/",award:null,caseStudy:{heroGradient:"linear-gradient(135deg,#001a0e,#001520,#0a1a0a)",story:"A secure digital legacy platform designed to bring wills, investments, assets, estates, and important documents together in one trusted place. Continuity focuses on making personal legacies organized, accessible, and securely shareable with the people who matter most.",problem:"Important financial and legacy information is often scattered across documents, accounts, institutions, and personal records. Families may struggle to know what exists, where it is, or how to access it when it matters most.",architecture:"Built a centralized digital platform that enables users to organize assets, investments, wills, estates, and critical documents, while providing secure, role-based access and family notifications for controlled information sharing.",stack:["Full-Stack","Secure Data Management","Access Control","Responsive Design"],challenges:"Designing a system that balances accessibility with privacy and security. Creating a simple experience for managing complex financial and legacy information while ensuring that sensitive data is shared only with the right people.",impact:"Created a unified digital space for managing personal legacy and financial information, helping individuals stay organized while giving trusted family members the right access when needed.",lessons:"The best digital systems simplify complexity without compromising trust. Continuity was built around the idea that preserving a legacy is not just about storing information, but ensuring it reaches the right people at the right time."}},{id:"modal-chatbot",number:"04 / 04",title:"WALL-E — Mental Health AI Companion App",accentGradient:"linear-gradient(90deg,#ec4899,#8b5cf6)",tech:["AI Integration","Mood Tracking","Guided Journaling"],description:"A supportive AI companion for mood check-ins, guided journaling, and reflective conversations — designed to encourage healthier daily habits with clear, user-first boundaries.",github:"https://github.com/chillingbing648-sketch/WALL-E.git",live:"https://chillingbing648-sketch.github.io/WALL-E/",award:null,caseStudy:{heroGradient:"linear-gradient(135deg,#1a0520,#0d0530,#200520)",story:"WALL-E began with a simple idea: create a calm, private space where a person can pause, reflect, and build a more consistent emotional check-in habit.",problem:"Daily stress is easy to overlook until it compounds. People need a low-friction way to capture how they feel, reflect on patterns, and find supportive prompts without replacing professional care.",architecture:"A responsive AI companion experience with guided check-ins, journal prompts, mood history, and contextual conversation flows. Personal reflection stays at the center, with support resources easy to access when needed.",stack:["JavaScript","AI Integration","Local Storage","Responsive Design"],challenges:"Designing language that feels supportive without making clinical claims, protecting personal reflections, and making the experience clear about its limits.",impact:"Created a gentler daily reflection experience that helps users notice patterns and make space for intentional self-care.",lessons:"Empathy must shape every interaction. Mental-health-related tools need clear boundaries, privacy-first decisions, and easy access to professional support."}}];let H=null,se=null;async function At(){const t=document.getElementById("projects-grid"),e=document.getElementById("project-modals-container");if(!t)return;const i=await te("data/projects.json",kt);Tt(t,i),xt(e||document.body,i),St(),ie()}function Tt(t,e){t.innerHTML=e.map(i=>`
        <div class="project-card" data-modal="${i.id}" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open case study for ${i.title}">
            <div class="project-card-inner">
                <div class="project-accent" style="background:${i.accentGradient}"></div>
                ${i.award?`<div class="award-badge">${i.award}</div>`:""}
                <div class="project-number">${i.number}</div>
                <h3 class="project-title">${i.title}</h3>
                <p class="project-desc">${i.description}</p>
                <div class="project-tech">
                    ${i.tech.map(n=>`<span class="tech-badge">${n}</span>`).join("")}
                </div>
                <div class="project-links">
                    ${i.github?`<a href="${i.github}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()" aria-label="View source code on GitHub for ${i.title}">GitHub ↗</a>`:""}
                    ${i.live?`<a href="${i.live}" target="_blank" rel="noopener" class="project-link" onclick="event.stopPropagation()" aria-label="View live deployment for ${i.title}">Live Demo ↗</a>`:""}
                    <button class="project-case-btn" data-modal="${i.id}" type="button" aria-label="Read case study for ${i.title}">Case Study</button>
                </div>
            </div>
        </div>
    `).join("")}function xt(t,e){t.querySelectorAll(".case-modal-overlay").forEach(n=>n.remove()),e.forEach(n=>{const o=n.caseStudy,a=document.createElement("div");a.className="case-modal-overlay",a.id=n.id+"-overlay",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label",`Case study: ${n.title}`),a.innerHTML=`
            <div class="case-modal">
                <div class="case-modal-hero">
                    <div class="case-modal-hero-bg" style="background:${o.heroGradient}"></div>
                    <div class="case-modal-hero-overlay"></div>
                    <button class="case-modal-close" aria-label="Close case study">✕</button>
                    <div style="position:relative;z-index:2">
                        <div class="case-section-label" style="margin-bottom:0.4rem">${n.number}</div>
                        <h2 style="font-size:1.9rem;font-weight:800;letter-spacing:-0.02em">${n.title}</h2>
                        ${n.award?`<div class="award-badge" style="margin-top:0.8rem">${n.award}</div>`:""}
                    </div>
                </div>
                <div class="case-modal-body">
                    <div class="case-section">
                        <div class="case-section-label">Origin Story</div>
                        <div class="case-section-content">${o.story}</div>
                    </div>
                    <div class="case-grid-2">
                        <div class="case-section">
                            <div class="case-section-label">The Problem</div>
                            <div class="case-section-content">${o.problem}</div>
                        </div>
                        <div class="case-section">
                            <div class="case-section-label">Architecture</div>
                            <div class="case-section-content">${o.architecture}</div>
                        </div>
                    </div>
                    <div class="case-section">
                        <div class="case-section-label">Tech Stack</div>
                        <div class="case-tech-grid">
                            ${o.stack.map(s=>`<span class="tech-badge">${s}</span>`).join("")}
                        </div>
                    </div>
                    <div class="case-grid-2">
                        <div class="case-impact-box case-section">
                            <div class="case-section-label">Impact</div>
                            <div class="case-section-content">${o.impact}</div>
                        </div>
                        <div class="case-lesson-box case-section">
                            <div class="case-section-label">Lessons Learned</div>
                            <div class="case-section-content">${o.lessons}</div>
                        </div>
                    </div>
                    <div class="case-section">
                        <div class="case-section-label">Key Challenges</div>
                        <div class="case-section-content">${o.challenges}</div>
                    </div>
                    <div class="case-links">
                        ${n.github?`<a href="${n.github}" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size:0.88rem;padding:0.75rem 1.6rem">GitHub ↗</a>`:""}
                        ${n.live?`<a href="${n.live}" target="_blank" rel="noopener" class="btn btn-primary" style="font-size:0.88rem;padding:0.75rem 1.6rem">View Live ↗</a>`:""}
                    </div>
                </div>
            </div>
        `,t.appendChild(a),a.querySelector(".case-modal-close").addEventListener("click",()=>re(a)),a.addEventListener("click",s=>{s.target===a&&re(a)})}),document.addEventListener("keydown",n=>{n.key==="Escape"&&H&&re(H)})}function St(){document.querySelectorAll(".project-card-inner").forEach(t=>{t.parentElement.style.perspective="1000px",t.addEventListener("mousemove",e=>{const i=t.getBoundingClientRect(),n=e.clientX-i.left,o=e.clientY-i.top;t.style.setProperty("--spotlight-x",n/i.width*100+"%"),t.style.setProperty("--spotlight-y",o/i.height*100+"%");const a=(o-i.height/2)/(i.height/2)*-6,s=(n-i.width/2)/(i.width/2)*6;typeof gsap<"u"?gsap.to(t,{rotateX:a,rotateY:s,transformPerspective:1e3,duration:.3,ease:"power2.out"}):t.style.transform=`perspective(1000px) rotateX(${a}deg) rotateY(${s}deg)`}),t.addEventListener("mouseleave",()=>{typeof gsap<"u"?gsap.to(t,{rotateX:0,rotateY:0,duration:.6,ease:"elastic.out(1, 0.5)"}):t.style.transform="perspective(1000px) rotateX(0deg) rotateY(0deg)"})}),document.querySelectorAll("[data-modal]").forEach(t=>{t.addEventListener("click",e=>{e.stopPropagation();const i=t.dataset.modal;he(i,t)}),t.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();const i=t.dataset.modal;he(i,t)}})})}function Ne(t){if(t.key==="Escape"){H&&re(H);return}if(t.key==="Tab"&&H){const e=Array.from(H.querySelectorAll('button:not([disabled]), [tabindex="0"], a[href]')).filter(o=>o.offsetParent!==null);if(!e.length)return;const i=e[0],n=e[e.length-1];t.shiftKey&&document.activeElement===i?(t.preventDefault(),n.focus()):!t.shiftKey&&document.activeElement===n&&(t.preventDefault(),i.focus())}}function he(t,e){const i=document.getElementById(t+"-overlay");if(!i)return;se=e||document.activeElement,H=i,document.body.style.overflow="hidden",i.classList.add("open"),window.addEventListener("keydown",Ne);const n=i.querySelector(".case-modal-close");setTimeout(()=>{var o;n?n.focus():(o=i.querySelector(".case-modal"))==null||o.focus()},100)}function re(t){t.classList.remove("open"),document.body.style.overflow="",H=null,window.removeEventListener("keydown",Ne),se&&typeof se.focus=="function"&&se.focus()}const Lt=[{date:"Currently Pursuing",title:"BSc Information Technology",subtitle:"Thakur Specialised Degree College · GPA 9.5",position:"left"},{date:"2024 — 2025",title:"12th Grade (Computer Science)",subtitle:"Sardar Vallabhai Patel College",position:"right"},{date:"2022 — 2023",title:"10th Grade",subtitle:"St. Xavier's High School · Maharashtra Board",position:"left"}],_t=[{icon:"🏆",title:"IntraCollegiate Debate Winner",description:"Won 1st place presenting well-researched arguments under pressure across diverse complex topics."},{icon:"📊",title:"PR Head — InterCollegiate Fest",description:"Led PR efforts attracting 2,000+ attendees and generating 1,000+ registrations through strategic outreach."},{icon:"🎓",title:"Academic Excellence",description:"Recognized for maintaining GPA 9.5 with active involvement in Fests, NSS Unit, and student leadership."}];async function Ct(){const t=document.getElementById("timeline-items-wrapper"),e=document.getElementById("achievements-grid"),[i,n]=await Promise.all([te("data/timeline.json",Lt),te("data/achievements.json",_t)]);t&&Mt(t,i),e&&It(e,n),Pt()}function Mt(t,e){t.innerHTML=e.map((i,n)=>`
        <div class="timeline-item ${i.position} reveal-item" style="--delay:${n*.15}s">
            <div class="timeline-card glass-panel">
                <div class="timeline-date">${i.date}</div>
                <h3>${i.title}</h3>
                <p style="color:var(--text-muted);font-size:0.92rem;margin-top:0.4rem">${i.subtitle}</p>
            </div>
        </div>
    `).join("")}function It(t,e){t.innerHTML=e.map((i,n)=>`
        <div class="achievement-card glass-panel reveal-item" style="--delay:${n*.12}s">
            <div class="achievement-icon">${i.icon}</div>
            <div>
                <h4 style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem">${i.title}</h4>
                <p style="color:var(--text-muted);font-size:0.92rem;line-height:1.7">${i.description}</p>
            </div>
        </div>
    `).join("")}function Pt(){if(typeof gsap>"u"||typeof ScrollTrigger>"u")return;const t=document.getElementById("timelineProgress"),e=document.getElementById("timeline-container");!t||!e||ScrollTrigger.create({trigger:e,start:"top 70%",end:"bottom 30%",scrub:.6,onUpdate:i=>{var a;const o=(((a=t.getTotalLength)==null?void 0:a.call(t))||1e3)*(1-i.progress);t.style.strokeDashoffset=o}})}function Rt(){typeof gsap>"u"||typeof ScrollTrigger>"u"||(gsap.registerPlugin(ScrollTrigger),Dt(),$t(),Bt(),jt(),Ft())}function Dt(){gsap.utils.toArray(".reveal-item").forEach((t,e)=>{const i=parseFloat(t.style.getPropertyValue("--delay")||"0");gsap.fromTo(t,{opacity:0,y:50,filter:"blur(8px)"},{opacity:1,y:0,filter:"blur(0px)",duration:1,ease:"power4.out",delay:i,scrollTrigger:{trigger:t,start:"top 85%",toggleActions:"play none none none"}})})}function $t(){gsap.fromTo(".service-card",{opacity:0,y:60,scale:.94},{opacity:1,y:0,scale:1,stagger:{each:.12,from:"start"},ease:"expo.out",duration:1,scrollTrigger:{trigger:"#services",start:"top 75%"}}),gsap.fromTo("#about .about-text p",{opacity:0,x:-30},{opacity:1,x:0,stagger:.1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:"#about",start:"top 70%"}}),gsap.fromTo(".value-chip",{opacity:0,scale:.7,y:15},{opacity:1,scale:1,y:0,stagger:.06,duration:.6,ease:"back.out(1.8)",scrollTrigger:{trigger:".about-values",start:"top 85%"}}),document.querySelectorAll(".project-card").length&&gsap.fromTo(".project-card",{opacity:0,clipPath:"inset(0 100% 0 0)",scale:.97},{opacity:1,clipPath:"inset(0 0% 0 0)",scale:1,stagger:{each:.15,from:"start"},ease:"power4.inOut",duration:1,scrollTrigger:{trigger:"#projects",start:"top 75%"}}),gsap.utils.toArray(".section-title").forEach(t=>{gsap.fromTo(t,{opacity:0,y:30,filter:"blur(12px)"},{opacity:1,y:0,filter:"blur(0px)",duration:1.2,ease:"power4.out",scrollTrigger:{trigger:t,start:"top 88%"}})}),gsap.utils.toArray(".section-subtitle").forEach(t=>{gsap.fromTo(t,{opacity:0,letterSpacing:"8px"},{opacity:1,letterSpacing:"3px",duration:1,ease:"power3.out",scrollTrigger:{trigger:t,start:"top 90%"}})}),document.querySelectorAll(".skill-category").length&&gsap.fromTo(".skill-category",{opacity:0,x:-40},{opacity:1,x:0,stagger:.14,duration:.9,ease:"expo.out",scrollTrigger:{trigger:"#about .skills-wrapper",start:"top 75%"}}),gsap.fromTo(".obs-headline",{opacity:0,scale:.9,filter:"blur(16px)"},{opacity:1,scale:1,filter:"blur(0px)",duration:1.4,ease:"power4.out",scrollTrigger:{trigger:"#observatory",start:"top 70%"}}),gsap.fromTo(".obs-cta-glass",{opacity:0,y:50,scale:.95},{opacity:1,y:0,scale:1,duration:1.2,ease:"expo.out",delay:.3,scrollTrigger:{trigger:"#observatory",start:"top 60%"}}),gsap.fromTo(".constellation-node",{opacity:0,scale:0,y:20},{opacity:1,scale:1,y:0,stagger:.1,duration:.8,ease:"back.out(2)",scrollTrigger:{trigger:".social-constellation",start:"top 85%"}})}function Bt(){document.querySelectorAll(".btn").forEach(t=>{t.addEventListener("mousemove",e=>{const i=t.getBoundingClientRect(),n=(e.clientX-i.left-i.width/2)*.25,o=(e.clientY-i.top-i.height/2)*.25;gsap.to(t,{x:n,y:o,duration:.4,ease:"power3.out"})}),t.addEventListener("mouseleave",()=>{gsap.to(t,{x:0,y:0,duration:.7,ease:"elastic.out(1, 0.4)"})})})}function jt(){gsap.fromTo(".exp-card",{opacity:0,y:60,scale:.95},{opacity:1,y:0,scale:1,stagger:.18,duration:1,ease:"power4.out",scrollTrigger:{trigger:"#work",start:"top 75%"}}),document.querySelectorAll(".achievement-card").length&&gsap.fromTo(".achievement-card",{opacity:0,x:40},{opacity:1,x:0,stagger:.14,duration:.9,ease:"expo.out",scrollTrigger:{trigger:".achievements-grid",start:"top 80%"}})}function Ft(){ScrollTrigger.create({trigger:"#observatory",start:"top 60%",onEnter:()=>{document.querySelectorAll(".sig-path").forEach(t=>{t.classList.add("drawn")})}})}function Nt(){var c,d;const t=document.getElementById("neural-canvas");if(!t)return;const e=t.getContext("2d"),i=t.parentElement;t.width=i.offsetWidth,t.height=i.offsetHeight;const n=(d=(c=window.matchMedia)==null?void 0:c.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:d.matches,o=Array.from({length:30},()=>({x:Math.random()*t.width,y:Math.random()*t.height,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25}));let a=!0,s=null;function r(){a&&(e.clearRect(0,0,t.width,t.height),o.forEach(l=>{l.x+=l.vx,l.y+=l.vy,(l.x<0||l.x>t.width)&&(l.vx*=-1),(l.y<0||l.y>t.height)&&(l.vy*=-1)}),o.forEach((l,p)=>{o.slice(p+1).forEach(b=>{const h=Math.hypot(l.x-b.x,l.y-b.y);h<100&&(e.beginPath(),e.moveTo(l.x,l.y),e.lineTo(b.x,b.y),e.strokeStyle=`rgba(139,92,246,${.25*(1-h/100)})`,e.lineWidth=.8,e.stroke())}),e.beginPath(),e.arc(l.x,l.y,2,0,Math.PI*2),e.fillStyle="rgba(139,92,246,0.45)",e.fill()}),n||(s=requestAnimationFrame(r)))}"IntersectionObserver"in window?new IntersectionObserver(([p])=>{a=p.isIntersecting,a&&!n&&!s?r():!a&&s&&(cancelAnimationFrame(s),s=null)},{threshold:.05}).observe(i||t):r(),window.addEventListener("resize",()=>{t.width=i.offsetWidth,t.height=i.offsetHeight,n&&r()},{passive:!0})}function Ut(){var p,b;const t=document.getElementById("observatory-canvas");if(!t)return;const e=t.getContext("2d"),i=document.getElementById("observatory");function n(){t.width=t.offsetWidth,t.height=t.offsetHeight}n(),window.addEventListener("resize",n,{passive:!0});const o=(b=(p=window.matchMedia)==null?void 0:p.call(window,"(prefers-reduced-motion: reduce)"))==null?void 0:b.matches,a=Array.from({length:160},()=>({x:Math.random()*(t.width||800),y:Math.random()*(t.height||600),r:Math.random()*1.5+.3,opacity:Math.random(),speed:Math.random()*.004+.001,phase:Math.random()*Math.PI*2})),s=Array.from({length:4},()=>({x:Math.random()*(t.width||800),y:Math.random()*(t.height||600),r:Math.random()*200+80,color:`hsla(${Math.random()*60+240}, 70%, 60%, 0.04)`}));let r=0,c=!1,d=null;function l(){!c&&!o||(e.clearRect(0,0,t.width,t.height),s.forEach(h=>{const m=e.createRadialGradient(h.x,h.y,0,h.x,h.y,h.r);m.addColorStop(0,h.color),m.addColorStop(1,"transparent"),e.fillStyle=m,e.beginPath(),e.arc(h.x,h.y,h.r,0,Math.PI*2),e.fill()}),a.forEach(h=>{const m=.3+.7*(Math.sin(r*h.speed+h.phase)*.5+.5);e.beginPath(),e.arc(h.x,h.y,h.r,0,Math.PI*2),e.fillStyle=`rgba(255,255,255,${m*h.opacity})`,e.fill()}),r++,o||(d=requestAnimationFrame(l)))}"IntersectionObserver"in window&&i?new IntersectionObserver(([m])=>{c=m.isIntersecting,c&&!o&&!d?l():!c&&d&&(cancelAnimationFrame(d),d=null)},{threshold:.05}).observe(i):(c=!0,l())}function Ht(){}function Le(t){const e=t.toLowerCase().trim(),i=document.querySelectorAll(".skill-capsule");let n=0;if(i.forEach(o=>{var a;o.classList.remove("highlight-search"),e&&((a=o.dataset.skill)!=null&&a.includes(e))&&(o.classList.add("highlight-search"),n++)}),n>0){const o=document.querySelector(".skill-capsule.highlight-search");o==null||o.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{document.querySelectorAll(".skill-capsule.highlight-search").forEach(a=>a.classList.remove("highlight-search"))},4e3)}return n}function qt(t){const e=t.toLowerCase().trim(),i=document.querySelectorAll(".project-card-inner");let n=0;return i.forEach(o=>{const a=o.textContent.toLowerCase();e&&a.includes(e)&&(typeof gsap<"u"&&gsap.fromTo(o,{boxShadow:"none"},{boxShadow:"0 0 0 2px rgba(6,182,212,0.8), 0 0 40px rgba(6,182,212,0.3)",duration:.5,yoyo:!0,repeat:3}),n++)}),n}const _e=["help","whoami","about","projects","skills","experience","education","timeline","library","achievements","resume","github","linkedin","contact","stats","search","history","pwd","date","time","theme","matrix","coffee","quote","future","origin","clear","exit","open","find"],Ce=['"The only way to do great work is to love what you do." — Steve Jobs','"First, solve the problem. Then, write the code." — John Johnson',`"Code is like humor. When you have to explain it, it's bad." — Cory House`,'"Simplicity is the soul of efficiency." — Austin Freeman','"The best error message is the one that never shows up." — Thomas Fuchs'];let F=JSON.parse(localStorage.getItem("aether-terminal-history")||"[]"),U=-1,G=!1,Z=0;const Me=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];function Ot(){var E,x,M,O,R;const t=document.getElementById("terminal-overlay"),e=document.getElementById("terminal-input"),i=document.getElementById("terminal-output"),n=document.getElementById("term-autocomplete");if(!t||!e||!i)return;let o=null;function a(){G||(G=!0,o=document.activeElement,t.classList.add("open"),t.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden",setTimeout(()=>e.focus(),150),i.innerHTML.trim()||b())}function s(){G&&(G=!1,t.classList.remove("open"),t.setAttribute("aria-hidden","true"),document.body.style.overflow="",e.value="",d(),o&&typeof o.focus=="function"&&o.focus())}(E=document.getElementById("terminalTrigger"))==null||E.addEventListener("click",a),(x=document.getElementById("mobileTerminalTrigger"))==null||x.addEventListener("click",()=>{var f;(f=document.getElementById("navLinks"))==null||f.classList.remove("active");const u=document.getElementById("menuBtn");u&&(u.textContent="☰",u.setAttribute("aria-expanded","false")),a()}),(M=document.getElementById("terminalCloseBtn"))==null||M.addEventListener("click",s),(O=document.querySelector("#term-close-dot"))==null||O.addEventListener("click",s),(R=document.querySelector("#term-min-dot"))==null||R.addEventListener("click",s);const r=document.getElementById("term-max-dot");r==null||r.addEventListener("click",()=>{const u=t.querySelector(".terminal-window");u==null||u.classList.toggle("terminal-maximized")}),[document.getElementById("term-close-dot"),document.getElementById("term-min-dot")].forEach(u=>{u==null||u.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),s())})}),r==null||r.addEventListener("keydown",u=>{var f;(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),(f=t.querySelector(".terminal-window"))==null||f.classList.toggle("terminal-maximized"))}),t.addEventListener("click",u=>{u.target===t&&s()}),t.addEventListener("keydown",u=>{if(u.key!=="Tab")return;const f=t.querySelectorAll('button:not([disabled]), [tabindex="0"], input:not([disabled])');if(!f.length)return;const k=f[0],g=f[f.length-1];u.shiftKey&&document.activeElement===k?(u.preventDefault(),g.focus()):!u.shiftKey&&document.activeElement===g&&(u.preventDefault(),k.focus())}),document.addEventListener("keydown",u=>{if(u.key===Me[Z]?(Z++,Z===Me.length&&(Z=0,a(),h("konami"))):Z=0,(u.ctrlKey||u.metaKey)&&u.key==="k"){u.preventDefault(),G?s():a();return}if(u.key==="`"&&!G&&document.activeElement.tagName!=="INPUT"&&document.activeElement.tagName!=="TEXTAREA"){a();return}if(u.key==="Escape"&&G){s();return}}),e.addEventListener("keydown",u=>{if(u.key==="Enter"){const f=e.value.trim();f&&(F.unshift(f),F.length>50&&F.pop(),localStorage.setItem("aether-terminal-history",JSON.stringify(F)),U=-1,l("prompt",`harsh@universe:~$ ${f}`),h(f.toLowerCase())),e.value="",d()}else if(u.key==="ArrowUp")u.preventDefault(),U<F.length-1&&(U++,e.value=F[U]||"");else if(u.key==="ArrowDown")u.preventDefault(),U>0?(U--,e.value=F[U]||""):(U=-1,e.value="");else if(u.key==="Tab"){u.preventDefault();const f=e.value.trim().toLowerCase(),k=_e.filter(g=>g.startsWith(f));k.length===1?(e.value=k[0],d()):k.length>1&&c(k)}}),e.addEventListener("input",()=>{const u=e.value.trim().toLowerCase();if(!u){d();return}const f=_e.filter(k=>k.startsWith(u));c(f.slice(0,8))});function c(u){n&&(n.innerHTML=u.map(f=>`<button class="term-suggestion" tabindex="-1">${f}</button>`).join(""),n.querySelectorAll(".term-suggestion").forEach(f=>{f.addEventListener("mousedown",k=>{k.preventDefault(),e.value=f.textContent,e.focus(),d()})}))}function d(){n&&(n.innerHTML="")}function l(u,f,k=0){setTimeout(()=>{const g=document.createElement("div");g.className="term-line",u==="prompt"?g.innerHTML=`<span class="term-prompt">harsh@universe:~$&nbsp;</span><span class="term-command">${Vt(f.replace(/^harsh@universe:~\$\s*/,""))}</span>`:u==="separator"?g.innerHTML=`<span class="term-separator">${f}</span>`:g.innerHTML=`<span class="term-${u}">${f}</span>`,i.appendChild(g),i.scrollTop=i.scrollHeight},k)}function p(u,f=0){u.forEach(([k,g],w)=>l(k,g,f+w*30))}function b(){p([["separator","╔══════════════════════════════════════════════════════╗"],["success","  ✦ Harsh Dubey's Digital Universe"],["separator","╚══════════════════════════════════════════════════════╝"],["info",'  Type <span class="term-highlight">help</span> to explore available commands.'],["response",'  Press <span class="term-highlight">Tab</span> for autocomplete · <span class="term-highlight">↑↓</span> for history'],["separator","─────────────────────────────────────────────────────────"]])}function h(u){const f=u.split(" "),k=f[0],g=f.slice(1).join(" "),w=B=>{s();const v=document.getElementById(B);v&&setTimeout(()=>v.scrollIntoView({behavior:"smooth",block:"start"}),300)};switch(k){case"help":p([["separator","─────────────────────────────────────────────────────────"],["highlight","  NAVIGATION"],["response","  about · projects · skills · experience · education · timeline · contact"],["highlight","  ACTIONS"],["response","  resume · github · linkedin · open &lt;project&gt; · find &lt;skill&gt; · search &lt;query&gt;"],["highlight","  SYSTEM"],["response","  help · whoami · stats · history · pwd · date · time · theme &lt;name&gt; · clear · exit"],["highlight","  CREATIVE"],["response","  matrix · coffee · quote · future · origin"],["separator","─────────────────────────────────────────────────────────"],["info",'  <span class="term-highlight">hint:</span> try "sudo hire harsh" 👀']]);break;case"whoami":p([["separator","─────────────────────────────────────────────────────────"],["success","  Harsh Dubey"],["response","  AI Developer · Creative Engineer · Student"],["response","  📍 Mumbai, India"],["response","  🎓 BSc IT · Thakur College · GPA 9.1"],["response","  ⚡ Specialising in AI integration & cinematic web experiences"],["response","  🏆 Hackathon Winner · Top 5% Competitor · Debate Champion"],["separator","─────────────────────────────────────────────────────────"]]);break;case"about":l("success","  ↓ Navigating to About section..."),w("about");break;case"projects":l("success","  ↓ Navigating to Projects section..."),w("projects");break;case"skills":l("success","  ↓ Navigating to Skills section..."),w("about");break;case"experience":l("success","  ↓ Navigating to Experience section..."),w("work");break;case"education":l("success","  ↓ Navigating to Education timeline..."),w("experience");break;case"timeline":l("success","  ↓ Navigating to Timeline section..."),w("experience");break;case"library":l("success","  ↓ Navigating to Digital Library..."),w("library");break;case"contact":l("success","  ↓ Navigating to Contact section..."),w("contact");break;case"achievements":p([["separator","─────────────────────────────────────────────────────────"],["highlight","  ACHIEVEMENTS"],["success","  🏆  IntraCollegiate Debate — 1st Place"],["success","  📊  PR Head · 2,000+ attendees · 1,000+ registrations"],["success","  🎓  Academic Excellence — GPA 9.1"],["success","  🥇  Hackathon First Prize — Sustainable Shopping AI"],["success","  ⭐  Top 5% of 500 competitors — Real-Time Chatbot"],["separator","─────────────────────────────────────────────────────────"]]);break;case"resume":l("success","  ↓ Downloading resume..."),s(),setTimeout(()=>{const $=document.createElement("a");$.href="Harsh_Resume.pdf",$.download="Harsh_Dubey_Resume.pdf",$.click()},400);break;case"github":l("success","  ↗ Opening GitHub profile..."),s(),setTimeout(()=>window.open("https://github.com/chillingbing648-sketch","_blank"),400);break;case"linkedin":l("success","  ↗ Opening LinkedIn profile..."),s(),setTimeout(()=>window.open("https://www.linkedin.com/in/harsh-dubey-640a68389/","_blank"),400);break;case"stats":p([["separator","─────────────────────────────────────────────────────────"],["highlight","  PORTFOLIO STATS"],["info",`  Uptime      : ${Math.floor(Math.random()*8e3+1e3)}ms`],["info","  Projects    : 4 shipped"],["info","  Skills      : 35+ technologies"],["info","  GPA         : 9.1 / 10"],["info","  FPS         : 60–120 ✓"],["info","  Lighthouse  : 92+ ✓"],["info","  Awwwards    : Pending submission 👀"],["separator","─────────────────────────────────────────────────────────"]]);break;case"history":if(!F.length){l("response","  No commands in history yet.");break}l("highlight","  COMMAND HISTORY"),F.slice(0,20).forEach(($,X)=>l("response",`  ${String(X+1).padStart(3," ")}  ${$}`));break;case"pwd":l("response","  /universe/harsh-dubey/portfolio/v4");break;case"date":l("response",`  ${new Date().toLocaleDateString("en-IN",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}`);break;case"time":l("response",`  ${new Date().toLocaleTimeString("en-IN")} IST`);break;case"theme":const B={matrix:"theme-matrix",morning:"env-morning",afternoon:"env-afternoon",sunset:"env-sunset",night:"env-night",reset:""};g?B[g]!==void 0?(ke(B[g]),l("success",`  ✓ Theme switched to: ${g}`),s()):l("error",`  Unknown theme: "${g}". Options: ${Object.keys(B).join(", ")}`):l("info","  Usage: theme &lt;matrix|morning|afternoon|sunset|night|reset&gt;");break;case"origin":l("success","  ↑ Returning to origin..."),s(),setTimeout(()=>{typeof gsap<"u"?gsap.to(window,{scrollTo:{y:0},duration:1.8,ease:"power4.inOut"}):window.scrollTo({top:0,behavior:"smooth"})},300);break;case"future":p([["separator","─────────────────────────────────────────────────────────"],["highlight","  PLANNED FEATURES"],["info","  ⬡  Architecture Viewer — Visual dependency graph"],["info","  ⬡  GitHub Visualizer — Live contribution map"],["info","  ⬡  Digital Library — Books · Research · Learning"],["info","  ⬡  Project Workspace — Interactive code explorer"],["info","  ⬡  Mission Control — AI dashboard"],["separator","─────────────────────────────────────────────────────────"]]);break;case"quote":l("info",`  "${Ce[Math.floor(Math.random()*Ce.length)]}"`);break;case"search":if(!g){l("error","  Usage: search &lt;keyword&gt;");break}const v=Le(g),A=qt(g),T=v+A;T>0?(l("success",`  ✓ Found ${T} results for "${g}" (${v} skills, ${A} projects)`),s()):l("error",`  No results found for "${g}"`);break;case"find":if(!g){l("error","  Usage: find &lt;skill&gt;");break}const j=Le(g);j?(l("success",`  ✓ Found ${j} skill(s) matching "${g}"`),s()):l("error",`  Skill "${g}" not found in the stack.`);break;case"open":const W={kaamkaagaz:"modal-kaamkaagaz",kaagaz:"modal-kaamkaagaz",kaam:"modal-kaamkaagaz",civic:"modal-kaamkaagaz",psych:"modal-kaamkaagaz",psychology:"modal-kaamkaagaz",attendify:"modal-attendify",attendance:"modal-attendify",sustainable:"modal-sustainable",continuity:"modal-sustainable",vault:"modal-sustainable",chatbot:"modal-chatbot",chat:"modal-chatbot",walle:"modal-chatbot","wall-e":"modal-chatbot"};if(!g){l("error","  Usage: open &lt;kaamkaagaz|attendify|continuity|walle&gt;");break}const V=W[g.toLowerCase()];V?(l("success",`  ↗ Opening case study: ${g}`),s(),setTimeout(()=>he(V),350)):l("error",`  Unknown project "${g}". Options: kaamkaagaz, attendify, continuity, walle`);break;case"clear":i.innerHTML="";break;case"exit":l("response","  Goodbye. The universe awaits."),setTimeout(s,600);break;case"matrix":p([["separator","─────────────────────────────────────────────────────────"],["success","  INITIATING MATRIX MODE..."],["info","  Wake up, Neo..."],["info","  The Matrix has you."],["separator","─────────────────────────────────────────────────────────"]]),ke("theme-matrix"),s();break;case"coffee":p([["separator","─────────────────────────────────────────────────────────"],["success","  ☕ Brewing..."],["response","       ) ) )"],["response","      ( ( ("],["response","    ._______."],["response","    |       |]"],["response","    \\       /"],["response","     `-----'"],["info","  This code was powered by coffee."],["separator","─────────────────────────────────────────────────────────"]]);break;case"sudo":u.includes("hire harsh")?(p([["separator","══════════════════════════════════════════════════════"],["success",""],["success","  ██╗  ██╗██╗██████╗ ███████╗██████╗ "],["success","  ██║  ██║██║██╔══██╗██╔════╝██╔══██╗"],["success","  ███████║██║██████╔╝█████╗  ██║  ██║"],["success","  ██╔══██║██║██╔══██╗██╔══╝  ██║  ██║"],["success","  ██║  ██║██║██║  ██║███████╗██████╔╝"],["success","  ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ "],["success",""],["highlight","  ✦ REQUEST ACCEPTED BY THE UNIVERSE ✦"],["info","  harshdubey.works@gmail.com — +91 9321521258"],["separator","══════════════════════════════════════════════════════"]]),m()):l("error",'  Permission denied. But... have you tried "sudo hire harsh"? 😄');break;case"42":p([["separator","─────────────────────────────────────────────────────────"],["highlight","  42"],["response","  The answer to life, the universe, and everything."],["info","  — The Hitchhiker's Guide to the Galaxy"],["separator","─────────────────────────────────────────────────────────"]]);break;case"konami":p([["separator","─────────────────────────────────────────────────────────"],["success","  ↑↑↓↓←→←→BA"],["highlight","  CHEAT CODE ACTIVATED"],["info","  +30 lives. You're welcome."],["separator","─────────────────────────────────────────────────────────"]]);break;case"developer":p([["separator","─────────────────────────────────────────────────────────"],["highlight","  DEVELOPER PROFILE"],["info","  Stack    : HTML · CSS · JS · React · Node · Three.js"],["info","  AI Stack : Claude API · OpenAI · Prompt Engineering"],["info","  Core     : Java · Data Structures · REST · Modular"],["info","  DevOps   : Git · Vercel · CI/CD"],["info","  CGPA     : 9.5 | Projects: 4+ | Hackathon: 🥇"],["separator","─────────────────────────────────────────────────────────"]]);break;case"debug":p([["separator","─────────────────────────────────────────────────────────"],["highlight","  DEBUG MODE"],["info",`  User Agent : ${navigator.userAgent.substring(0,50)}...`],["info",`  Resolution : ${window.innerWidth}×${window.innerHeight}`],["info",`  DevPixelRatio : ${window.devicePixelRatio}`],["info",`  Timestamp  : ${Date.now()}`],["info",`  Memory     : ${navigator.deviceMemory||"N/A"} GB`],["info",`  Cores      : ${navigator.hardwareConcurrency||"N/A"}`],["separator","─────────────────────────────────────────────────────────"]]);break;case"hello":p([["separator","─────────────────────────────────────────────────────────"],["success","  Hello, curious traveller. 👋"],["response","  You found the terminal. You're clearly someone who"],["response","  explores beyond the surface."],["info","  Harsh would love to build something with you."],["info","  → harshdubey.works@gmail.com"],["separator","─────────────────────────────────────────────────────────"]]);break;default:l("error",`  Command not found: "${k}". Type <span class="term-highlight">help</span> for commands.`)}}function m(){if(typeof gsap>"u")return;gsap.timeline().to("body",{filter:"hue-rotate(60deg) brightness(1.2)",duration:.3,repeat:3,yoyo:!0,ease:"none"}).to("body",{filter:"none",duration:.5})}}function Vt(t){const e=document.createElement("div");return e.appendChild(document.createTextNode(t)),e.innerHTML}const Gt=[{id:"book-ddia",title:"Designing Data-Intensive Applications",author:"Martin Kleppmann",category:"books",status:"Reading",currentlyReading:!0,progress:72,icon:"📖",notes:"Deep dive into distributed systems, data encoding, replication, and consensus algorithms."},{id:"book-clean-code",title:"Clean Code & Refactoring",author:"Robert C. Martin",category:"books",status:"Completed",currentlyReading:!1,progress:100,icon:"📘",notes:"Fundamental principles of software craft, readability, and maintainable architecture."},{id:"book-tfas",title:"Thinking, Fast and Slow",author:"Daniel Kahneman",category:"books",status:"Completed",currentlyReading:!1,progress:100,icon:"🧠",notes:"System 1 vs System 2 thinking, cognitive biases, and strategic decision making."}];let le=[],ce="all";async function zt(){const t=document.getElementById("library-grid"),e=document.getElementById("library-tabs");t&&(le=await te("data/library.json",Gt),Wt(e),Ue(t),ie())}function Wt(t){if(!t)return;const e=Array.from(new Set(le.map(a=>a.category).filter(Boolean))),i=[{id:"all",label:"All Resources"},...e.map(a=>({id:a,label:a==="books"?"📖 Books":a.charAt(0).toUpperCase()+a.slice(1)}))];t.innerHTML=`
    <div class="library-tabs-dock" role="tablist" aria-label="Knowledge Hub filter tabs">
      ${i.map(a=>{const s=a.id===ce;return`
          <button class="library-tab ${s?"active":""}"
                  role="tab"
                  id="tab-${a.id}"
                  aria-selected="${s?"true":"false"}"
                  tabindex="${s?"0":"-1"}"
                  aria-controls="library-grid"
                  data-cat="${a.id}">
            ${a.label}
          </button>
        `}).join("")}
    </div>
  `;const n=Array.from(t.querySelectorAll(".library-tab")),o=a=>{ce=a.dataset.cat,n.forEach(r=>{const c=r===a;r.classList.toggle("active",c),r.setAttribute("aria-selected",c?"true":"false"),r.setAttribute("tabindex",c?"0":"-1")}),a.focus();const s=document.getElementById("library-grid");s&&Ue(s)};n.forEach((a,s)=>{a.addEventListener("click",()=>o(a)),a.addEventListener("keydown",r=>{let c=null;r.key==="ArrowRight"?c=(s+1)%n.length:r.key==="ArrowLeft"?c=(s-1+n.length)%n.length:r.key==="Home"?c=0:r.key==="End"&&(c=n.length-1),c!==null&&(r.preventDefault(),o(n[c]))})})}function Ue(t){const e=ce==="all"?le:le.filter(i=>i.category===ce);t.innerHTML=e.map(i=>`
    <article class="library-card glass-panel ${i.currentlyReading?"currently-reading":""}">
      ${i.currentlyReading?`
        <div class="reading-now-badge">
          <span class="badge-dot"></span>
          Reading Now (${i.progress}%)
        </div>
      `:""}

      <div class="library-card-header">
        <div class="library-card-icon" aria-hidden="true">${i.icon}</div>
        <div class="library-card-meta">
          <h4 class="library-card-title">${i.title}</h4>
          <div class="library-card-author">${i.author}</div>
        </div>
      </div>

      <p class="library-card-notes">${i.notes}</p>

      <div class="library-card-footer">
        <span class="library-card-category">${i.category}</span>
        <span class="library-card-status ${i.currentlyReading?"reading":"completed"}">${i.status}</span>
      </div>

      ${i.currentlyReading?`
        <div class="reading-progress-track">
          <div class="reading-progress-bar" style="width:${i.progress}%"></div>
        </div>
      `:""}
    </article>
  `).join("")}const S={location:"Mumbai, India",email:"harshdubey.works@gmail.com",phone:"+91 9321521258",about:"Harsh Dubey is a student driven by curiosity, discipline, and a relentless desire to create meaningful impact. He doesn't just write code — he engineers solutions, leads teams, and transforms complex problems into elegant digital experiences. Curiosity is his default state. Every unfamiliar technology, every ambiguous brief, every difficult conversation becomes an opportunity to understand something more deeply. He adapts at speed, navigating unfamiliar stacks, tight deadlines, and complex stakeholder landscapes with calm, analytical precision. He's a natural collaborator who leads when needed and supports when required — from managing 2,000+ attendee events to winning debate competitions.",skills:{Frontend:["HTML5","CSS3","JavaScript ES6+","TypeScript","React","Next.js","TailwindCSS","Three.js","WebGL","Responsive Design","Accessibility"],"Backend & Databases":["Node.js","Java","Express.js","REST APIs","Data Structures","MySQL","MongoDB","Firebase","Supabase"],"AI & Intelligence":["Prompt Engineering","OpenAI APIs","Claude APIs","AI Agents"],"DevOps & Architecture":["Git & GitHub","Vercel","Netlify","CI/CD"],"Soft Skills":["Leadership","Public Speaking","Teamwork","Critical Thinking","Decision Making","Strategic Thinking","Adaptability","Time Management"]},projects:[{name:"KaamKaagaz",description:"A multilingual civic-tech web application transforming complicated Indian government paperwork and college admissions into clear, structured, step-by-step guidance.",tech:["Next.js 15","React 19","TypeScript","Tailwind CSS","Static Export"],highlights:["Multilingual civic-tech guidance (English, Hindi, Marathi)","University admissions hub & portal wayfinding","Privacy-first client-side persistent checklists"],details:"Engineered with Next.js 15 App Router, React 19, and TypeScript to demystify complex government bureaucracy and higher-education admissions. Features deterministic client-side conversational search and zero-tracking local checklists.",github:"https://github.com/chillingbing648-sketch/KaamKaagaz.git",live:"https://chillingbing648-sketch.github.io/KaamKaagaz/"},{name:"Attendify",description:"A highly organized web-based platform for structured attendance data tracking. Engineered with a clean UI to manage real-time attendance logistics seamlessly.",tech:["C++","Node.js","JSON","REST API","HTML/CSS/JS"],highlights:["Real-time attendance tracking","Subject-wise percentage projections",'"Safe to skip" calculations'],details:"Eliminated manual spreadsheet tracking across 5-8 subjects simultaneously. Uses C++ core logic wrapped in a Node.js API with real-time percentage alerts.",github:"https://github.com/chillingbing648-sketch/Attendify.git",live:"https://preview--vivid-web-transform.lovable.app/"},{name:"Continuity",description:"A secure digital legacy platform that brings wills, investments, assets, estates, and important documents into one trusted place — with controlled access for the people who matter most.",tech:["AI Integration","React","Data Analysis","Secure Data Management"],highlights:["Digital legacy management","Role-based access control","Family notification system"],details:"Organizes scattered financial assets, estates, and wills into a single secure vault with role-based access for designated family members.",github:"https://github.com/chillingbing648-sketch/Continuity.git",live:"https://chillingbing648-sketch.github.io/Continuity/"},{name:"WALL-E",description:"A supportive AI companion for mood check-ins, guided journaling, and reflective conversations — designed to encourage healthier daily habits with clear, user-first boundaries.",tech:["JavaScript","AI Integration","Local Storage","Responsive Design"],highlights:["Mood tracking & check-ins","Guided journaling prompts","Privacy-first emotional support"],details:"A privacy-first reflection tool that provides gentle daily check-ins, mood trend visualization, and guided journaling without making clinical claims.",github:"https://github.com/chillingbing648-sketch/WALL-E.git",live:"https://chillingbing648-sketch.github.io/WALL-E/"}],experience:[{role:"IT Specialist",org:"University of Mumbai",description:"Managing end-to-end technical operations, university admission digital logistics, and system administration for large-scale academic workflows. Responsible for maintaining data integrity across institutional systems.",responsibilities:["Technical Support","System Administration","Computer Systems","Admission Operations","Process Optimization","Troubleshooting"]},{role:"Public Relations Head",org:"Thakur Specialised Degree College",description:"Spearheaded student leadership initiatives, public policy coordination, event leadership, and student advocacy. Led PR strategy for an intercollegiate fest attracting 2,000+ attendees and 1,000+ registrations.",responsibilities:["Leadership","Student Representation","Public Administration","Event Leadership","Team Management","Public Speaking","Decision Making"]},{role:"Chief Minister",org:"Student Parliament Initiative — Career Katta, Government of Maharashtra & MITSC",description:"Served as Chief Minister of the Student Parliament initiative, leading student representatives, coordinating leadership activities, and driving initiatives focused on student development, civic engagement, and collaborative decision-making.",responsibilities:["Student Leadership","Civic Engagement","Team Coordination","Strategic Planning","Public Speaking","Student Development","Decision Making"]}],achievements:["IntraCollegiate Debate Winner — Won 1st place presenting well-researched arguments under pressure","PR Head — InterCollegiate Fest — Led efforts attracting 2,000+ attendees and 1,000+ registrations","Academic Excellence — CGPA 9.5 with active involvement in fests, NSS Unit, and student leadership"],education:["BSc Information Technology (Currently Pursuing) — Thakur Specialised Degree College · CGPA 9.5","12th Grade Computer Science (2024–2025) — Sardar Vallabhai Patel College","10th Grade (2022–2023) — St. Xavier's High School · Maharashtra Board"],services:["AI Integration — LLMs, Claude API, OpenAI APIs, prompt engineering, AI agents","Cinematic Web — Three.js, WebGL, GSAP, modern CSS, motion design","Full-Stack Engineering — System design to deployment, REST APIs, scalable solutions","Technical Leadership — Cross-functional team management, decision making","Performance Engineering — 60-120 FPS, Lighthouse 90+, GPU acceleration","Product Thinking — User needs, MVP definition, rapid iteration, shipping"]};let _=null;const L={greeting:["Hey! I'm Aether, Harsh's portfolio companion. Ask me about his projects, skills, experience, or anything else! 🚀","Welcome! I'm Aether — here to help you learn about Harsh Dubey's work. What would you like to know?","Hi there! I can tell you about Harsh's projects, skills, experience, and more. What interests you?"],projects:()=>(_="projects",`Here are Harsh's key projects:

${S.projects.map(e=>`• **${e.name}** — ${e.description}`).join(`
`)}

Ask about any specific project (e.g. "Tell me about Attendify" or "tell me more")!`),projectDetail:t=>{const e=S.projects.find(i=>i.name.toLowerCase().includes(t.toLowerCase()));return e?(_=`project_${e.name}`,`**${e.name}**
${e.description}

**Tech Stack:** ${e.tech.join(", ")}

**Highlights:**
${e.highlights.map(i=>`• ${i}`).join(`
`)}

[Live Demo](${e.live}) · [GitHub](${e.github})`):null},skills:()=>(_="skills",`Harsh has expertise across multiple domains:

${Object.entries(S.skills).map(([e,i])=>`**${e}:** ${i.join(", ")}`).join(`

`)}`),experience:()=>(_="experience",`Here's Harsh's professional experience:

${S.experience.map(e=>`**${e.role}** at ${e.org}
${e.description}
_Key areas: ${e.responsibilities.join(", ")}_`).join(`

`)}`),contact:()=>(_="contact",`You can reach Harsh through:

• **Email:** ${S.email}
• **Phone:** ${S.phone}
• **GitHub:** github.com/chillingbing648-sketch
• **LinkedIn:** linkedin.com/in/harsh-dubey-640a68389
• **Location:** ${S.location}

He's actively open for freelance projects, internships, and global opportunities!`),about:()=>(_="about",`${S.about}

He's a natural collaborator who leads when needed and supports when required — from managing 2,000+ attendee events to winning debate competitions.`),achievements:()=>(_="achievements",`Harsh's key achievements:

${S.achievements.map(e=>`• ${e}`).join(`
`)}

Every project carries a signature: curiosity, innovation, and the discipline to finish what he starts.`),education:()=>(_="education",`**Harsh's Educational Background:**

${S.education.map(e=>`• ${e}`).join(`
`)}`),services:()=>(_="services",`Harsh offers expertise in:

${S.services.map(e=>`• ${e}`).join(`
`)}`),followUp:()=>{if(!_)return"Harsh is an AI-Powered Developer & Creative Engineer based in Mumbai (CGPA 9.5). Ask me about his **projects**, **skills**, or **experience** for details!";if(_.startsWith("project_")){const t=_.replace("project_",""),e=S.projects.find(i=>i.name===t);if(e)return`**More about ${e.name}:**

${e.details}

**Built with:** ${e.tech.join(", ")}. You can view the live project at ${e.live}`}switch(_){case"projects":return"Harsh has shipped 4+ key projects including **KaamKaagaz** (Civic Tech & Admissions), **Attendify** (C++/Node logistics), **Continuity** (Legacy Vault), and **WALL-E** (Mental Health Companion). Which one would you like to explore further?";case"skills":return"Harsh's core strength is bridging creative web development (Three.js, WebGL, GSAP) with AI integration (Claude API, OpenAI APIs, Prompt Engineering) and solid full-stack engineering (Node.js, Express, Java).";case"experience":return"Harsh served as **IT Specialist** at University of Mumbai, **PR Head** for an intercollegiate fest with 2,000+ attendees, and **Chief Minister** of the Student Parliament initiative (Government of Maharashtra).";case"about":return"Harsh maintains a **9.5 CGPA** while leading major events and building full-stack products. Curiosity is his compass and calculated risk-taking drives his continuous growth.";case"contact":return`Direct email: **${S.email}** | Phone: **${S.phone}** | Location: **Mumbai, India**. Downloads for his full resume are also available on the portfolio!`;default:return"Feel free to ask specific questions about Harsh's **projects**, **skills**, **tech stack**, or **work experience**!"}},fallback:["I'm trained strictly on Harsh's real portfolio data. I can tell you about his **projects**, **skills**, **experience**, **achievements**, or **contact** info. What would you like to know?","I don't have information on that outside of Harsh's portfolio. Try asking about his **projects**, **skills**, **experience**, or how to **contact** him!","I focus exclusively on Harsh Dubey's portfolio! Ask me about his **work**, **tech stack**, **background**, or **achievements**."]};function Xt(t){const e=t.toLowerCase().trim();if(/^(tell me more|more|more details|elaborate|explain more|detail|details|go on|continue)\b/.test(e))return{type:"followUp"};if(/^(hi|hello|hey|howdy|greetings|sup|yo|what'?s up)\b/.test(e))return{type:"greeting"};for(const i of S.projects)if(e.includes(i.name.toLowerCase()))return{type:"projectDetail",name:i.name};return/project|work|portfolio|built|shipped|made|created|developed/.test(e)?{type:"projects"}:/skill|tech|stack|language|framework|tool|know|proficien|expertise|capable|technolog/.test(e)?{type:"skills"}:/experience|job|position|role|career|work.*at|employ|intern|profession|where.*work/.test(e)?{type:"experience"}:/contact|email|phone|reach|connect|hire|linkedin|github|social|get in touch|message/.test(e)?{type:"contact"}:/about|who|tell me|introduce|background|story|himself|person|bio|descrip/.test(e)?{type:"about"}:/educat|college|university|degree|study|student|cgpa|gpa|school|academic/.test(e)?{type:"education"}:/achieve|award|prize|accomplish|recognition|hackathon|win|won|milestone|certif/.test(e)?{type:"achievements"}:/service|offer|do.*for|what.*do|capabilit|specializ|what can|help with/.test(e)?{type:"services"}:{type:"fallback"}}function Yt(t){const e=Xt(t);switch(e.type){case"greeting":return ue(L.greeting);case"projects":return L.projects();case"projectDetail":return L.projectDetail(e.name)||L.projects();case"skills":return L.skills();case"experience":return L.experience();case"contact":return L.contact();case"about":return L.about();case"education":return L.education();case"achievements":return L.achievements();case"services":return L.services();case"followUp":return L.followUp();default:return ue(L.fallback)}}function ue(t){return t[Math.floor(Math.random()*t.length)]}function He(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}function Kt(t){return He(t).replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>').replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/_(.+?)_/g,"<em>$1</em>").replace(/\n/g,"<br>")}let Ie=!1;function Jt(){if(Ie)return;const t=document.getElementById("ai-assistant-btn"),e=document.getElementById("ai-assistant-panel");if(!t||!e)return;Ie=!0;const i=e.querySelector(".assistant-close-btn"),n=e.querySelector(".assistant-clear-btn"),o=e.querySelector(".assistant-messages"),a=e.querySelector("#assistant-input"),s=e.querySelector("#assistant-send"),r=e.querySelector(".assistant-chips"),c=e.querySelector(".assistant-status");let d=!1,l=!1;const p=[];function b(){d||(d=!0,e.classList.add("open"),t.classList.add("open"),t.setAttribute("aria-expanded","true"),e.setAttribute("aria-hidden","false"),p.length===0&&M(ue(L.greeting)),setTimeout(()=>{a==null||a.focus()},200))}function h(){d&&(d=!1,e.classList.remove("open"),t.classList.remove("open"),t.setAttribute("aria-expanded","false"),e.setAttribute("aria-hidden","true"),t.focus())}function m(){d?h():b()}function E(){l||(p.length=0,_=null,o&&(o.innerHTML=""),r&&r.classList.remove("faded"),M(ue(L.greeting)))}function x(v){const A=document.createElement("div");A.className="msg user";const T=document.createElement("div");T.className="msg-bubble",T.textContent=v,A.appendChild(T),o.appendChild(A),p.push({role:"user",content:v}),u()}function M(v){const A=document.createElement("div");A.className="msg ai",A.setAttribute("role","status");const T=document.createElement("div");T.className="msg-bubble",T.innerHTML=Kt(v),A.appendChild(T),o.appendChild(A),p.push({role:"assistant",content:v}),u()}function O(){const v=document.createElement("div");return v.className="msg ai typing-msg",v.id="aether-typing",v.innerHTML=`
            <div class="msg-bubble">
                <div class="typing-indicator">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>`,o.appendChild(v),u(),v}function R(){const v=document.getElementById("aether-typing");v&&v.remove()}function u(v=!0){requestAnimationFrame(()=>{if(!o)return;const A=o.scrollHeight-o.scrollTop-o.clientHeight<140;(v||A)&&(o.scrollTop=o.scrollHeight)})}function f(v,A=!1){c&&(c.innerHTML=`<span class="status-dot" aria-hidden="true"></span>${He(v)}`)}function k(v){if(l)return;const A=(v||"").slice(0,300).trim();if(!A)return;l=!0,s&&(s.disabled=!0),a&&(a.value="",a.disabled=!0),r&&!r.classList.contains("faded")&&r.classList.add("faded"),x(A),f("Aether is thinking...",!0),w="thinking",O();const T=450+Math.random()*550;setTimeout(()=>{R();try{const j=Yt(A);M(j)}catch(j){M("I encountered an issue processing that. Try asking about projects, skills, or experience!"),console.warn("[Aether] Response error:",j)}finally{l=!1,w="idle",s&&(s.disabled=!1),a&&(a.disabled=!1,d&&a.focus()),f("Portfolio Companion",!1)}},T)}function g(){a&&k(a.value)}t.addEventListener("click",m),i&&i.addEventListener("click",h),n&&n.addEventListener("click",E),s&&s.addEventListener("click",g),a&&(a.addEventListener("keydown",v=>{v.key==="Enter"&&!v.shiftKey&&(v.preventDefault(),g())}),a.addEventListener("focus",()=>{(!w||w==="idle")&&(w="typing"),setTimeout(()=>{u(!0)},300)}),a.addEventListener("blur",()=>{w==="typing"&&(w="idle")}),a.addEventListener("input",()=>{w!=="thinking"&&(w="typing")})),r&&r.addEventListener("click",v=>{const A=v.target.closest(".assist-chip");if(!A)return;const T=A.dataset.prompt||A.textContent;k(T)}),document.addEventListener("keydown",v=>{v.key==="Escape"&&d&&h()});let w="idle";function B(){const v="ontouchstart"in window||navigator.maxTouchPoints>0,A=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(v||A)return;const T=Array.from(document.querySelectorAll(".aether-pupil")),j=Array.from(document.querySelectorAll(".aether-eye"));if(!T.length)return;let W=window.innerWidth/2,V=window.innerHeight/2,$=W,X=V,ne=!0,pe=0,fe=0;window.addEventListener("mousemove",P=>{w==="idle"&&($=P.clientX,X=P.clientY)},{passive:!0});function ge(){const P=2500+Math.random()*3e3;setTimeout(()=>{ne&&(j.forEach(Y=>Y.classList.add("is-blinking")),setTimeout(()=>{j.forEach(Y=>Y.classList.remove("is-blinking"))},180)),ge()},P)}ge(),setInterval(()=>{pe=(Math.random()-.5)*.7,fe=(Math.random()-.5)*.7},1800),document.addEventListener("visibilitychange",()=>{ne=!document.hidden,ne&&de()});function de(){if(ne){if(w==="thinking")$=window.innerWidth/2+30,X=window.innerHeight/2-140;else if(w==="typing"&&a){const P=a.getBoundingClientRect();$=P.left+P.width/2,X=P.top+P.height/2}W+=($-W)*.12,V+=(X-V)*.12,T.forEach(P=>{const Y=P.parentElement;if(!Y)return;const K=Y.getBoundingClientRect();if(K.width===0||K.height===0)return;const qe=K.left+K.width/2,Oe=K.top+K.height/2,ye=W-qe,ve=V-Oe,be=Math.atan2(ve,ye),Ve=Math.hypot(ye,ve),we=Math.min(Ve*.045,3.2),Ge=Math.cos(be)*we+pe,ze=Math.sin(be)*we+fe;P.style.transform=`translate3d(${Ge.toFixed(2)}px, ${ze.toFixed(2)}px, 0)`}),requestAnimationFrame(de)}}de()}B()}function Qt(){const t=document.getElementById("pitch-modal");if(!t)return;const e=[...t.querySelectorAll("[data-pitch-step]")],i=[...t.querySelectorAll("[data-progress-step]")],n=[...t.querySelectorAll("[data-project-type]")],o=t.querySelector(".pitch-custom-type"),a=t.querySelector("#pitch-custom-input"),s=t.querySelector("#pitch-summary");let r=1,c="Web App";const d=m=>{r=m,e.forEach(E=>{const x=Number(E.dataset.pitchStep)===m;E.classList.toggle("active",x),E.disabled=!x}),i.forEach(E=>E.classList.toggle("active",Number(E.dataset.progressStep)<=m))},l=()=>{t.classList.remove("open"),t.setAttribute("aria-hidden","true"),document.body.classList.remove("pitch-modal-open")},p=()=>{var m;t.classList.add("open"),t.setAttribute("aria-hidden","false"),document.body.classList.add("pitch-modal-open"),d(1),(m=t.querySelector(".pitch-choice.selected"))==null||m.focus()},b=m=>{navigator.clipboard&&navigator.clipboard.writeText(m)},h=(m,E,x,M)=>{const R=`Hey! I have a project idea for a ${E==="Other"?x:E}.

Summary: ${M}

Let's chat!`,u=encodeURIComponent(R);switch(m){case"whatsapp":window.open(`https://wa.me/919321521258?text=${u}`,"_blank");break;case"instagram":b(R),alert("Message copied to clipboard! Paste it directly in my IG DMs."),window.open("https://www.instagram.com/harrshittt87/","_blank");break;case"discord":b(R),alert("Project pitch copied to clipboard! Add me on Discord: harshit00597");break}};document.querySelectorAll(".pitch-idea-trigger").forEach(m=>m.addEventListener("click",p)),t.querySelectorAll("[data-pitch-close]").forEach(m=>m.addEventListener("click",l)),n.forEach(m=>m.addEventListener("click",()=>{n.forEach(x=>x.classList.remove("selected")),m.classList.add("selected"),c=m.dataset.projectType;const E=c==="Other";o.classList.toggle("visible",E),o.setAttribute("aria-hidden",String(!E)),a.disabled=!E,E&&a.focus()})),t.querySelectorAll("[data-next-step]").forEach(m=>m.addEventListener("click",()=>{if(r===1&&c==="Other"&&!a.value.trim())return a.focus();if(r===2&&!s.value.trim())return s.focus();d(Number(m.dataset.nextStep))})),t.querySelectorAll("[data-prev-step]").forEach(m=>m.addEventListener("click",()=>d(Number(m.dataset.prevStep)))),t.querySelectorAll("[data-platform]").forEach(m=>m.addEventListener("click",()=>h(m.dataset.platform,c,a.value.trim(),s.value.trim()))),document.addEventListener("keydown",m=>{m.key==="Escape"&&t.classList.contains("open")&&l()})}let Pe=!1;const Zt=location.hostname==="localhost"||location.hostname==="127.0.0.1";function q(t,e="log"){Zt&&console[e](`[AETHER] ${t}`)}async function Re(){if(!Pe){Pe=!0,"scrollRestoration"in history&&(history.scrollRestoration="manual");try{De()}catch(t){q("Theme init skipped: "+t.message,"warn")}q("Bootstrap started"),await ei(),document.addEventListener("loader:complete",()=>{q("loader:complete received — initializing modules"),ti()}),Ze()}}async function ei(){const t=document.querySelectorAll("[data-component]");return t.length?await Promise.allSettled(Array.from(t).map(async i=>{const n=i.dataset.component;try{const o=await fetch(n);if(!o.ok)throw new Error(`HTTP ${o.status}: ${n}`);i.innerHTML=await o.text(),q(`Component loaded: ${n}`)}catch{q(`Component failed (non-critical): ${n}`,"warn")}})):void 0}function ti(){[["cursor",tt],["navigation",nt],["scroll",it],["particles",()=>ht(()=>0)],["hero",pt],["skills",bt],["projects",At],["timeline",Ct],["library",zt],["animations",Rt],["neural-canvas",Nt],["observatory-canvas",Ut],["terminal",Ot],["search",Ht],["ai-companion",Jt],["pitch-modal",Qt],["hover-targets",ie],["music-toggle",ii]].forEach(([e,i])=>{try{typeof i=="function"&&(i(),q(`Module: ${e} ✓`))}catch(n){q(`Module: ${e} ✗ — ${n.message}`,"warn")}})}const y={audioUrl:new URL("/assets/Interstellar-BBhZ7-ap.mp3",import.meta.url).href,audioContext:null,gainNode:null,audioBuffer:null,loadingPromise:null,sourceNode:null,playing:!1,operation:0};function ii(){const t=document.getElementById("musicToggle");if(!t){console.error("[AETHER] Button #musicToggle missing from DOM.");return}t.dataset.musicInitialized!=="true"&&(t.dataset.musicInitialized="true",q("Music toggle initialized"),t.addEventListener("click",async()=>{const e=++y.operation,i=t.querySelector(".music-icon"),n=document.getElementById("music-label");if(y.playing||y.sourceNode){y.playing=!1,y.sourceNode&&(y.sourceNode.stop(),y.sourceNode.disconnect(),y.sourceNode=null),i&&(i.textContent="🔇"),n&&(n.textContent="Ambient Sound"),t.setAttribute("aria-pressed","false"),console.log("[AETHER] Interstellar Audio: PAUSED");return}try{if(y.audioContext||(y.audioContext=new AudioContext,y.gainNode=y.audioContext.createGain(),y.gainNode.gain.value=.6,y.gainNode.connect(y.audioContext.destination)),await y.audioContext.resume(),y.audioBuffer||(n&&(n.textContent="Loading audio..."),y.loadingPromise||(y.loadingPromise=fetch(y.audioUrl).then(o=>{if(!o.ok)throw new Error(`Audio request failed: ${o.status}`);return o.arrayBuffer()}).then(o=>y.audioContext.decodeAudioData(o))),y.audioBuffer=await y.loadingPromise),e!==y.operation)return;y.sourceNode=y.audioContext.createBufferSource(),y.sourceNode.buffer=y.audioBuffer,y.sourceNode.loop=!0,y.sourceNode.connect(y.gainNode),y.sourceNode.start(),y.playing=!0,i&&(i.textContent="🔊"),n&&(n.textContent="Ambient On"),t.setAttribute("aria-pressed","true"),console.log("[AETHER] Interstellar Audio: PLAYING")}catch(o){console.error("[AETHER] Audio play blocked or failed:",o),y.loadingPromise=null,y.playing=!1,y.sourceNode=null,i&&(i.textContent="🔇"),n&&(n.textContent="Ambient Sound"),t.setAttribute("aria-pressed","false")}}))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Re):Re();
