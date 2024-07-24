import { ComponentProps, FunctionComponent } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View
} from "react-native";
import colors from "tailwindcss/colors";

type TextInputProps = RNTextInputProps & {
  iconRight?: ComponentProps<typeof Ionicons>["name"];
  onPressIconRight?: () => void;
};

export const TextInput: FunctionComponent<TextInputProps> = ({
  className,
  iconRight,
  onPressIconRight,
  style,
  ...props
}) => (
  <View
    className={`border-neutral-100 border-[1px] flex-row items-center rounded-2xl ${className}`}
    style={style}
  >
    <RNTextInput
      className="flex-1 h-13 px-4"
      placeholderTextColor={colors.neutral[300]}
      {...props}
    />
    {!!iconRight && (
      <View className="mr-4">
        <Pressable onPress={onPressIconRight}>
          <Ionicons name={iconRight} size={20} color={colors.neutral[300]} />
        </Pressable>
      </View>
    )}
  </View>
);
