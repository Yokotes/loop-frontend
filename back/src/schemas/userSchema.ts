import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user"
  },
  img: {
    type: String,
    default: "img/default_avatar.jpg"
  },
  groupAliases: {
    type: Array,
    default: []
  },
});

export default model("User", userSchema);