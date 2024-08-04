import colors from "tailwindcss/colors";

import { ActivityType } from "src/services/database/models/ActivityModel";
import { GENDER } from "src/services/database/models/BabyModel";

export const genderColor: Record<GENDER, keyof typeof colors> = {
  [GENDER.F]: "pink",
  [GENDER.M]: "sky"
};

export const activityTypeAttributes: Record<
  ActivityType,
  { color: keyof typeof colors; emoji: string; title: string }
> = {
  [ActivityType.NURSING]: { color: "rose", emoji: "🤱", title: "Nursing" },
  [ActivityType.EXPRESSED]: { color: "rose", emoji: "🍼", title: "Expressed" },
  [ActivityType.FORMULA]: { color: "rose", emoji: "🍼", title: "Formula" },
  [ActivityType.SUPPLEMENT]: {
    color: "rose",
    emoji: "🥣",
    title: "Supplement"
  },
  [ActivityType.DIAPER]: { color: "amber", emoji: "💩", title: "Diaper" },
  [ActivityType.SLEEP]: { color: "blue", emoji: "😴", title: "Sleep" },
  [ActivityType.GROWTH]: { color: "lime", emoji: "🌱", title: "Growth" },
  [ActivityType.MILESTONE]: { color: "lime", emoji: "🎯", title: "Milestone" },
  [ActivityType.OTHER]: { color: "lime", emoji: "🧸", title: "Other" },
  [ActivityType.JOY]: { color: "lime", emoji: "😃", title: "Joy" },
  [ActivityType.TEMPERATURE]: {
    color: "lime",
    emoji: "🌡️",
    title: "Temperature"
  },
  [ActivityType.MEDICATION]: {
    color: "lime",
    emoji: "💊",
    title: "Medication"
  },
  [ActivityType.VACCINE]: { color: "lime", emoji: "💉", title: "Vaccine" }
};
