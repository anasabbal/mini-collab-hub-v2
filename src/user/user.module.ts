import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from "./user-service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user-schema";
import { ConfigService } from "../config/config-service";
import { MongoConfigService } from "../config/mongo-config-service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users',
      },
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
