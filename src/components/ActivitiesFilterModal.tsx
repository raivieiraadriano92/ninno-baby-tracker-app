import { forwardRef, useImperativeHandle, useState } from "react";

import { BlurView } from "expo-blur";
import { Modal, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AnimatedCheckbox } from "./AnimatedCheckbox";
import { Button } from "./Button";
import { Text } from "./Text";

import { useCustomThemeContext } from "src/context/CustomThemeProvider";

type ActivitiesFilterModalProps = {
  //
};

export type ActivitiesFilterModalRef = {
  open: () => void;
};

export const ActivitiesFilterModal = forwardRef<
  ActivitiesFilterModalRef,
  ActivitiesFilterModalProps
>(({}, ref) => {
  const { theme } = useCustomThemeContext();

  const [state, setState] = useState({
    period: "Weekly",
    isVisible: false
  });

  useImperativeHandle(ref, () => ({
    open: () => {
      setState((prev) => ({
        ...prev,
        isVisible: true
      }));
    }
  }));

  const close = () => {
    setState((prev) => ({
      ...prev,
      isVisible: false
    }));
  };

  const apply = () => {
    setState((prev) => ({
      ...prev,
      isVisible: false
    }));
  };

  return (
    <Modal animationType="fade" transparent visible={state.isVisible}>
      <BlurView
        className="flex-1"
        experimentalBlurMethod="dimezisBlurView"
        intensity={100}
      >
        <SafeAreaProvider>
          <SafeAreaView className="flex-1 justify-end p-6 space-y-6">
            <Text className="font-bold text-2xl">Filters</Text>
            <View className="flex-row space-x-2">
              {["Weekly", "Monthly", "7-day", "30-day"].map((period) => (
                <AnimatedCheckbox
                  color={theme.colorTokens.primary}
                  isSelected={state.period === period}
                  key={period}
                  onPress={() =>
                    setState((prev) => ({
                      ...prev,
                      period: period
                    }))
                  }
                  title={period}
                />
              ))}
            </View>
            <View className="space-y-4">
              <Button onPress={apply} title="Apply" />
              <Button onPress={close} title="Cancel" variant="link" />
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </BlurView>
    </Modal>
  );
});

ActivitiesFilterModal.displayName = "ActivitiesFilterModal";
