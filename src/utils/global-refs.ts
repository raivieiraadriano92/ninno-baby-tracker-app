import { createRef } from 'react'

import type { HappyBirthdayModalElement, GlobalErrorBottomSheetElement } from 'src/components'

export const globalErrorBottomSheetRef = createRef<GlobalErrorBottomSheetElement>()

export const happyBirthdayModalRef = createRef<HappyBirthdayModalElement>()
