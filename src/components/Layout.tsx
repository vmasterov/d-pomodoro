import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import type { PropsWithChildren } from 'react';

export function Layout({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.innerContainer}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
});
