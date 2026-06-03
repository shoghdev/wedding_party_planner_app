import {
  CrownOutlined,
  FormatPainterOutlined,
  HeartOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { styles } from './styles';

type WhyCouplesFeatureIconProps = Readonly<{
  iconKey: string;
}>;

const ICON_MAP = {
  personalized: ShoppingOutlined,
  stressFree: TeamOutlined,
  creative: FormatPainterOutlined,
  trusted: SafetyCertificateOutlined,
  luxury: CrownOutlined,
  attention: HeartOutlined,
} as const;

export const WhyCouplesFeatureIcon = ({ iconKey }: WhyCouplesFeatureIconProps) => {
  const Icon = ICON_MAP[iconKey as keyof typeof ICON_MAP] ?? HeartOutlined;

  return (
    <span className={styles.iconWrap} aria-hidden>
      <Icon className={styles.icon} />
    </span>
  );
};
