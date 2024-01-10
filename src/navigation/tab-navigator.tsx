import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from 'src/screens'

import type { RootStackScreen, TabParamList } from './types'

const BottomTab = createBottomTabNavigator<TabParamList>()

export const TabNavigator: RootStackScreen<'Tabs'> = () => (
  <BottomTab.Navigator>
    <BottomTab.Screen component={HomeScreen} name="Home" />
  </BottomTab.Navigator>
)
