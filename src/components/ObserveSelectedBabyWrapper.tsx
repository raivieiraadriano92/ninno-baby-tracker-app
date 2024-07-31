import { FunctionComponent } from "react";

import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";

import { database } from "src/services/database";
import { BabyModel } from "src/services/database/models/BabyModel";

type WrapperProps = {
  babies: BabyModel[];
  children: (_props: { selectedBaby: BabyModel }) => JSX.Element;
};

type ObserveSelectedBabyWrapperProps = Pick<WrapperProps, "children">;

const babiesQuery = database
  .get<BabyModel>("babies")
  .query(Q.where("is_selected", Q.eq(true)));

const Wrapper: FunctionComponent<WrapperProps> = ({ babies, children }) =>
  children({ selectedBaby: babies[0] });

export const ObserveSelectedBabyWrapper: FunctionComponent<ObserveSelectedBabyWrapperProps> =
  withObservables([], () => ({
    babies: babiesQuery.observeWithColumns([
      "birth_date",
      "gender",
      "picture_url",
      "name",
      "is_selected"
    ])
  }))(Wrapper);
