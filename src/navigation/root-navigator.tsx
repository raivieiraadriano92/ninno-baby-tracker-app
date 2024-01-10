import type { FunctionComponent } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen } from 'src/screens'

import { TabNavigator } from './tab-navigator'

import type { RootStackParamList } from './types'

const NativeStack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator: FunctionComponent = () => (
  <NativeStack.Navigator initialRouteName="Welcome">
    <NativeStack.Screen component={TabNavigator} name="Tabs" options={{ headerShown: false }} />
    <NativeStack.Screen component={WelcomeScreen} name="Welcome" />
  </NativeStack.Navigator>
)
