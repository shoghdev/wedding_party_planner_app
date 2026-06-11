import { HeartFilled } from '@ant-design/icons';
import { Button, Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { AccentHeading } from '@/components/common/AccentHeading';
import { PageContainer } from '@/components/common/PageContainer';
import { RevealOnScroll } from '@/components/common/RevealOnScroll';
import { SectionLabel } from '@/components/common/SectionLabel';
import { HeroFloralArt } from '@/components/home/HeroFloralArt';
import { useHomeContent } from '@/hooks/useHomeContent';
import { styles } from './styles';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useHomeContent();

  return (
    <section id="home" className={styles.section}>
      <PageContainer>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={11} xl={10}>
            <RevealOnScroll variant="fadeLeft">
              <div className={styles.content}>
                <SectionLabel text={t('home.hero.overline')} />
                <AccentHeading
                  as="h1"
                  className={styles.heroHeading}
                  prefix={t('home.hero.titlePrefix')}
                  accent={t('home.hero.titleAccent')}
                  suffix={t('home.hero.titleSuffix')}
                />
                <p className={styles.description}>{t('home.hero.description')}</p>
                <div className={styles.actions}>
                  <Button type="primary" size="large" href="/services">
                    {t('home.hero.primaryCta')}
                  </Button>
                  <Button size="large" className={styles.outlineBtn} href="/portfolio">
                    {t('home.hero.secondaryCta')}
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          </Col>

          <Col xs={24} lg={13} xl={14}>
            <RevealOnScroll variant="fadeRight" delay={120}>
              <div
                className={[styles.visual, !isLoading && styles.visualReady].filter(Boolean).join(' ')}
                aria-hidden={isLoading}
              >
                {isLoading ? (
                  <Skeleton.Image active style={{ width: '100%', height: 480 }} />
                ) : (
                  <>
                    <div className={styles.pinkOrb} />
                    <HeroFloralArt />
                    <div className={styles.archImage}>
                      <img
                        src={data?.hero.mainImageUrl}
                        alt=""
                        loading="eager"
                        fetchPriority="high"
                      />
                    </div>
                    <div className={styles.polaroidOne}>
                      <img src={data?.hero.polaroidOneUrl} alt="" loading="lazy" />
                    </div>
                    <div className={styles.polaroidTwo}>
                      <img src={data?.hero.polaroidTwoUrl} alt="" loading="lazy" />
                    </div>
                    <div className={styles.badge}>
                      <span className={styles.badgeText}>{t('home.hero.badge')}</span>
                      <HeartFilled className={styles.badgeHeart} aria-hidden />
                    </div>
                    <span className={`${styles.sparkle} ${styles.sparkleOne}`} />
                    <span className={`${styles.sparkle} ${styles.sparkleTwo}`} />
                    <span className={`${styles.sparkle} ${styles.sparkleThree}`} />
                    <span className={`${styles.sparkle} ${styles.sparkleFour}`} />
                  </>
                )}
              </div>
            </RevealOnScroll>
          </Col>
        </Row>
      </PageContainer>
    </section>
  );
};
