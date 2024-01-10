import { Button, View } from 'react-native'

import type { RootStackScreen } from 'src/navigation/types'

export const WelcomeScreen: RootStackScreen<'Welcome'> = ({ navigation }) => (
  <View>
    <Button onPress={() => navigation.navigate('Tabs')} title="Tabs" />
  </View>
)
