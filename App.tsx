import { type FunctionComponent } from 'react'

import { PortalProvider } from '@gorhom/portal'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { HappyBirthdayModal, GlobalErrorBottomSheet } from 'src/components'
import { RootNavigator } from 'src/navigation/root-navigator'
import { globalErrorBottomSheetRef, happyBirthdayModalRef } from 'src/utils/global-refs'

const App: FunctionComponent = () => (
  <SafeAreaProvider>
    <GestureHandlerRootView className="flex-1">
      <PortalProvider>
        <RootNavigator />
        <GlobalErrorBottomSheet ref={globalErrorBottomSheetRef} />
        <HappyBirthdayModal ref={happyBirthdayModalRef} />
        <StatusBar style="dark" />
      </PortalProvider>
    </GestureHandlerRootView>
  </SafeAreaProvider>
)

export default App
