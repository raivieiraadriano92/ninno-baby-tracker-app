import { Image } from "expo-image";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "src/components/Text";
import { UpgradeButton } from "src/components/UpgradeButton";
import { TabScreen } from "src/navigation/types";

export const HomeTab: TabScreen<"Home"> = ({ navigation }) => (
  <>
    <SafeAreaView
      className="bg-sky-200 flex-row items-center justify-between rounded-b-2xl p-6"
      edges={["top"]}
    >
      <View className="flex-row items-center space-x-2">
        <Image
          className="border-2 border-sky-400 h-14 rounded-xl w-14"
          source="https://picsum.photos/seed/696/3000/2000"
          contentFit="cover"
        />
        <View>
          <Text className="font-bold text-lg">Jimmy</Text>
          <View className="flex-row space-x-1">
            <View className="bg-sky-400 px-2 py-1 rounded-full">
              <Text className="text-sky-100 text-xs">5 months 15 days</Text>
            </View>
            <View className="bg-sky-400 px-2 py-1 rounded-full">
              <Text className="text-sky-100 text-xs">5kg</Text>
            </View>
            <View className="bg-sky-400 px-2 py-1 rounded-full">
              <Text className="text-sky-100 text-xs">50cm</Text>
            </View>
          </View>
        </View>
      </View>
      {/* <Ionicons name="people" size={24} color={colors.black} /> */}
    </SafeAreaView>
    <View className="flex-1 p-6">
      <UpgradeButton onPress={() => navigation.navigate("Upgrade")} />
    </View>
  </>
);
