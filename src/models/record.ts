export type RecordType =
  | 'growth'
  | 'birthday'
  | 'weight'
  | 'height'
  | 'head'
  | 'diaper'
  | 'sleep'
  | 'sleepDay'
  | 'sleepNight'
  | 'feeding'
  | 'bottleBreast'
  | 'bottleFormula'
  | 'breastFeedingLeft'
  | 'breastFeedingRight'
  | 'pumpingLeft'
  | 'pumpingRight'

export type RecordTypeGroup = [RecordType, RecordType[]]
