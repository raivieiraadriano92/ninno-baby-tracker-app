import type { FunctionComponent } from 'react'

import { Image, View, type ViewProps } from 'react-native'

import { Button } from './button'
import { Text } from './text'

type EmptyStateHomeScreenProps = ViewProps & {
  goToAddRecord: () => void
}

export const EmptyStateHomeScreen: FunctionComponent<EmptyStateHomeScreenProps> = ({
  goToAddRecord,
  className,
  ...props
}) => (
  <View className={`bg-white flex-1 justify-end pb-10 space-y-20 ${className}`} {...props}>
    <View className="space-y-2">
      <Text bold className="text-2xl text-center">
        New Beginnings
      </Text>
      <Text medium className="text-center">
        {`Ready to start recording memories?\nLet's begin!`}
      </Text>
    </View>
    <View className="px-10">
      <Image className="self-center" source={require('assets/ninno-boy.png')} />
      <Button onPress={goToAddRecord} title="Add your first record" />
    </View>
  </View>
)
