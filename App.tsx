import type { FunctionComponent } from 'react'

import { PortalProvider } from '@gorhom/portal'
import { StatusBar } from 'expo-status-bar'
import { AppState } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GlobalErrorBottomSheet } from 'src/components'
import { RootNavigator } from 'src/navigation/root-navigator'
import { globalErrorBottomSheetRef } from 'src/utils/global-refs'
import { supabase } from 'src/utils/supabase'

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

const App: FunctionComponent = () => (
  <SafeAreaProvider>
    <GestureHandlerRootView className="flex-1">
      <PortalProvider>
        <RootNavigator />
        <GlobalErrorBottomSheet ref={globalErrorBottomSheetRef} />
        <StatusBar style="dark" />
      </PortalProvider>
    </GestureHandlerRootView>
  </SafeAreaProvider>
)

export default App
