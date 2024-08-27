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
        { name: "is_selected", type: "boolean", isOptional: true },
        { name: "created_at", type: "number" }, // sync field
        { name: "updated_at", type: "number" }, // sync field
        { name: "deleted_at", type: "number", isOptional: true } // sync field
      ]
    }),
    tableSchema({
      name: "activities",
      columns: [
        { name: "type", type: "string", isIndexed: true },
        { name: "type_metadata", type: "string" },
        { name: "notes", type: "string", isOptional: true },
        { name: "baby_id", type: "string", isIndexed: true },
        { name: "started_at", type: "number", isIndexed: true },
        { name: "ended_at", type: "number", isOptional: true, isIndexed: true },
        { name: "picture_url", type: "string", isOptional: true },
        { name: "created_at", type: "number" }, // sync field
        { name: "updated_at", type: "number" }, // sync field
        { name: "deleted_at", type: "number", isOptional: true } // sync field
      ]
    })
  ]
});
