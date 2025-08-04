import "dotenv/config";

import { DataSource } from "typeorm";
import {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_PASSWORD,
	DATABASE_PORT,
	DATABASE_USERNAME,
} from "./db";
import { User } from "../entity/user";
import { House } from "../entity/house";
import { Character } from "../entity/character";
import migrations from "../database/migrations";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: DATABASE_HOST,
	port: DATABASE_PORT,
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
	database: DATABASE_NAME,
	synchronize: true,
	logging: true,
	entities: [User, House, Character],
	subscribers: [],
	migrations,
});
