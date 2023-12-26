import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user-schema";
import { Model } from "mongoose";
import { UserDto } from "./dto/user-dto";


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userModel.find({ deleted: false }).exec();
  }
  async findUserByEmail(email :string): Promise<User> {
    return (await this.userModel.findOne({ email: email })) || null;
  }
  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    console.log(user);
    if(!user)
      throw new NotFoundException(`Uer with id ${id} not found !`);
    return user;
  }
  async createUser(user: User): Promise<string> {
    try {
      if(!await this.userModel.findOne({email: user.email})){
        const newUser = new this.userModel(user);
        await newUser.save();
        return "User created successfully !";
      }
      return "User Already exist";
    } catch(error){
      if(error.code === 11000)
        throw new ConflictException("User with this username or email already exists");
    }
  }
  async deleteById(id: string): Promise<boolean> {
    const user = await this.getUserById(id);
    return user.deleted = true;
  }
}