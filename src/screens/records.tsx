import { useLayoutEffect } from 'react'

import { Feather } from '@expo/vector-icons'
import { format, isToday, isYesterday } from 'date-fns'
import { SectionList, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RecordCard, Text } from 'src/components'
import { useBabyProfileStore } from 'src/store/baby-profile-store'
import { useRecordStore } from 'src/store/record-store'
import colors from 'src/theme/colors'

import type { RootStackScreen } from 'src/navigation/types'

const formatDateTitle = (date: string) => {
  const dateObj = new Date(`${date}T00:00:00`)

  if (isToday(dateObj)) {
    return 'Today'
  } else if (isYesterday(dateObj)) {
    return 'Yesterday'
  }

  return format(dateObj, 'dd MMMM yyyy')
}

export const RecordsScreen: RootStackScreen<'Records'> = ({ navigation }) => {
  const selectedBabyProfile = useBabyProfileStore((state) => state.selectedBabyProfile)

  const sections = useRecordStore((state) =>
    Object.entries(
      selectedBabyProfile ? state.getRecordsGroupedByDate(selectedBabyProfile.id) : {}
    ).map((group) => ({
      data: group[1],
      title: formatDateTitle(group[0])
    }))
  )

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
      keyExtractor={(item) => `${item.id}`}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListFooterComponent={<SafeAreaView className="pb-4" edges={['bottom']} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RecordForm', {
              record: item,
              type: item.type,
              babyProfileId: item.baby_profile_id
            })
          }>
          <RecordCard
            className="mx-4"
            date={item.date}
            time={item.time}
            attributes={item.attributes}
            type={item.type}
          />
        </TouchableOpacity>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text className="pb-3 pt-6 text-center" medium>
          {title}
        </Text>
      )}
      sections={sections}
      showsVerticalScrollIndicator={false}
      stickySectionHeadersEnabled={false}
    />
  )
}
