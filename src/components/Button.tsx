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

type ButtonProps = PressableProps & {
  title?: string;
  variant?: ButtonVariant;
};

type ButtonVariant = "link" | "solid";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const variants: Record<ButtonVariant, { container: string; text: string }> = {
  link: {
    container: "",
    text: "text-black"
  },
  solid: {
    container: "h-16 px-4",
    text: "text-white"
  }
};

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  onPressIn,
  onPressOut,
  style,
  title,
  variant = "solid",
  ...props
}) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor:
      variant === "link"
        ? "transparent"
        : interpolateColor(
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
      className={`bg-black items-center justify-center rounded-2xl ${variants[variant].container} ${className}`}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      style={[animatedStyle, style]}
      {...props}
    >
      {!!title && (
        <Text className={`font-bold ${variants[variant].text}`}>{title}</Text>
      )}
      {children}
    </AnimatedPressable>
  );
};
