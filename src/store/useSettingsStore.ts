import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SettingsState = {
  currency: string;
  theme: "light" | "dark";
  setCurrency: (c: string) => void;
  setTheme: (t: "light" | "dark") => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: "INR",
      theme: "dark",
      setCurrency: (currency) => set({ currency }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "flowspend-settings",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
