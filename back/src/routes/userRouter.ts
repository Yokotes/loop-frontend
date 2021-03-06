import { Request, Response, Router } from "express";
import { hash, compare } from "bcrypt";
import * as expressJwt from "express-jwt";
import * as jwt from "jsonwebtoken";
import * as multer from "multer";
import { StorageEngine } from "multer";
import secret from "../secret";
import User from "../schemas/userSchema";
import UserDto from "../dtos/userDto";
import { loadImg } from "../utils/images";

const userRouter = Router();
const storage = multer.diskStorage({
  destination: "./img/users/",
  filename: function (req, file, cb) {
    const id = req.user["_id"];
    cb(null, id);
  }
});
const upload = multer({ storage });

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
  "/:id", 
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }),
  upload.fields([
    {
      name: "name"
    },
    {
      name: "password"
    },
    {
      name: "img",
    },
    {
      name: "group1"
    },
    {
      name: "group2"
    },
    {
      name: "group3"
    },
    {
      name: "group4"
    }
  ]),
  async (req: Request, res: Response) => {
    const body = req.body;

    if (req.params["id"] !== req.user["_id"]) {
      res.sendStatus(401);
      return;
    }

    const user = await User.findById(req.params["id"]);
    const password = body["password"] ? await hash(body["password"], secret.salt): user["password"];
    let img = user["img"];
    const groupAliases = [body["group1"], body["group2"], body["group3"], body["group4"]];

    if (req.files["img"]) {
      img = `img/users/${req.user["_id"]}`;
    }

    await user.updateOne({
      $set: {
        name: body["name"],
        img: img,
        groupAliases: groupAliases,
        password: password
      }
    });

    const token = jwt.sign(
      {
        username: body["name"],
        _id: user._id
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