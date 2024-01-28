import { Image, ScrollView, View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, RecordCard, RecordIcon, Text } from 'src/components'
import { getRecordTypeInfo } from 'src/utils/records'

import type { TabScreen } from 'src/navigation/types'

const HEADER_BG_HEIGHT = 200

export const HomeScreen: TabScreen<'Home'> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const translationY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const bgAnimatedStyle = useAnimatedStyle(() => ({
    height: Math.abs(translationY.value) + HEADER_BG_HEIGHT + insets.top,
    transform: [
      {
        translateY: -Math.abs(translationY.value)
      }
    ]
  }))

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView edges={['top']}>
        <ScrollView
          className="bg-white"
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingTop: HEADER_BG_HEIGHT }}>
          <View className="flex-row p-8 space-x-4">
            {['feeding', 'sleep', 'diaper', 'growth'].map((type) => {
              const recordTypeInfo = getRecordTypeInfo(type)

              return (
                <View className="items-center space-y-2" key={type}>
                  <RecordIcon size={80} type={type} />
                  <Text semibold>{recordTypeInfo.title}</Text>
                </View>
              )
            })}
          </View>
        </ScrollView>
        <View className="pt-6 px-4 space-y-3">
          <View className="flex-row justify-between">
            <Text bold className="text-center">
              Latest records
            </Text>
            <Button onPress={() => navigation.navigate('Records')} title="See all" variant="link" />
          </View>
          {[
            'weight',
            'height',
            'head',
            'diaper',
            'sleepDay',
            'sleepNight',
            'bottleBreast',
            'bottleFormula',
            'breastFeedingLeft',
            'breastFeedingRight',
            'pumpingLeft',
            'pumpingRight'
          ].map((type) => (
            <RecordCard date={new Date()} info="5.2kg" key={type} type={type} />
          ))}
        </View>
      </SafeAreaView>
      <Animated.View
        className="absolute items-center justify-end overflow-hidden w-full"
        style={bgAnimatedStyle}>
        <Image source={require('assets/bg-shape-header-blue.png')} />
        <View
          className="absolute items-center justify-center space-y-6"
          style={{ height: HEADER_BG_HEIGHT }}>
          <Text bold className="text-4xl">
            Dorothy Emma
          </Text>
          <View className="flex-row space-x-4">
            {['5.8kg', '2 mon, 3 days', '58.4cm'].map((item) => (
              <View className="bg-custom-yellow1 px-4 py-0.5 rounded-full" key={item}>
                <Text medium>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </Animated.ScrollView>
  )
}
