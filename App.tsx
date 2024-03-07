import type { FunctionComponent } from 'react'

import { PortalProvider } from '@gorhom/portal'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GlobalErrorBottomSheet } from 'src/components'
import { RootNavigator } from 'src/navigation/root-navigator'
import { globalErrorBottomSheetRef } from 'src/utils/global-refs'

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
