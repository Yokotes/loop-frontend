import { model, Schema } from "mongoose";

const projectSchema = new Schema({
  title: String,
  img: {
    type: String,
    default: "img/default_project_img.jpg"
  },
  userId: String,
});

export default model("Project", projectSchema);