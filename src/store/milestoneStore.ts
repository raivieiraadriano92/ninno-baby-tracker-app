import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MilestoneStoreState = {
  list: string[];
  add: (_value: string) => void;
};

const STORAGE_KEY = "milestoneStore";

export const initialMilestoneList = [
  "Back home",
  "Recognize caregiver's voice",
  "Recognize familiar faces",
  "First smile",
  "Raise head",
  "Claps hand",
  "Slept through the night",
  "Laugh out loud",
  "Babbles",
  "Holds head steady",
  "Responds to own name",
  "Rolls over",
  "Sits up",
  "First tooth",
  "Says mamma",
  "Says dada",
  "First word",
  "Waves bye-bye",
  "Stands up",
  "First steps"
];

export const useMilestoneStore = create<MilestoneStoreState>()(
  persist(
    (set) => ({
      list: initialMilestoneList,
      add: (value) =>
        set((state) => ({ ...state, list: [value, ...state.list] }))
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
