import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints
} from '@gorhom/bottom-sheet'
import { TouchableOpacity, View } from 'react-native'
import { BabyProfileCard } from 'src/components'
import colors from 'src/theme/colors'

import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import type { BabyProfileRow } from 'src/models/baby-profile'

export type BabyProfilePickerBottomSheetElement = {
  expand(_babyProfileList: BabyProfileRow[]): void
}

type BabyProfilePickerBottomSheetProps = {
  onSelecteBabyProfile: (_babyProfile: BabyProfileRow) => void
}

export const BabyProfilePickerBottomSheet = forwardRef<
  BabyProfilePickerBottomSheetElement,
  BabyProfilePickerBottomSheetProps
>(({ onSelecteBabyProfile }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const [babyProfiles, setBabyProfiles] = useState<BabyProfileRow[]>([])

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  )

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [])

  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints)

  useImperativeHandle(ref, () => ({
    expand: (babyProfileList) => {
      setBabyProfiles(babyProfileList)

      bottomSheetRef.current?.expand()
    }
  }))

  return (
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
          {babyProfiles.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => onSelecteBabyProfile(item)}>
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
  )
})
