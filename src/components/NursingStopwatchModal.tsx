import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import { BlurView } from "expo-blur";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import {
  Modal,
  Switch,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";

import { Button } from "./Button";
import { Text } from "./Text";

import { NursingSide } from "src/services/database/models/ActivityModel";

type NursingStopwatchModalProps = {
  color: keyof DefaultColors;
  onSave: (_: { durationInMinutes: number; side: NursingSide }) => void;
};

export type NursingStopwatchModalRef = {
  start: (_: { initialValueInMinutes: number; side: NursingSide }) => void;
};

export const NursingStopwatchModal = forwardRef<
  NursingStopwatchModalRef,
  NursingStopwatchModalProps
>(({ color, onSave }, ref) => {
  const [state, setState] = useState({
    isVisible: false,
    seconds: 0,
    isPaused: false,
    keepAwake: true,
    side: NursingSide.LEFT
  });

  const refInterval = useRef<NodeJS.Timeout>();

  const startTimer = () => {
    refInterval.current = setInterval(() => {
      setState((prev) => ({
        ...prev,
        seconds: prev.seconds + 1,
        isPaused: prev.isPaused ? false : prev.isPaused
      }));
    }, 1000);
  };

  const resetInterval = () => {
    clearInterval(refInterval.current);

    refInterval.current = undefined;
  };

  const save = () => {
    resetInterval();

    setState((prev) => ({
      ...prev,
      isVisible: false
    }));

    onSave({
      durationInMinutes: Math.ceil(state.seconds / 60),
      side: state.side
    });
  };

  const pause = () => {
    resetInterval();

    setState((prev) => ({
      ...prev,
      isPaused: true
    }));
  };

  const cancel = () => {
    resetInterval();

    setState((prev) => ({
      ...prev,
      isVisible: false
    }));
  };

  useImperativeHandle(ref, () => ({
    start: ({ initialValueInMinutes, side }) => {
      setState((prev) => ({
        ...prev,
        seconds: initialValueInMinutes * 60,
        isVisible: true,
        side
      }));

      startTimer();
    }
  }));

  useEffect(() => {
    if (state.keepAwake && state.isVisible) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [state.keepAwake, state.isVisible]);

  return (
    <Modal animationType="fade" transparent visible={state.isVisible}>
      <SafeAreaProvider>
        <TouchableWithoutFeedback onPress={cancel}>
          <BlurView
            className="flex-1"
            experimentalBlurMethod="dimezisBlurView"
            intensity={100}
            tint="dark"
          >
            <SafeAreaView className="flex-1 justify-end p-6">
              {state.isVisible && (
                <TouchableWithoutFeedback onPress={() => {}}>
                  <Animated.View
                    className="bg-white p-6 rounded-2xl space-y-6 w-full"
                    entering={SlideInDown}
                    exiting={SlideOutDown}
                  >
                    <Text
                      className="font-bold text-3xl text-center"
                      style={{ color: colors[color][500] }}
                    >
                      {format(state.seconds * 1000, "mm:ss")}
                    </Text>
                    <TouchableOpacity
                      className="self-center"
                      onPress={state.isPaused ? startTimer : pause}
                    >
                      <Ionicons
                        color={colors.neutral[300]}
                        name={state.isPaused ? "play" : "pause"}
                        size={48}
                      />
                    </TouchableOpacity>
                    <View className="border-neutral-100 border-[1px] px-4 rounded-2xl">
                      <View className="flex-row items-center h-13 justify-between space-x-2">
                        <Text
                          className="text-sm"
                          style={{ color: colors[color][500] }}
                        >
                          Side
                        </Text>
                        <Text
                          className="capitalize font-bold"
                          style={{ color: colors[color][500] }}
                        >
                          {state.side}
                        </Text>
                      </View>
                      <View className="bg-neutral-100 h-[1px]" />
                      <View className="flex-row items-center h-13 justify-between space-x-2">
                        <Text
                          className="text-sm"
                          style={{ color: colors[color][500] }}
                        >
                          Keep screen awake
                        </Text>
                        <Switch
                          trackColor={{
                            false: colors.neutral[300],
                            true: colors[color][500]
                          }}
                          thumbColor={colors.white}
                          ios_backgroundColor={colors.neutral[300]}
                          onValueChange={(keepAwake) =>
                            setState((prev) => ({ ...prev, keepAwake }))
                          }
                          value={state.keepAwake}
                        />
                      </View>
                    </View>
                    <View className="space-y-4">
                      <Button
                        customColors={[colors[color][500], colors[color][600]]}
                        onPress={save}
                        title="Save"
                      />
                      <Button onPress={cancel} title="Cancel" variant="link" />
                    </View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              )}
            </SafeAreaView>
          </BlurView>
        </TouchableWithoutFeedback>
      </SafeAreaProvider>
    </Modal>
  );
});

NursingStopwatchModal.displayName = "NursingStopwatchModal";
