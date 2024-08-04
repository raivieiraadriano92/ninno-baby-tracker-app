import { useLayoutEffect } from "react";

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "src/components/Button";
import { RootStackScreen } from "src/navigation/types";
import { activityTypeAttributes } from "src/utils/global";

export const ActivityFormScreen: RootStackScreen<"ActivityForm"> = ({
  navigation,
  route: { params }
}) => {
  const attrs = activityTypeAttributes[params?.type];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${attrs.emoji} ${attrs.title}`
    });
  }, [attrs.emoji, attrs.title, navigation]);

  return (
    <SafeAreaView className="flex-1 p-6" edges={["bottom"]}>
      <View className="flex-1 pt-6 space-y-6"></View>
      <View className="space-y-4">
        <Button onPress={navigation.popToTop} title="Save" />
        <Button onPress={navigation.goBack} title="Cancel" variant="link" />
      </View>
    </SafeAreaView>
  );
};
