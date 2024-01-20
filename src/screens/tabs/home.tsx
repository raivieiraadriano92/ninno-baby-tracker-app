import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { RecordCard, RecordIcon, Text } from 'src/components'
import { getRecordTypeInfo } from 'src/utils/records'

import type { TabScreen } from 'src/navigation/types'

export const HomeScreen: TabScreen<'Home'> = () => {
  const insets = useSafeAreaInsets()

  return (
    //   {/* <View
    //     className="items-center justify-end overflow-hidden w-full"
    //     style={{ height: HEADER_BG_HEIGHT + insets.top }}>
    //     <Image source={require('assets/bg-shape-header-blue.png')} />
    //   </View> */}
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <View
        className="bg-green-500 items-center justify-center space-y-6"
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
      </View> */}
      <ScrollView className="bg-white" horizontal showsHorizontalScrollIndicator={false}>
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
      <Text bold className="mb-3 mt-6 text-center">
        Latest records
      </Text>
      <View className="px-4 space-y-3">
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
    </ScrollView>
  )
}
