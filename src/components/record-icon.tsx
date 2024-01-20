import type { FunctionComponent } from 'react'

import { Image, View } from 'react-native'
import { getRecordTypeInfo } from 'src/utils/records'

import type { ViewProps } from 'react-native'
import type { RecordType } from 'src/models/record'

type RecordIconProps = ViewProps & {
  size: number
  type: RecordType
}

export const RecordIcon: FunctionComponent<RecordIconProps> = ({
  className,
  size,
  style,
  type,
  ...props
}) => {
  const recordTypeInfo = getRecordTypeInfo(type)

  return (
    <View
      className={`h-11 items-center justify-center rounded-lg w-11 ${className}`}
      style={[{ backgroundColor: recordTypeInfo?.color, height: size, width: size }, style]}
      {...props}>
      <Image source={recordTypeInfo.icon} style={{ height: size, width: size }} />
    </View>
  )
}
