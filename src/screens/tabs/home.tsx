import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { BabyProfileCard, Button, PageLoader, RecordCard, RecordIcon, Text } from 'src/components'
import { useOnSaveBabyProfileEvent } from 'src/hooks'
import colors from 'src/theme/colors'
import { STORAGE_KEY_SELECTED_BABY_PROFILE_ID } from 'src/utils/baby-profiles'
import { getRecordTypeInfo, recordTypeGroups } from 'src/utils/records'
import { fetchBabyProfiles, supabase } from 'src/utils/supabase'

import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import type { BabyProfileRow } from 'src/models/baby-profile'
import type { RecordRow, RecordTypeGroup } from 'src/models/record'
import type { TabScreen } from 'src/navigation/types'

type State = {
  babyProfiles: BabyProfileRow[]
  loading: boolean
  records: RecordRow[]
  selectedBabyProfile?: BabyProfileRow
}

const INITIAL_STATE: State = {
  babyProfiles: [],
  loading: true,
  records: []
}

const HEADER_BG_HEIGHT = 200

const fetchRecords = (baby_profile_id: number) =>
  supabase
    .from('records')
    .select()
    .eq('baby_profile_id', baby_profile_id)
    .limit(10)
    .order('date', { ascending: false })
    .order('time', { ascending: false })

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

  const bottomSheetNewRecordRef = useRef<BottomSheet>(null)

  const bottomSheetSwitchBabyProfileRef = useRef<BottomSheet>(null)

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

    bottomSheetNewRecordRef.current?.expand()
  }

  const handleSwitchBabyProfile = async (babyProfile: BabyProfileRow) => {
    setState((prev) => ({ ...prev, selectedBabyProfile: babyProfile, loading: true }))

    const responseRecords = await fetchRecords(babyProfile.id)

    setState((prev) => ({ ...prev, loading: false, records: responseRecords.data ?? [] }))
  }

  const [state, setState] = useState<State>(INITIAL_STATE)

  useOnSaveBabyProfileEvent(
    useCallback((row: BabyProfileRow) => {
      setState((prev) => ({
        ...prev,
        babyProfiles: [
          ...prev.babyProfiles.filter((babyProfile) => babyProfile.id !== row.id),
          row
        ].sort((a, b) => a.name.localeCompare(b.name))
      }))
    }, [])
  )

  useEffect(() => {
    fetchBabyProfiles().then(async (responseBabyProfiles) => {
      if (responseBabyProfiles.data?.length) {
        const selectedBabyProfileId = await AsyncStorage.getItem(
          STORAGE_KEY_SELECTED_BABY_PROFILE_ID
        )

        const lastBabyProfile = responseBabyProfiles.data[responseBabyProfiles.data.length - 1]

        let selectedBabyProfile = lastBabyProfile

        // if the selected baby profile is not found or not in the list, use the last baby profile
        if (!selectedBabyProfileId || selectedBabyProfileId !== selectedBabyProfile.id.toString()) {
          selectedBabyProfile =
            responseBabyProfiles.data.find(
              (item) => item.id.toString() === selectedBabyProfileId
            ) ?? lastBabyProfile
        }

        const responseRecords = await fetchRecords(selectedBabyProfile.id)

        setState((prev) => ({
          ...prev,
          babyProfiles: responseBabyProfiles.data,
          loading: false,
          records: responseRecords.data ?? [],
          selectedBabyProfile
        }))
      }
    })
  }, [])

  useEffect(() => {
    !!state.selectedBabyProfile?.id &&
      AsyncStorage.setItem(
        STORAGE_KEY_SELECTED_BABY_PROFILE_ID,
        state.selectedBabyProfile?.id.toString()
      )
  }, [state.selectedBabyProfile?.id])

  if (state.loading) {
    return <PageLoader />
  }

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
              <RecordCard
                attributes={record.attributes}
                date={record.date}
                key={record.id}
                time={record.time}
                type={record.type}
              />
            ))}
          </View>
        </SafeAreaView>
        <Animated.View
          className="absolute items-center justify-end overflow-hidden w-full"
          style={bgAnimatedStyle}>
          <Image
            source={
              state.selectedBabyProfile?.gender === 'M'
                ? require('assets/bg-shape-header-blue.png')
                : require('assets/bg-shape-header-pink.png')
            }
          />
          <View
            className="absolute items-center justify-center space-y-6"
            style={{ height: HEADER_BG_HEIGHT }}>
            <View className="items-center justify-center">
              <Text bold className="text-4xl">
                {state.selectedBabyProfile?.name}
              </Text>
              {state.babyProfiles.length > 1 && (
                <TouchableOpacity
                  className="absolute -right-10"
                  onPress={() => bottomSheetSwitchBabyProfileRef.current?.expand()}>
                  <Feather name="chevron-down" size={24} color={colors.custom.primary} />
                </TouchableOpacity>
              )}
            </View>
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
        ref={bottomSheetNewRecordRef}>
        <BottomSheetView onLayout={handleContentLayout} style={{ padding: 16, paddingBottom: 16 }}>
          <View className="space-y-3">
            {selectedRecordTypeGroup?.[1].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => {
                  navigation.navigate('RecordForm', { type })

                  // delaying the close action to allow the navigation to finish
                  setTimeout(() => {
                    bottomSheetNewRecordRef.current?.close()
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
        ref={bottomSheetSwitchBabyProfileRef}>
        <BottomSheetView onLayout={handleContentLayout} style={{ padding: 16, paddingBottom: 16 }}>
          <View className="space-y-3">
            {state.babyProfiles.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handleSwitchBabyProfile(item)}>
                <BabyProfileCard
                  className="mx-4"
                  birthday={item.birthday}
                  gender={item.gender}
                  name={item.name}
                />
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </>
  )
}
