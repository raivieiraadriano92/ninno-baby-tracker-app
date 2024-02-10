import type { FunctionComponent } from 'react'

import { formatDistanceToNow } from 'date-fns'
import { View, type ViewProps } from 'react-native'
import { getRecordTypeInfo } from 'src/utils/records'

import { BaseCard } from './base-card'
import { RecordIcon } from './record-icon'
import { Text } from './text'

import type { MeasureData, RecordRow, RecordType } from 'src/models/record'

type RecordCardProps = ViewProps & {
  attributes?: RecordRow['attributes']
  date?: RecordRow['date']
  renderRight?: () => JSX.Element
  time?: RecordRow['time']
  type: RecordType
}

const formatAttributes = (type: RecordType, attributes: RecordRow['attributes']) => {
  if ((['head', 'height', 'weight'] as RecordType[]).includes(type)) {
    const attr = attributes as MeasureData

    return `${attr.value}${attr.unit}`
  }

  return '-'
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
        {!!attributes && (
          <Text className="text-sm text-[#979797]" medium>
            {formatAttributes(type, attributes)}
          </Text>
        )}
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
