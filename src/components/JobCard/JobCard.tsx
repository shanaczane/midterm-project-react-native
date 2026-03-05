import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Job } from "../../types";
import { Theme } from "../../constants/theme";
import { styles } from "./JobCard.style";

interface JobCardProps {
  job: Job;
  theme: Theme;
  isSaved: boolean;
  onSave: () => void;
  onApply: () => void;
}

const JobCard = ({ job, theme, isSaved, onSave, onApply }: JobCardProps) => {
  const salary =
    job.minSalary && job.maxSalary
      ? `${job.currency || "USD"} ${job.minSalary.toLocaleString()} – ${job.maxSalary.toLocaleString()}`
      : "Salary not specified";

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[styles.title, { color: theme.text }]}
          numberOfLines={2}
        >
          {job.title}
        </Text>
        <Text style={[styles.company, { color: theme.textSecondary }]}>
          {job.companyName}
        </Text>
      </View>

      <View style={styles.meta}>
        {job.locations.length > 0 && (
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            📍 {job.locations.join(", ")}
          </Text>
        )}
        <Text style={[styles.metaText, { color: theme.textSecondary }]}>
          💼 {job.jobType}
          {job.workModel ? ` • ${job.workModel}` : ""}
        </Text>
        <Text style={[styles.metaText, { color: theme.textSecondary }]}>
          💰 {salary}
        </Text>
        {!!job.seniorityLevel && (
          <Text style={[styles.metaText, { color: theme.textSecondary }]}>
            🎯 {job.seniorityLevel}
          </Text>
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
          onPress={onSave}
          disabled={isSaved}
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
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={onApply}
        >
          <Text style={[styles.buttonText, { color: theme.background }]}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JobCard;
