import colors from "tailwindcss/colors";

import { ActivityType } from "src/services/database/models/ActivityModel";
import { GENDER } from "src/services/database/models/BabyModel";

export const genderColor: Record<GENDER, keyof typeof colors> = {
  [GENDER.F]: "rose",
  [GENDER.M]: "sky"
};

export const activityTypeAttributes: Record<
  ActivityType,
  { color: keyof typeof colors; emoji: string }
> = {
  [ActivityType.NURSING]: { color: "rose", emoji: "🤱" },
  [ActivityType.EXPRESSED]: { color: "rose", emoji: "🍼" },
  [ActivityType.FORMULA]: { color: "rose", emoji: "🍼" },
  [ActivityType.SUPPLEMENT]: { color: "rose", emoji: "🥣" },
  [ActivityType.DIAPER]: { color: "amber", emoji: "💩" },
  [ActivityType.SLEEP]: { color: "sky", emoji: "😴" },
  [ActivityType.GROWTH]: { color: "lime", emoji: "🌱" },
  [ActivityType.MILESTONE]: { color: "lime", emoji: "🎯" },
  [ActivityType.OTHER]: { color: "lime", emoji: "🧸" },
  [ActivityType.JOY]: { color: "lime", emoji: "😃" },
  [ActivityType.TEMPERATURE]: { color: "lime", emoji: "🌡️" },
  [ActivityType.MEDICATION]: { color: "lime", emoji: "💊" },
  [ActivityType.VACCINE]: { color: "lime", emoji: "💉" }
};
