import { SafeAreaView } from "react-native-safe-area-context";

import { RootStackScreen } from "src/navigation/types";

export const HomeScreen: RootStackScreen<"Home"> = ({}) => (
  <SafeAreaView className="flex-1 p-6"></SafeAreaView>
);
