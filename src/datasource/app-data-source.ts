import { UserEntity } from "src/user/schema/user-entity";
import { DataSource } from "typeorm";



export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "test",
    entities: [UserEntity],
    synchronize: true,
    logging: false,
});

AppDataSource.initialize()
    .then(() => {

    }).catch((error) => console.log(error));