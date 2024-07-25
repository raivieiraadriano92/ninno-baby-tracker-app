import { FunctionComponent, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import { Pressable, PressableProps, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "tailwindcss/colors";

import { Text } from "./Text";

type DatePickerInputProps = Omit<PressableProps, "onPress"> & {
  onChange: (_date: Date) => void;
  placeholder: string;
  value?: Date;
};

export const DatePickerInput: FunctionComponent<DatePickerInputProps> = ({
  className,
  onChange,
  placeholder,
  value,
  ...props
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);

    hideDatePicker();
  };

  return (
    <>
      <Pressable
        className={`border-neutral-100 border-[1px] flex-row h-13 items-center px-4 rounded-2xl ${className}`}
        onPress={showDatePicker}
        {...props}
      >
        <View className="flex-1">
          <Text
            className={`text-sm ${value ? "text-black" : "text-neutral-300"}`}
          >
            {value ? format(value, "MMM d, yyyy") : placeholder}
          </Text>
        </View>
        <Ionicons name="calendar" size={20} color={colors.neutral[300]} />
      </Pressable>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};
