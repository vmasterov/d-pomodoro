import { View, Text } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TUseMachineReturn } from '@/types/useMachineReturn.type';

type TSetupProps = {
  setupStart: TUseMachineReturn['setupStart'];
};

export function Setup({ setupStart }: TSetupProps) {
  console.log(setupStart);

  return (
    <Layout>
      <View>
        <Text>Setup Screen</Text>
      </View>
    </Layout>
  );
}
