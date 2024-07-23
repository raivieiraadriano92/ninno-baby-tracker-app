import Ionicons from "@expo/vector-icons/Ionicons";
import { format, isToday } from "date-fns";
import { Image } from "expo-image";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

import { Text } from "src/components/Text";
import activities from "src/data/activities.json";
import { TabScreen } from "src/navigation/types";

const activityType = {
  nursing: { color: colors.rose, emoji: "🤱" },
  expressed: { color: colors.rose, emoji: "🍼" },
  formula: { color: colors.rose, emoji: "🍼" },
  supplement: { color: colors.rose, emoji: "🥣" },
  diaper: { color: colors.amber, emoji: "💩" },
  sleep: { color: colors.sky, emoji: "😴" },
  growth: { color: colors.lime, emoji: "🌱" },
  milestone: { color: colors.lime, emoji: "🎯" },
  other: { color: colors.lime, emoji: "🧸" },
  joy: { color: colors.lime, emoji: "😃" },
  temperature: { color: colors.lime, emoji: "🌡️" },
  medication: { color: colors.lime, emoji: "💊" },
  vaccine: { color: colors.lime, emoji: "💉" }
};

const todaysActivities = activities.filter((item) => isToday(item.date)) as {
  notes: string;
  type: keyof typeof activityType;
  date: string;
}[];

export const HomeTab: TabScreen<"Home"> = ({}) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView className="p-6" edges={["top"]}>
      <View className="bg-sky-300 h-40 items-center rounded-2xl">
        <Image
          className="absolute bg-white border-4 -bottom-6 border-sky-500 h-40 items-center justify-center rounded-xl w-40"
          source="https://img.freepik.com/free-photo/portrait-newborn-baby-sleeping-peacefully_23-2150797330.jpg"
          contentFit="cover"
        />
      </View>
      <Text className="font-bold mt-9 text-2xl text-center">Jimmy</Text>
      <Text className="font-medium text-sky-500 text-sm text-center">
        5 months 15 days
      </Text>
      <View className="flex-row items-center justify-between">
        <Text className="font-bold my-6 text-lg">Today's Activities</Text>
        <View className="flex-row items-center space-x-4">
          <Pressable>
            <Ionicons name="list" size={24} color={colors.sky[500]} />
          </Pressable>
          <Pressable>
            <Ionicons name="stats-chart" size={24} color={colors.sky[500]} />
          </Pressable>
        </View>
      </View>
      <View className="space-y-3">
        {todaysActivities.map((item, index) => (
          <View
            className="bg-white flex-row items-center p-3 rounded-2xl space-x-3"
            key={index}
            style={{ backgroundColor: activityType[item.type].color[50] }}
          >
            <View
              className="h-14 items-center justify-center rounded-lg w-14"
              style={{ backgroundColor: activityType[item.type].color[200] }}
            >
              <Text className="text-xl">{activityType[item.type].emoji}</Text>
            </View>
            <View className="flex-1">
              <Text className="capitalize font-medium">{item.type}</Text>
              <Text className="font-light text-neutral-500 text-xs">
                {item.notes}
              </Text>
            </View>
            <Text className="font-light text-neutral-500 text-xs">
              {format(new Date(item.date), "h:mm a")}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  </ScrollView>
);
