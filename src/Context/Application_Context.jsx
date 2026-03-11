import { createContext, useContext, useEffect, useState } from "react";
import { Sample_Applications } from "../Data/Sample_Applications";

const AppContext = createContext()
const STORAGE_KEY = "applyflow_applications";

export const AppProvider = ({ children }) => {
  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const addApplication = (app) => {
    setApplications((prev) => [...prev, app]);
  };

  const updateApplication = (updatedApp) => {
    setApplications((prev) =>
      prev.map((job) => (job.id === updatedApp.id ? updatedApp : job)),
    );
  };

  const deleteApplication = (id) => {
    setApplications((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApplications = () => useContext(AppContext);
