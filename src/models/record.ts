import type { Database } from 'src/utils/supabase/types'

export type RecordType = Database['public']['Enums']['babyprofilerecord']

export type RecordTypeGroup = [RecordType, RecordType[]]

export type RecordRow = Database['public']['Tables']['records']['Row']

export type RecordDraft = Omit<RecordRow, 'id'>

export type MeasureData = {
  value: number
  unit: string
}
