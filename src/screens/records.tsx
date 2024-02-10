import { useLayoutEffect } from 'react'

import { Feather } from '@expo/vector-icons'
import { SectionList, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RecordCard, Text } from 'src/components'
import colors from 'src/theme/colors'

import type { RootStackScreen } from 'src/navigation/types'

const data = [
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
]

const DATA = [
  {
    title: 'Today',
    data
  },
  {
    title: 'Yesterday',
    data
  }
]

export const RecordsScreen: RootStackScreen<'Records'> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Feather name="filter" size={24} color={colors.custom.primary} />
          <View className="absolute bg-custom-primary h-4 items-center justify-center -right-1 rounded-full -top-1 w-4">
            <Text className="text-white text-xs" semibold>
              1
            </Text>
          </View>
        </TouchableOpacity>
      )
    })
  }, [navigation])

  return (
    <SectionList
      keyExtractor={(item, index) => item + index}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListFooterComponent={<SafeAreaView className="pb-4" edges={['bottom']} />}
      renderItem={({ item }) => (
        <RecordCard className="mx-4" date="1992-12-12" time="11:11:11" info="5.2kg" type={item} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text className="pb-3 pt-6 text-center" medium>
          {title}
        </Text>
      )}
      sections={DATA}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
    />
  )
}
