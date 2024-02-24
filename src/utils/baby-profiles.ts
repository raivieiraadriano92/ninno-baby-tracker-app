import { differenceInDays, differenceInMonths, differenceInYears, parseISO } from 'date-fns'

export const STORAGE_KEY_SELECTED_BABY_PROFILE_ID = 'SELECTED_BABY_PROFILE_ID'

export const formatBirthday = (birthday: string) => {
  const birthdayDate = parseISO(birthday)

  const days = differenceInDays(new Date(), birthdayDate)

  const months = differenceInMonths(new Date(), birthdayDate)

  const years = differenceInYears(new Date(), birthdayDate)

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}`
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}`
  }

  return `${days} day${days > 1 ? 's' : ''}`
}
