import { useState, type FunctionComponent } from 'react'

import { View } from 'react-native'
import WheelPicker from 'react-native-wheely'

import { Text } from './text'

type MeasuresPickerProps = {
  initialValue: { unit: string; value: number }
  onChange(_: { unit: string; value: number }): void
  type: MeasureType
}

type MeasureType = keyof typeof measures

const measures = {
  length: {
    minInt: 1,
    maxInt: 99,
    minDecimal: 0,
    maxDecimal: 99,
    units: ['cm', 'in']
  },
  weight: {
    minInt: 1,
    maxInt: 10,
    minDecimal: 0,
    maxDecimal: 99,
    units: ['kg', 'lb', 'st']
  },
  liquid: {
    minInt: 1,
    maxInt: 999,
    minDecimal: 0,
    maxDecimal: 99,
    units: ['ml']
  }
}

export const MeasuresPicker: FunctionComponent<MeasuresPickerProps> = ({
  initialValue,
  onChange,
  type
}) => {
  const selectedMeasure = measures[type]

  const arrayInt = Array.from(
    { length: selectedMeasure.maxInt - selectedMeasure.minInt + 1 },
    (_, i) => `${i + selectedMeasure.minInt}`
  )

  const arrayDecimal = Array.from(
    { length: selectedMeasure.maxDecimal - selectedMeasure.minDecimal + 1 },
    (_, i) => `${i + selectedMeasure.minDecimal}`
  )

  const strValues = initialValue.value.toString().split('.')

  if (strValues.length === 1) {
    strValues.push(selectedMeasure.minDecimal.toString())
  }

  // e.g. [int, decimal, unit]
  const [selectedIndex, setSelectedIndex] = useState([
    parseInt(strValues[0], 10) - selectedMeasure.minInt,
    parseInt(strValues[1], 10) - selectedMeasure.minDecimal,
    selectedMeasure.units.indexOf(initialValue.unit)
  ])

  const handleOnChange = (intIndex: number, decimalIndex: number, unitIndex: number) => {
    setSelectedIndex([intIndex, decimalIndex, unitIndex])

    onChange({
      unit: selectedMeasure.units[unitIndex],
      value: parseFloat(
        `${intIndex + selectedMeasure.minInt}.${decimalIndex + selectedMeasure.minDecimal}`
      )
    })
  }

  return (
    <View className="flex-row items-center justify-center space-x-3">
      <View>
        <WheelPicker
          itemHeight={60}
          itemTextStyle={{ fontFamily: 'Nunito_700Bold', fontSize: 24 }}
          onChange={(index) => handleOnChange(index, selectedIndex[1], selectedIndex[2])}
          options={arrayInt}
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
          onChange={(index) => handleOnChange(selectedIndex[0], index, selectedIndex[2])}
          options={arrayDecimal}
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
          onChange={(index) => handleOnChange(selectedIndex[0], selectedIndex[1], index)}
          options={selectedMeasure.units}
          scaleFunction={(x) => x * 0.7}
          selectedIndex={selectedIndex[2]}
          selectedIndicatorStyle={{ backgroundColor: 'transparent' }}
          visibleRest={1}
        />
      </View>
      <View
        className="absolute border-custom-line border-b-[1px] border-t-[1px] h-14 w-full"
        pointerEvents="none"
      />
    </View>
  )
}
