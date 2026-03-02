import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Job } from "../types";
import { getSavedJobs, storeSavedJobs } from "../utils/storage";

interface SavedJobContextType {
  savedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
}

const SavedJobContext = createContext<SavedJobContextType | undefined>(
  undefined
);

export const SavedJobProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    getSavedJobs().then(setSavedJobs);
  }, []);

  const saveJob = (job: Job) => {
    setSavedJobs((prev) => {
      if (prev.some((j) => j.id === job.id)) return prev;
      const updated = [...prev, job];
      storeSavedJobs(updated);
      return updated;
    });
  };

  const removeJob = (jobId: string) => {
    setSavedJobs((prev) => {
      const updated = prev.filter((j) => j.id !== jobId);
      storeSavedJobs(updated);
      return updated;
    });
  };

  const isJobSaved = (jobId: string) => savedJobs.some((j) => j.id === jobId);

  return (
    <SavedJobContext.Provider value={{ savedJobs, saveJob, removeJob, isJobSaved }}>
      {children}
    </SavedJobContext.Provider>
  );
};

export const useSavedJobs = (): SavedJobContextType => {
  const context = useContext(SavedJobContext);
  if (!context)
    throw new Error("useSavedJobs must be used within SavedJobProvider");
  return context;
};
