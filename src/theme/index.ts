import { DefaultTheme } from '@react-navigation/native'

const colors = {
  // ---DefaultTheme---
  primary: '#1F1F1F',
  background: '#F2F2F2',
  card: '#FFFFFF',
  text: '#1F1F1F',
  //   border: 'rgb(216, 216, 216)',
  //   notification: 'rgb(255, 59, 48)',
  // ---DefaultTheme---

  iconOff: '#CFCFCF',
  line: '#E2E2E2',
  pink1: '#FECBDE',
  pink2: '#FEA5C6',
  blue1: '#EDF8FF',
  blue2: '#DCEEFE',
  blue3: '#C4E2FD',
  blue4: '#ADDCFD',
  blue5: '#92C9FC',
  yellow1: '#FFEFAB',
  yellow2: '#FFE8A0',
  green1: '#B6F4F0',
  green2: '#86E6E0',
  green3: '#5FD7CE',
  green4: '#BDEAA6',
  sub1: '#877C7D',
  sub2: '#B0BE7A',
  sub3: '#F3AE63',
  sub4: '#F5CC66',
  sub5: '#ACACA7',
  sub6: '#A58470',
  sub7: '#D87B7D'
}

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors
  }
}

console.log(JSON.stringify(theme))
