import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

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
          className="border-2 border-sky-400 h-12 rounded-xl w-12"
          source="https://picsum.photos/seed/696/3000/2000"
          contentFit="cover"
        />
        <View>
          <Text className="font-bold text-lg">Jimmy</Text>
          <Text className="text-neutral-800 text-sm">5 months 15 days</Text>
        </View>
      </View>
      <Ionicons name="menu" size={24} color={colors.black} />
    </SafeAreaView>
    <View className="flex-1 p-6">
      <UpgradeButton onPress={() => navigation.navigate("Upgrade")} />
    </View>
  </>
);
