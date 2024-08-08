import { FunctionComponent, useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

import { Text } from "./Text";

import { onSelectSupplementEvent } from "src/utils/events";

type SupplementPickerProps = TouchableOpacityProps & {
  onChange: (_value: string) => void;
  value?: string;
};

export const SupplementPicker: FunctionComponent<SupplementPickerProps> = ({
  className,
  onChange,
  value = "",
  ...props
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    const selectSupplementEvent = onSelectSupplementEvent(onChange);

    return () => {
      selectSupplementEvent.off();
    };
  }, [onChange]);

  return (
    <TouchableOpacity
      className={`border-neutral-100 border-[1px] flex-row h-13 justify-between items-center px-4 rounded-2xl ${className}`}
      onPress={() =>
        navigation.navigate("Supplements", { selectedSupplement: value })
      }
      {...props}
    >
      {value ? (
        <Text className="text-black text-sm">{value}</Text>
      ) : (
        <Text className="text-neutral-300 text-sm">Select a supplement</Text>
      )}
      <Ionicons name="chevron-down" size={20} color={colors.neutral[300]} />
    </TouchableOpacity>
  );
};
