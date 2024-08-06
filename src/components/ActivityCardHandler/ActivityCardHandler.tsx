import { FunctionComponent } from "react";

import { DefaultCard } from "./DefaultCard";
import { SleepCard } from "./SleepCard";
import { ActivityCardHandlerProps, ActivityCardProps } from "./types";

import { ActivityType } from "src/services/database/models/ActivityModel";

const CardComponentMap: Partial<
  Record<ActivityType, FunctionComponent<ActivityCardProps>>
> = {
  [ActivityType.SLEEP]: SleepCard
};

export const ActivityCardHandler: FunctionComponent<
  ActivityCardHandlerProps
> = ({ activity, ...props }) => {
  const CardComponent = CardComponentMap[activity.type];

  return CardComponent ? (
    <CardComponent {...{ activity, ...props }} />
  ) : (
    <DefaultCard {...{ activity, ...props }} />
  );
};
