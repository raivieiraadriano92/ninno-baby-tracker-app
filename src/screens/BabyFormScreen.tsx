import { Platform, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { Button } from "src/components/Button";
import { RootStackScreen } from "src/navigation/types";
import { database } from "src/services/database";
import { BabyModel } from "src/services/database/models/BabyModel";

export const BabyFormScreen: RootStackScreen<"BabyForm"> = ({ navigation }) => {
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
    <SafeAreaView
      className="flex-1 p-6"
      edges={["bottom", ...(Platform.OS === "android" ? ["top" as Edge] : [])]}
    >
      <View className="flex-1 "></View>
      <View className="space-y-4">
        <Button onPress={handleSave} title="Save" />
        <Button onPress={navigation.goBack} title="Cancel" variant="link" />
      </View>
    </SafeAreaView>
  );
};
