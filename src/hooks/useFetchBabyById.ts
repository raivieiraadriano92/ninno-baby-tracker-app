import { useEffect } from "react";

import { database } from "src/services/database";
import { BabyModel } from "src/services/database/models/BabyModel";

type UseFetchBabyByIdProps = {
  id?: BabyModel["id"];
  onSuccess?: (_baby: BabyModel) => void;
};

export const useFetchBabyById = ({ id, onSuccess }: UseFetchBabyByIdProps) => {
  useEffect(() => {
    if (id) {
      database
        .get<BabyModel>("babies")
        .find(id)
        .then((baby) => {
          onSuccess?.(baby);
        });
    }
  }, [id, onSuccess]);
};
