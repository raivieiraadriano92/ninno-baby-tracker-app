import { FunctionComponent } from "react";

import { format } from "date-fns";
import { View } from "react-native";

import { Card } from "../Card";

import { ActivityCardProps } from "./types";

import { NursingTypeMetadata } from "src/services/database/models/ActivityModel";
import { activityTypeAttributes } from "src/utils/global";

export const NursingCard: FunctionComponent<ActivityCardProps> = ({
  activity
}) => {
  const typeMetadata = activity.typeMetadata as NursingTypeMetadata;

  return (
    <Card.Container
      color={activityTypeAttributes[activity.type].color}
      key={activity.id}
    >
      <Card.RoundedSquare withBorder>
        <Card.Title>{activityTypeAttributes[activity.type].emoji}</Card.Title>
      </Card.RoundedSquare>
      <View className="flex-1">
        <Card.Title>{activityTypeAttributes[activity.type].title}</Card.Title>
        <Card.Caption>{`Duration ${typeMetadata.duration.left + typeMetadata.duration.right} min`}</Card.Caption>
        <View className="flex-row">
          <Card.Caption>Started with </Card.Caption>
          <Card.Caption className="capitalize font-bold">
            {typeMetadata.startSide}
          </Card.Caption>
        </View>
      </View>
      <Card.Caption>{format(activity.startedAt, "h:mm a")}</Card.Caption>
    </Card.Container>
  );
};
