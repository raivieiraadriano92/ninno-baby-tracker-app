import { useEffect } from 'react'

import { EventEmitter } from 'eventemitter3'

import type { BabyProfileRow } from 'src/models/baby-profile'

const event = new EventEmitter()

// event.emit(eventName, "rami")

type UseSaveBabyProfileEvent = (_handler?: (_row: BabyProfileRow) => void) => {
  emit(_row: BabyProfileRow): void
}

const EVENT_NAME = 'onSaveBabyProfile'

export const useOnSaveBabyProfileEvent: UseSaveBabyProfileEvent = (handler) => {
  const emit = (row: BabyProfileRow) => event.emit(EVENT_NAME, row)

  useEffect(() => {
    if (handler) {
      event.on(EVENT_NAME, handler)

      return () => {
        event.off(EVENT_NAME, handler)
      }
    }
  }, [handler])

  return { emit }
}
