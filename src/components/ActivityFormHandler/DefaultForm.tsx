import { FunctionComponent, useState } from "react";

import { View } from "react-native";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";

export const DefaultForm: FunctionComponent<ActivityFormProps> = ({}) => {
  const [datetime, setDatetime] = useState<Date>(new Date());

  const [notes, setNotes] = useState<string>();

  return (
    <View className="flex-1 space-y-4">
      <DatePickerInput
        mode="datetime"
        onChange={setDatetime}
        placeholder="Fell asleep at"
        value={datetime}
      />
      <TextInput
        className="h-20"
        onChangeText={setNotes}
        multiline
        placeholder="Notes"
        value={notes}
      />
    </View>
  );
};
