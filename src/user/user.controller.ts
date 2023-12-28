import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user-service";
import { User } from "./schema/user-schema";
import { UserDto } from "./dto/user-dto";
import { Roles } from "src/decorator/roles.decorator";
import { Role } from "src/enums/role.enums";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  @Roles(Role.ADMIN)
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userService.getAllUser();
    const userDto =  new UserDto();
    const userDtoList =  userDto.toListDto(users);
    return userDtoList;
  }
  @Get(':id')
  @Roles(Role.ADMIN)
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.getUserById(id);  // Wait for the Promise to resolve
    const userDto = new UserDto();
    return userDto.toDto(user);
  }
  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteByOd(id: string): Promise<string> {
    if(await this.userService.deleteById(id))
      return "User deleted !";
    return "User failed";
  }
}
