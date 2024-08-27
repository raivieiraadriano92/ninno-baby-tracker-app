import colors from "tailwindcss/colors";

import {
  ActivityType,
  DiaperStatus,
  DiaperTypeMetadata,
  ExpressedTypeMetadata,
  FormulaTypeMetadata,
  GrowthTypeMetadata,
  NursingSide,
  NursingTypeMetadata,
  SupplementTypeMetadata
} from "src/services/database/models/ActivityModel";
import { GENDER } from "src/services/database/models/BabyModel";
import { initialSupplementList } from "src/store/supplementStore";

export const genderColor: Record<GENDER, keyof typeof colors> = {
  [GENDER.F]: "pink",
  [GENDER.M]: "sky"
};

const initialDiaperTypeMetadata: DiaperTypeMetadata = {
  status: DiaperStatus.WET
};

const initialExpressedTypeMetadata: ExpressedTypeMetadata = {
  amount: 0,
  unit: "ml"
};

const initialFormulaTypeMetadata: FormulaTypeMetadata = {
  amount: 0,
  unit: "ml"
};

const initialSupplementTypeMetadata: SupplementTypeMetadata = {
  amount: 0,
  unit: "g",
  supplement: initialSupplementList[0]
};

const initialNursingTypeMetadata: NursingTypeMetadata = {
  duration: {
    left: 0,
    right: 0
  },
  startSide: NursingSide.LEFT
};

const initialGrowthTypeMetadata: GrowthTypeMetadata = {
  head: {
    unit: "cm",
    value: 0
  },
  height: {
    unit: "cm",
    value: 0
  },
  weight: {
    unit: "kg",
    value: 0
  }
};

export const activityTypeAttributes: Record<
  ActivityType,
  {
    color: keyof typeof colors;
    emoji: string;
    initialTypeMetadata: object; // @todo enforce the correct type here
    title: string;
  }
> = {
  [ActivityType.NURSING]: {
    color: "rose",
    emoji: "🤱",
    initialTypeMetadata: initialNursingTypeMetadata,
    title: "Nursing"
  },
  [ActivityType.EXPRESSED]: {
    color: "rose",
    emoji: "🍼",
    initialTypeMetadata: initialExpressedTypeMetadata,
    title: "Expressed"
  },
  [ActivityType.FORMULA]: {
    color: "rose",
    emoji: "🍼",
    initialTypeMetadata: initialFormulaTypeMetadata,
    title: "Formula"
  },
  [ActivityType.SUPPLEMENT]: {
    color: "rose",
    emoji: "🥣",
    initialTypeMetadata: initialSupplementTypeMetadata,
    title: "Supplement"
  },
  [ActivityType.DIAPER]: {
    color: "amber",
    emoji: "💩",
    initialTypeMetadata: initialDiaperTypeMetadata,
    title: "Diaper"
  },
  [ActivityType.SLEEP]: {
    color: "blue",
    emoji: "😴",
    initialTypeMetadata: {},
    title: "Sleep"
  },
  [ActivityType.GROWTH]: {
    color: "lime",
    emoji: "🌱",
    initialTypeMetadata: initialGrowthTypeMetadata,
    title: "Growth"
  },
  [ActivityType.MILESTONE]: {
    color: "lime",
    emoji: "🎯",
    initialTypeMetadata: {},
    title: "Milestone"
  },
  [ActivityType.OTHER]: {
    color: "lime",
    emoji: "🧸",
    initialTypeMetadata: {},
    title: "Other"
  },
  [ActivityType.JOY]: {
    color: "lime",
    emoji: "😃",
    initialTypeMetadata: {},
    title: "Joy"
  },
  [ActivityType.TEMPERATURE]: {
    color: "lime",
    emoji: "🌡️",
    initialTypeMetadata: {},
    title: "Temperature"
  },
  [ActivityType.MEDICATION]: {
    color: "lime",
    emoji: "💊",
    initialTypeMetadata: {},
    title: "Medication"
  },
  [ActivityType.VACCINE]: {
    color: "lime",
    emoji: "💉",
    initialTypeMetadata: {},
    title: "Vaccine"
  }
};

export const diaperStatusAttributes: Record<DiaperStatus, { title: string }> = {
  [DiaperStatus.WET]: { title: "Wet" },
  [DiaperStatus.DIRTY]: { title: "Dirty" },
  [DiaperStatus.MIXED]: { title: "Mixed" },
  [DiaperStatus.DRY]: { title: "Dry" }
};
