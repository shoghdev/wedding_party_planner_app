import type { ThemeConfig } from 'antd';
import { BRAND_COLORS, FONT_FAMILIES } from '@/consts/theme';
import type { ThemeMode } from '@/types/theme';

export const getAntdTheme = (mode: ThemeMode): ThemeConfig => ({
  token: {
    colorPrimary: BRAND_COLORS.rose,
    colorBgBase: mode === 'light' ? BRAND_COLORS.cream : '#1A1A1A',
    colorText: mode === 'light' ? BRAND_COLORS.charcoal : BRAND_COLORS.cream,
    colorTextSecondary: BRAND_COLORS.charcoalMuted,
    fontFamily: FONT_FAMILIES.sans,
    borderRadius: 6,
    controlHeight: 44,
    fontSize: 15,
  },
  components: {
    Button: {
      primaryShadow: 'none',
      fontWeight: 600,
      paddingInline: 28,
      defaultBorderColor: BRAND_COLORS.rose,
      defaultColor: BRAND_COLORS.rose,
    },
    Carousel: {
      dotWidth: 8,
      dotHeight: 8,
      dotActiveWidth: 24,
    },
  },
});
