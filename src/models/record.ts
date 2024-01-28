export type RecordType =
  | 'growth'
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
