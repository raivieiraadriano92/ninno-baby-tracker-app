import type { FunctionComponent } from 'react'
import { useMemo } from 'react'

import { Text as RNText } from 'react-native'

import type { TextProps as RNTextProps } from 'react-native'

type TextProps = RNTextProps & {
  medium?: boolean
  semibold?: boolean
  bold?: boolean
}

export const Text: FunctionComponent<TextProps> = ({
  bold,
  children,
  className,
  medium,
  semibold,
  style,
  ...props
}) => {
  const fontFamily = useMemo(() => {
    if (medium) {
      return 'Nunito_500Medium'
    } else if (semibold) {
      return 'Nunito_600SemiBold'
    } else if (bold) {
      return 'Nunito_700Bold'
    }

    return 'Nunito_400Regular'
  }, [bold, medium, semibold])

  return (
    <RNText
      {...props}
      className={`text-base text-custom-primary ${className}`}
      style={[style, { fontFamily }]}>
      {children}
    </RNText>
  )
}
