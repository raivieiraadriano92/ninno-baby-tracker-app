import { PressableProps } from "react-native";

import { ActivityModel } from "src/services/database/models/ActivityModel";

export type ActivityCardHandlerProps = PressableProps & {
  activity: ActivityModel;
};

export type ActivityCardProps = Pick<ActivityCardHandlerProps, "activity">;
