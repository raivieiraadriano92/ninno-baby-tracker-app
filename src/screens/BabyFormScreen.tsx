import { useState } from "react";

import { Platform, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { BabyProfileHeader } from "src/components/BabyProfileHeader";
import { Button } from "src/components/Button";
import { GenderPicker } from "src/components/GenderPicker";
import { TextInput } from "src/components/TextInput";
import { RootStackScreen } from "src/navigation/types";
import { database } from "src/services/database";
import { BabyModel, GENDER } from "src/services/database/models/BabyModel";

export const BabyFormScreen: RootStackScreen<"BabyForm"> = ({ navigation }) => {
  const [gender, setGender] = useState(GENDER.M);

  const handleSave = () => {
    database.write(() =>
      database
        .get<BabyModel>("babies")
        .create((baby) => {
          baby.name = "Kelly";

          baby.gender = "F";

          baby.birthday = "2024-01-01";
        })
        .then((baby) => {
          navigation.goBack();

          console.log(baby);
        })
        .catch((e) => console.error(e))
    );
  };

  return (
    <>
      <BabyProfileHeader
        edges={Platform.OS === "android" ? ["top" as Edge] : []}
        gender={gender}
      />
      <SafeAreaView className="flex-1 p-6" edges={["bottom"]}>
        <View className="flex-1 pt-6 space-y-6">
          <GenderPicker onChange={setGender} value={gender} />
          <View className="space-y-4">
            <TextInput placeholder="Enter the name" />
            <TextInput
              placeholder="Enter the birth date"
              iconRight="calendar"
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View className="space-y-4">
          <Button onPress={handleSave} title="Save" />
          <Button onPress={navigation.goBack} title="Cancel" variant="link" />
        </View>
      </SafeAreaView>
    </>
  );
};
