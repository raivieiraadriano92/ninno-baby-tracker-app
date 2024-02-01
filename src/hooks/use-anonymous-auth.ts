import { useState } from 'react'

import * as SecureStore from 'expo-secure-store'
import 'react-native-get-random-values'
import { supabase } from 'src/utils/supabase'
import { v4 as uuidv4 } from 'uuid'

const NINNO_ANONYMOUS_AUTH_KEY = 'NINNO_ANONYMOUS_AUTH_KEY'

const generateAnonymousEmail = (uuid: string) => `anonymous-${uuid}@ninno.app`

export const useAnonymousAuth = () => {
  const [error, setError] = useState<string>()

  const [loading, setLoading] = useState(false)

  const authenticate = async () => {
    setLoading(true)

    const uuid = uuidv4()

    const fetchUUID = await SecureStore.getItemAsync(NINNO_ANONYMOUS_AUTH_KEY)

    // if user has already signed up prior
    if (fetchUUID) {
      const { error } = await supabase.auth.signInWithPassword({
        email: generateAnonymousEmail(fetchUUID),
        password: fetchUUID
      })

      if (error) {
        setError(error.message)
      }
    } else {
      await SecureStore.setItemAsync(NINNO_ANONYMOUS_AUTH_KEY, uuid.toString())

      const { error } = await supabase.auth.signUp({
        email: generateAnonymousEmail(uuid),
        password: uuid
      })

      if (error) {
        setError(error.message)
      }
    }

    setLoading(false)
  }

  return { authenticate, error, loading }
}
