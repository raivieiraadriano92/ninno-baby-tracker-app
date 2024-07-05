import { type FunctionComponent } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "tailwindcss/colors";

import type { RootStackParamList } from "./types";

import { HomeScreen } from "src/screens/HomeScreen";
import { OnboardingScreen } from "src/screens/OnboardingScreen";
import { UpgradeScreen } from "src/screens/UpgradeScreen";
import { useSessionStore } from "src/store/sessionStore";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: FunctionComponent = () => {
  const isFirstAccess = useSessionStore((state) => state.isFirstAccess);

  const initialRouteName = isFirstAccess ? "Onboarding" : "Home";

  return (
    <NavigationContainer>
      <NativeStack.Navigator
        initialRouteName={initialRouteName}
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
};
