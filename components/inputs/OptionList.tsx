import { View, Text, Pressable, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

interface OptionListProps {
  selected: string;
  options: string[];
  setSelected: (value: string) => void;
}

export default function OptionList({ selected, options, setSelected }: OptionListProps) {
  if (options.length === 0) {
    return null;
  }

  return (
    <View style={styles.optionsContainer}>
      <View style={styles.offset}></View>
      {options.map(option => {
        if (option !== selected) {
          return (
            <Pressable key={option} onPress={() => setSelected(option)}>
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.tertiary,
    borderRadius: 8,
  },
  offset: {
    height: 48,
    borderColor: Colors.secondary,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 16,
    color: Colors.textDark,
    paddingVertical: 12,
    paddingHorizontal: 8,
    textTransform: "capitalize",
  },
});
