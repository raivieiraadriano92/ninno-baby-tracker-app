import { useCallback, useRef, useState } from "react";

import { Platform, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { ActivityFormHandler } from "src/components/ActivityFormHandler/ActivityFormHandler";
import { Button } from "src/components/Button";
import { Text } from "src/components/Text";
import { useFetchBabyById } from "src/hooks/useFetchBabyById";
import { RootStackScreen } from "src/navigation/types";
import { BabyModel } from "src/services/database/models/BabyModel";
import {
  ActivityPayload,
  createActivity
} from "src/services/database/utils/activities";
import { activityTypeAttributes } from "src/utils/global";

export const ActivityFormScreen: RootStackScreen<"ActivityForm"> = ({
  navigation,
  route: { params }
}) => {
  const refBaby = useRef<BabyModel>();

  useFetchBabyById({
    id: params?.babyId,
    onSuccess: useCallback((baby: BabyModel) => {
      refBaby.current = baby;
    }, [])
  });

  const attrs = activityTypeAttributes[params.type];

  const [payload, setPayload] = useState<ActivityPayload>({
    type: params.type,
    typeMetadata: {},
    startedAt: new Date()
  });

  const handleSave = () => {
    if (!refBaby.current) {
      return;
    }

    const onSuccess = () => navigation.popToTop();

    // if (refBaby.current) {
    //   updateBaby(refBaby.current, payload, onSuccess);
    //   return;
    // }

    createActivity(refBaby.current, payload, onSuccess);
  };

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
      <Text
        className="mt-7 font-bold text-2xl text-center"
        style={{ color: colors[attrs.color][500] }}
      >
        {attrs.title}
      </Text>
      <SafeAreaView className="flex-1 p-6" edges={["bottom"]}>
        <ActivityFormHandler
          payload={payload}
          setPayload={setPayload}
          type={params.type}
        />
        <View className="space-y-4">
          <Button onPress={handleSave} title="Save" />
          <Button onPress={navigation.goBack} title="Cancel" variant="link" />
        </View>
      </SafeAreaView>
    </>
  );
};
