import { database } from "..";
import { ActivityModel } from "../models/ActivityModel";
import { BabyModel } from "../models/BabyModel";

export type ActivityPayload = Pick<
  ActivityModel,
  "type" | "typeMetadata" | "startedAt" | "endedAt" | "notes"
>;

export const createActivity = (
  baby: BabyModel,
  payload: ActivityPayload,
  onSuccess?: (_activity: ActivityModel) => void,
  onError?: (_error: any) => void
) =>
  database.write(() =>
    database
      .get<ActivityModel>("activities")
      .create((activity) => {
        activity.baby.set(baby);

        activity.type = payload.type;

        activity.typeMetadata = payload.typeMetadata;

        activity.startedAt = payload.startedAt;

        if (payload.endedAt) {
          activity.endedAt = payload.endedAt;
        }

        activity.notes = payload.notes;
      })
      .then(onSuccess)
      .catch(onError)
  );