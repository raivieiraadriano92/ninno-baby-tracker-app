import { FunctionComponent } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { format, parseISO } from "date-fns";
import { Image } from "expo-image";
import { Pressable, PressableProps, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import colors from "tailwindcss/colors";

import { Card } from "./Card";

import NinnoFace from "assets/ninno-face.png";
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
      <Card.Container color={genderColor[baby.gender]}>
        <Card.RoundedSquare
          style={{
            padding: baby.pictureUrl ? 0 : 8
          }}
          withBorder
        >
          {baby.pictureUrl ? (
            <Image className="h-full w-full" source={baby.pictureUrl} />
          ) : (
            <Image
              className="h-full w-full"
              contentFit="contain"
              source={NinnoFace}
            />
          )}
        </Card.RoundedSquare>
        <View className="flex-1">
          <Card.Title>{baby.name}</Card.Title>
          <Card.Caption>
            {format(parseISO(baby.birthDate), "MMM d, yyyy")}
          </Card.Caption>
        </View>
        <Ionicons
          name="arrow-forward"
          size={24}
          color={colors[genderColor[baby.gender]][400]}
        />
      </Card.Container>
    </AnimatedPressable>
  );
};
