import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TSetupProps } from '@/types/setup.type';
import { theme } from '@/constants/theme.const';
import { TimeRange } from '@/components/TimeRange';
import { Button } from '@/components/Button';
import { buttonVariant } from '@/constants/component.const';
import { useEffect, useState } from 'react';
import { loadSettings, saveSettings } from '@storage/index';
import type { TTimeRange } from '@/types/timeRange.type';

export function Setup({ setupStart }: TSetupProps) {
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [endTimestamp, setEndTimestamp] = useState<number | null>(null);

  const startDate = startTimestamp !== null ? new Date(startTimestamp) : null; // Здесь и далее не использую useMemo из-за React Compiler
  const endDate = endTimestamp !== null ? new Date(endTimestamp) : null;

  const isFieldsFilled = startTimestamp !== null && endTimestamp !== null;

  const endError = isFieldsFilled && startTimestamp >= endTimestamp ? 'Конец раньше начала' : '';

  const isDisabled = !(isFieldsFilled && !endError);

  const updateRangeFieldHandler: TTimeRange['updateRangeField'] = (field, type) => {
    const timestamp = field.getTime();

    if (type === 'start') {
      setStartTimestamp(timestamp);
    } else {
      setEndTimestamp(timestamp);
    }
  };

  const onPressHandler = () => {
    if (!isFieldsFilled) {
      return;
    }

    setupStart(startTimestamp, endTimestamp);
    void saveSettings({ startTimestamp, endTimestamp });
  };

  const initTimeStates = async () => {
    const settings = await loadSettings();

    if (settings) {
      setStartTimestamp(settings.startTimestamp);
      setEndTimestamp(settings.endTimestamp);
    }
  };

  useEffect(() => {
    void initTimeStates();
  }, []);

  return (
    <Layout title="Рабочий диапазон">
      <View>
        <Text style={styles.subtitle}>Когда сегодня начинается и&nbsp;заканчивается работа</Text>

        <View style={styles.block}>
          <TimeRange
            startDate={startDate}
            endDate={endDate}
            updateRangeField={updateRangeFieldHandler}
            errors={{ endDateErrorText: endError }}
          />
          <Button onPress={onPressHandler} variant={buttonVariant.ACCENT} disabled={isDisabled}>
            Старт
          </Button>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    ...theme.typography.subtitle,
    color: theme.color.mutedText,
    textAlign: 'center',
  },
  block: {
    gap: theme.spacing.gap.l,
  },
});
