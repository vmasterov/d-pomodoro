import { View, Text } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TRestProps } from '@/types/screens/rest.type';
import { Button } from '@/components/Button';

export function Rest({ workStart }: TRestProps) {
  console.log(workStart);

  return (
    <Layout
      title="title"
      subtitle="subtitle"
      content={
        <View>
          <Text>Rest Screen</Text>
        </View>
      }
      controls={<Button onPress={() => {}}>Начать заново</Button>}
    ></Layout>
  );
}
