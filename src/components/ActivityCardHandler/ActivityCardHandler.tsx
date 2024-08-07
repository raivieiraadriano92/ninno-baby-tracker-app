import { FunctionComponent } from "react";

import { PressableWithScaleEffect } from "../PressableWithScaleEffect";

import { DefaultCard } from "./DefaultCard";
import { DiaperCard } from "./DiaperCard";
import { SleepCard } from "./SleepCard";
import { ActivityCardHandlerProps, ActivityCardProps } from "./types";

import { ActivityType } from "src/services/database/models/ActivityModel";

const CardComponentMap: Partial<
  Record<ActivityType, FunctionComponent<ActivityCardProps>>
> = {
  [ActivityType.DIAPER]: DiaperCard,
  [ActivityType.SLEEP]: SleepCard
};

export const ActivityCardHandler: FunctionComponent<
  ActivityCardHandlerProps
> = ({ activity, ...props }) => {
  const CardComponent = CardComponentMap[activity.type];

  return (
    <PressableWithScaleEffect {...props}>
      {CardComponent ? (
        <CardComponent {...{ activity }} />
      ) : (
        <DefaultCard {...{ activity }} />
      )}
    </PressableWithScaleEffect>
  );
};
