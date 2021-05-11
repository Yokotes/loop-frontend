import { Router, Request, Response } from "express";
import * as expressJwt from "express-jwt";
import ProjectDto from "../dtos/projectDto";
import Project from "../schemas/projectSchema";
import secret from "../secret";
import * as fs from "fs";

const projectRouter = Router();

// REST
projectRouter.post(
  "/",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }), 
  async (req: Request, res: Response) => {
    const body = req.body;
    const reqUser = req.user;

    if (body["userId"] !== reqUser["_id"]) {
      res.sendStatus(401);
      return;
    }

    const projectDto = new ProjectDto(
      body["title"],
      null,
      reqUser["_id"],
    );

    const project = await createNewProject(projectDto, body["img"]);

    res.send(project);
  }
);

projectRouter.put(
  "/:id",
  expressJwt({ secret: secret.jwtSecret, algorithms: ['HS256'] }), 
  async (req: Request, res: Response) => {
    const body = req.body;
    const reqUser = req.user;
    
    if (body["userId"] !== reqUser["_id"]) {
      res.sendStatus(401);
      return;
    }

    const projectDto = new ProjectDto(
      body["title"],
      "",
      body["userId"]
    );

    const project = await updateProject(req.params["id"], projectDto, body["img"]);

    res.send(project);
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

    deleteImg(`../nginx/public/projects/${project._id}.png`);
    project.delete();

    res.sendStatus(200);
  }
);

// Other functions
const createNewProject = async (projectDto: ProjectDto, imgData: any) => {
  //  Add to database
  const project = new Project(projectDto);
  await project.save();

  // Save image
  if (imgData) {
    loadImg(`../nginx/public/projects/${project._id}.png`, imgData);

    await project.updateOne({
      $set: {
        img: `img/projects/${project._id}.png`
      }
    });

    return {
      _id: project["_id"],
      title: project["title"],
      img: `img/projects/${project._id}.png`,
    };
  }

  return {
    _id: project["_id"],
    title: project["title"],
    img: project["img"],
  };
}

const updateProject = async (id: string, projectDto: ProjectDto, imgData: any) => {
  const project = await Project.findById(id);

  if (imgData) {
    loadImg(`../nginx/public/projects/${project._id}.png`, imgData);
  }

  await project.updateOne({
    $set: {
      title: projectDto.title,
      img: `img/projects/${project._id}.png`
    }
  });

  return {
    _id: project["_id"],
    title: projectDto.title,
    img: `img/projects/${project._id}.png`,
  };
}

const loadImg = (path: string, data: any) => {
  fs.open(path, "w", (err, file) =>  {
    if (err) throw err;
    fs.writeSync(file, data);
  });
}

const deleteImg = (path: string) => {
  fs.unlinkSync(path);
}

export default projectRouter;