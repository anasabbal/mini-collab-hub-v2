import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user-service";
import { User } from "./schema/user-schema";
import { UserDto } from "./dto/user-dto";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUser();
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.getUserById(id);  // Wait for the Promise to resolve
    const userDto = new UserDto();
    return userDto.toDto(user);
  }
  @Post()
  async createUser(@Body() user: User): Promise<string> {
    return this.userService.createUser(user);
  }
  @Delete(':id')
  async deleteByOd(id: string): Promise<string> {
    if(await this.userService.deleteById(id))
      return "User deleted !";
    return "User failed";
  }
}
