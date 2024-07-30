import { database } from "..";
import { BabyModel } from "../models/BabyModel";

type Payload = Pick<BabyModel, "name" | "gender" | "birthDate" | "pictureUrl">;

export const createBaby = (
  payload: Payload,
  onSuccess?: (_baby: BabyModel) => void,
  onError?: (_error: any) => void
) =>
  database.write(() =>
    database
      .get<BabyModel>("babies")
      .create((baby) => {
        baby.name = payload.name;

        baby.gender = payload.gender;

        baby.birthDate = payload.birthDate;

        baby.pictureUrl = payload.pictureUrl;
      })
      .then((baby) => {
        if (onSuccess) {
          onSuccess(baby);
        }

        baby.markAsSelected();
      })
      .catch(onError)
  );

export const updateBaby = (
  baby: BabyModel,
  payload: Payload,
  onSuccess?: (_baby: BabyModel) => void,
  onError?: (_error: any) => void
) =>
  database.write(() =>
    baby
      .update((baby) => {
        baby.name = payload.name;

        baby.gender = payload.gender;

        baby.birthDate = payload.birthDate;

        baby.pictureUrl = payload.pictureUrl;
      })
      .then(onSuccess)
      .catch(onError)
  );
