import { Model } from "@nozbe/watermelondb";
import { date, readonly, text } from "@nozbe/watermelondb/decorators";

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
  @text("name") name: string;
  // @ts-ignore
  @text("gender") gender: "F" | "M";
  // @ts-ignore
  @text("birthday") birthday: string;
}