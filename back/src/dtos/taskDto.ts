class TaskDto {
  title: string;
  group: string;
  userId: string;
  status: string;

  constructor(title: string, status: string, group: string, userId: string) {
    this.title = title;
    this.group = group;
    this.userId = userId;
    this.status = status;
  }
}

export default TaskDto;