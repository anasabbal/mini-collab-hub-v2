import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from "./user-service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schema/user-schema";
import { ConfigService } from "../config/config-service";
import { MongoConfigService } from "../config/mongo-config-service";
import { RoleGuard } from 'src/auth/guard/role-guard';

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
  providers: [UserService, RoleGuard],
  exports: [MongooseModule], // Add this line
})
export class UserModule {}
