import { ConflictException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user-schema";
import { Model } from "mongoose";
import { RegisterCommand } from "src/auth/command/register-command";


@Injectable()
export class UserService {
  
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userModel.find({ isDeleted: false }).exec();
  }
  async findUserByEmail(email :string): Promise<User> {
    const user = await this.userModel.findOne({email: email})
    this.logger.log(`User with email ${user.email} fetched successfully !`);
    return (await this.userModel.findOne({ email: email })) || null;
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    this.logger.log(`User with id ${user.id} fetched successfully !`)
    if(!user)
      throw new NotFoundException(`User with id ${id} not found !`);
    return user;
  }
  async createUser(user: RegisterCommand) {
    try {
      if(!await this.userModel.findOne({email: user.email})){
        const newUser = new this.userModel(user);
        this.logger.log(`User with payload ${newUser} created successfully !`)
        await newUser.save();
        return {
          statusCode: 200,
          message: 'Register Successfull',
        };
      }
    } catch(error){
      throw new HttpException('User already registered', HttpStatus.FOUND);
    }
  }
  async deleteById(id: string): Promise<boolean> {
    const user = await this.getUserById(id);
    return user.deleted = true;
  }
}