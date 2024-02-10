import type { FunctionComponent } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { View, type ViewProps } from 'react-native'
import { getRecordTypeInfo } from 'src/utils/records'

import { BaseCard } from './base-card'
import { RecordIcon } from './record-icon'
import { Text } from './text'

import type { RecordType } from 'src/models/record'
import type { Database } from 'src/utils/supabase/types'

type RecordRow = Database['public']['Tables']['records']['Row']

type RecordCardProps = ViewProps & {
  attributes?: RecordRow['attributes']
  date?: RecordRow['date']
  renderRight?: () => JSX.Element
  time?: RecordRow['time']
  type: RecordType
}

export const RecordCard: FunctionComponent<RecordCardProps> = ({
  attributes,
  date,
  renderRight,
  time,
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
        {/* {!!info && (
          <Text className="text-sm text-[#979797]" medium>
            {info}
          </Text>
        )} */}
      </View>
      {!!date && !!time && (
        <Text className="text-sm text-[#979797]" medium>
          {formatDistanceToNow(new Date(`${date}T${time}`))}
        </Text>
      )}
      {renderRight?.()}
    </BaseCard>
  )
}
