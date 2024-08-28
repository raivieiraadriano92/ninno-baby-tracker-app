import { FunctionComponent } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

import { MilestonePicker } from "../MilestonePicker";
import { Text } from "../Text";

import { ActivityFormProps } from "./types";

import { DatePickerInput } from "src/components/DatePickerInput";
import { TextInput } from "src/components/TextInput";
import { usePickImage } from "src/hooks/usePickImage";
import {
  ActivityType,
  MilestoneTypeMetadata
} from "src/services/database/models/ActivityModel";
import { activityTypeAttributes } from "src/utils/global";

export const MilestoneForm: FunctionComponent<
  ActivityFormProps<MilestoneTypeMetadata>
> = ({ className, activityId, baby, payload, setPayload, ...props }) => {
  const color = activityTypeAttributes[ActivityType.MILESTONE].color;

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
      <MilestonePicker
        onChange={(milestone) =>
          setPayload((prev) => ({
            ...prev,
            typeMetadata: {
              ...prev.typeMetadata,
              milestone
            }
          }))
        }
        value={payload.typeMetadata.milestone}
      />
      <View className="border-neutral-100 border-[1px] px-4 rounded-2xl">
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
