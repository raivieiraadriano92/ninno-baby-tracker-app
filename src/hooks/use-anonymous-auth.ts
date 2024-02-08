import { useState } from 'react'

import * as SecureStore from 'expo-secure-store'
import 'react-native-get-random-values'
import { supabase } from 'src/utils/supabase'
import { v4 as uuidv4 } from 'uuid'

type UseAnonymousAuthProps = {
  onError?: (_error: string) => void
}

const NINNO_ANONYMOUS_AUTH_KEY = 'NINNO_ANONYMOUS_AUTH_KEY'

const generateAnonymousEmail = (uuid: string) => `anonymous-${uuid}@ninno.app`

export const useAnonymousAuth = (props?: UseAnonymousAuthProps) => {
  const { onError } = props ?? {}

  const [loading, setLoading] = useState(false)

  const signIn = (uuid: string) =>
    supabase.auth.signInWithPassword({
      email: generateAnonymousEmail(uuid),
      password: uuid
    })

  const signUp = (uuid: string) =>
    supabase.auth.signUp({
      email: generateAnonymousEmail(uuid),
      password: uuid
    })

  const authenticate = async () => {
    setLoading(true)

    const uuid = uuidv4()

    const fetchUUID = await SecureStore.getItemAsync(NINNO_ANONYMOUS_AUTH_KEY)

    // if user has already signed up prior
    if (fetchUUID) {
      const signInResponse = await signIn(fetchUUID)

      if (signInResponse.error) {
        // if for unknown reason the user is not found, try to sign them up again
        const signUpResponse = await signUp(fetchUUID)

        // if even
        if (signUpResponse.error) {
          onError?.('Something went wrong.\nPlease try again.')
        }
      }
    } else {
      // if user has not signed up before
      await SecureStore.setItemAsync(NINNO_ANONYMOUS_AUTH_KEY, uuid.toString())

      const signUpResponse = await signUp(uuid)

      if (signUpResponse.error) {
        onError?.(signUpResponse.error.message)
      }
    }

    setLoading(false)
  }

  return { authenticate, loading }
}
