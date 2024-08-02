import { Model } from "@nozbe/watermelondb";
import { date, json, readonly, text } from "@nozbe/watermelondb/decorators";

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

export class ActivityModel extends Model {
  static table = "activities";
  static associations = {
    baby: { type: "belongs_to", key: "baby_id" }
  };

  // We add createdAt and updatedAt fields to the model and they will be automatically managed by WatermelonDB
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
  @readonly @date("deleted_at") deletedAt?: Date; // We'll use this on server side. Client side watermelonDB has its own mechanism for handling deletions

  @text("type") type!: ActivityType;
  @json("type_metadata", (json) => json) typeMetadata?: Record<string, any>;
  @text("notes") notes?: string;
}
