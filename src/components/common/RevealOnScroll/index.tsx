import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { RevealVariant } from '@/types/reveal';
import { styles } from './styles';

type RevealOnScrollProps = Readonly<{
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
}>;

const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;

  return rect.top < viewHeight && rect.bottom > 0;
};

export const RevealOnScroll = ({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => setIsVisible(true);

    if (isInViewport(element)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '0px 0px 40px 0px' },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const revealStyle = { '--reveal-delay': `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      data-revealed={isVisible ? 'true' : undefined}
      className={[
        styles.reveal,
        styles[variant],
        isVisible && styles.visible,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={revealStyle}
    >
      {children}
    </div>
  );
};
