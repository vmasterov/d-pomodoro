import { View, Text } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TUseMachineReturn } from '@/types/useMachineReturn.type';

type TFinishedProps = {
  setupStart: TUseMachineReturn['setupStart'];
};

export function Finished({ setupStart }: TFinishedProps) {
  console.log(setupStart);

  return (
    <Layout>
      <View>
        <Text>Finished Screen</Text>
      </View>
    </Layout>
  );
}
