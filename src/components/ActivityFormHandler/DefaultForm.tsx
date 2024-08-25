import { FunctionComponent } from "react";

import { View } from "react-native";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";

export const DefaultForm: FunctionComponent<ActivityFormProps> = ({
  className,
  activityId,
  baby,
  payload,
  setPayload,
  ...props
}) => (
  <View className={`flex-1 space-y-4 ${className}`} {...props}>
    <DatePickerInput
      mode="datetime"
      onChange={(date) => setPayload((prev) => ({ ...prev, startedAt: date }))}
      placeholder="Fell asleep at"
      value={payload.startedAt}
    />
    <TextInput
      className="h-20"
      onChangeText={(notes) => setPayload((prev) => ({ ...prev, notes }))}
      multiline
      placeholder="Notes"
      value={payload.notes}
    />
  </View>
);
