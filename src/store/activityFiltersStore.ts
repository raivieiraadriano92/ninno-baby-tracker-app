import { create } from "zustand";

import { ActivityTypeGroup } from "src/services/database/models/ActivityModel";

export enum ActivityFiltersPeriod {
  ALL = "All",
  WEEKLY = "Weekly",
  MONTHLY = "Monthly",
  SEVEN_DAY = "7-day",
  THIRTY_DAY = "30-day"
}

type ActivityFiltersStoreState = {
  activityTypeGroup: "All" | ActivityTypeGroup;
  period: ActivityFiltersPeriod;
  setActivityTypeGroup: (_activityTypeGroup: "All" | ActivityTypeGroup) => void;
  setPeriod: (_period: ActivityFiltersPeriod) => void;
};

export const useActivityFiltersStore = create<ActivityFiltersStoreState>()(
  (set) => ({
    activityTypeGroup: "All",
    period: ActivityFiltersPeriod.WEEKLY,
    setActivityTypeGroup: (activityTypeGroup) =>
      set((state) => ({ ...state, activityTypeGroup })),
    setPeriod: (period) => set((state) => ({ ...state, period }))
  })
);
