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
import { useSupplementStore } from "src/store/supplementStore";
import { emitSelectSupplementEvent } from "src/utils/events";
import { activityTypeAttributes } from "src/utils/global";

const primaryColor = colors[activityTypeAttributes.supplement.color][500];

const primaryColorActive = colors[activityTypeAttributes.supplement.color][400];

export const SupplementsScreen: RootStackScreen<"Supplements"> = ({
  navigation,
  route: { params }
}) => {
  const newSupplementInputRef = useRef<RNTextInput>(null);

  const newSupplementTextRef = useRef<string>();

  const supplementStore = useSupplementStore();

  const [selectedSupplement, setSelectedSupplement] = useState<string>(
    params?.selectedSupplement ?? ""
  );

  const clearNewSupplement = () => {
    newSupplementTextRef.current = "";

    newSupplementInputRef.current?.clear();
  };

  const addNewSupplement = () => {
    if (newSupplementTextRef.current) {
      if (supplementStore.list.includes(newSupplementTextRef.current)) {
        Alert.alert(
          "Supplement Duplicated",
          "This supplement is already registered.",
          [{ text: "OK", onPress: clearNewSupplement }]
        );

        return;
      }

      supplementStore.add(newSupplementTextRef.current);

      setSelectedSupplement(newSupplementTextRef.current);

      clearNewSupplement();
    }
  };

  const handleOnDone = () => {
    emitSelectSupplementEvent(selectedSupplement);

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
              onChangeText={(text) => (newSupplementTextRef.current = text)}
              placeholder="Add supplement"
              ref={newSupplementInputRef}
            />
            <Button onPress={addNewSupplement} variant="link">
              <Ionicons name="add" size={24} color={primaryColor} />
            </Button>
          </View>
          <View className="space-y-3">
            {supplementStore.list.map((supplement) => (
              <TouchableOpacity
                className="flex-row space-x-4"
                key={supplement}
                onPress={() => setSelectedSupplement(supplement)}
              >
                <Ionicons
                  name={
                    selectedSupplement === supplement
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={24}
                  color={
                    selectedSupplement === supplement
                      ? primaryColor
                      : colors.black
                  }
                />
                <Text
                  className="font-medium"
                  style={
                    selectedSupplement === supplement && {
                      color: primaryColor
                    }
                  }
                >
                  {supplement}
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
