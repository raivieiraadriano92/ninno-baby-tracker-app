import { Dispatch, SetStateAction } from "react";

import {
  ActivityModel,
  ActivityType
} from "src/services/database/models/ActivityModel";

export type ActivityFormHandlerProps = {
  payload: Partial<ActivityModel>;
  setPayload: Dispatch<SetStateAction<Partial<ActivityModel>>>;
  type: ActivityType;
};

export type ActivityFormProps = Pick<
  ActivityFormHandlerProps,
  "payload" | "setPayload"
>;
