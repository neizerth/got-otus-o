import passport from "passport";

export const basicAuthMiddleware = passport.authenticate("basic", {
	session: false,
});
