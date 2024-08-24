import { FunctionComponent } from "react";

import { View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";
import { FormulaTypeMetadata } from "src/services/database/models/ActivityModel";

const UNIT = "ml";

export const FormulaForm: FunctionComponent<
  ActivityFormProps<FormulaTypeMetadata>
> = ({
  className,
  activityId: _activityId,
  baby: _baby,
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
      keyboardType="number-pad"
      onChangeText={(amountStr) =>
        setPayload((prev) => ({
          ...prev,
          typeMetadata: {
            ...prev.typeMetadata,
            amount: Number(amountStr),
            unit: UNIT
          }
        }))
      }
      placeholder="Amount"
      suffix={UNIT}
      value={`${payload.typeMetadata.amount ?? ""}`}
    />
    <Animated.View layout={LinearTransition}>
      <TextInput
        className="h-20"
        onChangeText={(notes) => setPayload((prev) => ({ ...prev, notes }))}
        multiline
        placeholder="Notes"
        value={payload.notes}
      />
    </Animated.View>
  </View>
);
