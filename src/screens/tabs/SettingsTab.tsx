import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "src/components/Button";
import { Text } from "src/components/Text";
import { TabScreen } from "src/navigation/types";
import { supabase } from "src/services/supabase";

export const SettingsTab: TabScreen<"Settings"> = ({}) => (
  <>
    <SafeAreaView
      className="border-b-neutral-100 border-b-[1px] flex-row items-center p-6"
      edges={["top"]}
    >
      <Text className="font-bold text-xl">Settings</Text>
    </SafeAreaView>
    <View className="flex-1 p-6">
      <View className="flex-1" />
      <Button onPress={() => supabase.auth.signOut()} title="Logout" />
    </View>
  </>
);
