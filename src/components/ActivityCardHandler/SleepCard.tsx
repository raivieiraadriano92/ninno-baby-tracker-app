import { FunctionComponent } from "react";

import { format } from "date-fns";
import { View } from "react-native";

import { Card } from "../Card";

import { ActivityCardProps } from "./types";

import { activityTypeAttributes } from "src/utils/global";

export const SleepCard: FunctionComponent<ActivityCardProps> = ({
  activity
}) => (
  <Card.Container
    color={activityTypeAttributes[activity.type].color}
    key={activity.id}
  >
    <Card.RoundedSquare withBorder>
      <Card.Title>{activityTypeAttributes[activity.type].emoji}</Card.Title>
    </Card.RoundedSquare>
    <View className="flex-1">
      <Card.Title>{activityTypeAttributes[activity.type].title}</Card.Title>
      <Card.Caption>
        {activity.endedAt
          ? `Woke up at ${format(activity.endedAt, "h:mm a")}`
          : `Still sleeping 🤫`}
      </Card.Caption>
    </View>
    <Card.Caption>{format(activity.startedAt, "h:mm a")}</Card.Caption>
  </Card.Container>
);
