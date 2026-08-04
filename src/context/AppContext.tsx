import React, { createContext, useContext, useState, useEffect } from "react";
import { hotdogs } from "@/data/hotdogs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface LogEntry {
  id: string;
  productId?: number;
  productName?: string,
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

  customHotDogs: CustomHotDog[];

  addCustomHotDog: (
    name: string,
    length_inches: number
  ) => void;

  addHotDogs: (
    productId: number,
    quantity: number,
    customLength?: number,
    productName?: string
  ) => void;

  deleteLogEntry: (
    id: string
  ) => void;

  deleteCustomHotDog: (
    id: string
  ) => void;

  setStartingDistance: (
    inches: number
  ) => void;

  resetAppData: () => Promise<void>;
}


interface CustomHotDog {
  id: string;
  name: string;
  length_inches: number;
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
  const [customHotDogs, setCustomHotDogs] = useState<CustomHotDog[]>([]);


  useEffect(() => {
  async function loadData() {
    try {

      const savedGoal = await AsyncStorage.getItem("goalInches");
      const savedGoalSet = await AsyncStorage.getItem("goalSet");
      const savedTotal = await AsyncStorage.getItem("totalInches");
      const savedLogs = await AsyncStorage.getItem("logEntries");
      const savedCustomDogs = await AsyncStorage.getItem("customHotDogs");

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
        const parsedLogs = JSON.parse(savedLogs);

        const updatedLogs = parsedLogs.map((entry: LogEntry) => ({
          ...entry,
          id: entry.id ?? Date.now().toString(),
        }));

        setLogEntries(updatedLogs);
      }

      if (savedCustomDogs) {
        setCustomHotDogs(JSON.parse(savedCustomDogs));
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

      await AsyncStorage.setItem(
        "customHotDogs",
        JSON.stringify(customHotDogs)
      );

    } catch (error) {
      console.log("Error saving data:", error);
    }
  }

  saveData();
}, [goalInches, goalSet, totalInches, logEntries, customHotDogs]);

  function addHotDogs(
    productId: number,
    quantity: number,
    customLength?: number,
    productName?: string
  ) {

    let inchesPerHotDog;

    if (customLength) {
      inchesPerHotDog = customLength;
    } else {
      const product = hotdogs
      .flatMap((brand) => brand.products)
      .find((product) => product.id === productId);

      if (!product) {
        return;
      }

      inchesPerHotDog = product.length_inches;
    }

    const inchesAdded = quantity * inchesPerHotDog;

    setTotalInches((current) => current + inchesAdded);

    const newEntry: LogEntry = {
      id: Date.now().toString(),
      productId: customLength ? undefined : productId,
      productName,
      quantity,
      inchesAdded,
      date: new Date().toISOString(),
    };

    setLogEntries((current) => [...current, newEntry]);
  }

  function addCustomHotDog(
    name: string,
    length_inches: number
  ) {
    const newDog: CustomHotDog = {
      id: Date.now().toString(),
      name,
      length_inches,
    };

    setCustomHotDogs((current) => [
      ...current,
      newDog,
    ]);
  }

  function deleteCustomHotDog(id: string) {
    setCustomHotDogs((current) =>
      current.filter((dog) => dog.id !== id)
    );
  }

  function deleteLogEntry(id: string) {
    const entry = logEntries.find(
      (item) => item.id === id
    );

    if (!entry) {
      return;
    }

    setTotalInches(
      (current) => Math.max(0, current - entry.inchesAdded)
    );

    setLogEntries(
      (current) =>
        current.filter(
          (item) => item.id !== id
        )
      );
  }

  function setStartingDistance(inches: number) {
    setTotalInches(inches);
  }

  async function resetAppData() {
    await AsyncStorage.clear();

    setGoalInches(63360); // reset to 1 mile default
    setGoalSet(false);
    setTotalInches(0);
    setLogEntries([]);
    setCustomHotDogs([]);
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
        deleteLogEntry,
        customHotDogs,
        addCustomHotDog,
        deleteCustomHotDog,
        setStartingDistance,
        resetAppData,
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
