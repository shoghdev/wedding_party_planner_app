import { Spin } from 'antd';
import { styles } from './styles';

type AdminRouteFallbackProps = Readonly<{
  fullScreen?: boolean;
}>;

export const AdminRouteFallback = ({ fullScreen = false }: AdminRouteFallbackProps) => (
  <div className={fullScreen ? styles.fullScreen : styles.inline}>
    <Spin size="large" />
  </div>
);
