import { DefaultTheme } from '@react-navigation/native'

import type { Theme } from '@react-navigation/native'

const colors = require('src/theme/colors')

export const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.custom.background,
    primary: colors.custom.primary,
    text: colors.custom.primary
  }
}
