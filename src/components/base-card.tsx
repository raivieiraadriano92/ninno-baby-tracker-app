import type { FunctionComponent } from 'react'

import { View, type ViewProps } from 'react-native'

export const BaseCard: FunctionComponent<ViewProps> = ({ children, className, ...props }) => (
  <View
    className={`bg-white flex-row items-center justify-between px-4 py-3 rounded-2xl space-x-4 ${className}`}
    {...props}>
    {children}
  </View>
)
