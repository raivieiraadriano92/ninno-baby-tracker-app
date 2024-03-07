import type { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction } from 'react'
import { useLayoutEffect, useRef, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  BaseCard,
  Button,
  DeleteRecordBottomSheet,
  MeasuresPickerBottomSheet,
  RecordIcon,
  Text
} from 'src/components'
import { useRecordStore } from 'src/store/record-store'
import colors from 'src/theme/colors'
import { getRecordTypeInfo } from 'src/utils/records'
import defaultColors from 'tailwindcss/colors'

import type { TextInputProps, TouchableOpacityProps, ViewProps } from 'react-native'
import type {
  DeleteRecordBottomSheetElement,
  MeasuresPickerBottomSheetElement
} from 'src/components'
import type { MeasureData, RecordDraft } from 'src/models/record'
import type { RootStackScreen } from 'src/navigation/types'

type FormItemProps = PropsWithChildren<
  ViewProps & {
    label: string
  }
>

type FormItemPillProps = TouchableOpacityProps & {
  title?: string
}

type FormItemTextInputProps = TextInputProps

type FormGroupsProps = ViewProps & {
  recordDraft: RecordDraft
  setRecordDraft: Dispatch<SetStateAction<RecordDraft>>
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

const FormItemTextInput: FunctionComponent<FormItemTextInputProps> = ({
  className,
  style,
  ...props
}) => (
  <TextInput
    className={`bg-white h-10 px-4 rounded-lg text-base w-full ${className}`}
    placeholderTextColor={colors.custom.iconOff}
    style={[style, { fontFamily: 'Nunito_700Bold' }]}
    {...props}
  />
)

{
  /* <View>
    <FormItem label="Amount, ml">
        <FormItemPill onPress={() => {}} title="130ml" />
    </FormItem>
    <FormItem label="Start">
        <View className="flex-row space-x-2">
        <FormItemPill onPress={showDatePicker} title="Today" />
        <FormItemPill onPress={() => {}} title="10:20" />
        </View>
    </FormItem>
    <FormItem label="Finish">
        <View className="flex-row space-x-2">
        <FormItemPill onPress={showDatePicker} title="Today" />
        <FormItemPill onPress={() => {}} title="10:20" />
        </View>
    </FormItem>
    <FormItem label="Duration">
        <FormItemPill onPress={() => {}} title="20 min" />
    </FormItem>
    <FormItem className="flex-col items-start" label="Notes">
        <FormItemPill className="h-24 justify-start mt-4 p-4 w-full" onPress={() => {}}>
        <TextInput
            className="text-base"
            multiline
            placeholder="Add a note"
            placeholderTextColor={colors.custom.iconOff}
            style={{ fontFamily: 'Nunito_700Bold' }}
        />
        </FormItemPill>
    </FormItem>
    </View> */
}

const GrowthForm: FunctionComponent<FormGroupsProps> = ({
  recordDraft,
  setRecordDraft,
  ...props
}) => {
  const attributes = recordDraft.attributes as MeasureData

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false)

  const [startDate, setStartDate] = useState(new Date(`${recordDraft.date}T${recordDraft.time}`))

  const measuresPickerBottomSheetRef = useRef<MeasuresPickerBottomSheetElement>(null)

  const showDatePicker = () => {
    setIsDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setIsDatePickerVisible(false)
  }

  const showTimePicker = () => {
    setIsTimePickerVisible(true)
  }

  const hideTimePicker = () => {
    setIsTimePickerVisible(false)
  }

  const onConfirmDateTimePicker = (date: Date) => {
    setStartDate(date)

    setRecordDraft((prev) => ({
      ...prev,
      date: format(date, 'yyyy-MM-dd'),
      time: format(date, 'HH:mm:ss')
    }))

    hideDatePicker()

    hideTimePicker()
  }

  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleChangeNotes = (notes: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setRecordDraft((prev) => ({ ...prev, notes }))
    }, 500)
  }

  return (
    <View {...props}>
      <FormItem label={attributes.unit.toUpperCase()}>
        <FormItemPill
          onPress={() => measuresPickerBottomSheetRef.current?.expand()}
          title={`${attributes.value}${attributes.unit}`}
        />
      </FormItem>
      <FormItem label="Date">
        <View className="flex-row space-x-2">
          <FormItemPill onPress={showDatePicker} title={format(startDate, 'MMM d, yyyy')} />
          <FormItemPill onPress={showTimePicker} title={format(startDate, 'HH:mm')} />
        </View>
      </FormItem>
      <FormItem className="flex-col items-start" label="Notes">
        <FormItemTextInput
          className="h-24 mt-4"
          multiline
          onChangeText={handleChangeNotes}
          placeholder="Add a note"
          defaultValue={recordDraft.notes ?? ''}
        />
      </FormItem>
      <DateTimePickerModal
        date={startDate}
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={onConfirmDateTimePicker}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        date={startDate}
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={onConfirmDateTimePicker}
        onCancel={hideTimePicker}
      />
      <MeasuresPickerBottomSheet
        initialMeasuresPickerValue={attributes}
        onChange={(data) => setRecordDraft((prev) => ({ ...prev, attributes: data }))}
        recordType={recordDraft.type}
        ref={measuresPickerBottomSheetRef}
      />
    </View>
  )
}

export const RecordFormScreen: RootStackScreen<'RecordForm'> = ({
  navigation,
  route: {
    params: { record, type, babyProfileId }
  }
}) => {
  const recordTypeInfo = getRecordTypeInfo(type)

  const [isSaving] = useState(false)

  const [recordDraft, setRecordDraft] = useState<RecordDraft>(
    record
      ? { ...record }
      : {
          attributes: recordTypeInfo.attributes,
          date: format(new Date(), 'yyyy-MM-dd'),
          baby_profile_id: babyProfileId,
          notes: null,
          time: format(new Date(), 'HH:mm:ss'),
          type
        }
  )

  const deleteRecordBottomSheetRef = useRef<DeleteRecordBottomSheetElement>(null)

  const { addRecord, deleteRecord, updateRecord } = useRecordStore()

  const onDelete = async () => {
    if (!record) {
      return
    }

    deleteRecord(record.id)

    navigation.goBack()
  }

  const onSave = async () => {
    if (record) {
      updateRecord({ ...record, ...recordDraft })
    } else {
      addRecord(recordDraft)
    }

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
          <GrowthForm recordDraft={recordDraft} setRecordDraft={setRecordDraft} />
          <Button className="mx-4" isLoading={isSaving} onPress={onSave} title="Save" />
        </SafeAreaView>
      </ScrollView>
      {record && <DeleteRecordBottomSheet onDelete={onDelete} ref={deleteRecordBottomSheetRef} />}
    </>
  )
}
