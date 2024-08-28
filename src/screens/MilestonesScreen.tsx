import { useLayoutEffect, useRef, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  ScrollView,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { Button } from "src/components/Button";
import { PressableWithScaleEffect } from "src/components/PressableWithScaleEffect";
import { Text } from "src/components/Text";
import { TextInput } from "src/components/TextInput";
import { RootStackScreen } from "src/navigation/types";
import { useMilestoneStore } from "src/store/milestoneStore";
import { emitSelectMilestoneEvent } from "src/utils/events";
import { activityTypeAttributes } from "src/utils/global";

const primaryColor = colors[activityTypeAttributes.milestone.color][500];

const primaryColorActive = colors[activityTypeAttributes.milestone.color][400];

export const MilestonesScreen: RootStackScreen<"Milestones"> = ({
  navigation,
  route: { params }
}) => {
  const newMilestoneInputRef = useRef<RNTextInput>(null);

  const newMilestoneTextRef = useRef<string>();

  const milestoneStore = useMilestoneStore();

  const [selectedMilestone, setSelectedMilestone] = useState<string>(
    params?.selectedMilestone ?? ""
  );

  const clearNewMilestone = () => {
    newMilestoneTextRef.current = "";

    newMilestoneInputRef.current?.clear();
  };

  const addNewMilestone = () => {
    if (newMilestoneTextRef.current) {
      if (milestoneStore.list.includes(newMilestoneTextRef.current)) {
        Alert.alert(
          "Milestone Duplicated",
          "This milestone is already registered.",
          [{ text: "OK", onPress: clearNewMilestone }]
        );

        return;
      }

      milestoneStore.add(newMilestoneTextRef.current);

      setSelectedMilestone(newMilestoneTextRef.current);

      clearNewMilestone();
    }
  };

  const handleOnDone = () => {
    emitSelectMilestoneEvent(selectedMilestone);

    navigation.goBack();
  };

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
    <SafeAreaView className="bg-white flex-1 px-6" edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-6 space-y-6">
          <View className="flex-row space-x-4">
            <TextInput
              className="flex-1"
              onChangeText={(text) => (newMilestoneTextRef.current = text)}
              placeholder="Add milestone"
              ref={newMilestoneInputRef}
            />
            <Button onPress={addNewMilestone} variant="link">
              <Ionicons name="add" size={24} color={primaryColor} />
            </Button>
          </View>
          <View className="space-y-3">
            {milestoneStore.list.map((milestone) => (
              <TouchableOpacity
                className="flex-row space-x-4"
                key={milestone}
                onPress={() => setSelectedMilestone(milestone)}
              >
                <Ionicons
                  name={
                    selectedMilestone === milestone
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={24}
                  color={
                    selectedMilestone === milestone
                      ? primaryColor
                      : colors.black
                  }
                />
                <Text
                  className="font-medium"
                  style={
                    selectedMilestone === milestone && {
                      color: primaryColor
                    }
                  }
                >
                  {milestone}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <Button
        className="mb-6"
        customColors={[primaryColor, primaryColorActive]}
        onPress={handleOnDone}
        title="Done"
      />
    </SafeAreaView>
  );
};
