import { FunctionComponent, useEffect } from "react";

import { Pressable, PressableProps, View, ViewProps } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import colors from "tailwindcss/colors";

import { Text } from "./Text";

import { GENDER } from "src/services/database/models/BabyModel";
import { genderColor } from "src/utils/global";

type GenderItemProps = PressableProps & {
  emoji: string;
  gender: GENDER;
  isSelected?: boolean;
};

type GenderPickerProps = ViewProps & {
  onChange: (_selectedGender: GENDER) => void;
  value: GENDER;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GenderItem: FunctionComponent<GenderItemProps> = ({
  className,
  emoji,
  gender,
  isSelected,
  onPressIn,
  onPressOut,
  style,
  ...props
}) => {
  const pressed = useSharedValue(0);

  const selected = useSharedValue(isSelected ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      selected.value,
      [0, 1],
      [colors.white, colors[genderColor[gender]][50]]
    ),
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.98]) }]
  }));

  const handleOnPressIn: typeof onPressIn = (e) => {
    onPressIn?.(e);

    pressed.value = withTiming(1);
  };

  const handleOnPressOut: typeof onPressOut = (e) => {
    onPressOut?.(e);

    pressed.value = withTiming(0);
  };

  useEffect(() => {
    selected.value = withTiming(isSelected ? 1 : 0);
  }, [isSelected, selected]);

  return (
    <AnimatedPressable
      className={`border-2 h-14 items-center justify-center rounded-lg w-14 ${className}`}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      style={[
        {
          borderColor: colors[genderColor[gender]][500]
        },
        animatedStyle,
        //@ts-ignore
        style
      ]}
      {...props}
    >
      <Text className="text-xl">{emoji}</Text>
    </AnimatedPressable>
  );
};

export const GenderPicker: FunctionComponent<GenderPickerProps> = ({
  className,
  onChange,
  value,
  ...props
}) => (
  <View className={`flex-row justify-center space-x-4 ${className}`} {...props}>
    <GenderItem
      emoji="👦"
      gender={GENDER.M}
      isSelected={value === GENDER.M}
      onPress={() => onChange(GENDER.M)}
    />
    <GenderItem
      emoji="👧"
      gender={GENDER.F}
      isSelected={value === GENDER.F}
      onPress={() => onChange(GENDER.F)}
    />
  </View>
);
