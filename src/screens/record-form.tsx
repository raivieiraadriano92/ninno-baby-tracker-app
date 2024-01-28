import { useLayoutEffect } from 'react'

import { Feather } from '@expo/vector-icons'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, RecordIcon, Text } from 'src/components'
import { getRecordTypeInfo } from 'src/utils/records'
import colors from 'tailwindcss/colors'

import type { RootStackScreen } from 'src/navigation/types'

export const RecordFormScreen: RootStackScreen<'RecordForm'> = ({
  navigation,
  route: {
    params: { id, type }
  }
}) => {
  const recordTypeInfo = getRecordTypeInfo(type)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        id ? (
          <TouchableOpacity>
            <Feather name="trash-2" size={24} color={colors.red[500]} />
          </TouchableOpacity>
        ) : null,
      headerTitle: `${id ? 'Edit record' : 'New record'}`
    })
  }, [id, navigation])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="p-4 pt-6 space-y-8" edges={['bottom']}>
        <View className="items-center space-y-4">
          <RecordIcon className="self-center" size={80} type={type} />
          <Text bold className="text-xl">
            {recordTypeInfo.title}
          </Text>
        </View>
        <Text bold className="text-6xl text-center" style={{ lineHeight: 72 }}>
          00:00
        </Text>
        <Button onPress={() => {}} title="Start" />
      </SafeAreaView>
    </ScrollView>
  )
}
