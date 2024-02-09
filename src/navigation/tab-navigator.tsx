import { useCallback, useState } from 'react'

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator, View } from 'react-native'
import { FirstBabyProfile } from 'src/components'
import { BabyProfilesScreen, HomeScreen, SettingsScreen } from 'src/screens'
import colors from 'src/theme/colors'
import { supabase } from 'src/utils/supabase'

import type { RootStackScreen, TabParamList } from './types'

const BottomTab = createBottomTabNavigator<TabParamList>()

export const TabNavigator: RootStackScreen<'Tabs'> = ({ navigation }) => {
  const [hasBabyProfile, setHasBabyProfile] = useState<boolean>()

  const verifyHasBabyProfiles = async () => {
    const response = await supabase.from('baby_profiles').select('id').limit(1).maybeSingle()

    setHasBabyProfile(!!response.data)
  }

  useFocusEffect(
    useCallback(() => {
      verifyHasBabyProfiles()
    }, [])
  )

  if (hasBabyProfile === undefined) {
    return (
      <View className="bg-white flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    )
  }

  if (hasBabyProfile === false) {
    return (
      <FirstBabyProfile
        goToAddRecord={() => navigation.navigate('BabyProfileCreation', { isFirst: true })}
      />
    )
  }

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerTintColor: colors.custom.primary,
        headerTitleStyle: { fontFamily: 'Nunito_700Bold' }
      }}
      sceneContainerStyle={{ backgroundColor: colors.custom.background }}>
      <BottomTab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => <Feather name="home" size={24} color={colors.custom.primary} />
        }}
      />
      <BottomTab.Screen
        component={BabyProfilesScreen}
        name="BabyProfiles"
        options={{
          headerTitle: 'My ninnos',
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="baby-face-outline"
              size={24}
              color={colors.custom.primary}
            />
          )
        }}
      />
      <BottomTab.Screen
        component={SettingsScreen}
        name="Settings"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Feather name="settings" size={24} color={colors.custom.primary} />
        }}
      />
    </BottomTab.Navigator>
  )
}
