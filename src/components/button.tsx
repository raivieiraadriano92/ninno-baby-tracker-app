import type { FunctionComponent } from 'react'

import { TouchableOpacity } from 'react-native'
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
    title: string
  }

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  title,
  variant = 'solid',
  ...props
}) => (
  <TouchableOpacity className={`${buttonVariants({ variant })} ${className}`} {...props}>
    <Text bold className={buttonTextVariants({ variant })}>
      {title}
    </Text>
  </TouchableOpacity>
)
