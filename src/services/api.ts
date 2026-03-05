import uuid from "react-native-uuid";
import { Job } from "../types";

const API_URL = "https://empllo.com/api/v1";

export const fetchJobs = async (): Promise<Job[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status}`);
  }
  const data = await response.json();
  const jobsArray: any[] = data.jobs || [];

  return jobsArray.map((job: any) => ({
    id: uuid.v4() as string,
    title: job.title || "",
    mainCategory: job.mainCategory || "",
    companyName: job.companyName || "",
    companyLogo: job.companyLogo || undefined,
    jobType: job.jobType || "",
    workModel: job.workModel || "",
    seniorityLevel: job.seniorityLevel || "",
    minSalary: job.minSalary || undefined,
    maxSalary: job.maxSalary || undefined,
    currency: job.currency || undefined,
    locations: job.locations || [],
    tags: job.tags || [],
    description: job.description || undefined,
    pubDate: job.pubDate || undefined,
    expiryDate: job.expiryDate || undefined,
    applicationLink: job.applicationLink || undefined,
  }));
};
