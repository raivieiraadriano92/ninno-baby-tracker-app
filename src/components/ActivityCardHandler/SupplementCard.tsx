import { FunctionComponent } from "react";

import { format } from "date-fns";
import { View } from "react-native";

import { Card } from "../Card";

import { ActivityCardProps } from "./types";

import { SupplementTypeMetadata } from "src/services/database/models/ActivityModel";
import { activityTypeAttributes } from "src/utils/global";

export const SupplementCard: FunctionComponent<ActivityCardProps> = ({
  activity
}) => {
  const typeMetadata = activity.typeMetadata as SupplementTypeMetadata;

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
        <Card.Caption>{`${typeMetadata.supplement} - ${typeMetadata.amount}${typeMetadata.unit}`}</Card.Caption>
      </View>
      <Card.Caption>{format(activity.startedAt, "h:mm a")}</Card.Caption>
    </Card.Container>
  );
};
