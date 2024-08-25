import { useCallback, useRef, useState } from "react";

import { Platform, ScrollView, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { ActivityFormHandler } from "src/components/ActivityFormHandler/ActivityFormHandler";
import { Button } from "src/components/Button";
import { Text } from "src/components/Text";
import { useFetchBabyById } from "src/hooks/useFetchBabyById";
import { RootStackScreen } from "src/navigation/types";
import { ActivityModel } from "src/services/database/models/ActivityModel";
import { BabyModel } from "src/services/database/models/BabyModel";
import {
  ActivityPayload,
  createActivity,
  updateActivity
} from "src/services/database/utils/activities";
import { activityTypeAttributes } from "src/utils/global";

export const ActivityFormScreen: RootStackScreen<"ActivityForm"> = ({
  navigation,
  route: { params }
}) => {
  const activityRef = useRef<ActivityModel>();

  const [baby, setBaby] = useState<BabyModel>();

  const [payload, setPayload] = useState<ActivityPayload>({
    type: params.type,
    typeMetadata: activityTypeAttributes[params.type].initialTypeMetadata ?? {},
    startedAt: new Date()
  });

  useFetchBabyById({
    id: params.babyId,
    onSuccess: useCallback(
      async (selectedBaby: BabyModel) => {
        setBaby(selectedBaby);

        if (params?.activityId) {
          activityRef.current = await selectedBaby.activities.collection.find(
            params.activityId
          );

          if (activityRef.current) {
            setPayload({
              startedAt: activityRef.current.startedAt,
              type: activityRef.current.type,
              endedAt: activityRef.current.endedAt,
              notes: activityRef.current.notes,
              typeMetadata: activityRef.current.typeMetadata
            });
          }
        }
      },
      [params?.activityId]
    )
  });

  const attrs = activityTypeAttributes[params.type];

  const handleSave = () => {
    if (!baby) {
      return;
    }

    const onSuccess = () =>
      params.useGoBackOnSave ? navigation.goBack() : navigation.popToTop();

    if (activityRef.current) {
      updateActivity(activityRef.current, payload, onSuccess);

      return;
    }

    createActivity(baby, payload, onSuccess);
  };

  if (!baby) {
    return null;
  }

  return (
    <>
      <SafeAreaView
        className="h-20 items-center rounded-b-2xl"
        edges={Platform.OS === "android" ? ["top" as Edge] : []}
        style={{ backgroundColor: colors[attrs.color][300] }}
      >
        <View
          className="absolute bg-white border-[3px] -bottom-4 h-20 items-center justify-center rounded-xl w-20"
          style={{ borderColor: colors[attrs.color][500] }}
        >
          <Text className="text-3xl text-center">{attrs.emoji}</Text>
        </View>
      </SafeAreaView>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-1 p-6 pt-7 space-y-6">
          <Text
            className="font-bold text-2xl text-center"
            style={{ color: colors[attrs.color][500] }}
          >
            {attrs.title}
          </Text>
          <ActivityFormHandler
            activityId={params.activityId}
            baby={baby}
            payload={payload}
            setPayload={setPayload}
            type={params.type}
          />
        </View>
      </ScrollView>
      <SafeAreaView className="p-6 pt-0" edges={["bottom"]}>
        <View className="space-y-4">
          <Button onPress={handleSave} title="Save" />
          <Button onPress={navigation.goBack} title="Cancel" variant="link" />
        </View>
      </SafeAreaView>
    </>
  );
};
