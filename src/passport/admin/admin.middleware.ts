import { NextFunction, Request, Response } from "express";
import { User } from "../../entity/user";

const isUser = (user: unknown): user is User => {
	if (!user) {
		return false;
	}
	return typeof user === "object";
};

export const adminMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.user;
	if (isUser(user)) {
		next();
	}

	res.status(401).send("Unauthorized");
};
