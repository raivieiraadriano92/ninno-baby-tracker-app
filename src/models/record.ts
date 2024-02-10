import type { Database } from 'src/utils/supabase/types'

export type RecordType = Database['public']['Enums']['babyprofilerecord']

export type RecordTypeGroup = [RecordType, RecordType[]]
