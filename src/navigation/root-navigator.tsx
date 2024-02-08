import { useState, type FunctionComponent, useEffect } from 'react'
import { useCallback } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen'
import { usePreloadApp } from 'src/hooks'
import {
  BabyProfileCreationScreen,
  RecordFormScreen,
  RecordsScreen,
  WelcomeScreen
} from 'src/screens'
import { theme } from 'src/theme'
import colors from 'src/theme/colors'
import { supabase } from 'src/utils/supabase'

import { TabNavigator } from './tab-navigator'

import type { RootStackParamList } from './types'
import type { Session } from '@supabase/supabase-js'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

const NativeStack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator: FunctionComponent = () => {
  const { appIsReady } = usePreloadApp()

  const [session, setSession] = useState<Session | null | undefined>(undefined)

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && session !== undefined) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady, session])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })
  }, [])

  useEffect(() => {
    // avoid re-rendering the component when the session changes
    if (session !== undefined) {
      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange((_event, authSession) => {
        if (authSession?.access_token !== session?.access_token) {
          setSession(authSession)
        }
      })

      return () => {
        subscription.unsubscribe()
      }
    }
  }, [session])

  if (!appIsReady || session === undefined) {
    return null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView} theme={theme}>
      <NativeStack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: colors.custom.background },
          headerBackTitleVisible: false,
          headerTintColor: colors.custom.primary,
          headerTitleStyle: { fontFamily: 'Nunito_700Bold' }
        }}>
        {session ? (
          <>
            <NativeStack.Screen
              component={TabNavigator}
              name="Tabs"
              options={{ headerShown: false }}
            />
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
          </>
        ) : (
          <NativeStack.Screen
            component={WelcomeScreen}
            name="Welcome"
            options={{ contentStyle: { backgroundColor: colors.custom.blue4 }, headerShown: false }}
          />
        )}
      </NativeStack.Navigator>
    </NavigationContainer>
  )
}
