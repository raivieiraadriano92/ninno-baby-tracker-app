import type { FunctionComponent } from 'react'

import { StatusBar } from 'expo-status-bar'
import { AppState } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { RootNavigator } from 'src/navigation/root-navigator'
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
  <GestureHandlerRootView className="flex-1">
    <RootNavigator />
    <StatusBar style="dark" />
  </GestureHandlerRootView>
)

export default App
