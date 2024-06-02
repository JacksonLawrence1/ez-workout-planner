import { Pressable, Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

interface ExerciseBaseProps {
  label: string;
  backgroundColor: (typeof colors)[keyof typeof colors]; // only allow colors from colors
  icon?: keyof typeof FontAwesome5.glyphMap;
  size?: number;
  onPress?: () => void;
}

export default function ListItem({ label, backgroundColor, size = 24, icon, onPress = () => undefined }: ExerciseBaseProps) {
  // TODO: add icon onPress functions
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Pressable style={styles.buttonContainer} onPress={onPress}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{label}</Text>
        </View>

        <View style={styles.iconsContainer}>
          {icon && (
            <Pressable style={styles.iconContainer}>
              <FontAwesome5 name={icon} size={size} color={colors.text} />
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    height: 52, 
    width: "100%",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    paddingHorizontal: 4,
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  textContainer: {
    flex: 9,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    fontFamily: "Rubik-Regular",
  },
});
