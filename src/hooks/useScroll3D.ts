import { useEffect, useRef } from 'react';

export type Scroll3DSide = 'left' | 'right' | 'center';
export type Scroll3DStrength = 'soft' | 'medium' | 'strong';
export type Scroll3DScene = 'hero' | 'panel' | 'stack' | 'rail' | 'float';
export type Scroll3DDepth = 1 | 2 | 3;

interface Scroll3DTransformPreset {
  perspective: number;
  rotateX: number;
  rotateY: number;
  translateY: number;
  translateZ: number;
  scaleDelta: number;
  opacityDelta: number;
  scrub: number;
}

const strengthPresets: Record<Scroll3DStrength, Scroll3DTransformPreset> = {
  soft: {
    perspective: 1240,
    rotateX: 4,
    rotateY: 4,
    translateY: 20,
    translateZ: 18,
    scaleDelta: 0.02,
    opacityDelta: 0.012,
    scrub: 0.7,
  },
  medium: {
    perspective: 1380,
    rotateX: 6,
    rotateY: 6,
    translateY: 28,
    translateZ: 28,
    scaleDelta: 0.035,
    opacityDelta: 0.018,
    scrub: 0.86,
  },
  strong: {
    perspective: 1520,
    rotateX: 8,
    rotateY: 8,
    translateY: 38,
    translateZ: 40,
    scaleDelta: 0.05,
    opacityDelta: 0.026,
    scrub: 1,
  },
};

const scenePresets: Record<Scroll3DScene, Scroll3DTransformPreset> = {
  hero: {
    perspective: 1840,
    rotateX: 9,
    rotateY: 10,
    translateY: 52,
    translateZ: 70,
    scaleDelta: 0.06,
    opacityDelta: 0.05,
    scrub: 1,
  },
  panel: {
    perspective: 1640,
    rotateX: 6,
    rotateY: 8,
    translateY: 34,
    translateZ: 44,
    scaleDelta: 0.03,
    opacityDelta: 0.026,
    scrub: 0.84,
  },
  stack: {
    perspective: 1560,
    rotateX: 4.8,
    rotateY: 6,
    translateY: 26,
    translateZ: 32,
    scaleDelta: 0.022,
    opacityDelta: 0.02,
    scrub: 0.74,
  },
  rail: {
    perspective: 1480,
    rotateX: 3.2,
    rotateY: 4.4,
    translateY: 18,
    translateZ: 20,
    scaleDelta: 0.014,
    opacityDelta: 0.012,
    scrub: 0.58,
  },
  float: {
    perspective: 1400,
    rotateX: 2.5,
    rotateY: 3.4,
    translateY: 12,
    translateZ: 14,
    scaleDelta: 0.01,
    opacityDelta: 0.008,
    scrub: 0.46,
  },
};

const depthPresets: Record<Scroll3DDepth, number> = {
  1: 0.78,
  2: 1,
  3: 1.22,
};

interface UseScroll3DOptions {
  side?: Scroll3DSide;
  scene?: Scroll3DScene;
  depth?: Scroll3DDepth;
  strength?: Scroll3DStrength;
  perspective?: number;
}

export function useScroll3D<T extends HTMLElement>({
  side = 'center',
  scene,
  depth = 2,
  strength = 'medium',
  perspective,
}: UseScroll3DOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId = 0;

    const reset = () => {
      element.style.transform = '';
      element.style.transformStyle = '';
      element.style.willChange = '';
      element.style.opacity = '';
    };

    if (reducedMotion.matches) {
      reset();
      return;
    }

    const preset = scene ? scenePresets[scene] : strengthPresets[strength];
    const resolvedPerspective = perspective ?? preset.perspective;
    const depthFactor = depthPresets[depth];

    const update = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = Math.min(
        Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0),
        1,
      );

      const centered = (progress - 0.5) * 2;
      const wave = Math.sin(progress * Math.PI);
      const mobileFactor = window.innerWidth < 768 ? 0.76 : 1;
      const yawDirection = side === 'left' ? -1 : side === 'right' ? 1 : 0;
      const scrubbedCentered = centered * preset.scrub;
      const scrubbedWave = wave * (0.72 + preset.scrub * 0.28);

      const rotateX = -scrubbedCentered * preset.rotateX * depthFactor * mobileFactor;
      const rotateY = yawDirection * scrubbedWave * preset.rotateY * depthFactor * mobileFactor;
      const translateY = -scrubbedCentered * preset.translateY * depthFactor * mobileFactor;
      const translateZ = scrubbedWave * preset.translateZ * depthFactor * mobileFactor;
      const scale = 1 - (1 - scrubbedWave) * preset.scaleDelta * depthFactor * mobileFactor;
      const opacity = 1 - (1 - scrubbedWave) * preset.opacityDelta * mobileFactor;

      element.style.transform = `perspective(${resolvedPerspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) scale(${scale.toFixed(3)})`;
      element.style.transformStyle = 'preserve-3d';
      element.style.willChange = 'transform, opacity';
      element.style.opacity = opacity.toFixed(3);
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reset();
    };
  }, [depth, perspective, scene, side, strength]);

  return ref;
}
