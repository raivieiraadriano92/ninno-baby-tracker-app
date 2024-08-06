import { Dispatch, SetStateAction } from "react";

import { ActivityType } from "src/services/database/models/ActivityModel";
import { BabyModel } from "src/services/database/models/BabyModel";
import { ActivityPayload } from "src/services/database/utils/activities";

export type ActivityFormHandlerProps = {
  baby: BabyModel;
  payload: ActivityPayload;
  setPayload: Dispatch<SetStateAction<ActivityPayload>>;
  type: ActivityType;
};

export type ActivityFormProps = Pick<
  ActivityFormHandlerProps,
  "baby" | "payload" | "setPayload"
>;
