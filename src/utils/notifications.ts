import * as Notifications from 'expo-notifications'

import { happyBirthdayModalRef } from './global-refs'

import type { BabyProfileRow } from 'src/models/baby-profile'

type RequestNotificationsPermissionsParams = {
  onDenied?(): void
  onGranted?(): void
  onUndetermined?(): void
}

export const requestNotificationsPermissions = async ({
  onDenied,
  onGranted,
  onUndetermined
}: RequestNotificationsPermissionsParams) => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()

  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()

    finalStatus = status
  }

  switch (finalStatus) {
    case 'granted':
      onGranted?.()

      break

    case 'denied':
      onDenied?.()

      break

    case 'undetermined':
      onUndetermined?.()

      break
  }
}

const PREFIX_BIRTHDAY_NOTIFICATION_IDENTIFIER = 'birthday-'

const getHappyBirthdayNotificationIdentifier = (babyProfile: BabyProfileRow) =>
  `${PREFIX_BIRTHDAY_NOTIFICATION_IDENTIFIER}${babyProfile.id}`

export const scheduleHappyBirthdayNotification = (babyProfile: BabyProfileRow) => {
  const firstName = babyProfile.name?.split(' ')[0]

  const identifier = getHappyBirthdayNotificationIdentifier(babyProfile)

  requestNotificationsPermissions({
    onGranted: () =>
      Notifications.scheduleNotificationAsync({
        content: {
          title: `It's ${firstName}'s birthday! 🎉`,
          body: "Let's celebrate this special day together! 🎂",
          data: { id: babyProfile.id, name: firstName, type: 'birthday' }
        },
        identifier,
        trigger: { seconds: 60, repeats: true } // CHANGE for yearly notification
      })
  })
}

export const cancelScheduledHappyBirthdayNotification = async (babyProfile: BabyProfileRow) => {
  const identifier = getHappyBirthdayNotificationIdentifier(babyProfile)

  await Notifications.cancelScheduledNotificationAsync(identifier)
}

const handleHappyBirthdayNotification = (notificationRequest: Notifications.NotificationRequest) =>
  happyBirthdayModalRef.current?.show(notificationRequest.content.data.name)

export const notificationResponseListenerHandler = (
  response: Notifications.NotificationResponse
) => {
  switch (response.notification.request.content.data.type) {
    case 'birthday':
      handleHappyBirthdayNotification(response.notification.request)

      break
  }
}
