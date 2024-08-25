import { Model, Q, Query } from "@nozbe/watermelondb";
import {
  children,
  date,
  field,
  lazy,
  readonly,
  text,
  writer
} from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  endOfToday,
  parseISO,
  startOfToday
} from "date-fns";

import { ActivityModel, ActivityType } from "./ActivityModel";

export enum GENDER {
  F = "F",
  M = "M"
}

export class BabyModel extends Model {
  static table = "babies";

  static associations: Associations = {
    activities: { type: "has_many", foreignKey: "baby_id" }
  };

  @children("activities") activities!: Query<ActivityModel>;

  @lazy allActivities = this.activities.extend(Q.sortBy("started_at", Q.desc));

  @lazy todaysActivities = this.activities.extend(
    Q.where(
      "started_at",
      Q.between(startOfToday().getTime(), endOfToday().getTime())
    ),
    Q.sortBy("started_at", Q.desc)
  );

  @lazy unfinishedSleepActivities = this.activities.extend(
    Q.where("ended_at", null),
    Q.and(Q.where("type", ActivityType.SLEEP)),
    Q.sortBy("started_at", Q.desc)
  );

  @lazy lastNursingActivity = this.activities.extend(
    Q.and(Q.where("type", ActivityType.NURSING)),
    Q.sortBy("started_at", Q.desc),
    Q.take(1)
  );

  // We add createdAt and updatedAt fields to the model and they will be automatically managed by WatermelonDB
  @readonly @date("created_at") createdAt!: Date;
  @readonly @date("updated_at") updatedAt!: Date;
  @readonly @date("deleted_at") deletedAt?: Date; // We'll use this on server side. Client side watermelonDB has its own mechanism for handling deletions

  @text("name") name!: string;
  @text("gender") gender!: GENDER;
  @text("birth_date") birthDate!: string;
  @text("picture_url") pictureUrl?: string;
  @field("is_selected") isSelected?: boolean;

  get formattedBirthDate() {
    const birthdayDate = parseISO(this.birthDate);

    const days = differenceInDays(new Date(), birthdayDate);

    const months = differenceInMonths(new Date(), birthdayDate);

    const years = differenceInYears(new Date(), birthdayDate);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}${months > years * 12 ? ` and ${months - years * 12} month${months - years * 12 > 1 ? "s" : ""}` : ""}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""}`;
    }

    return `${days} day${days > 1 ? "s" : ""}`;
  }

  @writer async markAsSelected() {
    await this.update((baby) => {
      baby.isSelected = true;
    });

    (await this.collection.query()).forEach((baby) => {
      if (baby.id !== this.id) {
        baby.update((_baby) => {
          // @ts-ignore
          _baby.isSelected = false;
        });
      }
    });
  }
}
