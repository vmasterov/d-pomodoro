import { View, Text } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TUseMachineReturn } from '@/types/useMachineReturn.type';

type TPendingProps = {
  setupStart: TUseMachineReturn['setupStart'];
};

export function Pending({ setupStart }: TPendingProps) {
  console.log(setupStart);

  return (
    <Layout title="Ожидание начала">
      <View>
        <Text>Pending Screen</Text>
      </View>
    </Layout>
  );
}
