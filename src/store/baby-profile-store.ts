import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { BabyProfileDraft, BabyProfileRow } from 'src/models/baby-profile'

type BabyProfileStoreState = {
  data: BabyProfileRow[]
  selectedBabyProfile: BabyProfileRow | null
  addBabyProfile: (_data: BabyProfileDraft) => BabyProfileRow
  setSelectedBabyProfile: (_data: BabyProfileRow) => void
}

const STORAGE_KEY = 'baby-profile-storage'

export const useBabyProfileStore = create<BabyProfileStoreState>()(
  persist(
    (set) => ({
      data: [],
      selectedBabyProfile: null,
      addBabyProfile: (data) => {
        const newBabyProfile = { id: Math.random(), ...data }

        set((state) => ({
          ...state,
          selectedBabyProfile: newBabyProfile,
          data: [newBabyProfile, ...state.data]
        }))

        return newBabyProfile
      },
      setSelectedBabyProfile: (data) => set((state) => ({ ...state, selectedBabyProfile: data }))
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
