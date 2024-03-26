import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { Portal } from '@gorhom/portal'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from 'src/theme/colors'

import { Button } from './button'
import { MeasuresPicker } from './measures-picker'

import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import type { MeasureData, RecordType } from 'src/models/record'

export type MeasuresPickerBottomSheetElement = {
  expand(): void
}

type MeasuresPickerBottomSheetProps = {
  initialMeasuresPickerValue: MeasureData
  onChange: (_value: MeasureData) => void
  recordType: RecordType
}

export const MeasuresPickerBottomSheet = forwardRef<
  MeasuresPickerBottomSheetElement,
  MeasuresPickerBottomSheetProps
>(({ initialMeasuresPickerValue, onChange, recordType }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const safeAreaInsets = useSafeAreaInsets()

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  )

  const [measureData, setMeasureData] = useState<MeasureData>(initialMeasuresPickerValue)

  const handleOnChange = () => {
    onChange(measureData)

    bottomSheetRef.current?.close()
  }

  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current?.expand()
  }))

  return (
    <Portal>
      <BottomSheet
        backgroundStyle={{ backgroundColor: 'white' }}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: colors.custom.iconOff,
          borderRadius: 6,
          height: 6,
          width: 80
        }}
        index={-1}
        enableDynamicSizing
        ref={bottomSheetRef}>
        <BottomSheetView
          style={{
            flex: 0,
            minHeight: 100,
            padding: 16,
            paddingBottom: 16 + safeAreaInsets.bottom
          }}>
          <View className="space-y-4">
            <MeasuresPicker
              initialValue={initialMeasuresPickerValue}
              onChange={setMeasureData}
              type={recordType === 'weight' ? 'weight' : 'length'}
            />
            <View className="flex-row justify-between space-x-5">
              <Button
                className="flex-1"
                onPress={() => bottomSheetRef.current?.close()}
                title="Cancel"
                variant="outline"
              />
              <Button className="flex-1" onPress={handleOnChange} title="Continue" />
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  )
})
