import { Modal, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '@/components/Button';
import { theme } from '@/constants/theme.const';
import { validateIntervals } from '@core/utils/validateIntervals';
import { useState } from 'react';
import { buttonVariant } from '@/constants/component.const';
import type { TPossibleEmptySegmentIntervals } from '@core/types/common.type';
import { InputField } from '@/components/InputField';
import type { TSettingsModalProps } from '@/types/components/settingsModal.type';
import { checkIsIntervalHasErrors } from '@core/utils/checkIsIntervalHasErrors';

export function SettingsModal({ onClose, onSave, initIntervals }: TSettingsModalProps) {
  const [intervals, setIntervals] = useState<TPossibleEmptySegmentIntervals>(initIntervals);

  const changeValueHandler = (value: string, name: keyof TPossibleEmptySegmentIntervals) => {
    const stringValue = value.replace(/\D+/g, '');
    const numberValue = stringValue === '' ? null : Number(stringValue);

    const newIntervals = {
      ...intervals,
      [name]: numberValue,
    };

    setIntervals(newIntervals);
  };

  const requestCloseHandler = () => {
    onClose();
  };

  const pressSaveButtonHandler = () => {
    const { workDuration, alertWorkTime, restShort, restLong } = intervals;

    if (
      !isIntervalErrors &&
      workDuration !== null &&
      alertWorkTime !== null &&
      restShort !== null &&
      restLong !== null
    ) {
      onSave({
        workDuration,
        alertWorkTime,
        restLong,
        restShort,
      });
      onClose();
    }
  };

  const possibleEmptyErrors = validateIntervals(intervals);
  const isIntervalErrors = checkIsIntervalHasErrors(possibleEmptyErrors);

  return (
    <Modal animationType="slide" onRequestClose={requestCloseHandler} transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.fieldsWrapper}>
          <View style={styles.content}>
            <Text style={styles.title}>Настройки</Text>
            <View>
              <InputField
                onChangeText={changeValueHandler}
                name={'workDuration'}
                value={intervals.workDuration}
                label="Продолжительность рабочего сегмента"
                error={possibleEmptyErrors.workDuration}
              />

              <InputField
                onChangeText={changeValueHandler}
                name={'alertWorkTime'}
                value={intervals.alertWorkTime}
                label="Уведомление перед отдыхом"
                error={possibleEmptyErrors.alertWorkTime}
              />

              <InputField
                onChangeText={changeValueHandler}
                name={'restShort'}
                value={intervals.restShort}
                label="Продолжительность короткого сегмента отдыха"
                error={possibleEmptyErrors.restShort}
              />

              <InputField
                onChangeText={changeValueHandler}
                name={'restLong'}
                value={intervals.restLong}
                label="Продолжительность длинного сегмента отдыха"
                error={possibleEmptyErrors.restLong}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <Button
              onPress={pressSaveButtonHandler}
              variant={buttonVariant.ACCENT}
              disabled={isIntervalErrors}
            >
              Сохранить
            </Button>
            <Button onPress={requestCloseHandler}>Закрыть</Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fieldsWrapper: {
    backgroundColor: theme.color.screenBg,
    marginTop: 48,
    marginRight: 16,
    marginBottom: 16,
    marginLeft: 16,
    borderRadius: 28,
    flex: 1,
    padding: 18,
    shadowColor: theme.color.primaryText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  footer: {},
  title: {
    ...theme.typography.title,
    color: theme.color.primaryText,
    marginVertical: theme.spacing.gap.s,
    textAlign: 'center',
  },
});
