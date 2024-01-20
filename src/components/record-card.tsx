import type { FunctionComponent } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { View, type ViewProps } from 'react-native'
import { getRecordTypeInfo } from 'src/utils/records'

import { RecordIcon } from './record-icon'
import { Text } from './text'

import type { RecordType } from 'src/models/record'

type RecordCardProps = ViewProps & {
  date: Date
  info: string
  type: RecordType
}

export const RecordCard: FunctionComponent<RecordCardProps> = ({
  className,
  date,
  info,
  type,
  ...props
}) => {
  const recordTypeInfo = getRecordTypeInfo(type)

  return (
    <View
      className={`bg-white flex-row items-center justify-between px-4 py-3 rounded-2xl space-x-4 ${className}`}
      {...props}>
      <RecordIcon size={44} type={type} />
      <View className="flex-1 space-y-0.5">
        <Text numberOfLines={1} medium>
          {recordTypeInfo?.title}
        </Text>
        <Text className="text-sm text-[#979797]" medium>
          {info}
        </Text>
      </View>
      <Text className="text-sm text-[#979797]" medium>
        {formatDistanceToNow(date)}
      </Text>
    </View>
  )
}
