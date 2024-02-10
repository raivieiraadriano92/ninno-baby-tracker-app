import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, RecordCard, RecordIcon, Text } from 'src/components'
import colors from 'src/theme/colors'
import { getRecordTypeInfo, mountRecordDate, recordTypeGroups } from 'src/utils/records'
import { supabase } from 'src/utils/supabase'

import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import type { RecordType, RecordTypeGroup } from 'src/models/record'
import type { TabScreen } from 'src/navigation/types'
import type { Database } from 'src/utils/supabase/types'

type State = {
  babyProfile?: Database['public']['Tables']['baby_profiles']['Row'] | null
  records: Database['public']['Tables']['records']['Row'][]
}

const INITIAL_STATE: State = {
  records: []
}

const HEADER_BG_HEIGHT = 200

const recordTypes: RecordType[] = [
  'weight',
  'height',
  'head',
  'diaper',
  'sleepDay',
  'sleepNight',
  'bottleBreast',
  'bottleFormula',
  'breastFeedingLeft',
  'breastFeedingRight',
  'pumpingLeft',
  'pumpingRight'
]

export const HomeScreen: TabScreen<'Home'> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const translationY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y
  })

  const bgAnimatedStyle = useAnimatedStyle(() => ({
    height: Math.abs(translationY.value) + HEADER_BG_HEIGHT + insets.top,
    transform: [
      {
        translateY: -Math.abs(translationY.value)
      }
    ]
  }))

  const bottomSheetRef = useRef<BottomSheet>(null)

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  )

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [])

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints)

  const [selectedRecordTypeGroup, setSelectedRecordTypeGroup] = useState<RecordTypeGroup>()

  const addNewRecord = (group: RecordTypeGroup) => {
    if (group[1].length === 1) {
      navigation.navigate('RecordForm', { type: group[1][0] })

      return
    }

    setSelectedRecordTypeGroup(group)

    bottomSheetRef.current?.expand()
  }

  const [state, setState] = useState<State>(INITIAL_STATE)

  const fetchRecords = () =>
    supabase
      .from('records')
      .select()
      .limit(10)
      .order('date', { ascending: false })
      .order('time', { ascending: false })

  const fetchSelectedBabyProfile = () =>
    supabase.from('baby_profiles').select().eq('is_selected', true).limit(1).single()

  useEffect(() => {
    // fetch records and selected baby profile
    Promise.all([fetchRecords(), fetchSelectedBabyProfile()]).then((data) => {
      const records = data[0].data ?? []

      const babyProfile = data[1].data

      setState((prev) => ({
        ...prev,
        babyProfile,
        records
      }))
    })
  }, [])

  return (
    <>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView edges={['top']}>
          <ScrollView
            className="bg-white"
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingTop: HEADER_BG_HEIGHT }}>
            <View className="flex-row p-8 space-x-4">
              {recordTypeGroups.map((group) => {
                const recordTypeInfo = getRecordTypeInfo(group[0])

                return (
                  <TouchableOpacity
                    className="items-center space-y-2"
                    key={group[0]}
                    onPress={() => addNewRecord(group)}>
                    <RecordIcon size={80} type={group[0]} />
                    <Text semibold>{recordTypeInfo.title}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
          <View className="pt-6 px-4 space-y-3">
            <View className="flex-row justify-between">
              <Text bold className="text-center">
                Latest records
              </Text>
              <Button
                onPress={() => navigation.navigate('Records')}
                title="See all"
                variant="link"
              />
            </View>
            {state.records.map((record) => (
              // const attributes = record.attributes as RecordTypeGroup

              <RecordCard
                date={mountRecordDate(record.date, record.time)}
                info="5.2kg"
                key={record.id}
                type={record.type as RecordType}
              />
            ))}
          </View>
        </SafeAreaView>
        <Animated.View
          className="absolute items-center justify-end overflow-hidden w-full"
          style={bgAnimatedStyle}>
          <Image
            source={
              state.babyProfile?.gender === 'M'
                ? require('assets/bg-shape-header-blue.png')
                : require('assets/bg-shape-header-pink.png')
            }
          />
          <View
            className="absolute items-center justify-center space-y-6"
            style={{ height: HEADER_BG_HEIGHT }}>
            <Text bold className="text-4xl">
              {state.babyProfile?.name}
            </Text>
            <View className="flex-row space-x-4">
              {['5.8kg', '2 mon, 3 days', '58.4cm'].map((item) => (
                <View className="bg-custom-yellow1 px-4 py-0.5 rounded-full" key={item}>
                  <Text medium>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>
      <BottomSheet
        backgroundStyle={{ backgroundColor: colors.custom.background }}
        backdropComponent={renderBackdrop}
        contentHeight={animatedContentHeight}
        enablePanDownToClose
        handleHeight={animatedHandleHeight}
        handleIndicatorStyle={{
          backgroundColor: colors.custom.iconOff,
          borderRadius: 6,
          height: 6,
          width: 80
        }}
        index={-1}
        snapPoints={animatedSnapPoints}
        ref={bottomSheetRef}>
        <BottomSheetView onLayout={handleContentLayout} style={{ padding: 16, paddingBottom: 16 }}>
          <View className="space-y-3">
            {selectedRecordTypeGroup?.[1].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => {
                  navigation.navigate('RecordForm', { type })

                  // delaying the close action to allow the navigation to finish
                  setTimeout(() => {
                    bottomSheetRef.current?.close()
                  }, 1000)
                }}>
                <RecordCard
                  renderRight={() => (
                    <Feather name="plus" size={24} color={colors.custom.primary} />
                  )}
                  type={type}
                />
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}
