import AsyncStorage from "@react-native-async-storage/async-storage";
import { Job } from "../types";

const SAVED_JOBS_KEY = "@saved_jobs";
const APPLIED_JOBS_KEY = "@applied_jobs";

export const getSavedJobs = async (): Promise<Job[]> => {
  try {
    const data = await AsyncStorage.getItem(SAVED_JOBS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const storeSavedJobs = async (jobs: Job[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(jobs));
  } catch (error) {
    console.error("Failed to store saved jobs:", error);
  }
};

export const getAppliedJobs = async (): Promise<Job[]> => {
  try {
    const data = await AsyncStorage.getItem(APPLIED_JOBS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const storeAppliedJobs = async (jobs: Job[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(jobs));
  } catch (error) {
    console.error("Failed to store applied jobs:", error);
  }
};
