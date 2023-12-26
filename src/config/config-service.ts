export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig.baseUri = process.env.MONGO_URI;
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}