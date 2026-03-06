import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { useSavedJobs } from "../../context/SavedJobContext";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateWhyHireYou,
} from "../../utils/validation";
import { styles } from "./ApplicationFormScreen.style";

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, "ApplicationForm">;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  whyHireYou?: string;
}

const ApplicationFormScreen = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RouteProps>();
  const { theme } = useTheme();

  const { markApplied, isJobApplied } = useSavedJobs();
  const { job, fromSavedJobs } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whyHireYou, setWhyHireYou] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };

  const salary =
    job.minSalary && job.maxSalary
      ? `${job.currency || "USD"} ${job.minSalary.toLocaleString()} – ${job.maxSalary.toLocaleString()}`
      : "Salary not specified";

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    const whyErr = validateWhyHireYou(whyHireYou);

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (whyErr) newErrors.whyHireYou = whyErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (isJobApplied(job.id)) {
      navigation.goBack();
      return;
    }
    if (!validate()) return;
    markApplied(job);
    setShowSuccess(true);
  };

  const handleOkay = () => {
    setShowSuccess(false);
    // Clear form
    setName("");
    setEmail("");
    setPhone("");
    setWhyHireYou("");
    setErrors({});

    if (fromSavedJobs) {
      // Navigate back to Job Finder tab
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Main",
            state: { routes: [{ name: "JobFinder" }], index: 0 },
          },
        ],
      });
    } else {
      navigation.goBack();
    }
  };

  const inputStyle = (field: keyof FormErrors) => [
    styles.input,
    {
      backgroundColor: theme.card,
      color: theme.text,
      borderColor: errors[field] ? theme.error : theme.border,
    },
    errors[field] ? styles.inputError : undefined,
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["left", "right", "bottom"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Job Summary Card */}
          <View
            style={[
              styles.jobCard,
              { backgroundColor: theme.card, borderColor: theme.border },
            ]}
          >
            <View style={styles.jobCardHeader}>
              {!!job.companyLogo && (
                <Image
                  source={{ uri: job.companyLogo }}
                  style={styles.jobLogo}
                  resizeMode="contain"
                />
              )}
              <View style={styles.jobCardHeaderText}>
                <Text style={[styles.jobTitle, { color: theme.text }]}>
                  {job.title}
                </Text>
                <Text style={[styles.jobCompany, { color: theme.textSecondary }]}>
                  {job.companyName}
                </Text>
              </View>
            </View>
            <View style={styles.jobMetaList}>
              {job.locations.length > 0 && (
                <View style={styles.jobMetaRow}>
                  <Ionicons name="location-outline" size={13} color={theme.textTertiary} />
                  <Text style={[styles.jobMeta, { color: theme.textTertiary }]}>
                    {job.locations.join(", ")}
                  </Text>
                </View>
              )}
              {!!job.workModel && (
                <View style={styles.jobMetaRow}>
                  <Ionicons name="briefcase-outline" size={13} color={theme.textTertiary} />
                  <Text style={[styles.jobMeta, { color: theme.textTertiary }]}>
                    {job.workModel}
                  </Text>
                </View>
              )}
              <View style={styles.jobMetaRow}>
                <Ionicons name="cash-outline" size={13} color={theme.textTertiary} />
                <Text style={[styles.jobMeta, { color: theme.textTertiary }]}>
                  {salary}
                </Text>
              </View>
            </View>
          </View>

          {/* Application Form */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Application Form
          </Text>

          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Full Name *
            </Text>
            <TextInput
              style={inputStyle("name")}
              value={name}
              onChangeText={(t) => {
                setName(t);
                if (errors.name) setErrors((e) => ({ ...e, name: undefined }));
              }}
              placeholder="Enter your full name"
              placeholderTextColor={theme.textTertiary}
              autoCapitalize="words"
              returnKeyType="next"
            />
            {errors.name && (
              <Text style={[styles.errorText, { color: theme.error }]}>
                {errors.name}
              </Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Email Address *
            </Text>
            <TextInput
              style={inputStyle("email")}
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (errors.email)
                  setErrors((e) => ({ ...e, email: undefined }));
              }}
              placeholder="Enter your email address"
              placeholderTextColor={theme.textTertiary}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            {errors.email && (
              <Text style={[styles.errorText, { color: theme.error }]}>
                {errors.email}
              </Text>
            )}
          </View>

          {/* Contact Number */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Contact Number *
            </Text>
            <TextInput
              style={inputStyle("phone")}
              value={phone}
              onChangeText={(t) => {
                setPhone(t);
                if (errors.phone)
                  setErrors((e) => ({ ...e, phone: undefined }));
              }}
              placeholder="Enter your contact number"
              placeholderTextColor={theme.textTertiary}
              keyboardType="phone-pad"
              returnKeyType="next"
            />
            {errors.phone && (
              <Text style={[styles.errorText, { color: theme.error }]}>
                {errors.phone}
              </Text>
            )}
          </View>

          {/* Why should we hire you */}
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: theme.text }]}>
              Why should we hire you? *
            </Text>
            <TextInput
              style={[
                styles.textarea,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.whyHireYou ? theme.error : theme.border,
                },
                errors.whyHireYou ? styles.inputError : undefined,
              ]}
              value={whyHireYou}
              onChangeText={(t) => {
                setWhyHireYou(t);
                if (errors.whyHireYou)
                  setErrors((e) => ({ ...e, whyHireYou: undefined }));
              }}
              placeholder="Tell us why you'd be a great fit (min. 50 characters)..."
              placeholderTextColor={theme.textTertiary}
              multiline
              maxLength={500}
              returnKeyType="done"
              onFocus={scrollToBottom}
            />
            {errors.whyHireYou && (
              <Text style={[styles.errorText, { color: theme.error }]}>
                {errors.whyHireYou}
              </Text>
            )}
            <Text
              style={[
                styles.charCount,
                {
                  color:
                    whyHireYou.length >= 500
                      ? theme.error
                      : theme.textTertiary,
                },
              ]}
            >
              {whyHireYou.length} / 500
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: theme.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.submitButtonText, { color: theme.background }]}>
              Submit Application
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal transparent visible={showSuccess} animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalBox, { backgroundColor: theme.card }]}
          >
            <Ionicons name="checkmark-circle" size={60} color={theme.success} style={styles.modalIcon} />
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Application Submitted!
            </Text>
            <Text style={[styles.modalMessage, { color: theme.textSecondary }]}>
              Your application for{" "}
              <Text style={{ fontWeight: "700", color: theme.text }}>
                {job.title}
              </Text>{" "}
              at{" "}
              <Text style={{ fontWeight: "700", color: theme.text }}>
                {job.companyName}
              </Text>{" "}
              has been submitted successfully. Good luck!
            </Text>
            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: theme.primary }]}
              onPress={handleOkay}
            >
              <Text
                style={[styles.modalButtonText, { color: theme.background }]}
              >
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ApplicationFormScreen;
