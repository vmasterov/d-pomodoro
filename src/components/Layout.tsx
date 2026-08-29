import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme.const';
import type { TLayoutProps } from '@/types/components/layout.type';

export function Layout({ title, subtitle, controls, content }: TLayoutProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {Boolean(subtitle) && <Text style={styles.subtitle}>{subtitle}</Text>}
        {content}
      </View>
      <View style={styles.controls}>{controls}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    backgroundColor: theme.color.screenBg,
  },

  content: {
    flex: 1,
    gap: theme.spacing.gap.l,
  },

  controls: {
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
