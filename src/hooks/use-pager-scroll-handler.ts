import { useHandler, useEvent } from 'react-native-reanimated'

export const usePagerViewScrollHandler = (handlers: any, dependencies?: any) => {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies)

  const subscribeForEvents = ['onPageScroll']

  return useEvent<any>(
    (event) => {
      'worklet'

      const { onPageScroll } = handlers

      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context)
      }
    },
    subscribeForEvents,
    doDependenciesDiffer
  )
}
