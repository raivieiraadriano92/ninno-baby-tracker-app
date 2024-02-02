import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BabyProfilesScreen, HomeScreen, SettingsScreen } from 'src/screens'
import colors from 'src/theme/colors'

import type { RootStackScreen, TabParamList } from './types'

const BottomTab = createBottomTabNavigator<TabParamList>()

export const TabNavigator: RootStackScreen<'Tabs'> = () => (
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
