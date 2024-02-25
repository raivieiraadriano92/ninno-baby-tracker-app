import { useEffect } from 'react'

import { EventEmitter } from 'eventemitter3'

import type { RecordRow } from 'src/models/record'

const event = new EventEmitter()

type UseOnDeleteRecordEvent = (_handler?: (_row: RecordRow) => void) => {
  emit(_row: RecordRow): void
}

const EVENT_NAME = 'onDeleteRecord'

export const useOnOnDeleteRecordEvent: UseOnDeleteRecordEvent = (handler) => {
  const emit = (row: RecordRow) => event.emit(EVENT_NAME, row)

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
