import { ComponentProps, FunctionComponent, useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  FadeIn,
  FadeOut,
  interpolateColor,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import colors from "tailwindcss/colors";

import { PressableWithScaleEffect } from "./PressableWithScaleEffect";
import { Text } from "./Text";

type AnimatedCheckboxProps = ComponentProps<typeof PressableWithScaleEffect> & {
  color: keyof typeof colors;
  isSelected: boolean;
  textClassName?: string;
  title: string;
};

export const AnimatedCheckbox: FunctionComponent<AnimatedCheckboxProps> = ({
  className,
  color,
  isSelected,
  style,
  textClassName,
  title,
  ...props
}) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.white, colors[color][100]]
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.neutral[100], colors[color][500]]
    )
  }));

  useEffect(() => {
    if (isSelected) {
      progress.value = withTiming(1);
    } else {
      progress.value = withTiming(0);
    }
  }, [isSelected, progress]);

  return (
    <PressableWithScaleEffect
      className={`border-[1px] flex-row items-center py-1 px-3 rounded-full space-x-1 ${className}`}
      layout={LinearTransition}
      style={[animatedStyle, style]}
      {...props}
    >
      {isSelected && (
        <Animated.View
          entering={FadeIn.delay(100)}
          exiting={FadeOut}
          layout={LinearTransition}
        >
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={colors[color][500]}
          />
        </Animated.View>
      )}
      <Animated.View layout={LinearTransition}>
        <Text
          className={`capitalize font-medium text-sm ${textClassName}`}
          style={{
            color: isSelected ? colors[color][500] : colors.neutral[300]
          }}
        >
          {title}
        </Text>
      </Animated.View>
    </PressableWithScaleEffect>
  );
};
