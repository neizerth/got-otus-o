import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { PORT } from "./config/app";
import cookieParser from "cookie-parser";
import path from "node:path";
import houseRouter from "./routes/house";
import { AppDataSource } from "./config/data-source";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/house", houseRouter);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, TypeScript + Express!");
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});

AppDataSource.initialize().then(() => {
	console.log("Data Source has been initialized!");
});
