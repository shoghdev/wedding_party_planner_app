import {
  BulbOutlined,
  GiftOutlined,
  HeartOutlined,
  SmileOutlined,
} from '@ant-design/icons';

type ValuePropIconProps = Readonly<{
  iconKey: string;
}>;

const ICON_MAP: Record<string, typeof BulbOutlined> = {
  expertise: BulbOutlined,
  decorations: GiftOutlined,
  personalized: HeartOutlined,
  stressFree: SmileOutlined,
};

export const ValuePropIcon = ({ iconKey }: ValuePropIconProps) => {
  const Icon = ICON_MAP[iconKey] ?? BulbOutlined;
  return (
    <Icon
      style={{ fontSize: 26, color: 'var(--color-rose)', strokeWidth: 40 }}
      aria-hidden
    />
  );
};
