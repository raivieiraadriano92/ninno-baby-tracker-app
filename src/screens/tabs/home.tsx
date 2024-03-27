import { useRef } from 'react'

import { Feather } from '@expo/vector-icons'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  BabyProfilePickerBottomSheet,
  RecordCard,
  RecordIcon,
  RecordTypePickerBottomSheet,
  Text
} from 'src/components'
import { useBabyProfileStore } from 'src/store/baby-profile-store'
import { useRecordStore } from 'src/store/record-store'
import colors from 'src/theme/colors'
import { formatBirthday } from 'src/utils/baby-profiles'
import { formatAttributes, getRecordTypeInfo, recordTypeGroups } from 'src/utils/records'

import type {
  BabyProfilePickerBottomSheetElement,
  RecordTypePickerBottomSheetElement
} from 'src/components'
import type { BabyProfileRow } from 'src/models/baby-profile'
import type { RecordTypeGroup } from 'src/models/record'
import type { TabScreen } from 'src/navigation/types'

const HEADER_BG_HEIGHT = 200

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

  const bottomSheetNewRecordRef = useRef<RecordTypePickerBottomSheetElement>(null)

  const bottomSheetSwitchBabyProfileRef = useRef<BabyProfilePickerBottomSheetElement>(null)

  const {
    data: babyProfileData,
    selectedBabyProfile,
    setSelectedBabyProfile
  } = useBabyProfileStore()

  const { getLatestHeight, getLatestRecords, getLatestWeight } = useRecordStore()

  const records = selectedBabyProfile ? getLatestRecords(selectedBabyProfile.id) : []

  const latestHeight = selectedBabyProfile ? getLatestHeight(selectedBabyProfile?.id) : undefined

  const latestWeight = selectedBabyProfile ? getLatestWeight(selectedBabyProfile?.id) : undefined

  const addNewRecord = (group: RecordTypeGroup) => {
    if (!selectedBabyProfile) {
      return
    }

    if (group[1].length === 1) {
      navigation.navigate('RecordForm', {
        type: group[1][0],
        babyProfileId: selectedBabyProfile.id
      })

      return
    }

    bottomSheetNewRecordRef.current?.expand(group)
  }

  const handleSwitchBabyProfile = (item: BabyProfileRow) => {
    setSelectedBabyProfile(item)

    bottomSheetSwitchBabyProfileRef.current?.close()
  }

  return (
    <>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView className="pb-4" edges={['top']}>
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
            <View>
              <Text bold className="text-center">
                Latest records
              </Text>
              {/* <Button
                onPress={() => navigation.navigate('Records')}
                title="See all"
                variant="link"
              /> */}
            </View>
            {records.map((record) => (
              <TouchableOpacity
                key={record.id}
                onPress={() =>
                  navigation.navigate('RecordForm', {
                    record,
                    type: record.type,
                    babyProfileId: record.baby_profile_id
                  })
                }>
                <RecordCard
                  attributes={record.attributes}
                  date={record.date}
                  time={record.time}
                  type={record.type}
                />
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
        <Animated.View
          className="absolute items-center justify-end overflow-hidden w-full"
          style={bgAnimatedStyle}>
          <Image
            source={
              selectedBabyProfile?.gender === 'M'
                ? require('assets/bg-shape-header-blue.png')
                : require('assets/bg-shape-header-pink.png')
            }
          />
          <View
            className="absolute items-center justify-center space-y-6"
            style={{ height: HEADER_BG_HEIGHT }}>
            <View className="items-center justify-center">
              <Text bold className="text-4xl">
                {selectedBabyProfile?.name}
              </Text>
              {babyProfileData.length > 1 && (
                <TouchableOpacity
                  className="absolute -right-10"
                  onPress={() => bottomSheetSwitchBabyProfileRef.current?.expand(babyProfileData)}>
                  <Feather name="chevron-down" size={24} color={colors.custom.primary} />
                </TouchableOpacity>
              )}
            </View>
            <View className="flex-row space-x-4">
              {[
                ...(latestWeight ? [formatAttributes('weight', latestWeight.attributes)] : []),
                ...(selectedBabyProfile ? [formatBirthday(selectedBabyProfile!.birthday)] : []),
                ...(latestHeight ? [formatAttributes('height', latestHeight.attributes)] : [])
              ].map((item) => (
                <View className="bg-custom-yellow1 px-4 py-0.5 rounded-full" key={item}>
                  <Text medium>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>
      <RecordTypePickerBottomSheet
        onSelectRecordType={(type) => {
          navigation.navigate('RecordForm', { type, babyProfileId: selectedBabyProfile!.id })

          // delaying the close action to allow the navigation to finish
          setTimeout(() => {
            bottomSheetNewRecordRef.current?.close()
          }, 1000)
        }}
        ref={bottomSheetNewRecordRef}
      />
      <BabyProfilePickerBottomSheet
        onSelectBabyProfile={handleSwitchBabyProfile}
        ref={bottomSheetSwitchBabyProfileRef}
      />
    </>
  )
}
