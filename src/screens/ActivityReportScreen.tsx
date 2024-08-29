import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActivityBarChart } from "src/components/ActivityBarChart";
import { RootStackScreen } from "src/navigation/types";
import { ActivityType } from "src/services/database/models/ActivityModel";

export const ActivityReportScreen: RootStackScreen<"ActivityReport"> = ({}) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView className="p-6 space-y-6" edges={["bottom"]}>
      <ActivityBarChart activityType={ActivityType.NURSING} />
      <ActivityBarChart activityType={ActivityType.DIAPER} />
      <ActivityBarChart activityType={ActivityType.SLEEP} />
      <ActivityBarChart activityType={ActivityType.GROWTH} />
    </SafeAreaView>
  </ScrollView>
);
