import { styles } from './styles';

type SectionLabelProps = Readonly<{
  text: string;
}>;

export const SectionLabel = ({ text }: SectionLabelProps) => (
  <span className={styles.label}>{text}</span>
);
