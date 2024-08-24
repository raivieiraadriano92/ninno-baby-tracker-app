import { FunctionComponent, useEffect } from "react";

import { View } from "react-native";
import colors from "tailwindcss/colors";

import { AnimatedCheckbox } from "../AnimatedCheckbox";
import { Text } from "../Text";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";
import {
  ActivityType,
  DiaperStatus,
  DiaperTypeMetadata
} from "src/services/database/models/ActivityModel";
import {
  activityTypeAttributes,
  diaperStatusAttributes
} from "src/utils/global";

const diaperStatus = Object.entries(diaperStatusAttributes);

export const DiaperForm: FunctionComponent<
  ActivityFormProps<DiaperTypeMetadata>
> = ({ className, activityId, baby: _baby, payload, setPayload, ...props }) => {
  const color = activityTypeAttributes[ActivityType.DIAPER].color;

  const typeMetadata = payload.typeMetadata;

  useEffect(() => {
    if (!activityId) {
      setPayload((prev) => ({
        ...prev,
        typeMetadata: {
          ...prev.typeMetadata,
          status: DiaperStatus.WET
        }
      }));
    }
  }, [activityId, setPayload]);

  return (
    <View className={`flex-1 space-y-4 ${className}`} {...props}>
      <DatePickerInput
        mode="datetime"
        onChange={(date) =>
          setPayload((prev) => ({ ...prev, startedAt: date }))
        }
        placeholder="Fell asleep at"
        value={payload.startedAt}
      />
      <View className="border-neutral-100 border-[1px] p-4 rounded-2xl space-y-2">
        <Text className="text-sm" style={{ color: colors[color][500] }}>
          Diaper Status
        </Text>
        <View className="flex-row space-x-2">
          {diaperStatus.map(([status, attributes]) => (
            <AnimatedCheckbox
              color={color}
              isSelected={typeMetadata.status === status}
              key={status}
              onPress={() =>
                setPayload((prev) => ({
                  ...prev,
                  typeMetadata: {
                    ...prev.typeMetadata,
                    status: status as DiaperStatus
                  }
                }))
              }
              title={attributes.title}
            />
          ))}
        </View>
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
};
