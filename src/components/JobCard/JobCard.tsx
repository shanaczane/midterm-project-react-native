import React from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Job } from "../../types";
import { Theme } from "../../constants/theme";
import { styles } from "./JobCard.style";

interface JobCardProps {
  job: Job;
  theme: Theme;
  isSaved: boolean;
  isApplied: boolean;
  onSave: () => void;
  onUnsave: () => void;
  onApply: () => void;
}

const JobCard = ({ job, theme, isSaved, isApplied, onSave, onUnsave, onApply }: JobCardProps) => {
  const salary =
    job.minSalary && job.maxSalary
      ? `${job.currency || "USD"} ${job.minSalary.toLocaleString()} – ${job.maxSalary.toLocaleString()}`
      : "Salary not specified";

  const handleSavePress = () => {
    if (isSaved) {
      Alert.alert(
        "Remove from Saved",
        `Remove "${job.title}" from your saved jobs?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", style: "destructive", onPress: onUnsave },
        ]
      );
    } else {
      onSave();
    }
  };

  const handleApplyPress = () => {
    if (isApplied) {
      Alert.alert(
        "Already Applied",
        `You have already applied for "${job.title}" at ${job.companyName}.`
      );
    } else {
      onApply();
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.header}>
        {!!job.companyLogo && (
          <Image
            source={{ uri: job.companyLogo }}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {job.title}
          </Text>
          <Text style={[styles.company, { color: theme.textSecondary }]}>
            {job.companyName}
          </Text>
        </View>
      </View>

      <View style={styles.meta}>
        {job.locations.length > 0 && (
          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {job.locations.join(", ")}
            </Text>
          </View>
        )}
        <View style={styles.metaRow}>
          <Ionicons name="briefcase-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            {job.jobType}{job.workModel ? ` • ${job.workModel}` : ""}
          </Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="cash-outline" size={14} color={theme.textSecondary} />
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            {salary}
          </Text>
        </View>
        {!!job.seniorityLevel && (
          <View style={styles.metaRow}>
            <Ionicons name="star-outline" size={14} color={theme.textSecondary} />
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {job.seniorityLevel}
            </Text>
          </View>
        )}
      </View>

      {job.tags.length > 0 && (
        <View style={styles.tags}>
          {job.tags.slice(0, 4).map((tag, i) => (
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

      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.button,
            isSaved
              ? { backgroundColor: theme.success }
              : { borderWidth: 1, borderColor: theme.primary },
          ]}
          onPress={handleSavePress}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isSaved ? "#fff" : theme.primary },
            ]}
          >
            {isSaved ? "Saved ✓" : "Save Job"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            isApplied
              ? { backgroundColor: theme.success }
              : { backgroundColor: theme.primary },
          ]}
          onPress={handleApplyPress}
        >
          <Text style={[styles.buttonText, { color: theme.background }]}>
            {isApplied ? "Applied ✓" : "Apply"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobCard;
