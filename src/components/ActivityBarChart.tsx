import { FunctionComponent } from "react";

import { View, ViewProps } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import colors from "tailwindcss/colors";

import { Text } from "src/components/Text";
import { ActivityType } from "src/services/database/models/ActivityModel";
import { activityTypeAttributes } from "src/utils/global";

type ActivityBarChartProps = ViewProps & {
  activityType: ActivityType;
};

const barData = [
  { value: 230, label: "Jan" },
  { value: 180, label: "Feb" },
  { value: 200, label: "Mar" },
  { value: 250, label: "Apr" },
  { value: 320, label: "May" }
];

export const ActivityBarChart: FunctionComponent<ActivityBarChartProps> = ({
  activityType,
  className,
  style
}) => {
  const diaperAttributes = activityTypeAttributes[activityType];

  return (
    <View
      className={`p-4 rounded-2xl space-y-4 ${className}`}
      style={[
        {
          backgroundColor: colors[diaperAttributes.color][50]
        },
        style
      ]}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="font-medium"
          style={{ color: colors[diaperAttributes.color][500] }}
        >{`${diaperAttributes.emoji} ${diaperAttributes.title}`}</Text>
        <View className="flex-row items-center space-x-2">
          <Text
            className="text-xs"
            style={{ color: colors[diaperAttributes.color][500] }}
          >
            {"Average: "}
            <Text
              className="font-medium text-sm"
              style={{ color: colors[diaperAttributes.color][500] }}
            >
              1
            </Text>
          </Text>
          <Text
            className="text-xs"
            style={{ color: colors[diaperAttributes.color][500] }}
          >
            {"Min: "}
            <Text
              className="font-medium text-sm"
              style={{ color: colors[diaperAttributes.color][500] }}
            >
              1
            </Text>
          </Text>
          <Text
            className="text-xs"
            style={{ color: colors[diaperAttributes.color][500] }}
          >
            {"Max: "}
            <Text
              className="font-medium text-sm"
              style={{ color: colors[diaperAttributes.color][500] }}
            >
              1
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <BarChart
          noOfSections={4}
          data={barData}
          isAnimated
          frontColor={colors[diaperAttributes.color][500]}
          xAxisColor={colors[diaperAttributes.color][500]}
          yAxisColor={colors[diaperAttributes.color][500]}
          xAxisLabelTextStyle={{
            color: colors[diaperAttributes.color][500]
          }}
          yAxisTextStyle={{
            color: colors[diaperAttributes.color][500]
          }}
          rulesColor={colors[diaperAttributes.color][300]}
        />
      </View>
    </View>
  );
};
