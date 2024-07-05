import { FunctionComponent } from "react";

import { Pressable, PressableProps } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import colors from "tailwindcss/colors";

import { Text } from "./Text";

type ButtonProps = PressableProps & { title: string };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: FunctionComponent<ButtonProps> = ({
  className,
  onPressIn,
  onPressOut,
  style,
  title,
  ...props
}) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.black, colors.neutral[800]]
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
      className={`bg-black h-16 items-center justify-center rounded-2xl ${className}`}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      style={[animatedStyle, style]}
      {...props}
    >
      <Text className="font-bold text-white">{title}</Text>
    </AnimatedPressable>
  );
};
