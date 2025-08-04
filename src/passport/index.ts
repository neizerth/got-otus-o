import passport from "passport";
import "./basic-auth/basic-auth.strategy";
import "./google-oauth/google-oauth.strategy";

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user: any, done) => {
	done(null, user);
});
