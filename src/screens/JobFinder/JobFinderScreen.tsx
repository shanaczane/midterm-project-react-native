import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, Job } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { useSavedJobs } from "../../context/SavedJobContext";
import { fetchJobs } from "../../services/api";
import JobCard from "../../components/JobCard/JobCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { styles } from "./JobFinderScreen.style";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const JobFinderScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const { saveJob, removeJob, isJobSaved, isJobApplied } = useSavedJobs();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs();
      setJobs(data);
    } catch (err: any) {
      setError(err.message || "Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return jobs;
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q) ||
        job.locations.some((l) => l.toLowerCase().includes(q)) ||
        job.tags.some((t) => t.toLowerCase().includes(q)) ||
        job.mainCategory.toLowerCase().includes(q) ||
        job.workModel.toLowerCase().includes(q)
    );
  }, [jobs, searchQuery]);

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Loading jobs...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.centered}>
          <Text style={[styles.errorText, { color: theme.error }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.primary }]}
            onPress={loadJobs}
          >
            <Text style={[styles.retryText, { color: theme.background }]}>
              Retry
            </Text>
          </TouchableOpacity>
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
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          theme={theme}
        />
        {searchQuery.trim().length > 0 && (
          <Text style={[styles.resultsCount, { color: theme.textTertiary }]}>
            {filteredJobs.length} result{filteredJobs.length !== 1 ? "s" : ""}{" "}
            for "{searchQuery}"
          </Text>
        )}
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              No jobs found matching your search.
            </Text>
          }
          renderItem={({ item }) => (
            <JobCard
              job={item}
              theme={theme}
              isSaved={isJobSaved(item.id)}
              isApplied={isJobApplied(item.id)}
              onSave={() => saveJob(item)}
              onUnsave={() => removeJob(item.id)}
              onApply={() =>
                navigation.navigate("ApplicationForm", {
                  job: item,
                  fromSavedJobs: false,
                })
              }
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default JobFinderScreen;
