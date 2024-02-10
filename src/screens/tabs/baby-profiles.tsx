import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { BabyProfileCard, PageLoader } from 'src/components'
import { useOnSaveBabyProfileEvent } from 'src/hooks'
import colors from 'src/theme/colors'
import { supabase } from 'src/utils/supabase'

import type { BabyProfileRow } from 'src/models/baby-profile'
import type { TabScreen } from 'src/navigation/types'
import type { Database } from 'src/utils/supabase/types'

type State = {
  babyProfiles: Database['public']['Tables']['baby_profiles']['Row'][]
  loading: boolean
}

const INITIAL_STATE: State = {
  babyProfiles: [],
  loading: true
}

const fetchBabyProfiles = () => supabase.from('baby_profiles').select().order('name')

export const BabyProfilesScreen: TabScreen<'BabyProfiles'> = ({ navigation }) => {
  const [state, setState] = useState<State>(INITIAL_STATE)

  useOnSaveBabyProfileEvent(
    useCallback((row: BabyProfileRow) => {
      setState((prev) => ({
        ...prev,
        babyProfiles: [
          ...prev.babyProfiles.filter((babyProfile) => babyProfile.id !== row.id),
          row
        ].sort((a, b) => a.name.localeCompare(b.name))
      }))
    }, [])
  )

  useEffect(() => {
    const fetchData = async () => {
      const responseBabyProfiles = await fetchBabyProfiles()

      setState((prev) => ({
        ...prev,
        babyProfiles: responseBabyProfiles.data ?? [],
        loading: false
      }))
    }

    fetchData()
  }, [])

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

  if (state.loading) {
    return <PageLoader />
  }

  return (
    <FlatList
      data={state.babyProfiles}
      keyExtractor={(item) => `${item.id}`}
      ItemSeparatorComponent={() => <View className="h-4" />}
      ListFooterComponent={<View className="pb-4" />}
      ListHeaderComponent={<View className="pt-4" />}
      renderItem={({ item }) => (
        <BabyProfileCard
          className="mx-4"
          birthday={item.birthday}
          gender={item.gender}
          name={item.name}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  )
}
