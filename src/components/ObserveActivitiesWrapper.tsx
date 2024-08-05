import { FunctionComponent } from "react";

import { Query } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";

import { ActivityModel } from "src/services/database/models/ActivityModel";

type WrapperProps = {
  activities: ActivityModel[];
  children: (_props: { activities: ActivityModel[] }) => JSX.Element;
};

type ObserveActivitiesWrapperProps = Pick<WrapperProps, "children"> & {
  activitiesQuery: Query<ActivityModel>;
};

const Wrapper: FunctionComponent<WrapperProps> = ({ activities, children }) =>
  children({ activities });

export const ObserveActivitiesWrapper: FunctionComponent<ObserveActivitiesWrapperProps> =
  withObservables(["activitiesQuery"], ({ activitiesQuery }) => ({
    activities: activitiesQuery.observeWithColumns([
      "type",
      "type_metadata",
      "started_at",
      "ended_at",
      "notes"
    ])
  }))(Wrapper);
