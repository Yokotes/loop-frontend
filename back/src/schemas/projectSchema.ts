import { model, Schema } from "mongoose";

const projectSchema = new Schema({
  title: String,
  img: String,
  tasks: Array,
});

const projectModel = model("project", projectSchema);

export default projectModel;