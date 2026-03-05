import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 200,
  },
  jobCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
  },
  jobMeta: {
    fontSize: 13,
    lineHeight: 20,
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
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 48,
  },
  inputError: {
    borderWidth: 2,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    minHeight: 130,
    textAlignVertical: "top",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
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
    marginTop: 10,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  modalBox: {
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    width: "100%",
    maxWidth: 340,
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
