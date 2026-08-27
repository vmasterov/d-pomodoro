import { View } from 'react-native';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/Button';
import type { TFinishedProps } from '@/types/screens/finished.type';

export function Finished({ finishConfirm }: TFinishedProps) {
  return (
    <Layout title="День окончен">
      <View>
        <Button onPress={finishConfirm}>Начать заново</Button>
      </View>
    </Layout>
  );
}
