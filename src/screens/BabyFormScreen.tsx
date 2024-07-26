import { useState } from "react";

import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import { Platform, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import { BabyProfileHeader } from "src/components/BabyProfileHeader";
import { Button } from "src/components/Button";
import { DatePickerInput } from "src/components/DatePickerInput";
import { GenderPicker } from "src/components/GenderPicker";
import { TextInput } from "src/components/TextInput";
import { RootStackScreen } from "src/navigation/types";
import { database } from "src/services/database";
import { BabyModel, GENDER } from "src/services/database/models/BabyModel";

export const BabyFormScreen: RootStackScreen<"BabyForm"> = ({ navigation }) => {
  const [name, setName] = useState<string>();

  const [gender, setGender] = useState(GENDER.M);

  const [birthDate, setBirthDate] = useState<Date>();

  const [imageUrl, setImageUrl] = useState<string>();

  const handleSave = () => {
    database.write(() =>
      database
        .get<BabyModel>("babies")
        .create((baby) => {
          baby.name = name;

          baby.gender = gender;

          baby.birthday = format(birthDate, "yyyy-MM-dd");

          baby.pictureUrl = imageUrl;
        })
        .then((baby) => {
          navigation.goBack();

          console.log(baby);
        })
        .catch((e) => console.error(e))
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    }
  };

  return (
    <>
      <BabyProfileHeader
        edges={Platform.OS === "android" ? ["top" as Edge] : []}
        gender={gender}
        imageUrl={imageUrl}
        onPressImage={pickImage}
      />
      <SafeAreaView className="flex-1 p-6" edges={["bottom"]}>
        <View className="flex-1 pt-6 space-y-6">
          <GenderPicker onChange={setGender} value={gender} />
          <View className="space-y-4">
            <TextInput onChangeText={setName} placeholder="Enter the name" />
            <DatePickerInput
              onChange={setBirthDate}
              placeholder="Enter the birth date"
              value={birthDate}
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
