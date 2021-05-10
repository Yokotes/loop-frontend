class UserDto {
  name: string;
  password: string;
  img: string;
  role: string;
  groupAliases: string[];

  constructor(
    name: string,
    password: string,
    img: string,
    role: string,
    groupAliases: string[]
  ) 
  {
    this.name = name;
    this.password = password;
    this.img = img;
    this.role = role;
    this.groupAliases = groupAliases;
  }
}

export default UserDto;