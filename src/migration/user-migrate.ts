import { ConflictException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UserEntity } from "src/user/schema/user-entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from "src/user/dto/user-dto";




@Injectable()
export class UserMigrate {
    constructor(
        @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>
    ){}

}