import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from 'src/theme/colors'

import { Button } from './button'
import { RecordTypePill } from './record-type-pill'

import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import type { RecordType } from 'src/models/record'

export type RecordFiltersBottomSheetElement = {
  expand(): void
}

type RecordFiltersBottomSheetProps = {
  onApply: (_recordTypes: RecordType[]) => void
  onClear: () => void
}

export const RecordFiltersBottomSheet = forwardRef<
  RecordFiltersBottomSheetElement,
  RecordFiltersBottomSheetProps
>(({ onApply, onClear }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [recordTypesFilter, setRecordTypesFilter] = useState<RecordType[]>([])

  const safeAreaInsets = useSafeAreaInsets()

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  )

  const handleApply = () => {
    onApply(
      recordTypesFilter.reduce((acc, item) => {
        const items = [...acc]

        switch (item) {
          case 'bottle':
            items.push('bottleBreast', 'bottleFormula')

            break

          case 'pumping':
            items.push('pumpingLeft', 'pumpingRight')

            break

          case 'breast':
            items.push('breastFeedingLeft', 'breastFeedingRight')

            break

          case 'sleep':
            items.push('sleepDay', 'sleepNight')

            break

          default:
            items.push(item)

            break
        }

        return items
      }, [] as RecordType[])
    )

    bottomSheetRef.current?.close()
  }

  const handleClear = () => {
    onClear()

    bottomSheetRef.current?.close()
  }

  const handleSelectRecordType = (recordType: RecordType) =>
    setRecordTypesFilter((prev) =>
      prev.includes(recordType) ? prev.filter((item) => item !== recordType) : [...prev, recordType]
    )

  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current?.expand()
  }))

  return (
    <BottomSheet
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: colors.custom.background }}
      enableDynamicSizing
      enablePanDownToClose
      handleIndicatorStyle={{
        backgroundColor: colors.custom.iconOff,
        borderRadius: 6,
        height: 6,
        width: 80
      }}
      index={-1}
      ref={bottomSheetRef}>
      <BottomSheetView
        style={{ flex: 0, minHeight: 100, padding: 16, paddingBottom: 16 + safeAreaInsets.bottom }}>
        <View className="space-y-4">
          <View className="bg-white flex-row flex-wrap items-start p-4 rounded-2xl w-full">
            {(
              ['weight', 'diaper', 'bottle', 'pumping', 'breast', 'sleep', 'height'] as RecordType[]
            ).map((item) => (
              <TouchableOpacity
                className="mb-2 mr-2"
                key={item}
                onPress={() => handleSelectRecordType(item)}>
                <RecordTypePill isSelected={recordTypesFilter.includes(item)} type={item} />
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row justify-between space-x-5">
            <Button className="flex-1" onPress={handleClear} title="Clear" variant="outline" />
            <Button className="flex-1" onPress={handleApply} title="Apply" />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
})
