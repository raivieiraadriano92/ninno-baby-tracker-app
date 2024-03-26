import type { FunctionComponent } from 'react'

import { format } from 'date-fns'
import { View, type ViewProps } from 'react-native'
import { formatAttributes, getRecordTypeInfo } from 'src/utils/records'

import { BaseCard } from './base-card'
import { RecordIcon } from './record-icon'
import { Text } from './text'

import type { RecordRow, RecordType } from 'src/models/record'

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

  const fullDate = new Date(`${date}T${time}`)

  return (
    <BaseCard {...props}>
      <RecordIcon size={44} type={type} />
      <View className="flex-1 space-y-0.5">
        <Text numberOfLines={1} medium>
          {recordTypeInfo?.title}
        </Text>
        {!!attributes && (
          <Text className="text-sm text-[#979797]" medium>
            {formatAttributes(type, attributes, date, time)}
          </Text>
        )}
      </View>
      {!!date && !!time && (
        <Text className="text-sm text-[#979797] text-right" medium>
          {`${format(fullDate, 'MMM d, yyyy')}\n${format(fullDate, 'HH:mm')}`}
        </Text>
      )}
      {renderRight?.()}
    </BaseCard>
  )
}
