import { Request, Response, Router } from "express";
import { hash, compare } from "bcrypt";
import * as expressJwt from "express-jwt";
import * as jwt from "jsonwebtoken";
import secret from "../secret";
import User from "../schemas/userSchema";
import UserDto from "../dtos/userDto";

const userRouter = Router();

// REST
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

  const token = await createNewUser(username, password);

  if (token) {
    res.send({ token });
    return;
  }

  res.send("Error! When creating new user!")
});

userRouter.post("/login", async (req: Request, res: Response) => {
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

  const token = await loginUser(username, password);

  if (token) {
    res.send({ token });
    return;
  }

  res.send("Error! When login user!");
});

userRouter.get(
  "/auth", 
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }), 
  async (req: Request, res: Response) => {
    const reqUser = req.user;

    const user = await User.findById(reqUser["_id"]);

    if (!user) {
      res.send("Error! When auth user");
      return;
    }

    const resUser = {
      name: user["name"],
      _id: user._id,
      img: user["img"],
      groupAliases: user["groupAliases"],
      role: user["role"]
    }

    res.send({ user: resUser });
  }
);

userRouter.put(
  "/", 
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }),
  async (req: Request, res: Response) => {
    const body = req.body;

    if (body["_id"] !== req.user["_id"]) {
      res.sendStatus(401);
      return;
    }

    const user = await User.findById(body["_id"]);
    const password = await hash(body["password"], secret.salt);

    const updatedUser = await user.updateOne({
      $set: {
        name: body["name"],
        img: body["img"],
        groupAliases: body["groupAliases"],
        password: password
      }
    });

    const token = jwt.sign(
      {
        username: updatedUser["username"],
        _id: updatedUser._id
      }, 
      secret.jwtSecret
    );

    res.send({ token });
  }
);

// Other functions
const createNewUser = async (username: string, password: string) => {
  if (username && password) {
    password = await hash(password, secret.salt);

    const user = new User({
      name: username,
      password,
    });
    
    const createdUser = await user.save();
    const token = jwt.sign(
      {
        _id: createdUser._id,
        username: createdUser["name"],
      }, 
      secret.jwtSecret
    );

    return token;
  }

  return false;
}

const loginUser = async (username: string, password: string) => {
  if (username && password) {
    const user = await User.findOne({ name: username });

    if (user) {
      const pass = await compare(password, user["password"]);

      if (!pass) return false;

      const token = jwt.sign(
        {
          _id: user._id,
          username: user["name"],
        }, 
        secret.jwtSecret
      ); 

      return token;
    }
  }

  return false;
};

export default userRouter;