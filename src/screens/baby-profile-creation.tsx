import { useEffect, useRef, useState } from 'react'
import type { PropsWithChildren, FunctionComponent, Dispatch, SetStateAction } from 'react'

import { format } from 'date-fns'
import { Dimensions, Image, TextInput, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import PagerView from 'react-native-pager-view'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, MeasuresPicker, Text } from 'src/components'
import colors from 'src/theme/colors'
import twColors from 'tailwindcss/colors'

import type { RootStackScreen } from 'src/navigation/types'

type MeasureData = {
  value: number
  unit: string
}

type BabyProfileDraft = {
  gender: 'F' | 'M'
  name?: string
  birthday: Date
  weight: MeasureData
  height: MeasureData
  headCircumference: MeasureData
}

type StepContainerProps = PropsWithChildren<{
  title: string
}>

type StepProps = {
  babyProfileDraft: BabyProfileDraft
  cancel: () => void
  index: number
  isFocused: boolean
  moveNext: (_index: number) => void
  save: () => void
  setBabyProfileDraft: Dispatch<SetStateAction<BabyProfileDraft>>
}

const { height: WINDOW_HEIGHT } = Dimensions.get('window')

const HEADER_BG_HEIGHT = 280

const GENDER_STEP_BG_HEIGHT = WINDOW_HEIGHT * 0.35

const GRASS_HEIGHT = 65

const { width: WINDOW_WIDTH } = Dimensions.get('window')

const StepContainer: FunctionComponent<StepContainerProps> = ({ children, title }) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={{ width: WINDOW_WIDTH }}>
      <View className="justify-center px-10" style={{ height: HEADER_BG_HEIGHT - insets.top }}>
        <Text bold className="text-3xl text-center">
          {title}
        </Text>
      </View>
      <View className="p-10">{children}</View>
    </View>
  )
}

const GenderStep: FunctionComponent<StepProps> = ({ index, moveNext, setBabyProfileDraft }) => {
  const handleMoveNext = (gender: 'F' | 'M') => {
    setBabyProfileDraft((prev) => ({ ...prev, gender }))

    moveNext(index)
  }

  return (
    <>
      <StepContainer title="Let's get to know each other!">
        <View className="space-y-10">
          <Text bold className="text-2xl text-center">
            Who is your cutie?
          </Text>
          <View className="flex-row space-x-5">
            <Button className="flex-1" onPress={() => handleMoveNext('M')} title="Boy" />
            <Button className="flex-1" onPress={() => handleMoveNext('F')} title="Girl" />
          </View>
        </View>
      </StepContainer>
      <View
        className="absolute bottom-0 items-end justify-start overflow-hidden w-full"
        style={{ height: GENDER_STEP_BG_HEIGHT }}>
        <Image className="-mr-4 -mt-6" source={require('assets/bg-gender.png')} />
      </View>
    </>
  )
}

const NameStep: FunctionComponent<StepProps> = ({
  index,
  isFocused,
  moveNext,
  setBabyProfileDraft
}) => {
  const refInputName = useRef<TextInput>(null)

  const refInputNameValue = useRef<string>('')

  const [placeholderTextColor, setPlaceholderTextColor] = useState(colors.custom.iconOff)

  const handleMoveNext = () => {
    if (!refInputNameValue.current) {
      setPlaceholderTextColor(twColors.red[500])

      return
    }

    setBabyProfileDraft((prev) => ({ ...prev, name: refInputNameValue.current }))

    moveNext(index)
  }

  useEffect(() => {
    if (isFocused) {
      refInputName.current?.focus()
    }
  }, [isFocused])

  return (
    <StepContainer title="What's the name of the baby?">
      <View className="space-y-10">
        <TextInput
          autoCapitalize="words"
          className="text-2xl text-center text-custom-primary"
          onChangeText={(text) => (refInputNameValue.current = text)}
          placeholder="Enter the name"
          placeholderTextColor={placeholderTextColor}
          ref={refInputName}
          style={{ fontFamily: 'Nunito_700Bold' }}
        />
        <Button onPress={handleMoveNext} title="Next" />
      </View>
    </StepContainer>
  )
}

const BirthdayStep: FunctionComponent<StepProps> = ({
  babyProfileDraft,
  index,
  moveNext,
  setBabyProfileDraft
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date: Date) => {
    setBabyProfileDraft((prev) => ({ ...prev, birthday: date }))

    hideDatePicker()
  }

  return (
    <StepContainer title={`When is the birthday of ${babyProfileDraft.name}?`}>
      <View className="space-y-10">
        <DateTimePickerModal
          date={babyProfileDraft.birthday}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <Button
          onPress={showDatePicker}
          title={format(babyProfileDraft.birthday, 'PP')}
          variant="outline"
        />
        <Button onPress={() => moveNext(index)} title="Next" />
      </View>
    </StepContainer>
  )
}

const WeightStep: FunctionComponent<StepProps> = ({
  babyProfileDraft,
  index,
  moveNext,
  setBabyProfileDraft
}) => (
  <StepContainer title={`What is the weight of ${babyProfileDraft.name}?`}>
    <View className="space-y-10">
      <MeasuresPicker
        initialValue={babyProfileDraft.weight}
        onChange={(weight) =>
          setBabyProfileDraft((prev) => ({
            ...prev,
            weight
          }))
        }
        type="weight"
      />
      <Button onPress={() => moveNext(index)} title="Next" />
    </View>
  </StepContainer>
)

const HeightStep: FunctionComponent<StepProps> = ({
  babyProfileDraft,
  index,
  moveNext,
  setBabyProfileDraft
}) => (
  <StepContainer title={`What is the height of ${babyProfileDraft.name}?`}>
    <View className="space-y-10">
      <MeasuresPicker
        initialValue={babyProfileDraft.height}
        onChange={(height) =>
          setBabyProfileDraft((prev) => ({
            ...prev,
            height
          }))
        }
        type="length"
      />
      <Button onPress={() => moveNext(index)} title="Next" />
    </View>
  </StepContainer>
)

const HeadCircumferenceStep: FunctionComponent<StepProps> = ({
  babyProfileDraft,
  index,
  moveNext,
  setBabyProfileDraft
}) => (
  <StepContainer title={`What is the head circumference of ${babyProfileDraft.name}?`}>
    <View className="space-y-10">
      <MeasuresPicker
        initialValue={babyProfileDraft.headCircumference}
        onChange={(headCircumference) =>
          setBabyProfileDraft((prev) => ({
            ...prev,
            headCircumference
          }))
        }
        type="length"
      />
      <Button onPress={() => moveNext(index)} title="Next" />
    </View>
  </StepContainer>
)

const ConfirmationStep: FunctionComponent<StepProps> = ({ cancel, save }) => (
  <StepContainer title="Confirmation">
    <View className="space-y-10">
      <View className="space-y-3">
        <View className="bg-white-100 flex-row items-center justify-between px-4 py-3 rounded-2xl">
          <View className="flex-row items-center space-x-4">
            <View className="bg-custom-yellow1 h-11 items-center justify-center w-11 rounded-lg" />
            <Text medium>Birthday</Text>
          </View>
          <Text medium>2 August 2023</Text>
        </View>
      </View>
      <View className="flex-row space-x-5">
        <Button className="flex-1" onPress={cancel} title="Cancel" />
        <Button className="flex-1" onPress={save} title="Save" />
      </View>
    </View>
  </StepContainer>
)

const steps = [
  GenderStep,
  NameStep,
  BirthdayStep,
  WeightStep,
  HeightStep,
  HeadCircumferenceStep,
  ConfirmationStep
]

export const BabyProfileCreationScreen: RootStackScreen<'BabyProfileCreation'> = ({
  navigation
}) => {
  const pagerViewRef = useRef<PagerView>(null)

  const [currentPage, setCurrentPage] = useState(0)

  const [babyProfileDraft, setBabyProfileDraft] = useState<BabyProfileDraft>({
    birthday: new Date(),
    gender: 'M',
    height: {
      unit: 'cm',
      value: 50
    },
    weight: {
      unit: 'kg',
      value: 3.5
    },
    headCircumference: {
      unit: 'cm',
      value: 30
    }
  })

  const cancel = () => {
    navigation.goBack()
  }

  const moveNext = (index: number) => {
    pagerViewRef.current?.setPage(index + 1)
  }

  const save = () => navigation.replace('Tabs')

  return (
    <>
      <View
        className="items-center justify-end overflow-hidden w-full"
        style={{ height: HEADER_BG_HEIGHT }}>
        <Image
          source={
            babyProfileDraft.gender === 'F'
              ? require('assets/bg-shape-header-pink.png')
              : require('assets/bg-shape-header-blue.png')
          }
        />
      </View>
      <SafeAreaView className="absolute h-full w-full" edges={['top']}>
        <PagerView
          className="flex-1"
          initialPage={0}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position)
          }}
          ref={pagerViewRef}
          //   scrollEnabled={false}
        >
          {steps.map((Step, index) => (
            <Step
              key={index}
              isFocused={index === currentPage}
              {...{ babyProfileDraft, cancel, index, moveNext, save, setBabyProfileDraft }}
            />
          ))}
        </PagerView>
      </SafeAreaView>
      <View
        className="absolute bottom-0 items-center justify-start overflow-hidden w-full"
        style={{ height: GRASS_HEIGHT }}>
        <Image source={require('assets/grass.png')} />
      </View>
    </>
  )
}
