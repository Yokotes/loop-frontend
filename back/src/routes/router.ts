import { Request, Response, Router } from "express";
import projectRouter from "./projectRouter";
import taskRouter from "./taskRouter";
import userRouter from "./userRouter";

const router = Router();

router.get('/test', (req: Request, res: Response) => {
  res.send("Router is working fine!");
});

router.use('/user', userRouter);
router.use('/task', taskRouter);
router.use('/project', projectRouter);

export default router;