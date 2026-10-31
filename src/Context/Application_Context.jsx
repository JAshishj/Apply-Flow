import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Sample_Applications } from "../Data/Sample_Applications";
import { normalizeStatus } from "../lib/status";

const AppContext = createContext(null);
const STORAGE_KEY = "applyflow_applications";

function normalizeApplication(job) {
  return {
    ...job,
    id: job.id ?? crypto.randomUUID(),
    status: normalizeStatus(job.status),
  };
}

function readStoredApplications() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(Boolean).map(normalizeApplication);
  } catch {
    return [];
  }
}

export const AppProvider = ({ children }) => {
  const [storedApplications, setStoredApplications] = useState(
    readStoredApplications,
  );
  const [sampleMode, setSampleMode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedApplications));
    } catch {
      /* storage can be full or blocked; the session still works in memory */
    }
  }, [storedApplications]);

  const sampleApplications = useMemo(
    () => Sample_Applications.map(normalizeApplication),
    [],
  );

  const addApplication = (application) => {
    setStoredApplications((prev) => [
      ...prev,
      normalizeApplication(application),
    ]);
  };

  const updateApplication = (updatedApplication) => {
    setStoredApplications((prev) =>
      prev.map((job) =>
        job.id === updatedApplication.id
          ? normalizeApplication(updatedApplication)
          : job,
      ),
    );
  };

  const deleteApplication = (id) => {
    setStoredApplications((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        applications: sampleMode ? sampleApplications : storedApplications,
        sampleMode,
        showSampleData: () => setSampleMode(true),
        showOwnData: () => setSampleMode(false),
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Exported alongside AppProvider so consumers get one import path.
// eslint-disable-next-line react-refresh/only-export-components
export const useApplications = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApplications must be used inside AppProvider");
  }

  return context;
};
