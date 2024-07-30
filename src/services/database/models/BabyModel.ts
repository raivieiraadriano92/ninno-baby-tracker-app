import { Model } from "@nozbe/watermelondb";
import {
  date,
  field,
  readonly,
  text,
  writer
} from "@nozbe/watermelondb/decorators";

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
