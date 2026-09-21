import { StyleSheet, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { theme } from '@/constants/theme.const';
import { convertDateToFormattedTime } from '@core/utils/date.util';
import type { TTimeRange } from '@/types/components/timeRange.type';
import { TimeField } from '@/components/TimeField';
import type { TFieldType } from '@/types/components/timeField.type';

export function TimeRange({ startDate, endDate, updateRangeField, errors }: TTimeRange) {
  const formattedStartTime = convertDateToFormattedTime(startDate);
  const formattedEndTime = convertDateToFormattedTime(endDate);

  const showTimepicker = (date: Date, fieldType: TFieldType) => {
    DateTimePickerAndroid.open({
      value: date,
      onValueChange: (event, selectedDate) => updateRangeField(selectedDate, fieldType),
      mode: 'time',
      is24Hour: true,
    });
  };

  return (
    <View style={styles.fieldsWrapper}>
      <TimeField
        onPress={() => showTimepicker(startDate, 'start')}
        formattedTime={formattedStartTime}
        label="Начало"
      />
      <TimeField
        onPress={() => showTimepicker(endDate, 'end')}
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
