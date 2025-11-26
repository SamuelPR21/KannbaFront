// src/context/homeRefreshContext.tsx
import React, { createContext, useContext, useState } from "react";

type HomeRefreshContextType = {
  tasksVersion: number;
  projectsVersion: number;
  bumpTasks: () => void;
  bumpProjects: () => void;
};

const HomeRefreshContext = createContext<HomeRefreshContextType | undefined>(
  undefined
);

export const HomeRefreshProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasksVersion, setTasksVersion] = useState(0);
  const [projectsVersion, setProjectsVersion] = useState(0);

  const bumpTasks = () => setTasksVersion((v) => v + 1);
  const bumpProjects = () => setProjectsVersion((v) => v + 1);

  return (
    <HomeRefreshContext.Provider
      value={{ tasksVersion, projectsVersion, bumpTasks, bumpProjects }}
    >
      {children}
    </HomeRefreshContext.Provider>
  );
};

export function useHomeRefresh() {
  const ctx = useContext(HomeRefreshContext);
  if (!ctx) {
    throw new Error(
      "useHomeRefresh debe usarse dentro de un <HomeRefreshProvider>"
    );
  }
  return ctx;
}
