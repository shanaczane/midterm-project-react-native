import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    fontWeight: "500",
  },
  meta: {
    gap: 4,
    marginBottom: 10,
  },
  metaText: {
    fontSize: 13,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 12,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
