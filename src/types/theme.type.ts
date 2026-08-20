import type { TextStyle } from 'react-native';

type TColor = {
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  lightText: string;
  border: string;
  accent: string;
  danger: string;
  disabled: string;
  accentSoft: string;
  screenBg: string;
};

type TFieldPadding = {
  vertical: number;
  horizontal: number;
};

type TPadding = {
  field: TFieldPadding;
  button: number;
  screen: number;
};

type TGap = {
  s: number;
  m: number;
  l: number;
};

type TRadius = {
  field: number;
  button: number;
};

type TSpacing = {
  padding: TPadding;
  gap: TGap;
  radius: TRadius;
};

type TFont = Pick<TextStyle, 'fontSize' | 'fontWeight' | 'fontFamily'>;

type TTypography = {
  title: TFont;
  subtitle: TFont;
  label: TFont;
  clock: TFont;
  fieldValue: TFont;
  button: TFont;
  hint: TFont;
};

export type TTheme = {
  color: TColor;
  spacing: TSpacing;
  typography: TTypography;
};
