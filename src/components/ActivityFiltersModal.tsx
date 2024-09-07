import { forwardRef, useImperativeHandle, useRef } from "react";

import { View } from "react-native";
import colors from "tailwindcss/colors";

import { AnimatedCheckbox } from "./AnimatedCheckbox";
import { Button } from "./Button";
import { Modal, ModalRef } from "./Modal";
import { Text } from "./Text";

import { useCustomThemeContext } from "src/context/CustomThemeProvider";
import { ActivityTypeGroup } from "src/services/database/models/ActivityModel";
import {
  ActivityFiltersPeriod,
  useActivityFiltersStore
} from "src/store/activityFiltersStore";
import { activityTypeGroupAttributes } from "src/utils/global";

type ActivityFiltersModalProps = {
  //
};

export type ActivityFiltersModalRef = {
  open: () => void;
};

export const ActivityFiltersModal = forwardRef<
  ActivityFiltersModalRef,
  ActivityFiltersModalProps
>(({}, ref) => {
  const activityFiltersStore = useActivityFiltersStore();

  const refModal = useRef<ModalRef>(null);

  const { theme } = useCustomThemeContext();

  const apply = () => {
    refModal.current?.close();
  };

  useImperativeHandle(ref, () => ({
    open: () => refModal.current?.open()
  }));

  return (
    <Modal ref={refModal}>
      <View className="space-y-6">
        <Text className="font-bold text-lg">Filters</Text>
        <View className="border-neutral-100 border-[1px] p-4 rounded-2xl space-y-4">
          <View className="space-y-2">
            <Text
              className="text-sm"
              style={{ color: colors[theme.colorTokens.primary][500] }}
            >
              Period
            </Text>
            <View className="flex-row flex-wrap" style={{ gap: 8 }}>
              {Object.values(ActivityFiltersPeriod).map((period) => (
                <AnimatedCheckbox
                  color={theme.colorTokens.primary}
                  isSelected={activityFiltersStore.period === period}
                  key={period}
                  onPress={() => activityFiltersStore.setPeriod(period)}
                  title={period}
                />
              ))}
            </View>
          </View>
          <View className="bg-neutral-100 h-[1px]" />
          <View className="space-y-2">
            <Text
              className="text-sm"
              style={{ color: colors[theme.colorTokens.primary][500] }}
            >
              Activity
            </Text>
            <View className="flex-row flex-wrap" style={{ gap: 8 }}>
              <AnimatedCheckbox
                color={theme.colorTokens.primary}
                isSelected={activityFiltersStore.activityTypeGroup === "All"}
                onPress={() => activityFiltersStore.setActivityTypeGroup("All")}
                title="All"
              />
              {Object.entries(activityTypeGroupAttributes).map(
                ([group, { color, emoji, title }]) => (
                  <AnimatedCheckbox
                    color={color}
                    isSelected={
                      activityFiltersStore.activityTypeGroup === group
                    }
                    key={group}
                    onPress={() =>
                      activityFiltersStore.setActivityTypeGroup(
                        group as ActivityTypeGroup
                      )
                    }
                    title={`${emoji} ${title}`}
                  />
                )
              )}
            </View>
          </View>
        </View>
        <View className="space-y-4">
          <Button
            customColors={[
              colors[theme.colorTokens.primary][500],
              colors[theme.colorTokens.primary][600]
            ]}
            onPress={apply}
            title="Apply"
          />
        </View>
      </View>
    </Modal>
  );
});

ActivityFiltersModal.displayName = "ActivityFiltersModal";
