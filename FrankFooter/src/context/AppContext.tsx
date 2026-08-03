import React, { createContext, useContext, useState, useEffect } from "react";
import { hotdogs } from "@/data/hotdogs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface LogEntry {
  productId: number;
  quantity: number;
  inchesAdded: number;
  date: string;
}

interface AppContextType {
  goalInches: number;
  setGoalInches: (goal: number) => void;

  goalSet: boolean;
  setGoalSet: (value: boolean) => void;

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
  const [goalSet, setGoalSet] = useState(false);
  const [totalInches, setTotalInches] = useState(0);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
  async function loadData() {
    try {
      const savedGoal = await AsyncStorage.getItem("goalInches");
      const savedGoalSet = await AsyncStorage.getItem("goalSet");
      const savedTotal = await AsyncStorage.getItem("totalInches");
      const savedLogs = await AsyncStorage.getItem("logEntries");

      if (savedGoal) {
        setGoalInches(JSON.parse(savedGoal));
      }

      if (savedGoalSet) {
        setGoalSet(JSON.parse(savedGoalSet));
      }

      if (savedTotal) {
        setTotalInches(JSON.parse(savedTotal));
      }

      if (savedLogs) {
        setLogEntries(JSON.parse(savedLogs));
      }
    } catch (error) {
      console.log("Error loading data:", error);
    }
  }

  loadData();
}, []);

useEffect(() => {
  async function saveData() {
    try {
      await AsyncStorage.setItem(
        "goalInches",
        JSON.stringify(goalInches)
      );

      await AsyncStorage.setItem(
        "goalSet",
        JSON.stringify(goalSet)
      );

      await AsyncStorage.setItem(
        "totalInches",
        JSON.stringify(totalInches)
      );

      await AsyncStorage.setItem(
        "logEntries",
        JSON.stringify(logEntries)
      );

    } catch (error) {
      console.log("Error saving data:", error);
    }
  }

  saveData();
}, [goalInches, goalSet, totalInches, logEntries]);

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
        goalSet,
        setGoalSet,
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
