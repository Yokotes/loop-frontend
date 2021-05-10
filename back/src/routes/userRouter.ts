import { Request, Response, Router } from "express";
import { hash } from "bcrypt";
import secret from "../secret";
import User from "../schemas/userSchema";

const userRouter = Router();

userRouter.post("/", async (req: Request, res: Response) => {
  if (!req.body) {
    res.sendStatus(400);
  }

  const body: Object = req.body;
  let username: string;
  let password: string;

  if (body.hasOwnProperty("username")) {
    username = body["username"];
  }

  if (body.hasOwnProperty("password")) {
    password = body["password"];
  }

  const status = await createNewUser(username, password);

  if (status) {
    res.send("User has been created!");
    return;
  }

  res.send("Error! When creating new user!")

});

const createNewUser = async (username: string, password: string) => {
  if (username && password) {
    password = await hash(password, secret.salt);

    const user = new User({
      name: username,
      password,
    });

    await user.save();

    return true;
  }

  return false;
}

export default userRouter;