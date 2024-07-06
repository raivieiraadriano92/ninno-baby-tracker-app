import LottieView from "lottie-react-native";
import { View } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import BabyWaitingForGettingOut from "assets/lottiefiles/baby-waiting-for-getting-out.json";
import { AuthButton } from "src/components/AuthButton";
import { Text } from "src/components/Text";
import { RootStackScreen } from "src/navigation/types";

export const OnboardingScreen: RootStackScreen<"Onboarding"> = ({}) => (
  <SafeAreaView className="flex-1 p-6">
    <View className="flex-1 justify-center space-y-4">
      <View>
        <Animated.View entering={FadeIn.delay(150)}>
          <LottieView
            autoPlay
            style={{
              height: 250,
              marginLeft: -80,
              width: 250
            }}
            source={BabyWaitingForGettingOut}
          />
        </Animated.View>
      </View>
      <View className="space-y-2">
        <Animated.View entering={FadeInUp}>
          <Text className="font-medium text-lg">Welcome to</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(50)}>
          <Text className="font-bold text-6xl">Ninno</Text>
        </Animated.View>
      </View>
      <View>
        <Animated.View entering={FadeInUp.delay(100)}>
          <Text>
            Log feedings, sleep schedules, diaper changes, and more with ease.
            Stay on top of your baby's growth journey effortlessly.
          </Text>
        </Animated.View>
      </View>
    </View>
    <View>
      <Animated.View entering={FadeIn.delay(150)}>
        <AuthButton />
        {/* <Button
          onPress={() => navigation.navigate("Upgrade")}
          title="Let's get started"
        /> */}
      </Animated.View>
    </View>
  </SafeAreaView>
);
