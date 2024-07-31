import { FunctionComponent, useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import {
  SafeAreaView,
  SafeAreaViewProps
} from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { Text } from "./Text";

import NinnoFace from "assets/ninno-face.png";
import { GENDER } from "src/services/database/models/BabyModel";
import { genderColor } from "src/utils/global";

type BabyProfileHeaderProps = SafeAreaViewProps & {
  gender: GENDER;
  imageUrl?: string;
  onPressImage?: () => void;
  subtitle?: string;
  title?: string;
  useImagePlaceholder?: boolean;
};

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

export const BabyProfileHeader: FunctionComponent<BabyProfileHeaderProps> = ({
  className,
  gender,
  imageUrl,
  onPressImage,
  style,
  subtitle,
  title,
  useImagePlaceholder,
  ...props
}) => {
  const genderSharedValue = useSharedValue(gender === GENDER.M ? 1 : 0);

  const isPicturePressed = useSharedValue(gender === GENDER.M ? 1 : 0);

  const animatedPictureScaleStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(isPicturePressed.value, [0, 1], [1, 0.98]) }
    ]
  }));

  const animatedGenderBackgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      genderSharedValue.value,
      [0, 1],
      [colors[genderColor.F][300], colors[genderColor.M][300]]
    )
  }));

  const animatedGenderBorderColorStyle = useAnimatedStyle(() => ({
    backgroundColor:
      !imageUrl && useImagePlaceholder
        ? interpolateColor(
            genderSharedValue.value,
            [0, 1],
            [colors[genderColor.F][200], colors[genderColor.M][200]]
          )
        : colors.white,
    borderColor: interpolateColor(
      genderSharedValue.value,
      [0, 1],
      [colors[genderColor.F][500], colors[genderColor.M][500]]
    ),
    padding: imageUrl ? 0 : 16
  }));

  const animatedGenderIconColor = useAnimatedProps(() => ({
    color: interpolateColor(
      genderSharedValue.value,
      [0, 1],
      [colors[genderColor.F][500], colors[genderColor.M][500]]
    )
  }));

  const handleOnPressIn = () => {
    isPicturePressed.value = withTiming(1);
  };

  const handleOnPressOut = () => {
    isPicturePressed.value = withTiming(0);
  };

  useEffect(() => {
    genderSharedValue.value = withTiming(gender === GENDER.M ? 1 : 0);
  }, [gender, genderSharedValue]);

  return (
    <>
      <AnimatedSafeAreaView
        className={`h-40 items-center rounded-b-2xl ${className}`}
        style={[animatedGenderBackgroundColorStyle, style]}
        {...props}
      >
        <AnimatedPressable
          className="absolute bg-white border-4 -bottom-6 h-40 items-center justify-center rounded-xl w-40 overflow-hidden"
          onPress={onPressImage}
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
          style={[animatedGenderBorderColorStyle, animatedPictureScaleStyle]}
        >
          {imageUrl ? (
            <Image className="h-40 w-40" source={imageUrl} contentFit="cover" />
          ) : useImagePlaceholder ? (
            <Image
              className="h-full w-full"
              contentFit="contain"
              source={NinnoFace}
            />
          ) : (
            <AnimatedIonicons
              animatedProps={animatedGenderIconColor}
              name="image"
              size={48}
            />
          )}
        </AnimatedPressable>
      </AnimatedSafeAreaView>
      {(!!title || !!subtitle) && (
        <View className="mt-9">
          {!!title && (
            <Text className="font-bold text-2xl text-center">{title}</Text>
          )}
          {!!subtitle && (
            <Text
              className="font-medium text-sm text-center"
              style={{ color: colors[genderColor[gender]][500] }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}
    </>
  );
};
