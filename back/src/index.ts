import * as express from "express";
import { Application, Request, Response } from "express";
import mongodb from "./mongodb/mongoDB";
import router from "./routes/router";

const app: Application = express();

// Plug routes
app.use('/api/v1', router);

// Connect to database
mongodb.connect((err) => {
  console.log('Connected!');
});

// Start server
app.listen(5000, () => {
  console.log("Backend server is running!")
});