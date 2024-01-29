import type { FunctionComponent } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  BabyProfileCreationScreen,
  RecordFormScreen,
  RecordsScreen,
  WelcomeScreen
} from 'src/screens'
import colors from 'src/theme/colors'

import { TabNavigator } from './tab-navigator'

import type { RootStackParamList } from './types'

const NativeStack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator: FunctionComponent = () => (
  <NativeStack.Navigator
    initialRouteName="Tabs"
    screenOptions={{
      contentStyle: { backgroundColor: colors.custom.background },
      headerBackTitleVisible: false,
      headerTintColor: colors.custom.primary,
      headerTitleStyle: { fontFamily: 'Nunito_700Bold' }
    }}>
    <NativeStack.Screen component={TabNavigator} name="Tabs" options={{ headerShown: false }} />
    <NativeStack.Screen
      component={BabyProfileCreationScreen}
      name="BabyProfileCreation"
      options={{
        headerTitle: '',
        headerTransparent: true
      }}
    />
    <NativeStack.Screen component={RecordFormScreen} name="RecordForm" />
    <NativeStack.Screen component={RecordsScreen} name="Records" />
    <NativeStack.Screen
      component={WelcomeScreen}
      name="Welcome"
      options={{ contentStyle: { backgroundColor: colors.custom.blue4 }, headerShown: false }}
    />
  </NativeStack.Navigator>
)
