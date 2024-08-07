import { Dispatch, SetStateAction } from "react";

import { ActivityType } from "src/services/database/models/ActivityModel";
import { BabyModel } from "src/services/database/models/BabyModel";
import { ActivityPayload } from "src/services/database/utils/activities";

export type ActivityFormHandlerProps<TypeMetadata = unknown> = {
  baby: BabyModel;
  payload: ActivityPayload<TypeMetadata>;
  setPayload: Dispatch<SetStateAction<ActivityPayload<TypeMetadata>>>;
  type: ActivityType;
};

export type ActivityFormProps<TypeMetadata = unknown> = Pick<
  ActivityFormHandlerProps<TypeMetadata>,
  "baby" | "payload" | "setPayload" | "type"
>;
