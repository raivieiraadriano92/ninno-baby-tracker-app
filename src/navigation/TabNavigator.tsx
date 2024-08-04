import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import type { RootStackScreen, TabParamList } from "./types";

import BabyCloud from "assets/lottiefiles/baby-cloud.json";
import { Button } from "src/components/Button";
import { ObserveBabyCountWrapper } from "src/components/ObserveBabyCountWrapper";
import { ObserveSelectedBabyWrapper } from "src/components/ObserveSelectedBabyWrapper";
import { Text } from "src/components/Text";
import { BabiesTab } from "src/screens/tabs/BabiesTab";
import { HomeTab } from "src/screens/tabs/HomeTab";
import { SettingsTab } from "src/screens/tabs/SettingsTab";

const BottomTab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: RootStackScreen<"Tabs"> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ObserveBabyCountWrapper>
      {({ babyCount }) =>
        babyCount ? (
          <ObserveSelectedBabyWrapper>
            {({ selectedBaby }) =>
              !selectedBaby ? (
                <></>
              ) : (
                <BottomTab.Navigator
                  sceneContainerStyle={{ backgroundColor: colors.white }}
                  screenOptions={{
                    tabBarShowLabel: false,
                    tabBarInactiveTintColor: theme.colors.border
                  }}
                >
                  <BottomTab.Screen
                    component={HomeTab}
                    name="Home"
                    options={{
                      headerShown: false,
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} name="list" size={size} />
                      )
                    }}
                  />
                  <BottomTab.Screen
                    component={BabiesTab}
                    name="Babies"
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} name="people" size={size} />
                      ),
                      title: "My Little Ones"
                    }}
                  />
                  <BottomTab.Screen
                    component={SettingsTab}
                    name="Settings"
                    options={{
                      tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} name="settings" size={size} />
                      )
                    }}
                  />
                </BottomTab.Navigator>
              )
            }
          </ObserveSelectedBabyWrapper>
        ) : (
          <SafeAreaView className="flex-1 p-6">
            <View className="flex-1 justify-center space-y-4">
              <View className="items-center">
                <Animated.View entering={FadeIn.delay(150)}>
                  <LottieView
                    autoPlay
                    style={{
                      height: 250,
                      width: 250
                    }}
                    source={BabyCloud}
                  />
                </Animated.View>
              </View>
              <View className="space-y-2">
                <Animated.View entering={FadeInUp}>
                  <Text className="font-medium text-lg">Let's get started</Text>
                </Animated.View>
                <Animated.View entering={FadeInUp.delay(50)}>
                  <Text className="font-bold text-4xl">
                    Register Your First Little One
                  </Text>
                </Animated.View>
              </View>
              <View>
                <Animated.View entering={FadeInUp.delay(100)}>
                  <Text>
                    Enter your baby's details and let's make this journey
                    memorable!
                  </Text>
                </Animated.View>
              </View>
            </View>
            <View>
              <Animated.View entering={FadeIn.delay(150)}>
                <Button
                  onPress={() => navigation.navigate("BabyForm")}
                  title="Next"
                />
              </Animated.View>
            </View>
          </SafeAreaView>
        )
      }
    </ObserveBabyCountWrapper>
  );
};
