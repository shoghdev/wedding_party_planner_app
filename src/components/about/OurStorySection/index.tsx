import { Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { useAboutContent } from '@/hooks/useAboutContent';
import { styles } from './styles';

export const OurStorySection = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useAboutContent();

  return (
    <section className={styles.section} id="our-story">
      <PageContainer>
        <Row gutter={0} align="stretch" className={styles.splitRow}>
          <Col xs={24} lg={12} className={styles.splitCol}>
            <div className={styles.imageCol}>
              {isLoading ? (
                <Skeleton.Image active className={styles.skeleton} />
              ) : (
                <img
                  src={data?.storyImageUrl}
                  alt={t('about.story.imageAlt')}
                  loading="lazy"
                />
              )}
            </div>
          </Col>

          <Col xs={24} lg={12} className={styles.splitCol}>
            <div className={styles.textCol}>
              <h2 className={styles.title}>{t('about.story.title')}</h2>
              <p className={styles.paragraph}>{t('about.story.paragraphOne')}</p>
              <p className={styles.paragraph}>{t('about.story.paragraphTwo')}</p>
              <p className={styles.signature}>{t('about.story.signature')}</p>
            </div>
          </Col>
        </Row>
      </PageContainer>
    </section>
  );
};
