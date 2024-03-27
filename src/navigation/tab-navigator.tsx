import type { FunctionComponent } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Svg, { G, Path, Defs, ClipPath, Rect } from 'react-native-svg'
import { FirstBabyProfile, PageLoader } from 'src/components'
import { BabyProfilesScreen, HomeScreen, RecordsScreen } from 'src/screens'
import { useBabyProfileStore } from 'src/store/baby-profile-store'
import colors from 'src/theme/colors'

import type { RootStackScreen, TabParamList } from './types'

type TabBatIconProps = {
  color: string
  size: number
}

const BottomTab = createBottomTabNavigator<TabParamList>()

const HomeIcon: FunctionComponent<TabBatIconProps> = ({ color, size }) => (
  <Svg viewBox="0 0 34 34" height={size} width={size} fill="none">
    <G clipPath="url(#clip0_16_2243)">
      <Path
        d="M7.08333 17H4.25L17 4.25L29.75 17H26.9167"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.08331 17V26.9167C7.08331 27.6681 7.38182 28.3888 7.91318 28.9201C8.44453 29.4515 9.1652 29.75 9.91665 29.75H24.0833C24.8348 29.75 25.5554 29.4515 26.0868 28.9201C26.6181 28.3888 26.9166 27.6681 26.9166 26.9167V17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.75 29.75V21.25C12.75 20.4986 13.0485 19.7779 13.5799 19.2465C14.1112 18.7152 14.8319 18.4167 15.5833 18.4167H18.4167C19.1681 18.4167 19.8888 18.7152 20.4201 19.2465C20.9515 19.7779 21.25 20.4986 21.25 21.25V29.75"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_16_2243">
        <Rect width={34} height={34} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
)

const BabyIcon: FunctionComponent<TabBatIconProps> = ({ color, size }) => (
  <Svg viewBox="0 0 35 34" height={size} width={size} fill="none">
    <G clipPath="url(#clip0_16_2303)">
      <Path
        d="M8.83331 26.9167C8.83331 27.6681 9.13182 28.3888 9.66318 28.9201C10.1945 29.4515 10.9152 29.75 11.6666 29.75C12.4181 29.75 13.1388 29.4515 13.6701 28.9201C14.2015 28.3888 14.5 27.6681 14.5 26.9167C14.5 26.1652 14.2015 25.4445 13.6701 24.9132C13.1388 24.3818 12.4181 24.0833 11.6666 24.0833C10.9152 24.0833 10.1945 24.3818 9.66318 24.9132C9.13182 25.4445 8.83331 26.1652 8.83331 26.9167Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23 26.9167C23 27.6681 23.2985 28.3888 23.8299 28.9201C24.3612 29.4515 25.0819 29.75 25.8333 29.75C26.5848 29.75 27.3054 29.4515 27.8368 28.9201C28.3682 28.3888 28.6667 27.6681 28.6667 26.9167C28.6667 26.1652 28.3682 25.4445 27.8368 24.9132C27.3054 24.3818 26.5848 24.0833 25.8333 24.0833C25.0819 24.0833 24.3612 24.3818 23.8299 24.9132C23.2985 25.4445 23 26.1652 23 26.9167Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.16663 7.08333H6.70829L9.02029 14.0208C9.58442 15.7135 10.6669 17.1858 12.1145 18.2291C13.562 19.2723 15.3011 19.8336 17.0854 19.8333H20.875C22.9414 19.8333 24.9233 19.0124 26.3845 17.5512C27.8457 16.09 28.6666 14.1081 28.6666 12.0417C28.6666 9.97519 27.8457 7.99335 26.3845 6.53213C24.9233 5.07091 22.9414 4.25 20.875 4.25H20.1666V12.75"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.83331 12.75H28.6666"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.0833 24.0833L14.5 19.8333"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23 19.8333L24.4167 24.0833"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_16_2303">
        <Rect width={34} height={34} fill="white" transform="translate(0.333313)" />
      </ClipPath>
    </Defs>
  </Svg>
)

const RecordsIcon: FunctionComponent<TabBatIconProps> = ({ color, size }) => (
  <Svg viewBox="0 0 34 34" height={size} width={size} fill="none">
    <G clipPath="url(#clip0_2652_2877)">
      <Path
        d="M23.333 4.25V9.91667M11.9997 4.25V9.91667M6.33301 15.5833H28.9997M14.8401 19.8333H14.8543M20.5068 19.8333H20.5209M6.33301 9.91667C6.33301 9.16522 6.63152 8.44455 7.16287 7.9132C7.69422 7.38184 8.41489 7.08333 9.16634 7.08333H26.1663C26.9178 7.08333 27.6385 7.38184 28.1698 7.9132C28.7012 8.44455 28.9997 9.16522 28.9997 9.91667V26.9167C28.9997 27.6681 28.7012 28.3888 28.1698 28.9201C27.6385 29.4515 26.9178 29.75 26.1663 29.75H9.16634C8.41489 29.75 7.69422 29.4515 7.16287 28.9201C6.63152 28.3888 6.33301 27.6681 6.33301 26.9167V9.91667Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.8403 24.0835C15.6717 24.6624 16.6605 24.9728 17.6737 24.9728C18.6868 24.9728 19.6756 24.6624 20.507 24.0835"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2652_2877">
        <Rect width={34} height={34} fill="white" transform="translate(0.666504)" />
      </ClipPath>
    </Defs>
  </Svg>
)

// const SettingsIcon: FunctionComponent<TabBatIconProps> = ({ color, size }) => (
//   <Svg viewBox="0 0 34 34" height={size} width={size} fill="none">
//     <G clipPath="url(#clip0_16_2333)">
//       <Path
//         d="M17 8.50001C17 9.25145 17.2985 9.97212 17.8299 10.5035C18.3612 11.0348 19.0819 11.3333 19.8333 11.3333C20.5848 11.3333 21.3054 11.0348 21.8368 10.5035C22.3682 9.97212 22.6667 9.25145 22.6667 8.50001C22.6667 7.74856 22.3682 7.02789 21.8368 6.49654C21.3054 5.96518 20.5848 5.66667 19.8333 5.66667C19.0819 5.66667 18.3612 5.96518 17.8299 6.49654C17.2985 7.02789 17 7.74856 17 8.50001Z"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <Path
//         d="M5.66669 8.5H17"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <Path
//         d="M22.6667 8.5H28.3334"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <Path
//         d="M8.5 17C8.5 17.7515 8.79851 18.4721 9.32986 19.0035C9.86122 19.5348 10.5819 19.8333 11.3333 19.8333C12.0848 19.8333 12.8054 19.5348 13.3368 19.0035C13.8682 18.4721 14.1667 17.7515 14.1667 17C14.1667 16.2486 13.8682 15.5279 13.3368 14.9965C12.8054 14.4652 12.0848 14.1667 11.3333 14.1667C10.5819 14.1667 9.86122 14.4652 9.32986 14.9965C8.79851 15.5279 8.5 16.2486 8.5 17Z"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <Path
//         d="M5.66669 17H8.50002"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <Path
//         d="M14.1667 17H28.3334"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <Path
//         d="M21.25 25.5C21.25 26.2515 21.5485 26.9721 22.0799 27.5035C22.6112 28.0348 23.3319 28.3333 24.0833 28.3333C24.8348 28.3333 25.5554 28.0348 26.0868 27.5035C26.6182 26.9721 26.9167 26.2515 26.9167 25.5C26.9167 24.7486 26.6182 24.0279 26.0868 23.4965C25.5554 22.9652 24.8348 22.6667 24.0833 22.6667C23.3319 22.6667 22.6112 22.9652 22.0799 23.4965C21.5485 24.0279 21.25 24.7486 21.25 25.5Z"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <Path
//         d="M5.66669 25.5H21.25"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <Path
//         d="M26.9166 25.5H28.3333"
//         stroke={color}
//         strokeWidth={2}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </G>
//     <Defs>
//       <ClipPath id="clip0_16_2333">
//         <Rect width={34} height={34} fill="white" />
//       </ClipPath>
//     </Defs>
//   </Svg>
// )

export const TabNavigator: RootStackScreen<'Tabs'> = ({ navigation }) => {
  const hasBabyProfile = useBabyProfileStore((state) => state.data.length > 0)

  if (hasBabyProfile === undefined) {
    return <PageLoader className="bg-white" />
  }

  if (hasBabyProfile === false) {
    return <FirstBabyProfile goToAddRecord={() => navigation.navigate('BabyProfileCreation')} />
  }

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.custom.primary,
        tabBarInactiveTintColor: colors.custom.iconOff,
        headerTintColor: colors.custom.primary,
        headerTitleStyle: { fontFamily: 'Nunito_700Bold' }
      }}
      sceneContainerStyle={{ backgroundColor: colors.custom.background }}>
      <BottomTab.Screen
        component={HomeScreen}
        name="Home"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />
        }}
      />
      <BottomTab.Screen
        component={RecordsScreen}
        name="Records"
        options={{
          headerTitle: 'Records',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <RecordsIcon size={size} color={color} />
        }}
      />
      <BottomTab.Screen
        component={BabyProfilesScreen}
        name="BabyProfiles"
        options={{
          headerTitle: 'My ninnos',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <BabyIcon size={size} color={color} />
        }}
      />
      {/* <BottomTab.Screen
        component={SettingsScreen}
        name="Settings"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <SettingsIcon size={size} color={color} />
        }}
      /> */}
    </BottomTab.Navigator>
  )
}
