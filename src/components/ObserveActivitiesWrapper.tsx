import { FunctionComponent } from "react";

import { Q } from "@nozbe/watermelondb";
import { withObservables } from "@nozbe/watermelondb/react";

import { database } from "src/services/database";
import { ActivityModel } from "src/services/database/models/ActivityModel";

type WrapperProps = {
  activities: ActivityModel[];
  children: (_props: { activities: ActivityModel[] }) => JSX.Element;
};

type ObserveActivitiesWrapperProps = Pick<WrapperProps, "children">;

const activitiesQuery = database
  .get<ActivityModel>("activities")
  .query(Q.sortBy("started_at", Q.desc));

const Wrapper: FunctionComponent<WrapperProps> = ({ activities, children }) =>
  children({ activities });

export const ObserveActivitiesWrapper: FunctionComponent<ObserveActivitiesWrapperProps> =
  withObservables([], () => ({
    activities: activitiesQuery.observeWithColumns([
      "type",
      "type_metadata",
      "started_at",
      "ended_at",
      "notes"
    ])
  }))(Wrapper);
