import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { PORT, SESSION_SECRET } from "./config/app";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "node:path";
import houseRouter from "./routes/house";
import characterRouter from "./routes/character";
import userRouter from "./routes/user";

import oauthGoogleRouter from "./routes/oauth/google";
import { AppDataSource } from "./config/data-source";
import passport from "passport";
import "./passport";
import { adminMiddleware } from "./passport/admin/admin.middleware";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
	session({
		secret: SESSION_SECRET,
	}),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/house", houseRouter);
app.use("/character", characterRouter);
app.use("/oauth/google", oauthGoogleRouter);
app.use("/user", userRouter);

app.get("/", (_req: Request, res: Response) => {
	res.send("Hello, TypeScript + Express!");
});

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});

AppDataSource.initialize().then(() => {
	console.log("Data Source has been initialized!");
});
