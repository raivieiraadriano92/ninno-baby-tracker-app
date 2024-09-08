import { forwardRef, useImperativeHandle, useRef } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";

import { Card } from "./Card";
import { Modal, ModalRef } from "./Modal";
import { PressableWithScaleEffect } from "./PressableWithScaleEffect";
import { Text } from "./Text";

import { useCustomThemeContext } from "src/context/CustomThemeProvider";
import { ActivityType } from "src/services/database/models/ActivityModel";
import { activityTypeAttributes } from "src/utils/global";

const activityTypes = Object.entries(activityTypeAttributes);

type ActivityTypesModalProps = {
  onPress: (_type: ActivityType) => void;
};

export type ActivityTypesModalRef = {
  close: () => void;
  open: () => void;
};

export const ActivityTypesModal = forwardRef<
  ActivityTypesModalRef,
  ActivityTypesModalProps
>(({ onPress }, ref) => {
  const refModal = useRef<ModalRef>(null);

  const { theme } = useCustomThemeContext();

  useImperativeHandle(ref, () => ({
    close: () => {
      refModal.current?.close();
    },
    open: () => {
      refModal.current?.open();
    }
  }));

  return (
    <Modal containerClassName="px-4 space-y-6" ref={refModal}>
      <View className="flex-row justify-between px-2">
        <Text className="font-bold text-lg">New Activity</Text>
        <TouchableOpacity onPress={refModal.current?.close}>
          <Ionicons name="close-circle" size={24} color={theme.colors.border} />
        </TouchableOpacity>
      </View>
      <View className="flex-row flex-wrap">
        {activityTypes.map(([type, attributes]) => (
          <PressableWithScaleEffect
            className="w-1/3 p-2"
            key={type}
            onPress={() =>
              !attributes.commingSoon && onPress(type as ActivityType)
            }
          >
            <Card.Container className="flex-col" color={attributes.color}>
              <View className="items-center">
                <View>
                  <Card.RoundedSquare withBorder>
                    <Card.Title>{attributes.emoji}</Card.Title>
                  </Card.RoundedSquare>
                  {attributes.commingSoon && (
                    <View
                      className="absolute px-1 py-0.5 -right-1 rounded-md -top-1"
                      style={{
                        backgroundColor: colors[attributes.color][500]
                      }}
                    >
                      <Card.Caption
                        className=" text-[10px]"
                        style={{ color: colors[attributes.color][100] }}
                      >
                        soon
                      </Card.Caption>
                    </View>
                  )}
                </View>
                <Card.Title className="font-medium text-sm" numberOfLines={1}>
                  {attributes.title}
                </Card.Title>
              </View>
            </Card.Container>
          </PressableWithScaleEffect>
        ))}
      </View>
    </Modal>
  );
});

ActivityTypesModal.displayName = "ActivityTypesModal";
