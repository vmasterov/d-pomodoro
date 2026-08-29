import { Text } from 'react-native';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/Button';
import type { TFinishedProps } from '@/types/screens/finished.type';

export function Finished({ finishConfirm }: TFinishedProps) {
  return (
    <Layout
      title="День окончен"
      content={<Text>День окончен</Text>}
      controls={<Button onPress={finishConfirm}>Начать заново</Button>}
    />
  );
}
