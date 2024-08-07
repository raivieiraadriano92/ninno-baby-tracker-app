import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const PressableWithScaleEffect: typeof AnimatedPressable = ({
  children,
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
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      style={[
        animatedStyle,
        // @ts-ignore
        style
      ]}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
};
