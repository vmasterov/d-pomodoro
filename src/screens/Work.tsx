import { View, Text } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TWorkProps } from '@/types/screens/work.type';

export function Work({ workStart }: TWorkProps) {
  console.log(workStart);

  return (
    <Layout title="title" subtitle="subtitle">
      <View>
        <Text>Work Screen</Text>
      </View>
    </Layout>
  );
}
