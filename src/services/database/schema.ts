import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "babies",
      columns: [
        { name: "name", type: "string", isIndexed: true },
        { name: "gender", type: "string" },
        { name: "birthday", type: "string" },
        { name: "created_at", type: "number" }, // sync field
        { name: "updated_at", type: "number" }, // sync field
        { name: "deleted_at", type: "number", isOptional: true } // sync field
      ]
    })
  ]
});
