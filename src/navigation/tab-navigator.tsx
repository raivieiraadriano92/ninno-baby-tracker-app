import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from 'src/screens'
import colors from 'src/theme/colors'

import type { RootStackScreen, TabParamList } from './types'

const BottomTab = createBottomTabNavigator<TabParamList>()

export const TabNavigator: RootStackScreen<'Tabs'> = () => (
  <BottomTab.Navigator sceneContainerStyle={{ backgroundColor: colors.custom.background }}>
    <BottomTab.Screen component={HomeScreen} name="Home" />
  </BottomTab.Navigator>
)
