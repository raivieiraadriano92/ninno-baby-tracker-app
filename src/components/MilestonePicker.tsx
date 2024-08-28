import { FunctionComponent, useEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from "tailwindcss/colors";

import { Text } from "./Text";

import { onSelectMilestoneEvent } from "src/utils/events";

type MilestonePickerProps = TouchableOpacityProps & {
  onChange: (_value: string) => void;
  value?: string;
};

export const MilestonePicker: FunctionComponent<MilestonePickerProps> = ({
  className,
  onChange,
  value = "",
  ...props
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    const selectMilestoneEvent = onSelectMilestoneEvent(onChange);

    return () => {
      selectMilestoneEvent.off();
    };
  }, [onChange]);

  return (
    <TouchableOpacity
      className={`border-neutral-100 border-[1px] flex-row h-13 justify-between items-center px-4 rounded-2xl ${className}`}
      onPress={() =>
        navigation.navigate("Milestones", { selectedMilestone: value })
      }
      {...props}
    >
      {value ? (
        <Text className="text-black text-sm">{value}</Text>
      ) : (
        <Text className="text-neutral-300 text-sm">Select a Milestone</Text>
      )}
      <Ionicons name="chevron-down" size={20} color={colors.neutral[300]} />
    </TouchableOpacity>
  );
};
