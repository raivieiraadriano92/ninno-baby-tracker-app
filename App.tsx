import type { FunctionComponent } from 'react'
import { useCallback } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { AppState } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { usePreloadApp } from 'src/hooks'
import { RootNavigator } from 'src/navigation/root-navigator'
import { theme } from 'src/theme'
import { supabase } from 'src/utils/supabase'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const App: FunctionComponent = () => {
  const { appIsReady } = usePreloadApp()

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <NavigationContainer onReady={onLayoutRootView} theme={theme}>
        <RootNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App
