import Ionicons from "@expo/vector-icons/Ionicons";
import { format, isToday } from "date-fns";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { BabyProfileHeader } from "src/components/BabyProfileHeader";
import { Button } from "src/components/Button";
import { ColorfulCard } from "src/components/ColorfulCard";
import { Text } from "src/components/Text";
import activities from "src/data/activities.json";
import { TabScreen } from "src/navigation/types";
import { GENDER } from "src/services/database/models/BabyModel";

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
  <>
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="p-6" edges={["top"]}>
        <BabyProfileHeader
          className="rounded-2xl"
          gender={GENDER.M}
          imageUrl="https://img.freepik.com/free-photo/portrait-newborn-baby-sleeping-peacefully_23-2150797330.jpg"
          subtitle="5 months 15 days"
          title="Jimmy"
        />
        <View className="flex-row items-center justify-between">
          <Text className="font-bold my-6 text-lg">Today's Activities</Text>
          <View className="flex-row items-center space-x-4">
            <Pressable onPress={() => navigation.navigate("ActivityList")}>
              <Ionicons name="list" size={24} color={colors.sky[500]} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("ActivityReport")}>
              <Ionicons name="stats-chart" size={24} color={colors.sky[500]} />
            </Pressable>
          </View>
        </View>
        <View className="space-y-3">
          {todaysActivities.map((item, index) => (
            <ColorfulCard
              color={activityType[item.type].color}
              leftText={activityType[item.type].emoji}
              rightText={format(new Date(item.date), "h:mm a")}
              subtitle={item.notes}
              title={item.type}
              key={index}
            />
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
);
