import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  title: String,
  status: String,
  group: String,
  userId: String
});

const taskModel = model("task", taskSchema);

export default taskModel;