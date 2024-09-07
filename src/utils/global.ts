import colors from "tailwindcss/colors";

import {
  ActivityType,
  ActivityTypeGroup,
  DiaperStatus,
  DiaperTypeMetadata,
  ExpressedTypeMetadata,
  FormulaTypeMetadata,
  GrowthTypeMetadata,
  LengthUnit,
  NursingSide,
  NursingTypeMetadata,
  SupplementTypeMetadata,
  WeightUnit
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
    unit: LengthUnit.CM,
    value: 0
  },
  height: {
    unit: LengthUnit.CM,
    value: 0
  },
  weight: {
    unit: WeightUnit.KG,
    value: 0
  }
};

export const activityTypeGroupAttributes: Record<
  ActivityTypeGroup,
  {
    color: keyof typeof colors;
    emoji: string;
    title: string;
  }
> = {
  [ActivityTypeGroup.FEEDING]: {
    color: "rose",
    emoji: "🍼",
    title: "Feeding"
  },
  [ActivityTypeGroup.DIAPER]: {
    color: "amber",
    emoji: "💩",
    title: "Diaper"
  },
  [ActivityTypeGroup.SLEEP]: {
    color: "blue",
    emoji: "😴",
    title: "Sleep"
  },
  [ActivityTypeGroup.GROWTH]: {
    color: "lime",
    emoji: "🌱",
    title: "Growth"
  },
  [ActivityTypeGroup.OTHER]: {
    color: "purple",
    emoji: "🧸",
    title: "Other"
  }
};

export const activityTypeAttributes: Record<
  ActivityType,
  {
    group: ActivityTypeGroup;
    color: keyof typeof colors;
    commingSoon?: boolean;
    emoji: string;
    initialTypeMetadata: object; // @todo enforce the correct type here
    title: string;
  }
> = {
  [ActivityType.NURSING]: {
    color: "rose",
    emoji: "🤱",
    initialTypeMetadata: initialNursingTypeMetadata,
    group: ActivityTypeGroup.FEEDING,
    title: "Nursing"
  },
  [ActivityType.EXPRESSED]: {
    color: "rose",
    emoji: "🍼",
    initialTypeMetadata: initialExpressedTypeMetadata,
    group: ActivityTypeGroup.FEEDING,
    title: "Expressed"
  },
  [ActivityType.FORMULA]: {
    color: "rose",
    emoji: "🍼",
    initialTypeMetadata: initialFormulaTypeMetadata,
    group: ActivityTypeGroup.FEEDING,
    title: "Formula"
  },
  [ActivityType.SUPPLEMENT]: {
    color: "rose",
    emoji: "🥣",
    initialTypeMetadata: initialSupplementTypeMetadata,
    group: ActivityTypeGroup.FEEDING,
    title: "Supplement"
  },
  [ActivityType.DIAPER]: {
    color: "amber",
    emoji: "💩",
    initialTypeMetadata: initialDiaperTypeMetadata,
    group: ActivityTypeGroup.DIAPER,
    title: "Diaper"
  },
  [ActivityType.SLEEP]: {
    color: "blue",
    emoji: "😴",
    initialTypeMetadata: {},
    group: ActivityTypeGroup.SLEEP,
    title: "Sleep"
  },
  [ActivityType.GROWTH]: {
    color: "lime",
    emoji: "🌱",
    initialTypeMetadata: initialGrowthTypeMetadata,
    group: ActivityTypeGroup.GROWTH,
    title: "Growth"
  },
  [ActivityType.MILESTONE]: {
    color: "purple",
    emoji: "🎯",
    initialTypeMetadata: {},
    group: ActivityTypeGroup.OTHER,
    title: "Milestone"
  },
  [ActivityType.OTHER]: {
    color: "purple",
    commingSoon: true,
    emoji: "🧸",
    group: ActivityTypeGroup.OTHER,
    initialTypeMetadata: {},
    title: "Other"
  },
  [ActivityType.JOY]: {
    color: "purple",
    commingSoon: true,
    emoji: "😃",
    group: ActivityTypeGroup.OTHER,
    initialTypeMetadata: {},
    title: "Joy"
  },
  [ActivityType.TEMPERATURE]: {
    color: "purple",
    commingSoon: true,
    emoji: "🌡️",
    group: ActivityTypeGroup.OTHER,
    initialTypeMetadata: {},
    title: "Temperature"
  },
  [ActivityType.MEDICATION]: {
    color: "purple",
    commingSoon: true,
    emoji: "💊",
    group: ActivityTypeGroup.OTHER,
    initialTypeMetadata: {},
    title: "Medication"
  },
  [ActivityType.VACCINE]: {
    color: "purple",
    commingSoon: true,
    emoji: "💉",
    group: ActivityTypeGroup.OTHER,
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
