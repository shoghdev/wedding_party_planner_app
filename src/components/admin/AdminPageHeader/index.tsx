import type { ReactNode } from 'react';
import { styles } from './styles';

type AdminPageHeaderProps = Readonly<{
  breadcrumbs: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}>;

export const AdminPageHeader = ({
  breadcrumbs,
  title,
  description,
  actions,
}: AdminPageHeaderProps) => (
  <div className={styles.pageHeader}>
    <div>
      <p className={styles.breadcrumbs}>{breadcrumbs}</p>
      <h1 className={styles.title}>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
    {actions ? <div className={styles.actions}>{actions}</div> : null}
  </div>
);
