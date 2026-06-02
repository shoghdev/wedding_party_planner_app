import { Col, Row, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageContainer } from '@/components/common/PageContainer';

import { useAboutStats } from '@/hooks/useAboutContent';
import { styles } from './styles';

export const AboutStatsSection = () => {
  const { t } = useTranslation();
  const { data: stats, isLoading } = useAboutStats();

  return (
    <section className={styles.section}>
      <PageContainer>
        <Row className={styles.statsRow}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Col key={index} xs={12} md={6}>
                  <Skeleton active paragraph={{ rows: 1 }} />
                </Col>
              ))
            : stats?.map((stat, index) => (
                <Col key={stat.id} xs={12} md={6}>
                  <article
                    className={[
                      styles.stat,
                      index > 0 && styles.statBordered,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    <p className={styles.value}>{t(stat.valueKey)}</p>
                    <p className={styles.label}>{t(stat.labelKey)}</p>
                  </article>
                </Col>
              ))}
        </Row>
      </PageContainer>
    </section>
  );
};
