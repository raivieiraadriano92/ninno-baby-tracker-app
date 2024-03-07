import type { Database } from 'src/utils/supabase/types'

export type BabyProfileRow = Database['public']['Tables']['baby_profiles']['Row']

export type BabyProfileDraft = Omit<BabyProfileRow, 'id'>
