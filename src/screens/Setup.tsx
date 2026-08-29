import { Layout } from '@/components/Layout';
import type { TSetupProps } from '@/types/screens/setup.type';
import { TimeRange } from '@/components/TimeRange';
import { Button } from '@/components/Button';
import { buttonVariant } from '@/constants/component.const';
import { useEffect, useState } from 'react';
import { loadSettings, saveSettings } from '@storage/index';
import type { TTimeRange } from '@/types/components/timeRange.type';

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
    <Layout
      title="Рабочий диапазон"
      subtitle="Когда сегодня начинается и&nbsp;заканчивается работа"
      content={
        <TimeRange
          startDate={startDate}
          endDate={endDate}
          updateRangeField={updateRangeFieldHandler}
          errors={{ endDateErrorText: endError }}
        />
      }
      controls={
        <Button onPress={onPressHandler} variant={buttonVariant.ACCENT} disabled={isDisabled}>
          Старт
        </Button>
      }
    />
  );
}
