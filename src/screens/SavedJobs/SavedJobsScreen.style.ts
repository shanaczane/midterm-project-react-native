import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    textAlign: "center",
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },
  cardCompany: {
    fontSize: 14,
    fontWeight: "500",
  },
  cardMeta: {
    gap: 4,
    marginBottom: 12,
  },
  cardMetaText: {
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
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonOutline: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  countText: {
    fontSize: 13,
    marginBottom: 12,
  },
});
