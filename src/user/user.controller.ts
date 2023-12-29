import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user-service";
import { UserDto } from "./dto/user-dto";
import { AuthGuard } from "src/auth/guard/auth-guard";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userService.getAllUser();
    const userDto =  new UserDto();
    const userDtoList =  userDto.toListDto(users);
    return userDtoList;
  }
  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.getUserById(id);  // Wait for the Promise to resolve
    const userDto = new UserDto();
    return userDto.toDto(user);
  }
  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteByOd(id: string): Promise<string> {
    if(await this.userService.deleteById(id))
      return "User deleted !";
    return "User failed";
  }
}
