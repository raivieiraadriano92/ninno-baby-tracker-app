import { Image } from "expo-image";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

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
      <Text className="font-bold my-6 text-lg">Today's Activities</Text>
      <View className="space-y-3">
        {[
          ["Feeding", colors.orange, "🍼"],
          ["Sleep", colors.blue, "😴"],
          ["Diaper", colors.green, "💩"],
          ["Growth", colors.yellow, "🪴"]
        ].map((item) => (
          <View
            className="bg-white flex-row items-center p-3 rounded-2xl space-x-3"
            key={item[0]}
            style={{ backgroundColor: item[1][50] }}
          >
            <View
              className="h-14 items-center justify-center rounded-lg w-14"
              style={{ backgroundColor: item[1][200] }}
            >
              <Text className="text-xl">{item[2]}</Text>
            </View>
            <View className="flex-1">
              <Text className="font-medium">{item[0]}</Text>
              <Text className="font-light text-neutral-500 text-xs">5.8kg</Text>
            </View>
            <Text className="font-light text-neutral-500 text-xs">
              10:00 AM
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  </ScrollView>
);
