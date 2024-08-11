import { useLayoutEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ActivityCardHandler } from "src/components/ActivityCardHandler/ActivityCardHandler";
import { ObserveActivitiesWrapper } from "src/components/ObserveActivitiesWrapper";
import { ObserveSelectedBabyWrapper } from "src/components/ObserveSelectedBabyWrapper";
import { useCustomThemeContext } from "src/context/CustomThemeProvider";
import { RootStackScreen } from "src/navigation/types";

export const ActivityListScreen: RootStackScreen<"ActivityList"> = ({
  navigation
}) => {
  const { theme } = useCustomThemeContext();

  const insets = useSafeAreaInsets();

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
          <TouchableOpacity>
            <Ionicons name="calendar" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      )
    });
  }, [navigation, theme.colors.primary]);

  return (
    <ObserveSelectedBabyWrapper>
      {({ selectedBaby }) => (
        <ObserveActivitiesWrapper activitiesQuery={selectedBaby.allActivities}>
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
            // <View className="space-y-3">
            //   {activities.map((activity) => (
            //     <ActivityCardHandler
            //       activity={activity}
            //       key={activity.id}
            //       onPress={() =>
            //         navigation.navigate("ActivityForm", {
            //           babyId: selectedBaby.id,
            //           activityId: activity.id,
            //           type: activity.type,
            //           useGoBackOnSave: true
            //         })
            //       }
            //     />
            //   ))}
            // </View>
          )}
        </ObserveActivitiesWrapper>
      )}
    </ObserveSelectedBabyWrapper>
  );
};
