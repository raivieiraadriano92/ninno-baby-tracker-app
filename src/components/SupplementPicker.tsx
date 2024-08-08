import { FunctionComponent, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Modal,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { Button } from "./Button";
import { Text } from "./Text";
import { TextInput } from "./TextInput";

import { activityTypeAttributes } from "src/utils/global";

type SupplementPickerProps = TouchableOpacityProps & {};

export const SupplementPicker: FunctionComponent<SupplementPickerProps> = ({
  className,
  ...props
}) => {
  const [visible, setVisible] = useState(false);

  const [list] = useState<string[]>([]);

  const addNewSupplement = () => {};

  return (
    <>
      <TouchableOpacity
        className={`border-neutral-100 border-[1px] flex-row h-13 justify-between items-center px-4 rounded-2xl ${className}`}
        onPress={() => setVisible(true)}
        {...props}
      >
        <Text className="text-neutral-300 text-sm">Select a supplement</Text>
        <Ionicons name="chevron-down" size={20} color={colors.neutral[300]} />
      </TouchableOpacity>
      <Modal animationType="slide" visible={visible}>
        <SafeAreaProvider>
          <SafeAreaView className="bg-white flex-1 p-6">
            <View className="flex-1">
              <View className="flex-row space-x-4">
                <TextInput className="flex-1" placeholder="Add supplement" />
                <Button
                  customColors={[
                    colors[activityTypeAttributes.supplement.color][500],
                    colors[activityTypeAttributes.supplement.color][400]
                  ]}
                  onPress={() => setVisible(false)}
                >
                  <Ionicons name="add" size={24} color={colors.white} />
                </Button>
              </View>
              {list.map((item) => (
                <Text>{item}</Text>
              ))}
            </View>
            <Button
              customColors={[
                colors[activityTypeAttributes.supplement.color][500],
                colors[activityTypeAttributes.supplement.color][400]
              ]}
              onPress={() => setVisible(false)}
              title="Done"
            />
          </SafeAreaView>
        </SafeAreaProvider>
      </Modal>
    </>
  );
};
