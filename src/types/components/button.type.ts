import type { PressableProps, TextStyle, ViewStyle } from 'react-native';
import { buttonMod, buttonVariant } from '@/constants/component.const';

export type TButtonVariant = (typeof buttonVariant)[keyof typeof buttonVariant];

export type TButtonMod = (typeof buttonMod)[keyof typeof buttonMod];

export type TButtonProps = {
  onPress: PressableProps['onPress'];
  variant?: TButtonVariant;
  disabled?: boolean;
  mod?: TButtonMod;
};

export type TButtonComponent = {
  wrapper: ViewStyle;
  text: TextStyle;
};
