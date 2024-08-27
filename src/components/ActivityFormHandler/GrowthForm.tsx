import { FunctionComponent } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

import { AnimatedCheckbox } from "../AnimatedCheckbox";
import { Text } from "../Text";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";
import { usePickImage } from "src/hooks/usePickImage";
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

  const { pickImage } = usePickImage({
    onSuccess: (asset) =>
      setPayload((prev) => ({ ...prev, pictureUrl: asset.uri }))
  });

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
      <View className="border-neutral-100 border-[1px] px-4 rounded-2xl">
        <View className="flex-row items-center justify-between space-x-2">
          <View className="flex-1">
            <Text className="text-sm" style={{ color: colors[color][500] }}>
              Weight
            </Text>
          </View>
          <TextInput
            containerRightClassName="mr-0"
            className="border-0"
            textInputClassName="flex-none"
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
            placeholder="0"
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
        </View>
        <View className="bg-neutral-100 h-[1px]" />
        <View className="flex-row items-center justify-between space-x-2">
          <View className="flex-1">
            <Text className="text-sm" style={{ color: colors[color][500] }}>
              Weight
            </Text>
          </View>
          <TextInput
            containerRightClassName="mr-0"
            className="border-0"
            textInputClassName="flex-none"
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
            placeholder="0"
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
        </View>
        <View className="bg-neutral-100 h-[1px]" />
        <View className="flex-row items-center justify-between space-x-2">
          <View className="flex-1">
            <Text className="text-sm" style={{ color: colors[color][500] }}>
              Head
            </Text>
          </View>
          <TextInput
            containerRightClassName="mr-0"
            className="border-0"
            textInputClassName="flex-none"
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
            placeholder="0"
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
        </View>
        <View className="bg-neutral-100 h-[1px]" />
        <View className="flex-row h-13 items-center justify-between space-x-2">
          <Text className="text-sm" style={{ color: colors[color][500] }}>
            Record this moment
          </Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity onPress={() => pickImage(true)}>
              <Ionicons name="camera" size={24} color={colors[color][500]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage()}>
              <Ionicons name="image" size={24} color={colors[color][500]} />
            </TouchableOpacity>
          </View>
        </View>
        {payload.pictureUrl && (
          <>
            <View className="bg-neutral-100 h-[1px]" />
            <View className="h-60 my-4 self-center w-60">
              <Image
                className="h-full rounded-2xl w-full"
                contentFit="contain"
                source={{ uri: payload.pictureUrl }}
              />
            </View>
          </>
        )}
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
