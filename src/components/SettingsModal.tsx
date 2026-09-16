import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button } from '@/components/Button';
import { theme } from '@/constants/theme.const';
import { validateIntervals } from '@core/utils/validateIntervals';
import { useState } from 'react';
import type { TSegmentIntervals } from '@core/types/common.type';
import { buttonVariant } from '@/constants/component.const';

export type TSettingsModalProps = {
  visible: boolean;
  onClose: () => void;
  intervals: TSegmentIntervals;
};

export function SettingsModal({ visible, onClose, intervals }: TSettingsModalProps) {
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [int, setInt] = useState<TSegmentIntervals>(intervals);

  const changeValueHandler = (value: string, name: string) => {
    let newInt = {
      ...int,
      [name]: value ? Number(value) : '',
    };

    if (name === 'short' || name === 'long') {
      newInt = {
        ...int,
        restDuration: {
          ...int.restDuration,
          [name]: value ? Number(value) : '',
        },
      };
    }

    setInt(newInt);
    setErrors(validateIntervals(newInt));
  };

  const requestCloseHandler = () => {
    setInt(intervals);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={requestCloseHandler}
      style={styles.modal}
      transparent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.test}>
          <View style={styles.content}>
            <Text style={styles.title}>Настройки</Text>

            <View>
              <Text>Продолжительность рабочего сегмента</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => changeValueHandler(value, 'workDuration')}
                value={String(int.workDuration)}
                placeholder="useless placeholder"
                keyboardType="number-pad"
              />
              <Text>{errors.workDuration}</Text>

              <Text>Уведомление перед отдыхом</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => changeValueHandler(value, 'alertWorkTime')}
                value={String(int.alertWorkTime)}
                placeholder="useless placeholder"
                keyboardType="number-pad"
              />
              <Text>{errors.alertWorkTime}</Text>

              <Text>Продолжительность короткого сегмента отдыха</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => changeValueHandler(value, 'short')}
                value={String(int.restDuration.short)}
                placeholder="useless placeholder"
                keyboardType="number-pad"
              />
              <Text>{errors.restShort}</Text>

              <Text>Продолжительность длинного сегмента отдыха</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => changeValueHandler(value, 'long')}
                value={String(int.restDuration.long)}
                placeholder="useless placeholder"
                keyboardType="number-pad"
              />
              <Text>{errors.restLong}</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Button onPress={() => {}} variant={buttonVariant.ACCENT}>
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
  modal: {},
  container: {
    flex: 1,
  },
  test: {
    backgroundColor: theme.color.screenBg,
    marginTop: 48,
    marginRight: 16,
    marginBottom: 16,
    marginLeft: 16,
    borderRadius: 28, // придумать дизайн
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
  textInput: {
    color: theme.color.primaryText,
    borderColor: theme.color.mutedText,
    borderRadius: theme.spacing.radius.field,
    borderWidth: 1,
  },
});
