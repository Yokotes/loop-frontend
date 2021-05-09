import { connect } from "mongoose";
import { MongoClient } from "mongodb";
import secret from "../secret.js";

const mongodb = new MongoClient(
  secret.mongoLink,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

export default mongodb;