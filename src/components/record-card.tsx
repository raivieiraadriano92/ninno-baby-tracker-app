import type { FunctionComponent } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { View, type ViewProps } from 'react-native'
import { getRecordTypeInfo } from 'src/utils/records'

import { BaseCard } from './base-card'
import { RecordIcon } from './record-icon'
import { Text } from './text'

import type { RecordType } from 'src/models/record'

type RecordCardProps = ViewProps & {
  date?: Date
  info?: string
  renderRight?: () => JSX.Element
  type: RecordType
}

export const RecordCard: FunctionComponent<RecordCardProps> = ({
  date,
  info,
  renderRight,
  type,
  ...props
}) => {
  const recordTypeInfo = getRecordTypeInfo(type)

  return (
    <BaseCard {...props}>
      <RecordIcon size={44} type={type} />
      <View className="flex-1 space-y-0.5">
        <Text numberOfLines={1} medium>
          {recordTypeInfo?.title}
        </Text>
        {!!info && (
          <Text className="text-sm text-[#979797]" medium>
            {info}
          </Text>
        )}
      </View>
      {!!date && (
        <Text className="text-sm text-[#979797]" medium>
          {formatDistanceToNow(date)}
        </Text>
      )}
      {renderRight?.()}
    </BaseCard>
  )
}
