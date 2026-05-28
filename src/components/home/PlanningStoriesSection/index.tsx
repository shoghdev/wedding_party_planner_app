import { Button, Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';
import { SectionLabel } from '@/components/common/SectionLabel';
import { StoriesGallery } from '@/components/home/StoriesGallery';
import { useStories } from '@/hooks/useHomeContent';
import { styles } from './styles';

export const PlanningStoriesSection = () => {
  const { t } = useTranslation();
  const { data: stories, isLoading } = useStories();

  return (
    <section id="portfolio" className={styles.section}>
      <PageContainer>
        <Row gutter={[40, 40]} align="middle">
          <Col xs={24} lg={7} xl={6}>
            <div className={styles.content}>
              <SectionLabel text={t('home.stories.overline')} />
              <h2 className={styles.storiesTitle}>{t('home.stories.title')}</h2>
              <Button type="primary" size="large">
                {t('home.stories.cta')}
              </Button>
            </div>
          </Col>

          <Col xs={24} lg={17} xl={18}>
            {isLoading ? (
              <Skeleton.Image active style={{ width: '100%', height: 220 }} />
            ) : (
              stories && <StoriesGallery slides={stories} />
            )}
          </Col>
        </Row>
      </PageContainer>
    </section>
  );
};
