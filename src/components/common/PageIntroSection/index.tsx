import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
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
      <RevealOnScroll variant="fadeUp">
        <div className={styles.content}>
          <SectionLabel text={overline} />
          <h1 className={styles.pageHeading}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
      </RevealOnScroll>
    </PageContainer>
  </section>
);
