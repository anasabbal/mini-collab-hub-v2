import { User } from "../schema/user-schema";

export class UserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string
    
    constructor(){}

    async toDto(user: User): Promise<UserDto>{
        const userDto = new UserDto();
        userDto.id = user.id;
        userDto.firstName = user.firstName;
        userDto.lastName = user.lastName;
        userDto.email = user.email;
        userDto.password = user.password;

        return userDto;
    }
}