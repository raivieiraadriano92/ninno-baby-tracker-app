import { Dispatch, SetStateAction } from "react";

import { ViewProps } from "react-native";

import {
  ActivityModel,
  ActivityType
} from "src/services/database/models/ActivityModel";
import { BabyModel } from "src/services/database/models/BabyModel";
import { ActivityPayload } from "src/services/database/utils/activities";

export type ActivityFormHandlerProps<TypeMetadata = unknown> = ViewProps & {
  activityId?: ActivityModel["id"];
  baby: BabyModel;
  payload: ActivityPayload<TypeMetadata>;
  setPayload: Dispatch<SetStateAction<ActivityPayload<TypeMetadata>>>;
  type: ActivityType;
};

export type ActivityFormProps<TypeMetadata = unknown> = Omit<
  ActivityFormHandlerProps<TypeMetadata>,
  "type"
>;
