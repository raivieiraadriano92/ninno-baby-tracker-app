import { useEffect, useState } from 'react'

import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold
} from '@expo-google-fonts/nunito'
import * as Font from 'expo-font'

export const usePreloadApp = () => {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font)

        await Font.loadAsync({
          Nunito_400Regular,
          Nunito_500Medium,
          Nunito_600SemiBold,
          Nunito_700Bold
        })
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  return { appIsReady }
}
