import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId";
import * as Crypto from "expo-crypto";

import { migrations } from "./migrations";
import { ActivityModel } from "./models/ActivityModel";
import { BabyModel } from "./models/BabyModel";
import { schema } from "./schema";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: "ninno-baby-tracker-app",
  jsi: false /* Platform.OS === 'ios' */,
  onSetUpError: (error: any) => {
    console.log("error setting up database", error);
  }
});

export const database = new Database({
  adapter,
  modelClasses: [ActivityModel, BabyModel]
});

// We need to setup the random id generator to use UUID v4
// so the Ids are the same format as on the Supabase server
// Otherwise Postgres will complain.
setGenerator(() => Crypto.randomUUID());