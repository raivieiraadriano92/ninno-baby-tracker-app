import { useLayoutEffect } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActivityCardHandler } from "src/components/ActivityCardHandler/ActivityCardHandler";
import { ObserveActivitiesWrapper } from "src/components/ObserveActivitiesWrapper";
import { ObserveSelectedBabyWrapper } from "src/components/ObserveSelectedBabyWrapper";
import { useCustomThemeContext } from "src/context/CustomThemeProvider";
import { RootStackScreen } from "src/navigation/types";

export const ActivityListScreen: RootStackScreen<"ActivityList"> = ({
  navigation
}) => {
  const { theme } = useCustomThemeContext();

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
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView className="p-6" edges={["bottom"]}>
              <ObserveActivitiesWrapper
                activitiesQuery={selectedBaby.allActivities}
              >
                {({ activities }) => (
                  <View className="space-y-3">
                    {activities.map((activity) => (
                      <ActivityCardHandler
                        activity={activity}
                        key={activity.id}
                        onPress={() =>
                          navigation.navigate("ActivityForm", {
                            babyId: selectedBaby.id,
                            activityId: activity.id,
                            type: activity.type,
                            useGoBackOnSave: true
                          })
                        }
                      />
                    ))}
                  </View>
                )}
              </ObserveActivitiesWrapper>
            </SafeAreaView>
          </ScrollView>
        </>
      )}
    </ObserveSelectedBabyWrapper>
  );
};
