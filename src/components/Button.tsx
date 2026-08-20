import { Pressable, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme.const';
import type { TButtonComponent, TButtonProps, TButtonVariant } from '@/types/button.type';
import { buttonVariant } from '@/constants/component.const';
import type { PropsWithChildren } from 'react';

export function Button({
  children,
  onPress,
  disabled,
  variant = buttonVariant.DEFAULT,
}: PropsWithChildren<TButtonProps>) {
  const buttonStyles = [
    styles.button,
    variantStyles[variant].button,
    disabled && disabledStyle.button,
  ];

  const textStyles = [styles.text, variantStyles[variant].text, disabled && disabledStyle.text];

  return (
    <Pressable
      style={({ pressed }) => [...buttonStyles, { opacity: pressed ? 0.5 : 1 }]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={textStyles}>{children}</Text>
      <Text style={textStyles}>Перепиши подключение стилей более "красиво"</Text>
      <Text style={textStyles}>opacity замени другими стилями</Text>
    </Pressable>
  );
}

const variantStyles = {
  [buttonVariant.ACCENT]: {
    button: {
      backgroundColor: theme.color.accent,
      borderColor: theme.color.accent,
    },
    text: {
      color: theme.color.lightText,
    },
  },
  [buttonVariant.DEFAULT]: {
    button: {
      backgroundColor: 'transparent',
      borderColor: theme.color.border,
    },
    text: {
      color: theme.color.primaryText,
    },
  },
  [buttonVariant.DANGER]: {
    button: {
      backgroundColor: 'transparent',
      borderColor: theme.color.danger,
    },
    text: {
      color: theme.color.danger,
    },
  },
} satisfies Record<TButtonVariant, TButtonComponent>;

const disabledStyle = {
  button: {
    backgroundColor: theme.color.disabled,
    borderColor: theme.color.disabled,
  },
  text: {
    color: theme.color.secondaryText,
  },
} satisfies TButtonComponent;

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.spacing.radius.button,
    padding: theme.spacing.padding.button,
    borderWidth: 1,
  },
  text: {
    ...theme.typography.button,
    textAlign: 'center',
  },
});
