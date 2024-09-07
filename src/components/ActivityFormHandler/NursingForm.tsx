import { FunctionComponent, useEffect, useRef, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

import { AnimatedCheckbox } from "../AnimatedCheckbox";
import {
  NursingStopwatchModal,
  NursingStopwatchModalRef
} from "../NursingStopwatchModal";
import { Text } from "../Text";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";
import {
  ActivityType,
  NursingSide,
  NursingTypeMetadata
} from "src/services/database/models/ActivityModel";
import { activityTypeAttributes } from "src/utils/global";

export const NursingForm: FunctionComponent<
  ActivityFormProps<NursingTypeMetadata>
> = ({ className, activityId, baby, payload, setPayload, ...props }) => {
  const color = activityTypeAttributes[ActivityType.NURSING].color;

  const typeMetadata = payload.typeMetadata;

  const refNursingStopwatchModal = useRef<NursingStopwatchModalRef>(null);

  const [lastStartSide, setLastStartSide] = useState("-");

  const handleStartTimer = (side: NursingSide) =>
    refNursingStopwatchModal.current?.start({
      initialValueInMinutes: typeMetadata.duration[side],
      side
    });

  useEffect(() => {
    baby.lastNursingActivity?.then((activities) => {
      const lastNursingActivity = activities.shift();

      if (lastNursingActivity) {
        const typeMetadata =
          lastNursingActivity.typeMetadata as NursingTypeMetadata;

        setLastStartSide(typeMetadata.startSide);

        setPayload((prev) => ({
          ...prev,
          typeMetadata: {
            ...prev.typeMetadata,
            startSide:
              typeMetadata.startSide === NursingSide.LEFT
                ? NursingSide.RIGHT
                : NursingSide.LEFT
          }
        }));
      }
    });
  }, [baby.lastNursingActivity, setPayload]);

  return (
    <>
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
          <View className="flex-row items-center h-13 justify-between space-x-2">
            <Text className="text-sm" style={{ color: colors[color][500] }}>
              Last start side
            </Text>
            <Text
              className="capitalize font-bold"
              style={{ color: colors[color][500] }}
            >
              {lastStartSide}
            </Text>
          </View>
          <View className="bg-neutral-100 h-[1px]" />
          <View className="flex-row h-13 items-center justify-between">
            <Text className="text-sm" style={{ color: colors[color][500] }}>
              Start side
            </Text>
            <View className="flex-row space-x-2">
              {Object.values(NursingSide).map((side) => (
                <AnimatedCheckbox
                  color={color}
                  isSelected={typeMetadata.startSide === side}
                  key={side}
                  onPress={() =>
                    setPayload((prev) => ({
                      ...prev,
                      typeMetadata: {
                        ...prev.typeMetadata,
                        startSide: side
                      }
                    }))
                  }
                  title={side}
                />
              ))}
            </View>
          </View>
          <View className="bg-neutral-100 h-[1px]" />
          <View className="flex-row items-center justify-between space-x-2">
            <View className="flex-1">
              <Text className="text-sm" style={{ color: colors[color][500] }}>
                Duration left
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleStartTimer(NursingSide.LEFT)}
            >
              <Ionicons color={colors.neutral[300]} name="play" size={24} />
            </TouchableOpacity>
            <View className="flex-1 flex-row items-center justify-end">
              <TextInput
                className="border-0"
                textInputClassName="flex-none"
                keyboardType="number-pad"
                onChangeText={(duration) =>
                  setPayload((prev) => ({
                    ...prev,
                    typeMetadata: {
                      ...prev.typeMetadata,
                      duration: {
                        ...prev.typeMetadata.duration,
                        left: parseInt(duration) || 0
                      }
                    }
                  }))
                }
                placeholder="Left"
                value={`${payload.typeMetadata.duration?.left}`}
              />
              <Text className="text-sm" style={{ color: colors[color][500] }}>
                min
              </Text>
            </View>
          </View>
          <View className="bg-neutral-100 h-[1px]" />
          <View className="flex-row items-center justify-between space-x-2">
            <View className="flex-1">
              <Text className="text-sm" style={{ color: colors[color][500] }}>
                Duration right
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleStartTimer(NursingSide.RIGHT)}
            >
              <Ionicons color={colors.neutral[300]} name="play" size={24} />
            </TouchableOpacity>
            <View className="flex-1 flex-row items-center justify-end">
              <TextInput
                className="border-0"
                textInputClassName="flex-none"
                keyboardType="number-pad"
                onChangeText={(duration) =>
                  setPayload((prev) => ({
                    ...prev,
                    typeMetadata: {
                      ...prev.typeMetadata,
                      duration: {
                        ...prev.typeMetadata.duration,
                        right: parseInt(duration) || 0
                      }
                    }
                  }))
                }
                placeholder="Right"
                value={`${payload.typeMetadata.duration?.right}`}
              />
              <Text className="text-sm" style={{ color: colors[color][500] }}>
                min
              </Text>
            </View>
          </View>
          <View className="bg-neutral-100 h-[1px]" />
          <View className="flex-row items-center h-13 justify-between space-x-2">
            <Text className="text-sm" style={{ color: colors[color][500] }}>
              Total
            </Text>
            <Text className="font-bold" style={{ color: colors[color][500] }}>
              {payload.typeMetadata.duration?.left +
                payload.typeMetadata.duration?.right}
              {" min"}
            </Text>
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
      <NursingStopwatchModal
        color={color}
        onSave={({ durationInMinutes, side }) =>
          setPayload((prev) => ({
            ...prev,
            typeMetadata: {
              ...prev.typeMetadata,
              duration: {
                ...prev.typeMetadata.duration,
                [side]: durationInMinutes
              }
            }
          }))
        }
        ref={refNursingStopwatchModal}
      />
    </>
  );
};
