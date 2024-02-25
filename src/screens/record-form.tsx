import type { FunctionComponent, PropsWithChildren } from 'react'
import { useLayoutEffect, useRef } from 'react'

import { Feather } from '@expo/vector-icons'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BaseCard, Button, DeleteRecordBottomSheet, RecordIcon, Text } from 'src/components'
import { useOnOnDeleteRecordEvent } from 'src/hooks'
import colors from 'src/theme/colors'
import { globalErrorBottomSheetRef } from 'src/utils/global-refs'
import { getRecordTypeInfo } from 'src/utils/records'
import { supabase } from 'src/utils/supabase'
import defaultColors from 'tailwindcss/colors'

import type { TouchableOpacityProps, ViewProps } from 'react-native'
import type { DeleteRecordBottomSheetElement } from 'src/components'
import type { RootStackScreen } from 'src/navigation/types'

type FormItemProps = PropsWithChildren<
  ViewProps & {
    label: string
  }
>

type FormItemPillProps = TouchableOpacityProps & {
  title?: string
}

const FormItem: FunctionComponent<FormItemProps> = ({ children, className, label, ...props }) => (
  <View
    className={`border-t-[1px] border-custom-line flex-row items-center justify-between p-4 ${className}`}
    {...props}>
    <Text bold>{label}</Text>
    {children}
  </View>
)

const FormItemPill: FunctionComponent<FormItemPillProps> = ({
  children,
  className,
  title,
  ...props
}) => (
  <TouchableOpacity
    className={`bg-white h-10 justify-center px-4 rounded-lg ${className}`}
    {...props}>
    {!!title && <Text bold>{title}</Text>}
    {children}
  </TouchableOpacity>
)

export const RecordFormScreen: RootStackScreen<'RecordForm'> = ({
  navigation,
  route: {
    params: { record, type }
  }
}) => {
  const recordTypeInfo = getRecordTypeInfo(type)

  const deleteRecordBottomSheetRef = useRef<DeleteRecordBottomSheetElement>(null)

  const { emit: emitOnOnDeleteRecordEvent } = useOnOnDeleteRecordEvent()

  const onDelete = async () => {
    if (!record) {
      return
    }

    deleteRecordBottomSheetRef.current?.setIsDeleting(true)

    const response = await supabase.from('records').delete().eq('id', record.id)

    deleteRecordBottomSheetRef.current?.setIsDeleting(false)

    if (response.error) {
      deleteRecordBottomSheetRef.current?.close()

      globalErrorBottomSheetRef.current?.expand('An error occurred while deleting the record.')

      return
    }

    emitOnOnDeleteRecordEvent(record)

    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        record ? (
          <TouchableOpacity onPress={() => deleteRecordBottomSheetRef.current?.expand()}>
            <Feather name="trash-2" size={24} color={defaultColors.red[500]} />
          </TouchableOpacity>
        ) : null,
      headerTitle: `${record ? 'Edit record' : 'New record'}`
    })
  }, [navigation, record])

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className="pt-6 space-y-8" edges={['bottom']}>
          <BaseCard className="flex-col mx-4">
            <View className="space-y-4">
              <RecordIcon className="self-center" size={80} type={type} />
              <Text bold className="text-center text-xl">
                {recordTypeInfo.title}
              </Text>
            </View>
          </BaseCard>
          <View>
            <FormItem label="Amount, ml">
              <FormItemPill onPress={() => {}} title="130ml" />
            </FormItem>
            <FormItem label="Start">
              <View className="flex-row space-x-2">
                <FormItemPill onPress={() => {}} title="Today" />
                <FormItemPill onPress={() => {}} title="10:20" />
              </View>
            </FormItem>
            <FormItem label="Finish">
              <View className="flex-row space-x-2">
                <FormItemPill onPress={() => {}} title="Today" />
                <FormItemPill onPress={() => {}} title="10:20" />
              </View>
            </FormItem>
            <FormItem label="Duration">
              <FormItemPill onPress={() => {}} title="20 min" />
            </FormItem>
            <FormItem className="flex-col items-start" label="Notes">
              <FormItemPill className="h-20 justify-start mt-4 p-4 w-full" onPress={() => {}}>
                <TextInput
                  className="text-base"
                  multiline
                  placeholder="Add a note"
                  placeholderTextColor={colors.custom.iconOff}
                  style={{ fontFamily: 'Nunito_700Bold' }}
                />
              </FormItemPill>
            </FormItem>
          </View>
          <Button className="mx-4" title="Save" />
        </SafeAreaView>
      </ScrollView>
      {record && <DeleteRecordBottomSheet onDelete={onDelete} ref={deleteRecordBottomSheetRef} />}
    </>
  )
}
