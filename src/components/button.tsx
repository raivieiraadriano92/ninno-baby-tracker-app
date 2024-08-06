import type { FunctionComponent } from 'react'

import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'

import { Text } from './text'

import type { TouchableOpacityProps } from 'react-native'

const buttonVariants = tv({
  slots: {
    button: 'items-center justify-center rounded-full',
    text: 'text-xl'
  },
  variants: {
    variant: {
      link: {
        button: 'bg-transparent',
        text: 'text-base text-custom-primary'
      },
      outline: {
        button: 'border-custom-primary border-2 h-14',
        text: 'text-custom-primary'
      },
      solid: {
        button: 'bg-custom-primary h-14',
        text: 'text-white'
      }
    },
    isDisabled: {
      true: {
        button: 'bg-opacity-80'
      }
    }
  }
})

type ButtonProps = TouchableOpacityProps &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean
    title: string
  }

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  disabled,
  isLoading,
  style,
  title,
  variant = 'solid',
  ...props
}) => {
  const { button, text } = buttonVariants({ variant, isDisabled: disabled, className })

  const isDisabled = disabled ?? isLoading

  return (
    <TouchableOpacity className={button()} disabled={isDisabled} style={style} {...props}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text bold className={text()}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}
