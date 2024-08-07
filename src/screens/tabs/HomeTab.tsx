import Ionicons from "@expo/vector-icons/Ionicons";
import { Q } from "@nozbe/watermelondb";
import { endOfToday, startOfToday } from "date-fns";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { ActivityCardHandler } from "src/components/ActivityCardHandler/ActivityCardHandler";
import { BabyProfileHeader } from "src/components/BabyProfileHeader";
import { Button } from "src/components/Button";
import { ObserveActivitiesWrapper } from "src/components/ObserveActivitiesWrapper";
import { ObserveSelectedBabyWrapper } from "src/components/ObserveSelectedBabyWrapper";
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
                  <Pressable
                    onPress={() => navigation.navigate("ActivityList")}
                  >
                    <Ionicons
                      name="list"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => navigation.navigate("ActivityReport")}
                  >
                    <Ionicons
                      name="stats-chart"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </Pressable>
                </View>
              </View>
              <ObserveActivitiesWrapper
                activitiesQuery={selectedBaby.activities.extend(
                  Q.where(
                    "started_at",
                    Q.between(startOfToday().getTime(), endOfToday().getTime())
                  ),
                  Q.sortBy("started_at", Q.desc)
                )}
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
                            type: activity.type
                          })
                        }
                      />
                    ))}
                  </View>
                )}
              </ObserveActivitiesWrapper>
            </SafeAreaView>
          </ScrollView>
          <View className="absolute bottom-6 right-6">
            <Button
              className="h-12 p-0 w-12"
              onPress={() =>
                navigation.navigate("ActivityType", {
                  babyId: selectedBaby.id
                })
              }
            >
              <Ionicons name="add" size={24} color={colors.white} />
            </Button>
          </View>
        </>
      )}
    </ObserveSelectedBabyWrapper>
  );
};
