import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TSetupProps } from '@/types/setup.type';
import { theme } from '@/constants/theme.const';
import { Timepicker } from '@/components/Timepicker';
import { Button } from '@/components/Button';
import { buttonVariant, INIT_TIMEPICKER_ERRORS } from '@/constants/component.const';
import { useEffect, useMemo, useState } from 'react';
import { loadSettings } from '@storage/index';
import type { TTimepicker, TTimepickerError } from '@/types/timepicker.type';

export function Setup({ setupStart }: TSetupProps) {
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [endTimestamp, setEndTimestamp] = useState<number | null>(null);
  const [errors, setErrors] = useState<TTimepickerError>(INIT_TIMEPICKER_ERRORS);

  console.log(setupStart);

  const startDateMemo = useMemo(
    () => (startTimestamp ? new Date(startTimestamp) : null),
    [startTimestamp],
  );
  const endDateMemo = useMemo(() => (endTimestamp ? new Date(endTimestamp) : null), [endTimestamp]);

  const isErrors = useMemo(() => Object.values(errors).some((error) => error), [errors]);

  const isDisabled = useMemo(
    () => !(startTimestamp && endTimestamp && !isErrors),
    [startTimestamp, endTimestamp, isErrors],
  );

  const validateTimepicker = () => {
    setErrors(INIT_TIMEPICKER_ERRORS);

    if (startTimestamp && endTimestamp && startTimestamp > endTimestamp) {
      alert('Конец раньше начала');
      setErrors({ ...errors, endDateErrorText: 'Конец раньше начала' });
    }
  };

  const updateRangeFieldHandler: TTimepicker['updateRangeField'] = (field, isStart = true) => {
    const timestamp = field.getTime();

    if (isStart) {
      setStartTimestamp(timestamp);
    } else {
      setEndTimestamp(timestamp);
    }
  };

  const onPressHandler = () => {};

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

  useEffect(() => {
    validateTimepicker();
  }, [startTimestamp, endTimestamp]);

  return (
    <Layout>
      <View>
        <Text style={styles.title}>Рабочий диапазон</Text>
        <Text style={styles.subtitle}>Когда сегодня начинается и&nbsp;заканчивается работа</Text>

        <View style={styles.block}>
          <Timepicker
            startDate={startDateMemo}
            endDate={endDateMemo}
            updateRangeField={updateRangeFieldHandler}
            errors={errors}
          />
          <Button
            onPress={() => onPressHandler()}
            variant={buttonVariant.ACCENT}
            disabled={isDisabled}
          >
            Старт
          </Button>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    ...theme.typography.title,
    color: theme.color.primaryText,
    marginVertical: theme.spacing.gap.s,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.subtitle,
    color: theme.color.mutedText,
    textAlign: 'center',
  },
  block: {
    gap: theme.spacing.gap.l,
  },
});
