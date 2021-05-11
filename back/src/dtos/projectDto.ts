class ProjectDto {
  title: string;
  img: string;
  userId: string;

  constructor(title: string, img: string, userId) {
    this.title = title;
    this.img = img;
    this.userId = userId;
  }
}

export default ProjectDto;