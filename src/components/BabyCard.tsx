import { FunctionComponent } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { format, parseISO } from "date-fns";
import { Pressable, PressableProps } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import colors from "tailwindcss/colors";

import { ColorfulCard } from "./ColorfulCard";

import { BabyModel } from "src/services/database/models/BabyModel";
import { genderColor } from "src/utils/global";

type BabyCardPropd = PressableProps & {
  baby: BabyModel;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      style={[
        animatedStyle,
        // @ts-ignore
        style
      ]}
      {...props}
    >
      <ColorfulCard
        color={genderColor[baby.gender]}
        imageUrl="https://img.freepik.com/free-photo/portrait-newborn-baby-sleeping-peacefully_23-2150797330.jpg"
        renderRight={
          <Ionicons
            name="arrow-forward"
            size={24}
            color={colors[genderColor[baby.gender]][500]}
          />
        }
        subtitle={format(parseISO(baby.birthday), "MMM d, yyyy")}
        title={baby.name}
      />
    </AnimatedPressable>
  );
};
