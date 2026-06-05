import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { RevealVariant } from '@/types/reveal';
import { styles } from './styles';

type RevealOnScrollProps = Readonly<{
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
}>;

export const RevealOnScroll = ({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
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
