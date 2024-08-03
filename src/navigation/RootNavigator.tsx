import {
  useCallback,
  useEffect,
  useState,
  type FunctionComponent
} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "@supabase/supabase-js";
import * as SplashScreen from "expo-splash-screen";
import { Platform } from "react-native";
import colors from "tailwindcss/colors";

import { TabNavigator } from "./TabNavigator";

import type { RootStackParamList } from "./types";

import { ActivityFormScreen } from "src/screens/ActivityFormScreen";
import { ActivityListScreen } from "src/screens/ActivityListScreen";
import { ActivityReportScreen } from "src/screens/ActivityReportScreen";
import { BabyFormScreen } from "src/screens/BabyFormScreen";
import { OnboardingScreen } from "src/screens/OnboardingScreen";
import { UpgradeScreen } from "src/screens/UpgradeScreen";
import { supabase } from "src/services/supabase";

const NativeStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: FunctionComponent = () => {
  const [appIsReady] = useState(true);

  const [session, setSession] = useState<Session | null | undefined>(undefined);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady && session !== undefined) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, session]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  useEffect(() => {
    // avoid re-rendering the component when the session changes
    if (session !== undefined) {
      const {
        data: { subscription }
      } = supabase.auth.onAuthStateChange((_event, authSession) => {
        if (authSession?.access_token !== session?.access_token) {
          setSession(authSession);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [session]);

  if (!appIsReady || session === undefined) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <NativeStack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: colors.white } }}
      >
        {session ? (
          <>
            <NativeStack.Screen
              component={TabNavigator}
              name="Tabs"
              options={{ headerShown: false }}
            />
            <NativeStack.Screen
              component={ActivityFormScreen}
              name="ActivityForm"
              options={{
                title: "New Activity",
                presentation: "modal",
                ...(Platform.OS === "android" && {
                  animation: "slide_from_bottom"
                })
              }}
            />
            <NativeStack.Screen
              component={ActivityListScreen}
              name="ActivityList"
            />
            <NativeStack.Screen
              component={ActivityReportScreen}
              name="ActivityReport"
            />
            <NativeStack.Screen
              component={BabyFormScreen}
              name="BabyForm"
              options={{
                headerShown: false,
                presentation: "modal",
                ...(Platform.OS === "android" && {
                  animation: "slide_from_bottom"
                })
              }}
            />
            <NativeStack.Screen
              component={UpgradeScreen}
              name="Upgrade"
              options={{
                headerShown: false,
                presentation: "modal",
                ...(Platform.OS === "android" && {
                  animation: "slide_from_bottom"
                })
              }}
            />
          </>
        ) : (
          <NativeStack.Screen
            component={OnboardingScreen}
            name="Onboarding"
            options={{
              contentStyle: { backgroundColor: colors.sky[200] },
              headerShown: false
            }}
          />
        )}
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};
