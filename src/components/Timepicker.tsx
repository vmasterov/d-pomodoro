import { useMemo } from 'react';
import { Button } from '@/components/Button';
import { StyleSheet, Text, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { theme } from '@/constants/theme.const';
import { convertTimestampToFormatedString } from '@core/utils/date.util';
import { TIMEPICKER_PLACEHOLDER } from '@/constants/component.const';
import type { TTimepicker } from '@/types/timepicker.type';

export function Timepicker({ startDate, endDate, updateRangeField, errors }: TTimepicker) {
  const formatedStartTime = useMemo(
    () => (startDate ? convertTimestampToFormatedString(startDate) : TIMEPICKER_PLACEHOLDER),
    [startDate],
  );

  const formatedEndTime = useMemo(
    () => (endDate ? convertTimestampToFormatedString(endDate) : TIMEPICKER_PLACEHOLDER),
    [endDate],
  );

  const startError = useMemo(() => errors?.startDateErrorText ?? '', [errors?.startDateErrorText]);
  const endError = useMemo(() => {
    console.log(errors);
    return errors?.endDateErrorText ?? '';
  }, [errors?.endDateErrorText]);

  const showStartTimepicker = () => {
    DateTimePickerAndroid.open({
      value: startDate ?? new Date(),
      onValueChange: (event, selectedDate) => updateRangeField(selectedDate),
      mode: 'time',
      is24Hour: true,
    });
  };

  const showEndTimepicker = () => {
    DateTimePickerAndroid.open({
      value: endDate ?? new Date(),
      onValueChange: (event, selectedDate) => updateRangeField(selectedDate, false),
      mode: 'time',
      is24Hour: true,
    });
  };

  return (
    <View style={styles.fieldsWrapper}>
      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Начало</Text>
        <Button onPress={showStartTimepicker} mod="field">
          {formatedStartTime}
        </Button>
        <Text>{startError}</Text>
      </View>

      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Конец</Text>
        <Button onPress={showEndTimepicker} variant={'danger'} mod="field">
          {formatedEndTime}
        </Button>
        <Text>{endError}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...theme.typography.label,
    color: theme.color.mutedText,
  },
  fieldsWrapper: {
    gap: theme.spacing.gap.l,
  },
  fieldWrapper: {
    gap: theme.spacing.gap.s,
  },
});
