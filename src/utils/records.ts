import colors from 'src/theme/colors'

import type { RecordType, RecordTypeGroup } from 'src/models/record'

export const recordTypeGroups: RecordTypeGroup[] = [
  [
    'feeding',
    [
      'bottleBreast',
      'bottleFormula',
      'breastFeedingLeft',
      'breastFeedingRight',
      'pumpingLeft',
      'pumpingRight'
    ]
  ],
  ['sleep', ['sleepDay', 'sleepNight']],
  ['diaper', ['diaper']],
  ['growth', ['weight', 'height', 'head']]
]

export const getRecordTypeInfo = (type: RecordType) => {
  switch (type) {
    case 'growth':
      return {
        color: colors.custom.yellow1,
        icon: require('assets/icon-growth.png'),
        title: 'Growth'
      }

    case 'weight':
      return {
        color: colors.custom.yellow1,
        icon: require('assets/icon-weight.png'),
        title: 'Weight'
      }

    case 'height':
      return {
        color: colors.custom.yellow1,
        icon: require('assets/icon-height.png'),
        title: 'Height'
      }

    case 'head':
      return {
        color: colors.custom.yellow1,
        icon: require('assets/icon-head-circ.png'),
        title: 'Head Circumference'
      }

    case 'diaper':
      return {
        color: colors.custom.green4,
        icon: require('assets/icon-diaper.png'),
        title: 'Diaper'
      }

    case 'sleep':
      return {
        color: colors.custom.blue4,
        icon: require('assets/icon-night.png'),
        title: 'Sleep'
      }

    case 'sleepDay':
      return {
        color: colors.custom.blue4,
        icon: require('assets/icon-day.png'),
        title: 'Sleep - Day'
      }

    case 'sleepNight':
      return {
        color: colors.custom.blue4,
        icon: require('assets/icon-night.png'),
        title: 'Sleep - Night'
      }

    case 'feeding':
      return {
        color: colors.custom.pink1,
        icon: require('assets/icon-bottle.png'),
        title: 'Feeding'
      }

    case 'bottleBreast':
      return {
        color: colors.custom.pink1,
        icon: require('assets/icon-bottle.png'),
        title: 'Bottle - Breast'
      }

    case 'bottleFormula':
      return {
        color: colors.custom.pink1,
        icon: require('assets/icon-bottle.png'),
        title: 'Bottle - Formula'
      }

    case 'breastFeedingLeft':
      return {
        color: colors.custom.pink1,
        icon: require('assets/icon-bra-left.png'),
        title: 'Breast Feeding - Left'
      }

    case 'breastFeedingRight':
      return {
        color: colors.custom.pink1,
        icon: require('assets/icon-bra-right.png'),
        title: 'Breast Feeding - Right'
      }

    case 'pumpingLeft':
      return {
        color: colors.custom.pink1,
        icon: require('assets/icon-pumping-left.png'),
        title: 'Pumping - Left'
      }

    case 'pumpingRight':
      return {
        color: colors.custom.pink1,
        icon: require('assets/icon-pumping-right.png'),
        title: 'Pumping - Right'
      }
  }
}
