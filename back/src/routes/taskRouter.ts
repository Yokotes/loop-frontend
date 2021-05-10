import { Request, Response, Router } from "express";
import taskModel from "../schemas/taskSchema";

const taskRouter = Router();

taskRouter.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("Requested!");
});

export default taskRouter;