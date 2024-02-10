import type { FunctionComponent } from 'react'

import { format } from 'date-fns'
import { View, type ViewProps } from 'react-native'

import { BabyProfileIcon } from './baby-profile-icon'
import { BaseCard } from './base-card'
import { Text } from './text'

type BabyProfileCardProps = ViewProps & {
  name: string
  birthDate: Date
  gender: 'F' | 'M'
}

export const BabyProfileCard: FunctionComponent<BabyProfileCardProps> = ({
  birthDate,
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
      {format(birthDate, 'MMM d, yyyy')}
    </Text>
  </BaseCard>
)
