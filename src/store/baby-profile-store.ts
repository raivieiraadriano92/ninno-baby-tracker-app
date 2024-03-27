import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { BabyProfileDraft, BabyProfileRow } from 'src/models/baby-profile'

type BabyProfileStoreState = {
  data: BabyProfileRow[]
  selectedBabyProfile: BabyProfileRow | null
  addBabyProfile: (_data: BabyProfileDraft) => BabyProfileRow
  editBabyProfile: (_data: BabyProfileRow) => BabyProfileRow
  deleteBabyProfile: (_id: BabyProfileRow['id']) => void
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
      editBabyProfile: (data) => {
        set((state) => ({
          ...state,
          selectedBabyProfile:
            state.selectedBabyProfile?.id === data.id ? data : state.selectedBabyProfile,
          data: state.data.map((babyProfile) => (babyProfile.id === data.id ? data : babyProfile))
        }))

        return data
      },
      deleteBabyProfile: (id) =>
        set((state) => {
          const newData = state.data.filter((babyProfile) => babyProfile.id !== id)

          return {
            ...state,
            selectedBabyProfile:
              state.selectedBabyProfile?.id === id && newData.length ? newData[0] : null,
            data: newData
          }
        }),
      setSelectedBabyProfile: (data) => set((state) => ({ ...state, selectedBabyProfile: data }))
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
