import { FunctionComponent } from "react";

import { View } from "react-native";

import { SupplementPicker } from "../SupplementPicker";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";
import { SupplementTypeMetadata } from "src/services/database/models/ActivityModel";

export const SupplementForm: FunctionComponent<
  ActivityFormProps<SupplementTypeMetadata>
> = ({ className, activityId, baby, payload, setPayload, ...props }) => (
  <View className={`flex-1 space-y-4 ${className}`} {...props}>
    <DatePickerInput
      mode="datetime"
      onChange={(date) => setPayload((prev) => ({ ...prev, startedAt: date }))}
      placeholder="Fell asleep at"
      value={payload.startedAt}
    />
    <SupplementPicker
      onChange={(supplement) =>
        setPayload((prev) => ({
          ...prev,
          typeMetadata: {
            ...prev.typeMetadata,
            supplement
          }
        }))
      }
      value={payload.typeMetadata.supplement}
    />
    <View className="flex-row space-x-4">
      <TextInput
        className="flex-1"
        keyboardType="number-pad"
        onChangeText={(amountStr) =>
          setPayload((prev) => ({
            ...prev,
            typeMetadata: {
              ...prev.typeMetadata,
              amount: Number(amountStr)
            }
          }))
        }
        placeholder="Amount"
        value={`${payload.typeMetadata.amount ?? ""}`}
      />
      <TextInput
        autoCapitalize="none"
        className="flex-1"
        onChangeText={(unit) =>
          setPayload((prev) => ({
            ...prev,
            typeMetadata: {
              ...prev.typeMetadata,
              unit
            }
          }))
        }
        placeholder="Unit"
        value={`${payload.typeMetadata.unit ?? ""}`}
      />
    </View>
    <TextInput
      className="h-20"
      onChangeText={(notes) => setPayload((prev) => ({ ...prev, notes }))}
      multiline
      placeholder="Notes"
      value={payload.notes}
    />
  </View>
);
