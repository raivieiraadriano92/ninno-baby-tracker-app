import { View } from "react-native";

import { Button } from "src/components/Button";
import { Header } from "src/components/Header";
import { TabScreen } from "src/navigation/types";
import { supabase } from "src/services/supabase";

export const SettingsTab: TabScreen<"Settings"> = ({}) => (
  <>
    <Header title="Settings" />
    <View className="flex-1 p-6">
      <View className="flex-1" />
      <Button onPress={() => supabase.auth.signOut()} title="Logout" />
    </View>
  </>
);
