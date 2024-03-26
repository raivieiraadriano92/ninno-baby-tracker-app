import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'

import { Feather } from '@expo/vector-icons'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { TouchableOpacity, View } from 'react-native'
import colors from 'src/theme/colors'

import { RecordCard } from './record-card'

import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import type { RecordType, RecordTypeGroup } from 'src/models/record'

export type RecordTypePickerBottomSheetElement = {
  close(): void
  expand(_selectedRecordTypeGroup: RecordTypeGroup): void
}

type RecordTypePickerBottomSheetProps = {
  onSelectRecordType: (_recordType: RecordType) => void
}

export const RecordTypePickerBottomSheet = forwardRef<
  RecordTypePickerBottomSheetElement,
  RecordTypePickerBottomSheetProps
>(({ onSelectRecordType }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [recordTypeGroup, setRecordTypeGroup] = useState<RecordTypeGroup>()

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  )

  useImperativeHandle(ref, () => ({
    close: () => bottomSheetRef.current?.close(),
    expand: (selectedRecordTypeGroup) => {
      setRecordTypeGroup(selectedRecordTypeGroup)

      bottomSheetRef.current?.expand()
    }
  }))

  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: colors.custom.background }}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
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
          paddingBottom: 16
        }}>
        <View className="space-y-3">
          {recordTypeGroup?.[1].map((type) => (
            <TouchableOpacity key={type} onPress={() => onSelectRecordType(type)}>
              <RecordCard
                renderRight={() => <Feather name="plus" size={24} color={colors.custom.primary} />}
                type={type}
              />
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetView>
    </BottomSheet>
  )
})
