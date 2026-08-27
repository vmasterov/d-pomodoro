import type { TTheme } from '@/types/constants/theme.type';

export const theme: TTheme = {
  color: {
    primaryText: '#2C2C2A',
    secondaryText: '#5F5E5A',
    mutedText: '#888780',
    lightText: '#FFFFFF',
    border: '#D3D1C7',
    accent: '#185FA5',
    danger: '#A32D2D',
    disabled: '#D3D1C7',
    accentSoft: '#E6F1FB',
    screenBg: '#FFFFFF',
  },
  spacing: {
    padding: {
      field: {
        horizontal: 18,
        vertical: 14,
      },
      button: 16,
      screen: 24,
    },
    gap: {
      s: 8,
      m: 20,
      l: 32,
    },
    radius: {
      field: 12,
      button: 14,
    },
  },
  typography: {
    title: {
      fontSize: 38,
      fontWeight: '800',
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 22,
    },
    label: {
      fontSize: 16,
      fontWeight: '400',
    },
    clock: {
      fontSize: 80,
      fontWeight: '700',
      fontFamily: 'monospace',
    },
    fieldValue: {
      fontSize: 48,
      fontWeight: '700',
      fontFamily: 'monospace',
    },
    button: {
      fontSize: 16,
      fontWeight: '500',
    },
    hint: {
      fontSize: 13,
      fontWeight: '400',
    },
  },
} as const;
