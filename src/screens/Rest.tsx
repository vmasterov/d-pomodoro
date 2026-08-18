import { View, Text } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TUseMachineReturn } from '@/types/useMachineReturn.type';

type TRestProps = {
  setupStart: TUseMachineReturn['setupStart'];
};

export function Rest({ setupStart }: TRestProps) {
  console.log(setupStart);

  return (
    <Layout>
      <View>
        <Text>Rest Screen</Text>
      </View>
    </Layout>
  );
}
