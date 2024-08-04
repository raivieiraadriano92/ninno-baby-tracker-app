import { useLayoutEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { Card } from "src/components/Card";
import { PressableWithScaleEffect } from "src/components/PressableWithScaleEffect";
import { RootStackScreen } from "src/navigation/types";
import { ActivityType } from "src/services/database/models/ActivityModel";
import { activityTypeAttributes } from "src/utils/global";

const activityTypes = Object.entries(activityTypeAttributes);

export const ActivityTypeScreen: RootStackScreen<"ActivityType"> = ({
  navigation
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PressableWithScaleEffect onPress={navigation.goBack}>
          <Ionicons name="close" size={24} color={colors.black} />
        </PressableWithScaleEffect>
      )
    });
  }, [navigation]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="flex-1 p-6 space-y-6" edges={["bottom"]}>
        {activityTypes.map(([type, attributes]) => (
          <PressableWithScaleEffect
            key={type}
            onPress={() =>
              navigation.navigate("ActivityForm", {
                type: type as ActivityType
              })
            }
          >
            <Card.Container color={attributes.color}>
              <Card.RoundedSquare withBorder>
                <Card.Title>{attributes.emoji}</Card.Title>
              </Card.RoundedSquare>
              <Card.Title>{attributes.title}</Card.Title>
            </Card.Container>
          </PressableWithScaleEffect>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};
