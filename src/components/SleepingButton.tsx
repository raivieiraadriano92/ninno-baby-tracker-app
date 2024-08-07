import { useEffect } from "react";

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";
import colors from "tailwindcss/colors";

import { Button } from "./Button";
import { Text } from "./Text";

import { activityTypeAttributes } from "src/utils/global";

export const SleepingButton: typeof Button = ({}) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.18]) }]
  }));

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1500 }), -1, true);
  }, [progress]);

  return (
    <Button
      className="border-[2px] h-12 p-0 w-12"
      customColors={[
        colors[activityTypeAttributes.sleep.color][100],
        colors[activityTypeAttributes.sleep.color][50]
      ]}
      enableShadow
      style={{
        borderColor: colors[activityTypeAttributes.sleep.color][400],
        shadowColor: colors[activityTypeAttributes.sleep.color][500]
      }}
    >
      <Animated.View style={animatedStyle}>
        <Text>{activityTypeAttributes.sleep.emoji}</Text>
      </Animated.View>
    </Button>
  );
};
