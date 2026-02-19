import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

const ApplicationFormScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView style={styles.content}>
        <View
          style={[
            styles.jobCard,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.jobTitle, { color: theme.text }]}>
            Sample Job Title
          </Text>
          <Text style={[styles.jobCompany, { color: theme.textSecondary }]}>
            Company Name
          </Text>
          <Text style={[styles.jobMeta, { color: theme.textTertiary }]}>
            📍 Location • 💼 Full-time
          </Text>
        </View>

        <View style={styles.formSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Application Form
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Full Name *
            </Text>
            <View
              style={[
                styles.input,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.placeholder, { color: theme.textTertiary }]}>
                Form field placeholder
              </Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Email Address *
            </Text>
            <View
              style={[
                styles.input,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.placeholder, { color: theme.textTertiary }]}>
                Form field placeholder
              </Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Contact Number *
            </Text>
            <View
              style={[
                styles.input,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.placeholder, { color: theme.textTertiary }]}>
                Form field placeholder
              </Text>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Why should we hire you? *
            </Text>
            <View
              style={[
                styles.textarea,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.placeholder, { color: theme.textTertiary }]}>
                Large text area placeholder
              </Text>
            </View>
            <Text style={[styles.charCount, { color: theme.textTertiary }]}>
              0 / 500
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.primary }]}
            onPress={() => {
              alert("Form submission will be implemented next!");
              navigation.goBack();
            }}
          >
            <Text
              style={[styles.submitButtonText, { color: theme.background }]}
            >
              Submit Application (Test)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  jobCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 20,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 15,
    marginBottom: 8,
  },
  jobMeta: {
    fontSize: 13,
  },
  formSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 44,
    justifyContent: "center",
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
  },
  placeholder: {
    fontSize: 14,
  },
  charCount: {
    fontSize: 12,
    textAlign: "right",
    marginTop: 4,
  },
  submitButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  info: {
    fontSize: 13,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 16,
    marginBottom: 40,
  },
});
