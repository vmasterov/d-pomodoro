import { View, Text } from 'react-native';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/Button';
import type { TSetupProps } from '@/types/setup.type';
import { buttonVariant } from '@/constants/component.const';
import { theme } from '@/constants/theme.const';

export function Setup({ setupStart }: TSetupProps) {
  console.log(setupStart);

  return (
    <Layout>
      <View style={{ gap: theme.spacing.gap.l }}>
        <Text>Setup Screen</Text>
        <Button variant={buttonVariant.ACCENT} onPress={() => alert(buttonVariant.ACCENT)}>
          {buttonVariant.ACCENT.toLocaleUpperCase()}
        </Button>
        <Button variant={buttonVariant.DEFAULT} onPress={() => alert(buttonVariant.DEFAULT)}>
          {buttonVariant.DEFAULT.toLocaleUpperCase()}
        </Button>
        <Button variant={buttonVariant.DANGER} onPress={() => alert(buttonVariant.DANGER)}>
          {buttonVariant.DANGER.toLocaleUpperCase()}
        </Button>
        <Button disabled onPress={() => alert('disabled')}>
          {'disabled'.toLocaleUpperCase()}
        </Button>
      </View>
    </Layout>
  );
}
