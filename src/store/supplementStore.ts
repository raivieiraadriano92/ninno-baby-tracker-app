import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SupplementStoreState = {
  list: string[];
  add: (_value: string) => void;
};

const STORAGE_KEY = "supplementStore";

export const initialSupplementList = [
  "Cereal",
  "Finger Foods",
  "Fruit",
  "Juice",
  "Meat",
  "Milk",
  "Veggies",
  "Vitamins",
  "Water"
];

export const useSupplementStore = create<SupplementStoreState>()(
  persist(
    (set) => ({
      list: initialSupplementList,
      add: (value) =>
        set((state) => ({ ...state, list: [value, ...state.list] }))
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
