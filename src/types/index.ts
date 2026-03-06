export interface Job {
  id: string;
  title: string;
  mainCategory: string;
  companyName: string;
  companyLogo?: string;
  jobType: string;
  workModel: string;
  seniorityLevel: string;
  minSalary?: number;
  maxSalary?: number;
  currency?: string;
  locations: string[];
  tags: string[];
  description?: string;
  pubDate?: number;
  expiryDate?: number;
  applicationLink?: string;
}

export type RootStackParamList = {
  Main: undefined;
  ApplicationForm: { job: Job; fromSavedJobs?: boolean };
};

export type TabParamList = {
  JobFinder: undefined;
  SavedJobs: undefined;
  AppliedJobs: undefined;
};
