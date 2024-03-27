import type { Database } from 'src/utils/supabase/types'

export type RecordType = Database['public']['Enums']['babyprofilerecord']

export type RecordTypeGroup = [RecordType, RecordType[]]

export type RecordRow = Database['public']['Tables']['records']['Row']

export type RecordDraft = Omit<RecordRow, 'id'>

export type MeasureData = {
  value: number
  unit: string
}

export type SleepAttrData = {
  endDate: string
  endTime: string
}

export type FeedingAttrData = {
  amount?: MeasureData
  endDate: string
  endTime: string
}

export type DiaperAttrData = {
  color: string
  consistency: 'loose' | 'soft' | 'hard'
  skinRash: 'none' | 'mild' | 'severe'
}
