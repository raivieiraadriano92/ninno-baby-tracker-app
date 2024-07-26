import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "babies",
      columns: [
        { name: "name", type: "string" },
        { name: "gender", type: "string" },
        { name: "birth_date", type: "string" },
        { name: "picture_url", type: "string", isOptional: true },
        { name: "created_at", type: "number" }, // sync field
        { name: "updated_at", type: "number" }, // sync field
        { name: "deleted_at", type: "number", isOptional: true } // sync field
      ]
    })
  ]
});
