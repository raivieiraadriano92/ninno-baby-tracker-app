import { forwardRef, useImperativeHandle, useState } from 'react'

import LottieView from 'lottie-react-native'
import { Modal, View } from 'react-native'

import { BaseCard } from './base-card'
import { Button } from './button'
import { Text } from './text'

export type HappyBirthdayModalElement = {
  show(_name: string): void
}

type HappyBirthdayModalProps = {
  //
}

export const HappyBirthdayModal = forwardRef<HappyBirthdayModalElement, HappyBirthdayModalProps>(
  (props, ref) => {
    const [name, setName] = useState<string>()

    const [visible, setVisible] = useState(false)

    useImperativeHandle(ref, () => ({
      show: (ninnoName) => {
        setName(ninnoName)

        setVisible(true)
      }
    }))

    return (
      <Modal animationType="fade" transparent visible={visible}>
        <View
          className="flex-1 justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <BaseCard className="flex-col p-8 space-y-8">
            <LottieView
              autoPlay
              loop={false}
              style={{
                width: 200,
                height: 200
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require('assets/happy-birthday-animation.json')}
            />
            <View className="space-y-4">
              <Text bold className="text-3xl text-center">
                🎉 Happy Birthday!
              </Text>
              <Text className="text-center" medium>
                {`🎂 Wishing ${name} a day filled with joy, laughter, and sweet memories. Enjoy every moment! 🎈`}
              </Text>
            </View>
            <Button className="w-full" onPress={() => setVisible(false)} title="Close" />
          </BaseCard>
        </View>
      </Modal>
    )
  }
)
