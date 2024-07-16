import { FunctionComponent } from "react";

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "src/components/Text";

type HeaderProps = {
  title: string;
};

export const Header: FunctionComponent<HeaderProps> = ({ title }) => (
  <SafeAreaView
    className="border-b-neutral-100 border-b-[1px] flex-row items-center px-6"
    edges={["top"]}
  >
    <View className="h-12 justify-center">
      <Text className="font-bold text-lg">{title}</Text>
    </View>
  </SafeAreaView>
);
