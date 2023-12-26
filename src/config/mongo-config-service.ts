import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

export class MongoConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: "mongodb+srv://anasabbal13:mongodb@cluster0.4ksooyd.mongodb.net/?retryWrites=true&w=majority",
    };
  }
}