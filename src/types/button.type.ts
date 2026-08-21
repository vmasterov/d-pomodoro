import type { PressableProps, TextStyle, ViewStyle } from 'react-native';
import { buttonVariant } from '@/constants/component.const';

export type TButtonVariant = (typeof buttonVariant)[keyof typeof buttonVariant];

export type TButtonProps = {
  onPress: PressableProps['onPress'];
  variant?: TButtonVariant;
  disabled?: boolean;
};

export type TButtonComponent = {
  wrapper: ViewStyle;
  text: TextStyle;
};
