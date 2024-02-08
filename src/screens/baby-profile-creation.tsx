import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { PropsWithChildren, FunctionComponent, Dispatch, SetStateAction } from 'react'

import { format } from 'date-fns'
import { Dimensions, Image, ScrollView, TextInput, View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import PagerView from 'react-native-pager-view'
import Animated, {
  Layout,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, MeasuresPicker, RecordCard, Text } from 'src/components'
import { usePagerViewScrollHandler } from 'src/hooks'
import colors from 'src/theme/colors'
import twColors from 'tailwindcss/colors'
import { create } from 'zustand'

import type { ImageSourcePropType } from 'react-native'
import type { RecordType } from 'src/models/record'
import type { RootStackScreen } from 'src/navigation/types'

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

type CurrentPageState = {
  currentPage: number
  setCurrentPage: (_index: number) => void
}

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

type NextButtonIllustrationContainerProps = PropsWithChildren<{
  illustrationSource: ImageSourcePropType
}>

type StepContainerProps = PropsWithChildren<
  | {
      babyProfileDraft?: never
      isLast?: never
      title: string
    }
  | {
      babyProfileDraft: BabyProfileDraft
      isLast: boolean
      title?: never
    }
>

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

const HEADER_BG_HEIGHT = 200

const HEADER_BG_HEIGHT_CONFIRMATION_STEP = 280

const GENDER_STEP_BG_HEIGHT = WINDOW_HEIGHT * 0.39

const GRASS_HEIGHT = 65

const PROGRESS_BAR_WIDTH = 90

const { width: WINDOW_WIDTH } = Dimensions.get('window')

const NextButtonIllustrationContainer: FunctionComponent<NextButtonIllustrationContainerProps> = ({
  children,
  illustrationSource
}) => (
  <View>
    {WINDOW_HEIGHT >= 800 && (
      <View
        className="items-center -mb-5 overflow-hidden"
        style={{ height: WINDOW_HEIGHT * 0.28, maxHeight: 300 }}>
        <Image source={illustrationSource} />
      </View>
    )}
    {children}
  </View>
)

const StepContainer: FunctionComponent<StepContainerProps> = ({
  babyProfileDraft,
  children,
  isLast,
  title
}) => (
  <View style={{ width: WINDOW_WIDTH }}>
    <View
      className="justify-center"
      style={{ height: isLast ? HEADER_BG_HEIGHT_CONFIRMATION_STEP : HEADER_BG_HEIGHT }}>
      {isLast ? (
        <View className="items-center px-10 space-y-5">
          <Image
            source={
              babyProfileDraft.gender === 'F'
                ? require('assets/ninno-avatar-girl.png')
                : require('assets/ninno-avatar-boy.png')
            }
          />
          <Text bold className="text-2xl text-center">
            {babyProfileDraft.name}
          </Text>
        </View>
      ) : (
        <Text bold className="text-3xl text-center">
          {title}
        </Text>
      )}
    </View>
    <View className="p-10 py-5">{children}</View>
  </View>
)

const GenderStep: FunctionComponent<StepProps> = ({ index, moveNext, setBabyProfileDraft }) => {
  const handleMoveNext = (gender: 'F' | 'M') => {
    setBabyProfileDraft((prev) => ({ ...prev, gender }))

    moveNext(index)
  }

  return (
    <>
      <StepContainer title={`Let's get to know\neach other!`}>
        <View className="space-y-5">
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
  babyProfileDraft,
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
    <StepContainer title={`What's ${babyProfileDraft.gender === 'F' ? 'her' : 'his'} name?`}>
      <View className="space-y-5">
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
  const firstName = babyProfileDraft.name?.split(' ')[0]

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
    <StepContainer title={`When is\n${firstName}'s birthday?`}>
      <View className="space-y-5">
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
  const firstName = babyProfileDraft.name?.split(' ')[0]

  return (
    <StepContainer title={`What is\n${firstName}'s weight?`}>
      <View className="space-y-5">
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
        <NextButtonIllustrationContainer
          illustrationSource={require('assets/ninno-weight-step.png')}>
          <Button onPress={() => moveNext(index)} title="Next" />
        </NextButtonIllustrationContainer>
      </View>
    </StepContainer>
  )
}

const HeightStep: FunctionComponent<StepProps> = ({
  babyProfileDraft,
  index,
  moveNext,
  setBabyProfileDraft
}) => {
  const firstName = babyProfileDraft.name?.split(' ')[0]

  return (
    <StepContainer title={`What is\n${firstName}'s height?`}>
      <View className="space-y-5">
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
        <NextButtonIllustrationContainer
          illustrationSource={require('assets/ninno-height-step.png')}>
          <Button onPress={() => moveNext(index)} title="Next" />
        </NextButtonIllustrationContainer>
      </View>
    </StepContainer>
  )
}

const HeadCircumferenceStep: FunctionComponent<StepProps> = ({
  babyProfileDraft,
  index,
  moveNext,
  setBabyProfileDraft
}) => {
  const firstName = babyProfileDraft.name?.split(' ')[0]

  return (
    <StepContainer title={`What is ${firstName}'s\nhead circumference?`}>
      <View className="space-y-5">
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
        <NextButtonIllustrationContainer
          illustrationSource={require('assets/ninno-head-circumference-step.png')}>
          <Button onPress={() => moveNext(index)} title="Next" />
        </NextButtonIllustrationContainer>
      </View>
    </StepContainer>
  )
}

const ConfirmationStep: FunctionComponent<StepProps> = ({ babyProfileDraft, cancel, save }) => {
  const records: [RecordType, string][] = [
    ['birthday', format(babyProfileDraft.birthday, 'd MMM yyyy')],
    ['weight', `${babyProfileDraft.weight.value}${babyProfileDraft.weight.unit}`],
    ['height', `${babyProfileDraft.height.value}${babyProfileDraft.height.unit}`],
    [
      'head',
      `${babyProfileDraft.headCircumference.value}${babyProfileDraft.headCircumference.unit}`
    ]
  ]

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StepContainer babyProfileDraft={babyProfileDraft} isLast>
        <View className="space-y-5">
          <View className="space-y-3">
            {records.map((item) => (
              <RecordCard
                key={item[0]}
                renderRight={() => <Text medium>{item[1]}</Text>}
                type={item[0]}
              />
            ))}
          </View>
          <View className="flex-row space-x-5">
            <Button className="flex-1" onPress={cancel} variant="outline" title="Cancel" />
            <Button className="flex-1" onPress={save} title="Save" />
          </View>
        </View>
      </StepContainer>
    </ScrollView>
  )
}

const steps = [
  GenderStep,
  NameStep,
  BirthdayStep,
  WeightStep,
  HeightStep,
  HeadCircumferenceStep,
  ConfirmationStep
]

const useCurrentPageStore = create<CurrentPageState>()((set) => ({
  currentPage: 0,
  setCurrentPage: (index) => set(() => ({ currentPage: index }))
}))

const ProgressBar: FunctionComponent = () => {
  const currentPage = useCurrentPageStore((state) => state.currentPage)

  return (
    <View className="bg-white h-2 rounded-full" style={{ width: PROGRESS_BAR_WIDTH }}>
      <Animated.View
        className="bg-custom-primary h-2 rounded-full"
        layout={Layout.springify()}
        style={{ width: (PROGRESS_BAR_WIDTH / steps.length) * (currentPage + 1) }}
      />
    </View>
  )
}

export const BabyProfileCreationScreen: RootStackScreen<'BabyProfileCreation'> = ({
  navigation
}) => {
  const insets = useSafeAreaInsets()

  const pagerViewRef = useRef<PagerView>(null)

  const { currentPage, setCurrentPage } = useCurrentPageStore()

  const [babyProfileDraft, setBabyProfileDraft] = useState<BabyProfileDraft>({
    birthday: new Date(),
    headCircumference: {
      unit: 'cm',
      value: 30
    },
    height: {
      unit: 'cm',
      value: 50
    },
    gender: 'M',
    name: 'Test',
    weight: {
      unit: 'kg',
      value: 3.5
    }
  })

  const cancel = () => {
    navigation.goBack()
  }

  const moveNext = (index: number) => {
    pagerViewRef.current?.setPage(index + 1)
  }

  const save = () => navigation.replace('Tabs')

  const progress = useSharedValue(0)

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      steps.map((_, index) => index),
      steps.map((_, index) => (index === steps.length - 1 ? colors.custom.background : 'white'))
    )
  }))

  const animatedGrassStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      steps.map((_, index) => index),
      steps.map((_, index) => (index === steps.length - 1 ? 0 : 1))
    ),
    transform: [
      {
        translateY: interpolate(
          progress.value,
          steps.map((_, index) => index),
          steps.map((_, index) => (index === steps.length - 1 ? GRASS_HEIGHT : 0))
        )
      }
    ]
  }))

  const animatedHeaderStyle = useAnimatedStyle(() => ({
    height: interpolate(
      progress.value,
      steps.map((_, index) => index),
      steps.map(
        (_, index) =>
          (index === steps.length - 1 ? HEADER_BG_HEIGHT_CONFIRMATION_STEP : HEADER_BG_HEIGHT) +
          insets.top
      )
    )
  }))

  const handler = usePagerViewScrollHandler({
    onPageScroll: (e: any) => {
      'worklet'

      progress.value = e.offset + e.position
    }
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <ProgressBar />
    })
  }, [navigation])

  return (
    <Animated.View className="flex-1" style={animatedBackgroundStyle}>
      <Animated.View
        className="items-center justify-end overflow-hidden w-full"
        style={animatedHeaderStyle}>
        <Image
          source={
            babyProfileDraft.gender === 'F'
              ? require('assets/bg-shape-header-pink.png')
              : require('assets/bg-shape-header-blue.png')
          }
        />
      </Animated.View>
      <SafeAreaView className="absolute h-full w-full" edges={['top']}>
        <AnimatedPagerView
          className="flex-1"
          initialPage={0}
          onPageScroll={handler}
          onPageSelected={(e) => {
            setCurrentPage(e.nativeEvent.position)
          }}
          ref={pagerViewRef}
          scrollEnabled={false}>
          {steps.map((Step, index) => (
            <Step
              key={index}
              isFocused={index === currentPage}
              {...{ babyProfileDraft, cancel, index, moveNext, save, setBabyProfileDraft }}
            />
          ))}
        </AnimatedPagerView>
      </SafeAreaView>
      <Animated.View
        className="absolute bottom-0 items-center justify-start overflow-hidden w-full"
        style={[animatedGrassStyle, { height: GRASS_HEIGHT }]}>
        <Image source={require('assets/grass.png')} />
      </Animated.View>
    </Animated.View>
  )
}
