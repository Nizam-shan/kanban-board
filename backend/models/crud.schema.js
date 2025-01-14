import { Schema, model } from "mongoose";

const CrudSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    descriptions: { type: String, required: true, default: "" },
    status: { type: String, default: "pending" },
    assignee: { type: String, required: true },
    due_date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model("Crud", CrudSchema);
