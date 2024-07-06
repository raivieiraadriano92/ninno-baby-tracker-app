import { FunctionComponent } from "react";

import LottieView from "lottie-react-native";
import { Pressable, PressableProps, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import colors from "tailwindcss/colors";

import PremiumGold from "assets/lottiefiles/premium-gold.json";
import { Text } from "src/components/Text";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const UpgradeButton: FunctionComponent<PressableProps> = ({
  className,
  onPressIn,
  onPressOut,
  style,
  ...props
}) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.amber[100], colors.amber[200]]
    ),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 0.98]) }]
  }));

  const handleOnPressIn: typeof onPressIn = (e) => {
    onPressIn?.(e);

    progress.value = withTiming(1);
  };

  const handleOnPressOut: typeof onPressOut = (e) => {
    onPressOut?.(e);

    progress.value = withTiming(0);
  };

  return (
    <AnimatedPressable
      className={`border-2 border-amber-300 flex-row items-center p-1 pr-4 space-x-2 rounded-2xl ${className}`}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      style={[
        animatedStyle,
        {
          shadowColor: colors.amber[500],
          shadowOffset: {
            width: 0,
            height: 5
          },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 10
        },
        // @ts-ignore
        style
      ]}
      {...props}
    >
      <LottieView
        autoPlay
        style={{
          height: 50,
          width: 50
        }}
        source={PremiumGold}
      />
      <Text className="flex-1 font-bold text-amber-500">
        Get Premium Access
      </Text>
      <View className="bg-amber-500 p-1 rounded-lg">
        <Text className="font-bold text-xs text-amber-50">Upgrade to PRO</Text>
      </View>
    </AnimatedPressable>
  );
};
