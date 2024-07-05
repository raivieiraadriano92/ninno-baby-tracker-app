import LottieView from "lottie-react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BabyWaitingForGettingOut from "assets/lottiefiles/baby-waiting-for-getting-out.json";
import { Button } from "src/components/Button";
import { Text } from "src/components/Text";
import { RootStackScreen } from "src/navigation/types";

export const OnboardingScreen: RootStackScreen<"Onboarding"> = () => (
  <SafeAreaView className="flex-1 p-6">
    <View className="flex-1 justify-center space-y-4">
      <LottieView
        autoPlay
        style={{
          height: 250,
          marginLeft: -80,
          width: 250
        }}
        source={BabyWaitingForGettingOut}
      />
      <View className="space-y-2">
        <Text className="font-medium text-lg">Welcome to</Text>
        <Text className="font-bold text-6xl">Ninno</Text>
      </View>
      <Text>
        Log feedings, sleep schedules, diaper changes, and more with ease. Stay
        on top of your baby's growth journey effortlessly.
      </Text>
    </View>
    <Button title="Let's get started" />
  </SafeAreaView>
);
