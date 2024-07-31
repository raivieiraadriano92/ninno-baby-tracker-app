import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  readonly,
  text,
  writer
} from "@nozbe/watermelondb/decorators";
import {
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parseISO
} from "date-fns";

export enum GENDER {
  // eslint-disable-next-line autofix/no-unused-vars
  F = "F",
  // eslint-disable-next-line autofix/no-unused-vars
  M = "M"
}

export class BabyModel extends Model {
  static table = "babies";

  // We add createdAt and updatedAt fields to the model
  // and they will be automatically managed by WatermelonDB
  // @ts-ignore
  @readonly @date("created_at") createdAt!: Date;
  // @ts-ignore
  @readonly @date("updated_at") updatedAt!: Date;
  // we'll use this on server side. Client side watermelonDB has its own mechanism for handling deletions
  // @ts-ignore
  @date("deleted_at") deletedAt;
  // @ts-ignore
  @text("name") name!: string;
  // @ts-ignore
  @text("gender") gender!: GENDER;
  // @ts-ignore
  @text("birth_date") birthDate!: string;
  // @ts-ignore
  @text("picture_url") pictureUrl?: string;
  // @ts-ignore
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

  // @ts-ignore
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
