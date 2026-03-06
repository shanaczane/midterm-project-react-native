import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Job } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { useSavedJobs } from "../../context/SavedJobContext";
import { styles } from "./SavedJobsScreen.style";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SavedJobsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { savedJobs, removeJob, isJobApplied } = useSavedJobs();

  const handleRemove = (job: Job) => {
    Alert.alert(
      "Remove Job",
      `Remove "${job.title}" from saved jobs?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => removeJob(job.id),
        },
      ]
    );
  };

  const formatSalary = (job: Job) =>
    job.minSalary && job.maxSalary
      ? `${job.currency || "USD"} ${job.minSalary.toLocaleString()} – ${job.maxSalary.toLocaleString()}`
      : "Salary not specified";

  if (savedJobs.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
        edges={["left", "right", "bottom"]}
      >
        <View style={styles.centered}>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No Saved Jobs
          </Text>
          <Text style={[styles.emptySubText, { color: theme.textSecondary }]}>
            Jobs you save will appear here. Go to Job Finder to start saving
            jobs.
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
          {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
        </Text>
        <FlatList
          data={savedJobs}
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
                        <Text
                          style={[styles.tagText, { color: theme.textSecondary }]}
                        >
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      styles.buttonOutline,
                      { borderColor: theme.error },
                    ]}
                    onPress={() => handleRemove(item)}
                  >
                    <Text style={[styles.buttonText, { color: theme.error }]}>
                      Remove
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: isJobApplied(item.id)
                          ? theme.success
                          : theme.primary,
                      },
                    ]}
                    onPress={() => {
                      if (isJobApplied(item.id)) {
                        Alert.alert(
                          "Already Applied",
                          `You have already applied for "${item.title}" at ${item.companyName}.`
                        );
                      } else {
                        navigation.navigate("ApplicationForm", {
                          job: item,
                          fromSavedJobs: true,
                        });
                      }
                    }}
                  >
                    <Text
                      style={[styles.buttonText, { color: theme.background }]}
                    >
                      {isJobApplied(item.id) ? "Applied ✓" : "Apply"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SavedJobsScreen;
