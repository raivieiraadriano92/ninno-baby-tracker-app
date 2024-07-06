import { FunctionComponent, useEffect, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import { Dimensions, Pressable, View, ViewProps } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import PremiumGold from "assets/lottiefiles/premium-gold.json";
import { Button } from "src/components/Button";
import { Text } from "src/components/Text";
import { RootStackScreen } from "src/navigation/types";
import { useSessionStore } from "src/store/sessionStore";

type PlanCardProps = ViewProps & {
  discount?: string;
  price: string;
  selected?: boolean;
  title: string;
};

const { width: WINDOW_WIDTH } = Dimensions.get("window");

const CARD_WIDTH = WINDOW_WIDTH / 2 - 32;

const PlanCard: FunctionComponent<PlanCardProps> = ({
  className,
  discount,
  price,
  selected,
  style,
  title,
  ...props
}) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.white, colors.sky[100]]
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.neutral[200], colors.sky[400]]
    ),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.05]) }],
    width: CARD_WIDTH
  }));

  useEffect(() => {
    progress.value = withTiming(selected ? 1 : 0);
  }, [progress, selected]);

  return (
    <Animated.View
      className={`border-2 items-center py-6 rounded-2xl space-y-2 ${className}`}
      style={[animatedStyle, style]}
      {...props}
    >
      <Text className="text-sm">{title}</Text>
      <Text className="font-bold text-4xl">{price}</Text>
      <Text className="text-sm">{discount ?? " "}</Text>
    </Animated.View>
  );
};

export const UpgradeScreen: RootStackScreen<"Upgrade"> = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "yearly"
  );

  const { setIsFirstAccess, setIsPremium } = useSessionStore(
    ({ setIsFirstAccess, setIsPremium }) => ({
      setIsFirstAccess,
      setIsPremium
    })
  );

  const handleMaybeLater = () => {
    setIsFirstAccess(false);

    setIsPremium(false);

    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
  };

  return (
    <SafeAreaView className="flex-1 p-6" edges={["bottom"]}>
      <View className="flex-1 space-y-4">
        <Text className="font-bold text-xl">Get Premium Access</Text>
        <View className="items-center">
          <LottieView
            autoPlay
            style={{
              height: 200,
              width: 200
            }}
            source={PremiumGold}
          />
        </View>
        <View className="bg-neutral-100 p-4 rounded-2xl space-y-2">
          <View className="flex-row items-center space-x-2">
            <Ionicons
              name="checkmark-circle-sharp"
              size={24}
              color={colors.green[500]}
            />
            <Text className="font-medium">Ad free experience</Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <Ionicons
              name="checkmark-circle-sharp"
              size={24}
              color={colors.green[500]}
            />
            <Text className="font-medium">
              Your data secured saved in the cloud
            </Text>
          </View>
        </View>
        <View className="flex-row space-x-4">
          <Pressable onPress={() => setSelectedPlan("yearly")}>
            <PlanCard
              discount="Saves up to 50%"
              price="$12"
              selected={selectedPlan === "yearly"}
              title="Pay Yearly"
            />
          </Pressable>
          <Pressable onPress={() => setSelectedPlan("monthly")}>
            <PlanCard
              price="$1.99"
              selected={selectedPlan === "monthly"}
              title="Pay Monthly"
            />
          </Pressable>
        </View>
      </View>
      <View className="space-y-4">
        <Button
          onPress={() => navigation.navigate("Auth")}
          title="Upgrade now"
        />
        <Button onPress={handleMaybeLater} title="Maybe later" variant="link" />
      </View>
    </SafeAreaView>
  );
};
