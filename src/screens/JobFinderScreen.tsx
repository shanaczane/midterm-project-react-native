import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useTheme } from "../context/ThemeContext";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const JobFinderScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>
          Job Finder Screen
        </Text>

        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          This is where jobs will be listed
        </Text>

        <View style={styles.placeholder}>
          <View
            style={[
              styles.card,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Sample Job Card #1
            </Text>
            <Text style={[styles.cardText, { color: theme.textSecondary }]}>
              Company Name
            </Text>
            <Text style={[styles.cardText, { color: theme.textSecondary }]}>
              📍 Location
            </Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={() => navigation.navigate("ApplicationForm")}
            >
              <Text style={[styles.buttonText, { color: theme.background }]}>
                Apply (Test Navigation)
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.card,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Sample Job Card #2
            </Text>
            <Text style={[styles.cardText, { color: theme.textSecondary }]}>
              Company Name
            </Text>
            <Text style={[styles.cardText, { color: theme.textSecondary }]}>
              📍 Location
            </Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={() => navigation.navigate("ApplicationForm")}
            >
              <Text style={[styles.buttonText, { color: theme.background }]}>
                Apply (Test Navigation)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JobFinderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  placeholder: {
    gap: 16,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  button: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  info: {
    marginTop: 24,
    fontSize: 13,
    textAlign: "center",
    fontStyle: "italic",
  },
});
