import { Image } from "expo-image";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "src/components/Text";
import { TabScreen } from "src/navigation/types";

export const HomeTab: TabScreen<"Home"> = ({}) => (
  <ScrollView>
    <SafeAreaView className="p-6" edges={["top"]}>
      <View className="bg-sky-300 h-40 items-center rounded-2xl">
        <Image
          className="absolute bg-white border-4 -bottom-6 border-sky-500 h-40 items-center justify-center rounded-xl w-40"
          source="https://img.freepik.com/free-photo/portrait-newborn-baby-sleeping-peacefully_23-2150797330.jpg"
          contentFit="cover"
        />
      </View>
      <Text className="font-bold mt-9 text-2xl text-center">Jimmy</Text>
      <Text className="font-medium text-sky-500 text-sm text-center">
        5 months 15 days
      </Text>
      <Text className="font-bold mt-6 text-lg">Today's Activities</Text>
    </SafeAreaView>
  </ScrollView>
);
