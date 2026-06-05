import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { styles } from './styles';

type PageIntroSectionProps = Readonly<{
  overline: string;
  title: string;
  subtitle?: string;
}>;

export const PageIntroSection = ({ overline, title, subtitle }: PageIntroSectionProps) => (
  <section className={styles.section}>
    <PageContainer>
      <div className={styles.content}>
        <SectionLabel text={overline} />
        <h1 className={styles.pageHeading}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
    </PageContainer>
  </section>
);
