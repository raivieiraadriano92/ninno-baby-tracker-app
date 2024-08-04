import { Dispatch, SetStateAction } from "react";

import { ActivityType } from "src/services/database/models/ActivityModel";
import { ActivityPayload } from "src/services/database/utils/activities";

export type ActivityFormHandlerProps = {
  payload: ActivityPayload;
  setPayload: Dispatch<SetStateAction<ActivityPayload>>;
  type: ActivityType;
};

export type ActivityFormProps = Pick<
  ActivityFormHandlerProps,
  "payload" | "setPayload"
>;
