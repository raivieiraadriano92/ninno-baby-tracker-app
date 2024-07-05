import { type FunctionComponent } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "tailwindcss/colors";

import type { RootStackParamList } from "./types";

import { OnboardingScreen } from "src/screens/OnboardingScreen";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: FunctionComponent = () => (
  <NavigationContainer>
    <NativeStack.Navigator>
      <NativeStack.Screen
        component={OnboardingScreen}
        name="Onboarding"
        options={{
          contentStyle: { backgroundColor: colors.sky[200] },
          headerShown: false
        }}
      />
    </NativeStack.Navigator>
  </NavigationContainer>
);
