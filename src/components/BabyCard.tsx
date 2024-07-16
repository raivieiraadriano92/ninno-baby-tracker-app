import { FunctionComponent } from "react";

import { Image } from "expo-image";
import { Pressable, PressableProps, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import colors from "tailwindcss/colors";

import { Text } from "./Text";

import { BabyModel } from "src/services/database/models/BabyModel";

type BabyCardPropd = PressableProps & {
  baby: BabyModel;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const genderStyles = {
  F: {
    borderColor: "border-pink-400"
  },
  M: {
    borderColor: "border-blue-400"
  }
};

export const BabyCard: FunctionComponent<BabyCardPropd> = ({
  baby,
  className,
  onPressIn,
  onPressOut,
  style,
  ...props
}) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
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
      className={`bg-white flex-row items-center p-4 space-x-2 rounded-2xl ${className}`}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      style={[
        animatedStyle,
        {
          shadowColor: colors.neutral[200],
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
      <View className="flex-row items-center space-x-2">
        <Image
          className={`border-2 h-14 rounded-xl w-14 ${genderStyles[baby.gender].borderColor}`}
          source="https://picsum.photos/seed/696/3000/2000"
          contentFit="cover"
        />
        <View>
          <Text className="font-bold text-lg">{baby.name}</Text>
          {/* <View className="flex-row space-x-1">
            <View className="bg-sky-400 px-2 py-1 rounded-full">
              <Text className="text-sky-100 text-xs">5 months 15 days</Text>
            </View>
            <View className="bg-sky-400 px-2 py-1 rounded-full">
              <Text className="text-sky-100 text-xs">5kg</Text>
            </View>
            <View className="bg-sky-400 px-2 py-1 rounded-full">
              <Text className="text-sky-100 text-xs">50cm</Text>
            </View>
          </View> */}
        </View>
      </View>
    </AnimatedPressable>
  );
};
