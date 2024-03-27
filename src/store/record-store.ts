import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { BabyProfileRow } from 'src/models/baby-profile'
import type { RecordDraft, RecordRow } from 'src/models/record'

type RecordStoreState = {
  data: RecordRow[]
  addRecord: (_data: RecordDraft) => RecordRow
  updateRecord: (_data: RecordRow) => void
  deleteRecord: (_id: RecordRow['id']) => void
  deleteRecordsForBabyProfile: (_babyProfileId: BabyProfileRow['id']) => void
  getLatestRecords: (_babyProfileId: BabyProfileRow['id']) => RecordRow[]
  getRecordsGroupedByDate: (_: {
    babyProfileId: BabyProfileRow['id']
    recordTypes?: RecordRow['type'][]
  }) => Record<string, RecordRow[]>
  getLatestWeight: (_id: BabyProfileRow['id']) => RecordRow | undefined
  getLatestHeight: (_id: BabyProfileRow['id']) => RecordRow | undefined
  getLatestHeadCircumference: (_id: BabyProfileRow['id']) => RecordRow | undefined
}

const STORAGE_KEY = 'records-storage'

const sortByDate = (a: RecordRow, b: RecordRow) =>
  new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime()

export const useRecordStore = create<RecordStoreState>()(
  persist(
    (set, get) => ({
      data: [],
      selectedBabyProfileId: null,
      addRecord: (data) => {
        const newRecord = { id: Math.random(), ...data }

        set((state) => ({ ...state, data: [newRecord, ...state.data] }))

        return newRecord
      },
      updateRecord: (data) =>
        set((state) => ({
          ...state,
          data: state.data.map((record) => (record.id === data.id ? data : record))
        })),
      deleteRecord: (id) =>
        set((state) => ({ ...state, data: state.data.filter((record) => record.id !== id) })),
      deleteRecordsForBabyProfile: (babyProfileId) =>
        set((state) => ({
          ...state,
          data: state.data.filter((record) => record.baby_profile_id !== babyProfileId)
        })),
      getLatestRecords: (babyProfileId) =>
        get()
          .data.filter((record) => record.baby_profile_id === babyProfileId)
          .sort(sortByDate)
          .slice(-15),
      getRecordsGroupedByDate: ({ babyProfileId, recordTypes }) =>
        get()
          .data.filter(
            (record) =>
              record.baby_profile_id === babyProfileId &&
              (recordTypes?.length ? recordTypes.includes(record.type) : true)
          )
          .sort(sortByDate)
          .reduce<Record<string, RecordRow[]>>((groups, record) => {
            if (groups[record.date]) {
              groups[record.date].push(record)
            } else {
              groups[record.date] = [record]
            }

            return groups
          }, {}),
      getLatestWeight: (babyProfileId) =>
        get().data.find(
          (record) => record.type === 'weight' && record.baby_profile_id === babyProfileId
        ),
      getLatestHeight: (babyProfileId) =>
        get().data.find(
          (record) => record.type === 'height' && record.baby_profile_id === babyProfileId
        ),
      getLatestHeadCircumference: (babyProfileId) =>
        get().data.find(
          (record) => record.type === 'head' && record.baby_profile_id === babyProfileId
        )
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
