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
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={10}>
            <div className={styles.imageWrap}>
              {homeLoading ? (
                <Skeleton.Image active style={{ width: '100%', height: '100%' }} />
              ) : (
                <>
                  <svg
                    className={styles.goldAccent}
                    viewBox="0 0 80 80"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M40 4C28 20 12 28 8 44c8-4 18-6 28-4 4-12 2-24-4-36 8 8 14 18 16 28 10-6 18-2 24 8-8-2-16-2-24 0 6 10 4 22-4 32 12-8 20-4 28 8-10-14-24-22-40-24z"
                      stroke="var(--color-gold)"
                      strokeWidth="1.2"
                    />
                  </svg>
                  <img src={homeData?.about.imageUrl} alt="" loading="lazy" />
                </>
              )}
            </div>
          </Col>

          <Col xs={24} lg={14}>
            <SectionLabel text={t('home.about.overline')} />
            <AccentHeading
              prefix={t('home.about.titlePrefix')}
              accent={t('home.about.titleAccent')}
            />
            <p className={styles.body}>{t('home.about.description')}</p>

            <Row gutter={[20, 28]} className={styles.valuesGrid}>
              {valuesLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Col key={index} xs={12}>
                      <Skeleton active paragraph={{ rows: 1 }} />
                    </Col>
                  ))
                : values?.map((value) => (
                    <Col key={value.id} xs={12}>
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
