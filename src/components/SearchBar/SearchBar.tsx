import React from "react";
import { View, TextInput } from "react-native";
import { Theme } from "../../constants/theme";
import { styles } from "./SearchBar.style";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  theme: Theme;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChangeText,
  theme,
  placeholder = "Search jobs, companies, tags...",
}: SearchBarProps) => (
  <View
    style={[
      styles.container,
      { backgroundColor: theme.card, borderColor: theme.border },
    ]}
  >
    <TextInput
      style={[styles.input, { color: theme.text }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.textTertiary}
      returnKeyType="search"
      clearButtonMode="while-editing"
    />
  </View>
);

export default SearchBar;
