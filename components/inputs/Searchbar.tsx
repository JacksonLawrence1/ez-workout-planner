import { View, StyleSheet } from "react-native";
import { FontAwesome5  } from "@expo/vector-icons";

import InputBase from "./InputBase";
import { InputBaseProps } from "./InputBase";

import { colors } from "@/constants/colors";

export default function Searchbar({ placeholder }: InputBaseProps) {
  // TODO: add onChangeText function to update search results
  return (
    <View style={styles.searchbarContainer}>
      <FontAwesome5 name="search" size={16} color={colors.textDark} />
      <InputBase placeholder={placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 48,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
  },
});
