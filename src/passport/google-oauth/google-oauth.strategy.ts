import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GAUTH_CLIENT_ID, GAUTH_CLIENT_SECRET } from "../../config/passport";
import { AppDataSource } from "../../config/data-source";
import { User } from "../../entity/user";

const userRepo = AppDataSource.getRepository(User);

const callbackURL = `/oauth/google/callback`;

passport.use(
	new GoogleStrategy(
		{
			clientID: GAUTH_CLIENT_ID,
			clientSecret: GAUTH_CLIENT_SECRET,
			callbackURL,
			scope: ["email"],
		},
		async function verify(_accessToken, _refreshToken, profile, cb) {
			const { emails } = profile;

			if (!emails) {
				cb(null, false);
				return;
			}
			const email = emails[0].value;

			const user = await userRepo.findOneBy({
				email,
			});

			cb(null, user || false);
		},
	),
);
