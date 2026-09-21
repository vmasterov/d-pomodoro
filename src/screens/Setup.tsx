import { Layout } from '@/components/Layout';
import type { TSetupProps } from '@/types/screens/setup.type';
import { TimeRange } from '@/components/TimeRange';
import { Button } from '@/components/Button';
import { buttonVariant } from '@/constants/component.const';
import { useEffect, useState } from 'react';
import { loadSettings, saveSettings } from '@storage/index';
import type { TTimeRange } from '@/types/components/timeRange.type';
import { intervals as initialIntervals } from '@core/constants/segment.const';
import { SettingsModal } from '@/components/SettingsModal';
import type { TSegmentIntervals } from '@core/types/common.type';
import { getInitDate } from '@/utils/getInitDate';

export function Setup({ setupStart }: TSetupProps) {
  const [intervals, setIntervals] = useState<TSegmentIntervals>(initialIntervals);
  const [startTimestamp, setStartTimestamp] = useState<number>(() => getInitDate().startTimestamp);
  const [endTimestamp, setEndTimestamp] = useState<number>(() => getInitDate().endTimestamp);

  const endError = startTimestamp >= endTimestamp ? 'Конец раньше начала' : '';

  const updateRangeFieldHandler: TTimeRange['updateRangeField'] = (field, type) => {
    const timestamp = field.getTime();

    if (type === 'start') {
      setStartTimestamp(timestamp);
    } else {
      setEndTimestamp(timestamp);
    }
  };

  const onPressHandler = () => {
    const settings = { startTimestamp, endTimestamp, ...intervals };

    setupStart(settings);
    void saveSettings(settings);
  };

  const initSettings = async () => {
    const settings = await loadSettings();

    if (settings) {
      const { startTimestamp, endTimestamp, workDuration, alertWorkTime, restShort, restLong } =
        settings;

      setStartTimestamp(startTimestamp);
      setEndTimestamp(endTimestamp);

      setIntervals({
        workDuration,
        alertWorkTime,
        restShort,
        restLong,
      });
    }
  };

  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState<boolean>(false);

  const settingsModalCloseHandler = () => {
    setIsSettingsModalVisible(false);
  };

  const saveIntervalSettingsHandler = (intervalsFromModal: TSegmentIntervals) => {
    const settings = { startTimestamp, endTimestamp, ...intervalsFromModal };

    setIntervals(intervalsFromModal);
    void saveSettings(settings);
  };

  const openSettingsModal = () => {
    setIsSettingsModalVisible(true);
  };

  useEffect(() => {
    void initSettings();
  }, []);

  return (
    <Layout
      title="Рабочий диапазон"
      subtitle="Когда сегодня начинается и&nbsp;заканчивается работа"
      content={
        <>
          <TimeRange
            startDate={new Date(startTimestamp)}
            endDate={new Date(endTimestamp)}
            updateRangeField={updateRangeFieldHandler}
            errors={{ endDateErrorText: endError }}
          />
          {isSettingsModalVisible && (
            <SettingsModal
              onClose={settingsModalCloseHandler}
              onSave={saveIntervalSettingsHandler}
              initIntervals={intervals}
            />
          )}
        </>
      }
      controls={
        <>
          <Button
            onPress={onPressHandler}
            variant={buttonVariant.ACCENT}
            disabled={Boolean(endError)}
          >
            Старт
          </Button>
          <Button onPress={openSettingsModal} variant={buttonVariant.DEFAULT}>
            Настройки
          </Button>
        </>
      }
    />
  );
}
