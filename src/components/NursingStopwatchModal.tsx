import { forwardRef, useImperativeHandle, useRef, useState } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import { activateKeepAwakeAsync, deactivateKeepAwake } from "expo-keep-awake";
import { Switch, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { DefaultColors } from "tailwindcss/types/generated/colors";

import { Button } from "./Button";
import { Modal, ModalRef } from "./Modal";
import { Text } from "./Text";

import { NursingSide } from "src/services/database/models/ActivityModel";

type NursingStopwatchModalProps = {
  color: keyof DefaultColors;
  onSave: (_: { durationInMinutes: number; side: NursingSide }) => void;
};

export type NursingStopwatchModalRef = {
  start: (_: { initialValueInMinutes: number; side: NursingSide }) => void;
};

const INITIAL_STATE = {
  seconds: 0,
  isPaused: false,
  keepAwake: true,
  side: NursingSide.LEFT
};

export const NursingStopwatchModal = forwardRef<
  NursingStopwatchModalRef,
  NursingStopwatchModalProps
>(({ color, onSave }, ref) => {
  const [state, setState] = useState({
    ...INITIAL_STATE
  });

  const refInterval = useRef<NodeJS.Timeout>();

  const refModal = useRef<ModalRef>(null);

  const resetInterval = () => {
    if (refInterval.current) {
      clearInterval(refInterval.current);
    }

    refInterval.current = undefined;
  };

  const startTimer = () => {
    resetInterval();

    setState((prev) => ({
      ...prev,
      isPaused: false
    }));

    refInterval.current = setInterval(() => {
      setState((prev) => ({
        ...prev,
        seconds: prev.seconds + 1
      }));
    }, 1000);
  };

  const save = () => {
    resetInterval();

    refModal.current?.close();

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

    refModal.current?.close();
  };

  const handleKeepAwake = (keepAwake: boolean, changeState = true) => {
    if (keepAwake) {
      activateKeepAwakeAsync();
    } else {
      deactivateKeepAwake();
    }

    if (changeState) {
      setState((prev) => ({ ...prev, keepAwake }));
    }
  };

  useImperativeHandle(ref, () => ({
    start: ({ initialValueInMinutes, side }) => {
      setState({
        ...INITIAL_STATE,
        seconds: initialValueInMinutes * 60,
        side
      });

      refModal.current?.open();

      startTimer();
    }
  }));

  return (
    <Modal
      onClose={() => handleKeepAwake(false, false)}
      onOpen={() => handleKeepAwake(INITIAL_STATE.keepAwake, false)}
      ref={refModal}
    >
      <View className="space-y-6">
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
              onValueChange={handleKeepAwake}
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
      </View>
    </Modal>
  );
});

NursingStopwatchModal.displayName = "NursingStopwatchModal";
