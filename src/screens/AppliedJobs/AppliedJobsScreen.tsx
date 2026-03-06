import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Job } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { useSavedJobs } from "../../context/SavedJobContext";
import { styles } from "./AppliedJobsScreen.style";

const AppliedJobsScreen = () => {
  const { theme } = useTheme();
  const { appliedJobs } = useSavedJobs();

  const formatSalary = (job: Job) =>
    job.minSalary && job.maxSalary
      ? `${job.currency || "USD"} ${job.minSalary.toLocaleString()} – ${job.maxSalary.toLocaleString()}`
      : "Salary not specified";

  if (appliedJobs.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
        edges={["left", "right", "bottom"]}
      >
        <View style={styles.centered}>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No Applied Jobs
          </Text>
          <Text style={[styles.emptySubText, { color: theme.textSecondary }]}>
            Jobs you apply for will appear here. Go to Job Finder to start
            applying.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
      edges={["left", "right", "bottom"]}
    >
      <View style={styles.content}>
        <Text style={[styles.countText, { color: theme.textTertiary }]}>
          {appliedJobs.length} applied job{appliedJobs.length !== 1 ? "s" : ""}
        </Text>
        <FlatList
          data={appliedJobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const salary = formatSalary(item);
            return (
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  {!!item.companyLogo && (
                    <Image
                      source={{ uri: item.companyLogo }}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                  )}
                  <View style={styles.cardHeaderText}>
                    <Text
                      style={[styles.cardTitle, { color: theme.text }]}
                      numberOfLines={2}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[styles.cardCompany, { color: theme.textSecondary }]}
                    >
                      {item.companyName}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardMeta}>
                  {item.locations.length > 0 && (
                    <View style={styles.metaRow}>
                      <Ionicons name="location-outline" size={14} color={theme.textSecondary} />
                      <Text style={[styles.cardMetaText, { color: theme.textSecondary }]}>
                        {item.locations.join(", ")}
                      </Text>
                    </View>
                  )}
                  <View style={styles.metaRow}>
                    <Ionicons name="briefcase-outline" size={14} color={theme.textSecondary} />
                    <Text style={[styles.cardMetaText, { color: theme.textSecondary }]}>
                      {item.jobType}{item.workModel ? ` • ${item.workModel}` : ""}
                    </Text>
                  </View>
                  <View style={styles.metaRow}>
                    <Ionicons name="cash-outline" size={14} color={theme.textSecondary} />
                    <Text style={[styles.cardMetaText, { color: theme.textSecondary }]}>
                      {salary}
                    </Text>
                  </View>
                  {!!item.seniorityLevel && (
                    <View style={styles.metaRow}>
                      <Ionicons name="star-outline" size={14} color={theme.textSecondary} />
                      <Text style={[styles.cardMetaText, { color: theme.textSecondary }]}>
                        {item.seniorityLevel}
                      </Text>
                    </View>
                  )}
                </View>

                {item.tags.length > 0 && (
                  <View style={styles.tags}>
                    {item.tags.slice(0, 4).map((tag, i) => (
                      <View
                        key={i}
                        style={[
                          styles.tag,
                          {
                            backgroundColor: theme.background,
                            borderColor: theme.border,
                          },
                        ]}
                      >
                        <Text style={[styles.tagText, { color: theme.textSecondary }]}>
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={[styles.appliedBadge, { backgroundColor: theme.success + "20" }]}>
                  <Ionicons name="checkmark-circle" size={16} color={theme.success} />
                  <Text style={[styles.appliedBadgeText, { color: theme.success }]}>
                    Applied
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AppliedJobsScreen;
