import { styles } from './styles';

type AccentHeadingProps = Readonly<{
  prefix: string;
  accent: string;
  suffix?: string;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}>;

export const AccentHeading = ({
  prefix,
  accent,
  suffix = '',
  as: Tag = 'h2',
  className,
}: AccentHeadingProps) => (
  <Tag className={[styles.heading, className].filter(Boolean).join(' ')}>
    {prefix}{' '}
    <em className={styles.accent}>{accent}</em>
    {suffix ? ` ${suffix}` : ''}
  </Tag>
);
