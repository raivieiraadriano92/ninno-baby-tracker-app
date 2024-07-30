import { FunctionComponent } from "react";

import { withObservables } from "@nozbe/watermelondb/react";

import { database } from "src/services/database";
import { BabyModel } from "src/services/database/models/BabyModel";

type WrapperProps = {
  babyCount: number;
  children: (_props: { babyCount: number }) => JSX.Element;
};

type ObserveBabyCountWrapperProps = Pick<WrapperProps, "children">;

const babiesQuery = database.get<BabyModel>("babies").query();

const Wrapper: FunctionComponent<WrapperProps> = ({ babyCount, children }) =>
  children({ babyCount });

export const ObserveBabyCountWrapper: FunctionComponent<ObserveBabyCountWrapperProps> =
  withObservables([], () => ({
    babyCount: babiesQuery.observeCount()
  }))(Wrapper);
