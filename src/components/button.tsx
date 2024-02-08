import type { FunctionComponent } from 'react'

import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { tv, type VariantProps } from 'tailwind-variants'

import { Text } from './text'

import type { TouchableOpacityProps } from 'react-native'

const buttonVariants = tv({
  base: 'items-center justify-center rounded-full',
  variants: {
    variant: {
      link: 'bg-transparent',
      outline: 'border-custom-primary border-2 h-14',
      solid: 'bg-custom-primary h-14'
    }
  }
})

const buttonTextVariants = tv({
  base: 'text-xl',
  variants: {
    variant: {
      link: 'text-base text-custom-primary',
      outline: 'text-custom-primary',
      solid: 'text-white'
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
  const isDisabled = disabled ?? isLoading

  return (
    <TouchableOpacity
      className={`${buttonVariants({ variant })} ${className}`}
      disabled={isDisabled}
      style={[style, isDisabled && { opacity: 0.8 }]}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text bold className={buttonTextVariants({ variant })}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}
