import { StyleSheet, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { theme } from '@/constants/theme.const';
import { convertDateToFormattedString } from '@core/utils/date.util';
import { TIMEPICKER_PLACEHOLDER } from '@/constants/component.const';
import type { TTimeRange } from '@/types/timeRange.type';
import { TimeField } from '@/components/TimeField';

export function TimeRange({ startDate, endDate, updateRangeField, errors }: TTimeRange) {
  const formattedStartTime = startDate
    ? convertDateToFormattedString(startDate)
    : TIMEPICKER_PLACEHOLDER;

  const formattedEndTime = endDate ? convertDateToFormattedString(endDate) : TIMEPICKER_PLACEHOLDER;

  const showStartTimepicker = () => {
    DateTimePickerAndroid.open({
      value: startDate ?? new Date(),
      onValueChange: (event, selectedDate) => updateRangeField(selectedDate, 'start'),
      mode: 'time',
      is24Hour: true,
    });
  };

  const showEndTimepicker = () => {
    DateTimePickerAndroid.open({
      value: endDate ?? new Date(),
      onValueChange: (event, selectedDate) => updateRangeField(selectedDate, 'end'),
      mode: 'time',
      is24Hour: true,
    });
  };

  return (
    <View style={styles.fieldsWrapper}>
      <TimeField onPress={showStartTimepicker} formattedTime={formattedStartTime} label="Начало" />
      <TimeField
        onPress={showEndTimepicker}
        formattedTime={formattedEndTime}
        label="Конец"
        error={errors?.endDateErrorText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldsWrapper: {
    gap: theme.spacing.gap.l,
  },
});
