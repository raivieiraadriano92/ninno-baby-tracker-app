import { useEffect, type FunctionComponent } from 'react'

import { PortalProvider } from '@gorhom/portal'
import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GlobalErrorBottomSheet, HappyBirthdayModal } from 'src/components'
import { RootNavigator } from 'src/navigation/root-navigator'
import { globalErrorBottomSheetRef, happyBirthdayModalRef } from 'src/utils/global-refs'
import { notificationResponseListenerHandler } from 'src/utils/notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

const App: FunctionComponent = () => {
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(() => {
      //   console.log('notification', JSON.stringify(notification))
    })

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      notificationResponseListenerHandler
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)

      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

  return (
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
}

export default App
