import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import type { PropsWithChildren } from 'react';
import { theme } from '@/constants/theme.const';
import type { TLayoutProps } from '@/types/layout.type';

export function Layout({ children, title }: PropsWithChildren<TLayoutProps>) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title,
    color: theme.color.primaryText,
    marginVertical: theme.spacing.gap.s,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: theme.color.screenBg,
  },

  innerContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
});
