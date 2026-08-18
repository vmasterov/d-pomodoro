import { View, Text } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TUseMachineReturn } from '@/types/useMachineReturn.type';

type TWorkProps = {
  setupStart: TUseMachineReturn['setupStart'];
};

export function Work({ setupStart }: TWorkProps) {
  console.log(setupStart);

  return (
    <Layout>
      <View>
        <Text>Work Screen</Text>
      </View>
    </Layout>
  );
}
