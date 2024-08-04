import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { BabyProfileHeader } from "src/components/BabyProfileHeader";
import { Button } from "src/components/Button";
import { Card } from "src/components/Card";
import { ObserveActivitiesWrapper } from "src/components/ObserveActivitiesWrapper";
import { ObserveSelectedBabyWrapper } from "src/components/ObserveSelectedBabyWrapper";
import { Text } from "src/components/Text";
import { useCustomThemeContext } from "src/context/CustomThemeProvider";
import { TabScreen } from "src/navigation/types";
import { activityTypeAttributes } from "src/utils/global";

export const HomeTab: TabScreen<"Home"> = ({ navigation }) => {
  const { theme } = useCustomThemeContext();

  return (
    <ObserveSelectedBabyWrapper>
      {({ selectedBaby }) => (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView className="p-6" edges={["top"]}>
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
              <ObserveActivitiesWrapper>
                {({ activities }) => (
                  <View className="space-y-3">
                    {activities.map((activity) => (
                      <Card.Container
                        color={activityTypeAttributes[activity.type].color}
                        key={activity.id}
                      >
                        <Card.RoundedSquare withBorder>
                          <Card.Title>
                            {activityTypeAttributes[activity.type].emoji}
                          </Card.Title>
                        </Card.RoundedSquare>
                        <View className="flex-1">
                          <Card.Title>
                            {activityTypeAttributes[activity.type].title}
                          </Card.Title>
                          {!!activity.notes && (
                            <Card.Caption>{activity.notes}</Card.Caption>
                          )}
                          <Card.Caption>
                            {activity.baby.name ?? "no baby"}
                          </Card.Caption>
                        </View>
                        <Card.Caption>
                          {format(activity.startedAt, "h:mm a")}
                        </Card.Caption>
                      </Card.Container>
                    ))}
                  </View>
                )}
              </ObserveActivitiesWrapper>
            </SafeAreaView>
          </ScrollView>
          <View className="absolute bottom-6 right-6">
            <Button
              className="h-14 p-0 w-14"
              onPress={() =>
                navigation.navigate("ActivityType", { babyId: selectedBaby.id })
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
