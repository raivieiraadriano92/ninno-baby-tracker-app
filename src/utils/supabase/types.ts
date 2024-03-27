export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      baby_profiles: {
        Row: {
          birthday: string
          gender: Database['public']['Enums']['babyprofilegender']
          id: number
          name: string
        }
        Insert: {
          birthday: string
          gender?: Database['public']['Enums']['babyprofilegender']
          id?: number
          name: string
        }
        Update: {
          birthday?: string
          gender?: Database['public']['Enums']['babyprofilegender']
          id?: number
          name?: string
        }
        Relationships: []
      }
      baby_profiles_users: {
        Row: {
          baby_profile_id: number
          user_id: string
        }
        Insert: {
          baby_profile_id: number
          user_id: string
        }
        Update: {
          baby_profile_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'baby_profiles_users_baby_profile_id_fkey'
            columns: ['baby_profile_id']
            isOneToOne: false
            referencedRelation: 'baby_profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'baby_profiles_users_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      records: {
        Row: {
          attributes: Json | null
          baby_profile_id: number
          date: string
          id: number
          notes: string | null
          time: string
          type: Database['public']['Enums']['babyprofilerecord']
        }
        Insert: {
          attributes?: Json | null
          baby_profile_id: number
          date: string
          id?: number
          notes?: string | null
          time: string
          type: Database['public']['Enums']['babyprofilerecord']
        }
        Update: {
          attributes?: Json | null
          baby_profile_id?: number
          date?: string
          id?: number
          notes?: string | null
          time?: string
          type?: Database['public']['Enums']['babyprofilerecord']
        }
        Relationships: [
          {
            foreignKeyName: 'records_baby_profile_id_fkey'
            columns: ['baby_profile_id']
            isOneToOne: false
            referencedRelation: 'baby_profiles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      babyprofilegender: 'F' | 'M'
      babyprofilerecord:
        | 'growth'
        | 'birthday'
        | 'weight'
        | 'height'
        | 'head'
        | 'diaper'
        | 'sleep'
        | 'sleepDay'
        | 'sleepNight'
        | 'feeding'
        | 'bottle'
        | 'bottleBreast'
        | 'bottleFormula'
        | 'breast'
        | 'breastFeedingLeft'
        | 'breastFeedingRight'
        | 'pumping'
        | 'pumpingLeft'
        | 'pumpingRight'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never
