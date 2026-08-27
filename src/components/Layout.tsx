import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import type { PropsWithChildren } from 'react';
import { theme } from '@/constants/theme.const';
import type { TLayoutProps } from '@/types/components/layout.type';

export function Layout({ children, title, subtitle }: PropsWithChildren<TLayoutProps>) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.innerContainer}>
        <View style={styles.block}>
          <Text style={styles.title}>{title}</Text>
          {Boolean(subtitle) && <Text style={styles.subtitle}>{subtitle}</Text>}
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.screenBg,
  },

  innerContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },

  block: {
    gap: theme.spacing.gap.l,
  },

  title: {
    ...theme.typography.title,
    color: theme.color.primaryText,
    marginVertical: theme.spacing.gap.s,
    textAlign: 'center',
  },

  subtitle: {
    ...theme.typography.subtitle,
    color: theme.color.mutedText,
    textAlign: 'center',
  },
});
