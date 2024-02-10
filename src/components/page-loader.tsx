import type { FunctionComponent } from 'react'

import { ActivityIndicator, View } from 'react-native'

import type { ViewProps } from 'react-native'

export const PageLoader: FunctionComponent<ViewProps> = ({ className, ...props }) => (
  <View className={`flex-1 items-center justify-center ${className}`} {...props}>
    <ActivityIndicator />
  </View>
)
