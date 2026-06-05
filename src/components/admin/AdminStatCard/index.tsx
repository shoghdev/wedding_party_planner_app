import { ArrowUpOutlined } from '@ant-design/icons';
import type { ReactNode } from 'react';
import { styles } from './styles';

type AdminStatCardProps = Readonly<{
  label: string;
  value: string;
  trend?: string;
  icon: ReactNode;
  accent?: 'rose' | 'green' | 'gold' | 'blue';
}>;

export const AdminStatCard = ({
  label,
  value,
  trend,
  icon,
  accent = 'rose',
}: AdminStatCardProps) => (
  <article className={styles.card}>
    <div className={[styles.iconWrap, styles[`accent_${accent}`]].join(' ')}>{icon}</div>
    <div className={styles.body}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {trend ? (
        <p className={styles.trend}>
          <ArrowUpOutlined aria-hidden />
          {trend}
        </p>
      ) : null}
    </div>
  </article>
);
