import { FunctionComponent, useState } from "react";

import { TouchableOpacity, View } from "react-native";

import { Text } from "../Text";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";
import { useCustomThemeContext } from "src/context/CustomThemeProvider";

export const SleepForm: FunctionComponent<ActivityFormProps> = ({
  baby,
  payload,
  setPayload
}) => {
  const { theme } = useCustomThemeContext();

  const [isAwake, setIsAwake] = useState(!!payload.endedAt);

  return (
    <View className="flex-1 space-y-4">
      <DatePickerInput
        mode="datetime"
        onChange={(date) =>
          setPayload((prev) => ({ ...prev, startedAt: date }))
        }
        placeholder="Fell asleep at"
        value={payload.startedAt}
      />
      {payload.endedAt || isAwake ? (
        <DatePickerInput
          mode="datetime"
          onChange={(date) =>
            setPayload((prev) => ({ ...prev, endedAt: date }))
          }
          placeholder="Woke up at"
          value={payload.endedAt}
        />
      ) : (
        <TouchableOpacity onPress={() => setIsAwake(true)}>
          <Text style={{ color: theme.colors.primary }}>
            {"Is "}
            <Text className="font-bold" style={{ color: theme.colors.primary }}>
              {baby.name}
            </Text>
            {" awake yet?"}
          </Text>
        </TouchableOpacity>
      )}
      <TextInput
        className="h-20"
        onChangeText={(notes) => setPayload((prev) => ({ ...prev, notes }))}
        multiline
        placeholder="Notes"
        value={payload.notes}
      />
    </View>
  );
};
