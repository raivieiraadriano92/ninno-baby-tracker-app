import { Model, Relation } from "@nozbe/watermelondb";
import {
  date,
  json,
  readonly,
  relation,
  text
} from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";

import { BabyModel } from "./BabyModel";

export enum ActivityType {
  NURSING = "nursing",
  EXPRESSED = "expressed",
  FORMULA = "formula",
  SUPPLEMENT = "supplement",
  DIAPER = "diaper",
  SLEEP = "sleep",
  GROWTH = "growth",
  MILESTONE = "milestone",
  OTHER = "other",
  JOY = "joy",
  TEMPERATURE = "temperature",
  MEDICATION = "medication",
  VACCINE = "vaccine"
}

export enum DiaperStatus {
  WET = "wet",
  DIRTY = "dirty",
  MIXED = "mixed",
  DRY = "dry"
}

export enum NursingSide {
  LEFT = "left",
  RIGHT = "right"
}

export enum WeightUnit {
  LBS = "lbs.",
  KG = "kg"
}

export enum LengthUnit {
  INCH = "inch",
  CM = "cm"
}

export type DiaperTypeMetadata = {
  status: DiaperStatus;
};

export type ExpressedTypeMetadata = {
  amount: number;
  unit: "ml";
};

export type FormulaTypeMetadata = {
  amount: number;
  unit: "ml";
};

export type SupplementTypeMetadata = {
  amount: number;
  unit: string;
  supplement: string;
};

export type NursingTypeMetadata = {
  duration: {
    left: number;
    right: number;
  };
  startSide: NursingSide;
};

export type GrowthTypeMetadata = {
  height: {
    value: number;
    unit: LengthUnit;
  };
  weight: {
    value: number;
    unit: WeightUnit;
  };
  head: {
    value: number;
    unit: LengthUnit;
  };
};

export type MilestoneTypeMetadata = {
  milestone: string;
};

export class ActivityModel extends Model {
  static table = "activities";

  static associations: Associations = {
    baby: { type: "belongs_to", key: "baby_id" }
  };

  @relation("baby", "baby_id") baby!: Relation<BabyModel>;

  // We add createdAt and updatedAt fields to the model and they will be automatically managed by WatermelonDB
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
  @readonly @date("deleted_at") deletedAt?: Date; // We'll use this on server side. Client side watermelonDB has its own mechanism for handling deletions

  @text("type") type!: ActivityType;
  @json("type_metadata", (json) => json) typeMetadata!: unknown;
  @date("started_at") startedAt!: Date;
  @date("ended_at") endedAt?: Date;
  @text("notes") notes?: string;
  @text("picture_url") pictureUrl?: string;
}
