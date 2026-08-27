import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TWorkProps } from '@/types/screens/work.type';
import { recommendedRest, remainingMs } from '@core/selectors/selectors';
import { Clock } from '@/components/Clock';
import { Button } from '@/components/Button';
import { buttonVariant } from '@/constants/component.const';
import { theme } from '@/constants/theme.const';
import { restDuration, restKind } from '@core/constants/segment.const';
import type { TRestKind } from '@core/types/common.type';
import { convertRemainingMsToFormattedSting } from '@core/utils/date.util';

export function Work({ restStart, reset, nowMs, snapshot }: TWorkProps) {
  const currentRemainingMs = remainingMs(snapshot, nowMs);
  const formattedTime = convertRemainingMsToFormattedSting(currentRemainingMs);

  const currentRestKind = recommendedRest(snapshot.workSegmentCount);

  const getRestButtonKind = (kind: TRestKind): TRestKind => {
    return currentRestKind === kind ? restKind.SHORT : restKind.LONG;
  };

  const getRestButtonText = (kind: TRestKind) => {
    return `Отдых ${restDuration[getRestButtonKind(kind)]} мин`;
  };

  const recommendedRestText =
    currentRestKind === restKind.SHORT
      ? 'Рекомендуется короткий перерыв'
      : 'Рекомендуется длинный перерыв';

  const isNegativeTime = currentRemainingMs < 0;

  const restInfoText = isNegativeTime ? 'Перерыв просрочен на' : 'До перерыва';

  return (
    <Layout title="Работа">
      <View>
        <Text style={styles.label}>{restInfoText}</Text>
        <Clock formattedTime={formattedTime} isNegative={isNegativeTime} />
      </View>

      <Text>Закончить этот экран</Text>
      <Text>
        Написать тесты к convertRemainingMsToFormattedSting и convertDateToFormattedString
      </Text>

      <View>
        <Text style={styles.label}>{recommendedRestText}</Text>

        <Button
          onPress={() => restStart(getRestButtonKind(restKind.SHORT))}
          variant={buttonVariant.ACCENT}
        >
          {getRestButtonText(restKind.SHORT)}
        </Button>

        <Button
          onPress={() => restStart(getRestButtonKind(restKind.LONG))}
          variant={buttonVariant.DEFAULT}
        >
          {getRestButtonText(restKind.LONG)}
        </Button>

        <Button onPress={reset} variant={buttonVariant.DANGER}>
          Выключить
        </Button>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  label: {
    ...theme.typography.label,
    textAlign: 'center',
    color: theme.color.mutedText,
  },
});
