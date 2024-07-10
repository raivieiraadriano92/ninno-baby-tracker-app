import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "tailwindcss/colors";

import type { RootStackScreen, TabParamList } from "./types";

import { BabiesTab } from "src/screens/tabs/BabiesTab";
import { HomeTab } from "src/screens/tabs/HomeTab";
import { SettingsTab } from "src/screens/tabs/SettingsTab";

const BottomTab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: RootStackScreen<"Tabs"> = ({}) => (
  <BottomTab.Navigator
    sceneContainerStyle={{ backgroundColor: colors.white }}
    screenOptions={{ headerShown: false }}
  >
    <BottomTab.Screen component={HomeTab} name="Home" />
    <BottomTab.Screen component={BabiesTab} name="Babies" />
    <BottomTab.Screen component={SettingsTab} name="Settings" />
  </BottomTab.Navigator>
);
