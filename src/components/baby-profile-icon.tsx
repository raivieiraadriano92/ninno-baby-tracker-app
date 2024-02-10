import type { FunctionComponent } from 'react'

import { Image, View } from 'react-native'
import colors from 'src/theme/colors'

import type { ViewProps } from 'react-native'
import type { Database } from 'src/utils/supabase/types'

type BabyProfileIconProps = ViewProps & {
  gender: Database['public']['Tables']['baby_profiles']['Row']['gender']
  size: number
}

export const BabyProfileIcon: FunctionComponent<BabyProfileIconProps> = ({
  className,
  gender,
  size,
  style,
  ...props
}) => (
  <View
    className={`h-11 items-center justify-center rounded-lg w-11 ${className}`}
    style={[
      {
        backgroundColor: gender === 'F' ? colors.custom.pink1 : colors.custom.blue4,
        height: size,
        width: size
      },
      style
    ]}
    {...props}>
    <Image source={require('assets/baby-profile-icon.png')} style={{ height: size, width: size }} />
  </View>
)
