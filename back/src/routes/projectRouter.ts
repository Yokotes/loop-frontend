import { Router, Request, Response } from "express";
import * as expressJwt from "express-jwt";
import ProjectDto from "../dtos/projectDto";
import Project from "../schemas/projectSchema";
import secret from "../secret";
import * as fs from "fs";
import * as multer from "multer";
import { deleteImg, loadImg } from "../utils/images";

const projectRouter = Router();
const storagePost = multer.diskStorage({
  destination: "../front/public/img/projects/",
  filename: function (req, file, cb) {
    cb(null, "temp_name");
  }
});
const uploadPost = multer({ storage: storagePost });

const storagePut = multer.diskStorage({
  destination: "../front/public/img/projects/",
  filename: function (req, file, cb) {
    cb(null, req.params["id"]);
  }
});
const uploadPut = multer({ storage: storagePut });

// REST
projectRouter.post(
  "/",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }),
  uploadPost.single("img"),
  async (req: Request, res: Response) => {
    const body = req.body;
    const reqUser = req.user;

    if (body["userId"] !== reqUser["_id"]) {
      res.sendStatus(401);
      return;
    }

    const projectDto = new ProjectDto(
      body["title"],
      body["img"] ?? null,
      reqUser["_id"],
    );

    const project = await createNewProject(projectDto);

    res.send(project);
  }
);

projectRouter.put(
  "/:id",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }),
  uploadPut.single("img"),
  async (req: Request, res: Response) => {
    const body = req.body;
    const reqUser = req.user;
    
    if (body["userId"] !== reqUser["_id"]) {
      res.sendStatus(401);
      return;
    }

    const projectDto = new ProjectDto(
      body["title"],
      body["img"],
      body["userId"]
    );

    await updateProject(req.params["id"], projectDto);

    res.sendStatus(200);
  }
);

projectRouter.delete(
  "/:id",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }), 
  async (req: Request, res: Response) => {
    const reqUser = req.user;
    const project = await Project.findById(req.params["id"]);
  
    if (project["userId"] !== reqUser["_id"]) {
      res.sendStatus(401);
      return;
    }

    deleteImg(`projects/${project._id}`);
    project.delete();

    res.sendStatus(200);
  }
);

projectRouter.get(
  "/user/:id",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }),
  async (req: Request, res: Response) => {
    const reqUser = req.user;
    
    if (reqUser["_id"] !== req.params["id"]) {
      res.sendStatus(401);
      return;
    }

    const projects = await Project.find({ userId: reqUser["_id"] }).exec();
    const projectsArr = projects.map((item) => ({
      title: item["title"],
      id: item["_id"],
      img: item["img"]
    }));

    res.send({ projects: projectsArr });
  }
)

// Other functions
const createNewProject = async (projectDto: ProjectDto) => {
  
  //  Add to database
  const project = new Project(projectDto);
  await project.save();

  // Save image
  if (!projectDto.img) {
    await project.updateOne({
      $set: {
        img: `img/projects/${project._id}`
      }
    });

    fs.renameSync("../front/public/img/projects/temp_name", `../front/public/img/projects/${project._id}`);

    return {
      id: project["_id"],
      title: project["title"],
      img: `img/projects/${project._id}`,
    };
  }

  return {
    id: project["_id"],
    title: project["title"],
    img: project["img"],
  };
}

const updateProject = async (id: string, projectDto: ProjectDto) => {
  const project = await Project.findById(id);

  await project.updateOne({
    $set: {
      title: projectDto.title,
      img: projectDto.img ?? `img/projects/${project._id}`
    }
  });

  return {
    _id: project["_id"],
    title: projectDto.title,
    img: projectDto.img ?? `img/projects/${project._id}`,
  };
}

export default projectRouter;