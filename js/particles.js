/**
 * particles.js — Continuum Fibre-Optic Thread / Particle Engine
 *
 * Standalone replacement for the original Three.js neural-network canvas.
 *
 * Contract preserved:
 *   • Uses the existing <canvas id="webgl-bg">
 *   • ESM exports: initParticles, getScrollSpeed, setScrollSpeed
 *   • initParticles(scrollSpeedGetter?) remains compatible with the old call-site
 *   • No external dependencies
 *   • Raw WebGL 2 + GLSL
 *   • Scroll, mouse, resize and visibility integration
 *
 * Visual language:
 *   • Fibre-optic tunnel / radial threads
 *   • WebThreads-style fan/pinch geometry
 *   • Luminous travelling pulses
 *   • Subtle particle field
 *   • Procedural wave / sway / shimmer
 *   • Premium purple / violet colour system
 */

let _scrollSpeed = 0;
let _engine = null;

export function getScrollSpeed() {
  return Number.isFinite(_scrollSpeed) ? _scrollSpeed : 0;
}

export function setScrollSpeed(value) {
  _scrollSpeed = Number.isFinite(Number(value)) ? Number(value) : 0;
}

const DEFAULT_CONFIG = Object.freeze({
  cableColor: '#A855F7',
  pulseColor: '#A855F7',
  tunnelColor: '#5227FF',

  speed: 0.12,
  flowDirection: 'outward',

  threadCount: 8,
  frequency: 5.0,
  spread: 0.20,
  taper: 1.0,
  fanMode: 'center',
  position: 0.5,
  mirror: true,

  pulseSpeed: 2.0,
  pulseLength: 0.28,
  pulseBlend: 1.0,
  pulseWidth: 1.0,

  thickness: 0.35,
  rimWidth: 0.15,
  waviness: 0.30,
  sway: 0.50,
  size: 1.0,

  glow: 1.0,
  falloff: 0.6,
  fadeNear: 0.5,
  fadeFar: 2.0,

  brightness: 0.85,
  opacity: 1.0,

  colorVariance: true,
  shimmer: true,

  grain: true,
  grainIntensity: 0.05,

  mouseInteraction: true,
  mouseStrength: 0.12,

  quality: 'auto',
});

const FAN_MODE = Object.freeze({
  center: 0,
  left: 1,
  right: 2,
});

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function damp(a, b, lambda, dt) {
  return lerp(a, b, 1 - Math.exp(-lambda * dt));
}

function hexToRgb(hex) {
  if (typeof hex !== 'string') return [1, 1, 1];

  const raw = hex.trim().replace(/^#/, '');
  const expanded =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    return [1, 1, 1];
  }

  const value = parseInt(expanded, 16);

  return [
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ];
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Mobile/i.test(
    navigator.userAgent || ''
  );
}

function resolveQuality(requested) {
  let quality = requested;

  if (quality === 'auto') {
    const cores = navigator.hardwareConcurrency || 4;
    const mobile = isMobileDevice();

    if (mobile || cores <= 4) {
      quality = 'medium';
    } else if (cores >= 10) {
      quality = 'ultra';
    } else {
      quality = 'high';
    }
  }

  const presets = {
    low: {
      iterations: 7,
      particleLayers: 0.45,
      pulseCount: 0.55,
      dpr: 1.0,
      grain: false,
    },

    medium: {
      iterations: 8,
      particleLayers: 0.65,
      pulseCount: 0.72,
      dpr: 1.25,
      grain: true,
    },

    high: {
      iterations: 10,
      particleLayers: 0.9,
      pulseCount: 1.0,
      dpr: 1.5,
      grain: true,
    },

    ultra: {
      iterations: 12,
      particleLayers: 1.15,
      pulseCount: 1.35,
      dpr: 1.75,
      grain: true,
    },
  };

  return {
    name: quality,
    ...(presets[quality] || presets.high),
  };
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error('Unable to create WebGL shader.');
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log =
      gl.getShaderInfoLog(shader) ||
      'Unknown shader compilation error.';

    gl.deleteShader(shader);
    throw new Error(log);
  }

  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertex = createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexSource
  );

  const fragment = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentSource
  );

  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    throw new Error('Unable to create WebGL program.');
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log =
      gl.getProgramInfoLog(program) ||
      'Unknown program link error.';

    gl.deleteProgram(program);
    throw new Error(log);
  }

  return program;
}

const VERTEX_SHADER = `#version 300 es

in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es

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
`;

const COPY_TO_SCREEN_VERT = `#version 300 es

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
`;

const COPY_TO_SCREEN_FRAG = `#version 300 es

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
`;

class TunnelEngine {

  constructor(
    canvas,
    config,
    scrollSpeedGetter
  ) {

    this.canvas =
      canvas;

    this.config = {
      ...DEFAULT_CONFIG,
      ...(config || {}),
    };

    this.getScrollSpeed =
      typeof scrollSpeedGetter === 'function'
        ? scrollSpeedGetter
        : () => _scrollSpeed;

    this.gl = null;

    this.program = null;
    this.compositeProgram = null;

    this.vao = null;
    this.quadVao = null;
    this.quadBuffer = null;

    this.framebuffer = null;
    this.frameTexture = null;
    this.depthRenderbuffer = null;

    this.running = false;
    this.raf = 0;
    this.time = 0;
    this.lastTime = 0;

    this.mouse = {
      x: 0.5,
      y: 0.5,
    };

    this.targetMouse = {
      x: 0.5,
      y: 0.5,
    };

    this.previousMouse = {
      x: 0.5,
      y: 0.5,
    };

    this.mouseVelocity = 0;
    this.mouseActive = 0;
    this.targetMouseActive = 0;

    this.impulse = 0;
    this.impulseVelocity = 0;

    this.superPulse = 0;
    this.superPulseVelocity = 0;

    this.superPulseTimer = 0;

    this.nextSuperPulse =
      this.randomSuperPulseDelay();

    this.pageVisible =
      !document.hidden;

    this.reducedMotion = false;
    this.mediaQuery = null;

    this.quality =
      resolveQuality(
        this.config.quality
      );

    this._boundMouseMove =
      (event) =>
        this.onMouseMove(event);

    this._boundMouseEnter =
      () => {
        this.targetMouseActive = 1;
      };

    this._boundMouseLeave =
      () => {
        this.targetMouseActive = 0;
      };

    this._boundTouchMove =
      (event) =>
        this.onTouchMove(event);

    this._boundPointerDown =
      () =>
        this.triggerPulse();

    this._boundVisibility =
      () =>
        this.onVisibilityChange();

    this._boundResize =
      () =>
        this.resize();

    this._boundMotionChange =
      (event) => {
        this.reducedMotion =
          !!event.matches;
      };

    this.initialize();
  }

  randomSuperPulseDelay() {
    return (
      15 +
      Math.random() * 26
    );
  }

  initialize() {

    const gl =
      this.canvas.getContext(
        'webgl2',
        {
          alpha: true,
          antialias: false,
          depth: false,
          stencil: false,
          premultipliedAlpha: true,
          powerPreference:
            'high-performance',
        }
      );

    if (!gl) {

      console.warn(
        '[particles.js] WebGL 2 is unavailable; background disabled gracefully.'
      );

      return;
    }

    this.gl = gl;

    this.mediaQuery =
      window.matchMedia?.(
        '(prefers-reduced-motion: reduce)'
      ) || null;

    this.reducedMotion =
      !!this.mediaQuery?.matches;

    this.createPrograms();
    this.createQuad();
    this.bindEvents();
    this.resize();
    this.updateStaticUniforms();
  }

  createPrograms() {

    const gl = this.gl;

    this.program =
      createProgram(
        gl,
        VERTEX_SHADER,
        FRAGMENT_SHADER
      );

    this.compositeProgram =
      createProgram(
        gl,
        COPY_TO_SCREEN_VERT,
        COPY_TO_SCREEN_FRAG
      );

    this.u = {

      resolution:
        gl.getUniformLocation(
          this.program,
          'u_resolution'
        ),

      time:
        gl.getUniformLocation(
          this.program,
          'u_time'
        ),

      speed:
        gl.getUniformLocation(
          this.program,
          'u_speed'
        ),

      flowDirection:
        gl.getUniformLocation(
          this.program,
          'u_flowDirection'
        ),

      threadCount:
        gl.getUniformLocation(
          this.program,
          'u_threadCount'
        ),

      frequency:
        gl.getUniformLocation(
          this.program,
          'u_frequency'
        ),

      spread:
        gl.getUniformLocation(
          this.program,
          'u_spread'
        ),

      taper:
        gl.getUniformLocation(
          this.program,
          'u_taper'
        ),

      fanMode:
        gl.getUniformLocation(
          this.program,
          'u_fanMode'
        ),

      position:
        gl.getUniformLocation(
          this.program,
          'u_position'
        ),

      mirror:
        gl.getUniformLocation(
          this.program,
          'u_mirror'
        ),

      pulseSpeed:
        gl.getUniformLocation(
          this.program,
          'u_pulseSpeed'
        ),

      pulseLength:
        gl.getUniformLocation(
          this.program,
          'u_pulseLength'
        ),

      pulseBlend:
        gl.getUniformLocation(
          this.program,
          'u_pulseBlend'
        ),

      pulseWidth:
        gl.getUniformLocation(
          this.program,
          'u_pulseWidth'
        ),

      thickness:
        gl.getUniformLocation(
          this.program,
          'u_thickness'
        ),

      rimWidth:
        gl.getUniformLocation(
          this.program,
          'u_rimWidth'
        ),

      waviness:
        gl.getUniformLocation(
          this.program,
          'u_waviness'
        ),

      sway:
        gl.getUniformLocation(
          this.program,
          'u_sway'
        ),

      size:
        gl.getUniformLocation(
          this.program,
          'u_size'
        ),

      glow:
        gl.getUniformLocation(
          this.program,
          'u_glow'
        ),

      falloff:
        gl.getUniformLocation(
          this.program,
          'u_falloff'
        ),

      fadeNear:
        gl.getUniformLocation(
          this.program,
          'u_fadeNear'
        ),

      fadeFar:
        gl.getUniformLocation(
          this.program,
          'u_fadeFar'
        ),

      brightness:
        gl.getUniformLocation(
          this.program,
          'u_brightness'
        ),

      opacity:
        gl.getUniformLocation(
          this.program,
          'u_opacity'
        ),

      colorVariance:
        gl.getUniformLocation(
          this.program,
          'u_colorVariance'
        ),

      shimmer:
        gl.getUniformLocation(
          this.program,
          'u_shimmer'
        ),

      grain:
        gl.getUniformLocation(
          this.program,
          'u_grain'
        ),

      grainIntensity:
        gl.getUniformLocation(
          this.program,
          'u_grainIntensity'
        ),

      mouseStrength:
        gl.getUniformLocation(
          this.program,
          'u_mouseStrength'
        ),

      mouseActive:
        gl.getUniformLocation(
          this.program,
          'u_mouseActive'
        ),

      mouse:
        gl.getUniformLocation(
          this.program,
          'u_mouse'
        ),

      mouseVelocity:
        gl.getUniformLocation(
          this.program,
          'u_mouseVelocity'
        ),

      impulse:
        gl.getUniformLocation(
          this.program,
          'u_impulse'
        ),

      superPulse:
        gl.getUniformLocation(
          this.program,
          'u_superPulse'
        ),

      scrollSpeed:
        gl.getUniformLocation(
          this.program,
          'u_scrollSpeed'
        ),

      color1:
        gl.getUniformLocation(
          this.program,
          'u_color1'
        ),

      color2:
        gl.getUniformLocation(
          this.program,
          'u_color2'
        ),

      color3:
        gl.getUniformLocation(
          this.program,
          'u_color3'
        ),

      pulseColor:
        gl.getUniformLocation(
          this.program,
          'u_pulseColor'
        ),

      tunnelColor:
        gl.getUniformLocation(
          this.program,
          'u_tunnelColor'
        ),
    };

    this.cu = {

      scene:
        gl.getUniformLocation(
          this.compositeProgram,
          'u_scene'
        ),

      grain:
        gl.getUniformLocation(
          this.compositeProgram,
          'u_grain'
        ),

      grainIntensity:
        gl.getUniformLocation(
          this.compositeProgram,
          'u_grainIntensity'
        ),

      time:
        gl.getUniformLocation(
          this.compositeProgram,
          'u_time'
        ),
    };
  }

  createQuad() {

    const gl =
      this.gl;

    this.vao =
      gl.createVertexArray();

    gl.bindVertexArray(
      this.vao
    );

    const buffer =
      gl.createBuffer();

    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      buffer
    );

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const position =
      gl.getAttribLocation(
        this.program,
        'a_position'
      );

    gl.enableVertexAttribArray(
      position
    );

    gl.vertexAttribPointer(
      position,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.bindVertexArray(
      null
    );

    this.quadBuffer =
      buffer;

    this.quadVao =
      gl.createVertexArray();

    gl.bindVertexArray(
      this.quadVao
    );

    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      this.quadBuffer
    );

    const compositePosition =
      gl.getAttribLocation(
        this.compositeProgram,
        'a_position'
      );

    gl.enableVertexAttribArray(
      compositePosition
    );

    gl.vertexAttribPointer(
      compositePosition,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    gl.bindVertexArray(
      null
    );
  }

  createFramebuffer() {

    const gl =
      this.gl;

    const width =
      Math.max(
        1,
        this.canvas.width
      );

    const height =
      Math.max(
        1,
        this.canvas.height
      );

    if (this.framebuffer) {
      gl.deleteFramebuffer(
        this.framebuffer
      );
    }

    if (this.frameTexture) {
      gl.deleteTexture(
        this.frameTexture
      );
    }

    if (this.depthRenderbuffer) {
      gl.deleteRenderbuffer(
        this.depthRenderbuffer
      );
    }

    this.framebuffer =
      gl.createFramebuffer();

    this.frameTexture =
      gl.createTexture();

    gl.bindTexture(
      gl.TEXTURE_2D,
      this.frameTexture
    );

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      gl.LINEAR
    );

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MAG_FILTER,
      gl.LINEAR
    );

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_S,
      gl.CLAMP_TO_EDGE
    );

    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_WRAP_T,
      gl.CLAMP_TO_EDGE
    );

    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA8,
      width,
      height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );

    gl.bindFramebuffer(
      gl.FRAMEBUFFER,
      this.framebuffer
    );

    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      this.frameTexture,
      0
    );

    gl.drawBuffers([
      gl.COLOR_ATTACHMENT0,
    ]);

    if (
      gl.checkFramebufferStatus(
        gl.FRAMEBUFFER
      ) !== gl.FRAMEBUFFER_COMPLETE
    ) {

      console.warn(
        '[particles.js] Offscreen framebuffer unavailable; using direct rendering.'
      );

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        null
      );

      gl.deleteFramebuffer(
        this.framebuffer
      );

      gl.deleteTexture(
        this.frameTexture
      );

      this.framebuffer = null;
      this.frameTexture = null;

    } else {

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        null
      );
    }

    gl.bindTexture(
      gl.TEXTURE_2D,
      null
    );
  }

  getDpr() {

    const base =
      Math.min(
        window.devicePixelRatio || 1,
        this.quality.dpr || 1.5
      );

    return this.reducedMotion
      ? Math.min(base, 1.25)
      : base;
  }

  resize() {

    if (!this.gl || !this.canvas) {
      return;
    }

    const dpr =
      this.getDpr();

    const width =
      Math.max(
        1,
        Math.round(
          window.innerWidth *
          dpr
        )
      );

    const height =
      Math.max(
        1,
        Math.round(
          window.innerHeight *
          dpr
        )
      );

    if (
      this.canvas.width !== width ||
      this.canvas.height !== height
    ) {

      this.canvas.width =
        width;

      this.canvas.height =
        height;

      this.createFramebuffer();
    }

    this.gl.viewport(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  bindEvents() {

    window.addEventListener(
      'mousemove',
      this._boundMouseMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      'touchmove',
      this._boundTouchMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      'resize',
      this._boundResize,
      {
        passive: true,
      }
    );

    this.canvas.addEventListener(
      'mouseenter',
      this._boundMouseEnter,
      {
        passive: true,
      }
    );

    this.canvas.addEventListener(
      'mouseleave',
      this._boundMouseLeave,
      {
        passive: true,
      }
    );

    this.canvas.addEventListener(
      'pointerdown',
      this._boundPointerDown,
      {
        passive: true,
      }
    );

    document.addEventListener(
      'visibilitychange',
      this._boundVisibility
    );

    this.mediaQuery?.addEventListener?.(
      'change',
      this._boundMotionChange
    );
  }

  onMouseMove(event) {

    this.targetMouse.x =
      clamp(
        event.clientX /
          Math.max(
            1,
            window.innerWidth
          ),
        0,
        1
      );

    this.targetMouse.y =
      clamp(
        1 -
          event.clientY /
            Math.max(
              1,
              window.innerHeight
            ),
        0,
        1
      );

    this.targetMouseActive = 1;
  }

  onTouchMove(event) {

    const touch =
      event.touches?.[0];

    if (!touch) {
      return;
    }

    this.targetMouse.x =
      clamp(
        touch.clientX /
          Math.max(
            1,
            window.innerWidth
          ),
        0,
        1
      );

    this.targetMouse.y =
      clamp(
        1 -
          touch.clientY /
            Math.max(
              1,
              window.innerHeight
            ),
        0,
        1
      );

    this.targetMouseActive = 1;
  }

  onVisibilityChange() {

    this.pageVisible =
      !document.hidden;

    if (this.pageVisible) {
      this.resume();
    } else {
      this.pause();
    }
  }

  updateStaticUniforms() {

    if (
      !this.gl ||
      !this.program
    ) {
      return;
    }

    this.applyConfigUniforms();
  }

  applyConfigUniforms() {

    const gl =
      this.gl;

    const c =
      this.config;

    const u =
      this.u;

    if (!gl || !u) {
      return;
    }

    const q =
      this.quality;

    gl.useProgram(
      this.program
    );

    gl.uniform1f(
      u.speed,
      Number(c.speed) || 0
    );

    gl.uniform1f(
      u.flowDirection,
      c.flowDirection === 'inward'
        ? -1
        : 1
    );

    gl.uniform1f(
      u.threadCount,
      clamp(
        Math.round(
          Number(
            c.threadCount
          ) || 1
        ),
        1,
        18
      )
    );

    gl.uniform1f(
      u.frequency,
      Math.max(
        0.1,
        Number(c.frequency) ||
          0.1
      )
    );

    gl.uniform1f(
      u.spread,
      Math.max(
        0,
        Number(c.spread) || 0
      )
    );

    gl.uniform1f(
      u.taper,
      Number(c.taper) || 0
    );

    gl.uniform1f(
      u.fanMode,
      FAN_MODE[
        c.fanMode
      ] ?? 0
    );

    gl.uniform1f(
      u.position,
      clamp(
        Number(c.position) ||
          0.5,
        0,
        1
      )
    );

    gl.uniform1f(
      u.mirror,
      c.mirror ? 1 : 0
    );

    gl.uniform1f(
      u.pulseSpeed,
      Math.max(
        0,
        Number(
          c.pulseSpeed
        ) || 0
      )
    );

    gl.uniform1f(
      u.pulseLength,
      clamp(
        Number(
          c.pulseLength
        ) || 0.28,
        0.01,
        1
      )
    );

    gl.uniform1f(
      u.pulseBlend,
      clamp(
        Number(
          c.pulseBlend
        ) || 0,
        0,
        1
      )
    );

    gl.uniform1f(
      u.pulseWidth,
      clamp(
        Number(
          c.pulseWidth
        ) || 1,
        0.1,
        2
      )
    );

    gl.uniform1f(
      u.thickness,
      Math.max(
        0.001,
        Number(
          c.thickness
        ) || 0.35
      )
    );

    gl.uniform1f(
      u.rimWidth,
      Math.max(
        0.001,
        Number(
          c.rimWidth
        ) || 0.15
      )
    );

    gl.uniform1f(
      u.waviness,
      Math.max(
        0,
        Number(
          c.waviness
        ) || 0
      )
    );

    gl.uniform1f(
      u.sway,
      Math.max(
        0,
        Number(
          c.sway
        ) || 0
      )
    );

    gl.uniform1f(
      u.size,
      Math.max(
        0.2,
        Number(c.size) || 1
      )
    );

    gl.uniform1f(
      u.glow,
      Math.max(
        0,
        Number(c.glow) || 0
      )
    );

    gl.uniform1f(
      u.falloff,
      Math.max(
        0.05,
        Number(
          c.falloff
        ) || 0.6
      )
    );

    gl.uniform1f(
      u.fadeNear,
      Math.max(
        0.01,
        Number(
          c.fadeNear
        ) || 0.5
      )
    );

    gl.uniform1f(
      u.fadeFar,
      Math.max(
        0.25,
        Number(
          c.fadeFar
        ) || 2
      )
    );

    gl.uniform1f(
      u.brightness,
      Math.max(
        0,
        Number(
          c.brightness
        ) || 0
      )
    );

    gl.uniform1f(
      u.opacity,
      clamp(
        Number(c.opacity) ||
          1,
        0,
        1
      )
    );

    gl.uniform1f(
      u.colorVariance,
      c.colorVariance
        ? 1
        : 0
    );

    gl.uniform1f(
      u.shimmer,
      c.shimmer
        ? 1
        : 0
    );

    gl.uniform1f(
      u.grain,
      c.grain &&
      q.grain
        ? 1
        : 0
    );

    gl.uniform1f(
      u.grainIntensity,
      Math.max(
        0,
        Number(
          c.grainIntensity
        ) || 0
      )
    );

    gl.uniform1f(
      u.mouseStrength,
      c.mouseInteraction
        ? Math.max(
            0,
            Number(
              c.mouseStrength
            ) || 0
          )
        : 0
    );

    const c1 =
      hexToRgb(
        c.tunnelColor
      );

    const c2 =
      hexToRgb(
        c.cableColor
      );

    const c3 =
      [1, 1, 1];

    const pulse =
      hexToRgb(
        c.pulseColor
      );

    const tunnel =
      hexToRgb(
        c.tunnelColor
      );

    gl.uniform3f(
      u.color1,
      c1[0],
      c1[1],
      c1[2]
    );

    gl.uniform3f(
      u.color2,
      c2[0],
      c2[1],
      c2[2]
    );

    gl.uniform3f(
      u.color3,
      c3[0],
      c3[1],
      c3[2]
    );

    gl.uniform3f(
      u.pulseColor,
      pulse[0],
      pulse[1],
      pulse[2]
    );

    gl.uniform3f(
      u.tunnelColor,
      tunnel[0],
      tunnel[1],
      tunnel[2]
    );
  }

  updateDynamics(dt) {

    const c =
      this.config;

    const reduced =
      this.reducedMotion;

    const mouseEase =
      reduced
        ? 1.5
        : 7.0;

    this.mouse.x =
      damp(
        this.mouse.x,
        this.targetMouse.x,
        mouseEase,
        dt
      );

    this.mouse.y =
      damp(
        this.mouse.y,
        this.targetMouse.y,
        mouseEase,
        dt
      );

    this.mouseActive =
      damp(
        this.mouseActive,
        this.targetMouseActive,
        5.5,
        dt
      );

    const mdx =
      this.mouse.x -
      this.previousMouse.x;

    const mdy =
      this.mouse.y -
      this.previousMouse.y;

    const instantaneous =
      Math.min(
        1,
        Math.hypot(
          mdx,
          mdy
        ) /
        Math.max(
          dt,
          1 / 120
        ) *
        0.75
      );

    this.mouseVelocity =
      damp(
        this.mouseVelocity,
        instantaneous,
        8,
        dt
      );

    this.previousMouse.x =
      this.mouse.x;

    this.previousMouse.y =
      this.mouse.y;

    this.impulseVelocity =
      damp(
        this.impulseVelocity,
        0,
        6.5,
        dt
      );

    this.impulse =
      damp(
        this.impulse,
        0,
        4.8,
        dt
      );

    if (!reduced) {

      this.superPulseTimer +=
        dt;

      if (
        this.superPulseTimer >=
        this.nextSuperPulse
      ) {

        this.superPulseTimer = 0;

        this.nextSuperPulse =
          this.randomSuperPulseDelay();

        this.superPulse = 1;
      }
    }

    this.superPulseVelocity =
      damp(
        this.superPulseVelocity,
        0,
        5.0,
        dt
      );

    this.superPulse =
      damp(
        this.superPulse,
        0,
        reduced
          ? 3.0
          : 1.25,
        dt
      );

    const scroll =
      Number(
        this.getScrollSpeed?.()
      ) || 0;

    glUniforms(
      this.gl,
      this.program,
      this.u,
      {
        time:
          this.time,

        resolution: [
          this.canvas.width,
          this.canvas.height,
        ],

        mouse: [
          this.mouse.x,
          this.mouse.y,
        ],

        mouseActive:
          this.mouseActive,

        mouseVelocity:
          this.mouseVelocity,

        impulse:
          this.impulse,

        superPulse:
          this.superPulse,

        scrollSpeed:
          clamp(
            scroll,
            -3,
            3
          ),

        grain:
          c.grain &&
          this.quality.grain
            ? 1
            : 0,
      }
    );
  }

  draw() {

    const gl =
      this.gl;

    if (
      !gl ||
      !this.program
    ) {
      return;
    }

    const useComposite =
      !!this.framebuffer &&
      this.config.grain &&
      this.quality.grain;

    gl.disable(
      gl.DEPTH_TEST
    );

    gl.enable(
      gl.BLEND
    );

    gl.blendEquation(
      gl.FUNC_ADD
    );

    gl.blendFunc(
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
    );

    if (useComposite) {

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        this.framebuffer
      );

    } else {

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        null
      );
    }

    gl.viewport(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    gl.clearColor(
      0,
      0,
      0,
      0
    );

    gl.clear(
      gl.COLOR_BUFFER_BIT
    );

    gl.useProgram(
      this.program
    );

    gl.bindVertexArray(
      this.vao
    );

    gl.drawArrays(
      gl.TRIANGLE_STRIP,
      0,
      4
    );

    gl.bindVertexArray(
      null
    );

    if (useComposite) {

      gl.bindFramebuffer(
        gl.FRAMEBUFFER,
        null
      );

      gl.viewport(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      gl.clearColor(
        0,
        0,
        0,
        0
      );

      gl.clear(
        gl.COLOR_BUFFER_BIT
      );

      gl.useProgram(
        this.compositeProgram
      );

      gl.activeTexture(
        gl.TEXTURE0
      );

      gl.bindTexture(
        gl.TEXTURE_2D,
        this.frameTexture
      );

      gl.uniform1i(
        this.cu.scene,
        0
      );

      gl.uniform1f(
        this.cu.grain,
        1
      );

      gl.uniform1f(
        this.cu.grainIntensity,
        Number(
          this.config.grainIntensity
        ) || 0
      );

      gl.uniform1f(
        this.cu.time,
        this.time
      );

      gl.bindVertexArray(
        this.quadVao
      );

      gl.drawArrays(
        gl.TRIANGLE_STRIP,
        0,
        4
      );

      gl.bindVertexArray(
        null
      );

      gl.bindTexture(
        gl.TEXTURE_2D,
        null
      );
    }
  }

  frame = (now) => {

    if (!this.running) {
      return;
    }

    const dt =
      Math.min(
        0.05,
        Math.max(
          0.001,
          (now - this.lastTime) /
            1000
        )
      );

    this.lastTime =
      now;

    const motionScale =
      this.reducedMotion
        ? 0.16
        : 1;

    this.time +=
      dt *
      motionScale;

    this.applyConfigUniforms();

    this.updateDynamics(
      dt
    );

    this.draw();

    this.raf =
      requestAnimationFrame(
        this.frame
      );
  };

  start() {

    if (
      this.running ||
      !this.gl ||
      !this.pageVisible
    ) {
      return this;
    }

    this.running = true;

    this.lastTime =
      performance.now();

    this.raf =
      requestAnimationFrame(
        this.frame
      );

    return this;
  }

  pause() {

    if (!this.running) {
      return;
    }

    this.running = false;

    if (this.raf) {
      cancelAnimationFrame(
        this.raf
      );
    }

    this.raf = 0;
  }

  resume() {

    if (
      this.running ||
      !this.gl ||
      !this.pageVisible
    ) {
      return;
    }

    this.start();
  }

  triggerPulse() {

    this.impulseVelocity =
      Math.min(
        1,
        this.impulseVelocity +
          0.9
      );

    this.impulse =
      Math.min(
        1,
        this.impulse +
          0.82
      );
  }

  triggerSuperPulse() {

    this.superPulse = 1;

    this.superPulseVelocity = 1;

    this.superPulseTimer = 0;

    this.nextSuperPulse =
      this.randomSuperPulseDelay();
  }

  setFlowDirection(
    direction
  ) {

    this.config.flowDirection =
      direction === 'inward'
        ? 'inward'
        : 'outward';

    this.applyConfigUniforms();
  }

  setIntensity(value) {

    const intensity =
      clamp(
        Number(value) || 0,
        0,
        3
      );

    this.config.brightness =
      intensity;

    this.config.opacity =
      clamp(
        intensity,
        0,
        1
      );

    this.applyConfigUniforms();
  }

  setConfig(
    patch = {}
  ) {

    if (
      !patch ||
      typeof patch !== 'object'
    ) {
      return this;
    }

    const requiresQualityUpdate =
      Object.prototype.hasOwnProperty.call(
        patch,
        'quality'
      );

    Object.assign(
      this.config,
      patch
    );

    if (requiresQualityUpdate) {

      this.quality =
        resolveQuality(
          this.config.quality
        );

      this.resize();
    }

    this.applyConfigUniforms();

    return this;
  }

  destroy() {

    this.pause();

    window.removeEventListener(
      'mousemove',
      this._boundMouseMove
    );

    window.removeEventListener(
      'touchmove',
      this._boundTouchMove
    );

    window.removeEventListener(
      'resize',
      this._boundResize
    );

    this.canvas?.removeEventListener(
      'mouseenter',
      this._boundMouseEnter
    );

    this.canvas?.removeEventListener(
      'mouseleave',
      this._boundMouseLeave
    );

    this.canvas?.removeEventListener(
      'pointerdown',
      this._boundPointerDown
    );

    document.removeEventListener(
      'visibilitychange',
      this._boundVisibility
    );

    this.mediaQuery?.removeEventListener?.(
      'change',
      this._boundMotionChange
    );

    const gl =
      this.gl;

    if (gl) {

      if (this.vao) {
        gl.deleteVertexArray(
          this.vao
        );
      }

      if (this.quadVao) {
        gl.deleteVertexArray(
          this.quadVao
        );
      }

      if (this.quadBuffer) {
        gl.deleteBuffer(
          this.quadBuffer
        );
      }

      if (this.framebuffer) {
        gl.deleteFramebuffer(
          this.framebuffer
        );
      }

      if (this.frameTexture) {
        gl.deleteTexture(
          this.frameTexture
        );
      }

      if (this.depthRenderbuffer) {
        gl.deleteRenderbuffer(
          this.depthRenderbuffer
        );
      }

      if (this.program) {
        gl.deleteProgram(
          this.program
        );
      }

      if (this.compositeProgram) {
        gl.deleteProgram(
          this.compositeProgram
        );
      }
    }

    this.gl = null;

    this.program = null;
    this.compositeProgram = null;

    this.vao = null;
    this.quadVao = null;
    this.quadBuffer = null;

    this.framebuffer = null;
    this.frameTexture = null;
    this.depthRenderbuffer = null;

    if (_engine === this) {
      _engine = null;
    }
  }
}

function glUniforms(
  gl,
  program,
  uniforms,
  values
) {

  if (
    !gl ||
    !program ||
    !uniforms
  ) {
    return;
  }

  gl.useProgram(
    program
  );

  if (
    values.time !== undefined
  ) {
    gl.uniform1f(
      uniforms.time,
      values.time
    );
  }

  if (
    values.resolution
  ) {
    gl.uniform2f(
      uniforms.resolution,
      values.resolution[0],
      values.resolution[1]
    );
  }

  if (
    values.mouse
  ) {
    gl.uniform2f(
      uniforms.mouse,
      values.mouse[0],
      values.mouse[1]
    );
  }

  if (
    values.mouseActive !== undefined
  ) {
    gl.uniform1f(
      uniforms.mouseActive,
      values.mouseActive
    );
  }

  if (
    values.mouseVelocity !== undefined
  ) {
    gl.uniform1f(
      uniforms.mouseVelocity,
      values.mouseVelocity
    );
  }

  if (
    values.impulse !== undefined
  ) {
    gl.uniform1f(
      uniforms.impulse,
      values.impulse
    );
  }

  if (
    values.superPulse !== undefined
  ) {
    gl.uniform1f(
      uniforms.superPulse,
      values.superPulse
    );
  }

  if (
    values.scrollSpeed !== undefined
  ) {
    gl.uniform1f(
      uniforms.scrollSpeed,
      values.scrollSpeed
    );
  }

  if (
    values.grain !== undefined
  ) {
    gl.uniform1f(
      uniforms.grain,
      values.grain
    );
  }
}

export function initParticles(
  scrollSpeedGetter = () =>
    _scrollSpeed
) {

  const canvas =
    document.getElementById(
      'webgl-bg'
    );

  if (!canvas) {

    console.warn(
      '[particles.js] No <canvas id="webgl-bg"> found in the DOM.'
    );

    return null;
  }

  if (_engine) {

    _engine.destroy();

    _engine = null;
  }

  canvas.style.position =
    canvas.style.position ||
    'fixed';

  canvas.style.inset =
    canvas.style.inset ||
    '0';

  canvas.style.width =
    canvas.style.width ||
    '100%';

  canvas.style.height =
    canvas.style.height ||
    '100%';

  canvas.style.display =
    canvas.style.display ||
    'block';

  canvas.style.pointerEvents =
    canvas.style.pointerEvents ||
    'none';

  try {

    _engine =
      new TunnelEngine(
        canvas,
        DEFAULT_CONFIG,
        scrollSpeedGetter
      );

    _engine.start();

    return _engine;

  } catch (error) {

    console.error(
      '[particles.js] Initialization failed:',
      error
    );

    if (_engine) {

      try {
        _engine.destroy();
      } catch {}

      _engine = null;
    }

    return null;
  }
}