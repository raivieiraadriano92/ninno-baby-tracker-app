import type { FunctionComponent } from 'react'

import { format } from 'date-fns'
import { View, type ViewProps } from 'react-native'

import { BabyProfileIcon } from './baby-profile-icon'
import { BaseCard } from './base-card'
import { Text } from './text'

import type { Database } from 'src/utils/supabase/types'

type BabyProfileRow = Database['public']['Tables']['baby_profiles']['Row']

type BabyProfileCardProps = ViewProps & {
  name: BabyProfileRow['name']
  birthday: BabyProfileRow['birthday']
  gender: BabyProfileRow['gender']
}

export const BabyProfileCard: FunctionComponent<BabyProfileCardProps> = ({
  birthday,
  gender,
  name,
  ...props
}) => (
  <BaseCard {...props}>
    <BabyProfileIcon gender={gender} size={44} />
    <View className="flex-1">
      <Text numberOfLines={1} medium>
        {name}
      </Text>
    </View>
    <Text className="text-sm text-[#979797]" medium>
      {format(new Date(birthday), 'MMM d, yyyy')}
    </Text>
  </BaseCard>
)
