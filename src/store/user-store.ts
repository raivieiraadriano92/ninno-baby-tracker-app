import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type UserStoreState = {
  showWelcomeScreen: boolean
  setShowWelcomeScreen: (_value: boolean) => void
}

const STORAGE_KEY = 'user-storage'

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      showWelcomeScreen: true,
      setShowWelcomeScreen: (value) => set((state) => ({ ...state, showWelcomeScreen: value }))
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
