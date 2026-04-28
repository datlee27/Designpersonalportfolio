import { startTransition, useCallback, useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'motion/react';

const DESKTOP_BREAKPOINT = 768;
const STICKY_TOP_OFFSET = 112;

interface HorizontalScrollMetrics {
  centerOffsets: number[];
  maxTranslate: number;
  sectionHeight: number;
  stickyHeight: number;
}

const EMPTY_METRICS: HorizontalScrollMetrics = {
  centerOffsets: [],
  maxTranslate: 0,
  sectionHeight: 0,
  stickyHeight: 0,
};

function addMediaListener(query: MediaQueryList, handler: () => void) {
  if (query.addEventListener) {
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }

  query.addListener(handler);
  return () => query.removeListener(handler);
}

export function useHorizontalScrollScene(itemCount: number) {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [isSceneEnabled, setIsSceneEnabled] = useState(false);
  const [metrics, setMetrics] = useState<HorizontalScrollMetrics>(EMPTY_METRICS);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, (latest) => -latest * metrics.maxTranslate);
  const progressWidth = useTransform(scrollYProgress, (latest) => `${(latest * 100).toFixed(2)}%`);

  useEffect(() => {
    const desktopQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncFlags = () => {
      setIsSceneEnabled(desktopQuery.matches && !reducedMotionQuery.matches);
    };

    syncFlags();

    const cleanupDesktop = addMediaListener(desktopQuery, syncFlags);
    const cleanupReducedMotion = addMediaListener(reducedMotionQuery, syncFlags);

    return () => {
      cleanupDesktop();
      cleanupReducedMotion();
    };
  }, []);

  useEffect(() => {
    if (!isSceneEnabled) {
      setMetrics(EMPTY_METRICS);
      setActiveIndex(0);
      return;
    }

    const scene = sceneRef.current;
    const frame = frameRef.current;
    const track = trackRef.current;

    if (!scene || !frame || !track) return;

    const measure = () => {
      const stickyHeight = Math.max(window.innerHeight - STICKY_TOP_OFFSET, window.innerHeight * 0.62);
      const frameWidth = frame.clientWidth;
      const items = Array.from(track.children) as HTMLElement[];
      const rawOffsets = items.map((item) =>
        Math.max(0, item.offsetLeft - Math.max((frameWidth - item.offsetWidth) / 2, 0)),
      );
      const maxTranslate = Math.max(
        0,
        Math.min(track.scrollWidth - frameWidth, rawOffsets[rawOffsets.length - 1] ?? 0),
      );
      const centerOffsets = rawOffsets.map((offset) => Math.min(offset, maxTranslate));
      const sectionHeight = stickyHeight + maxTranslate;

      startTransition(() => {
        setMetrics({
          centerOffsets,
          maxTranslate,
          sectionHeight,
          stickyHeight,
        });
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(frame);
    resizeObserver.observe(track);
    Array.from(track.children).forEach((item) => resizeObserver.observe(item));
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isSceneEnabled, itemCount]);

  useEffect(() => {
    if (!isSceneEnabled || metrics.centerOffsets.length === 0) return;

    return scrollYProgress.on('change', (latest) => {
      const currentOffset = latest * metrics.maxTranslate;

      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      metrics.centerOffsets.forEach((offset, index) => {
        const delta = Math.abs(offset - currentOffset);
        if (delta < nearestDistance) {
          nearestDistance = delta;
          nearestIndex = index;
        }
      });

      startTransition(() => {
        setActiveIndex(nearestIndex);
      });
    });
  }, [isSceneEnabled, metrics.centerOffsets, metrics.maxTranslate, scrollYProgress]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (!isSceneEnabled || metrics.centerOffsets.length === 0 || !sceneRef.current) return;

      const clampedIndex = Math.max(0, Math.min(index, metrics.centerOffsets.length - 1));
      const sceneTop = sceneRef.current.getBoundingClientRect().top + window.scrollY;
      const targetOffset = metrics.centerOffsets[clampedIndex] ?? 0;

      window.scrollTo({
        top: sceneTop + targetOffset,
        behavior: 'smooth',
      });
    },
    [isSceneEnabled, metrics.centerOffsets],
  );

  const scrollPrev = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const scrollNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  return {
    sceneRef,
    frameRef,
    trackRef,
    x,
    progressWidth,
    isSceneEnabled,
    activeIndex,
    metrics,
    scrollToIndex,
    scrollPrev,
    scrollNext,
  };
}
