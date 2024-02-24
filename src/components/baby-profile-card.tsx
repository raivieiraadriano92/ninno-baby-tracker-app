import type { FunctionComponent } from 'react'

import { format, parseISO } from 'date-fns'
import { View, type ViewProps } from 'react-native'

import { BabyProfileIcon } from './baby-profile-icon'
import { BaseCard } from './base-card'
import { Text } from './text'

import type { BabyProfileRow } from 'src/models/baby-profile'

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
      {format(parseISO(birthday), 'MMM d, yyyy')}
    </Text>
  </BaseCard>
)
