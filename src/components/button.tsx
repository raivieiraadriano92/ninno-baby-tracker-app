import type { FunctionComponent } from 'react'

import { TouchableOpacity } from 'react-native'

import { Text } from './text'

import type { TouchableOpacityProps } from 'react-native'

type ButtonProps = TouchableOpacityProps & {
  title: string
}

export const Button: FunctionComponent<ButtonProps> = ({ className, title, ...props }) => (
  <TouchableOpacity
    className={`bg-custom-primary h-14 items-center justify-center rounded-full ${className}`}
    {...props}>
    <Text bold className="text-white text-xl">
      {title}
    </Text>
  </TouchableOpacity>
)
