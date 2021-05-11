class TaskDto {
  title: string;
  group: string;
  userId: string;
  projectId: string;
  status: string;

  constructor(title: string, status: string, group: string, userId: string, projectId: string) {
    this.title = title;
    this.group = group;
    this.userId = userId;
    this.status = status;
    this.projectId = projectId;
  }
}

export default TaskDto;