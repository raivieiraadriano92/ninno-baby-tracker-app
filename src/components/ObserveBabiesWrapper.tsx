import { FunctionComponent } from "react";

import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";

import { database } from "src/services/database";
import { BabyModel } from "src/services/database/models/BabyModel";

type WrapperProps = {
  babies: BabyModel[];
  children: (_props: { babies: BabyModel[] }) => JSX.Element;
};

type ObserveBabiesWrapperProps = Pick<WrapperProps, "children">;

const babiesQuery = database
  .get<BabyModel>("babies")
  .query(Q.sortBy("name", Q.asc));

const Wrapper: FunctionComponent<WrapperProps> = ({ babies, children }) =>
  children({ babies });

export const ObserveBabiesWrapper: FunctionComponent<ObserveBabiesWrapperProps> =
  withObservables([], () => ({
    babies: babiesQuery.observeWithColumns([
      "birth_date",
      "gender",
      "picture_url",
      "name"
    ])
  }))(Wrapper);
