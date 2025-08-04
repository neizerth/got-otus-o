import passport from "passport";

export const googleAuthMiddleware = passport.authenticate("google", {
	scope: ["email"],
});

export const googleAuthCallbackMiddleware = passport.authenticate("google", {
	// failureRedirect: "/oauth/google/failure",
	successReturnToOrRedirect: "/",
});
