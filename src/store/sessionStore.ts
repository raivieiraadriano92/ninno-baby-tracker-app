import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SessionStoreState = {
  isFirstAccess: boolean;
  isPremium: boolean;
  setIsFirstAccess: (_value: boolean) => void;
  setIsPremium: (_value: boolean) => void;
};

const STORAGE_KEY = "@v2/session-storage";

export const useSessionStore = create<SessionStoreState>()(
  persist(
    (set) => ({
      isFirstAccess: true,
      isPremium: false,
      setIsFirstAccess: (value) =>
        set((state) => ({ ...state, isFirstAccess: value })),
      setIsPremium: (value) => set((state) => ({ ...state, isPremium: value }))
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
