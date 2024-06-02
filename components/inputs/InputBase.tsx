import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '@/constants/colors';

export interface InputBaseProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  inputMode?: TextInputProps["inputMode"];
}

export default function InputBase({ placeholder, onChangeText, inputMode = "text" }: InputBaseProps) {
  return <TextInput
        style={styles.inputStyle}
        placeholder={placeholder || "Search..."}
        placeholderTextColor={colors.textDark}
        onChangeText={onChangeText}
        inputMode={inputMode}
      />
}

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
    fontFamily: "Rubik-Regular",
    color: colors.text,
    maxHeight: 48,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
});

