export const {
	DATABASE_HOST,
	DATABASE_NAME,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
} = process.env;

const port = process.env.DATABASE_PORT;

export const DATABASE_PORT = port ? +port : 5432;
