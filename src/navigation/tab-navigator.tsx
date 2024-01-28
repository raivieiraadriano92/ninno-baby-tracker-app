import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from 'src/screens'
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
  </BottomTab.Navigator>
)
