import type { FunctionComponent } from 'react'

import { Image, View } from 'react-native'
import colors from 'src/theme/colors'
import { getRecordTypeInfo } from 'src/utils/records'

import { Text } from './text'

import type { ViewProps } from 'react-native'
import type { RecordType } from 'src/models/record'

type RecordTypePillProps = ViewProps & {
  isSelected?: boolean
  type: RecordType
}

export const RecordTypePill: FunctionComponent<RecordTypePillProps> = ({
  className,
  isSelected,
  style,
  type,
  ...props
}) => {
  const recordTypeInfo = getRecordTypeInfo(type)

  return (
    <View
      className={`flex-row items-center justify-center pl-1 pr-3 rounded-lg space-x-1 ${className}`}
      style={[
        {
          backgroundColor: recordTypeInfo?.color,
          borderColor: isSelected ? colors.custom.primary : 'transparent',
          borderWidth: 2
        },
        style
      ]}
      {...props}>
      <Image source={recordTypeInfo.icon} style={{ height: 40, width: 40 }} />
      <Text medium>{recordTypeInfo.title}</Text>
    </View>
  )
}
