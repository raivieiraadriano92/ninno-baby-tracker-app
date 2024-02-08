import type { FunctionComponent } from 'react'

import { Image, View, type ViewProps } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from './button'
import { Text } from './text'

type FirstBabyProfileProps = ViewProps & {
  goToAddRecord: () => void
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)

export const FirstBabyProfile: FunctionComponent<FirstBabyProfileProps> = ({
  goToAddRecord,
  className,
  ...props
}) => (
  <AnimatedSafeAreaView
    className={`bg-white flex-1 justify-end p-10 ${className}`}
    entering={FadeInUp}
    {...props}>
    <View className="flex-1 justify-center space-y-2">
      <Text bold className="text-3xl text-center">
        New beginnings
      </Text>
      <Text medium className="text-center">
        {`Ready to start recording memories?\nLet's star creating your first ninno's profile!`}
      </Text>
    </View>
    <View>
      <Image className="self-center" source={require('assets/ninno-boy.png')} />
      <Button onPress={goToAddRecord} title="Next" />
    </View>
  </AnimatedSafeAreaView>
)
