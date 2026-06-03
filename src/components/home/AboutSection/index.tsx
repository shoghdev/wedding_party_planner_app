import { Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { AccentHeading } from '@/components/common/AccentHeading';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { ValuePropIcon } from '@/components/home/ValuePropIcon';
import { useHomeContent, useValueProps } from '@/hooks/useHomeContent';
import { styles } from './styles';

export const AboutSection = () => {
  const { t } = useTranslation();
  const { data: homeData, isLoading: homeLoading } = useHomeContent();
  const { data: values, isLoading: valuesLoading } = useValueProps();

  return (
    <section id="about" className={styles.section}>
      <PageContainer>
        <Row gutter={[56, 48]} align="middle">
          <Col xs={24} lg={10}>
            <div className={styles.visual}>
              <div className={styles.pinkShape} aria-hidden />
              <svg
                className={styles.leafBranch}
                viewBox="0 0 100 140"
                fill="none"
                aria-hidden
              >
                <path
                  d="M52 130 C52 100 40 72 28 48 C18 28 32 12 48 6"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M28 48 C18 44 8 48 4 56 M28 48 C34 38 44 34 54 36"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M40 72 C30 68 20 72 14 80 M40 72 C48 62 60 58 70 62"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M48 96 C40 92 32 96 26 102 M48 96 C56 88 66 86 74 90"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="18"
                  cy="56"
                  rx="5"
                  ry="9"
                  transform="rotate(-30 18 56)"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="50"
                  cy="36"
                  rx="5"
                  ry="9"
                  transform="rotate(25 50 36)"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="16"
                  cy="80"
                  rx="5"
                  ry="9"
                  transform="rotate(-20 16 80)"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="68"
                  cy="62"
                  rx="5"
                  ry="9"
                  transform="rotate(30 68 62)"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="28"
                  cy="102"
                  rx="4"
                  ry="8"
                  transform="rotate(-15 28 102)"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx="72"
                  cy="90"
                  rx="4"
                  ry="8"
                  transform="rotate(20 72 90)"
                  stroke="var(--color-gold)"
                  strokeWidth="1.2"
                />
              </svg>
              <div className={styles.imageWrap}>
                {homeLoading ? (
                  <Skeleton.Image active style={{ width: '100%', height: '100%' }} />
                ) : (
                  <img src={homeData?.about.imageUrl} alt="" loading="lazy" />
                )}
              </div>
            </div>
          </Col>

          <Col xs={24} lg={14}>
            <SectionLabel text={t('home.about.overline')} />
            <AccentHeading
              prefix={t('home.about.titlePrefix')}
              accent={t('home.about.titleAccent')}
            />
            <p className={styles.body}>{t('home.about.description')}</p>

            <Row gutter={[16, 28]} className={styles.valuesGrid}>
              {valuesLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Col key={index} xs={12} sm={6}>
                      <Skeleton active paragraph={{ rows: 1 }} />
                    </Col>
                  ))
                : values?.map((value) => (
                    <Col key={value.id} xs={12} sm={6}>
                      <article className={styles.valueCard}>
                        <ValuePropIcon iconKey={value.iconKey} />
                        <h3 className={styles.valueTitle}>{t(value.titleKey)}</h3>
                      </article>
                    </Col>
                  ))}
            </Row>
          </Col>
        </Row>
      </PageContainer>
    </section>
  );
};
