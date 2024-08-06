import { ViewProps } from "react-native";

import { ActivityModel } from "src/services/database/models/ActivityModel";

export type ActivityCardHandlerProps = ViewProps & {
  activity: ActivityModel;
};

export type ActivityCardProps = ActivityCardHandlerProps;
