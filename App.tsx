import type { FunctionComponent } from 'react'
import { useCallback } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { usePreloadApp } from 'src/hooks'
import { RootNavigator } from 'src/navigation/root-navigator'
import { theme } from 'src/theme'

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

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
    <NavigationContainer onReady={onLayoutRootView} theme={theme}>
      <RootNavigator />
      <StatusBar style="dark" />
    </NavigationContainer>
  )
}

export default App
