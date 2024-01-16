import { useEffect, useRef, useState } from 'react'
import type { PropsWithChildren, FunctionComponent, Dispatch, SetStateAction } from 'react'

import { format } from 'date-fns'
import { Dimensions, Image, TextInput, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import PagerView from 'react-native-pager-view'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import WheelPicker from 'react-native-wheely'
import { Button, Text } from 'src/components'
import colors from 'src/theme/colors'
import twColors from 'tailwindcss/colors'

import type { RootStackScreen } from 'src/navigation/types'

type LengthData = {
  value: number
  unit: 'cm' | 'in'
}

type WeightData = {
  value: number
  unit: 'kg' | 'lb' | 'st'
}

type BabyProfileDraft = {
  gender: 'F' | 'M'
  name?: string
  birthday: Date
  weight: WeightData
  height: LengthData
  headCircumference: LengthData
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

const weightUnits: WeightData['unit'][] = ['kg', 'lb', 'st']

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
}) => {
  const weight = babyProfileDraft.weight.value
    .toString()
    .split('.')
    .map((v) => parseInt(v, 10) - 1)

  const [selectedIndex, setSelectedIndex] = useState([weight[0], weight[1], 0])

  const handleMoveNext = () => {
    setBabyProfileDraft((prev) => ({
      ...prev,
      weight: {
        unit: weightUnits[selectedIndex[2]],
        value: parseFloat(`${selectedIndex[0] + 1}.${selectedIndex[1] + 1}`)
      }
    }))

    moveNext(index)
  }

  return (
    <StepContainer title={`What is the weight of ${babyProfileDraft.name}?`}>
      <View className="space-y-10">
        <View className="flex-row items-center justify-center space-x-3">
          <View>
            <WheelPicker
              itemHeight={60}
              itemTextStyle={{ fontFamily: 'Nunito_700Bold', fontSize: 24 }}
              onChange={(index) => setSelectedIndex([index, selectedIndex[1], selectedIndex[2]])}
              options={Array.from({ length: 20 }, (_, i) => `${i + 1}`)}
              scaleFunction={(x) => x * 0.7}
              selectedIndex={selectedIndex[0]}
              selectedIndicatorStyle={{ backgroundColor: 'transparent' }}
              visibleRest={1}
            />
          </View>
          <Text bold className="text-2xl">
            ,
          </Text>
          <View>
            <WheelPicker
              itemHeight={60}
              itemTextStyle={{ fontFamily: 'Nunito_700Bold', fontSize: 24 }}
              onChange={(index) => setSelectedIndex([selectedIndex[0], index, selectedIndex[2]])}
              options={Array.from({ length: 99 }, (_, i) => `${i + 1}`)}
              scaleFunction={(x) => x * 0.7}
              selectedIndex={selectedIndex[1]}
              selectedIndicatorStyle={{ backgroundColor: 'transparent' }}
              visibleRest={1}
            />
          </View>
          <View>
            <WheelPicker
              itemHeight={60}
              itemTextStyle={{ fontFamily: 'Nunito_700Bold', fontSize: 24 }}
              onChange={(index) => setSelectedIndex([selectedIndex[0], selectedIndex[1], index])}
              options={weightUnits}
              scaleFunction={(x) => x * 0.7}
              selectedIndex={selectedIndex[2]}
              selectedIndicatorStyle={{ backgroundColor: 'transparent' }}
              visibleRest={1}
            />
          </View>
          {/* <Text bold className="text-2xl">
            {babyProfileDraft.weight.unit}
          </Text> */}
          <View
            className="absolute border-custom-line border-b-[1px] border-t-[1px] h-14 w-full"
            pointerEvents="none"
          />
        </View>
        <Button onPress={handleMoveNext} title="Next" />
      </View>
    </StepContainer>
  )
}

const HeightStep: FunctionComponent<StepProps> = ({ babyProfileDraft, index, moveNext }) => (
  <StepContainer title={`What is the height of ${babyProfileDraft.name}?`}>
    <View className="space-y-10">
      <Text>height</Text>
      <Button onPress={() => moveNext(index)} title="Next" />
    </View>
  </StepContainer>
)

const HeadCircumferenceStep: FunctionComponent<StepProps> = ({
  babyProfileDraft,
  index,
  moveNext
}) => (
  <StepContainer title={`What is the head circumference of ${babyProfileDraft.name}?`}>
    <View className="space-y-10">
      <Text>head circumference</Text>
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
      unit: weightUnits[0],
      value: 3.5
    },
    headCircumference: {
      unit: 'cm',
      value: 30
    }
  })

  console.log(babyProfileDraft.weight)

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
