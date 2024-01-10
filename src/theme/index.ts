import { DefaultTheme } from '@react-navigation/native'

const colors = require('src/theme/colors')

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    // card: '#FFFFFF',
    text: colors.primary
    //   border: 'rgb(216, 216, 216)',
    //   notification: 'rgb(255, 59, 48)',
    // ---DefaultTheme---
  }
}

console.log(JSON.stringify(theme))
