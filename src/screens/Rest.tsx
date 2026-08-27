import { View, Text } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TRestProps } from '@/types/screens/rest.type';

export function Rest({ workStart }: TRestProps) {
  console.log(workStart);

  return (
    <Layout title="title" subtitle="subtitle">
      <View>
        <Text>Rest Screen</Text>
      </View>
    </Layout>
  );
}
