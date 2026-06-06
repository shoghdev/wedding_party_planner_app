import { useEffect, useRef, useState } from 'react';
import { formatStatValue, parseStatValue } from '@/utils/parseStatValue';
import { styles } from './styles';

type StatCountUpProps = Readonly<{
  value: string;
  startDelay?: number;
  className?: string;
}>;

export const StatCountUp = ({ value, startDelay = 0, className }: StatCountUpProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { prefix, target, suffix } = parseStatValue(value);
  const [displayValue, setDisplayValue] = useState(() => formatStatValue(0, prefix, suffix));
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setIsActive(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || target <= 0) {
      setDisplayValue(value);
      return;
    }

    let frameId = 0;
    const durationMs = 1400;
    const startedAt = performance.now() + startDelay;

    const tick = (now: number) => {
      const elapsed = now - startedAt;

      if (elapsed < 0) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(target * eased);

      setDisplayValue(formatStatValue(current, prefix, suffix));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [isActive, prefix, startDelay, suffix, target, value]);

  return (
    <p
      ref={ref}
      className={[styles.value, className].filter(Boolean).join(' ')}
      data-active={isActive ? 'true' : undefined}
    >
      {displayValue}
    </p>
  );
};
