import React, { createContext, useContext, useState } from "react";
import { hotdogs } from "@/data/hotdogs";

export interface LogEntry {
  productId: number;
  quantity: number;
  inchesAdded: number;
  date: string;
}

interface AppContextType {
  goalInches: number;
  setGoalInches: (goal: number) => void;

  totalInches: number;

  logEntries: LogEntry[];

  addHotDogs: (
  productId: number,
  quantity: number
) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [goalInches, setGoalInches] = useState(63360); // 1 mile
  const [totalInches, setTotalInches] = useState(0);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  function addHotDogs(
  productId: number,
  quantity: number
) {
  
  const product = hotdogs
    .flatMap((brand) => brand.products)
    .find((product) => product.id === productId);

  if (!product) {
    return;
  }

  const inchesAdded = quantity * product.length_inches;


    setTotalInches((current) => current + inchesAdded);

    const newEntry: LogEntry = {
      productId,
      quantity,
      inchesAdded,
      date: new Date().toISOString(),
    };

    setLogEntries((current) => [...current, newEntry]);
  }

  return (
    <AppContext.Provider
      value={{
        goalInches,
        setGoalInches,
        totalInches,
        logEntries,
        addHotDogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside an AppProvider");
  }

  return context;
}
