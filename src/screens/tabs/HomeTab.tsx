import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActivityCardHandler } from "src/components/ActivityCardHandler/ActivityCardHandler";
import { AddButton } from "src/components/AddButton";
import { BabyProfileHeader } from "src/components/BabyProfileHeader";
import { ObserveActivitiesWrapper } from "src/components/ObserveActivitiesWrapper";
import { ObserveSelectedBabyWrapper } from "src/components/ObserveSelectedBabyWrapper";
import { SleepingButton } from "src/components/SleepingButton";
import { Text } from "src/components/Text";
import { useCustomThemeContext } from "src/context/CustomThemeProvider";
import { TabScreen } from "src/navigation/types";

export const HomeTab: TabScreen<"Home"> = ({ navigation }) => {
  const { theme } = useCustomThemeContext();

  return (
    <ObserveSelectedBabyWrapper>
      {({ selectedBaby }) => (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView className="p-6 pb-21" edges={["top"]}>
              <BabyProfileHeader
                className="rounded-2xl"
                gender={selectedBaby.gender}
                imageUrl={selectedBaby.pictureUrl}
                onPressImage={() =>
                  navigation.navigate("BabyForm", { babyId: selectedBaby.id })
                }
                subtitle={selectedBaby.formattedBirthDate}
                title={selectedBaby.name}
                useImagePlaceholder
              />
              <View className="flex-row items-center justify-between">
                <Text className="font-bold my-6 text-lg">
                  Today's Activities
                </Text>
                <View className="flex-row items-center space-x-4">
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ActivityList")}
                  >
                    <Ionicons
                      name="list"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ActivityReport")}
                  >
                    <Ionicons
                      name="stats-chart"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <ObserveActivitiesWrapper
                activitiesQuery={selectedBaby.todaysActivities}
              >
                {({ activities: todaysActivities }) =>
                  todaysActivities.length ? (
                    <View className="space-y-3">
                      {todaysActivities.map((activity) => (
                        <ActivityCardHandler
                          activity={activity}
                          key={activity.id}
                          onPress={() =>
                            navigation.navigate("ActivityForm", {
                              babyId: selectedBaby.id,
                              activityId: activity.id,
                              type: activity.type
                            })
                          }
                        />
                      ))}
                    </View>
                  ) : (
                    <Text className="mt-10 text-center text-neutral-300 text-sm">
                      No activities yet!
                    </Text>
                  )
                }
              </ObserveActivitiesWrapper>
            </SafeAreaView>
          </ScrollView>
          <View className="absolute bottom-6 right-6 space-y-6">
            <ObserveActivitiesWrapper
              activitiesQuery={selectedBaby.unfinishedSleepActivities}
            >
              {({ activities: unfinishedSleepActivities }) =>
                !unfinishedSleepActivities.length ? (
                  <></>
                ) : (
                  <SleepingButton
                    onPress={() =>
                      navigation.navigate("ActivityForm", {
                        babyId: selectedBaby.id,
                        activityId: unfinishedSleepActivities[0].id,
                        type: unfinishedSleepActivities[0].type
                      })
                    }
                  />
                )
              }
            </ObserveActivitiesWrapper>
            <AddButton
              onPress={() =>
                navigation.navigate("ActivityType", {
                  babyId: selectedBaby.id
                })
              }
            />
          </View>
        </>
      )}
    </ObserveSelectedBabyWrapper>
  );
};
