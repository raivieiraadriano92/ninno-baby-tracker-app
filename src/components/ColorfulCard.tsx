import { FunctionComponent } from "react";

import { Image } from "expo-image";
import { View, ViewProps } from "react-native";
import colors from "tailwindcss/colors";

import { Text } from "./Text";

type ColorfulCardProps = ViewProps & {
  color: keyof typeof colors;
  subtitle: string;
  title: string;
} & (
    | {
        imageUrl: string;
        leftText?: never;
      }
    | {
        imageUrl?: never;
        leftText: string;
      }
  ) &
  (
    | { rightText: string; renderRight?: never }
    | { rightText?: never; renderRight: any }
  );

export const ColorfulCard: FunctionComponent<ColorfulCardProps> = ({
  className,
  color,
  imageUrl,
  leftText,
  renderRight,
  rightText,
  style,
  subtitle,
  title,
  ...props
}) => (
  <View
    className={`bg-white flex-row items-center p-3 rounded-2xl space-x-3 ${className}`}
    style={[{ backgroundColor: colors[color][50] }, style]}
    {...props}
  >
    {!!leftText && (
      <View
        className="h-14 items-center justify-center rounded-lg w-14"
        style={{ backgroundColor: colors[color][200] }}
      >
        <Text className="text-xl">{leftText}</Text>
      </View>
    )}
    {!!imageUrl && (
      <Image
        className="border-2 h-14 rounded-lg w-14"
        source={imageUrl}
        contentFit="cover"
        style={{ borderColor: colors[color][500] }}
      />
    )}
    <View className="flex-1">
      <Text className="capitalize font-medium">{title}</Text>
      <Text className="font-light text-neutral-500 text-xs">{subtitle}</Text>
    </View>
    {!!rightText && (
      <Text className="font-light text-neutral-500 text-xs">{rightText}</Text>
    )}
    {!!renderRight && renderRight}
  </View>
);
