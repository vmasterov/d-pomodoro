export type TFieldType = 'start' | 'end';

export type TTimeFieldProps = {
  onPress: () => void;
  formattedTime: string;
  label: string;
  error?: string;
};
