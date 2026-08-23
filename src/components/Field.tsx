import { Pressable, Text, StyleSheet, View } from 'react-native';
import { theme } from '@/constants/theme.const';
import type { TButtonComponent, TButtonProps, TButtonVariant } from '@/types/button.type';
import { buttonMod, buttonVariant } from '@/constants/component.const';
import type { PropsWithChildren } from 'react';

export function Button({
  children,
  onPress,
  disabled,
  mod = buttonMod.BUTTON,
  variant = buttonVariant.DEFAULT,
}: PropsWithChildren<TButtonProps>) {
  const wrapperStyles = [
    styles.wrapper,
    variantStyles[variant].wrapper,
    mod !== buttonMod.BUTTON && modStyles[mod].wrapper,
    disabled && disabledStyle.wrapper,
  ];

  const buttonStyles = [styles.button, mod !== buttonMod.BUTTON && modStyles[mod].button];

  const textStyles = [
    styles.text,
    variantStyles[variant].text,
    disabled && disabledStyle.text,
    mod !== buttonMod.BUTTON && modStyles[mod].text,
  ];

  return (
    <View style={wrapperStyles}>
      <Pressable
        style={buttonStyles}
        android_ripple={styles.ripple}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={textStyles}>{children}</Text>
      </Pressable>
    </View>
  );
}

const variantStyles = {
  [buttonVariant.ACCENT]: {
    wrapper: {
      backgroundColor: theme.color.accent,
      borderColor: theme.color.accent,
    },
    text: {
      color: theme.color.lightText,
    },
  },
  [buttonVariant.DEFAULT]: {
    wrapper: {
      backgroundColor: 'transparent',
      borderColor: theme.color.border,
    },
    text: {
      color: theme.color.primaryText,
    },
  },
  [buttonVariant.DANGER]: {
    wrapper: {
      backgroundColor: 'transparent',
      borderColor: theme.color.danger,
    },
    text: {
      color: theme.color.danger,
    },
  },
} satisfies Record<TButtonVariant, TButtonComponent>;

const modStyles = {
  [buttonMod.FIELD]: {
    wrapper: {
      borderRadius: theme.spacing.radius.field,
    },
    button: {
      paddingHorizontal: theme.spacing.padding.field.horizontal,
      paddingVertical: theme.spacing.padding.field.vertical,
    },
    text: {
      ...theme.typography.fieldValue,
    },
  },
};

const disabledStyle = {
  wrapper: {
    backgroundColor: theme.color.disabled,
    borderColor: theme.color.disabled,
  },
  text: {
    color: theme.color.secondaryText,
  },
} satisfies TButtonComponent;

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    borderRadius: theme.spacing.radius.button,
    borderWidth: 1,
  },
  button: {
    padding: theme.spacing.padding.button,
  },
  text: {
    ...theme.typography.button,
    textAlign: 'center',
  },
  ripple: {
    color: 'rgba(0, 0, 0, 0.2)',
  },
});
