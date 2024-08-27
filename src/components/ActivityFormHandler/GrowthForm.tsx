import { FunctionComponent } from "react";

import { View } from "react-native";

import { AnimatedCheckbox } from "../AnimatedCheckbox";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";
import {
  ActivityType,
  GrowthTypeMetadata,
  LengthUnit,
  WeightUnit
} from "src/services/database/models/ActivityModel";
import { activityTypeAttributes } from "src/utils/global";

export const GrowthForm: FunctionComponent<
  ActivityFormProps<GrowthTypeMetadata>
> = ({ className, activityId, baby, payload, setPayload, ...props }) => {
  const color = activityTypeAttributes[ActivityType.GROWTH].color;

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
      <TextInput
        keyboardType="number-pad"
        onChangeText={(value) =>
          setPayload((prev) => ({
            ...prev,
            typeMetadata: {
              ...prev.typeMetadata,
              height: {
                ...prev.typeMetadata.height,
                value: parseInt(value) || 0
              }
            }
          }))
        }
        placeholder="Height"
        renderRight={() => (
          <View className="flex-row space-x-2">
            {Object.values(LengthUnit).map((unit) => (
              <AnimatedCheckbox
                color={color}
                isSelected={payload.typeMetadata.height.unit === unit}
                key={unit}
                onPress={() =>
                  setPayload((prev) => ({
                    ...prev,
                    typeMetadata: {
                      ...prev.typeMetadata,
                      height: {
                        ...prev.typeMetadata.height,
                        unit
                      }
                    }
                  }))
                }
                textClassName="normal-case"
                title={unit}
              />
            ))}
          </View>
        )}
        value={`${payload.typeMetadata.height.value || ""}`}
      />
      <TextInput
        keyboardType="number-pad"
        onChangeText={(value) =>
          setPayload((prev) => ({
            ...prev,
            typeMetadata: {
              ...prev.typeMetadata,
              weight: {
                ...prev.typeMetadata.weight,
                value: parseInt(value) || 0
              }
            }
          }))
        }
        placeholder="Weight"
        renderRight={() => (
          <View className="flex-row space-x-2">
            {Object.values(WeightUnit).map((unit) => (
              <AnimatedCheckbox
                color={color}
                isSelected={payload.typeMetadata.weight.unit === unit}
                key={unit}
                onPress={() =>
                  setPayload((prev) => ({
                    ...prev,
                    typeMetadata: {
                      ...prev.typeMetadata,
                      weight: {
                        ...prev.typeMetadata.weight,
                        unit
                      }
                    }
                  }))
                }
                textClassName="normal-case"
                title={unit}
              />
            ))}
          </View>
        )}
        value={`${payload.typeMetadata.weight.value || ""}`}
      />
      <TextInput
        keyboardType="number-pad"
        onChangeText={(value) =>
          setPayload((prev) => ({
            ...prev,
            typeMetadata: {
              ...prev.typeMetadata,
              head: {
                ...prev.typeMetadata.head,
                value: parseInt(value) || 0
              }
            }
          }))
        }
        placeholder="Head"
        renderRight={() => (
          <View className="flex-row space-x-2">
            {Object.values(LengthUnit).map((unit) => (
              <AnimatedCheckbox
                color={color}
                isSelected={payload.typeMetadata.head.unit === unit}
                key={unit}
                onPress={() =>
                  setPayload((prev) => ({
                    ...prev,
                    typeMetadata: {
                      ...prev.typeMetadata,
                      head: {
                        ...prev.typeMetadata.head,
                        unit
                      }
                    }
                  }))
                }
                textClassName="normal-case"
                title={unit}
              />
            ))}
          </View>
        )}
        value={`${payload.typeMetadata.head.value || ""}`}
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
};
