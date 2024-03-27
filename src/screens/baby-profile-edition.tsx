import { useLayoutEffect, useRef, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import { format, parseISO } from 'date-fns'
import { Image, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, RecordCard, DeleteBabyProfileBottomSheet } from 'src/components'
import { useBabyProfileStore } from 'src/store/baby-profile-store'
import { useRecordStore } from 'src/store/record-store'
import colors from 'src/theme/colors'
import twColors from 'tailwindcss/colors'

import type { DeleteBabyProfileBottomSheetElement } from 'src/components'
import type { RecordType } from 'src/models/record'
import type { RootStackScreen } from 'src/navigation/types'

export const BabyProfileEditionScreen: RootStackScreen<'BabyProfileEdition'> = ({
  navigation,
  route: {
    params: { babyProfile }
  }
}) => {
  const refInputName = useRef<TextInput>(null)

  const refInputNameValue = useRef<string>('')

  const deleteBabyProfileBottomSheetRef = useRef<DeleteBabyProfileBottomSheetElement>(null)

  const {
    getLatestHeight,
    getLatestWeight,
    getLatestHeadCircumference,
    deleteRecordsForBabyProfile
  } = useRecordStore()

  const latestHeight = getLatestHeight(babyProfile.id)

  const latestWeight = getLatestWeight(babyProfile.id)

  const headCircumference = getLatestHeadCircumference(babyProfile.id)

  const [placeholderTextColor, setPlaceholderTextColor] = useState(colors.custom.iconOff)

  const { editBabyProfile, deleteBabyProfile } = useBabyProfileStore()

  const records: [RecordType, string][] = [
    ['birthday', format(parseISO(babyProfile.birthday), 'MMM d, yyyy')],
    ['weight', `${latestHeight?.attributes?.value}${latestHeight?.attributes?.unit}`],
    ['height', `${latestWeight?.attributes?.value}${latestWeight?.attributes?.unit}`],
    ['head', `${headCircumference?.attributes?.value}${headCircumference?.attributes?.unit}`]
  ]

  const handleChangeName = () => {
    if (!refInputNameValue.current) {
      setPlaceholderTextColor(twColors.red[500])

      return
    }

    const updatedBabyProfile = editBabyProfile({
      ...babyProfile,
      name: refInputNameValue.current
    })

    navigation.setParams({ babyProfile: updatedBabyProfile })
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    const updatedBabyProfile = editBabyProfile({
      ...babyProfile,
      birthday: format(date, 'yyyy-MM-dd')
    })

    navigation.setParams({ babyProfile: updatedBabyProfile })

    hideDatePicker()
  }

  const onDelete = async () => {
    deleteRecordsForBabyProfile(babyProfile.id)

    deleteBabyProfile(babyProfile.id)

    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => deleteBabyProfileBottomSheetRef.current?.expand()}>
          <Feather name="trash-2" size={24} color={twColors.red[500]} />
        </TouchableOpacity>
      ),
      headerTitle: 'Edit ninno'
    })
  }, [navigation])

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className="pt-6 px-4 space-y-8" edges={['bottom']}>
          <View className="items-center space-y-8">
            <Image
              source={
                babyProfile.gender === 'F'
                  ? require('assets/ninno-avatar-girl.png')
                  : require('assets/ninno-avatar-boy.png')
              }
            />
            <View className="flex-row items-center justify-center">
              <TextInput
                autoCapitalize="words"
                className="text-2xl text-center text-custom-primary"
                defaultValue={babyProfile.name}
                maxLength={50}
                onChangeText={(text) => (refInputNameValue.current = text)}
                placeholder="Enter the name"
                placeholderTextColor={placeholderTextColor}
                ref={refInputName}
                returnKeyType="done"
                returnKeyLabel="Save"
                onEndEditing={handleChangeName}
                style={{ fontFamily: 'Nunito_700Bold' }}
              />
              <TouchableOpacity
                className="absolute -right-8"
                onPress={() => {
                  refInputName.current?.focus()
                }}>
                <Feather name="edit-3" size={16} color={colors.custom.primary} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="space-y-3">
            {records.map((item) => (
              <RecordCard
                key={item[0]}
                renderRight={() => (
                  <View className="flex-row items-center space-x-4">
                    <Text medium>{item[1]}</Text>
                    {item[0] === 'birthday' && (
                      <TouchableOpacity onPress={showDatePicker}>
                        <Feather name="edit-3" size={16} color={colors.custom.primary} />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                type={item[0]}
              />
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
      <DateTimePickerModal
        date={parseISO(babyProfile.birthday)}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DeleteBabyProfileBottomSheet onDelete={onDelete} ref={deleteBabyProfileBottomSheetRef} />
    </>
  )
}
