import { Request, Response, Router } from "express";
import * as expressJwt from "express-jwt";
import secret from "../secret";
import TaskDto from "../dtos/taskDto";
import Task from "../schemas/taskSchema";

const taskRouter = Router();

// REST
taskRouter.post(
  "/",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }), 
  async (req: Request, res: Response) => {
    const body = req.body;
    const reqUser = req.user;

    if (body["userId"] !== reqUser["_id"]) {
      res.sendStatus(401);
      return;
    }

    const taskDto = new TaskDto(
      body["title"],
      "1",
      body["group"],
      body["userId"],
      body["projectId"]
    );

    const isCreated = await createNewTask(taskDto);

    if (isCreated) {
      res.send({ task: taskDto });
      return;
    }

    res.send("Error! When creating new task");
  }
);

taskRouter.get(
  "/:projectId",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }),
  async (req: Request, res: Response) => {
    const projectId = req.params["projectId"];
    const user = req.user;

    const rawTasks = await Task.find({ userId: user["_id"], projectId }).exec();
    const tasks = rawTasks.map((task) => ({
      title: task["title"],
      status: task["status"],
      group: task["group"],
    }));

    res.send({ tasks });
  }
)

taskRouter.put(
  "/:id",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }),
  async (req: Request, res: Response) => {
    const user = req.user;
    const body = req.body;

    if (body["userId"] !== user["_id"]) {
      res.sendStatus(401);
      return;
    }

    const task = await Task.updateOne(
      { _id: req.params["id"], userId: body["userId"] },
      {
        $set: {
          title: body["title"],
          status: body["status"],
        }
      }
    );

    res.send({
      title: body["title"],
      status: body["status"]
    });
  }
);

taskRouter.delete(
  "/:id",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }),
  async (req: Request, res: Response) => {
    const user = req.user;
    
    const task = await Task.findOne({ _id: req.params["id"] });

    if (task["userId"] !== user["_id"]) {
      res.sendStatus(401);
      return;
    }

    await task.delete();

    res.sendStatus(200);
  }
)

// Other functions
const createNewTask = async (taskDto: TaskDto) => {
  const task = new Task(taskDto);
  const createdTask = await task.save();

  if (createdTask) return true;

  return false;
}

export default taskRouter;