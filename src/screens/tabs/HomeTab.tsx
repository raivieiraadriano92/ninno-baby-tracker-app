import Ionicons from "@expo/vector-icons/Ionicons";
import { format, isToday, parseISO } from "date-fns";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { BabyProfileHeader } from "src/components/BabyProfileHeader";
import { Button } from "src/components/Button";
import { Card } from "src/components/Card";
import { ObserveSelectedBabyWrapper } from "src/components/ObserveSelectedBabyWrapper";
import { Text } from "src/components/Text";
import activities from "src/data/activities.json";
import { TabScreen } from "src/navigation/types";

const activityType: Record<
  string,
  { color: keyof typeof colors; emoji: string }
> = {
  nursing: { color: "rose", emoji: "🤱" },
  expressed: { color: "rose", emoji: "🍼" },
  formula: { color: "rose", emoji: "🍼" },
  supplement: { color: "rose", emoji: "🥣" },
  diaper: { color: "amber", emoji: "💩" },
  sleep: { color: "sky", emoji: "😴" },
  growth: { color: "lime", emoji: "🌱" },
  milestone: { color: "lime", emoji: "🎯" },
  other: { color: "lime", emoji: "🧸" },
  joy: { color: "lime", emoji: "😃" },
  temperature: { color: "lime", emoji: "🌡️" },
  medication: { color: "lime", emoji: "💊" },
  vaccine: { color: "lime", emoji: "💉" }
};

const todaysActivities = activities.filter((item) => isToday(item.date)) as {
  notes: string;
  type: keyof typeof activityType;
  date: string;
}[];

export const HomeTab: TabScreen<"Home"> = ({ navigation }) => (
  <ObserveSelectedBabyWrapper>
    {({ selectedBaby }) => (
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView className="p-6" edges={["top"]}>
            <BabyProfileHeader
              className="rounded-2xl"
              gender={selectedBaby.gender}
              imageUrl={selectedBaby.pictureUrl}
              subtitle="5 months 15 days"
              title={selectedBaby.name}
            />
            <View className="flex-row items-center justify-between">
              <Text className="font-bold my-6 text-lg">Today's Activities</Text>
              <View className="flex-row items-center space-x-4">
                <Pressable onPress={() => navigation.navigate("ActivityList")}>
                  <Ionicons name="list" size={24} color={colors.sky[500]} />
                </Pressable>
                <Pressable
                  onPress={() => navigation.navigate("ActivityReport")}
                >
                  <Ionicons
                    name="stats-chart"
                    size={24}
                    color={colors.sky[500]}
                  />
                </Pressable>
              </View>
            </View>
            <View className="space-y-3">
              {todaysActivities.map((item, index) => (
                <Card.Container
                  color={activityType[item.type].color}
                  key={index}
                >
                  <Card.RoundedSquare withBorder>
                    <Card.Title>{activityType[item.type].emoji}</Card.Title>
                  </Card.RoundedSquare>
                  <View className="flex-1">
                    <Card.Title>{item.type}</Card.Title>
                    <Card.Caption>{item.notes}</Card.Caption>
                  </View>
                  <Card.Caption>
                    {format(parseISO(item.date), "h:mm a")}
                  </Card.Caption>
                </Card.Container>
              ))}
            </View>
          </SafeAreaView>
        </ScrollView>
        <View className="absolute bottom-6 right-6">
          <Button
            className="w-16"
            onPress={async () => navigation.navigate("ActivityForm")}
          >
            <Ionicons name="add" size={24} color={colors.white} />
          </Button>
        </View>
      </>
    )}
  </ObserveSelectedBabyWrapper>
);
