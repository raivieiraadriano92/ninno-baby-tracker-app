import { useLayoutEffect, useMemo } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Q } from "@nozbe/watermelondb";
import { startOfMonth, startOfWeek, subDays } from "date-fns";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ActivityCardHandler } from "src/components/ActivityCardHandler/ActivityCardHandler";
import { ObserveActivitiesWrapper } from "src/components/ObserveActivitiesWrapper";
import { ObserveSelectedBabyWrapper } from "src/components/ObserveSelectedBabyWrapper";
import { useCustomThemeContext } from "src/context/CustomThemeProvider";
import { RootStackScreen } from "src/navigation/types";
import {
  ActivityFiltersPeriod,
  useActivityFiltersStore
} from "src/store/activityFiltersStore";
import { activityTypeAttributes } from "src/utils/global";
import { refActivityFiltersModal } from "src/utils/refs";

export const ActivityListScreen: RootStackScreen<"ActivityList"> = ({
  navigation
}) => {
  const { theme } = useCustomThemeContext();

  const insets = useSafeAreaInsets();

  const { period, activityTypeGroup } = useActivityFiltersStore();

  const extendedQueryFilters = useMemo(() => {
    const whereClause = [];

    if (activityTypeGroup !== "All") {
      const entries = Object.entries(activityTypeAttributes);

      const activityTypes = entries
        .filter(([_, activityType]) => activityType.group === activityTypeGroup)
        .map(([key]) => key);

      whereClause.push(Q.where("type", Q.oneOf(activityTypes)));
    }

    if (period !== ActivityFiltersPeriod.ALL) {
      let date: Date;

      switch (period) {
        case ActivityFiltersPeriod.WEEKLY:
          date = startOfWeek(new Date(), { weekStartsOn: 1 });

          break;

        case ActivityFiltersPeriod.MONTHLY:
          date = startOfMonth(new Date());

          break;

        case ActivityFiltersPeriod.SEVEN_DAY:
          date = subDays(new Date(), 6);

          break;

        case ActivityFiltersPeriod.THIRTY_DAY:
          date = subDays(new Date(), 29);

          break;
      }

      if (date) {
        whereClause.push(Q.where("started_at", Q.gte(date.getTime())));
      }
    }

    return whereClause;
  }, [activityTypeGroup, period]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row space-x-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("ActivityReport")}
          >
            <Ionicons
              name="stats-chart"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={refActivityFiltersModal.current?.open}>
            <Ionicons name="filter" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation, theme.colors.primary]);

  return (
    <>
      <ObserveSelectedBabyWrapper>
        {({ selectedBaby }) => (
          <ObserveActivitiesWrapper
            activitiesQuery={selectedBaby.allActivities.extend(
              ...extendedQueryFilters
            )}
          >
            {({ activities }) => (
              <FlatList
                contentContainerStyle={{
                  padding: 24,
                  paddingBottom: 24 + insets.bottom
                }}
                data={activities}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <View className="h-3" />}
                renderItem={({ item }) => (
                  <ActivityCardHandler
                    activity={item}
                    onPress={() =>
                      navigation.navigate("ActivityForm", {
                        babyId: selectedBaby.id,
                        activityId: item.id,
                        type: item.type,
                        useGoBackOnSave: true
                      })
                    }
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            )}
          </ObserveActivitiesWrapper>
        )}
      </ObserveSelectedBabyWrapper>
    </>
  );
};
