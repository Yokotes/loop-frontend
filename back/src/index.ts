import { json, urlencoded } from "body-parser";
import * as express from "express";
import { Application, Request, Response } from "express";
import { connect } from "mongoose";
import * as cors from "cors";
import router from "./routes/router";
import secret from "./secret";

const app: Application = express();

// Plug routes and body parser
// app.use(bodyParser.json());
// app.use(express.json());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1', router);

app.get("/", (req: Request, res: Response) => {
  res.send('Get it');
});

// Start server
app.listen(5000, async () => {
  console.log("Backend server is running!");

  await connect(
    secret.mongoLink, 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
});