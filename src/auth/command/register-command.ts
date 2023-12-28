import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    MaxLength,
  } from 'class-validator';


export class RegisterCommand {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}