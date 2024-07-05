import { type FunctionComponent } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "tailwindcss/colors";

import type { RootStackParamList } from "./types";

import { HomeScreen } from "src/screens/HomeScreen";
import { OnboardingScreen } from "src/screens/OnboardingScreen";
import { UpgradeScreen } from "src/screens/UpgradeScreen";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: FunctionComponent = () => (
  <NavigationContainer>
    <NativeStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ contentStyle: { backgroundColor: colors.white } }}
    >
      <NativeStack.Screen component={HomeScreen} name="Home" />
      <NativeStack.Screen
        component={OnboardingScreen}
        name="Onboarding"
        options={{
          contentStyle: { backgroundColor: colors.sky[200] },
          headerShown: false
        }}
      />
      <NativeStack.Screen
        component={UpgradeScreen}
        name="Upgrade"
        options={{
          headerShown: false,
          presentation: "modal"
        }}
      />
    </NativeStack.Navigator>
  </NavigationContainer>
);
