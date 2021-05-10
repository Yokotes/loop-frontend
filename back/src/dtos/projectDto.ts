class ProjectDto {
  title: string;
  img: string;
  tasks: string[];

  constructor(title: string, img: string, tasks: string[]) {
    this.title = title;
    this.img = img;
    this.tasks = tasks;
  }
}

export default ProjectDto;