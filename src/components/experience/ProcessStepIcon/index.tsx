import {
  BgColorsOutlined,
  CheckSquareOutlined,
  EditOutlined,
  HeartOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { styles } from './styles';

type ProcessStepIconProps = Readonly<{
  iconKey: string;
}>;

const ICON_MAP = {
  discovery: PhoneOutlined,
  concept: EditOutlined,
  planning: CheckSquareOutlined,
  styling: BgColorsOutlined,
  celebrate: HeartOutlined,
} as const;

export const ProcessStepIcon = ({ iconKey }: ProcessStepIconProps) => {
  const Icon = ICON_MAP[iconKey as keyof typeof ICON_MAP] ?? PhoneOutlined;

  return (
    <span className={styles.iconWrap} aria-hidden>
      <Icon className={styles.icon} />
    </span>
  );
};
