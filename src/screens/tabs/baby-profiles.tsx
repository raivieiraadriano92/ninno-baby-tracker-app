import { useLayoutEffect } from 'react'

import { Feather } from '@expo/vector-icons'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { BabyProfileCard } from 'src/components'
import { useBabyProfileStore } from 'src/store/baby-profile-store'
import colors from 'src/theme/colors'

import type { TabScreen } from 'src/navigation/types'

export const BabyProfilesScreen: TabScreen<'BabyProfiles'> = ({ navigation }) => {
  const babyProfiles = useBabyProfileStore((state) => state.data)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          className="mr-4"
          onPress={() => navigation.navigate('BabyProfileCreation')}>
          <Feather name="plus" size={24} color={colors.custom.primary} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  return (
    <FlatList
      data={babyProfiles}
      keyExtractor={(item) => `${item.id}`}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListFooterComponent={<View className="pb-4" />}
      ListHeaderComponent={<View className="pt-4" />}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('BabyProfileEdition', { babyProfile: item })}>
          <BabyProfileCard
            className="mx-4"
            birthday={item.birthday}
            gender={item.gender}
            name={item.name}
          />
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  )
}
