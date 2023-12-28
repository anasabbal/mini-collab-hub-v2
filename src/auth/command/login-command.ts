import { 
    IsEmail, 
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength
} from "class-validator";

export class LoginCommand {

    
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}