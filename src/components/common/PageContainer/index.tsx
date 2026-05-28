import type { ReactNode } from 'react';
import { styles } from './styles';

type PageContainerProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export const PageContainer = ({ children, className }: PageContainerProps) => (
  <div className={[styles.container, className].filter(Boolean).join(' ')}>
    {children}
  </div>
);
