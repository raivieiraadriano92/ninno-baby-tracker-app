import { ComponentProps, FunctionComponent } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View
} from "react-native";
import colors from "tailwindcss/colors";

import { Text } from "./Text";

type TextInputProps = RNTextInputProps & {
  iconRight?: ComponentProps<typeof Ionicons>["name"];
  onPressIconRight?: () => void;
  suffix?: string;
};

export const TextInput: FunctionComponent<TextInputProps> = ({
  className,
  iconRight,
  onPressIconRight,
  style,
  suffix,
  ...props
}) => (
  <View
    className={`border-neutral-100 border-[1px] flex-row items-center rounded-2xl ${className}`}
    style={style}
  >
    <RNTextInput
      className="flex-1 h-13 px-4 text-black text-sm leading-4"
      placeholderTextColor={colors.neutral[300]}
      {...props}
    />
    {!!suffix && (
      <View className="mr-4">
        <Text className="font-medium text-neutral-300 text-sm">{suffix}</Text>
      </View>
    )}
    {!!iconRight && (
      <View className="mr-4">
        <Pressable onPress={onPressIconRight}>
          <Ionicons name={iconRight} size={20} color={colors.neutral[300]} />
        </Pressable>
      </View>
    )}
  </View>
);
