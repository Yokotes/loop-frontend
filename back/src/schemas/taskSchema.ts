import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  title: String,
  status: String,
  group: String,
  userId: String,
  projectId: String,
});

export default model("Task", taskSchema);