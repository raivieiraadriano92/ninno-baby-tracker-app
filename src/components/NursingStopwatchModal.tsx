import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { Modal, Switch, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";

import { Text } from "./Text";

import { NursingSide } from "src/services/database/models/ActivityModel";

type NursingStopwatchModalProps = {
  color: keyof DefaultColors;
  onStop: (_: { durationInMinutes: number; side: NursingSide }) => void;
};

export type NursingStopwatchModalRef = {
  start: (_: { initialValueInMinutes: number; side: NursingSide }) => void;
};

export const NursingStopwatchModal = forwardRef<
  NursingStopwatchModalRef,
  NursingStopwatchModalProps
>(({ color, onStop }, ref) => {
  const [state, setState] = useState({
    isVisible: false,
    seconds: 0,
    isPaused: false,
    keepAwake: true,
    side: NursingSide.LEFT
  });

  const refInterval = useRef<NodeJS.Timeout>();

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

  const startTimer = () => {
    refInterval.current = setInterval(() => {
      setState((prev) => ({
        ...prev,
        seconds: prev.seconds + 1,
        isPaused: prev.isPaused ? false : prev.isPaused
      }));
    }, 1000);
  };

  const stop = () => {
    clearInterval(refInterval.current);

    refInterval.current = undefined;

    setState((prev) => ({
      ...prev,
      isVisible: false
    }));

    onStop({
      durationInMinutes: Math.ceil(state.seconds / 60),
      side: state.side
    });
  };

  const pause = () => {
    clearInterval(refInterval.current);

    refInterval.current = undefined;

    setState((prev) => ({
      ...prev,
      isPaused: true
    }));
  };

  useEffect(() => {
    if (state.keepAwake && state.isVisible) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }
  }, [state.keepAwake, state.isVisible]);

  return (
    <Modal animationType="fade" transparent visible={state.isVisible}>
      <View
        className="flex-1 items-center justify-center px-6"
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      >
        <View className="bg-white p-6 rounded-2xl space-y-6 w-full">
          <Text
            className="font-bold text-3xl text-center"
            style={{ color: colors[color][500] }}
          >
            {format(state.seconds * 1000, "mm:ss")}
          </Text>
          <View className="flex-row items-center justify-center">
            <TouchableOpacity onPress={state.isPaused ? startTimer : pause}>
              <Ionicons
                color={colors.neutral[300]}
                name={state.isPaused ? "play" : "pause"}
                size={48}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={stop}>
              <Ionicons color={colors[color][500]} name="stop" size={48} />
            </TouchableOpacity>
          </View>
          <View className="border-neutral-100 border-[1px] px-4 rounded-2xl">
            <View className="flex-row items-center h-13 justify-between space-x-2">
              <Text className="text-sm" style={{ color: colors[color][500] }}>
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
              <Text className="text-sm" style={{ color: colors[color][500] }}>
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
        </View>
      </View>
    </Modal>
  );
});

NursingStopwatchModal.displayName = "NursingStopwatchModal";
